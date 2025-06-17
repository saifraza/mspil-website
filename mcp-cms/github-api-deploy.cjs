const fs = require('fs');
const path = require('path');
// Use built-in fetch (Node.js 18+) instead of node-fetch

// GitHub API configuration
const GITHUB_OWNER = process.env.GITHUB_OWNER || 'saifraza';
const GITHUB_REPO = process.env.GITHUB_REPO || 'mspil-website';
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';

async function deployViaGitHubAPI(files) {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
  
  if (!GITHUB_TOKEN) {
    throw new Error('GITHUB_TOKEN environment variable not set');
  }

  console.log('🚀 Starting GitHub API deployment...');
  
  try {
    const results = [];
    
    for (const file of files) {
      console.log(`📎 Processing: ${file.path}`);
      
      // Read file content
      const filePath = path.join(__dirname, '..', file.path);
      let content;
      
      try {
        content = fs.readFileSync(filePath);
      } catch (error) {
        console.error(`❌ Failed to read file: ${filePath}`);
        continue;
      }
      
      // Convert to base64
      const contentBase64 = content.toString('base64');
      
      // Get current file SHA (if it exists)
      let sha;
      try {
        const getResponse = await fetch(
          `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${file.path}?ref=${GITHUB_BRANCH}`,
          {
            headers: {
              'Authorization': `token ${GITHUB_TOKEN}`,
              'Accept': 'application/vnd.github.v3+json'
            }
          }
        );
        
        if (getResponse.ok) {
          const data = await getResponse.json();
          sha = data.sha;
          console.log(`📝 File exists, SHA: ${sha}`);
        }
      } catch (e) {
        console.log('📄 File does not exist yet, will create new');
      }
      
      // Create or update file
      const apiUrl = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/${file.path}`;
      const body = {
        message: `CMS Upload: ${file.filename || path.basename(file.path)} - ${new Date().toISOString()}`,
        content: contentBase64,
        branch: GITHUB_BRANCH
      };
      
      if (sha) {
        body.sha = sha; // Required for updates
      }
      
      const response = await fetch(apiUrl, {
        method: 'PUT',
        headers: {
          'Authorization': `token ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github.v3+json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`✅ Deployed: ${file.path}`);
        results.push({
          path: file.path,
          success: true,
          url: result.content.html_url
        });
      } else {
        const error = await response.text();
        console.error(`❌ Failed to deploy ${file.path}:`, error);
        results.push({
          path: file.path,
          success: false,
          error: error
        });
      }
    }
    
    return {
      success: true,
      message: `Deployed ${results.filter(r => r.success).length} of ${files.length} files`,
      results: results
    };
    
  } catch (error) {
    console.error('❌ Deployment error:', error);
    return {
      success: false,
      message: error.message,
      error: error.toString()
    };
  }
}

// Helper to prepare file info after upload
function prepareFileForDeploy(uploadedFile) {
  const categoryPaths = {
    'media-images': 'public/images/media',
    'news-images': 'public/images/news_media',
    'timeline-images': 'public/images/about-us',
    'leadership-images': 'public/images/leadership',
    'saif-raza-image': 'public/images/leadership',
    'nawab-raza-image': 'public/images/leadership',
    'sahil-raza-image': 'public/images/leadership',
    'career-images': 'public/images/careers',
    'infrastructure-images': 'public/images/infrastructure',
    'sugar-data': 'public/documents/sugar-data',
    'ethanol-data': 'public/documents/ethanol-data',
    // Add more categories as needed
  };
  
  const basePath = categoryPaths[uploadedFile.category] || 'public/images/general';
  return {
    path: `${basePath}/${uploadedFile.filename}`,
    filename: uploadedFile.filename,
    category: uploadedFile.category
  };
}

module.exports = {
  deployViaGitHubAPI,
  pr