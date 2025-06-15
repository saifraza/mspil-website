#!/bin/bash

# MSPIL One-Command Deployment Script
# Usage: ./deploy.sh "commit message"

set -e  # Exit on any error

echo "🚀 Starting MSPIL Deployment..."

# Check if commit message provided
if [ -z "$1" ]; then
    echo "❌ Please provide a commit message"
    echo "Usage: ./deploy.sh 'your commit message'"
    exit 1
fi

COMMIT_MSG="$1"

echo "📝 Commit message: $COMMIT_MSG"

# Stage all changes
echo "📦 Staging all changes..."
git add .

# Commit changes
echo "💾 Committing changes..."
git commit -m "$COMMIT_MSG" || {
    echo "⚠️  No changes to commit"
}

# Push to GitHub (triggers auto-deploy)
echo "🌐 Pushing to GitHub..."
git push origin main

echo "✅ Deployment initiated!"
echo ""
echo "🔄 Auto-deployments triggered:"
echo "   • Railway (frontend) - https://mspil.in"
echo "   • Railway (CMS server) - https://mspil-mcp-production.up.railway.app"
echo ""
echo "⏳ Wait 2-3 minutes for deployments to complete"
echo "🎯 Your CMS will be available for content management"
echo ""
echo "🔗 Quick Links:"
echo "   • Website: https://mspil.in"
echo "   • CMS: https://mspil.in/simple-cms (login with admin/admin123)"
echo "   • CMS Health: https://mspil-mcp-production.up.railway.app/health"