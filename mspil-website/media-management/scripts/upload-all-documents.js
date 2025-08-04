#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const API_URL = 'https://automationservice-production-4565.up.railway.app/api';

// Document category mapping
const categoryMapping = {
  'annual-reports': 'investor-annual-reports',
  'quarterly-results': 'investor-quarterly-results',
  'policies': 'investor-policies',
  'presentations': 'investor-presentations',
  'notices': 'investor-notices'
};

async function uploadDocument(filePath, category, metadata = {}) {
  const fileName = path.basename(filePath);
  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));
  formData.append('category', category);
  formData.append('metadata', JSON.stringify({
    title: metadata.title || fileName.replace(/_/g, ' ').replace('.pdf', '').toUpperCase(),
    description: metadata.description || '',
    date: metadata.date || new Date().toISOString(),
    originalName: fileName,
    fileType: 'pdf'
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

async function uploadAllDocuments() {
  console.log('🚀 Uploading all investor relations documents to Railway...\n');

  const docsPath = path.join(__dirname, '../../public/documents/investor-relations');
  const results = { success: [], failed: [] };

  // Get all subdirectories
  const subdirs = fs.readdirSync(docsPath).filter(item => {
    const itemPath = path.join(docsPath, item);
    return fs.statSync(itemPath).isDirectory();
  });

  for (const subdir of subdirs) {
    const railwayCategory = categoryMapping[subdir];
    if (!railwayCategory) {
      console.log(`⚠️  Skipping unknown category: ${subdir}`);
      continue;
    }

    console.log(`\n📁 Processing ${subdir}...`);
    const dirPath = path.join(docsPath, subdir);
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.pdf'));

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      console.log(`  Uploading: ${file}`);

      try {
        // Generate metadata based on filename
        const metadata = {
          title: generateTitle(file),
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
  const resultsPath = path.join(__dirname, '../temp', `document-upload-results-${Date.now()}.json`);
  fs.writeFileSync(resultsPath, JSON.stringify(results, null, 2));
  console.log(`\n📄 Results saved to: ${resultsPath}`);
}

function generateTitle(filename) {
  const name = filename.replace('.pdf', '');
  
  // Special cases
  if (name.includes('annual_report')) {
    const year = name.match(/\d{4}_\d{2}/);
    return year ? `Annual Report ${year[0].replace('_', '-')}` : 'Annual Report';
  }
  
  if (name.includes('_results')) {
    const quarter = name.match(/q\d/i);
    const year = name.match(/fy\d{4}/i);
    return quarter && year ? `${quarter[0].toUpperCase()} ${year[0].toUpperCase()} Results` : name;
  }
  
  // General case - replace underscores and capitalize
  return name.split('_').map(word => 
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ');
}

function generateDescription(category, filename) {
  const descriptions = {
    'annual-reports': 'Comprehensive annual report covering financial performance and business operations',
    'quarterly-results': 'Quarterly financial results and performance highlights',
    'policies': 'Corporate governance and compliance policy document',
    'presentations': 'Investor presentation with company updates and strategic initiatives',
    'notices': 'Official notice and announcement for stakeholders'
  };
  
  return descriptions[category] || 'Company document';
}

function extractDate(filename) {
  // Try to extract dates from filename
  const patterns = [
    /(\d{4})_(\d{2})/, // 2023_24
    /(\d{4})/, // 2024
    /q(\d)_fy(\d{4})/, // q3_fy2024
  ];
  
  for (const pattern of patterns) {
    const match = filename.match(pattern);
    if (match) {
      if (match[0].includes('_')) {
        return `${match[1]}-03-31`; // Assume fiscal year end
      }
      return `${match[0]}-12-31`;
    }
  }
  
  return null;
}

// Run the upload
uploadAllDocuments().catch(console.error);