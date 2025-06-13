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
echo "   • Netlify (frontend) - https://mspil.in"
echo "   • Replit (MCP server) - Auto-sync from GitHub"
echo ""
echo "⏳ Wait 2-3 minutes for deployments to complete"
echo "🎯 Your CMS will be available for content management"
echo ""
echo "🔗 Quick Links:"
echo "   • Website: https://mspil.in"
echo "   • CMS: https://mspil.in (login with admin/admin123)"
echo "   • MCP Health: https://cc50211b-1805-4ab0-90fb-7fcbdbeeeb89-00-1zns0fu6kq06t.janeway.replit.dev/health"