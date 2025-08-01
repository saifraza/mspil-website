# Railway Frontend Environment Variables

## For MSPIL Website Service

You need to set this environment variable in your **main website Railway service** (not the automation service):

```
NODE_ENV=production
VITE_AUTOMATION_SERVICE_URL=https://automationservice-production-4565.up.railway.app
```

## How to Set:

1. Go to your Railway dashboard
2. Click on your **mspil-website** service (the main website)
3. Go to the "Variables" tab
4. Add these variables:
   - `NODE_ENV` = `production`
   - `VITE_AUTOMATION_SERVICE_URL` = `https://automationservice-production-4565.up.railway.app`
5. Save the changes
6. The service will automatically redeploy

## Important Notes:

- This is for the **main website** service, NOT the automation service
- The URL should point to your automation service (automationservice-production-4565.up.railway.app)
- Make sure there are no trailing slashes in the URL
- After setting, the website will use the correct automation service URL