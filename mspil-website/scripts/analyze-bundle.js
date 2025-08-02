#!/usr/bin/env node

/**
 * Bundle Analysis Script for MSPIL Website
 * Identifies unused dependencies and optimization opportunities
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if a dependency is actually used in the codebase
function isDependencyUsed(packageName, sourceDir = path.join(__dirname, '..', 'src')) {
  try {
    const files = getAllFiles(sourceDir, ['.js', '.jsx', '.ts', '.tsx']);
    
    for (const file of files) {
      const content = fs.readFileSync(file, 'utf8');
      
      // Check for various import patterns
      const importPatterns = [
        new RegExp(`import.*from\\s+['"\`]${packageName}['"\`]`, 'g'),
        new RegExp(`import\\s+['"\`]${packageName}['"\`]`, 'g'),
        new RegExp(`require\\s*\\(\\s*['"\`]${packageName}['"\`]\\s*\\)`, 'g'),
        new RegExp(`from\\s+['"\`]${packageName}/`, 'g'),
      ];
      
      if (importPatterns.some(pattern => pattern.test(content))) {
        return true;
      }
    }
    
    return false;
  } catch (error) {
    console.warn(`Error checking dependency ${packageName}:`, error.message);
    return true; // Assume used to be safe
  }
}

// Get all files recursively
function getAllFiles(dir, extensions, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
      getAllFiles(filePath, extensions, fileList);
    } else {
      const ext = path.extname(file);
      if (extensions.includes(ext)) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

// Analyze package.json dependencies
function analyzeDependencies() {
  const packageJsonPath = path.join(__dirname, '..', 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };
  
  console.log('🔍 Analyzing dependencies...\n');
  
  const results = {
    unused: [],
    used: [],
    questionable: []
  };
  
  for (const [packageName] of Object.entries(dependencies)) {
    const isUsed = isDependencyUsed(packageName);
    
    if (!isUsed) {
      results.unused.push(packageName);
    } else {
      results.used.push(packageName);
    }
  }
  
  // Check for questionable dependencies
  const questionablePackages = [
    'socket.io-client', // Not needed for static site
    'web-vitals', // Can be replaced with lighter alternative
    '@emotion/is-prop-valid', // Check if actually needed
  ];
  
  questionablePackages.forEach(pkg => {
    if (dependencies[pkg]) {
      results.questionable.push(pkg);
    }
  });
  
  return results;
}

// Analyze bundle composition
function analyzeBundleSize() {
  console.log('📊 Bundle size analysis:\n');
  
  try {
    // Run build and capture output
    const buildOutput = execSync('npm run build', { encoding: 'utf8' });
    
    // Parse build output for file sizes
    const lines = buildOutput.split('\n');
    const bundleFiles = lines
      .filter(line => line.includes('dist/js/') && line.includes('kB'))
      .map(line => {
        const match = line.match(/dist\/js\/(.+?)\s+(.+?)\s+│\s+gzip:\s+(.+)/);
        if (match) {
          return {
            filename: match[1],
            size: match[2].trim(),
            gzipped: match[3].trim()
          };
        }
        return null;
      })
      .filter(Boolean);
    
    // Sort by size (parse KB/MB values)
    bundleFiles.sort((a, b) => {
      const parseSize = (size) => {
        const match = size.match(/(\d+\.?\d*)\s*(kB|MB)/);
        if (!match) return 0;
        const value = parseFloat(match[1]);
        const unit = match[2];
        return unit === 'MB' ? value * 1024 : value;
      };
      
      return parseSize(b.size) - parseSize(a.size);
    });
    
    console.log('Largest bundles:');
    bundleFiles.slice(0, 10).forEach((file, index) => {
      console.log(`${index + 1}. ${file.filename}`);
      console.log(`   Size: ${file.size} (${file.gzipped} gzipped)`);
    });
    
    return bundleFiles;
  } catch (error) {
    console.error('❌ Failed to analyze bundle size:', error.message);
    return [];
  }
}

// Generate optimization recommendations
function generateRecommendations(depAnalysis, bundleAnalysis) {
  console.log('\n🚀 Optimization Recommendations:\n');
  
  // Unused dependencies
  if (depAnalysis.unused.length > 0) {
    console.log('📦 Remove unused dependencies:');
    depAnalysis.unused.forEach(pkg => {
      console.log(`   - ${pkg}`);
    });
    console.log(`   Command: npm uninstall ${depAnalysis.unused.join(' ')}\n`);
  }
  
  // Questionable dependencies
  if (depAnalysis.questionable.length > 0) {
    console.log('❓ Review these dependencies:');
    depAnalysis.questionable.forEach(pkg => {
      console.log(`   - ${pkg} (consider alternatives or removal)`);
    });
    console.log('');
  }
  
  // Bundle optimizations
  console.log('📦 Bundle optimizations:');
  console.log('   1. Implement tree shaking for unused exports');
  console.log('   2. Use dynamic imports for heavy components');
  console.log('   3. Split vendor chunks more granularly');
  console.log('   4. Consider lighter alternatives for heavy packages');
  
  // Specific recommendations based on current packages
  const recommendations = [
    {
      package: 'framer-motion',
      current: '114KB',
      recommendation: 'Replace complex animations with CSS animations',
      impact: 'High'
    },
    {
      package: 'recharts',
      current: '419KB',
      recommendation: 'Lazy load charts only when needed',
      impact: 'Very High'
    },
    {
      package: '@radix-ui/*',
      current: '84KB',
      recommendation: 'Import specific components only',
      impact: 'Medium'
    }
  ];
  
  console.log('\n💡 Specific package recommendations:');
  recommendations.forEach(rec => {
    console.log(`   ${rec.package} (${rec.current})`);
    console.log(`   → ${rec.recommendation}`);
    console.log(`   Impact: ${rec.impact}\n`);
  });
}

// Main analysis function
function runAnalysis() {
  console.log('🔬 MSPIL Website Bundle Analysis\n');
  console.log('===============================\n');
  
  // Analyze dependencies
  const depAnalysis = analyzeDependencies();
  
  console.log('📊 Dependency Analysis Results:\n');
  console.log(`✅ Used dependencies: ${depAnalysis.used.length}`);
  console.log(`❌ Unused dependencies: ${depAnalysis.unused.length}`);
  console.log(`❓ Questionable dependencies: ${depAnalysis.questionable.length}\n`);
  
  if (depAnalysis.unused.length > 0) {
    console.log('Unused dependencies:');
    depAnalysis.unused.forEach(pkg => console.log(`   - ${pkg}`));
    console.log('');
  }
  
  // Analyze bundle size
  const bundleAnalysis = analyzeBundleSize();
  
  // Generate recommendations
  generateRecommendations(depAnalysis, bundleAnalysis);
}

// Run analysis
runAnalysis();