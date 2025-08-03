import express from 'express';
import { generateImage } from '../services/imageGenerationService.js';
import { postToLinkedIn } from '../services/linkedinService.js';
import { scheduleContent } from '../services/schedulingService.js';
import { validateContentPost, validateImageGeneration } from '../utils/validation.js';
import { saveContentPost, getContentAnalytics } from '../utils/database.js';
import { logger } from '../server.js';

const router = express.Router();

// Create content post
router.post('/create', async (req, res) => {
  try {
    const { error, value } = validateContentPost(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    // Save to database
    const post = await saveContentPost(value);
    
    // If immediate posting requested
    if (req.body.postNow && value.platform === 'linkedin') {
      const result = await postToLinkedIn({
        content: value.content,
        imageUrl: value.imageUrl
      });
      
      post.status = 'posted';
      post.post_url = result.url;
    }
    
    res.json({
      success: true,
      post
    });
    
  } catch (error) {
    logger.error('Content creation error:', error);
    res.status(500).json({ error: 'Failed to create content' });
  }
});

// Generate image
router.post('/generate-image', async (req, res) => {
  try {
    const { error, value } = validateImageGeneration(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    const imageUrl = await generateImage(value.prompt, {
      size: value.size,
      quality: value.quality,
      style: value.style
    });
    
    res.json({
      success: true,
      imageUrl,
      prompt: value.prompt
    });
    
  } catch (error) {
    logger.error('Image generation error:', error);
    res.status(500).json({ error: 'Failed to generate image' });
  }
});

// Schedule content
router.post('/schedule', async (req, res) => {
  try {
    const { error, value } = validateContentPost(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    if (!value.scheduledTime) {
      return res.status(400).json({ error: 'Scheduled time required' });
    }
    
    const scheduled = await scheduleContent(value);
    
    res.json({
      success: true,
      scheduled
    });
    
  } catch (error) {
    logger.error('Scheduling error:', error);
    res.status(500).json({ error: 'Failed to schedule content' });
  }
});

// Get content analytics
router.get('/analytics', async (req, res) => {
  try {
    const { platform, dateFrom, dateTo } = req.query;
    
    const analytics = await getContentAnalytics(
      platform,
      dateFrom ? new Date(dateFrom) : null,
      dateTo ? new Date(dateTo) : null
    );
    
    res.json({
      success: true,
      analytics
    });
    
  } catch (error) {
    logger.error('Analytics fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Get content templates
router.get('/templates', (req, res) => {
  const templates = [
    {
      name: 'Product Update',
      template: 'Exciting news! We\'ve achieved {milestone} in our {product} production. This represents a {percentage}% increase from last quarter. #Sustainability #Innovation',
      variables: ['milestone', 'product', 'percentage']
    },
    {
      name: 'Sustainability Achievement',
      template: 'Proud to announce: {achievement}. This initiative will help us reduce {metric} by {amount}. Together, we\'re building a greener future! 🌱 #GreenEnergy #Sustainability',
      variables: ['achievement', 'metric', 'amount']
    },
    {
      name: 'Industry News Share',
      template: 'Important industry update: {news_title}\n\nOur perspective: {our_take}\n\nRead more: {link} #SugarIndustry #Ethanol',
      variables: ['news_title', 'our_take', 'link']
    },
    {
      name: 'Team Spotlight',
      template: 'Meet {name}, our {position}! {description}\n\n"Quote: {quote}"\n\n#TeamMSPIL #EmployeeSpotlight',
      variables: ['name', 'position', 'description', 'quote']
    }
  ];
  
  res.json({ templates });
});

export default router;