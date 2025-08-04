import express from 'express';
import multer from 'multer';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import pg from 'pg';

const router = express.Router();

// Add CORS headers middleware for all media routes
router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Accept');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});
const { Pool } = pg;

// Create database connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
});

// Run migration on startup
async function ensureTableSchema() {
  try {
    // Check if file_content column exists
    const checkColumn = await pool.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'media_files' AND column_name = 'file_content'
    `);
    
    if (checkColumn.rows.length === 0) {
      console.log('Adding file_content column to media_files table...');
      await pool.query('ALTER TABLE media_files ADD COLUMN file_content TEXT');
      console.log('file_content column added successfully');
    }
  } catch (error) {
    console.error('Schema check error:', error.message);
  }
}

// Run migration
ensureTableSchema();

// Configure multer for memory storage (store files in memory to save as base64)
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024 // 50MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|mov|avi|pdf|doc|docx|xls|xlsx|ppt|pptx|csv/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const allowedMimes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp',
      'video/mp4', 'video/quicktime', 'video/x-msvideo',
      'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/csv'
    ];
    const mimetype = allowedMimes.includes(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Allowed: images, videos, PDFs, and office documents.'));
    }
  }
});

// Upload media file
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { category = 'general', metadata = {} } = req.body;
    const baseUrl = process.env.NODE_ENV === 'production'
      ? 'https://automationservice-production-4565.up.railway.app'
      : `http://localhost:${process.env.PORT || 3002}`;

    const mediaUrl = `${baseUrl}/api/media/file/${category}/${req.file.filename}`;
    const metadataJson = typeof metadata === 'string' ? JSON.parse(metadata) : metadata;

    // Convert file to base64
    const fileContent = req.file.buffer.toString('base64');
    const filename = `${uuidv4()}${path.extname(req.file.originalname)}`;
    
    // Store in database with file content
    const query = `
      INSERT INTO media_files (filename, original_name, category, file_size, mime_type, url, metadata, file_content)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `;
    
    const values = [
      filename,
      req.file.originalname,
      category,
      req.file.size,
      req.file.mimetype,
      mediaUrl.replace(req.file.filename, filename),
      metadataJson,
      fileContent
    ];

    const result = await pool.query(query, values);
    const mediaInfo = result.rows[0];

    res.json({
      success: true,
      id: mediaInfo.id,
      filename: mediaInfo.filename,
      originalName: mediaInfo.original_name,
      category: mediaInfo.category,
      size: mediaInfo.file_size,
      mimetype: mediaInfo.mime_type,
      url: mediaInfo.url,
      uploadDate: mediaInfo.uploaded_at,
      metadata: mediaInfo.metadata
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// List media files
router.get('/list', async (req, res) => {
  try {
    const { category } = req.query;
    
    let query = 'SELECT * FROM media_files';
    const values = [];
    
    if (category) {
      query += ' WHERE category = $1';
      values.push(category);
    }
    
    query += ' ORDER BY uploaded_at DESC';
    
    const result = await pool.query(query, values);
    
    const mediaFiles = result.rows.map(row => ({
      id: row.id,
      filename: row.filename,
      originalName: row.original_name,
      category: row.category,
      size: row.file_size,
      mimetype: row.mime_type,
      url: row.url,
      uploadDate: row.uploaded_at,
      metadata: row.metadata
    }));

    res.json(mediaFiles);
  } catch (error) {
    console.error('List error:', error);
    res.status(500).json({ error: 'Failed to list media files' });
  }
});

// Serve media files from database with streaming
router.get('/file/:category/:filename', async (req, res) => {
  try {
    const { category, filename } = req.params;
    
    // First check if file exists and get metadata
    const metaQuery = 'SELECT id, mime_type, file_size FROM media_files WHERE category = $1 AND filename = $2';
    const metaResult = await pool.query(metaQuery, [category, filename]);
    
    if (metaResult.rows.length === 0) {
      return res.status(404).json({ error: 'File not found' });
    }
    
    const { id, mime_type, file_size } = metaResult.rows[0];
    
    // For large files, stream the response
    if (parseInt(file_size) > 1024 * 1024) { // Files larger than 1MB
      // Set headers before streaming
      res.set({
        'Content-Type': mime_type,
        'Cache-Control': 'public, max-age=31536000',
        'X-Content-Type-Options': 'nosniff',
        'Cross-Origin-Resource-Policy': 'cross-origin'
      });
      
      // Stream the file content
      const contentQuery = 'SELECT file_content FROM media_files WHERE id = $1';
      pool.query(contentQuery, [id], (err, result) => {
        if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ error: 'Database error' });
        }
        
        try {
          const { file_content } = result.rows[0];
          const buffer = Buffer.from(file_content, 'base64');
          res.set('Content-Length', buffer.length);
          res.end(buffer);
        } catch (decodeError) {
          console.error('Base64 decode error:', decodeError);
          res.status(500).json({ error: 'Failed to decode file' });
        }
      });
    } else {
      // For small files, use the original method
      const query = 'SELECT file_content FROM media_files WHERE id = $1';
      const result = await pool.query(query, [id]);
      
      const { file_content } = result.rows[0];
      const buffer = Buffer.from(file_content, 'base64');
      
      res.set({
        'Content-Type': mime_type,
        'Content-Length': buffer.length,
        'Cache-Control': 'public, max-age=31536000',
        'Cross-Origin-Resource-Policy': 'cross-origin'
      });
      
      res.send(buffer);
    }
  } catch (error) {
    console.error('File serve error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete media file
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get file info from database
    const selectQuery = 'SELECT * FROM media_files WHERE id = $1';
    const selectResult = await pool.query(selectQuery, [id]);
    
    if (selectResult.rows.length === 0) {
      return res.status(404).json({ error: 'Media not found' });
    }
    
    const mediaInfo = selectResult.rows[0];

    // No need to delete physical file as it's stored in database

    // Remove from database
    const deleteQuery = 'DELETE FROM media_files WHERE id = $1';
    await pool.query(deleteQuery, [id]);

    res.json({ success: true, message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete media' });
  }
});

// Get media by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const query = 'SELECT * FROM media_files WHERE id = $1';
    const result = await pool.query(query, [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Media not found' });
    }
    
    const row = result.rows[0];
    res.json({
      id: row.id,
      filename: row.filename,
      originalName: row.original_name,
      category: row.category,
      size: row.file_size,
      mimetype: row.mime_type,
      url: row.url,
      uploadDate: row.uploaded_at,
      metadata: row.metadata
    });
  } catch (error) {
    console.error('Get media error:', error);
    res.status(500).json({ error: 'Failed to get media' });
  }
});

export default router;