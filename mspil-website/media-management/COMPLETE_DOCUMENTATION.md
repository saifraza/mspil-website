# 📸 Media Management System - Complete Documentation

## 🎯 Overview

This media management system allows MSPIL to store all media files (images/videos) in Railway's cloud database instead of GitHub. This keeps the repository lightweight while providing easy media management.

## 🏗️ Architecture

```
┌─────────────────┐         ┌──────────────────────────┐         ┌─────────────────┐
│  Local Files    │  ──►    │   Automation Service     │  ──►    │  Website Views  │
│  (temp folder)  │         │  (Railway Database)      │         │  (Gallery/News) │
└─────────────────┘         └──────────────────────────┘         └─────────────────┘
```

### Key Components:

1. **Automation Service** (Railway): `automationservice-production-4565.up.railway.app`
   - Already has database setup
   - Handles media storage
   - Provides API endpoints

2. **Media Management Scripts**: Local tools for uploading/managing media

3. **Website Components**: Gallery and news sections that fetch from Railway

## 📁 Directory Structure

```
mspil-website/
├── media-management/          # Media management tools
│   ├── config/
│   │   └── railway-api.json   # API endpoints configuration
│   ├── scripts/
│   │   ├── upload-media.js    # Upload files to Railway
│   │   ├── list-media.js      # List all media files
│   │   └── delete-media.js    # Delete media files
│   ├── docs/
│   │   └── (documentation)
│   └── temp/                  # Temporary files and results
│
├── automation-service/         # Railway service (existing)
│   └── src/
│       └── routes/
│           └── mediaRoutes.js # NEW: Media API endpoints
│
└── src/                       # Website frontend
    ├── components/
    │   └── sections/
    │       └── NewsMediaSection.jsx  # Updated to fetch from Railway
    └── pages/
        └── GalleryPage.jsx           # Updated to fetch from Railway
```

## 🚀 Setup Instructions

### Step 1: Ensure Railway Service is Updated

The automation service needs the media routes. This has been added to:
- `/automation-service/src/routes/mediaRoutes.js`
- Updated in `/automation-service/src/server.js`

### Step 2: Install Dependencies

```bash
cd media-management
npm install
```

### Step 3: Set Environment Variable

Since your Railway service already has the database, no additional API key needed!

```bash
# For production uploads
export NODE_ENV=production
```

## 📤 How to Upload Media

### Upload Single Directory

```bash
cd media-management/scripts

# Upload all images/videos from temp folder
node upload-media.js /Users/saifraza/Desktop/temp news-gallery --env=production
```

### Upload Examples

```bash
# News gallery images
node upload-media.js /path/to/news/images news-gallery --env=production

# CSR images
node upload-media.js /path/to/csr/photos csr-images --env=production

# Infrastructure photos
node upload-media.js /path/to/facility/images infrastructure --env=production
```

## 📋 Available Categories

- `news-gallery` - News and media gallery
- `csr-images` - CSR program images
- `infrastructure` - Facility and infrastructure
- `leadership` - Leadership team photos
- `general-media` - General purpose media

## 🔍 Managing Media

### List All Media

```bash
# List all media files
node list-media.js

# List by category
node list-media.js news-gallery
```

Output example:
```
Media Files in Railway Database
Total: 15 files

news-gallery (8 files)
  • image1.jpg - 2.5 MB
    URL: https://automationservice-production-4565.up.railway.app/api/media/file/news-gallery/abc123.jpg
    Uploaded: 2025-01-31 10:30:00
```

### Delete Media

```bash
# Delete by ID (get ID from list command)
node delete-media.js abc-123-def-456
```

## 🌐 API Endpoints

All endpoints are under: `https://automationservice-production-4565.up.railway.app/api/media/`

| Endpoint | Method | Description |
|----------|---------|-------------|
| `/upload` | POST | Upload new media file |
| `/list` | GET | List all media files |
| `/list?category=news-gallery` | GET | List by category |
| `/file/:category/:filename` | GET | Get file directly |
| `/delete/:id` | DELETE | Delete media file |
| `/:id` | GET | Get media metadata |

## 🖼️ Frontend Integration

The website automatically fetches media from Railway:

### NewsMediaSection.jsx
```javascript
// Fetches latest 8 items from news-gallery
const API_URL = 'https://automationservice-production-4565.up.railway.app/api';
const response = await fetch(`${API_URL}/media/list?category=news-gallery`);
```

### GalleryPage.jsx
```javascript
// Fetches all gallery items
// Shows in grid layout with lightbox
```

## 🔄 Upload Workflow

1. **Prepare Files**: Collect all media in a folder
2. **Run Upload**: `node upload-media.js /folder/path category-name --env=production`
3. **Verify**: Check upload results in `temp/upload-results-*.json`
4. **Website Updates**: Automatically shows new media (no code changes needed!)

## 🛡️ Security

- Files served through Railway's secure CDN
- No direct file system access
- Proper CORS configuration
- File type validation (images/videos only)
- 50MB file size limit

## 🐛 Troubleshooting

### Upload Fails
```bash
# Check Railway service is running
curl https://automationservice-production-4565.up.railway.app/health

# Check file format (jpg, jpeg, png, webp, mp4, mov)
# Check file size (<50MB)
```

### Media Not Showing
1. Check browser console for errors
2. Verify API endpoint is accessible
3. Check CORS settings in automation service

### Common Issues

| Issue | Solution |
|-------|----------|
| "Failed to upload" | Check file size and format |
| "No media available" | API might be down, check Railway logs |
| CORS error | Automation service needs restart |
| 404 on images | File might be deleted, re-upload |

## 📊 Best Practices

1. **Organize Before Upload**: Group files by category
2. **Use Descriptive Names**: Files are renamed with UUIDs
3. **Check Results**: Always review upload-results JSON
4. **Regular Cleanup**: Delete old/unused media periodically
5. **Monitor Storage**: Check Railway dashboard for usage

## 🔮 Future Enhancements

- [ ] Image optimization on upload
- [ ] Automatic thumbnail generation
- [ ] Bulk delete functionality  
- [ ] Media search by metadata
- [ ] Upload progress bar
- [ ] Direct Railway dashboard integration

## 📞 Support

- **Railway Dashboard**: Check service logs
- **Upload Issues**: Review this documentation
- **API Problems**: Check automation-service code

---

**Important**: Always test uploads in development before production!

**Railway Service**: `automationservice-production-4565.up.railway.app`
**Repository**: Keep media files out of Git!