# CMS Auto-Deploy to GitHub via API

## Overview
Your MCP CMS can now automatically push uploaded files to GitHub using the GitHub API, triggering Railway to rebuild and deploy!

## How It Works
1. **Upload files** through CMS
2. **Click Deploy** button (or enable auto-deploy)
3. **CMS uses GitHub API** to commit files directly
4. **Railway rebuilds** automatically
5. **Files appear** on production site in ~2-3 minutes

## Setup

### 1. Create GitHub Personal Access Token
1. Go to GitHub Settings > Developer settings > Personal access tokens
2. Create new token (classic)
3. Select scopes: `repo` (full repository access)
4. Copy the token

### 2. Configure Railway Environment Variables
Add to your CMS service on Railway:
```
ENABLE_AUTO_DEPLOY=true
GITHUB_TOKEN=your-github-token-here
GITHUB_OWNER=saifraza
GITHUB_REPO=mspil-website
GITHUB_BRANCH=main
```

### 3. Manual Deploy Button
- Available in CMS header  
- Deploys only files uploaded in last 24 hours
- Shows confirmation dialog
- Displays success/error messages

## Usage

### Manual Deploy
1. Upload files normally through CMS
2. Click "Deploy" button in header
3. Confirm deployment
4. Wait 2-3 minutes for Railway rebuild

### Auto-Deploy (When Enabled)
- Individual files automatically pushed after upload
- No manual action needed
- Each upload creates a separate commit

## Smart Features
✅ **Only changed files** - Only pushes newly uploaded files, not everything
✅ **File deduplication** - Updates existing files instead of creating duplicates
✅ **Proper commit messages** - Each commit shows what was uploaded and when
✅ **Error handling** - Shows specific errors if deployment fails

## Benefits
✅ No need to download/re-upload locally
✅ Direct from CMS to production
✅ Maintains git history
✅ Works with Railway's auto-deploy
✅ Images available globally after rebuild

## Timing
- Git push: ~5 seconds
- Railway rebuild: ~1-2 minutes
- Total: ~2-3 minutes to see changes

## Troubleshooting

### "Permission denied" error
- Check GitHub deploy key has write access
- Verify Railway has correct SSH key

### Files not appearing
- Check Railway build logs
- Verify files were committed to GitHub
- Wait for full rebuild to complete

### Deploy button not working
- Check browser console for errors
- Verify CMS server has git installed
- Check Railway logs for git errors