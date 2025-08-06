const fs = require('fs');
const path = require('path');

// CSS files to combine in order
const cssFiles = [
  'public/assets/css/bootstrap-extended.min.css',
  'public/sass/main.min.css',
  'public/sass/responsive.min.css',
  'public/sass/blue-theme.min.css',
  'public/sass/dark-theme.min.css',
  'public/sass/semi-dark.min.css',
  'public/sass/bordered-theme.min.css'
];

// Read and combine all CSS files
let combinedCSS = '';
cssFiles.forEach(file => {
  try {
    const filePath = path.join(__dirname, '..', file);
    const content = fs.readFileSync(filePath, 'utf8');
    combinedCSS += `/* ${file} */\n${content}\n\n`;
    console.log(`✅ Added: ${file} (${(content.length / 1024).toFixed(1)}KB)`);
  } catch (error) {
    console.error(`❌ Failed to read: ${file}`, error.message);
  }
});

// Write combined file
const outputPath = path.join(__dirname, '..', 'public', 'assets', 'css', 'combined.min.css');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, combinedCSS);

console.log(`\n🎉 Combined CSS created: ${outputPath}`);
console.log(`📦 Total size: ${(combinedCSS.length / 1024).toFixed(1)}KB`);
console.log(`🚀 Reduced from 7 requests to 1 request`);
