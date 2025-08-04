#!/usr/bin/env node

const fetch = require('node-fetch');
const readline = require('readline');
const config = require('../config/railway-api.json');

const env = process.env.NODE_ENV || 'development';
const apiConfig = config[env];

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m'
};

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

async function deleteMedia(mediaId) {
  try {
    const response = await fetch(`${apiConfig.apiUrl}${apiConfig.deleteEndpoint}/${mediaId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${process.env.RAILWAY_API_KEY || ''}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete media: ${response.statusText}`);
    }
    
    console.log(`${colors.red}✓ Media deleted successfully${colors.reset}`);
    return true;
  } catch (error) {
    console.error(`${colors.red}Error: ${error.message}${colors.reset}`);
    return false;
  }
}

// CLI interface
if (require.main === module) {
  const mediaId = process.argv[2];
  
  if (!mediaId) {
    console.log(`
${colors.yellow}Delete Media from Railway${colors.reset}

Usage:
  delete-media.js <media-id>

Example:
  node delete-media.js abc123def456
`);
    process.exit(1);
  }
  
  rl.question(`${colors.yellow}Are you sure you want to delete media ${mediaId}? (yes/no): ${colors.reset}`, (answer) => {
    if (answer.toLowerCase() === 'yes') {
      deleteMedia(mediaId).then(() => {
        rl.close();
      });
    } else {
      console.log('Deletion cancelled');
      rl.close();
    }
  });
}

module.exports = { deleteMedia };