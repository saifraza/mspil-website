# Quick Setup Instructions for Railway Media Upload

## Step 1: Get Your Railway API Key

1. Log in to Railway dashboard
2. Go to your MSPIL CMS service
3. Click on "Variables" tab
4. Find or create `API_KEY` variable
5. Copy the key value

## Step 2: Set Up Local Environment

```bash
# In your terminal, set the API key
export RAILWAY_API_KEY="your-api-key-here"
```

## Step 3: Upload Media Files

```bash
# Navigate to media management directory
cd /Users/saifraza/Desktop/Website/mspil-website/media-management/scripts

# Upload files from temp directory
node upload-media.js /Users/saifraza/Desktop/temp news-gallery --env=production
```

## Step 4: Verify Upload

```bash
# List all uploaded media
node list-media.js news-gallery
```

## That's it! 

The website will automatically fetch and display the media from Railway.

---

**Need Help?**
- Check if Railway service is running
- Verify API key is correct
- Make sure file formats are supported (jpg, jpeg, png, webp, mp4)