# CMS Server Restart Guide

## Why Restart?
The server needs to be restarted to load the following fixes:
1. New uploads now appear at the top (most recent first)
2. Download functionality fixed
3. Content saving issue resolved
4. Better error handling added

## How to Restart

### Option 1: Local Development
```bash
# Stop the current server (Ctrl+C in the terminal running cms-dev)
# Then restart:
cd mcp-cms
npm run dev
```

### Option 2: Production (Railway)
The production server should automatically restart when you push changes to GitHub.
If it doesn't:
1. Go to Railway dashboard
2. Find your mcp-cms service
3. Click "Restart" or trigger a new deployment

## Verify It's Working

After restart, test:
1. **Upload a file** - It should show the renamed filename
2. **Check Recent Uploads** - New file should appear at the top
3. **Try Download** - Click download button, file should download
4. **Refresh Content** - Click refresh button to update the list

## What Was Fixed

1. **Upload Order**: New uploads now use `unshift` instead of `push` to appear first
2. **Download Paths**: Fixed category path mismatches (e.g., news vs news_media)
3. **Content Saving**: Added verification after writing to published-content.json
4. **Error Handling**: Better logging and error messages throughout

## Troubleshooting

If issues persist after restart:
1. Check server logs for errors
2. Clear browser cache and reload CMS page
3. Check if published-content.json exists in mcp-cms directory
4. Ensure file permissions allow writing to the directory