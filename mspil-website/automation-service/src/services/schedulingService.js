import cron from 'node-cron';
import { logger } from '../server.js';
import { postToLinkedIn } from './linkedinService.js';
import { saveContentPost, updatePostStatus, getScheduledPosts } from '../utils/database.js';

const scheduledJobs = new Map();

export async function scheduleContent(contentData) {
  try {
    // Save to database
    const post = await saveContentPost({
      ...contentData,
      status: 'scheduled'
    });
    
    // Calculate cron expression
    const scheduledDate = new Date(contentData.scheduledTime);
    const cronExpression = dateToCron(scheduledDate);
    
    // Create scheduled job
    const job = cron.schedule(cronExpression, async () => {
      await executeScheduledPost(post.id);
    }, {
      scheduled: true,
      timezone: "Asia/Kolkata" // Indian timezone
    });
    
    scheduledJobs.set(post.id, job);
    
    logger.info('Content scheduled:', {
      postId: post.id,
      scheduledTime: contentData.scheduledTime,
      platform: contentData.platform
    });
    
    return {
      id: post.id,
      scheduledTime: contentData.scheduledTime,
      status: 'scheduled'
    };
    
  } catch (error) {
    logger.error('Scheduling error:', error);
    throw error;
  }
}

async function executeScheduledPost(postId) {
  try {
    const posts = await getScheduledPosts();
    const post = posts.find(p => p.id === postId);
    
    if (!post) {
      logger.error('Scheduled post not found:', postId);
      return;
    }
    
    // Execute based on platform
    let result;
    switch (post.platform) {
      case 'linkedin':
        result = await postToLinkedIn({
          content: post.content,
          imageUrl: post.image_url
        });
        break;
      default:
        throw new Error(`Unsupported platform: ${post.platform}`);
    }
    
    // Update post status
    await updatePostStatus(postId, 'posted', result.url);
    
    // Remove from scheduled jobs
    const job = scheduledJobs.get(postId);
    if (job) {
      job.stop();
      scheduledJobs.delete(postId);
    }
    
    logger.info('Scheduled post executed:', {
      postId,
      platform: post.platform,
      url: result.url
    });
    
  } catch (error) {
    logger.error('Error executing scheduled post:', error);
    await updatePostStatus(postId, 'failed');
  }
}

function dateToCron(date) {
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const dayOfMonth = date.getDate();
  const month = date.getMonth() + 1;
  const dayOfWeek = date.getDay();
  
  return `${minutes} ${hours} ${dayOfMonth} ${month} *`;
}

// Check for pending scheduled posts on startup
export async function initializeScheduledPosts() {
  try {
    const posts = await getScheduledPosts();
    
    for (const post of posts) {
      const scheduledDate = new Date(post.scheduled_time);
      
      // If scheduled time has passed, execute immediately
      if (scheduledDate <= new Date()) {
        await executeScheduledPost(post.id);
      } else {
        // Reschedule for future execution
        await scheduleContent({
          ...post,
          scheduledTime: post.scheduled_time
        });
      }
    }
    
    logger.info(`Initialized ${posts.length} scheduled posts`);
    
  } catch (error) {
    logger.error('Error initializing scheduled posts:', error);
  }
}

// Cleanup function
export function stopAllScheduledJobs() {
  scheduledJobs.forEach((job, postId) => {
    job.stop();
    logger.info('Stopped scheduled job:', postId);
  });
  scheduledJobs.clear();
}