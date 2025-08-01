import { getPool } from '../config/database.js';
import { logger } from '../server.js';

// News operations
export async function saveNewsItem(article) {
  const pool = await getPool();
  
  try {
    const query = `
      INSERT INTO news_articles (title, url, source, summary, categories, published_date, metadata)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (url) DO NOTHING
      RETURNING id
    `;
    
    const values = [
      article.title,
      article.url,
      article.source,
      article.summary,
      article.categories,
      article.date,
      JSON.stringify(article.metadata || {})
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0]?.id;
    
  } catch (error) {
    logger.error('Error saving news item:', error);
    throw error;
  }
}

export async function getLatestNewsFromDB(topics = [], limit = 10) {
  const pool = await getPool();
  
  try {
    let query = `
      SELECT * FROM news_articles
      WHERE published_date >= NOW() - INTERVAL '7 days'
    `;
    
    const values = [];
    
    if (topics.length > 0) {
      query += ` AND categories && $1`;
      values.push(topics);
    }
    
    query += ` ORDER BY published_date DESC LIMIT $${values.length + 1}`;
    values.push(limit);
    
    const result = await pool.query(query, values);
    return result.rows;
    
  } catch (error) {
    logger.error('Error fetching news from DB:', error);
    return [];
  }
}

// Chat operations
export async function saveChatMessage(sessionId, messageType, message, metadata = {}) {
  const pool = await getPool();
  
  try {
    const query = `
      INSERT INTO chat_history (session_id, message_type, message, metadata)
      VALUES ($1, $2, $3, $4)
      RETURNING id
    `;
    
    const values = [sessionId, messageType, message, JSON.stringify(metadata)];
    const result = await pool.query(query, values);
    
    return result.rows[0].id;
    
  } catch (error) {
    logger.error('Error saving chat message:', error);
    throw error;
  }
}

export async function getChatHistory(sessionId, limit = 50) {
  const pool = await getPool();
  
  try {
    const query = `
      SELECT * FROM chat_history
      WHERE session_id = $1
      ORDER BY created_at DESC
      LIMIT $2
    `;
    
    const result = await pool.query(query, [sessionId, limit]);
    return result.rows.reverse(); // Return in chronological order
    
  } catch (error) {
    logger.error('Error fetching chat history:', error);
    return [];
  }
}

// Content operations
export async function saveContentPost(postData) {
  const pool = await getPool();
  
  try {
    const query = `
      INSERT INTO content_posts (platform, content, image_url, scheduled_time, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    
    const values = [
      postData.platform,
      postData.content,
      postData.imageUrl,
      postData.scheduledTime,
      postData.scheduledTime ? 'scheduled' : 'draft'
    ];
    
    const result = await pool.query(query, values);
    return result.rows[0];
    
  } catch (error) {
    logger.error('Error saving content post:', error);
    throw error;
  }
}

export async function updatePostStatus(postId, status, postUrl = null, analytics = null) {
  const pool = await getPool();
  
  try {
    const updates = ['status = $2'];
    const values = [postId, status];
    
    if (postUrl) {
      updates.push(`post_url = $${values.length + 1}`);
      values.push(postUrl);
    }
    
    if (status === 'posted') {
      updates.push(`posted_at = CURRENT_TIMESTAMP`);
    }
    
    if (analytics) {
      updates.push(`analytics = $${values.length + 1}`);
      values.push(JSON.stringify(analytics));
    }
    
    const query = `
      UPDATE content_posts
      SET ${updates.join(', ')}
      WHERE id = $1
      RETURNING *
    `;
    
    const result = await pool.query(query, values);
    return result.rows[0];
    
  } catch (error) {
    logger.error('Error updating post status:', error);
    throw error;
  }
}

export async function getScheduledPosts() {
  const pool = await getPool();
  
  try {
    const query = `
      SELECT * FROM content_posts
      WHERE status = 'scheduled'
        AND scheduled_time <= NOW()
      ORDER BY scheduled_time ASC
    `;
    
    const result = await pool.query(query);
    return result.rows;
    
  } catch (error) {
    logger.error('Error fetching scheduled posts:', error);
    return [];
  }
}

// Image operations
export async function saveGeneratedImage(prompt, filePath, url = null, metadata = {}) {
  const pool = await getPool();
  
  try {
    const query = `
      INSERT INTO generated_images (prompt, file_path, url, metadata)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    
    const values = [prompt, filePath, url, JSON.stringify(metadata)];
    const result = await pool.query(query, values);
    
    return result.rows[0];
    
  } catch (error) {
    logger.error('Error saving generated image:', error);
    throw error;
  }
}

// Analytics operations
export async function getContentAnalytics(platform = null, dateFrom = null, dateTo = null) {
  const pool = await getPool();
  
  try {
    let query = `
      SELECT 
        platform,
        COUNT(*) as total_posts,
        COUNT(CASE WHEN status = 'posted' THEN 1 END) as posted_count,
        AVG((analytics->>'impressions')::int) as avg_impressions,
        AVG((analytics->>'engagement')::float) as avg_engagement
      FROM content_posts
      WHERE status = 'posted'
    `;
    
    const values = [];
    
    if (platform) {
      query += ` AND platform = $${values.length + 1}`;
      values.push(platform);
    }
    
    if (dateFrom) {
      query += ` AND posted_at >= $${values.length + 1}`;
      values.push(dateFrom);
    }
    
    if (dateTo) {
      query += ` AND posted_at <= $${values.length + 1}`;
      values.push(dateTo);
    }
    
    query += ' GROUP BY platform';
    
    const result = await pool.query(query, values);
    return result.rows;
    
  } catch (error) {
    logger.error('Error fetching analytics:', error);
    return [];
  }
}