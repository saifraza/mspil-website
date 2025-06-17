# Leadership Image Upload Guide

## Current Status
✅ Nawab Raza image is already available
❌ Other leadership images need to be uploaded

## How to Upload Leadership Images

### 1. Login to CMS
- Go to: https://mspil-mcp-production.up.railway.app/simple-cms
- Login with admin credentials

### 2. Upload Each Image with Specific Comments

For the image to be placed correctly, use these EXACT comments:

**For Managing Director:**
- Comment: "Saif Raza MD" or "Managing Director Saif"
- Will be saved as: `saif_raza_md_[timestamp].jpg`

**For Director Supply Chain:**
- Comment: "Sahil Raza Director Supply Chain" or "Sahil supply chain"
- Will be saved as: `sahil_raza_director_supply_chain_[timestamp].jpg`

**For Independent Directors:**
- Comment: "Ranganathan Independent Director"
- Comment: "Mohan Tiwari Independent Director"
- Comment: "Rajan Dubey Director"
- Comment: "Chandrakant Patil Independent Director"

### 3. After Upload
The CMS will:
1. Detect the category from your comment
2. Save to `/public/images/leadership/`
3. Rename the file appropriately
4. Show success message with new filename

### 4. Update Code with Actual Filenames
After uploading, check the actual filenames and update AboutUsPage.jsx:

```javascript
// Replace placeholder names with actual uploaded filenames
image: '/images/leadership/saif_raza_md_1234567890.jpg'
```

### 5. Commit and Deploy
```bash
git add public/images/leadership/
git commit -m "Add leadership images"
git push
```

## Why This Works Without CMS Server

- Images are served as static files from `/public`
- No API calls needed - direct file serving
- CMS only needed for uploading, not viewing
- Faster load times (no server dependency)

## Current Code Status
The AboutUsPage.jsx now uses static paths instead of CMS API calls, so images will load instantly once uploaded.