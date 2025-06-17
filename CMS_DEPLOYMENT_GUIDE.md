# CMS Deployment Guide

## Issue: Uploaded Images Not Visible on Production

When you upload images through the Simple CMS, they are saved locally on your machine but not automatically deployed to the production website. This is why uploaded images aren't visible on the live site.

## Solution: Deploy Changes to Production

After uploading files via CMS, you need to deploy the changes to production:

### Option 1: Manual Deployment (Recommended)

1. **Commit the changes**:
   ```bash
   cd /Users/saifraza/Documents/Ethanol/Final\ documents/300/website/mspil
   git add public/images/* public/documents/*
   git commit -m "Add new images and documents via CMS"
   git push origin main
   ```

2. **Deploy to production**:
   - The deployment should happen automatically if you have CI/CD set up
   - Or manually trigger deployment through your hosting platform

### Option 2: Use Cloud Storage (Future Enhancement)

For a better long-term solution, consider:
1. Storing uploaded files in cloud storage (AWS S3, Cloudinary, etc.)
2. This would make images immediately available without deployment

## Current File Locations

Files uploaded via CMS are saved to:
- **Images**: `/public/images/[category]/`
- **Documents**: `/public/documents/[category]/`

## Verifying Uploads

1. **Check local files**:
   ```bash
   ls -la public/images/leadership/
   ls -la public/images/media/
   ```

2. **Check production** (after deployment):
   - Visit: https://mspil.in/images/leadership/[filename]
   - Visit: https://mspil.in/images/media/[filename]

## Best Practices

1. **Batch uploads**: Upload multiple files at once before deploying
2. **Test locally**: Verify images display correctly in local development
3. **Regular deployments**: Deploy changes regularly to keep production updated

## Troubleshooting

If images still don't appear after deployment:
1. Clear browser cache
2. Check file permissions
3. Verify the file paths in the code match the uploaded locations
4. Check browser console for 404 errors