#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Building for Cloudflare Pages (excluding API routes)...');

// Create a temporary backup of the API folder
const apiPath = path.join(__dirname, '..', 'pages', 'api');
const apiBackupPath = path.join(__dirname, '..', 'pages', 'api-backup-temp');

try {
  // Backup API folder if it exists
  if (fs.existsSync(apiPath)) {
    console.log('📦 Backing up API routes...');
    fs.moveSync(apiPath, apiBackupPath);
  }

  // Run the build
  console.log('🔨 Running Next.js build...');
  execSync('npm run build', { stdio: 'inherit' });

  // Restore API folder after build
  if (fs.existsSync(apiBackupPath)) {
    console.log('🔄 Restoring API routes...');
    fs.moveSync(apiBackupPath, apiPath);
  }

  console.log('✅ Cloudflare build completed successfully!');
  console.log('📁 Build output: .next/');
  console.log('⚠️  Note: API routes were excluded from this build');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  
  // Restore API folder if build failed
  if (fs.existsSync(apiBackupPath)) {
    console.log('🔄 Restoring API routes after failed build...');
    fs.moveSync(apiBackupPath, apiPath);
  }
  
  process.exit(1);
}
