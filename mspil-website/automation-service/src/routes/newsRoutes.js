import express from 'express';
import { getLatestNews } from '../services/newsMonitoringService.js';
import { validateNewsQuery } from '../utils/validation.js';
import { logger } from '../server.js';

const router = express.Router();

// Get latest news
router.get('/latest', async (req, res) => {
  try {
    const { error, value } = validateNewsQuery(req.query);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    
    const { topics = [], limit = 10 } = value;
    const news = await getLatestNews(topics, limit);
    
    res.json({
      success: true,
      count: news.length,
      news
    });
    
  } catch (error) {
    logger.error('News fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Get news by category
router.get('/category/:category', async (req, res) => {
  try {
    const { category } = req.params;
    const limit = parseInt(req.query.limit) || 10;
    
    const news = await getLatestNews([category], limit);
    
    res.json({
      success: true,
      category,
      count: news.length,
      news
    });
    
  } catch (error) {
    logger.error('Category news fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Search news
router.get('/search', async (req, res) => {
  try {
    const { q, limit = 10 } = req.query;
    
    if (!q) {
      return res.status(400).json({ error: 'Search query required' });
    }
    
    // For now, use topic-based search
    const news = await getLatestNews([q.toLowerCase()], parseInt(limit));
    
    res.json({
      success: true,
      query: q,
      count: news.length,
      news
    });
    
  } catch (error) {
    logger.error('News search error:', error);
    res.status(500).json({ error: 'Failed to search news' });
  }
});

// Get news sources
router.get('/sources', (req, res) => {
  const sources = [
    {
      name: 'ChiniMandi',
      url: 'https://www.chinimandi.com/',
      description: 'Leading sugar and ethanol industry news portal',
      categories: ['sugar', 'ethanol', 'molasses', 'market']
    },
    {
      name: 'Indian Sugar Mills Association',
      url: 'https://www.indiansugar.com/',
      description: 'Official sugar industry association news',
      categories: ['sugar', 'policy', 'industry']
    }
  ];
  
  res.json({ sources });
});

export default router;