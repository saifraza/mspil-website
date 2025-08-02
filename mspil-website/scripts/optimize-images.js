#!/usr/bin/env node

/**
 * Image Optimization Script for MSPIL Website
 * Converts all images to WebP format for 60-80% size reduction
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const IMAGES_DIR = 'public/images';
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];

// Check if sharp is available
function checkSharp() {
  try {
    require('sharp');
    return true;
  } catch (error) {
    console.error('❌ Sharp not found. Installing...');
    try {
      execSync('npm install sharp --save-dev', { stdio: 'inherit' });
      return true;
    } catch (installError) {
      console.error('❌ Failed to install Sharp:', installError.message);
      return false;
    }
  }
}

// Get all image files recursively
function getAllImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      getAllImageFiles(filePath, fileList);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (SUPPORTED_FORMATS.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

// Optimize single image
async function optimizeImage(inputPath) {
  const sharp = require('sharp');
  
  const dir = path.dirname(inputPath);
  const name = path.basename(inputPath, path.extname(inputPath));
  const webpPath = path.join(dir, `${name}.webp`);
  
  try {
    // Get original file size
    const originalStats = fs.statSync(inputPath);
    const originalSize = originalStats.size;
    
    // Convert to WebP with quality optimization
    await sharp(inputPath)
      .webp({ 
        quality: 85,
        effort: 6,
        nearLossless: false
      })
      .toFile(webpPath);
    
    // Get new file size
    const webpStats = fs.statSync(webpPath);
    const webpSize = webpStats.size;
    
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
    const originalSizeKB = (originalSize / 1024).toFixed(0);
    const webpSizeKB = (webpSize / 1024).toFixed(0);
    
    console.log(`✅ ${path.relative(process.cwd(), inputPath)}`);
    console.log(`   ${originalSizeKB}KB → ${webpSizeKB}KB (${savings}% savings)`);
    
    return { originalSize, webpSize, savings: parseFloat(savings) };
  } catch (error) {
    console.error(`❌ Failed to optimize ${inputPath}:`, error.message);
    return null;
  }
}

// Create responsive image variants
async function createResponsiveImages(inputPath) {
  const sharp = require('sharp');
  
  const dir = path.dirname(inputPath);
  const name = path.basename(inputPath, path.extname(inputPath));
  
  const variants = [
    { suffix: '_mobile', width: 768, quality: 80 },
    { suffix: '_tablet', width: 1024, quality: 85 },
    { suffix: '_desktop', width: 1920, quality: 85 }
  ];
  
  for (const variant of variants) {
    try {
      const outputPath = path.join(dir, `${name}${variant.suffix}.webp`);
      
      await sharp(inputPath)
        .resize({ width: variant.width, withoutEnlargement: true })
        .webp({ quality: variant.quality, effort: 6 })
        .toFile(outputPath);
        
      const stats = fs.statSync(outputPath);
      const sizeKB = (stats.size / 1024).toFixed(0);
      console.log(`   📱 ${variant.suffix.slice(1)}: ${sizeKB}KB`);
    } catch (error) {
      console.log(`   ⚠️  Skipped ${variant.suffix} (${error.message})`);
    }
  }
}

// Main optimization function
async function optimizeAllImages() {
  if (!checkSharp()) {
    return;
  }

  console.log('🖼️  Starting image optimization...\n');
  
  const imageFiles = getAllImageFiles(IMAGES_DIR);
  console.log(`Found ${imageFiles.length} images to optimize\n`);
  
  let totalOriginalSize = 0;
  let totalWebpSize = 0;
  let optimizedCount = 0;
  
  // Create backups directory
  const backupsDir = path.join(IMAGES_DIR, '_originals');
  if (!fs.existsSync(backupsDir)) {
    fs.mkdirSync(backupsDir, { recursive: true });
  }
  
  for (const imagePath of imageFiles) {
    // Create backup if it doesn't exist
    const relativePath = path.relative(IMAGES_DIR, imagePath);
    const backupPath = path.join(backupsDir, relativePath);
    const backupDir = path.dirname(backupPath);
    
    if (!fs.existsSync(backupPath)) {
      if (!fs.existsSync(backupDir)) {
        fs.mkdirSync(backupDir, { recursive: true });
      }
      fs.copyFileSync(imagePath, backupPath);
    }
    
    // Optimize image
    const result = await optimizeImage(imagePath);
    
    if (result) {
      totalOriginalSize += result.originalSize;
      totalWebpSize += result.webpSize;
      optimizedCount++;
      
      // Create responsive variants for larger images
      const stats = fs.statSync(imagePath);
      if (stats.size > 100 * 1024) { // > 100KB
        console.log('   🔄 Creating responsive variants...');
        await createResponsiveImages(imagePath);
      }
    }
    
    console.log(''); // Empty line for readability
  }
  
  // Summary
  console.log('🎉 Image optimization complete!\n');
  console.log('📊 Summary:');
  console.log(`   Processed: ${optimizedCount}/${imageFiles.length} images`);
  
  if (optimizedCount > 0) {
    const totalSavings = ((totalOriginalSize - totalWebpSize) / totalOriginalSize * 100).toFixed(1);
    const originalSizeMB = (totalOriginalSize / (1024 * 1024)).toFixed(1);
    const webpSizeMB = (totalWebpSize / (1024 * 1024)).toFixed(1);
    
    console.log(`   Original size: ${originalSizeMB}MB`);
    console.log(`   WebP size: ${webpSizeMB}MB`);
    console.log(`   Total savings: ${totalSavings}%`);
    console.log(`   Backup location: ${backupsDir}`);
  }
  
  console.log('\n🔧 Next steps:');
  console.log('1. Update LazyImage component to use WebP with fallbacks');
  console.log('2. Implement responsive image loading');
  console.log('3. Update image references in components');
}

// Run optimization
optimizeAllImages().catch(console.error);