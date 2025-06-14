# GitHub Deployment Guide for MSPIL Website

## Prerequisites
- GitHub account
- Repository created on GitHub

## Steps to Push Code to GitHub

### 1. Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `mspil-website` (or your preferred name)
3. Keep it Public or Private as needed
4. Don't initialize with README (we already have files)
5. Click "Create repository"

### 2. Push Code to GitHub
After creating the repository, run these commands:

```bash
# Add your GitHub repository as remote (replace with your actual URL)
git remote add origin https://github.com/YOUR_USERNAME/mspil-website.git

# Push the code
git push -u origin main
```

## Deployment Options

### Option 1: Deploy Frontend to Netlify (Recommended)
1. Go to https://app.netlify.com
2. Click "Add new site" → "Import an existing project"
3. Connect your GitHub account
4. Select your repository
5. Build settings:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"

### Option 2: Deploy Frontend to Vercel
1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Framework preset: Vite
5. Build settings will be auto-detected
6. Click "Deploy"

### Option 3: Keep using Railway
Since you're already using Railway for the CMS, you can also deploy the frontend there:
1. Go to your Railway dashboard
2. New Project → Deploy from GitHub repo
3. Select your repository
4. Add these environment variables:
   - `NODE_ENV=production`
   - Any other env variables needed
5. Deploy

## Environment Variables for Production

Create these environment variables in your deployment platform:

```env
# For production frontend
VITE_CMS_URL=https://mspil-mcp-production.up.railway.app

# If deploying CMS separately
NODE_ENV=production
JWT_SECRET=your-secret-key-here
OPENAI_API_KEY=your-openai-key (optional)
```

## Post-Deployment Checklist

- [ ] Frontend accessible at production URL
- [ ] CMS server running on Railway
- [ ] Images loading from CMS correctly
- [ ] All environment variables set
- [ ] CORS configured properly
- [ ] SSL certificates working

## Updating the Site

To update your site after making changes:

```bash
# Make your changes
git add .
git commit -m "Your commit message"
git push

# Netlify/Vercel will auto-deploy
# For Railway, it will also auto-deploy if connected to GitHub
```

## Important Notes

1. **CMS Server**: Keep your existing Railway CMS server (https://mspil-mcp-production.up.railway.app)
2. **Images**: All images are served from the CMS server
3. **Database**: The `published-content.json` is stored on the CMS server
4. **Authentication**: CMS login credentials are managed on the server

## Support

If you need help with deployment, check:
- Netlify docs: https://docs.netlify.com
- Vercel docs: https://vercel.com/docs
- Railway docs: https://docs.railway.app