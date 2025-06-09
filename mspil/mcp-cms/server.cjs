const express = require('express');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { generateSuggestions } = require('./ai-suggestions.cjs');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3002;
const JWT_SECRET = process.env.JWT_SECRET || 'simple-cms-secret-key';

// Create uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

// Users (passwords are hashed)
const users = [
  {
    id: 1,
    username: 'admin',
    password: '$2a$10$PyWIXts4yTKEQraTqgTnd.vw19mCqtAEhUVdG0vE/peISFW4dm.le', // admin123
    role: 'admin'
  },
  {
    id: 2,
    username: 'editor',
    password: '$2a$10$AlHQliVOA.lb3GDkHxsNOuDkORXeq6JZfcdqZQhajbHi0.AOstv3.', // editor123
    role: 'editor'
  }
];

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();
    const sanitized = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${timestamp}-${sanitized}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 } // 100MB limit
});

// Authentication middleware
const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Helper function to detect file category
function detectCategory(filename, comment) {
  const lower = (filename + ' ' + comment).toLowerCase();
  console.log(`🔍 Analyzing: "${filename}" with comment: "${comment}"`);
  
  // Check for specific leaders first (more specific matches)
  if (lower.includes('saif') || (lower.includes('md') && (lower.includes('raza') || lower.includes('managing director')))) {
    console.log('✅ Detected: saif-raza-image');
    return 'saif-raza-image';
  }
  
  if (lower.includes('nawab') || (lower.includes('chairman') && lower.includes('raza')) || 
      (lower.includes('founder') && lower.includes('raza'))) {
    console.log('✅ Detected: nawab-raza-image');
    return 'nawab-raza-image';
  }
  
  // Image Categories (check first for images)
  if (lower.includes('media') || lower.includes('midea') || lower.includes('gallery')) {
    console.log('✅ Detected: media-images');
    return 'media-images';
  }
  
  if (lower.includes('news') || lower.includes('press') || lower.includes('announcement')) {
    console.log('✅ Detected: news-images');
    return 'news-images';
  }
  
  if (lower.includes('timeline') || lower.includes('history') || lower.includes('journey') || 
      lower.includes('inception') || lower.includes('expansion') || /20\d{2}/.test(lower)) {
    console.log('✅ Detected: timeline-images');
    return 'timeline-images';
  }
  
  if (lower.includes('office') || lower.includes('building') || lower.includes('headquarters') || lower.includes('campus')) {
    console.log('✅ Detected: office-images');
    return 'office-images';
  }
  
  if (lower.includes('factory') || lower.includes('plant') || lower.includes('infrastructure') || 
      lower.includes('equipment') || lower.includes('manufacturing') || lower.includes('mill')) {
    console.log('✅ Detected: infrastructure-images');
    return 'infrastructure-images';
  }
  
  if (lower.includes('leadership') || lower.includes('management') || lower.includes('director') || 
      lower.includes('ceo') || lower.includes('executive') || lower.includes('chairman') || 
      lower.includes('founder') || lower.includes('raza') || lower.includes('md') || lower.includes('managing')) {
    console.log('✅ Detected: leadership-images');
    return 'leadership-images';
  }
  
  if (lower.includes('career') || lower.includes('workplace') || lower.includes('employee') || lower.includes('training')) {
    console.log('✅ Detected: career-images');
    return 'career-images';
  }
  
  // CSR Images
  if (lower.includes('csr') && (lower.includes('education') || lower.includes('school') || lower.includes('learning'))) {
    console.log('✅ Detected: csr-education-images');
    return 'csr-education-images';
  }
  
  if (lower.includes('csr') && (lower.includes('health') || lower.includes('medical') || lower.includes('clinic'))) {
    console.log('✅ Detected: csr-healthcare-images');
    return 'csr-healthcare-images';
  }
  
  if (lower.includes('csr') && (lower.includes('rural') || lower.includes('village') || lower.includes('farmers'))) {
    console.log('✅ Detected: csr-rural-images');
    return 'csr-rural-images';
  }
  
  // Document Categories
  if (lower.includes('sugar') && (filename.includes('.xlsx') || filename.includes('.xls') || filename.includes('.csv'))) {
    console.log('✅ Detected: sugar-data');
    return 'sugar-data';
  }
  
  if (lower.includes('ethanol') && (filename.includes('.xlsx') || filename.includes('.xls') || filename.includes('.csv'))) {
    console.log('✅ Detected: ethanol-data');
    return 'ethanol-data';
  }
  
  if (lower.includes('power') && (filename.includes('.xlsx') || filename.includes('.xls') || filename.includes('.csv'))) {
    console.log('✅ Detected: power-data');
    return 'power-data';
  }
  
  if (lower.includes('feed') && (filename.includes('.xlsx') || filename.includes('.xls') || filename.includes('.csv'))) {
    console.log('✅ Detected: feed-data');
    return 'feed-data';
  }
  
  if (lower.includes('annual') && lower.includes('report')) {
    console.log('✅ Detected: annual-reports');
    return 'annual-reports';
  }
  
  if (lower.includes('quarterly') || lower.includes('q1') || lower.includes('q2') || 
      lower.includes('q3') || lower.includes('q4')) {
    console.log('✅ Detected: quarterly-results');
    return 'quarterly-results';
  }
  
  if (lower.includes('presentation') || lower.includes('slides') || lower.includes('pitch')) {
    console.log('✅ Detected: presentations');
    return 'presentations';
  }
  
  if (lower.includes('policy') || lower.includes('governance') || lower.includes('guidelines')) {
    console.log('✅ Detected: policies');
    return 'policies';
  }
  
  if (lower.includes('csr') || lower.includes('sustainability') || lower.includes('social responsibility')) {
    console.log('✅ Detected: csr-reports');
    return 'csr-reports';
  }
  
  console.log('✅ Detected: general-documents');
  return 'general-documents';
}

