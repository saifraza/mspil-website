import axios from 'axios';

// These will be set after running linkedin-auth-company.js successfully
const ACCESS_TOKEN = process.env.LINKEDIN_ACCESS_TOKEN || 'YOUR_TOKEN_HERE';
const ORGANIZATION_ID = process.env.LINKEDIN_ORGANIZATION_ID || 'YOUR_ORG_ID_HERE';

async function testCompanyPost() {
  console.log('🏢 Testing LinkedIn Company Page Posting');
  console.log('========================================\n');
  
  if (ACCESS_TOKEN === 'YOUR_TOKEN_HERE' || ORGANIZATION_ID === 'YOUR_ORG_ID_HERE') {
    console.error('❌ Please set ACCESS_TOKEN and ORGANIZATION_ID first!');
    console.error('Run linkedin-auth-company.js to get these values.');
    return;
  }
  
  console.log('Organization ID:', ORGANIZATION_ID);
  console.log('Token (first 20 chars):', ACCESS_TOKEN.substring(0, 20) + '...\n');
  
  // Test post content
  const postContent = {
    author: `urn:li:organization:${ORGANIZATION_ID}`,
    lifecycleState: 'PUBLISHED',
    specificContent: {
      'com.linkedin.ugc.ShareContent': {
        shareCommentary: {
          text: `🌟 Test Post from MSPIL AI Marketing Agent 🌟\n\nThis is a test post to verify our LinkedIn integration is working correctly.\n\n✅ Automated posting capability confirmed\n🤖 AI-powered content generation ready\n📊 Marketing automation system online\n\n#MSPIL #Automation #Testing\n\nTimestamp: ${new Date().toISOString()}`
        },
        shareMediaCategory: 'NONE'
      }
    },
    visibility: {
      'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
    }
  };
  
  try {
    console.log('📤 Sending test post to LinkedIn...\n');
    
    const response = await axios({
      method: 'POST',
      url: 'https://api.linkedin.com/v2/ugcPosts',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      data: postContent
    });
    
    console.log('✅ SUCCESS! Post published to company page!');
    console.log('\nResponse:', response.data);
    
    const postId = response.data.id;
    console.log('\n📌 Post Details:');
    console.log('Post ID:', postId);
    console.log('Status:', response.status);
    console.log('View on LinkedIn: https://www.linkedin.com/company/mahakaushal-sugar-and-power-industries-limited/posts/');
    
  } catch (error) {
    console.error('\n❌ Error posting to LinkedIn:');
    
    if (error.response) {
      console.error('Status:', error.response.status);
      console.error('Status Text:', error.response.statusText);
      console.error('Error Data:', JSON.stringify(error.response.data, null, 2));
      
      if (error.response.status === 401) {
        console.error('\n⚠️  Authentication failed. Token may be expired or invalid.');
      } else if (error.response.status === 403) {
        console.error('\n⚠️  Permission denied. Possible reasons:');
        console.error('1. Token lacks w_organization_social scope');
        console.error('2. User is not an admin of the organization');
        console.error('3. Community Management API not approved');
      } else if (error.response.status === 422) {
        console.error('\n⚠️  Invalid request format. Check the post content structure.');
      }
    } else {
      console.error('Error:', error.message);
    }
    
    console.error('\n💡 Troubleshooting Steps:');
    console.error('1. Verify the app is verified by a page admin');
    console.error('2. Ensure Community Management API is approved');
    console.error('3. Run linkedin-auth-company.js to get a fresh token');
    console.error('4. Check that you have admin access to the company page');
  }
}

// Run the test
testCompanyPost();