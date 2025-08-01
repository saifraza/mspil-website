# MSPIL AI Marketing Agent - Complete Deployment Guide

## Overview
You'll need to create **2 services** on Railway:
1. **PostgreSQL Database** - For storing news, chat history, and content
2. **Automation Service** - The AI marketing agent backend

## Step-by-Step Deployment

### Step 1: Create Railway Project
1. Go to [Railway.app](https://railway.app)
2. Click "New Project"
3. Name it "MSPIL Marketing Agent"

### Step 2: Add PostgreSQL Database
1. In your Railway project, click "+ New"
2. Select "Database" → "Add PostgreSQL"
3. Railway will automatically create the database
4. Click on the PostgreSQL service to view credentials
5. Copy the `DATABASE_URL` - you'll need this

### Step 3: Deploy Automation Service
1. In Railway project, click "+ New" → "GitHub Repo"
2. Select your repository
3. Set the root directory to `/automation-service`
4. Railway will auto-detect Node.js

### Step 4: Configure Environment Variables
Click on the automation service and add these variables:

```env
# Required Variables
PORT=3001
NODE_ENV=production
DATABASE_URL=[paste from PostgreSQL service]
OPENAI_API_KEY=sk-...your-openai-key...
LINKEDIN_ACCESS_TOKEN=your-linkedin-token
LINKEDIN_PAGE_ID=your-linkedin-page-id
JWT_SECRET=generate-random-secret-here
CORS_ORIGIN=https://mspil.in

# Optional
NEWS_CHECK_INTERVAL=0 0 */6 * * *
OPENAI_RATE_LIMIT=60
LINKEDIN_RATE_LIMIT=100
```

### Step 5: Get API Keys

#### OpenAI API Key:
1. Go to [platform.openai.com](https://platform.openai.com)
2. Create account/login
3. Go to API Keys section
4. Create new secret key
5. Copy and save it

#### LinkedIn Access Token:
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/)
2. Create a new app
3. Add these permissions:
   - `w_member_social`
   - `r_organization_social`
   - `w_organization_social`
4. Get your Company Page ID from LinkedIn
5. Generate access token (you may need to implement OAuth flow)

### Step 6: Update Frontend
1. After Railway deploys, get your service URL
2. Update your frontend `.env`:
```env
VITE_AUTOMATION_SERVICE_URL=https://your-service.railway.app
```
3. Rebuild and deploy frontend

### Step 7: Test Everything
1. Visit your News Media page
2. Click "Marketing Agent" button
3. Test these commands:
   - "What are the latest sugar industry news?"
   - "Generate an image of a sugar factory"
   - "Post about our 350 KLPD ethanol capacity to LinkedIn"

## Services Architecture

```
┌─────────────────┐     ┌──────────────────┐     ┌─────────────┐
│   Frontend      │────▶│ Automation       │────▶│ PostgreSQL  │
│  (mspil.in)     │     │  Service         │     │  Database   │
└─────────────────┘     └──────────────────┘     └─────────────┘
                               │
                               ├──▶ OpenAI API
                               ├──▶ LinkedIn API
                               └──▶ ChiniMandi.com
```

## What Each Service Does

### PostgreSQL Database
- Stores chat conversations
- Saves scraped news articles
- Tracks scheduled posts
- Stores generated images metadata
- Analytics and performance data

### Automation Service
- Handles AI chat conversations
- Scrapes news from ChiniMandi.com
- Posts to LinkedIn
- Generates images with DALL-E 3
- Schedules content
- Provides API for frontend

## Quick Commands for Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link to project
railway link

# Deploy
railway up

# View logs
railway logs

# Open dashboard
railway open
```

## Troubleshooting

### Database Connection Issues
- Ensure DATABASE_URL is correctly set
- Check if PostgreSQL service is running
- Verify SSL settings for production

### LinkedIn Posting Fails
- Check access token validity
- Verify page permissions
- Ensure rate limits not exceeded

### Image Generation Issues
- Verify OpenAI API key
- Check account credits
- Ensure prompt is appropriate

### CORS Errors
- Update CORS_ORIGIN to match your domain
- Include https:// in the URL

## Next Steps After Deployment

1. **Monitor Logs**: Check Railway logs for any errors
2. **Test News Scraping**: Wait for scheduled news check or trigger manually
3. **Create Content**: Use the chat to create your first LinkedIn post
4. **Set Up Webhooks**: Configure LinkedIn webhooks for real-time analytics
5. **Add More Sources**: Extend news sources beyond ChiniMandi

## Cost Estimates

- **Railway PostgreSQL**: ~$5-7/month
- **Railway Compute**: ~$5/month (for automation service)
- **OpenAI API**: ~$20-50/month (depending on usage)
- **Total**: ~$30-65/month

## Security Checklist

✅ All API keys in environment variables
✅ HTTPS enabled on Railway
✅ Database SSL enabled
✅ Rate limiting implemented
✅ CORS properly configured
✅ No hardcoded secrets in code