# Railway CMS Server Deployment Guide

## Current Issue
Your Railway deployment at `mspil-mcp-production.up.railway.app` is running the frontend app instead of the CMS server. This is why images aren't loading - there's no API server to fetch from.

## Solution: Create a Separate CMS Service on Railway

### Option 1: Deploy CMS as a Separate Service (Recommended)

1. **Go to your Railway project dashboard**

2. **Click "New Service" → "GitHub Repo"**

3. **Select the same repository** (`saifraza/mspil-website`)

4. **Configure the service:**
   - **Service Name**: `mspil-cms-backend`
   - **Root Directory**: `mcp-cms`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

5. **Set Environment Variables:**
   ```
   PORT=3002
   NODE_ENV=production
   JWT_SECRET=your-secret-key-here
   ```

6. **Deploy** - Railway will create a new URL like `mspil-cms-backend.up.railway.app`

7. **Update your frontend environment:**
   - In your frontend Railway service, add:
   ```
   REACT_APP_PRODUCTION_CMS_URL=https://mspil-cms-backend.up.railway.app
   ```

### Option 2: Convert Existing Service to CMS (Quick Fix)

If you want to quickly test, you can convert your current service to run the CMS:

1. **Go to your Railway service settings**

2. **Update the configuration:**
   - **Root Directory**: `mcp-cms`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

3. **Redeploy**

This will make `mspil-mcp-production.up.railway.app` serve the CMS API instead of the frontend.

### Option 3: Use Separate Repository for CMS

1. **Create a new repository** with just the CMS code:
   ```bash
   # Copy mcp-cms folder to a new location
   cp -r mcp-cms ~/mspil-cms-server
   cd ~/mspil-cms-server
   git init
   git add .
   git commit -m "Initial CMS server"
   git remote add origin https://github.com/saifraza/mspil-cms-server.git
   git push -u origin main
   ```

2. **Deploy this new repo to Railway** as a separate service

## Testing the CMS Server

Once deployed, test your CMS server:

```bash
# Check health endpoint
curl https://your-cms-url.up.railway.app/health

# Should return:
# {"status":"healthy","timestamp":"...","server":"MCP CMS","version":"1.0"}
```

## Update Frontend to Use New CMS URL

Once your CMS is properly deployed, update the ImageContext.jsx:

```javascript
const productionUrls = [
  'https://your-cms-backend.up.railway.app', // Your new CMS URL
  // ... other fallback URLs
];
```

## Why This Happened

Your current Railway deployment is configured to run the frontend (using `npm start` which runs `vite preview`). The CMS server code exists in the `mcp-cms` subfolder but isn't being executed.

For a full-stack app like yours, you need:
- **Service 1**: Frontend (React/Vite) - serves the website
- **Service 2**: Backend (Express/CMS) - serves the API

## Current Working Setup

Your CMS is currently working on Replit at:
`https://cc50211b-1805-4ab0-90fb-7fcbdbeeeb89-00-1zns0fu6kq06t.janeway.replit.dev`

This is why images upload there but your Railway "CMS" URL shows the frontend instead.