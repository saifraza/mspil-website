// Static File Upload Server - Saves directly to frontend public directory
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3002;

// Enable CORS
app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());

// Path to frontend's public directory
const FRONTEND_PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Configure multer for temporary uploads
const upload = multer({ dest: 'temp-uploads/' });

// Category to directory mapping for frontend
const categoryPaths = {
  'media-images': 'images/media',
  'news-images': 'images/news_media',
  'timeline-images': 'images/about-us',
  'office-images': 'images/office',
  'infrastructure-images': 'images/infrastructure',
  'leadership-images': 'images/leadership',
  'career-images': 'images/careers',
  'csr-education-images': 'images/csr/education',
  'csr-healthcare-images': 'images/csr/healthcare',
  'csr-rural-images': 'images/csr/rural-development',
  'sugar-data': 'documents/sugar-data',
  'ethanol-data': 'documents/ethanol-data',
  'power-data': 'documents/power-data',
  'feed-data': 'documents/feed-data',
  'annual-reports': 'documents/investor-relations/annual-reports',
  'quarterly-results': 'documents/investor-relations/quarterly-results',
  'presentations': 'documents/investor-relations/presentations',
  'policies': 'documents/investor-relations/policies',
  'csr-reports': 'documents/csr',
  'general-documents': 'documents/general'
};

// Generate smart filename
function generateSmartFilename(originalFilename, category, comment) {
  const ext = path.extname(originalFilename);
  const timestamp = Date.now();
  
  const namingPatterns = {
    'media-images': 'media',
    'news-images': 'news',
    'timeline-images': 'timeline',
    'office-images': 'office',
    'infrastructure-images': 'facility',
    'leadership-images': 'team_member',
    'career-images': 'careers',
    'csr-education-images': 'education',
    'csr-healthcare-images': 'healthcare',
    'csr-rural-images': 'rural_dev',
    'sugar-data': 'sugar_data',
    'ethanol-data': 'ethanol_data',
    'power-data': 'power_data',
    'feed-data': 'feed_data',
    'annual-reports': 'annual_report',
    'quarterly-results': 'quarterly_results',
    'presentations': 'presentation',
    'policies': 'policy',
    'csr-reports': 'csr_report',
    'general-documents': 'document'
  };
  
  let basePattern = namingPatterns[category] || 'file';
  
  // Extract keywords from comment if provided
  let smartSuffix = '';
  if (comment) {
    const keywords = comment.toLowerCase()
      .replace(/[^a-z0-9\s]/g, '')
      .split(/\s+/)
      .filter(word => word.length > 3)
      .slice(0, 3)
      .join('_');
    if (keywords) {
      smartSuffix = `_${keywords}`;
    }
  }
  
  return `${basePattern}${smartSuffix}_${timestamp}${ext}`;
}

// Upload endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    const { category, comment } = req.body;
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    console.log(`📁 Uploading: ${file.originalname} to category: ${category}`);
    
    // Determine target directory
    const relativePath = categoryPaths[category] || categoryPaths['general-documents'];
    const targetDir = path.join(FRONTEND_PUBLIC_DIR, relativePath);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
      console.log(`📁 Created directory: ${targetDir}`);
    }
    
    // Generate filename
    const filename = generateSmartFilename(file.originalname, category, comment);
    const targetPath = path.join(targetDir, filename);
    
    // Move file from temp to target
    fs.renameSync(file.path, targetPath);
    console.log(`✅ File saved: ${filename}`);
    
    // Return the public URL path
    const publicUrl = `/${relativePath}/${filename}`;
    
    res.json({
      id: Date.now(),
      filename: filename,
      originalName: file.originalname,
      category: category,
      comment: comment || '',
      url: publicUrl,
      uploadDate: new Date().toISOString(),
      message: 'File uploaded successfully to static directory'
    });
    
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all uploaded files
app.get('/api/content', (req, res) => {
  try {
    const allFiles = [];
    
    // Scan all category directories
    Object.entries(categoryPaths).forEach(([category, relativePath]) => {
      const fullPath = path.join(FRONTEND_PUBLIC_DIR, relativePath);
      
      if (fs.existsSync(fullPath)) {
        const files = fs.readdirSync(fullPath);
        
        files.forEach(filename => {
          const filePath = path.join(fullPath, filename);
          const stats = fs.statSync(filePath);
          
          if (stats.isFile()) {
            allFiles.push({
              id: `${category}_${filename}`,
              filename: filename,
              category: category,
              url: `/${relativePath}/${filename}`,
              uploadDate: stats.mtime.toISOString(),
              size: stats.size
            });
          }
        });
      }
    });
    
    res.json(allFiles);
  } catch (error) {
    console.error('Error listing files:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete file endpoint
app.delete('/api/content/:category/:filename', (req, res) => {
  try {
    const { category, filename } = req.params;
    const relativePath = categoryPaths[category];
    
    if (!relativePath) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    
    const filePath = path.join(FRONTEND_PUBLIC_DIR, relativePath, filename);
    
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log(`🗑️ Deleted: ${filename}`);
      res.json({ message: 'File deleted successfully' });
    } else {
      res.status(404).json({ error: 'File not found' });
    }
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Create temp directory
const tempDir = path.join(__dirname, 'temp-uploads');
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir);
}

// Cleanup temp files on exit
process.on('exit', () => {
  if (fs.existsSync(tempDir)) {
    fs.readdirSync(tempDir).forEach(file => {
      fs.unlinkSync(path.join(tempDir, file));
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Static Upload Server running on port ${PORT}`);
  console.log(`📁 Saving files to: ${FRONTEND_PUBLIC_DIR}`);
  console.log(`✨ Files will be immediately available as static assets!`);
});