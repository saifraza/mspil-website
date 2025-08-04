#!/usr/bin/env node

const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const fs = require('fs');
const path = require('path');
const FormData = require('form-data');

const API_URL = 'https://automationservice-production-4565.up.railway.app/api';

async function clearAndReupload() {
  console.log('🧹 Clearing existing media and re-uploading...\n');
  
  try {
    // Step 1: Get all existing files
    console.log('1. Fetching existing files...');
    const listResponse = await fetch(`${API_URL}/media/list?category=news-gallery`);
    const existingFiles = await listResponse.json();
    console.log(`Found ${existingFiles.length} existing files`);
    
    // Step 2: Delete all existing files
    if (existingFiles.length > 0) {
      console.log('\n2. Deleting existing files...');
      for (const file of existingFiles) {
        try {
          const deleteResponse = await fetch(`${API_URL}/media/delete/${file.id}`, {
            method: 'DELETE'
          });
          if (deleteResponse.ok) {
            console.log(`✅ Deleted: ${file.originalName}`);
          }
        } catch (err) {
          console.log(`❌ Failed to delete ${file.id}: ${err.message}`);
        }
      }
    }
    
    // Step 3: Re-upload files from temp directory
    console.log('\n3. Re-uploading files...');
    const tempDir = '/Users/saifraza/Desktop/temp';
    const files = fs.readdirSync(tempDir).filter(f => 
      /\.(jpg|jpeg|png|gif|mp4|mov)$/i.test(f)
    );
    
    console.log(`Found ${files.length} files to upload`);
    
    for (const file of files) {
      const filePath = path.join(tempDir, file);
      const formData = new FormData();
      formData.append('file', fs.createReadStream(filePath));
      formData.append('category', 'news-gallery');
      formData.append('metadata', JSON.stringify({
        title: file.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '),
        originalName: file,
        uploadDate: new Date().toISOString()
      }));
      
      try {
        const uploadResponse = await fetch(`${API_URL}/media/upload`, {
          method: 'POST',
          body: formData,
          headers: formData.getHeaders()
        });
        
        if (uploadResponse.ok) {
          const result = await uploadResponse.json();
          console.log(`✅ Uploaded: ${file} -> ${result.filename}`);
        } else {
          console.log(`❌ Failed to upload ${file}: ${uploadResponse.statusText}`);
        }
      } catch (err) {
        console.log(`❌ Error uploading ${file}: ${err.message}`);
      }
    }
    
    // Step 4: Verify final state
    console.log('\n4. Verifying final state...');
    const finalResponse = await fetch(`${API_URL}/media/list?category=news-gallery`);
    const finalFiles = await finalResponse.json();
    console.log(`\n✅ Total files in gallery: ${finalFiles.length}`);
    
    console.log('\n📸 Gallery URLs:');
    finalFiles.forEach(file => {
      console.log(`- ${file.originalName}: ${file.url}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

clearAndReupload();