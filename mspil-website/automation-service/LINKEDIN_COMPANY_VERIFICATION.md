# LinkedIn Company Page Verification & API Setup Guide

## Current Status
We have created two LinkedIn apps, but both currently only have access to personal posting (w_member_social scope). To post to the MSPIL company page, we need to complete the verification process and get Community Management API access.

## Apps Created

### App 1: MSPIL Marketing Agent (Original)
- **Client ID:** 77xrb2lo8zsjvo
- **Client Secret:** WPL_AP1.kMMFHNHMsb1Wi64n.2n1RXg==
- **Status:** Has Sign In with LinkedIn, can only post to personal profiles
- **Issue:** Cannot request Community Management API (conflicts with other products)

### App 2: MSPIL Community Manager (New)
- **Client ID:** 77lkge7jwavmew  
- **Client Secret:** WPL_AP1.7JoU5L4lxLKVN7ao.rJjTQQ==
- **Status:** Created specifically for Community Management API
- **Next Step:** Needs company verification before requesting API access

## 🚨 IMMEDIATE ACTION REQUIRED

### Step 1: Company Page Verification
A LinkedIn company page administrator needs to complete the verification:

**Verification URL:** 
```
https://www.linkedin.com/developers/apps/verification/290e08b1-b1fa-44ff-a40a-e0bf96d267cf
```

**Who can complete this:**
- Any admin of the MSPIL LinkedIn company page
- Must be logged into LinkedIn with admin account
- Takes only 2-3 minutes

**What happens:**
1. Admin clicks the verification link
2. LinkedIn shows the app details
3. Admin confirms MSPIL owns this app
4. Verification is instant

### Step 2: After Verification (Admin or Developer)
Once verified, go to the LinkedIn app settings:

1. Visit: https://www.linkedin.com/developers/apps/290917606/products
2. Click "Request access" next to "Community Management API"
3. Fill out the brief form explaining:
   - Purpose: "Automated company page content posting for marketing"
   - Use case: "Post company updates, achievements, and industry news"
4. Wait for approval (usually 1-2 business days)

### Step 3: Generate Access Token with Correct Scopes
After Community Management API is approved:

1. Run the OAuth script with updated scopes:
```bash
cd /Users/saifraza/Desktop/Website/mspil-website/automation-service/scripts
node linkedin-auth-company.js
```

2. The script will:
   - Open browser for authorization
   - Request these scopes: `w_organization_social r_organization_social`
   - Return access token and organization ID

### Step 4: Configure Railway Environment
Add these environment variables to Railway:

```
LINKEDIN_ACCESS_TOKEN=<token_from_step_3>
LINKEDIN_ORGANIZATION_ID=<org_id_from_step_3>
LINKEDIN_CLIENT_ID=77lkge7jwavmew
LINKEDIN_CLIENT_SECRET=WPL_AP1.7JoU5L4lxLKVN7ao.rJjTQQ==
```

## Current Token (Personal Only)
We have a token but it only works for personal posting:
```
Token: AQXDna4TIrbSS5onRRhZal-XWo_rq7boO_NyG2E23yLaqiSHGW0d4wUroumu4uxZerQROLSuQH8Qw8lnGAAmFaSWw5hlCzp4YtcFL2zGtwie4Pf_hemlenzkTAhNRdX_oQr2GWHPe3SEguUL8GHDbEo4xmE1t_gv_HrY9ezXb_ho2Cu3zHqkwMcbqhfyJwCAgsPHHC9qIL_KotfSZHNty2L8hJcRVx3NpAh9s2Uj4HIsg_lDGx4DZrdVPLdE_UjhdkM0hdqYwHTsYL4zJHJp-GOFP9Cx22ig3rIvlYI8-DUVPRhCvEh8sXHOrRfe2V4NceVW2xBvGwgS0jSynpw3wdyOhGKv3w
Scope: w_member_social (personal posting only)
```

## Why This Process?
LinkedIn requires verification to ensure:
1. Only legitimate companies can post to their pages
2. Apps have proper authorization from page owners
3. API access is used responsibly

## Timeline
1. **Today:** Send verification link to page admin
2. **After verification:** Request Community Management API (5 minutes)
3. **1-2 days:** LinkedIn approves API access
4. **Then:** Generate proper token and start posting!

## Quick Reference Commands

### Test Current Token (Personal Only)
```bash
cd scripts
node test-linkedin-token.js
```

### Generate New Token (After API Approval)
```bash
cd scripts
node linkedin-auth-company.js
```

### Test Company Posting
```bash
cd scripts
node test-company-post.js
```

## Support
If you encounter issues:
1. Ensure the page admin completes verification first
2. Check that Community Management API shows as "approved"
3. Verify the token has `w_organization_social` scope
4. Contact LinkedIn developer support if needed

---
Last Updated: February 1, 2025