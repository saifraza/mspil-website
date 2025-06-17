# Leadership Images Debug Guide

## Issue Summary
The Saif Raza image uploaded through CMS is not showing on the leadership section of the website.

## Root Causes Identified

1. **Frontend-Backend Disconnect**: 
   - The AboutUsPage was using hardcoded static image paths
   - It wasn't fetching images from the CMS ImageContext

2. **Image Storage Location**:
   - CMS uploads images to `/mcp-cms/uploads/`
   - CMS also copies them to `/public/images/leadership/`
   - But the published-content.json doesn't have any leadership images registered

3. **Missing CMS Images**:
   - Currently only `nawab_raza.png` exists in `/public/images/leadership/`
   - No Saif Raza images found in the CMS database

## Solution Implemented

1. **Modified AboutUsPage.jsx**:
   - Added ImageContext import
   - Changed static image paths to use CMS images with fallbacks
   - Added debugging logs to track available images

2. **Image Category Mapping**:
   ```javascript
   // Each leader now has a specific CMS category
   'nawab-raza-image'  // Founder & Chairman
   'saif-raza-image'   // MD (Saif Raza)
   'sahil-raza-image'  // Director Supply Chain
   'asad-raza-image'   // Director Operations
   'ahmed-raza-image'  // Director Finance
   'fatima-raza-image' // Director HR
   ```

## How to Upload Leadership Images

1. **Login to CMS**: Navigate to `/simple-cms` and login

2. **Upload Saif Raza Image**:
   - Select the image file
   - In the comment field, add: "Saif Raza MD" or "Managing Director Saif"
   - The CMS will automatically detect and categorize it as `saif-raza-image`

3. **Verify Upload**:
   - Check browser console for debug logs
   - Look for: `🧑‍💼 Leadership categories:` to see available images
   - The image should appear in the leadership section

## Testing Steps

1. Open browser developer console
2. Navigate to the About Us page
3. Check console for:
   - `🖼️ Available CMS images:` - Shows all CMS images
   - `🧑‍💼 Leadership categories:` - Shows leadership-specific images

## Important Notes

- The CMS uses "smart" filename detection based on the comment field
- For Saif Raza, include "Saif" or "MD" in the comment
- Images are served from the production CMS server
- Fallback images are used if CMS images aren't available

## Troubleshooting

If images still don't appear:

1. **Check CMS Server**:
   - Ensure the CMS server is running
   - Check if images are being saved to `/public/images/leadership/`

2. **Clear Browser Cache**:
   - Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)

3. **Verify Image Upload**:
   - Check `/mcp-cms/published-content.json` for the image entry
   - Ensure the category is `saif-raza-image`

4. **Check Network Tab**:
   - Look for failed image requests
   - Verify the URL structure matches the CMS output