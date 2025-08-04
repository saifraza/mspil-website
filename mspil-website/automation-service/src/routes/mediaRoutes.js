import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs/promises';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = path.join(process.cwd(), 'uploads', req.body.category || 'general');
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueId = uuidv4();
    const extension = path.extname(file.originalname);
    cb(null, `${uniqueId}${extension}`);
  }
});

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

// Store media metadata in memory (in production, use database)
const mediaDatabase = new Map();

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

    const mediaId = uuidv4();
    const mediaInfo = {
      id: mediaId,
      filename: req.file.filename,
      originalName: req.file.originalname,
      category,
      size: req.file.size,
      mimetype: req.file.mimetype,
      url: `${baseUrl}/api/media/file/${category}/${req.file.filename}`,
      uploadDate: new Date().toISOString(),
      metadata: typeof metadata === 'string' ? JSON.parse(metadata) : metadata
    };

    // Store in database
    mediaDatabase.set(mediaId, mediaInfo);

    res.json({
      success: true,
      ...mediaInfo
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// List media files
router.get('/list', (req, res) => {
  try {
    const { category } = req.query;
    let mediaFiles = Array.from(mediaDatabase.values());

    if (category) {
      mediaFiles = mediaFiles.filter(file => file.category === category);
    }

    res.json(mediaFiles);
  } catch (error) {
    console.error('List error:', error);
    res.status(500).json({ error: 'Failed to list media files' });
  }
});

// Serve media files
router.get('/file/:category/:filename', async (req, res) => {
  try {
    const { category, filename } = req.params;
    const filePath = path.join(process.cwd(), 'uploads', category, filename);
    
    // Check if file exists
    await fs.access(filePath);
    
    // Send file
    res.sendFile(filePath);
  } catch (error) {
    console.error('File serve error:', error);
    res.status(404).json({ error: 'File not found' });
  }
});

// Delete media file
router.delete('/delete/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const mediaInfo = mediaDatabase.get(id);

    if (!mediaInfo) {
      return res.status(404).json({ error: 'Media not found' });
    }

    // Delete physical file
    const filePath = path.join(process.cwd(), 'uploads', mediaInfo.category, mediaInfo.filename);
    await fs.unlink(filePath);

    // Remove from database
    mediaDatabase.delete(id);

    res.json({ success: true, message: 'Media deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete media' });
  }
});

// Get media by ID
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const mediaInfo = mediaDatabase.get(id);

  if (!mediaInfo) {
    return res.status(404).json({ error: 'Media not found' });
  }

  res.json(mediaInfo);
});

export default router;