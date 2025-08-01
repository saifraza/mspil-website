# MSPIL Automation Service Information

## Production URL
**Service URL:** https://automationservice-production-4565.up.railway.app

## Frontend Integration
The frontend is already configured to use this URL via the `.env` file:
```
VITE_AUTOMATION_SERVICE_URL=https://automationservice-production-4565.up.railway.app
```

## API Endpoints
- **Health Check:** https://automationservice-production-4565.up.railway.app/health
- **Chat API:** https://automationservice-production-4565.up.railway.app/api/chat/message
- **News API:** https://automationservice-production-4565.up.railway.app/api/news/latest
- **Content API:** https://automationservice-production-4565.up.railway.app/api/content/create

## WebSocket Connection
The Marketing Agent chat interface connects via WebSocket to:
```
wss://automationservice-production-4565.up.railway.app
```

## Testing
1. Visit https://mspil.in/news-media
2. Click "Marketing Agent" button
3. Test commands:
   - "What are the latest sugar industry news?"
   - "Generate a LinkedIn post about our ethanol production"
   - "Show me the latest industry updates"

## Environment Variables Set
- ✅ NODE_ENV=production
- ✅ DATABASE_URL (from PostgreSQL)
- ✅ ANTHROPIC_API_KEY
- ✅ JWT_SECRET
- ✅ CORS_ORIGIN=https://mspil.in
- ❌ LINKEDIN_ACCESS_TOKEN (still needed)
- ❌ LINKEDIN_PAGE_ID (still needed)
- ❌ PEXELS_API_KEY (optional for better images)

## Deployment Status
- **Railway Service:** automationservice-production-4565
- **Region:** US West
- **Status:** Should be running once deployed successfully