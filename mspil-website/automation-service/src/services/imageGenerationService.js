import axios from 'axios';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { logger } from '../server.js';
import { generateSimpleImage, searchPexelsImage } from './simpleImageService.js';

export function initializeImageGeneration() {
  // No OpenAI initialization needed for Anthropic-only setup
  logger.info('Image generation service initialized (using simple image service)');
}

export async function generateImage(prompt, options = {}) {
  try {
    // Since we're using Anthropic, we'll use simple image generation
    logger.info('Generating image with simple service:', { 
      originalPrompt: prompt
    });
    
    // Try Pexels first if API key is available
    if (process.env.PEXELS_API_KEY) {
      return await searchPexelsImage(prompt);
    }
    
    // Otherwise use placeholder images
    return await generateSimpleImage(prompt);
    
  } catch (error) {
    logger.error('Image generation error:', error);
    // Return a default image URL
    return 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=1200&h=627&fit=crop';
  }
}

function enhancePromptForMSPIL(basePrompt) {
  const brandElements = [
    'professional corporate photography',
    'high quality industrial imagery',
    'clean and modern aesthetic',
    'green and sustainable theme',
    'Mahakaushal Sugar & Power Industries branding'
  ];
  
  const contextualEnhancements = {
    'sugar': 'crystalline white sugar, sugarcane fields, modern sugar mill machinery',
    'ethanol': 'clean ethanol distillery, biofuel production, green energy',
    'power': 'cogeneration plant, renewable energy, steam turbines',
    'sustainability': 'eco-friendly operations, green technology, environmental conservation',
    'factory': 'modern industrial facility in Narsinghpur, India, clean production lines',
    'team': 'professional Indian workforce, safety gear, industrial setting',
    'innovation': 'cutting-edge technology, automation, digital displays'
  };
  
  let enhanced = basePrompt;
  
  // Add contextual enhancements based on keywords
  for (const [keyword, enhancement] of Object.entries(contextualEnhancements)) {
    if (basePrompt.toLowerCase().includes(keyword)) {
      enhanced += `, ${enhancement}`;
    }
  }
  
  // Add brand elements
  enhanced += `, ${brandElements.join(', ')}`;
  
  // Add quality modifiers
  enhanced += ', ultra realistic, professional photography, perfect lighting, 8k resolution';
  
  return enhanced;
}

async function downloadAndSaveImage(imageUrl) {
  try {
    const response = await axios.get(imageUrl, {
      responseType: 'arraybuffer'
    });
    
    const timestamp = Date.now();
    const filename = `mspil_generated_${timestamp}.png`;
    const outputDir = path.join(process.cwd(), 'generated_images');
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    const outputPath = path.join(outputDir, filename);
    
    fs.writeFileSync(outputPath, response.data);
    logger.info('Image saved:', outputPath);
    
    return outputPath;
    
  } catch (error) {
    logger.error('Image download error:', error);
    throw error;
  }
}

async function optimizeImageForSocialMedia(imagePath) {
  try {
    const optimizedDir = path.join(process.cwd(), 'optimized_images');
    
    if (!fs.existsSync(optimizedDir)) {
      fs.mkdirSync(optimizedDir, { recursive: true });
    }
    
    const filename = path.basename(imagePath);
    const outputPath = path.join(optimizedDir, `optimized_${filename}`);
    
    // Optimize for LinkedIn (1200x627 is ideal for link previews)
    await sharp(imagePath)
      .resize(1200, 627, {
        fit: 'cover',
        position: 'center'
      })
      .jpeg({
        quality: 85,
        progressive: true
      })
      .toFile(outputPath.replace('.png', '.jpg'));
    
    logger.info('Image optimized for social media:', outputPath);
    
    return outputPath.replace('.png', '.jpg');
    
  } catch (error) {
    logger.error('Image optimization error:', error);
    return imagePath; // Return original if optimization fails
  }
}

export async function generateMarketingAssets(campaign) {
  const assets = {};
  
  try {
    // Generate different sizes for different platforms
    const sizes = {
      linkedinPost: { width: 1200, height: 627 },
      linkedinSquare: { width: 1080, height: 1080 },
      twitterPost: { width: 1024, height: 512 },
      instagramPost: { width: 1080, height: 1080 },
      instagramStory: { width: 1080, height: 1920 }
    };
    
    // Generate base image
    const baseImagePath = await generateImage(campaign.prompt, {
      size: '1792x1024', // Larger base for better quality when resizing
      quality: 'hd'
    });
    
    // Create variations for different platforms
    for (const [platform, dimensions] of Object.entries(sizes)) {
      const outputPath = baseImagePath.replace('.jpg', `_${platform}.jpg`);
      
      await sharp(baseImagePath)
        .resize(dimensions.width, dimensions.height, {
          fit: 'cover',
          position: 'center'
        })
        .jpeg({ quality: 90 })
        .toFile(outputPath);
      
      assets[platform] = outputPath;
    }
    
    // Add text overlay if requested
    if (campaign.overlayText) {
      for (const [platform, imagePath] of Object.entries(assets)) {
        assets[platform] = await addTextOverlay(imagePath, campaign.overlayText);
      }
    }
    
    return assets;
    
  } catch (error) {
    logger.error('Marketing asset generation error:', error);
    throw error;
  }
}

async function addTextOverlay(imagePath, text) {
  try {
    const outputPath = imagePath.replace('.jpg', '_text.jpg');
    
    // Create SVG with text
    const svgText = `
      <svg width="1200" height="100">
        <style>
          .title { 
            fill: white; 
            font-size: 48px; 
            font-weight: bold;
            font-family: Arial, sans-serif;
            text-anchor: middle;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
          }
        </style>
        <text x="50%" y="50%" class="title" dominant-baseline="middle">${text}</text>
      </svg>
    `;
    
    const textBuffer = Buffer.from(svgText);
    
    // Composite text over image
    await sharp(imagePath)
      .composite([
        {
          input: textBuffer,
          top: 50,
          left: 0
        }
      ])
      .toFile(outputPath);
    
    return outputPath;
    
  } catch (error) {
    logger.error('Text overlay error:', error);
    return imagePath;
  }
}

// Initialize on module load
initializeImageGeneration();