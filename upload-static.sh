#!/bin/bash

# Static Upload Script - Uploads directly to frontend public directory

echo "🚀 Starting Static Upload Server..."
echo "📁 Files will be saved directly to frontend's public directory"
echo "⚡ No API calls needed - files served as static assets!"

# Start the static upload server
cd mcp-cms && node server-static.cjs