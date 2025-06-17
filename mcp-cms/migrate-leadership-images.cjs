const fs = require('fs');
const path = require('path');

// Path to published-content.json
const contentPath = path.join(__dirname, 'published-content.json');

// Leadership images to add
const leadershipImages = [
  {
    id: Date.now(),
    filename: 'nawab_raza.png',
    originalFilename: 'nawab_raza.png',
    url: '/images/leadership/nawab_raza.png',
    mimeType: 'image/png',
    size: 0, // Will be updated if file exists
    category: 'nawab-raza-image',
    comment: 'Nawab Raza - Founder & Chairman',
    summary: 'Portrait of Nawab Raza, Founder and Chairman of MS PIL',
    uploadedBy: 'system',
    uploadedAt: new Date().toISOString()
  },
  {
    id: Date.now() + 1,
    filename: 'nawab_raza_chairman.jpg',
    originalFilename: 'nawab_raza_chairman.jpg',
    url: '/images/leadership/nawab_raza_chairman.jpg',
    mimeType: 'image/jpeg',
    size: 0,
    category: 'saif-raza-image',
    comment: 'Saif Raza - Managing Director',
    summary: 'Portrait of Saif Raza, Managing Director of MS PIL',
    uploadedBy: 'system',
    uploadedAt: new Date().toISOString()
  },
  {
    id: Date.now() + 2,
    filename: 'nawab_raza_chairman.jpg',
    originalFilename: 'nawab_raza_chairman.jpg',
    url: '/images/leadership/nawab_raza_chairman.jpg',
    mimeType: 'image/jpeg',
    size: 0,
    category: 'sahil-raza-image',
    comment: 'Sahil Raza - Director Supply Chain',
    summary: 'Portrait of Sahil Raza, Director Supply Chain',
    uploadedBy: 'system',
    uploadedAt: new Date().toISOString()
  },
  {
    id: Date.now() + 3,
    filename: 'nawab_raza_chairman.jpg',
    originalFilename: 'nawab_raza_chairman.jpg',
    url: '/images/leadership/nawab_raza_chairman.jpg',
    mimeType: 'image/jpeg',
    size: 0,
    category: 'asad-raza-image',
    comment: 'Asad Raza - Director Operations',
    summary: 'Portrait of Asad Raza, Director Operations',
    uploadedBy: 'system',
    uploadedAt: new Date().toISOString()
  },
  {
    id: Date.now() + 4,
    filename: 'nawab_raza_chairman.jpg',
    originalFilename: 'nawab_raza_chairman.jpg',
    url: '/images/leadership/nawab_raza_chairman.jpg',
    mimeType: 'image/jpeg',
    size: 0,
    category: 'ahmed-raza-image',
    comment: 'Ahmed Raza - Director Finance & Strategy',
    summary: 'Portrait of Ahmed Raza, Director Finance & Strategy',
    uploadedBy: 'system',
    uploadedAt: new Date().toISOString()
  },
  {
    id: Date.now() + 5,
    filename: 'nawab_raza_chairman.jpg',
    originalFilename: 'nawab_raza_chairman.jpg',
    url: '/images/leadership/nawab_raza_chairman.jpg',
    mimeType: 'image/jpeg',
    size: 0,
    category: 'fatima-raza-image',
    comment: 'Fatima Raza - Director HR & Culture',
    summary: 'Portrait of Fatima Raza, Director HR & Culture',
    uploadedBy: 'system',
    uploadedAt: new Date().toISOString()
  },
  {
    id: Date.now() + 6,
    filename: 'nawab_raza_chairman.jpg',
    originalFilename: 'nawab_raza_chairman.jpg',
    url: '/images/leadership/nawab_raza_chairman.jpg',
    mimeType: 'image/jpeg',
    size: 0,
    category: 'leadership-images',
    comment: 'Generic leadership team member',
    summary: 'Portrait of leadership team member',
    uploadedBy: 'system',
    uploadedAt: new Date().toISOString()
  }
];

// Read existing content
let existingContent = [];
try {
  if (fs.existsSync(contentPath)) {
    const fileContent = fs.readFileSync(contentPath, 'utf-8');
    existingContent = JSON.parse(fileContent);
    console.log(`📖 Found ${existingContent.length} existing entries`);
  }
} catch (error) {
  console.error('❌ Error reading existing content:', error);
  existingContent = [];
}

// Check if leadership images already exist
const existingCategories = new Set(existingContent.map(item => item.category));
const leadershipCategories = new Set(leadershipImages.map(item => item.category));

console.log('🔍 Checking for existing leadership images...');
let alreadyExists = false;
for (const category of leadershipCategories) {
  if (existingCategories.has(category)) {
    console.log(`⚠️  Category ${category} already exists`);
    alreadyExists = true;
  }
}

if (alreadyExists) {
  console.log('⚠️  Some leadership images already exist. Skipping migration.');
  process.exit(0);
}

// Add leadership images to content
console.log('✅ Adding leadership images to CMS database...');
const updatedContent = [...existingContent, ...leadershipImages];

// Write updated content
try {
  fs.writeFileSync(contentPath, JSON.stringify(updatedContent, null, 2), 'utf-8');
  console.log(`✅ Successfully added ${leadershipImages.length} leadership images`);
  console.log(`📊 Total entries now: ${updatedContent.length}`);
  
  // List added categories
  console.log('\n📋 Added categories:');
  leadershipImages.forEach(img => {
    console.log(`  - ${img.category}: ${img.comment}`);
  });
  
} catch (error) {
  console.error('❌ Error writing content:', error);
  process.exit(1);
}

console.log('\n✅ Migration complete!');