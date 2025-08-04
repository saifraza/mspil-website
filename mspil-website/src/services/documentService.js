// Document Service - Fetches documents from Railway database

// Always use production API for now since local isn't running
const API_URL = 'https://automationservice-production-4565.up.railway.app/api';

// Cache for documents
let documentCache = null;
let cacheTimestamp = null;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

// Document category mapping
const CATEGORY_MAPPING = {
  'investor-annual-reports': 'annualReports',
  'investor-quarterly-results': 'quarterlyResults',
  'investor-policies': 'policies',
  'investor-presentations': 'presentations',
  'investor-notices': 'notices',
  'csr-reports': 'csr',
  'business-sugar-data': 'sugarData',
  'business-ethanol-data': 'ethanolData',
  'business-power-data': 'powerData',
  'business-feed-data': 'feedData',
  'general-documents': 'general'
};

// Fetch all documents from Railway
export async function fetchDocuments(forceRefresh = false) {
  // Check cache
  if (!forceRefresh && documentCache && cacheTimestamp && 
      (Date.now() - cacheTimestamp < CACHE_DURATION)) {
    return documentCache;
  }

  // Try Railway API first, but don't fail if CORS blocks it
  try {
    // Quick test if API is accessible
    const testResponse = await fetch(`${API_URL}/health`, { 
      method: 'GET',
      mode: 'cors'
    }).catch(() => null);
    
    if (!testResponse || !testResponse.ok) {
      throw new Error('API not accessible, using local fallback');
    }
    
    // Fetch all document categories
    const categories = Object.keys(CATEGORY_MAPPING);
    const promises = categories.map(cat => 
      fetch(`${API_URL}/media/list?category=${cat}`)
        .then(res => res.ok ? res.json() : [])
        .catch(() => [])
    );

    const results = await Promise.all(promises);
    
    // Organize documents by category
    const documents = {
      investorRelations: {
        annualReports: [],
        quarterlyResults: [],
        policies: [],
        presentations: [],
        notices: []
      },
      businessData: {
        sugarData: [],
        ethanolData: [],
        powerData: [],
        feedData: []
      },
      csr: [],
      general: []
    };

    // Map results to document structure
    results.forEach((docs, index) => {
      const category = categories[index];
      const mappedCategory = CATEGORY_MAPPING[category];
      
      docs.forEach(doc => {
        const documentInfo = {
          title: doc.metadata?.title || doc.originalName || doc.filename,
          filename: doc.filename,
          url: doc.url,
          date: doc.metadata?.date || doc.uploadDate,
          type: doc.filename.split('.').pop().toLowerCase(),
          category: mappedCategory,
          description: doc.metadata?.description || '',
          fileSize: doc.size ? `${(doc.size / 1024 / 1024).toFixed(1)} MB` : '',
          id: doc.id
        };

        // Place in correct category
        if (mappedCategory.includes('annual') || mappedCategory.includes('quarterly') || 
            mappedCategory.includes('policies') || mappedCategory.includes('presentations') || 
            mappedCategory.includes('notices')) {
          documents.investorRelations[mappedCategory].push(documentInfo);
        } else if (mappedCategory.includes('Data')) {
          documents.businessData[mappedCategory].push(documentInfo);
        } else if (mappedCategory === 'csr') {
          documents.csr.push(documentInfo);
        } else {
          documents.general.push(documentInfo);
        }
      });
    });

    // Sort documents by date (newest first)
    Object.keys(documents.investorRelations).forEach(key => {
      documents.investorRelations[key].sort((a, b) => 
        new Date(b.date) - new Date(a.date)
      );
    });

    // Update cache
    documentCache = documents;
    cacheTimestamp = Date.now();

    return documents;

  } catch (error) {
    console.error('Error fetching documents from Railway:', error);
    
    // Fallback to local documents.json
    try {
      const response = await fetch('/data/documents.json');
      const localDocs = await response.json();
      return localDocs;
    } catch (fallbackError) {
      console.error('Fallback to local documents also failed:', fallbackError);
      return null;
    }
  }
}

// Upload a document
export async function uploadDocument(file, category, metadata = {}) {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('category', category);
  formData.append('metadata', JSON.stringify(metadata));

  const response = await fetch(`${API_URL}/media/upload`, {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  // Clear cache to force refresh
  documentCache = null;
  
  return response.json();
}

// Delete a document
export async function deleteDocument(documentId) {
  const response = await fetch(`${API_URL}/media/delete/${documentId}`, {
    method: 'DELETE'
  });

  if (!response.ok) {
    throw new Error('Delete failed');
  }

  // Clear cache to force refresh
  documentCache = null;
  
  return response.json();
}

// Get document by ID
export async function getDocument(documentId) {
  const response = await fetch(`${API_URL}/media/${documentId}`);
  
  if (!response.ok) {
    throw new Error('Document not found');
  }

  return response.json();
}