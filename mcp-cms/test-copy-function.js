const fs = require('fs');
const path = require('path');

// Simulate the copyFileToPublic function from server.cjs
const categoryPaths = {
  'saif-raza-image': 'images/leadership',
  'nawab-raza-image': 'images/leadership',
  'leadership-images': 'images/leadership',
};

function copyFileToPublic(file, category, comment) {
  const isProduction = process.env.NODE_ENV === 'production' || process.env.RAILWAY_ENVIRONMENT;
  const basePath = isProduction 
    ? path.join(__dirname, '..', 'public')
    : path.join(__dirname, '..', 'public');
    
  console.log(`📁 Base path for public files: ${basePath}`);
  
  const overwriteCategories = [
    'saif-raza-image',
    'nawab-raza-image',
    'sahil-raza-image',
  ];
  
  const relativePath = categoryPaths[category] || 'documents/general';
  const targetDir = path.join(basePath, relativePath);
  
  console.log(`📂 Target directory: ${targetDir}`);
  
  try {
    // Create directory if it doesn't exist
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
      console.log('✅ Created directory');
    }
    
    let finalFilename;
    let targetPath;
    
    if (overwriteCategories.includes(category)) {
      const ext = path.extname(file.originalname);
      const fixedFilenames = {
        'saif-raza-image': `saif_raza_md${ext}`,
        'nawab-raza-image': `nawab_raza_chairman${ext}`,
      };
      
      const timestamp = Date.now();
      const baseFilename = fixedFilenames[category] || `${category}${ext}`;
      finalFilename = baseFilename.replace(ext, `_${timestamp}${ext}`);
      targetPath = path.join(targetDir, finalFilename);
      
      console.log(`📝 Final filename: ${finalFilename}`);
      console.log(`📍 Target path: ${targetPath}`);
    }
    
    // Check if source file exists
    console.log(`🔍 Source file exists: ${fs.existsSync(file.path)}`);
    if (fs.existsSync(file.path)) {
      const stats = fs.statSync(file.path);
      console.log(`📊 Source file size: ${stats.size} bytes`);
      
      // Copy file
      fs.copyFileSync(file.path, targetPath);
      console.log(`✅ File copied successfully`);
      
      // Verify copy
      if (fs.existsSync(targetPath)) {
        const copyStats = fs.statSync(targetPath);
        console.log(`✅ Target file exists, size: ${copyStats.size} bytes`);
      } else {
        console.log(`❌ Target file does not exist after copy!`);
      }
    } else {
      console.log(`❌ Source file does not exist!`);
    }
    
    return { success: true, newFilename: finalFilename };
  } catch (error) {
    console.error(`❌ Copy failed:`, error);
    return { success: false, error: error.message };
  }
}

// Test with a real file
console.log('=== TESTING COPY FUNCTION ===\n');

// Create a test file
const testFile = {
  originalname: 'test_leader.jpg',
  path: path.join(__dirname, 'test_source.jpg')
};

// Create the test source file
fs.writeFileSync(testFile.path, 'Test image data');
console.log(`✅ Created test source file: ${testFile.path}`);

// Test copying for saif-raza-image
console.log('\n--- Testing saif-raza-image category ---');
const result = copyFileToPublic(testFile, 'saif-raza-image', 'Saif Raza - MD');

// Clean up
fs.unlinkSync(testFile.path);
console.log('\n✅ Test source file cleaned up');

// Check what files exist in leadership directory
const leadershipPath = path.join(__dirname, '..', 'public', 'images', 'leadership');
console.log('\n=== FILES IN LEADERSHIP DIRECTORY ===');
if (fs.existsSync(leadershipPath)) {
  const files = fs.readdirSync(leadershipPath);
  files.forEach(file => {
    const stats = fs.statSync(path.join(leadershipPath, file));
    console.log(`- ${file} (${stats.size} bytes)`);
  });
}