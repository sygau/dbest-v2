const fs = require('fs');
const path = require('path');

// Configuration - same as combine-css.js
const sourceFiles = [
  // Main CSS files
  'public/sass/main.css',
  'public/sass/responsive.css',
  
  // Theme CSS files
  'public/sass/blue-theme.css',
  'public/sass/dark-theme.css',
  'public/sass/semi-dark.css',
  'public/sass/bordered-theme.css',
  
  // Additional CSS files
  'public/assets/css/bootstrap-extended.css',
];

const outputFile = 'styles/globals.css';

function migrateToNextJSCSS() {
  console.log('🚀 Starting CSS migration to Next.js globals.css...');
  
  // Create styles directory if it doesn't exist
  const stylesDir = path.dirname(outputFile);
  if (!fs.existsSync(stylesDir)) {
    fs.mkdirSync(stylesDir, { recursive: true });
    console.log(`✅ Created directory: ${stylesDir}`);
  }
  
  // Start with header comment
  let combinedCSS = `/* 
 * Next.js Global CSS - Migrated from combined.min.css
 * Source files (in order):
${sourceFiles.map((file, index) => ` * ${index + 1}. ${file}`).join('\n')}
 * 
 * Migration Date: ${new Date().toISOString()}
 * 
 * Note: Next.js will automatically minify this file during build.
 * Asset paths are preserved for Next.js public folder structure.
 */

/* Import Bootstrap Icons */
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css");

/* Import Bootstrap CSS */
@import url("https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css");

`;

  let totalSize = 0;
  let processedFiles = 0;
  
  // Process each source file
  for (const file of sourceFiles) {
    try {
      if (fs.existsSync(file)) {
        console.log(`📖 Reading: ${file}`);
        
        let content = fs.readFileSync(file, 'utf8');
        
        // Remove duplicate @import statements (we handle them at the top)
        content = content.replace(/@import url\([^)]+bootstrap-icons[^)]+\);/g, '');
        content = content.replace(/@import url\([^)]+bootstrap[^)]+\);/g, '');
        
        // Add file separator comment
        combinedCSS += `\n/* ===== ${file} ===== */\n`;
        combinedCSS += content;
        combinedCSS += '\n';
        
        const sizeKB = (Buffer.byteLength(content, 'utf8') / 1024).toFixed(2);
        totalSize += parseFloat(sizeKB);
        processedFiles++;
        
        console.log(`✅ Added ${file} (${sizeKB} KB)`);
      } else {
        console.warn(`⚠️  File not found: ${file}`);
      }
    } catch (err) {
      console.error(`❌ Error reading file ${file}: ${err.message}`);
    }
  }
  
  // Add footer comment
  combinedCSS += `\n/* 
 * Migration complete!
 * Total files processed: ${processedFiles}/${sourceFiles.length}
 * Total size: ${totalSize.toFixed(2)} KB
 * 
 * Next.js will automatically optimize and minify this file during build.
 */\n`;
  
  try {
    // Write the combined CSS
    fs.writeFileSync(outputFile, combinedCSS);
    
    console.log(`\n🎉 Migration completed successfully!`);
    console.log(`📁 Output file: ${outputFile}`);
    console.log(`📊 Total size: ${totalSize.toFixed(2)} KB`);
    console.log(`📈 Files processed: ${processedFiles}/${sourceFiles.length}`);
    
    // Create backup of original combined.min.css
    const backupDir = 'public/assets/css/backups';
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    const backupFile = path.join(backupDir, `combined.min.css.backup-migration-${Date.now()}`);
    if (fs.existsSync('public/assets/css/combined.min.css')) {
      fs.copyFileSync('public/assets/css/combined.min.css', backupFile);
      console.log(`💾 Backup created: ${backupFile}`);
    }
    
    console.log(`\n📋 Next steps:`);
    console.log(`1. Update _app.tsx to import './styles/globals.css'`);
    console.log(`2. Remove CSS links from _document.tsx`);
    console.log(`3. Test the site to ensure styles work correctly`);
    console.log(`4. Remove old CSS files if everything works`);
    
  } catch (err) {
    console.error(`❌ Error writing output file: ${err.message}`);
  }
}

// Run the migration
migrateToNextJSCSS(); 