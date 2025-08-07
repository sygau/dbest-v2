const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  outputFile: 'public/assets/css/combined.min.css',
  cssFilesToCheck: [
    'public/sass/main.css',
    'public/sass/responsive.css',
    'public/sass/blue-theme.css',
    'public/sass/dark-theme.css',
    'public/sass/semi-dark.css',
    'public/sass/bordered-theme.css',
    'public/assets/css/bootstrap-extended.css',
    'public/assets/css/extra-icons.css'
  ]
};

// Function to test if CSS bundle contains content from all source files
function testCSSBundle() {
  console.log('Testing CSS bundle...');
  
  // Check if output file exists
  if (!fs.existsSync(config.outputFile)) {
    console.error(`Error: Output file ${config.outputFile} does not exist!`);
    process.exit(1);
  }
  
  // Read the output file
  const bundleContent = fs.readFileSync(config.outputFile, 'utf8');
  const bundleSizeKB = (Buffer.byteLength(bundleContent, 'utf8') / 1024).toFixed(2);
  console.log(`Bundle size: ${bundleSizeKB} KB`);
  
  // Check if bundle contains content from all source files
  let allFilesIncluded = true;
  
  for (const file of config.cssFilesToCheck) {
    try {
      if (fs.existsSync(file)) {
        const css = fs.readFileSync(file, 'utf8');
        
        // Extract a unique CSS selector or rule from the file
        // This is a simple approach - in a real test you might want to use a CSS parser
        const uniqueSelectors = extractUniqueSelectors(css, 3);
        
        // Check if at least one unique selector is in the bundle
        const isIncluded = uniqueSelectors.some(selector => bundleContent.includes(selector));
        
        if (isIncluded) {
          console.log(`✅ ${path.basename(file)} content detected in bundle`);
        } else {
          console.error(`❌ ${path.basename(file)} content NOT detected in bundle!`);
          allFilesIncluded = false;
        }
      } else {
        console.warn(`⚠️ Warning: Source file ${file} does not exist and was skipped`);
      }
    } catch (err) {
      console.error(`Error reading file ${file}:`, err);
      allFilesIncluded = false;
    }
  }
  
  // Check for integrated files that should be in main.css
  console.log('\nChecking for styles integrated into main.css:');
  
  // Pace loader styles
  if (bundleContent.includes('.pace-inactive') || bundleContent.includes('.pace .pace-progress')) {
    console.log('✅ Pace loader styles detected in bundle');
  } else {
    console.warn('⚠️ Warning: Pace loader styles may be missing from the bundle');
  }
  
  // Countdown styles
  if (bundleContent.includes('.countdown-card') || bundleContent.includes('.countdown-canvas-container')) {
    console.log('✅ Countdown styles detected in bundle');
  } else {
    console.warn('⚠️ Warning: Countdown styles may be missing from the bundle');
  }
  
  if (allFilesIncluded) {
    console.log('\n✅ All CSS files successfully included in the bundle!');
    return true;
  } else {
    console.error('\n❌ Some CSS files may be missing from the bundle!');
    return false;
  }
}

// Helper function to extract some unique CSS selectors from a file
function extractUniqueSelectors(css, count = 3) {
  // This is a very simple approach - just looking for some class or ID selectors
  // In a real test, you'd want to use a proper CSS parser
  const selectorRegex = /[.#][a-zA-Z0-9_-]+\s*{/g;
  const matches = css.match(selectorRegex) || [];
  
  // Get a few unique selectors (trimming the trailing '{')
  return matches
    .map(match => match.trim().replace('{', '').trim())
    .filter((value, index, self) => self.indexOf(value) === index)
    .slice(0, count);
}

// Run the test
const success = testCSSBundle();
if (!success) {
  process.exit(1);
} 