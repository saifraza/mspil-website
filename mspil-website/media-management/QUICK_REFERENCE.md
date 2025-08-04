# 🚀 Media Upload - Quick Reference

## Upload Media in 3 Steps:

### 1️⃣ Navigate to scripts
```bash
cd /Users/saifraza/Desktop/Website/mspil-website/media-management/scripts
```

### 2️⃣ Upload your files
```bash
# For news/gallery images
node upload-media.js /Users/saifraza/Desktop/temp news-gallery --env=production
```

### 3️⃣ Verify upload
```bash
# Check what was uploaded
node list-media.js news-gallery
```

## 📂 Categories:
- `news-gallery` - News & media gallery
- `csr-images` - CSR programs
- `infrastructure` - Facilities
- `leadership` - Team photos
- `general-media` - Other files

## 🌐 Live URLs:
- **API**: `https://automationservice-production-4565.up.railway.app/api/media/`
- **Website**: Automatically shows new media at `/news-media` and `/gallery`

## ⚠️ Remember:
- Files must be < 50MB
- Supported: jpg, jpeg, png, webp, mp4, mov
- Results saved in `temp/upload-results-*.json`

---
**That's it! Your media is now live on the website!** 🎉