const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

async function checkFileSizes() {
  console.log('Checking file sizes in Railway database...\n');
  
  const listRes = await fetch('https://automationservice-production-4565.up.railway.app/api/media/list?category=news-gallery');
  const files = await listRes.json();
  
  console.log('File sizes:');
  files.forEach(file => {
    const sizeMB = (parseInt(file.size) / 1024 / 1024).toFixed(2);
    const base64SizeMB = (sizeMB * 1.33).toFixed(2);
    console.log(`${file.originalName}: ${sizeMB} MB (base64: ~${base64SizeMB} MB)`);
  });
  
  const totalSize = files.reduce((sum, file) => sum + parseInt(file.size || 0), 0);
  const totalMB = (totalSize / 1024 / 1024).toFixed(2);
  const totalBase64MB = (totalMB * 1.33).toFixed(2);
  
  console.log(`\nTotal: ${totalMB} MB (base64: ~${totalBase64MB} MB)`);
}

checkFileSizes();