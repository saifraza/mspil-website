# CMS Auto-Deploy to GitHub

## Overview
Your MCP CMS can now automatically push uploaded files to GitHub, triggering Railway to rebuild and deploy!

## How It Works
1. **Upload files** through CMS
2. **Click Deploy** button (or enable auto-deploy)
3. **CMS commits** files to GitHub
4. **Railway rebuilds** automatically
5. **Files appear** on production site in ~2-3 minutes

## Setup

### 1. Enable in Railway Environment Variables
Add to your CMS service on Railway:
```
ENABLE_AUTO_DEPLOY=true
```

### 2. Configure Git Access
The CMS needs permission to push to your GitHub repo:

**Option A: Deploy Key (Recommended)**
1. Generate SSH key on Railway
2. Add public key to GitHub repo settings > Deploy keys
3. Check "Allow write access"

**Option B: Personal Access Token**
1. Create GitHub PAT with repo access
2. Add to Railway: `GITHUB_TOKEN=your-token`

### 3. Manual Deploy Button
- Available in CMS header
- Click to push all recent uploads
- Shows confirmation dialog
- Displays success/error messages

## Usage

### Manual Deploy
1. Upload files normally
2. Click "Deploy" button in header
3. Confirm deployment
4. Wait 2-3 minutes for Railway rebuild

### Auto-Deploy (When Enabled)
- Files automatically pushed after upload
- No manual action needed
- Each upload triggers a commit

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