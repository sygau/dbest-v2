#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Building for Cloudflare Pages (excluding API routes)...');

// Path to the API folder
const apiPath = path.join(__dirname, '..', 'pages', 'api');

try {
  // Delete API folder completely for Cloudflare builds
  if (fs.existsSync(apiPath)) {
    console.log('🗑️  Removing API routes for Cloudflare build...');
    fs.removeSync(apiPath);
  }

  // Run the build
  console.log('🔨 Running Next.js build...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('✅ Cloudflare build completed successfully!');
  console.log('📁 Build output: .next/');
  console.log('⚠️  Note: API routes were excluded from this build');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}
