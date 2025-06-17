require('dotenv').config();
const express = require('express');
const compression = require('compression');
const cors = require('cors');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const Tesseract = require('tesseract.js');
const OpenAI = require('openai');
const { generateSuggestions } = require('./ai-suggestions.cjs');
const { ClaudeContentManager } = require('./claude-integration.cjs');
// Temporarily disable GitHub API deploy until we fix the Railway deployment
// const { deployViaGitHubAPI, prepareFileForDeploy } = require('./github-api-deploy.cjs');

// Create Express app
const app = express();
const PORT = process.env.PORT || 3002;
const JWT_SECRET = process.env.JWT_SECRET || 'simple-cms-secret-key';

// Initialize OpenAI (optional - will work without it)
let openai = null;
if (process.env.OPENAI_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });
  console.log('✅ OpenAI initialized');
} else {
  console.log('⚠️ OpenAI API key not found - AI features will be limited');
}

// Create uploads directory
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Category paths mapping - used throughout the application
const categoryPaths = {
  // Image categories
  'media-images': 'images/media',
  'news-images': 'images/news_media',
  'timeline-images': 'images/about-us',
  'office-images': 'images/office',
  'infrastructure-images': 'images/infrastructure',
  'leadership-images': 'images/leadership',
  'saif-raza-image': 'images/leadership',
  'nawab-raza-image': 'images/leadership',
  'sahil-raza-image': 'images/leadership',
  'asad-raza-image': 'images/leadership',
  'ahmed-raza-image': 'images/leadership',
  'fatima-raza-image': 'images/leadership',
  'career-images': 'images/careers',
  'about-images': 'images/about',
  'csr-education-images': 'images/csr/education',
  'csr-healthcare-images': 'images/csr/healthcare',
  'csr-rural-images': 'images/csr/rural-development',
  'sugar-images': 'images/sugar',
  'ethanol-images': 'images/ethanol',
  'power-images': 'images/power',
  'feed-images': 'images/feed',
  
  // Document categories
  'sugar-data': 'documents/sugar-data',
  'ethanol-data': 'documents/ethanol-data',
  'power-data': 'documents/power-data',
  'feed-data': 'documents/feed-data',
  'annual-reports': 'documents/investor-relations/annual-reports',
  'quarterly-results': 'documents/investor-relations/quarterly-results',
  'presentations': 'documents/investor-relations/presentations',
  'policies': 'documents/investor-relations/policies',
  'shareholding': 'documents/investor-relations/shareholding',
  'csr-reports': 'documents/csr',
  'general-documents': 'documents/general'
};

// Middleware
app.use(compression()); // Enable gzip compression

// Configure CORS to allow requests from production domains
const corsOptions = {
  origin: function (origin, callback) {
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'https://mspil.in',
      'https://www.mspil.in',
      'http://mspil.in',
      'http://www.mspil.in'
    ];
    
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('⚠️ CORS blocked origin:', origin);
      callback(null, true); // For now, allow all origins to debug
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  exposedHeaders: ['Content-Length', 'Content-Type']
};

