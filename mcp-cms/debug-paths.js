const fs = require('fs');
const path = require('path');

console.log('=== PATH DEBUGGING ===\n');

// Current directory
console.log('Current directory (__dirname):', __dirname);
console.log('Current working directory (process.cwd()):', process.cwd());

// Path calculations (mimicking server.cjs)
const isProduction = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT;
const basePath = isProduction 
  ? path.join(__dirname, '..', 'public')
  : path.join(__dirname, '..', 'public');

console.log('\nBase path calculation:');
console.log('- isProduction:', isProduction);
console.log('- basePath:', basePath);
console.log('- basePath exists:', fs.existsSync(basePath));

// Check leadership directory
const leadershipPath = path.join(basePath, 'images', 'leadership');
console.log('\nLeadership directory:');
console.log('- Path:', leadershipPath);
console.log('- Exists:', fs.existsSync(leadershipPath));

if (fs.existsSync(leadershipPath)) {
  const files = fs.readdirSync(leadershipPath);
  console.log('- Files:', files);
  
  // Check file details
  files.forEach(file => {
    const filePath = path.join(leadershipPath, file);
    const stats = fs.statSync(filePath);
    console.log(`  - ${file}: ${stats.size} bytes, modified ${stats.mtime.toISOString()}`);
  });
}

// Test creating a file
console.log('\n=== WRITE TEST ===');
const testPath = path.join(leadershipPath, 'test_debug_' + Date.now() + '.txt');
try {
  // Ensure directory exists
  if (!fs.existsSync(leadershipPath)) {
    fs.mkdirSync(leadershipPath, { recursive: true });
    console.log('Created leadership directory');
  }
  
  // Write test file
  fs.writeFileSync(testPath, 'Debug test at ' + new Date().toISOString());
  console.log('Successfully wrote test file:', testPath);
  
  // Verify it exists
  console.log('File exists:', fs.existsSync(testPath));
  
  // Clean up
  fs.unlinkSync(testPath);
  console.log('Test file cleaned up');
} catch (error) {
  console.error('Write test failed:', error.message);
  console.error('Error details:', error);
}

// Check uploads directory
console.log('\n=== UPLOADS DIRECTORY ===');
const uploadsDir = path.join(__dirname, 'uploads');
if (fs.existsSync(uploadsDir)) {
  const uploadFiles = fs.readdirSync(uploadsDir);
  console.log(`Found ${uploadFiles.length} files in uploads directory`);
  
  // Show recent files
  const recentFiles = uploadFiles
    .map(file => {
      const stats = fs.statSync(path.join(uploadsDir, file));
      return { name: file, time: stats.mtime };
    })
    .sort((a, b) => b.time - a.time)
    .slice(0, 5);
  
  console.log('\nMost recent uploads:');
  recentFiles.forEach(file => {
    console.log(`- ${file.name} (${file.time.toISOString()})`);
  });
}

// Check published content
console.log('\n=== PUBLISHED CONTENT ===');
const publishedPath = path.join(__dirname, 'published-content.json');
if (fs.existsSync(publishedPath)) {
  const content = JSON.parse(fs.readFileSync(publishedPath, 'utf-8'));
  console.log(`Total entries: ${content.length}`);
  
  // Check leadership entries
  const leadershipEntries = content.filter(item => 
    item.category && item.category.includes('leadership') || 
    item.category && item.category.includes('raza')
  );
  
  console.log(`\nLeadership entries: ${leadershipEntries.length}`);
  leadershipEntries.slice(0, 5).forEach(entry => {
    console.log(`- ${entry.filename} (${entry.category}) - ${entry.url}`);
  });
}