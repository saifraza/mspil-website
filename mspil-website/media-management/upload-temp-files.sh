#!/bin/bash

# Upload script for temp files
echo "🚀 Uploading media files from /Users/saifraza/Desktop/temp to Railway..."

# Set the API key (you need to replace this with your actual key)
export RAILWAY_API_KEY="your-railway-api-key-here"

# Change to scripts directory
cd scripts

# Upload all files from temp directory to news-gallery category
node upload-media.js /Users/saifraza/Desktop/temp news-gallery --env=production

echo "✅ Upload complete! Check the results in temp/upload-results-*.json"