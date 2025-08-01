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
      'http://localhost:5173',
      'http://localhost:3000'
    ],
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Middleware
app.use(helmet());
app.use(cors({
  origin: [
    process.env.CORS_ORIGIN || 'http://localhost:5173',
    'https://mspil.in',
    'http://localhost:5173',
    'http://localhost:3000'
  ],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/chat', chatRoutes(io));
app.use('/api/news', newsRoutes);
app.use('/api/content', contentRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
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