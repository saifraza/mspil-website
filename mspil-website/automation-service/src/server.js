import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server } from 'socket.io';
import winston from 'winston';
import chatRoutes from './routes/chatRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import contentRoutes from './routes/contentRoutes.js';
import mediaRoutes from './routes/mediaRoutes.js';
import { initializeDatabase } from './config/database.js';
import { startNewsMonitoring } from './services/newsMonitoringService-simple.js';
import { initializeAIAgent } from './services/aiAgentService.js';
import { initializeImageGeneration } from './services/imageGenerationService.js';

dotenv.config();

// Configure logger
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'mspil-automation' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: [
      process.env.CORS_ORIGIN || 'http://localhost:5173',
      'https://mspil.in',
      'https://www.mspil.in',
      'http://localhost:5173',
      'http://localhost:3000',
      'https://mspil-website-production.up.railway.app',
      'https://mspil-mcp-production.up.railway.app'
    ],
    methods: ['GET', 'POST'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept']
  },
  transports: ['websocket', 'polling']
});

// Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disable CSP for development
  crossOriginEmbedderPolicy: false
}));
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:3001',
      'https://mspil.in',
      'https://www.mspil.in',
      'https://mspil-website-production.up.railway.app',
      'https://mspil-mcp-production.up.railway.app'
    ];
    
    if (allowedOrigins.includes(origin) || origin.includes('localhost')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  optionsSuccessStatus: 200
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Routes
app.use('/api/chat', chatRoutes(io));
app.use('/api/news', newsRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/media', mediaRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Test Anthropic API
app.get('/api/test-anthropic', async (req, res) => {
  try {
    const hasApiKey = !!process.env.ANTHROPIC_API_KEY;
    const keyPreview = hasApiKey ? process.env.ANTHROPIC_API_KEY.substring(0, 10) + '...' : 'NOT SET';
    
    logger.info('Testing Anthropic API:', { hasApiKey, keyPreview });
    
    if (!hasApiKey) {
      return res.json({
        success: false,
        error: 'ANTHROPIC_API_KEY not set in environment variables',
        keyPreview
      });
    }
    
    // Try a simple API call
    const { Anthropic } = await import('@anthropic-ai/sdk');
    const testClient = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY
    });
    
    const testResponse = await testClient.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 100,
      messages: [{
        role: 'user',
        content: 'Say "API is working"'
      }]
    });
    
    res.json({
      success: true,
      response: testResponse.content[0].text,
      keyPreview
    });
    
  } catch (error) {
    logger.error('Anthropic API test error:', {
      message: error.message,
      status: error.status,
      type: error.error?.type
    });
    
    res.json({
      success: false,
      error: error.message,
      status: error.status,
      type: error.error?.type,
      keyPreview: process.env.ANTHROPIC_API_KEY ? process.env.ANTHROPIC_API_KEY.substring(0, 10) + '...' : 'NOT SET'
    });
  }
});

// WebSocket connection handling
io.on('connection', (socket) => {
  logger.info('New client connected:', socket.id);
  
  socket.on('join_chat', () => {
    socket.join('marketing_chat');
    socket.emit('chat_joined', { 
      message: 'Welcome to MSPIL Marketing Agent! How can I help you today?' 
    });
  });
  
  socket.on('disconnect', () => {
    logger.info('Client disconnected:', socket.id);
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start server
const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    // Initialize database
    await initializeDatabase();
    logger.info('Database initialized');
    
    // Initialize AI agent
    await initializeAIAgent();
    logger.info('AI agent initialized');
    
    // Initialize image generation
    initializeImageGeneration();
    logger.info('Image generation initialized');
    
    // Start news monitoring
    startNewsMonitoring();
    logger.info('News monitoring started');
    
    // Increase timeout for large file serving
    httpServer.timeout = 300000; // 5 minutes
    httpServer.keepAliveTimeout = 310000; // Slightly higher than timeout
    
    httpServer.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export { app, io, logger };