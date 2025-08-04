const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function verifyDocuments() {
  console.log('Verifying all documents in Railway...\n');
  
  const API_URL = 'https://automationservice-production-4565.up.railway.app/api';
  
  const categories = [
    'investor-annual-reports',
    'investor-quarterly-results',
    'investor-policies',
    'investor-presentations',
    'investor-notices',
    'csr-reports',
    'business-sugar-data',
    'business-ethanol-data',
    'business-power-data',
    'business-feed-data',
    'general-documents'
  ];
  
  let totalDocs = 0;
  
  for (const category of categories) {
    console.log(`\n📁 ${category}:`);
    
    try {
      const response = await fetch(`${API_URL}/media/list?category=${category}`);
      if (response.ok) {
        const docs = await response.json();
        console.log(`  Found ${docs.length} documents`);
        totalDocs += docs.length;
        
        // Show first few docs
        docs.slice(0, 3).forEach(doc => {
          console.log(`  - ${doc.originalName || doc.filename}`);
        });
        if (docs.length > 3) {
          console.log(`  ... and ${docs.length - 3} more`);
        }
      } else {
        console.log(`  ❌ Failed to fetch: ${response.status}`);
      }
    } catch (error) {
      console.log(`  ❌ Error: ${error.message}`);
    }
  }
  
  console.log(`\n📊 Total documents in Railway: ${totalDocs}`);
}

verifyDocuments();