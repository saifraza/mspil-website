import axios from 'axios';

const ACCESS_TOKEN = 'AQXDna4TIrbSS5onRRhZal-XWo_rq7boO_NyG2E23yLaqiSHGW0d4wUroumu4uxZerQROLSuQH8Qw8lnGAAmFaSWw5hlCzp4YtcFL2zGtwie4Pf_hemlenzkTAhNRdX_oQr2GWHPe3SEguUL8GHDbEo4xmE1t_gv_HrY9ezXb_ho2Cu3zHqkwMcbqhfyJwCAgsPHHC9qIL_KotfSZHNty2L8hJcRVx3NpAh9s2Uj4HIsg_lDGx4DZrdVPLdE_UjhdkM0hdqYwHTsYL4zJHJp-GOFP9Cx22ig3rIvlYI8-DUVPRhCvEh8sXHOrRfe2V4NceVW2xBvGwgS0jSynpw3wdyOhGKv3w';

async function testToken() {
  console.log('Testing LinkedIn token...');
  console.log('Token (first 20 chars):', ACCESS_TOKEN.substring(0, 20) + '...');
  
  try {
    // Simple test - just get the user profile
    const response = await axios({
      method: 'GET',
      url: 'https://api.linkedin.com/v2/me',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    console.log('\n✅ Token is valid!');
    console.log('User ID:', response.data.id);
    console.log('Name:', `${response.data.localizedFirstName} ${response.data.localizedLastName}`);
    
    // Now try to get organizations
    console.log('\nFetching organizations...');
    const orgsResponse = await axios({
      method: 'GET',
      url: 'https://api.linkedin.com/v2/organizationAcls?q=roleAssignee',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'X-Restli-Protocol-Version': '2.0.0'
      }
    });
    
    if (orgsResponse.data.elements) {
      console.log(`\nFound ${orgsResponse.data.elements.length} organization(s):`);
      orgsResponse.data.elements.forEach((org, index) => {
        const orgId = org.organization.split(':').pop();
        console.log(`${index + 1}. Organization ID: ${orgId}`);
        console.log(`   Full URN: ${org.organization}`);
        console.log(`   Role: ${org.role}`);
      });
    } else {
      console.log('No organizations found.');
    }
    
  } catch (error) {
    console.error('\n❌ Error occurred:');
    if (error.code === 'ECONNREFUSED') {
      console.error('Connection refused - check your internet connection');
    } else if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Error:', error.response.data?.message || error.response.statusText);
      console.error('Full response:', JSON.stringify(error.response.data, null, 2));
    } else {
      console.error('Error:', error.message);
      console.error('Full error:', error);
    }
  }
}

testToken();