// Helper function to generate smart filename based on category and content
function generateSmartFilename(originalFilename, category, comment) {
  const ext = path.extname(originalFilename);
  const timestamp = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  
  // Smart naming patterns based on category
  const namingPatterns = {
    'media-images': 'company_media',
    'news-images': 'news_press',
    'timeline-images': 'timeline_history',
    'office-images': 'office_facility',
    'infrastructure-images': 'infrastructure_facility',
    'leadership-images': 'leadership_team',
    'saif-raza-image': 'saif_raza_md',
    'nawab-raza-image': 'nawab_raza_chairman',
    'career-images': 'careers_workplace',
    'csr-education-images': 'csr_education',
    'csr-healthcare-images': 'csr_healthcare',
    'csr-rural-images': 'csr_rural_development',
    'sugar-data': 'sugar_production_data',
    'ethanol-data': 'ethanol_production_data',
    'power-data': 'power_generation_data',
    'feed-data': 'feed_production_data',
    'annual-reports': 'annual_report',
    'quarterly-results': 'quarterly_results',
    'presentations': 'presentation',
    'policies': 'policy_document',
    'csr-reports': 'csr_report',
    'general-documents': 'document'
  };
  
  let basePattern = namingPatterns[category] || 'file';
  
  // Extract meaningful keywords from comment
  let smartSuffix = '';
  if (comment && !['saif-raza-image', 'nawab-raza-image'].includes(category)) {
    const keywords = comment.toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2 && !['the', 'and', 'for', 'with', 'this', 'that'].includes(word))
      .slice(0, 2)
      .join('_');
    
    if (keywords) {
      smartSuffix = '_' + keywords;
    }
  }
  
  // Generate smart filename: pattern_date_suffix_unique.ext
  const uniqueId = Date.now().toString().slice(-4);
  const smartFilename = `${basePattern}_${timestamp}${smartSuffix}_${uniqueId}${ext}`;
  
  console.log(`🧠 Smart filename generated: ${originalFilename} → ${smartFilename}`);
  return smartFilename;
}

