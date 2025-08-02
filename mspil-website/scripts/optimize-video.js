#!/usr/bin/env node

/**
 * Video Optimization Script for MSPIL Website
 * Compresses the hero video from 18MB to ~2MB using modern codecs
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const INPUT_VIDEO = 'public/videos/hero/hero_background_video.mp4';
const OUTPUT_DIR = 'public/videos/hero/';

// Check if FFmpeg is available
function checkFFmpeg() {
  try {
    execSync('ffmpeg -version', { stdio: 'ignore' });
    return true;
  } catch (error) {
    console.error('❌ FFmpeg not found. Please install FFmpeg first:');
    console.error('macOS: brew install ffmpeg');
    console.error('Ubuntu: sudo apt install ffmpeg');
    console.error('Windows: Download from https://ffmpeg.org/download.html');
    return false;
  }
}

// Optimize video with multiple formats and quality settings
function optimizeVideo() {
  if (!checkFFmpeg()) {
    return;
  }

  if (!fs.existsSync(INPUT_VIDEO)) {
    console.error(`❌ Input video not found: ${INPUT_VIDEO}`);
    return;
  }

  console.log('🎥 Starting video optimization...');
  
  // Create backup of original
  const backupPath = INPUT_VIDEO.replace('.mp4', '_original.mp4');
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(INPUT_VIDEO, backupPath);
    console.log('✅ Created backup of original video');
  }

  const optimizations = [
    {
      name: 'WebM (Modern browsers)',
      output: 'hero_background_video.webm',
      command: `ffmpeg -i "${INPUT_VIDEO}" -c:v libvpx-vp9 -crf 35 -b:v 0 -b:a 128k -c:a libopus -vf "scale=1920:1080" -t 30 "${OUTPUT_DIR}hero_background_video.webm" -y`
    },
    {
      name: 'H.264 Optimized (Fallback)',
      output: 'hero_background_video_optimized.mp4',
      command: `ffmpeg -i "${INPUT_VIDEO}" -c:v libx264 -crf 28 -preset medium -c:a aac -b:a 128k -vf "scale=1920:1080" -t 30 -movflags +faststart "${OUTPUT_DIR}hero_background_video_optimized.mp4" -y`
    },
    {
      name: 'Mobile Optimized (720p)',
      output: 'hero_background_video_mobile.mp4',
      command: `ffmpeg -i "${INPUT_VIDEO}" -c:v libx264 -crf 32 -preset medium -c:a aac -b:a 96k -vf "scale=1280:720" -t 30 -movflags +faststart "${OUTPUT_DIR}hero_background_video_mobile.mp4" -y`
    }
  ];

  optimizations.forEach((opt, index) => {
    console.log(`\n🔄 Creating ${opt.name}...`);
    try {
      execSync(opt.command, { stdio: 'inherit' });
      
      // Check file size
      const outputPath = path.join(OUTPUT_DIR, opt.output);
      if (fs.existsSync(outputPath)) {
        const stats = fs.statSync(outputPath);
        const sizeMB = (stats.size / (1024 * 1024)).toFixed(1);
        console.log(`✅ Created ${opt.output} (${sizeMB}MB)`);
      }
    } catch (error) {
      console.error(`❌ Failed to create ${opt.name}:`, error.message);
    }
  });

  // Create poster frame optimization
  console.log('\n🖼️  Creating optimized poster frame...');
  try {
    execSync(`ffmpeg -i "${INPUT_VIDEO}" -ss 00:00:03 -vframes 1 -vf "scale=1920:1080" -q:v 2 "${OUTPUT_DIR}hero_video_poster_optimized.jpg" -y`, { stdio: 'inherit' });
    
    const posterPath = path.join(OUTPUT_DIR, 'hero_video_poster_optimized.jpg');
    if (fs.existsSync(posterPath)) {
      const stats = fs.statSync(posterPath);
      const sizeKB = (stats.size / 1024).toFixed(0);
      console.log(`✅ Created optimized poster (${sizeKB}KB)`);
    }
  } catch (error) {
    console.error('❌ Failed to create poster frame:', error.message);
  }

  console.log('\n🎉 Video optimization complete!');
  console.log('\n📊 Results:');
  
  // Show file sizes
  const files = [
    'hero_background_video.webm',
    'hero_background_video_optimized.mp4', 
    'hero_background_video_mobile.mp4',
    'hero_video_poster_optimized.jpg'
  ];
  
  files.forEach(file => {
    const filePath = path.join(OUTPUT_DIR, file);
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      const size = stats.size < 1024 * 1024 
        ? `${(stats.size / 1024).toFixed(0)}KB`
        : `${(stats.size / (1024 * 1024)).toFixed(1)}MB`;
      console.log(`  ${file}: ${size}`);
    }
  });

  console.log('\n🔧 Next steps:');
  console.log('1. Update HeroSection.jsx to use optimized videos');
  console.log('2. Implement responsive video loading');
  console.log('3. Test on different devices and connections');
}

// Run optimization
optimizeVideo();