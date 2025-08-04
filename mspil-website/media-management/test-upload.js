#!/usr/bin/env node

const fetch = require('node-fetch');

async function testRailwayAPI() {
  const API_URL = 'https://automationservice-production-4565.up.railway.app/api';
  
  console.log('Testing Railway Media API...\n');
  
  try {
    // Test 1: Health check
    console.log('1. Testing health endpoint...');
    const healthResponse = await fetch('https://automationservice-production-4565.up.railway.app/health');
    const healthData = await healthResponse.json();
    console.log('✅ Health check:', healthData.status);
    
    // Test 2: List media
    console.log('\n2. Testing media list endpoint...');
    const listResponse = await fetch(`${API_URL}/media/list?category=news-gallery`);
    if (listResponse.ok) {
      const mediaFiles = await listResponse.json();
      console.log(`✅ Media list works! Found ${mediaFiles.length} files`);
    } else {
      console.log(`❌ Media list failed: ${listResponse.status} ${listResponse.statusText}`);
    }
    
    // Test 3: Check CORS
    console.log('\n3. Checking CORS headers...');
    const corsHeaders = listResponse.headers.get('access-control-allow-origin');
    console.log(`✅ CORS headers: ${corsHeaders || 'Not set'}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testRailwayAPI();