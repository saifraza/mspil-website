# Media Management System for MSPIL Website

This directory contains all tools and scripts for managing media files (images and videos) that are stored in Railway's database instead of the GitHub repository.

## 📁 Directory Structure

```
media-management/
├── config/
│   └── railway-api.json    # API configuration for Railway endpoints
├── scripts/
│   ├── upload-media.js     # Upload media files to Railway
│   ├── list-media.js       # List all media in Railway database
│   └── delete-media.js     # Delete media from Railway
├── docs/
│   └── (documentation files)
└── temp/
    └── (temporary files and upload results)
```

## 🚀 Quick Start

### 1. Set up Railway API Key
```bash
export RAILWAY_API_KEY="your-railway-api-key-here"
```

### 2. Upload Media Files

**Upload all files from a directory:**
```bash
cd media-management/scripts
node upload-media.js /path/to/media/folder news-gallery
```

**Upload to production:**
```bash
node upload-media.js /path/to/media/folder news-gallery --env=production
```

### 3. List Media Files
```bash
# List all media
node list-media.js

# List media by category
node list-media.js news-gallery
```

### 4. Delete Media Files
```bash
node delete-media.js <media-id>
```

## 📸 Media Categories

- `news-gallery` - News and media gallery images/videos
- `csr-images` - CSR program images
- `infrastructure` - Infrastructure and facility images
- `leadership` - Leadership team photos
- `general-media` - General purpose media files

## 🔧 How It Works

1. **Local Development**: Media files are uploaded to a local Railway instance or development server
2. **Production**: Media files are uploaded to Railway's cloud database
3. **Frontend**: The website fetches media URLs from Railway API instead of serving local files
4. **Benefits**:
   - No large media files in GitHub repository
   - Easy to update media without code changes
   - Centralized media management
   - Better performance with CDN delivery

## 📝 Common Tasks

### Adding News Gallery Images

1. Collect all images/videos in a folder
2. Run the upload script:
   ```bash
   node upload-media.js /Users/saifraza/Desktop/temp news-gallery --env=production
   ```
3. The script will:
   - Upload each file to Railway
   - Return URLs for each file
   - Save results in `temp/upload-results-[timestamp].json`

### Updating Existing Media

1. List current media to find IDs:
   ```bash
   node list-media.js news-gallery
   ```
2. Delete old media:
   ```bash
   node delete-media.js <old-media-id>
   ```
3. Upload new media:
   ```bash
   node upload-media.js /path/to/new/media news-gallery
   ```

### Batch Operations

The upload script automatically handles batch uploads. Place all files in a directory and run:
```bash
node upload-media.js /path/to/directory category-name
```

## 🔐 Security

- All uploads require a valid `RAILWAY_API_KEY`
- API endpoints are protected with authentication
- Media files are served through Railway's CDN with proper access controls

## 🐛 Troubleshooting

### Upload Fails
- Check your `RAILWAY_API_KEY` is set correctly
- Verify the Railway service is running
- Check file size limits (usually 50MB per file)
- Ensure file format is supported (jpg, jpeg, png, webp, mp4, mov)

### Media Not Showing on Website
- Verify the media was uploaded successfully (check upload results)
- Ensure the frontend is pointing to the correct API endpoint
- Check browser console for any CORS issues

## 📊 API Endpoints

### Development
- Base URL: `http://localhost:3002/api`
- Upload: `POST /media/upload`
- List: `GET /media/list`
- Delete: `DELETE /media/delete/:id`

### Production
- Base URL: `https://mspil-cms.railway.app/api`
- Same endpoints as development

## 🔄 Integration with Frontend

The frontend gallery components should fetch media from Railway API:

```javascript
// Example in React component
const fetchGalleryMedia = async () => {
  const response = await fetch(`${API_URL}/media/list?category=news-gallery`);
  const mediaFiles = await response.json();
  setGalleryItems(mediaFiles);
};
```

## 📅 Maintenance

- Regularly clean up unused media files to save storage
- Keep upload results for reference in `temp/` directory
- Monitor Railway storage usage in the dashboard

---

**Note**: Always test uploads in development before uploading to production!