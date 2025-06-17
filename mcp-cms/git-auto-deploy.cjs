const { exec } = require('child_process');
const util = require('util');
const path = require('path');
const fs = require('fs');
const execPromise = util.promisify(exec);

// Configuration
const FRONTEND_PATH = path.join(__dirname, '..');
const GIT_USER_NAME = 'MCP CMS Bot';
const GIT_USER_EMAIL = 'cms@mspil.in';

async function gitAutoDeploy(files = []) {
  console.log('🚀 Starting Git Auto Deploy...');
  
  try {
    // Change to frontend directory
    process.chdir(FRONTEND_PATH);
    console.log(`📁 Working directory: ${process.cwd()}`);
    
    // Configure git (only needed once)
    try {
      await execPromise(`git config user.name "${GIT_USER_NAME}"`);
      await execPromise(`git config user.email "${GIT_USER_EMAIL}"`);
    } catch (e) {
      console.log('Git config already set');
    }
    
    // Check git status
    const { stdout: status } = await execPromise('git status --porcelain');
    if (!status.trim() && files.length === 0) {
      console.log('✅ No changes to commit');
      return { success: true, message: 'No changes to deploy' };
    }
    
    // Pull latest changes first
    console.log('📥 Pulling latest changes...');
    try {
      await execPromise('git pull origin main --rebase');
    } catch (pullError) {
      console.log('⚠️ Pull failed, continuing anyway:', pullError.message);
    }
    
    // Add specific files or all changes
    if (files.length > 0) {
      // Add specific files
      for (const file of files) {
        console.log(`📎 Adding: ${file}`);
        await execPromise(`git add "${file}"`);
      }
    } else {
      // Add all changes in public directory
      console.log('📎 Adding all public directory changes...');
      await execPromise('git add public/');
    }
    
    // Create commit message
    const timestamp = new Date().toISOString();
    const fileCount = files.length || 'all';
    const commitMessage = `CMS Upload: ${fileCount} file(s) - ${timestamp}\\n\\nUploaded via CMS auto-deploy`;
    
    // Commit
    console.log('💾 Creating commit...');
    await execPromise(`git commit -m "${commitMessage}"`);
    
    // Push to GitHub
    console.log('🚀 Pushing to GitHub...');
    const { stdout: pushOutput } = await execPromise('git push origin main');
    console.log('✅ Push successful:', pushOutput);
    
    return {
      success: true,
      message: 'Files committed and pushed to GitHub. Deployment will start automatically.',
      details: {
        filesCommitted: files.length || 'all public files',
        timestamp,
        pushOutput
      }
    };
    
  } catch (error) {
    console.error('❌ Git auto-deploy failed:', error);
    return {
      success: false,
      message: 'Failed to deploy: ' + error.message,
      error: error.toString()
    };
  }
}

// Add this function to server.cjs upload endpoint
async function handleGitDeploy(uploadedFiles) {
  // Only deploy if environment variable is set
  if (process.env.ENABLE_AUTO_DEPLOY !== 'true') {
    console.log('Auto-deploy is disabled');
    return;
  }
  
  // Wait a bit for files to be written
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Get file paths
  const filePaths = uploadedFiles.map(file => {
    const category = file.category;
    const categoryPaths = {
      'media-images': 'public/images/media',
      'leadership-images': 'public/images/leadership',
      'saif-raza-image': 'public/images/leadership',
      'nawab-raza-image': 'public/images/leadership',
      // ... add other categories
    };
    
    const basePath = categoryPaths[category] || 'public/images/general';
    return path.join(basePath, file.filename);
  });
  
  // Deploy
  const result = await gitAutoDeploy(filePaths);
  console.log('🚀 Auto-deploy result:', result);
  return result;
}

module.exports = { gitAutoDeploy, handleGitDeploy };

// Test if running directly
if (require.main === module) {
  console.log('🧪 Testing git auto-deploy...');
  gitAutoDeploy([]).then(result => {
    console.log('Result:', result);
  });
}