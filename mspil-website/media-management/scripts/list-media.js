#!/usr/bin/env node

const fetch = require('node-fetch');
const config = require('../config/railway-api.json');

const env = process.env.NODE_ENV || 'development';
const apiConfig = config[env];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  gray: '\x1b[90m'
};

async function listMedia(category = null) {
  try {
    const url = category 
      ? `${apiConfig.apiUrl}${apiConfig.listEndpoint}?category=${category}`
      : `${apiConfig.apiUrl}${apiConfig.listEndpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${process.env.RAILWAY_API_KEY || ''}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch media: ${response.statusText}`);
    }
    
    const media = await response.json();
    
    console.log(`\n${colors.bright}${colors.cyan}Media Files in Railway Database${colors.reset}`);
    console.log(`${colors.gray}Total: ${media.length} files${colors.reset}\n`);
    
    // Group by category
    const grouped = media.reduce((acc, item) => {
      const cat = item.category || 'uncategorized';
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    }, {});
    
    // Display grouped media
    Object.entries(grouped).forEach(([category, items]) => {
      console.log(`${colors.bright}${colors.green}${category}${colors.reset} (${items.length} files)`);
      items.forEach(item => {
        const size = item.size ? `${(item.size / 1024 / 1024).toFixed(2)} MB` : 'Unknown size';
        console.log(`  ${colors.blue}•${colors.reset} ${item.filename} - ${colors.gray}${size}${colors.reset}`);
        console.log(`    ${colors.gray}URL: ${item.url}${colors.reset}`);
        if (item.metadata?.uploadDate) {
          console.log(`    ${colors.gray}Uploaded: ${new Date(item.metadata.uploadDate).toLocaleString()}${colors.reset}`);
        }
      });
      console.log();
    });
    
    return media;
  } catch (error) {
    console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
    process.exit(1);
  }
}

// CLI interface
if (require.main === module) {
  const category = process.argv[2];
  listMedia(category);
}

module.exports = { listMedia };