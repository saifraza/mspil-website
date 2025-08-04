#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = require('node-fetch');

// Load configuration
const config = require('../config/railway-api.json');
const env = process.env.NODE_ENV || 'development';
const apiConfig = config[env];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Helper function to log with colors
const log = {
  success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`),
  warning: (msg) => console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`),
  header: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`)
};

// Main upload function
async function uploadMedia(filePath, category, metadata = {}) {
  try {
    const fileName = path.basename(filePath);
    const fileStats = fs.statSync(filePath);
    
    log.info(`Uploading: ${fileName} (${(fileStats.size / 1024 / 1024).toFixed(2)} MB)`);
    
    // Create form data
    const formData = new FormData();
    formData.append('file', fs.createReadStream(filePath));
    formData.append('category', category);
    formData.append('metadata', JSON.stringify({
      originalName: fileName,
      uploadDate: new Date().toISOString(),
      ...metadata
    }));
    
    // Upload to Railway
    const response = await fetch(`${apiConfig.apiUrl}${apiConfig.uploadEndpoint}`, {
      method: 'POST',
      body: formData,
      headers: {
        ...formData.getHeaders(),
        'Authorization': `Bearer ${process.env.RAILWAY_API_KEY || ''}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }
    
    const result = await response.json();
    log.success(`Uploaded successfully: ${result.url}`);
    
    return result;
  } catch (error) {
    log.error(`Failed to upload ${path.basename(filePath)}: ${error.message}`);
    throw error;
  }
}

// Batch upload function
async function uploadBatch(directory, category) {
  log.header(`Batch Upload to Railway - Category: ${category}`);
  
  const files = fs.readdirSync(directory).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.webp', '.mp4', '.mov'].includes(ext);
  });
  
  log.info(`Found ${files.length} media files to upload`);
  
  const results = {
    successful: [],
    failed: []
  };
  
  for (const file of files) {
    const filePath = path.join(directory, file);
    try {
      const result = await uploadMedia(filePath, category);
      results.successful.push({ file, url: result.url, id: result.id });
    } catch (error) {
      results.failed.push({ file, error: error.message });
    }
  }
  
  // Summary
  log.header('Upload Summary');
  log.success(`Successful uploads: ${results.successful.length}`);
  if (results.failed.length > 0) {
    log.error(`Failed uploads: ${results.failed.length}`);
    results.failed.forEach(f => log.error(`  - ${f.file}: ${f.error}`));
  }
  
  // Save results
  const resultsPath = path.join(__dirname, '..', 'temp', `upload-results-${Date.now()}.json`);
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  log.info(`Results saved to: ${resultsPath}`);
  
  return results;
}

// CLI interface
if (require.main === module) {
  const args = process.argv.slice(2);
  
  if (args.length < 2) {
    console.log(`
${colors.bright}Media Upload Tool for Railway${colors.reset}

Usage:
  ${colors.cyan}upload-media.js <directory> <category> [--env=production]${colors.reset}

Categories:
  ${Object.entries(config.categories).map(([key, value]) => `${key.padEnd(20)} - ${value}`).join('\n  ')}

Examples:
  ${colors.cyan}node upload-media.js /path/to/images news-gallery${colors.reset}
  ${colors.cyan}node upload-media.js ./temp-media leadership --env=production${colors.reset}
`);
    process.exit(1);
  }
  
  const directory = args[0];
  const category = args[1];
  
  // Check if directory exists
  if (!fs.existsSync(directory)) {
    log.error(`Directory not found: ${directory}`);
    process.exit(1);
  }
  
  // Validate category
  const validCategories = Object.values(config.categories);
  if (!validCategories.includes(category)) {
    log.error(`Invalid category: ${category}`);
    log.info(`Valid categories: ${validCategories.join(', ')}`);
    process.exit(1);
  }
  
  // Set environment if specified
  if (args.find(arg => arg.includes('--env='))) {
    const envArg = args.find(arg => arg.includes('--env=')).split('=')[1];
    process.env.NODE_ENV = envArg;
  }
  
  // Run batch upload
  uploadBatch(directory, category).catch(error => {
    log.error(`Batch upload failed: ${error.message}`);
    process.exit(1);
  });
}

module.exports = { uploadMedia, uploadBatch };