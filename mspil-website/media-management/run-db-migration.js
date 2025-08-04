#!/usr/bin/env node

const { Client } = require('pg');

async function runMigration() {
  console.log('🔄 Running database migration...\n');
  
  // Use the DATABASE_URL from Railway
  const DATABASE_URL = 'postgresql://postgres:lqoJhhLcJOkXAcWEFcdOzUdsCJojJgnQ@autorack.proxy.rlwy.net:52532/railway';
  
  const client = new Client({
    connectionString: DATABASE_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });

  try {
    await client.connect();
    console.log('✅ Connected to database');

    // Add file_content column
    console.log('\n📝 Adding file_content column...');
    await client.query(`
      ALTER TABLE media_files 
      ADD COLUMN IF NOT EXISTS file_content TEXT;
    `);
    console.log('✅ Column added successfully');

    // Check current table structure
    const result = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'media_files'
      ORDER BY ordinal_position;
    `);

    console.log('\n📊 Current table structure:');
    console.table(result.rows);

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
  } finally {
    await client.end();
    console.log('\n✅ Migration complete!');
  }
}

runMigration();