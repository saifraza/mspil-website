# MSPIL Marketing Agent - Access Information

## Password Protection
The Marketing Agent is now password-protected to prevent unauthorized access.

**Current Password:** `1234`

## How to Access
1. Go to https://mspil.in/news-media
2. Click "Marketing Agent" button
3. Enter password: `1234`
4. You'll have access for the current browser session

## Security Notes
- Password is checked client-side (temporary solution)
- Session persists until browser is closed
- Change password in `MarketingAgentAuth.jsx` line 19

## To Change Password
Edit `/src/components/MarketingAgentAuth.jsx`:
```javascript
if (password === '1234') {  // Change '1234' to your new password
```

## Future Improvements
1. Move authentication to server-side
2. Add user management system
3. Implement proper JWT tokens
4. Add role-based access control

## Test Commands
Once authenticated, try:
- "What are the latest sugar industry news?"
- "Generate an image for our sustainability report"
- "Help me create a LinkedIn post about ethanol production"