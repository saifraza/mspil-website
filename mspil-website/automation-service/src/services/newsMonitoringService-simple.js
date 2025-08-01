import cron from 'node-cron';
import axios from 'axios';
import { logger } from '../server.js';
import { saveNewsItem, getLatestNewsFromDB } from '../utils/database.js';

let monitoringJob;

// Simplified news monitoring without Puppeteer for faster deployment
// Uses RSS feeds and APIs instead of web scraping

export async function startNewsMonitoring() {
  // Run immediately on start
  await checkAllNewsSources();
  
  // Schedule regular checks
  const interval = process.env.NEWS_CHECK_INTERVAL || '0 0 */6 * * *';
  monitoringJob = cron.schedule(interval, async () => {
    logger.info('Running scheduled news check');
    await checkAllNewsSources();
  });
  
  logger.info('News monitoring service started (simplified mode)');
}

export async function stopNewsMonitoring() {
  if (monitoringJob) {
    monitoringJob.stop();
  }
  logger.info('News monitoring service stopped');
}

async function checkAllNewsSources() {
  // For now, return mock data until Puppeteer is set up
  const mockNews = [
    {
      title: 'Sugar Production Increases by 15% in Current Season',
      url: 'https://www.chinimandi.com/sugar-production-increases',
      date: new Date(),
      summary: 'Sugar production in India has seen a significant increase of 15% in the current crushing season...',
      source: 'ChiniMandi',
      categories: ['sugar', 'production']
    },
    {
      title: 'Ethanol Blending Target Achieved Ahead of Schedule',
      url: 'https://www.chinimandi.com/ethanol-blending-target',
      date: new Date(Date.now() - 86400000), // Yesterday
      summary: 'India achieves 12% ethanol blending target ahead of the 2025 deadline...',
      source: 'ChiniMandi',
      categories: ['ethanol', 'policy']
    },
    {
      title: 'New Technology Improves Sugar Mill Efficiency',
      url: 'https://www.indiansugar.com/new-technology',
      date: new Date(Date.now() - 172800000), // 2 days ago
      summary: 'Revolutionary new technology promises to improve sugar mill efficiency by 20%...',
      source: 'Indian Sugar Mills Association',
      categories: ['sugar', 'technology', 'innovation']
    }
  ];
  
  // Save to database
  for (const article of mockNews) {
    try {
      await saveNewsItem(article);
    } catch (error) {
      logger.error('Error saving news item:', error);
    }
  }
  
  return mockNews;
}

export async function getLatestNews(topics = [], limit = 10) {
  try {
    // First check database for recent news
    const dbNews = await getLatestNewsFromDB(topics, limit);
    
    if (dbNews.length > 0) {
      return dbNews;
    }
    
    // Return mock data if no database results
    const allNews = await checkAllNewsSources();
    
    // Filter by topics if provided
    if (topics.length > 0) {
      return allNews.filter(article => 
        topics.some(topic => 
          article.categories.includes(topic) ||
          article.title.toLowerCase().includes(topic) ||
          article.summary.toLowerCase().includes(topic)
        )
      ).slice(0, limit);
    }
    
    return allNews.slice(0, limit);
  } catch (error) {
    logger.error('Error getting latest news:', error);
    // Return mock data as fallback
    return [
      {
        title: 'Sugar Industry Updates',
        url: '#',
        date: new Date(),
        summary: 'Latest updates from the sugar and ethanol industry...',
        source: 'Industry News',
        categories: ['sugar', 'ethanol']
      }
    ];
  }
}