// Helper function to copy files to public directories
function copyFileToPublic(file, category, comment) {
  const categoryPaths = {
    // Image categories
    'media-images': '../public/images/media',
    'news-images': '../public/images/news',
    'timeline-images': '../public/images/about-us',
    'office-images': '../public/images/office',
    'infrastructure-images': '../public/images/infrastructure',
    'leadership-images': '../public/images/leadership',
    'saif-raza-image': '../public/images/leadership',
    'nawab-raza-image': '../public/images/leadership',
    'career-images': '../public/images/careers',
    'about-images': '../public/images/about',
    'csr-education-images': '../public/images/csr/education',
    'csr-healthcare-images': '../public/images/csr/healthcare',
    'csr-rural-images': '../public/images/csr/rural-development',
    
    // Document categories
    'sugar-data': '../public/documents/sugar-data',
    'ethanol-data': '../public/documents/ethanol-data',
    'power-data': '../public/documents/power-data',
    'feed-data': '../public/documents/feed-data',
    'annual-reports': '../public/documents/investor-relations/annual-reports',
    'quarterly-results': '../public/documents/investor-relations/quarterly-results',
    'presentations': '../public/documents/investor-relations/presentations',
    'policies': '../public/documents/investor-relations/policies',
    'shareholding': '../public/documents/investor-relations/shareholding',
    'csr-reports': '../public/documents/csr',
    'general-documents': '../public/documents/general'
  };
  
  const targetDir = path.join(__dirname, categoryPaths[category] || categoryPaths['general-documents']);
  
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    // Generate smart filename
    const smartFilename = generateSmartFilename(file.originalname, category, comment);
    
    // Copy file with smart name
    const sourcePath = file.path;
    const targetPath = path.join(targetDir, smartFilename);
    fs.copyFileSync(sourcePath, targetPath);
    
    console.log(`✅ File copied: ${file.originalname} → ${smartFilename} (${category})`);
    return { success: true, newFilename: smartFilename };
  } catch (error) {
    console.error(`❌ Copy failed:`, error);
    return { success: false, error: error.message };
  }
}

// Save uploaded content info
function saveContentInfo(content) {
  const dataPath = path.join(__dirname, 'published-content.json');
  let existingData = [];
  
  try {
    if (fs.existsSync(dataPath)) {
      const fileContent = fs.readFileSync(dataPath, 'utf-8');
      existingData = JSON.parse(fileContent);
    }
  } catch (error) {
    console.log('Creating new content file');
  }
  
  existingData.push(content);
  fs.writeFileSync(dataPath, JSON.stringify(existingData, null, 2));
}