app.use(cors(corsOptions));
app.use(express.json());
app.use('/uploads', express.static(uploadsDir, {
  maxAge: '1h', // Cache for 1 hour
  etag: true,
  lastModified: true,
  setHeaders: (res, path) => {
    if (path.match(/\.(jpg|jpeg|png|gif|webp)$/i)) {
      res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate'); // 1 hour
      res.setHeader('X-Content-Type-Options', 'nosniff');
    }
  }
}));

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
  
  if (lower.includes('sahil') || (lower.includes('director') && lower.includes('supply chain'))) {
    console.log('✅ Detected: sahil-raza-image');
    return 'sahil-raza-image';
  }
  
  if (lower.includes('asad') || (lower.includes('director') && lower.includes('operations'))) {
    console.log('✅ Detected: asad-raza-image');
    return 'asad-raza-image';
  }
  
  if (lower.includes('ahmed') || (lower.includes('director') && (lower.includes('finance') || lower.includes('strategy')))) {
    console.log('✅ Detected: ahmed-raza-image');
    return 'ahmed-raza-image';
  }
  
  if (lower.includes('fatima') || (lower.includes('director') && (lower.includes('hr') || lower.includes('human resources')))) {
    console.log('✅ Detected: fatima-raza-image');
    return 'fatima-raza-image';
  }
  
  // Image Categories (check first for images)
  if (lower.includes('media') || lower.includes('midea') || lower.includes('gallery')) {
    console.log('✅ Detected: media-images');
    return 'media-images';
  }
  
  // Timeline/About Us Images  
  if (lower.includes('timeline') || lower.includes('history') || lower.includes('journey') || 
      lower.includes('inception') || lower.includes('expansion') || lower.includes('2005') ||
      lower.includes('2010') || lower.includes('2016') || lower.includes('2018') || 
      lower.includes('2020') || lower.includes('2023') || lower.includes('2024')) {
    console.log('✅ Detected: timeline-images');
    return 'timeline-images';
  }
  
  // Careers Images
  if (lower.includes('career') || lower.includes('culture') || lower.includes('collaboration') || 
      lower.includes('testimonial') || lower.includes('employee') || lower.includes('workplace')) {
    console.log('✅ Detected: career-images');
    return 'career-images';
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
  
  // Business Section Images (for image files)
  if ((lower.includes('sugar') || lower.includes('mill')) && (filename.includes('.jpg') || filename.includes('.jpeg') || filename.includes('.png') || filename.includes('.webp'))) {
    console.log('✅ Detected: sugar-images');
    return 'sugar-images';
  }
  
  if ((lower.includes('ethanol') || lower.includes('distillery') || lower.includes('alcohol')) && (filename.includes('.jpg') || filename.includes('.jpeg') || filename.includes('.png') || filename.includes('.webp'))) {
    console.log('✅ Detected: ethanol-images');
    return 'ethanol-images';
  }
  
  if ((lower.includes('power') || lower.includes('generator') || lower.includes('electricity') || lower.includes('bagasse')) && (filename.includes('.jpg') || filename.includes('.jpeg') || filename.includes('.png') || filename.includes('.webp'))) {
    console.log('✅ Detected: power-images');
    return 'power-images';
  }
  
  if ((lower.includes('feed') || lower.includes('ddgs') || lower.includes('animal') || lower.includes('livestock')) && (filename.includes('.jpg') || filename.includes('.jpeg') || filename.includes('.png') || filename.includes('.webp'))) {
    console.log('✅ Detected: feed-images');
    return 'feed-images';
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
  // Determine the base path - in production on Railway, both apps are in same directory
  const isProduction = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT;
  const basePath = isProduction 
    ? path.join(__dirname, '..', 'public')  // In production, go up one level to find public
    : path.join(__dirname, '..', 'public'); // Same structure locally
    
  console.log(`📁 Base path for public files: ${basePath}`);
  console.log(`🚂 Railway environment: ${process.env.RAILWAY_ENVIRONMENT}`);
  console.log(`📍 Current directory: ${__dirname}`);
  console.log(`✅ Base path exists: ${fs.existsSync(basePath)}`);
  
  // Additional debugging
  if (!fs.existsSync(basePath)) {
    console.error(`❌ ERROR: Base path does not exist: ${basePath}`);
    console.log(`🔍 Looking for alternative paths...`);
    const alternativePaths = [
      path.join(__dirname, '..', 'public'),
      path.join(__dirname, '..', '..', 'public'),
      path.join(process.cwd(), 'public'),
      path.join(process.cwd(), '..', 'public')
    ];
    
    alternativePaths.forEach(altPath => {
      console.log(`  - ${altPath}: ${fs.existsSync(altPath) ? '✅ EXISTS' : '❌ NOT FOUND'}`);
    });
  }
  
  // Use global categoryPaths mapping
  
  // Categories that should overwrite existing files (single-purpose)
  const overwriteCategories = [
    'saif-raza-image',
    'nawab-raza-image',
    'sahil-raza-image',
    // Add other single-purpose categories that should replace old files
    'about-images',
    'office-images',
    'infrastructure-images'
  ];
  
  const relativePath = categoryPaths[category] || categoryPaths['general-documents'];
  const targetDir = path.join(basePath, relativePath);
  
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    
    let finalFilename;
    let targetPath;
    
    if (overwriteCategories.includes(category)) {
      // For single-purpose categories, use fixed filename and overwrite
      const ext = path.extname(file.originalname);
      const fixedFilenames = {
        'saif-raza-image': `saif_raza_md${ext}`,
        'nawab-raza-image': `nawab_raza_chairman${ext}`,
        'sahil-raza-image': `sahil_raza_director_supply_chain${ext}`,
        'about-images': `about_main${ext}`,
        'office-images': `office_main${ext}`,
        'infrastructure-images': `infrastructure_main${ext}`
      };
      
      // Add timestamp to filename for cache busting
      const timestamp = Date.now();
      const baseFilename = fixedFilenames[category] || `${category}${ext}`;
      finalFilename = baseFilename.replace(ext, `_${timestamp}${ext}`);
      targetPath = path.join(targetDir, finalFilename);
      
      // Delete all old versions of this file
      const files = fs.readdirSync(targetDir);
      const basePattern = baseFilename.replace(ext, '');
      files.forEach(fileName => {
        if (fileName.startsWith(basePattern) && fileName.endsWith(ext)) {
          fs.unlinkSync(path.join(targetDir, fileName));
          console.log(`🗑️ Deleted old file: ${fileName}`);
        }
      });
      
    } else {
      // For multi-file categories, use smart filename with timestamp
      finalFilename = generateSmartFilename(file.originalname, category, comment);
      targetPath = path.join(targetDir, finalFilename);
    }
    
    // Copy file to public directory
    const sourcePath = file.path;
    
    // First check if source file exists and has content
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Source file does not exist: ${sourcePath}`);
    }
    
    const sourceStats = fs.statSync(sourcePath);
    if (sourceStats.size === 0) {
      throw new Error(`Source file is empty: ${sourcePath}`);
    }
    
    console.log(`📋 Copying file from ${sourcePath} to ${targetPath}`);
    fs.copyFileSync(sourcePath, targetPath);
    
    // Verify the copy was successful
    if (!fs.existsSync(targetPath)) {
      throw new Error(`Failed to copy file to: ${targetPath}`);
    }
    
    const targetStats = fs.statSync(targetPath);
    if (targetStats.size !== sourceStats.size) {
      throw new Error(`File copy size mismatch. Source: ${sourceStats.size}, Target: ${targetStats.size}`);
    }
    
    console.log(`✅ File successfully copied to public directory: ${targetPath}`);
    
    // Also rename the file in uploads directory to match smart filename
    const uploadsPath = path.join(uploadsDir, finalFilename);
    fs.renameSync(sourcePath, uploadsPath);
    
    console.log(`✅ File copied: ${file.originalname} → ${finalFilename} (${category})`);
    return { success: true, newFilename: finalFilename };
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
      console.log(`📖 Read ${existingData.length} existing entries from published-content.json`);
    } else {
      console.log('📝 Creating new published-content.json file');
    }
  } catch (error) {
    console.log('📝 Creating new content file due to error:', error.message);
    existingData = [];
  }
  
  // Categories that should overwrite existing entries
  const overwriteCategories = [
    'saif-raza-image',
    'nawab-raza-image',
    'sahil-raza-image',
    'about-images',
    'office-images',
    'infrastructure-images'
  ];
  
  if (overwriteCategories.includes(content.category)) {
    // Remove any existing entries with the same category
    const before = existingData.length;
    existingData = existingData.filter(item => item.category !== content.category);
    const removed = before - existingData.length;
    if (removed > 0) {
      console.log(`🗑️ Removed ${removed} old ${content.category} entries from database`);
    }
  }
  
  // Add new content to beginning of array (most recent first)
  existingData.unshift(content);
  
  try {
    // Write with proper error handling and sync
    fs.writeFileSync(dataPath, JSON.stringify(existingData, null, 2), 'utf-8');
    
    // Verify the write was successful
    const verifyContent = fs.readFileSync(dataPath, 'utf-8');
    const verifyData = JSON.parse(verifyContent);
    
    if (verifyData.length === existingData.length) {
      console.log(`✅ Successfully saved content to published-content.json (${existingData.length} total entries)`);
      console.log(`📝 New entry: ${content.filename} in category: ${content.category}`);
    } else {
      throw new Error('Data verification failed after write');
    }
  } catch (writeError) {
    console.error('❌ Failed to write published-content.json:', writeError);
    console.error('Attempted to write:', JSON.stringify(content, null, 2));
    throw writeError;
  }
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
    const summary = req.body.summary || '';
    const forcePlacement = req.body.forcePlacement;

    console.log(`📤 Upload request:`, {
      filename: file.originalname,
      comment: comment,
      summary: summary,
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
    const protocol = req.secure || req.get('x-forwarded-proto') === 'https' ? 'https' : 'http';
    const host = req.get('x-forwarded-host') || req.get('host');
    
    // Force HTTPS for production URLs
    const finalProtocol = protocol === 'https' || process.env.NODE_ENV === 'production' ? 'https' : protocol;
    
    // Generate the static file URL based on category
    const relativePath = categoryPaths[category] || categoryPaths['general-documents'];
    const staticUrl = `/${relativePath}/${copyResult.newFilename || file.filename}`;
    
    const content = {
      id: Date.now(),
      filename: copyResult.newFilename, // Use the smart renamed filename
      originalFilename: file.originalname, // Keep original for reference
      url: staticUrl, // Now points to static file location
      mimeType: file.mimetype,
      size: file.size,
      category: category,
      comment: comment,
      summary: summary,
      uploadedBy: req.user.username,
      uploadedAt: new Date().toISOString()
    };

    // Save content info with error handling
    try {
      saveContentInfo(content);
      console.log(`💾 Content info saved to published-content.json`);
    } catch (saveError) {
      console.error('❌ Failed to save content info:', saveError);
      // Continue with response even if save fails
    }

    console.log(`✅ Upload successful: ${file.originalname} → ${copyResult.newFilename} (${category})`);
    
    // Auto-deploy temporarily disabled
    if (process.env.ENABLE_AUTO_DEPLOY === 'true') {
      console.log('🚀 Auto-deploy is enabled but temporarily disabled until Railway deployment is fixed');
    }
    
    res.json({
      success: true,
      file: content,
      message: `File uploaded successfully as "${copyResult.newFilename}" to ${category}`,
      smartRename: {
        original: file.originalname,
        smart: copyResult.newFilename,
        category: category
      },
      autoDeploy: process.env.ENABLE_AUTO_DEPLOY === 'true'
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
      console.log('📄 No published-content.json file found');
      return res.json([]);
    }
    
    const content = fs.readFileSync(dataPath, 'utf-8');
    let parsedContent = [];
    
    try {
      parsedContent = JSON.parse(content);
      console.log(`📖 Loaded ${parsedContent.length} entries from published-content.json`);
    } catch (parseError) {
      console.error('❌ Failed to parse published-content.json:', parseError);
      return res.json([]);
    }
    
    // Use global categoryPaths mapping
    
    // Content already has static URLs starting with /, no need to fix
    const fixedContent = parsedContent.map(item => {
      // If URL starts with /, it's already a static path
      if (item.url && item.url.startsWith('/')) {
        return item; // Keep as is - it's already pointing to static files
      }
      
      // For backward compatibility, fix old upload URLs
      if (item.url && (item.url.includes('/uploads/') || item.url.includes('localhost'))) {
        // Try to determine the category and generate proper static URL
        const filename = item.url.split('/').pop();
        const category = item.category || 'general-documents';
        const relativePath = categoryPaths[category] || categoryPaths['general-documents'];
        item.url = `/${relativePath}/${filename}`;
      }
      return item;
    });
    
    // Sort by uploadedAt date in descending order (newest first)
    const sortedContent = fixedContent.sort((a, b) => {
      const dateA = new Date(a.uploadedAt || 0);
      const dateB = new Date(b.uploadedAt || 0);
      return dateB - dateA; // Newest first
    });
    
    console.log(`✅ Returning ${sortedContent.length} entries (sorted by date, newest first)`);
    res.json(sortedContent);
  } catch (error) {
    console.error('❌ Content fetch error:', error);
    res.status(500).json([]);
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
    
    const allowedCategories = ['sugar-data', 'ethanol-data', 'power-data', 'feed-data'];
    if (!allowedCategories.includes(category)) {
      return res.status(400).json({ error: 'Invalid category' });
    }
    
    const categoryPath = `../public/${categoryPaths[category]}`;
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
    console.log(`📥 Download request - Category: ${category}, Filename: ${filename}`);
    
    // Use global categoryPaths but prepend with ../public/ for download
    const downloadCategoryPaths = {};
    for (const [key, value] of Object.entries(categoryPaths)) {
      downloadCategoryPaths[key] = `../public/${value}`;
    }
    
    const categoryPath = downloadCategoryPaths[category];
    if (!categoryPath) {
      console.error(`❌ Invalid category: ${category}`);
      return res.status(400).json({ error: `Invalid category: ${category}` });
    }
    
    const filePath = path.join(__dirname, categoryPath, filename);
    console.log(`📁 Looking for file at: ${filePath}`);
    
    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`❌ File not found: ${filePath}`);
      
      // Try to find the file in uploads directory as fallback
      const uploadsPath = path.join(__dirname, 'uploads', filename);
      if (fs.existsSync(uploadsPath)) {
        console.log(`✅ Found file in uploads directory: ${uploadsPath}`);
        res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
        res.setHeader('Content-Type', 'application/octet-stream');
        res.sendFile(path.resolve(uploadsPath));
        console.log(`✅ Download successful from uploads: ${filename}`);
        return;
      }
      
      return res.status(404).json({ error: `File not found: ${filename}` });
    }
    
    // Get file stats
    const stats = fs.statSync(filePath);
    console.log(`📊 File size: ${(stats.size / 1024).toFixed(2)} KB`);
    
    // Set appropriate headers for download
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.setHeader('Content-Type', 'application/octet-stream');
    res.setHeader('Content-Length', stats.size);
    
    // Send the file
    res.sendFile(path.resolve(filePath));
    console.log(`✅ Download initiated: ${filename} from ${category}`);
    
  } catch (error) {
    console.error('❌ Download error:', error);
    res.status(500).json({ error: `Download failed: ${error.message}` });
  }
});

// Update file summary
app.put('/api/update-summary', authMiddleware, (req, res) => {
  try {
    const { fileId, summary } = req.body;
    
    if (!fileId) {
      return res.status(400).json({ error: 'File ID required' });
    }

    const dataPath = path.join(__dirname, 'published-content.json');
    
    if (!fs.existsSync(dataPath)) {
      return res.status(404).json({ error: 'No content found' });
    }
    
    const content = fs.readFileSync(dataPath, 'utf-8');
    let data = JSON.parse(content);
    
    // Find and update the file
    const fileIndex = data.findIndex(item => item.id === fileId || item.id === parseInt(fileId));
    
    if (fileIndex === -1) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    // Update the summary
    data[fileIndex].summary = summary || '';
    data[fileIndex].lastModified = new Date().toISOString();
    data[fileIndex].modifiedBy = req.user.username;
    
    // Save updated content
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    
    console.log(`✅ Summary updated for file: ${data[fileIndex].filename} by ${req.user.username}`);
    
    res.json({
      success: true,
      message: 'Summary updated successfully',
      file: data[fileIndex]
    });
    
  } catch (error) {
    console.error('Update summary error:', error);
    res.status(500).json({ error: 'Failed to update summary' });
  }
});

// AI Insights endpoint with progress tracking
app.post('/api/ai-insights', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const file = req.file;
    
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log(`🔍 Starting AI insights for: ${file.originalname}`);
    
    let extractedText = '';
    const filePath = file.path;
    let progress = 0;
    
    // Step 1: Text extraction (30% progress)
    progress = 10;
    console.log(`📊 Progress: ${progress}% - Starting text extraction...`);
    
    if (file.mimetype === 'application/pdf') {
      try {
        progress = 20;
        console.log(`📊 Progress: ${progress}% - Extracting text from PDF...`);
        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);
        extractedText = pdfData.text;
        progress = 30;
        console.log(`📊 Progress: ${progress}% - PDF text extracted: ${extractedText.length} characters`);
      } catch (pdfError) {
        console.log('❌ PDF text extraction failed, trying OCR...');
      }
    }
    
    // Step 2: OCR if needed (50% progress)
    if (!extractedText || extractedText.trim().length < 50) {
      try {
        progress = 35;
        console.log(`📊 Progress: ${progress}% - Running OCR analysis...`);
        const { data: { text } } = await Tesseract.recognize(filePath, 'eng');
        extractedText = text;
        progress = 50;
        console.log(`📊 Progress: ${progress}% - OCR completed: ${extractedText.length} characters`);
      } catch (ocrError) {
        console.log('❌ OCR failed:', ocrError.message);
        progress = 50;
      }
    } else {
      progress = 50;
    }
    
    // Step 3: Generate AI summary with OpenAI (100% progress)
    let aiSummary = '';
    if (extractedText && extractedText.trim().length > 20) {
      try {
        progress = 60;
        console.log(`📊 Progress: ${progress}% - Generating AI summary with OpenAI...`);
        aiSummary = await generateOpenAISummary(extractedText);
        progress = 100;
        console.log(`📊 Progress: ${progress}% - AI summary generated: ${aiSumm