# MSPIL Website - Startup Guide

## 🚀 Quick Start

### Option 1: Simple Startup (Recommended)
```bash
npm start
```

### Option 2: Development Mode
```bash
npm run dev
```

### Option 3: Manual Startup
```bash
# Terminal 1 - Start CMS Server
npm run cms:server

# Terminal 2 - Start Main App
npm run app:only
```

## 📋 What Gets Started

✅ **Main Website**: http://localhost:3000  
✅ **CMS Server**: http://localhost:3002

## 🔑 CMS Login Credentials

- **Username**: `admin` | **Password**: `admin123`
- **Username**: `editor` | **Password**: `editor123`

## 📁 CMS Features

🤖 **AI-Powered File Placement**  
- Upload files with comments
- Get intelligent placement suggestions
- Automatic categorization

📂 **Supported Categories**  
- `media-images` → `/public/images/media/`
- `sugar-data` → `/public/documents/sugar-data/`
- `timeline-images` → `/public/images/about-us/`
- `office-images` → `/public/images/office/`
- `general-documents` → `/public/documents/general/`

## 🛠 Access CMS

1. Go to http://localhost:3000
2. Click the **Settings icon (⚙️)** in the navbar
3. Login with credentials above
4. Upload files with AI assistance!

## 🔧 Troubleshooting

**Port Issues**: If ports are in use, servers will auto-select available ports.

**CMS Not Working**: Ensure both servers are running. Check:
- http://localhost:3002/health (should return JSON)
- Browser console for errors

**File Upload Issues**: Check server logs for detailed error messages.

## 📦 Production Deployment

```bash
# Build the app
npm run build

# The CMS server can run with:
node mcp-cms/server.cjs
```

---
*Generated with MCP CMS - AI-Powered Content Management*