// API Routes

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    server: 'MCP CMS',
    version: '1.0'
  });
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const user = users.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    console.log(`✅ User logged in: ${username}`);
    res.json({ 
      token, 
      user: { id: user.id, username: user.username, role: user.role } 
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// File upload
app.post('/api/upload', authMiddleware, upload.single('file'), (req, res) => {
  try {
    const file = req.file;
    const comment = req.body.comment || '';
    const forcePlacement = req.body.forcePlacement;

    console.log(`📤 Upload request:`, {
      filename: file.originalname,
      comment: comment,
      forcePlacement: forcePlacement
    });

    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Determine category
    const category = forcePlacement || detectCategory(file.originalname, comment);
    console.log(`📁 Final category determined: ${category}`);
    
    // Copy file to public directory with smart renaming
    const copyResult = copyFileToPublic(file, category, comment);
    if (!copyResult.success) {
      return res.status(500).json({ error: 'Failed to copy file to destination: ' + copyResult.error });
    }

    // Create content info with smart filename
    const content = {
      id: Date.now(),
      filename: copyResult.newFilename, // Use the smart renamed filename
      originalFilename: file.originalname, // Keep original for reference
      url: `http://localhost:${PORT}/uploads/${file.filename}`,
      mimeType: file.mimetype,
      size: file.size,
      category: category,
      comment: comment,
      uploadedBy: req.user.username,
      uploadedAt: new Date().toISOString()
    };

    // Save content info
    saveContentInfo(content);

    console.log(`✅ Upload successful: ${file.originalname} → ${copyResult.newFilename} (${category})`);
    res.json({
      success: true,
      file: content,
      message: `File uploaded successfully as "${copyResult.newFilename}" to ${category}`,
      smartRename: {
        original: file.originalname,
        smart: copyResult.newFilename,
        category: category
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get content
app.get('/api/content', (req, res) => {
  try {
    const dataPath = path.join(__dirname, 'published-content.json');
    
    if (!fs.existsSync(dataPath)) {
      return res.json([]);
    }
    
    const content = fs.readFileSync(dataPath, 'utf-8');
    res.json(JSON.parse(content));
  } catch (error) {
    console.error('Content fetch error:', error);
    res.json([]);
  }
});

// AI placement suggestions
app.post('/api/placement-suggestions', authMiddleware, (req, res) => {
  try {
    const { filename, comment } = req.body;
    
    if (!filename) {
      return res.status(400).json({ error: 'Filename required' });
    }

    const suggestions = generateSuggestions(filename, comment || '');
    console.log(`🤖 Generated ${suggestions.length} suggestions for: ${filename}`);
    
    res.json(suggestions);
  } catch (error) {
    console.error('Suggestions error:', error);
    res.status(500).json({ error: 'Failed to generate suggestions' });
  }
});

// Public endpoint to download all files from a category as ZIP
app.get('/api/public/download/:category', (req, res) => {
  try {
    const { category } = req.params;
    
    const categoryPaths = {
      'sugar-data': '../public/documents/sugar-data',
      'ethanol-data': '../public/documents/ethanol-data',
      'power-data': '../public/documents/power-data',
      'feed-data': '../public/documents/feed-data'
    };
    
    const categoryPath = categoryPaths[category];
    if (!categoryPath) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    
    const folderPath = path.join(__dirname, categoryPath);
    
    // Check if folder exists
    if (!fs.existsSync(folderPath)) {
      return res.status(404).json({ error: 'No data available' });
    }
    
    // Get all files in the folder
    const files = fs.readdirSync(folderPath).filter(file => 
      !file.startsWith('.') && fs.statSync(path.join(folderPath, file)).isFile()
    );
    
    if (files.length === 0) {
      return res.status(404).json({ error: 'No files available for download' });
    }
    
    // If only one file, send it directly
    if (files.length === 1) {
      const filePath = path.join(folderPath, files[0]);
      res.setHeader('Content-Disposition', `attachment; filename="${files[0]}"`);
      res.setHeader('Content-Type', 'application/octet-stream');
      res.sendFile(path.resolve(filePath));
      console.log(`📥 Public download: ${files[0]} from ${category}`);
      return;
    }
    
    // For multiple files, we'd need to ZIP them (for now, send the newest file)
    const newestFile = files
      .map(file => ({
        name: file,
        time: fs.statSync(path.join(folderPath, file)).mtime
      }))
      .sort((a, b) => b.time - a.time)[0];
    
    const filePath = path.join(folderPath, newestFile.name);
    res.setHeader('Content-Disposition', `attachment; filename="${newestFile.name}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.sendFile(path.resolve(filePath));
    console.log(`📥 Public download: ${newestFile.name} from ${category} (newest file)`);
    
  } catch (error) {
    console.error('Public download error:', error);
    res.status(500).json({ error: 'Download failed' });
  }
});

// File download endpoint
app.get('/api/download/:category/:filename', authMiddleware, (req, res) => {
  try {
    const { category, filename } = req.params;
    
    const categoryPaths = {
      // Image categories
      'media-images': '../public/images/media',
      'news-images': '../public/images/news',
      'timeline-images': '../public/images/about-us',
      'office-images': '../public/images/office',
      'infrastructure-images': '../public/images/infrastructure',
      'leadership-images': '../public/images/leadership',
      'career-images': '../public/images/careers',
      'about-images': '../public/images/about',
      'csr-education-images': '../public/images/csr/education',
      'csr-healthcare-images': '../public/images/csr/healthcare',
      'csr-rural-images': '../public/images/csr/rural-development',
      
      // Document categories
      'sugar-data': '../public/documents/sugar-data',
      'ethanol-data': '../public/documents/ethanol-data',
      'power-data': '../public/documents/power-data',
      'feed-data': '../public/documents/feed-data',
      'annual-reports': '../public/documents/investor-relations/annual-reports',
      'quarterly-results': '../public/documents/investor-relations/quarterly-results',
      'presentations': '../public/documents/investor-relations/presentations',
      'policies': '../public/documents/investor-relations/policies',
      'shareholding': '../public/documents/investor-relations/shareholding',
      'csr-reports': '../public/documents/csr',
      'general-documents': '../public/documents/general'
    };
    
    const categoryPath = categoryPaths[category];
    if (!categoryPath) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    
    const filePath = path.join(__dirname, categoryPath, filename);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    // Set appropriate headers for download
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    
    // Send the file
    res.sendFile(path.resolve(filePath));
    console.log(`📥 Download: ${filename} from ${category}`);
    
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ error: 'Download failed' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`
🚀 MCP CMS Server Started!
==========================
URL: http://localhost:${PORT}
Health: http://localhost:${PORT}/health

Login Credentials:
- admin / admin123
- editor / editor123

Ready to accept uploads!
==========================
  `);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('Server shutting down...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Server shutting down...');
  process.exit(0);
});