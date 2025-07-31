#!/bin/bash

# MSPIL Static Website Deployment Script
# Usage: ./deploy.sh "commit message"

set -e  # Exit on any error

echo "🚀 Starting MSPIL Static Website Deployment..."

# Check if commit message provided
if [ -z "$1" ]; then
    echo "❌ Please provide a commit message"
    echo "Usage: ./deploy.sh 'your commit message'"
    exit 1
fi

COMMIT_MSG="$1"

echo "📝 Commit message: $COMMIT_MSG"

# Run build to ensure everything compiles
echo "🔧 Building website..."
npm run build

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
echo "🔄 Railway auto-deployment triggered:"
echo "   • Static Website: https://mspil.in"
echo ""
echo "⏳ Wait 2-3 minutes for deployment to complete"
echo "📊 Website features:"
echo "   ✓ Fast static site loading"
echo "   ✓ Inline document viewing (PDF, Excel, Word)"
echo "   ✓ No backend dependencies"
echo "   ✓ Enhanced security"
echo ""
echo "🔗 Website: https://mspil.in"