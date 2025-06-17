const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_URL = 'http://localhost:3002/api';

async function login() {
  console.log('🔐 Logging in...');
  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'admin',
      password: 'admin123'
    })
  });
  
  const data = await response.json();
  console.log('✅ Login successful!');
  return data.token;
}

async function uploadLeadershipImage(token) {
  console.log('\n📤 Testing leadership image upload...');
  
  // Use the existing nawab_raza.png as test file
  const sourceFile = path.join(__dirname, '..', 'public', 'images', 'leadership', 'nawab_raza.png');
  
  if (!fs.existsSync(sourceFile)) {
    console.error('❌ Source file not found:', sourceFile);
    return;
  }
  
  console.log('✅ Found source file:', sourceFile);
  const stats = fs.statSync(sourceFile);
  console.log(`📊 File size: ${stats.size} bytes`);
  
  try {
    // Create form data
    const form = new FormData();
    form.append('file', fs.createReadStream(sourceFile), 'saif_raza_test.png');
    form.append('comment', 'Saif Raza - Managing Director');
    form.append('summary', 'Test upload of Saif Raza portrait');
    form.append('forcePlacement', 'saif-raza-image');
    
    console.log('\n🚀 Uploading file...');
    
    // Upload the file
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        ...form.getHeaders()
      },
      body: form
    });
    
    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Upload response:', JSON.stringify(result, null, 2));
      
      // Check if file was copied to public
      const expectedPath = path.join(__dirname, '..', 'public', 'images', 'leadership');
      console.log('\n🔍 Checking leadership directory:', expectedPath);
      
      const files = fs.readdirSync(expectedPath);
      console.log('Files in leadership directory:');
      files.forEach(file => {
        const filePath = path.join(expectedPath, file);
        const fileStats = fs.statSync(filePath);
        console.log(`- ${file} (${fileStats.size} bytes, modified: ${fileStats.mtime.toISOString()})`);
      });
      
      // Check if the new file exists
      const newFiles = files.filter(f => f.includes('saif_raza_md'));
      if (newFiles.length > 0) {
        console.log('\n✅ SUCCESS! New file(s) created:', newFiles);
      } else {
        console.log('\n❌ FAILURE! No new saif_raza_md file found in public directory');
      }
      
    } else {
      console.error('❌ Upload failed:', result.error);
    }
  } catch (error) {
    console.error('❌ Upload error:', error);
  }
}

async function checkServer() {
  try {
    const response = await fetch(`${API_URL.replace('/api', '')}/health`);
    const data = await response.json();
    console.log('✅ Server is running:', data);
    return true;
  } catch (error) {
    console.error('❌ Server is not running. Please start the CMS server first.');
    console.log('Run: cd mcp-cms && npm start');
    return false;
  }
}

async function runTest() {
  console.log('🚀 Starting real upload test...\n');
  
  // Check if server is running
  if (!await checkServer()) {
    return;
  }
  
  try {
    // 1. Login
    const token = await login();
    
    // 2. Test leadership upload
    await uploadLeadershipImage(token);
    
    console.log('\n✅ Test completed!');
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
  }
}

// Run the test
runTest();