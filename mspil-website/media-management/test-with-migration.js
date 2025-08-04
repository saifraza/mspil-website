#!/usr/bin/env node

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');

async function testWithMigration() {
  const API_URL = 'https://automationservice-production-4565.up.railway.app/api';
  
  console.log('🚀 Testing Railway Media Upload with new schema...\n');
  
  try {
    // Test upload with the new base64 storage
    console.log('1. Testing file upload with base64 storage...');
    const testImagePath = '/Users/saifraza/Desktop/temp';
    const files = fs.readdirSync(testImagePath);
    const imageFile = files.find(f => /\.(jpg|jpeg|png|gif)$/i.test(f));
    
    if (imageFile) {
      const filePath = path.join(testImagePath, imageFile);
      const formData = new FormData();
      formData.append('file', fs.createReadStream(filePath));
      formData.append('category', 'news-gallery');
      formData.append('metadata', JSON.stringify({
        title: 'Gallery Image - ' + imageFile,
        description: 'News media gallery image',
        uploadedBy: 'test-script'
      }));
      
      console.log(`Uploading: ${imageFile}...`);
      const uploadResponse = await fetch(`${API_URL}/media/upload`, {
        method: 'POST',
        body: formData,
        headers: formData.getHeaders()
      });
      
      if (uploadResponse.ok) {
        const result = await uploadResponse.json();
        console.log('✅ Upload successful!');
        console.log('File ID:', result.id);
        console.log('URL:', result.url);
        
        // Test file access
        console.log('\n2. Testing file retrieval...');
        const fileResponse = await fetch(result.url);
        if (fileResponse.ok) {
          console.log('✅ File is accessible!');
          console.log('Content-Type:', fileResponse.headers.get('content-type'));
          console.log('Content-Length:', fileResponse.headers.get('content-length'));
        } else {
          console.log('❌ File retrieval failed:', fileResponse.status);
        }
        
        // List all files
        console.log('\n3. Listing all gallery files...');
        const listResponse = await fetch(`${API_URL}/media/list?category=news-gallery`);
        const mediaFiles = await listResponse.json();
        console.log(`✅ Total files in gallery: ${mediaFiles.length}`);
        
        return true;
      } else {
        const error = await uploadResponse.text();
        console.log(`❌ Upload failed: ${uploadResponse.status}`, error);
        
        // Check if it's a database error
        if (error.includes('column "file_content" of relation "media_files" does not exist')) {
          console.log('\n⚠️  Database needs migration. The file_content column is missing.');
          console.log('Please run the migration in Railway dashboard or wait for auto-migration.');
        }
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testWithMigration();