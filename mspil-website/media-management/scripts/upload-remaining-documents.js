#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_URL = 'https://automationservice-production-4565.up.railway.app/api';

// Document category mapping
const categoryMapping = {
  'csr': 'csr-reports',
  'sugar-data': 'business-sugar-data',
  'ethanol-data': 'business-ethanol-data',
  'power-data': 'business-power-data',
  'feed-data': 'business-feed-data',
  'general': 'general-documents'
};

async function uploadDocument(filePath, category, metadata = {}) {
  const fileName = path.basename(filePath);
  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));
  formData.append('category', category);
  formData.append('metadata', JSON.stringify({
    title: metadata.title || fileName.replace(/_/g, ' ').replace(/\.(pdf|csv|xlsx)$/, '').toUpperCase(),
    description: metadata.description || '',
    date: metadata.date || new Date().toISOString(),
    originalName: fileName,
    fileType: fileName.split('.').pop()
  }));

  const response = await fetch(`${API_URL}/media/upload`, {
    method: 'POST',
    body: formData,
    headers: formData.getHeaders()
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  return response.json();
}

async function uploadRemainingDocuments() {
  console.log('🚀 Uploading remaining documents to Railway...\n');

  const docsPath = path.join(__dirname, '../../public/documents');
  const results = { success: [], failed: [] };

  // Get all subdirectories except investor-relations
  const subdirs = fs.readdirSync(docsPath).filter(item => {
    const itemPath = path.join(docsPath, item);
    return fs.statSync(itemPath).isDirectory() && item !== 'investor-relations';
  });

  for (const subdir of subdirs) {
    const railwayCategory = categoryMapping[subdir];
    if (!railwayCategory) {
      console.log(`⚠️  Skipping unknown category: ${subdir}`);
      continue;
    }

    console.log(`\n📁 Processing ${subdir}...`);
    const dirPath = path.join(docsPath, subdir);
    const files = fs.readdirSync(dirPath).filter(f => 
      f.endsWith('.pdf') || f.endsWith('.csv') || f.endsWith('.xlsx')
    );

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      console.log(`  Uploading: ${file}`);

      try {
        // Generate metadata based on filename and category
        const metadata = {
          title: generateTitle(file, subdir),
          description: generateDescription(subdir, file),
          date: extractDate(file) || new Date().toISOString()
        };

        const result = await uploadDocument(filePath, railwayCategory, metadata);
        console.log(`  ✅ Success: ${result.url}`);
        results.success.push({ file, category: railwayCategory, url: result.url });
      } catch (error) {
        console.log(`  ❌ Failed: ${error.message}`);
        results.failed.push({ file, error: error.message });
      }
    }
  }

  // Summary
  console.log('\n📊 Upload Summary:');
  console.log(`✅ Successful: ${results.success.length}`);
  console.log(`❌ Failed: ${results.failed.length}`);

  if (results.failed.length > 0) {
    console.log('\nFailed uploads:');
    results.failed.forEach(f => console.log(`  - ${f.file}: ${f.error}`));
  }

  // Save results
  const resultsPath = path.join(__dirname, '../temp', `remaining-docs-upload-results-${Date.now()}.json`);
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 Results saved to: ${resultsPath}`);
}

function generateTitle(filename, category) {
  const name = filename.replace(/\.(pdf|csv|xlsx)$/, '');
  
  // Special cases based on category
  if (category.includes('data')) {
    const product = category.split('-')[0];
    return `${product.charAt(0).toUpperCase() + product.slice(1)} ${name.replace(/_/g, ' ').replace(/production|generation/gi, 'Production Data')}`;
  }
  
  if (category === 'csr') {
    return `CSR Report ${name.match(/\d{4}_\d{2}/) || '2024'}`.replace('_', '-');
  }
  
  // General case
  return name.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function generateDescription(category, filename) {
  const descriptions = {
    'csr': 'Corporate Social Responsibility report and initiatives',
    'sugar-data': 'Sugar production data and analytics',
    'ethanol-data': 'Ethanol production data and performance metrics',
    'power-data': 'Power generation data and efficiency reports',
    'feed-data': 'DDGS feed production data and quality metrics',
    'general': 'Company information and marketing materials'
  };
  
  return descriptions[category] || 'Company document';
}

function extractDate(filename) {
  // Try to extract dates from filename
  const patterns = [
    /(\d{4})_(\d{2})/, // 2023_24
    /q(\d)_(\d{4})/, // q1_2024
    /(\d{4})/, // 2024
  ];
  
  for (const pattern of patterns) {
    const match = filename.match(pattern);
    if (match) {
      if (match[0].includes('q')) {
        const quarter = parseInt(match[1]);
        const year = match[2];
        const month = quarter * 3;
        return `${year}-${month.toString().padStart(2, '0')}-31`;
      }
      if (match[0].includes('_')) {
        return `${match[1]}-03-31`; // Assume fiscal year end
      }
      return `${match[0]}-12-31`;
    }
  }
  
  return null;
}

// Run the upload
uploadRemainingDocuments().catch(console.error);