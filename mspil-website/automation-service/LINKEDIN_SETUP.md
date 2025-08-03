# LinkedIn Integration Setup Guide

## Overview
This guide will help you set up LinkedIn OAuth 2.0 for posting to your company page through the AI Marketing Agent.

## Company Page Information
- **Company Name**: Mahakaushal Sugar & Power Industries Ltd.
- **LinkedIn URL**: https://www.linkedin.com/company/mahakaushal-sugar-and-power-industries-limited
- **Company ID**: You'll need this for API calls (extract from URL or API)

## Prerequisites
1. LinkedIn account with admin access to the company page
2. LinkedIn Developer account

## Step 1: Create LinkedIn App

1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/apps)
2. Click "Create app"
3. Fill in the required information:
   - **App name**: MSPIL Marketing Agent
   - **LinkedIn Page**: Select "Mahakaushal Sugar & Power Industries Limited"
   - **Privacy policy URL**: https://www.mspil.in/privacy-policy
   - **App logo**: Upload company logo
4. Click "Create app"

## Step 2: Configure OAuth Settings

1. In your app settings, go to the "Auth" tab
2. Add Authorized redirect URLs:
   ```
   https://automationservice-production-4565.up.railway.app/api/auth/linkedin/callback
   http://localhost:3001/api/auth/linkedin/callback
   ```
3. Note down your:
   - **Client ID**
   - **Client Secret**

## Step 3: Request Required Permissions

1. Go to the "Products" tab
2. Request access to:
   - **Share on LinkedIn** (for posting content)
   - **Sign In with LinkedIn** (for authentication)
   - **Marketing Developer Platform** (for company page access)

Note: Some products require LinkedIn review and approval.

## Step 4: Get Access Token

### Option A: OAuth 2.0 Flow (Recommended for Production)
1. Direct user to LinkedIn authorization URL:
   ```
   https://www.linkedin.com/oauth/v2/authorization?
   response_type=code&
   client_id={YOUR_CLIENT_ID}&
   redirect_uri={YOUR_REDIRECT_URI}&
   scope=w_member_social%20r_liteprofile%20w_organization_social
   ```

2. After authorization, LinkedIn redirects with a code
3. Exchange code for access token:
   ```bash
   curl -X POST https://www.linkedin.com/oauth/v2/accessToken \
   -H 'Content-Type: application/x-www-form-urlencoded' \
   -d 'grant_type=authorization_code' \
   -d 'code={AUTHORIZATION_CODE}' \
   -d 'client_id={YOUR_CLIENT_ID}' \
   -d 'client_secret={YOUR_CLIENT_SECRET}' \
   -d 'redirect_uri={YOUR_REDIRECT_URI}'
   ```

### Option B: LinkedIn Developer Testing (For Testing Only)
1. In your app's "Auth" tab, find "OAuth 2.0 tools"
2. Generate a test access token with required scopes
3. This token expires in 60 days

## Step 5: Get Organization ID

Once you have an access token, get your organization ID:

```bash
curl -X GET 'https://api.linkedin.com/v2/organizationAcls?q=roleAssignee' \
-H 'Authorization: Bearer {YOUR_ACCESS_TOKEN}' \
-H 'X-Restli-Protocol-Version: 2.0.0'
```

Look for your organization in the response and note the organization ID.

## Step 6: Configure Environment Variables

Add these to your Railway automation service:

```env
LINKEDIN_CLIENT_ID=your_client_id_here
LINKEDIN_CLIENT_SECRET=your_client_secret_here
LINKEDIN_ACCESS_TOKEN=your_access_token_here
LINKEDIN_ORGANIZATION_ID=your_organization_id_here
LINKEDIN_REDIRECT_URI=https://automationservice-production-4565.up.railway.app/api/auth/linkedin/callback
```

## Step 7: Test Posting

Test posting to your company page:

```javascript
// The AI agent can now post using commands like:
// "Post to LinkedIn about our new ethanol production milestone"
// "Share our sustainability report on LinkedIn with an image"
```

## API Endpoints for Posting

### Text Post
```
POST https://api.linkedin.com/v2/ugcPosts
```

### Image Post
1. Register upload
2. Upload image
3. Create post with image reference

## Rate Limits
- 100 API calls per day per application
- 3 calls per user per day for content creation

## Security Notes
1. Never commit access tokens to version control
2. Use environment variables for all credentials
3. Implement token refresh mechanism for production
4. Regularly rotate access tokens

## Troubleshooting

### Common Issues:
1. **"Insufficient permissions"**: Check that all required products are approved
2. **"Invalid access token"**: Token may be expired, generate a new one
3. **"Organization not found"**: Ensure you have admin access to the company page

### Support Resources:
- [LinkedIn API Documentation](https://docs.microsoft.com/en-us/linkedin/)
- [LinkedIn Developer Support](https://www.linkedin.com/help/linkedin/ask/LDS)

## Next Steps
1. Complete the OAuth setup
2. Test posting through the AI Marketing Agent
3. Monitor API usage and rate limits
4. Set up automated token refresh (for production)