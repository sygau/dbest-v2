#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Building for Cloudflare Pages (excluding API routes)...');

// Path to the API folder
const apiPath = path.join(__dirname, '..', 'pages', 'api');

try {
  // Backup API folder before removing it
  if (fs.existsSync(apiPath)) {
    console.log('🗑️  Removing API routes for Cloudflare build...');
    fs.removeSync(apiPath);
  }

  // Run the Cloudflare-specific build using @cloudflare/next-on-pages
  console.log('🔨 Running @cloudflare/next-on-pages build...');
  execSync('npx @cloudflare/next-on-pages@1', { stdio: 'inherit' });

  // Restore API folder after build
  if (fs.existsSync(apiBackupPath)) {
    console.log('🔄 Restoring API routes...');
    fs.copySync(apiBackupPath, apiPath);
    fs.removeSync(apiBackupPath);
  }

  console.log('✅ Cloudflare build completed successfully!');
  console.log('📁 Build output: .vercel/output/static');
  console.log('⚠️  Note: API routes were excluded from this build but restored to source');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
