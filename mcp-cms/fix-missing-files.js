const fs = require('fs');
const path = require('path');

// Read published-content.json
const contentPath = path.join(__dirname, 'published-content.json');
const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));

console.log(`📖 Found ${content.length} entries in published-content.json\n`);

// Category paths mapping (from server.cjs)
const categoryPaths = {
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
  'general-documents': 'documents/general'
};

const basePath = path.join(__dirname, '..', 'public');
const uploadsDir = path.join(__dirname, 'uploads');

let fixedCount = 0;
let missingCount = 0;
let alreadyExistsCount = 0;

// Check each entry
content.forEach(entry => {
  // Skip entries with size 0 (placeholder entries)
  if (entry.size === 0) {
    return;
  }
  
  // Get the expected public path
  const relativePath = categoryPaths[entry.category] || 'documents/general';
  const publicPath = path.join(basePath, relativePath, entry.filename);
  
  // Check if file exists in public
  if (!fs.existsSync(publicPath)) {
    console.log(`❌ Missing in public: ${entry.filename} (${entry.category})`);
    
    // Check if file exists in uploads
    const uploadsPath = path.join(uploadsDir, entry.filename);
    if (fs.existsSync(uploadsPath)) {
      console.log(`  ✅ Found in uploads directory`);
      
      // Create directory if needed
      const targetDir = path.dirname(publicPath);
      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
        console.log(`  📁 Created directory: ${targetDir}`);
      }
      
      // Copy file
      try {
        fs.copyFileSync(uploadsPath, publicPath);
        console.log(`  ✅ Copied to: ${publicPath}`);
        fixedCount++;
      } catch (error) {
        console.error(`  ❌ Failed to copy: ${error.message}`);
      }
    } else {
      console.log(`  ❌ Not found in uploads either!`);
      missingCount++;
    }
  } else {
    alreadyExistsCount++;
  }
});

console.log(`\n📊 Summary:`);
console.log(`- Files already in public: ${alreadyExistsCount}`);
console.log(`- Files fixed (copied): ${fixedCount}`);
console.log(`- Files missing from both locations: ${missingCount}`);

// List current files in leadership directory
const leadershipPath = path.join(basePath, 'images', 'leadership');
if (fs.existsSync(leadershipPath)) {
  console.log(`\n📁 Current files in leadership directory:`);
  const files = fs.readdirSync(leadershipPath);
  files.forEach(file => {
    const stats = fs.statSync(path.join(leadershipPath, file));
    console.log(`- ${file} (${stats.size} bytes)`);
  });
}