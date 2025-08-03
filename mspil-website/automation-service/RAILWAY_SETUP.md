# Railway Environment Variables Setup

## Required Environment Variables

You need to set these environment variables in your Railway service:

### 1. ANTHROPIC_API_KEY (Required)
```
ANTHROPIC_API_KEY=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
```

### 2. PORT (Auto-set by Railway)
Railway automatically sets this, but you can override:
```
PORT=8080
```

### 3. NODE_ENV
```
NODE_ENV=production
```

### 4. CORS_ORIGIN
```
CORS_ORIGIN=https://mspil.in
```

### 5. DATABASE_URL (Optional)
If you have a PostgreSQL database:
```
DATABASE_URL=${{Postgres.DATABASE_URL}}
```

### 6. LinkedIn API (Optional - for future)
```
LINKEDIN_ACCESS_TOKEN=your_linkedin_token_here
LINKEDIN_PAGE_ID=your_linkedin_page_id_here
```

### 7. Pexels API (Optional - for stock images)
```
PEXELS_API_KEY=your_pexels_api_key_here
```

## How to Set in Railway

1. Go to your Railway service dashboard
2. Click on your `automationservice` service
3. Go to the "Variables" tab
4. Click "Raw Editor" 
5. Add all the variables above
6. Click "Save"
7. The service will automatically redeploy

## Testing the Setup

After deployment, test the API:

1. Check health:
```
https://automationservice-production-4565.up.railway.app/health
```

2. Test Anthropic API:
```
https://automationservice-production-4565.up.railway.app/api/test-anthropic
```

This will tell you if the API key is working correctly.