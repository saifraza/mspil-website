import pg from 'pg';
import { logger } from '../server.js';

const { Pool } = pg;
let pool;

export async function initializeDatabase() {
  try {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
    });
    
    // Test connection
    await pool.query('SELECT NOW()');
    logger.info('Database connected successfully');
    
    // Create tables if they don't exist
    await createTables();
    
  } catch (error) {
    logger.error('Database initialization error:', error);
    throw error;
  }
}

async function createTables() {
  try {
    // News articles table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS news_articles (
        id SERIAL PRIMARY KEY,
        title VARCHAR(500) NOT NULL,
        url VARCHAR(1000) UNIQUE NOT NULL,
        source VARCHAR(100) NOT NULL,
        summary TEXT,
        categories TEXT[],
        published_date TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        metadata JSONB
      )
    `);
    
    // Chat history table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS chat_history (
        id SERIAL PRIMARY KEY,
        session_id VARCHAR(100) NOT NULL,
        message_type VARCHAR(20) NOT NULL,
        message TEXT NOT NULL,
        metadata JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Content posts table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS content_posts (
        id SERIAL PRIMARY KEY,
        platform VARCHAR(50) NOT NULL,
        content TEXT NOT NULL,
        image_url VARCHAR(500),
        post_url VARCHAR(500),
        scheduled_time TIMESTAMP,
        posted_at TIMESTAMP,
        status VARCHAR(20) DEFAULT 'draft',
        analytics JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Generated images table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS generated_images (
        id SERIAL PRIMARY KEY,
        prompt TEXT NOT NULL,
        file_path VARCHAR(500) NOT NULL,
        url VARCHAR(500),
        metadata JSONB,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Create indexes
    await pool.query('CREATE INDEX IF NOT EXISTS idx_news_articles_published ON news_articles(published_date DESC)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_chat_history_session ON chat_history(session_id)');
    await pool.query('CREATE INDEX IF NOT EXISTS idx_content_posts_scheduled ON content_posts(scheduled_time)');
    
    logger.info('Database tables created successfully');
    
  } catch (error) {
    logger.error('Error creating tables:', error);
    throw error;
  }
}

export async function getPool() {
  if (!pool) {
    await initializeDatabase();
  }
  return pool;
}

export async function closeDatabase() {
  if (pool) {
    await pool.end();
    logger.info('Database connection closed');
  }
}