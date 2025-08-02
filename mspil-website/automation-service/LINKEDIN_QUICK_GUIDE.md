# LinkedIn Integration Quick Guide

## Current Status: ⚠️ Verification Needed

We have everything set up but need company page verification to enable posting.

## Quick Steps to Enable Company Posting

### 1. Send This to MSPIL Page Admin (TODAY)
```
Please verify our LinkedIn app for company posting:
https://www.linkedin.com/developers/apps/verification/290e08b1-b1fa-44ff-a40a-e0bf96d267cf

This takes 2 minutes and enables automated marketing posts.
```

### 2. After Verification (Admin Does This)
1. Go to: https://www.linkedin.com/developers/apps/290917606/products
2. Click "Request access" for Community Management API
3. Submit form (takes 5 minutes)
4. Wait 1-2 days for approval

### 3. Generate Company Token (After Approval)
```bash
cd automation-service/scripts
node linkedin-auth-company.js
```

### 4. Add to Railway
Copy the environment variables from step 3 to Railway.

## Testing Commands

### Check Current Token
```bash
cd automation-service/scripts
node test-linkedin-token.js
```

### Test Company Posting (After Setup)
```bash
cd automation-service/scripts
node test-company-post.js
```

## App Details

### MSPIL Community Manager
- **Client ID:** 77lkge7jwavmew
- **Purpose:** Company page posting only
- **Status:** Awaiting verification

### Current Token (Personal Only)
- Can post to personal profiles ✅
- Cannot post to company page ❌
- Need company verification first

## Files Created
1. `/automation-service/LINKEDIN_COMPANY_VERIFICATION.md` - Detailed guide
2. `/automation-service/scripts/linkedin-auth-company.js` - OAuth for company
3. `/automation-service/scripts/test-company-post.js` - Test posting
4. `/automation-service/LINKEDIN_QUICK_GUIDE.md` - This file

## Next Action
Send verification link to MSPIL LinkedIn page admin TODAY!