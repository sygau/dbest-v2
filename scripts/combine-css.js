const fs = require('fs');
const path = require('path');
const CleanCSS = require('clean-css');

// Configuration
const config = {
  // Source files to combine (in order of inclusion)
  sourceFiles: [
    // Main CSS files
    'public/sass/main.css',
    'public/sass/responsive.css',
    
    // Theme CSS files
    'public/sass/blue-theme.css',
    'public/sass/dark-theme.css',
    'public/sass/semi-dark.css',
    'public/sass/bordered-theme.css',
    
    // Additional CSS files (if needed)
    'public/assets/css/bootstrap-extended.css',
  ],
  
  // Output file
  outputFile: 'public/assets/css/combined.min.css',
  
  // Backup original file if it exists
  backupOriginal: true,
  
  // Clean CSS options for minification - using simpler options to avoid errors
  cleanCssOptions: {
    level: {
      1: {
        all: true,
        optimizeFont: false, // Disable font optimization which causes errors
        optimizeFontWeight: false // Disable font weight optimization
      },
      2: {
        all: false // Disable level 2 optimizations which can cause errors
      }
    }
  }
};

// Function to combine and minify CSS files
function combineAndMinifyCSS() {
  console.log('Starting CSS combination and minification...');
  
  // Create backup of existing file if needed
  if (config.backupOriginal && fs.existsSync(config.outputFile)) {
    // Create backup directory if it doesn't exist
    const backupDir = path.join(path.dirname(config.outputFile), 'backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }
    
    const backupFile = path.join(backupDir, `combined.min.css.backup-${Date.now()}`);
    fs.copyFileSync(config.outputFile, backupFile);
    console.log(`Created backup at ${backupFile}`);
    
    // Clean up old backups (keep only latest 5)
    try {
      const backupFiles = fs.readdirSync(backupDir)
        .filter(file => file.startsWith('combined.min.css.backup-'))
        .map(file => ({
          name: file,
          path: path.join(backupDir, file),
          time: fs.statSync(path.join(backupDir, file)).mtime
        }))
        .sort((a, b) => b.time - a.time);
      
      if (backupFiles.length > 5) {
        const filesToDelete = backupFiles.slice(5);
        filesToDelete.forEach(file => {
          fs.unlinkSync(file.path);
          console.log(`Cleaned up old backup: ${file.name}`);
        });
      }
    } catch (cleanupError) {
      console.warn(`Warning: Could not clean up old backups: ${cleanupError.message}`);
    }
  }
  
  // Read and combine all source files
  let combinedCSS = '';
  let totalSize = 0;
  
  for (const file of config.sourceFiles) {
    try {
      if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        combinedCSS += content;
        
        const sizeKB = (Buffer.byteLength(content, 'utf8') / 1024).toFixed(2);
        totalSize += parseFloat(sizeKB);
        console.log(`Added ${file} (${sizeKB} KB)`);
      } else {
        console.warn(`Warning: File not found: ${file}`);
      }
    } catch (err) {
      console.error(`Error reading file ${file}: ${err.message}`);
    }
  }
  
  console.log(`\nTotal size before minification: ${totalSize.toFixed(2)} KB`);
  
  try {
    // Minify the combined CSS
    const minifier = new CleanCSS(config.cleanCssOptions);
    const minified = minifier.minify(combinedCSS);
    
    if (minified.errors.length > 0) {
      console.error('Minification errors:', minified.errors);
    }
    
    if (minified.warnings.length > 0) {
      console.warn('Minification warnings:', minified.warnings);
    }
    
    // Write the minified CSS to the output file
    fs.writeFileSync(config.outputFile, minified.styles);
    
    // Calculate compression stats
    const outputSizeKB = (Buffer.byteLength(minified.styles, 'utf8') / 1024).toFixed(2);
    const compressionRatio = ((1 - (outputSizeKB / totalSize)) * 100).toFixed(2);
    
    console.log(`Output size after minification: ${outputSizeKB} KB`);
    console.log(`Compression ratio: ${compressionRatio}%`);
    console.log(`CSS successfully combined and minified to ${config.outputFile}`);
    
  } catch (err) {
    console.error(`Error during CSS processing: ${err}`);
    
    // Fallback: If minification fails, just combine the files without minification
    console.log('Falling back to simple concatenation without minification...');
    fs.writeFileSync(config.outputFile, combinedCSS);
    console.log(`CSS combined (without minification) to ${config.outputFile}`);
  }
}

// Run the function
combineAndMinifyCSS(); 