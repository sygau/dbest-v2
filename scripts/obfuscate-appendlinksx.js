#!/usr/bin/env node

/**
 * Obfuscation script for appendLinksX.js
 * This script obfuscates the secure appendLinksX.js file for production use
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const sourceFile = 'public/assets/js/appendLinksX_devmt.js';
const outputFile = 'public/assets/js/appendLinksX.js';

console.log('🔒 Obfuscating appendLinksX.js for security...');

try {
  // Check if source file exists
  if (!fs.existsSync(sourceFile)) {
    console.error('❌ Source file not found:', sourceFile);
    process.exit(1);
  }

  // Run obfuscation
  const obfuscateCommand = `npx javascript-obfuscator ${sourceFile} --output ${outputFile} --compact true --control-flow-flattening true --dead-code-injection true --debug-protection true --disable-console-output true --identifier-names-generator hexadecimal --log false --numbers-to-expressions true --rename-globals false --self-defending true --split-strings true --string-array true --string-array-calls-transform true --string-array-encoding base64 --string-array-index-shift true --string-array-rotate true --transform-object-keys true`;

  console.log('🔄 Running obfuscation...');
  execSync(obfuscateCommand, { stdio: 'inherit' });

  // Verify output file was created
  if (fs.existsSync(outputFile)) {
    const stats = fs.statSync(outputFile);
    console.log('✅ Obfuscation completed successfully!');
    console.log(`📁 Output file: ${outputFile}`);
    console.log(`📊 File size: ${(stats.size / 1024).toFixed(2)} KB`);
    
    // Show first few lines of obfuscated code
    const content = fs.readFileSync(outputFile, 'utf8');
    const lines = content.split('\n');
    console.log('🔍 Obfuscated code preview:');
    console.log(lines.slice(0, 3).join('\n'));
    console.log('...');
  } else {
    console.error('❌ Obfuscation failed - output file not created');
    process.exit(1);
  }

} catch (error) {
  console.error('❌ Obfuscation failed:', error.message);
  process.exit(1);
}
