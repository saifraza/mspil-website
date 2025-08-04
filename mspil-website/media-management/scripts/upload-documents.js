#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { uploadMedia } = require('./upload-media.js');

// Document categories mapping
const DOCUMENT_CATEGORIES = {
  'annual-reports': 'investor-annual-reports',
  'quarterly-results': 'investor-quarterly-results',
  'policies': 'investor-policies',
  'presentations': 'investor-presentations',
  'notices': 'investor-notices',
  'csr': 'csr-reports',
  'sugar-data': 'business-sugar-data',
  'ethanol-data': 'business-ethanol-data',
  'power-data': 'business-power-data',
  'feed-data': 'business-feed-data',
  'general': 'general-documents'
};

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m'
};

// Helper functions
const log = {
  success: (msg) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  error: (msg) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
  info: (msg) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`),
  header: (msg) => console.log(`\n${colors.bright}${colors.cyan}${msg}${colors.reset}\n`)
};

// Scan documents directory
async function scanDocuments(documentsPath) {
  const documents = [];
  
  async function scan(dir, category = '') {
    const entries = await fs.promises.readdir(dir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      
      if (entry.isDirectory()) {
        // Determine category from directory name
        const subCategory = DOCUMENT_CATEGORIES[entry.name] || category;
        await scan(fullPath, subCategory);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx', '.csv'].includes(ext)) {
          documents.push({
            path: fullPath,
            name: entry.name,
            category: category || 'general-documents',
            relativePath: path.relative(documentsPath, fullPath)
          });
        }
      }
    }
  }
  
  await scan(documentsPath);
  return documents;
}

// Upload all documents
async function uploadAllDocuments(documentsPath) {
  log.header('Document Upload to Railway Database');
  
  try {
    // Scan for documents
    log.info('Scanning for documents...');
    const documents = await scanDocuments(documentsPath);
    log.info(`Found ${documents.length} documents to upload`);
    
    // Group by category
    const grouped = documents.reduce((acc, doc) => {
      if (!acc[doc.category]) acc[doc.category] = [];
      acc[doc.category].push(doc);
      return acc;
    }, {});
    
    // Display grouped documents
    console.log('\nDocuments by category:');
    Object.entries(grouped).forEach(([cat, docs]) => {
      console.log(`\n${colors.yellow}${cat}${colors.reset} (${docs.length} files):`);
      docs.forEach(doc => console.log(`  - ${doc.name}`));
    });
    
    // Confirm upload
    console.log(`\n${colors.yellow}Ready to upload ${documents.length} documents.${colors.reset}`);
    console.log('Press Ctrl+C to cancel, or wait 5 seconds to continue...\n');
    
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Upload documents
    const results = {
      successful: [],
      failed: []
    };
    
    for (const doc of documents) {
      try {
        log.info(`Uploading: ${doc.name} to ${doc.category}`);
        
        const metadata = {
          originalPath: doc.relativePath,
          documentType: path.extname(doc.name).substring(1).toUpperCase(),
          uploadedFrom: 'document-migration'
        };
        
        const result = await uploadMedia(doc.path, doc.category, metadata);
        results.successful.push({
          ...doc,
          url: result.url,
          id: result.id
        });
        
      } catch (error) {
        log.error(`Failed: ${doc.name} - ${error.message}`);
        results.failed.push({ ...doc, error: error.message });
      }
    }
    
    // Summary
    log.header('Upload Summary');
    log.success(`Successful uploads: ${results.successful.length}`);
    if (results.failed.length > 0) {
      log.error(`Failed uploads: ${results.failed.length}`);
    }
    
    // Save mapping for updating components
    const mappingPath = path.join(__dirname, '..', 'temp', `document-mapping-${Date.now()}.json`);
    const mapping = results.successful.reduce((acc, doc) => {
      acc[doc.relativePath] = {
        id: doc.id,
        url: doc.url,
        category: doc.category
      };
      return acc;
    }, {});
    
    fs.writeFileSync(mappingPath, JSON.stringify(mapping, null, 2));
    log.info(`Document mapping saved to: ${mappingPath}`);
    
    return results;
    
  } catch (error) {
    log.error(`Upload failed: ${error.message}`);
    process.exit(1);
  }
}

// CLI interface
if (require.main === module) {
  const documentsPath = process.argv[2] || path.join(__dirname, '../../../public/documents');
  
  if (!fs.existsSync(documentsPath)) {
    log.error(`Documents directory not found: ${documentsPath}`);
    process.exit(1);
  }
  
  // Set production environment
  process.env.NODE_ENV = process.argv.includes('--dev') ? 'development' : 'production';
  
  log.info(`Using ${process.env.NODE_ENV} environment`);
  log.info(`Documents path: ${documentsPath}`);
  
  uploadAllDocuments(documentsPath);
}

module.exports = { uploadAllDocuments, scanDocuments };