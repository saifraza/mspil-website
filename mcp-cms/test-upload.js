const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Test configuration
const API_URL = 'http://localhost:3002/api';
const TEST_TOKEN = ''; // Will be set after login

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
  
  if (!response.ok) {
    throw new Error(`Login failed: ${response.status}`);
  }
  
  const data = await response.json();
  console.log('✅ Login successful!');
  return data.token;
}

async function testUpload(token) {
  console.log('\n📤 Testing file upload...');
  
  // Create a test file
  const testFileName = `test-upload-${Date.now()}.txt`;
  const testFilePath = path.join(__dirname, testFileName);
  fs.writeFileSync(testFilePath, `Test upload at ${new Date().toISOString()}\nThis is a test file to verify the CMS upload functionality.`);
  
  try {
    // Create form data
    const form = new FormData();
    form.append('file', fs.createReadStream(testFilePath));
    form.append('comment', 'Test upload from automated script');
    form.append('summary', 'Testing the upload functionality');
    
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
      console.log('✅ Upload successful!');
      console.log('📝 Response:', JSON.stringify(result, null, 2));
      return result.file;
    } else {
      console.error('❌ Upload failed:', result.error);
      return null;
    }
  } finally {
    // Clean up test file
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath);
    }
  }
}

async function testGetContent(token) {
  console.log('\n📋 Fetching content list...');
  
  const response = await fetch(`${API_URL}/content`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (!response.ok) {
    console.error('❌ Failed to fetch content:', response.status);
    return [];
  }
  
  const content = await response.json();
  console.log(`✅ Found ${content.length} files in the system`);
  
  // Show the 5 most recent uploads
  console.log('\n📝 Most recent uploads:');
  content.slice(0, 5).forEach((file, index) => {
    console.log(`${index + 1}. ${file.filename} - ${file.category} - ${new Date(file.uploadedAt).toLocaleString()}`);
  });
  
  return content;
}

async function testDownload(token, file) {
  if (!file) return;
  
  console.log(`\n💾 Testing download for: ${file.filename}`);
  
  const response = await fetch(`${API_URL}/download/${file.category}/${file.filename}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  if (response.ok) {
    console.log('✅ Download successful!');
    console.log(`📊 File size: ${response.headers.get('content-length')} bytes`);
  } else {
    const error = await response.json();
    console.error('❌ Download failed:', error.error);
  }
}

async function verifyPublishedContent() {
  console.log('\n📖 Verifying published-content.json...');
  
  const contentPath = path.join(__dirname, 'published-content.json');
  if (!fs.existsSync(contentPath)) {
    console.error('❌ published-content.json not found!');
    return;
  }
  
  const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
  console.log(`✅ published-content.json contains ${content.length} entries`);
  
  // Check if entries are sorted by date
  let sorted = true;
  for (let i = 1; i < content.length; i++) {
    const dateA = new Date(content[i-1].uploadedAt);
    const dateB = new Date(content[i].uploadedAt);
    if (dateA < dateB) {
      sorted = false;
      break;
    }
  }
  
  console.log(sorted ? '✅ Content is sorted by date (newest first)' : '❌ Content is NOT sorted properly');
}

async function runTests() {
  console.log('🚀 Starting CMS upload tests...\n');
  
  try {
    // 1. Login
    const token = await login();
    
    // 2. Test upload
    const uploadedFile = await testUpload(token);
    
    // 3. Test content fetching
    const content = await testGetContent(token);
    
    // 4. Test download
    if (uploadedFile) {
      await testDownload(token, uploadedFile);
    }
    
    // 5. Verify published-content.json
    await verifyPublishedContent();
    
    console.log('\n✅ All tests completed!');
  } catch (error) {
    console.error('\n❌ Test failed:', error.message);
    process.exit(1);
  }
}

// Run the tests
runTests();