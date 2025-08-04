const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function testAPI() {
  console.log('Testing Railway Media API...\n');
  
  // Get list
  const listRes = await fetch('https://automationservice-production-4565.up.railway.app/api/media/list?category=news-gallery');
  const files = await listRes.json();
  
  console.log(`Found ${files.length} files\n`);
  
  if (files.length > 0) {
    const file = files[0];
    console.log('First file:', {
      id: file.id,
      filename: file.filename,
      url: file.url
    });
    
    // Test direct access
    console.log('\nTesting direct file access...');
    const fileRes = await fetch(file.url);
    console.log('Status:', fileRes.status);
    console.log('Content-Type:', fileRes.headers.get('content-type'));
    console.log('Content-Length:', fileRes.headers.get('content-length'));
    
    if (fileRes.ok) {
      console.log('✅ File is accessible!');
    } else {
      const error = await fileRes.text();
      console.log('❌ Error:', error);
    }
  }
}

testAPI();