import express from 'express';
import axios from 'axios';
import open from 'open';

// MSPIL Community Manager App Credentials
const CLIENT_ID = '77lkge7jwavmew';
const CLIENT_SECRET = 'WPL_AP1.7JoU5L4lxLKVN7ao.rJjTQQ==';
const REDIRECT_URI = 'http://localhost:8888/callback';

// Company posting scopes
const SCOPES = 'w_organization_social r_organization_social r_organization_admin';

const app = express();
let server;

console.log('\n🏢 LinkedIn Company Page OAuth Setup');
console.log('====================================');
console.log('App: MSPIL Community Manager');
console.log('Purpose: Company page posting for MSPIL');
console.log('\n⚠️  IMPORTANT: This app must be verified first!');
console.log('Verification URL: https://www.linkedin.com/developers/apps/verification/290e08b1-b1fa-44ff-a40a-e0bf96d267cf');
console.log('\nRequesting scopes:', SCOPES);
console.log('\n');

// Step 1: Redirect to LinkedIn authorization
app.get('/auth', (req, res) => {
  const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${encodeURIComponent(SCOPES)}`;
  res.redirect(authUrl);
});

// Step 2: Handle callback and exchange code for token
app.get('/callback', async (req, res) => {
  const { code, error, error_description } = req.query;
  
  if (error) {
    console.error('\n❌ Authorization Error:', error);
    console.error('Description:', error_description);
    
    let helpMessage = '';
    if (error === 'unauthorized_scope_error') {
      helpMessage = `
        <h3>⚠️ Company Posting Scopes Not Available</h3>
        <p>The Community Management API is not yet approved for this app.</p>
        <ol>
          <li>First, complete company verification</li>
          <li>Then request Community Management API access</li>
          <li>Wait for LinkedIn approval (1-2 days)</li>
          <li>Run this script again</li>
        </ol>
      `;
    }
    
    res.send(`
      <html>
        <body style="font-family: Arial; padding: 20px;">
          <h1>❌ Authorization Failed</h1>
          <p>Error: ${error}</p>
          <p>Description: ${error_description || 'No description provided'}</p>
          ${helpMessage}
          <p><a href="/">Try Again</a></p>
        </body>
      </html>
    `);
    return;
  }
  
  try {
    console.log('📝 Exchanging authorization code for access token...');
    
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
    const expiresIn = tokenResponse.data.expires_in;
    
    console.log('✅ Access token obtained!');
    console.log('Token expires in:', Math.floor(expiresIn / 86400), 'days');
    
    // Get user profile to verify token
    console.log('\n🔍 Fetching user profile...');
    const profileResponse = await axios.get(
      'https://api.linkedin.com/v2/me',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0'
        }
      }
    );
    
    const userName = `${profileResponse.data.localizedFirstName} ${profileResponse.data.localizedLastName}`;
    console.log('User:', userName);
    
    // Get organization access
    console.log('\n🏢 Fetching organization access...');
    const orgsResponse = await axios.get(
      'https://api.linkedin.com/v2/organizationAcls?q=roleAssignee&projection=(elements*(organization~(localizedName,vanityName,logoV2(original~:playableStreams))))',
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0'
        }
      }
    );
    
    const organizations = orgsResponse.data.elements || [];
    const mspilOrg = organizations.find(org => {
      const name = org['organization~']?.localizedName || '';
      const vanityName = org['organization~']?.vanityName || '';
      return name.toLowerCase().includes('mahakaushal') || 
             name.toLowerCase().includes('mspil') ||
             vanityName.toLowerCase().includes('mahakaushal');
    });
    
    let orgDisplay = '';
    let envVars = '';
    
    if (mspilOrg) {
      const orgId = mspilOrg.organization.split(':').pop();
      const orgName = mspilOrg['organization~']?.localizedName;
      console.log('✅ Found MSPIL organization!');
      console.log('Organization:', orgName);
      console.log('Organization ID:', orgId);
      
      orgDisplay = `
        <h2>✅ MSPIL Organization Found!</h2>
        <p><strong>Organization:</strong> ${orgName}</p>
        <p><strong>Organization ID:</strong> ${orgId}</p>
        <p><strong>Your Role:</strong> ${mspilOrg.role}</p>
      `;
      
      envVars = `
LINKEDIN_ACCESS_TOKEN=${accessToken}
LINKEDIN_ORGANIZATION_ID=${orgId}
LINKEDIN_CLIENT_ID=${CLIENT_ID}
LINKEDIN_CLIENT_SECRET=${CLIENT_SECRET}`;
    } else if (organizations.length > 0) {
      orgDisplay = `
        <h2>Organizations Found:</h2>
        <ul>
          ${organizations.map(org => {
            const orgId = org.organization.split(':').pop();
            const orgName = org['organization~']?.localizedName || 'Unknown';
            return `<li>${orgName} (ID: ${orgId}, Role: ${org.role})</li>`;
          }).join('')}
        </ul>
        <p>⚠️ MSPIL organization not found in the list. Make sure you have admin access.</p>
      `;
    } else {
      orgDisplay = '<p>❌ No organizations found. Make sure you have admin access to the MSPIL company page.</p>';
    }
    
    res.send(`
      <html>
        <body style="font-family: Arial; padding: 20px; max-width: 800px; margin: 0 auto;">
          <h1>✅ LinkedIn Authorization Successful!</h1>
          
          <h2>Authenticated User</h2>
          <p><strong>Name:</strong> ${userName}</p>
          <p><strong>Token Expires:</strong> ${Math.floor(expiresIn / 86400)} days</p>
          
          ${orgDisplay}
          
          <h2>Access Token</h2>
          <pre style="background: #f0f0f0; padding: 10px; overflow-x: auto; word-break: break-all;">${accessToken}</pre>
          
          ${envVars ? `
          <h2>Environment Variables for Railway</h2>
          <pre style="background: #f0f0f0; padding: 10px; overflow-x: auto;">${envVars}</pre>
          
          <h2>Next Steps</h2>
          <ol>
            <li>Copy the environment variables above</li>
            <li>Go to your Railway dashboard</li>
            <li>Add these variables to your automation-service</li>
            <li>Redeploy the service</li>
            <li>Test posting through the AI chat!</li>
          </ol>
          ` : `
          <h2>⚠️ Action Required</h2>
          <p>MSPIL organization not found. Please ensure:</p>
          <ol>
            <li>You are an admin of the MSPIL LinkedIn page</li>
            <li>The app has been verified by a page admin</li>
            <li>Community Management API is approved</li>
          </ol>
          `}
          
          <p style="margin-top: 30px;"><em>You can close this window now.</em></p>
        </body>
      </html>
    `);
    
    // Close the server after success
    setTimeout(() => {
      console.log('\n✅ Process complete! Check your browser for the results.');
      server.close();
      process.exit(0);
    }, 5000);
    
  } catch (error) {
    console.error('\n❌ Error occurred:');
    console.error('Status:', error.response?.status);
    console.error('Error:', error.response?.data || error.message);
    
    let errorDetails = '';
    if (error.response?.data) {
      errorDetails = `<pre>${JSON.stringify(error.response.data, null, 2)}</pre>`;
    }
    
    res.send(`
      <html>
        <body style="font-family: Arial; padding: 20px;">
          <h1>❌ Error Getting Access Token</h1>
          <p>Status: ${error.response?.status || 'Unknown'}</p>
          <p>Error: ${error.message}</p>
          ${errorDetails}
          <p><a href="/">Try Again</a></p>
        </body>
      </html>
    `);
  }
});

// Root route
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body style="font-family: Arial; padding: 20px; max-width: 600px; margin: 0 auto;">
        <h1>LinkedIn Company Page OAuth</h1>
        <h2>Prerequisites</h2>
        <ol>
          <li>✅ App created: MSPIL Community Manager</li>
          <li>❓ Company verification completed?</li>
          <li>❓ Community Management API approved?</li>
        </ol>
        
        <h3>Verification Required</h3>
        <p>A LinkedIn page admin must verify this app first:</p>
        <p style="background: #f0f0f0; padding: 10px; word-break: break-all;">
          https://www.linkedin.com/developers/apps/verification/290e08b1-b1fa-44ff-a40a-e0bf96d267cf
        </p>
        
        <p style="margin-top: 30px;">
          <a href="/auth" style="background: #0077B5; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">
            Authorize with LinkedIn
          </a>
        </p>
        
        <p style="margin-top: 20px; color: #666;">
          This will request company page posting permissions.
        </p>
      </body>
    </html>
  `);
});

// Start server and open browser
server = app.listen(8888, () => {
  console.log('🚀 Authorization server running on http://localhost:8888');
  console.log('📱 Opening browser...\n');
  open('http://localhost:8888');
});