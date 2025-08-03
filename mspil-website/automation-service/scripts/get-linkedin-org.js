import axios from 'axios';

const ACCESS_TOKEN = 'AQXDna4TIrbSS5onRRhZal-XWo_rq7boO_NyG2E23yLaqiSHGW0d4wUroumu4uxZerQROLSuQH8Qw8lnGAAmFaSWw5hlCzp4YtcFL2zGtwie4Pf_hemlenzkTAhNRdX_oQr2GWHPe3SEguUL8GHDbEo4xmE1t_gv_HrY9ezXb_ho2Cu3zHqkwMcbqhfyJwCAgsPHHC9qIL_KotfSZHNty2L8hJcRVx3NpAh9s2Uj4HIsg_lDGx4DZrdVPLdE_UjhdkM0hdqYwHTsYL4zJHJp-GOFP9Cx22ig3rIvlYI8-DUVPRhCvEh8sXHOrRfe2V4NceVW2xBvGwgS0jSynpw3wdyOhGKv3w';

async function getOrganizations() {
  try {
    console.log('Fetching your LinkedIn profile...');
    
    // First, get the user's profile
    const profileResponse = await axios.get(
      'https://api.linkedin.com/v2/me',
      {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'X-Restli-Protocol-Version': '2.0.0'
        }
      }
    );
    
    console.log('Profile ID:', profileResponse.data.id);
    console.log('Name:', `${profileResponse.data.localizedFirstName} ${profileResponse.data.localizedLastName}`);
    
    // Get organizations where user is admin
    console.log('\nFetching organizations...');
    const orgsResponse = await axios.get(
      'https://api.linkedin.com/v2/organizationAcls?q=roleAssignee&projection=(elements*(organization~(localizedName,vanityName,logoV2(original~:playableStreams))))',
      {
        headers: {
          'Authorization': `Bearer ${ACCESS_TOKEN}`,
          'X-Restli-Protocol-Version': '2.0.0'
        }
      }
    );
    
    console.log('\nYour Organizations:');
    console.log('==================');
    
    if (orgsResponse.data.elements && orgsResponse.data.elements.length > 0) {
      orgsResponse.data.elements.forEach((org, index) => {
        const orgId = org.organization.split(':').pop();
        const orgDetails = org['organization~'];
        
        console.log(`\n${index + 1}. ${orgDetails?.localizedName || 'Unknown Organization'}`);
        console.log(`   Organization ID: ${orgId}`);
        console.log(`   URN: ${org.organization}`);
        console.log(`   Vanity Name: ${orgDetails?.vanityName || 'N/A'}`);
        console.log(`   Role: ${org.role}`);
        console.log(`   State: ${org.state}`);
      });
      
      // Find MSPIL
      const mspilOrg = orgsResponse.data.elements.find(org => {
        const name = org['organization~']?.localizedName || '';
        const vanityName = org['organization~']?.vanityName || '';
        return name.toLowerCase().includes('mahakaushal') || 
               name.toLowerCase().includes('mspil') ||
               vanityName.toLowerCase().includes('mahakaushal');
      });
      
      if (mspilOrg) {
        const orgId = mspilOrg.organization.split(':').pop();
        console.log('\n✅ Found MSPIL Organization!');
        console.log('============================');
        console.log(`Organization ID: ${orgId}`);
        console.log('\nAdd these to your Railway environment variables:');
        console.log(`LINKEDIN_ACCESS_TOKEN=${ACCESS_TOKEN}`);
        console.log(`LINKEDIN_ORGANIZATION_ID=${orgId}`);
      }
    } else {
      console.log('No organizations found. Make sure you have admin access to the company page.');
    }
    
  } catch (error) {
    console.error('Error details:');
    console.error('Status:', error.response?.status);
    console.error('Status Text:', error.response?.statusText);
    console.error('Response:', JSON.stringify(error.response?.data, null, 2));
    console.error('Message:', error.message);
    if (error.response?.status === 401) {
      console.error('Token may be invalid or expired');
    } else if (error.response?.status === 403) {
      console.error('Missing required permissions. Token may not have the right scopes.');
    }
  }
}

getOrganizations();