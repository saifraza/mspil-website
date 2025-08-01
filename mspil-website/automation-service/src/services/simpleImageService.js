import { logger } from '../server.js';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Simple image service for when DALL-E is not available
// Uses placeholder images or can integrate with free stock photo APIs

const PLACEHOLDER_IMAGES = {
  'sugar': 'https://images.unsplash.com/photo-1558642891-54be180ea339?w=1200&h=627&fit=crop',
  'ethanol': 'https://images.unsplash.com/photo-1581093458791-9d42e3c5fd14?w=1200&h=627&fit=crop',
  'factory': 'https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1200&h=627&fit=crop',
  'sustainability': 'https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=1200&h=627&fit=crop',
  'team': 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=627&fit=crop',
  'innovation': 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=627&fit=crop',
  'energy': 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&h=627&fit=crop',
  'agriculture': 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=627&fit=crop',
  'default': 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&h=627&fit=crop'
};

export async function generateSimpleImage(prompt) {
  try {
    logger.info('Generating simple image for prompt:', prompt);
    
    // Extract keywords from prompt
    const keywords = extractKeywords(prompt);
    
    // Find best matching placeholder
    let imageUrl = PLACEHOLDER_IMAGES.default;
    for (const [key, url] of Object.entries(PLACEHOLDER_IMAGES)) {
      if (keywords.includes(key)) {
        imageUrl = url;
        break;
      }
    }
    
    // Create a branded version with text overlay
    const brandedImagePath = await createBrandedImage(imageUrl, prompt);
    
    return brandedImagePath;
    
  } catch (error) {
    logger.error('Simple image generation error:', error);
    // Return a default image URL as fallback
    return PLACEHOLDER_IMAGES.default;
  }
}

function extractKeywords(prompt) {
  const lowerPrompt = prompt.toLowerCase();
  const keywords = [];
  
  const searchTerms = [
    'sugar', 'ethanol', 'factory', 'sustainability', 
    'team', 'innovation', 'energy', 'agriculture',
    'molasses', 'distillery', 'green', 'eco'
  ];
  
  searchTerms.forEach(term => {
    if (lowerPrompt.includes(term)) {
      keywords.push(term);
    }
  });
  
  return keywords;
}

async function createBrandedImage(imageUrl, text) {
  try {
    const outputDir = path.join(process.cwd(), 'generated_images');
    
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const timestamp = Date.now();
    const outputPath = path.join(outputDir, `mspil_branded_${timestamp}.jpg`);
    
    // For now, just return the URL
    // In production, you would download and brand the image
    return imageUrl;
    
  } catch (error) {
    logger.error('Branding error:', error);
    return imageUrl;
  }
}

// Alternative: Use Pexels API (free stock photos)
export async function searchPexelsImage(query) {
  try {
    const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
    if (!PEXELS_API_KEY) {
      return generateSimpleImage(query);
    }
    
    const response = await fetch(`https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1`, {
      headers: {
        'Authorization': PEXELS_API_KEY
      }
    });
    
    const data = await response.json();
    
    if (data.photos && data.photos.length > 0) {
      return data.photos[0].src.large;
    }
    
    return generateSimpleImage(query);
    
  } catch (error) {
    logger.error('Pexels search error:', error);
    return generateSimpleImage(query);
  }
}