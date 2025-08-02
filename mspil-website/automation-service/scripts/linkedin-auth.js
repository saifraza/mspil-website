import express from 'express';
import axios from 'axios';
import open from 'open';

// Your LinkedIn App Credentials
const CLIENT_ID = '77xrb2lo8zsjvo';
const CLIENT_SECRET = 'WPL_AP1.kMMFHNHMsb1Wi64n.2n1RXg==';
const REDIRECT_URI = 'http://localhost:8888/callback';
const SCOPES = 'r_liteprofile r_emailaddress';

const app = express();
let server;

// Step 1: Redirect to LinkedIn authorization
app.get('/auth', (req, res) => {
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
  res.redirect(authUrl);
});

// Step 2: Handle callback and exchange code for token
app.get('/callback', async (req, res) => {
  const { code, error } = req.query;
  
  if (error) {
    res.send(`Error: ${error}`);
    return;
  }
  
  try {
    // Exchange code for access token
    const tokenResponse = await axios.post(
      'https://www.linkedin.com/oauth/v2/accessToken',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        redirect_uri: REDIRECT_URI
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    );
    
    const accessToken = tokenResponse.data.access_token;
    
    // Get organization access
    const orgsResponse = await axios.get(
      'https://api.linkedin.com/v2/organizationAcls?q=roleAssignee',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0'
        }
      }
    );
    
    const organizations = orgsResponse.data.elements;
    const mspilOrg = organizations.find(org => 
      org.organization.includes('mahakaushal') || 
      org.organization.includes('MSPIL')
    );
    
    res.send(`
      <html>
        <body style="font-family: Arial; padding: 20px;">
          <h1>LinkedIn Authorization Successful!</h1>
          <h2>Your Access Token:</h2>
          <pre style="background: #f0f0f0; padding: 10px; overflow-x: auto;">${accessToken}</pre>
          
          <h2>Your Organizations:</h2>
          <ul>
            ${organizations.map(org => `
              <li>
                Organization ID: <code>${org.organization}</code><br>
                Role: ${org.role}
              </li>
            `).join('')}
          </ul>
          
          <h2>Environment Variables for Railway:</h2>
          <pre style="background: #f0f0f0; padding: 10px; overflow-x: auto;">
LINKEDIN_ACCESS_TOKEN=${accessToken}
LINKEDIN_ORGANIZATION_ID=${mspilOrg ? mspilOrg.organization.split(':').pop() : 'YOUR_ORG_ID_HERE'}
LINKEDIN_CLIENT_ID=${CLIENT_ID}
LINKEDIN_CLIENT_SECRET=${CLIENT_SECRET}</pre>
          
          <p><strong>Save these values!</strong> The access token expires in 60 days.</p>
          <p>You can close this window now.</p>
        </body>
      </html>
    `);
    
    // Close the server after success
    setTimeout(() => {
      console.log('\nSaved your credentials! You can close this process.');
      server.close();
      process.exit(0);
    }, 5000);
    
  } catch (error) {
    console.error('Error:', error.response?.data || error.message);
    res.send(`Error getting access token: ${error.message}`);
  }
});

// Start server and open browser
server = app.listen(8888, () => {
  console.log('Authorization server running on http://localhost:8888');
  console.log('Opening LinkedIn authorization in your browser...');
  open('http://localhost:8888/auth');
});

console.log('\nLinkedIn OAuth Setup');
console.log('====================');
console.log('1. Browser will open LinkedIn authorization page');
console.log('2. Log in and authorize the app');
console.log('3. You\'ll be redirected back with your access token');
console.log('\nWaiting for authorization...');