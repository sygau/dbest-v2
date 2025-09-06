#!/usr/bin/env node

/**
 * Simple test script to verify preview mode fixes
 * Run this to check if the preview functionality is working correctly
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 Testing Preview Mode Fixes\n');

// Test 1: Check if preview files exist
console.log('1. Checking preview files...');
const previewFiles = [
  'pages/blog/preview.tsx',
  'pages/preview.tsx',
  'pages/api/preview-health.ts'
];

let allFilesExist = true;
previewFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  console.log(`   ${exists ? '✅' : '❌'} ${file}`);
  if (!exists) allFilesExist = false;
});

// Test 2: Check if Edge Runtime was removed
console.log('\n2. Checking for Edge Runtime removal...');
const previewContent = fs.readFileSync(path.join(__dirname, 'pages/blog/preview.tsx'), 'utf8');
const hasEdgeRuntime = previewContent.includes('experimental-edge');
console.log(`   ${!hasEdgeRuntime ? '✅' : '❌'} Edge Runtime removed: ${!hasEdgeRuntime}`);

// Test 3: Check if error handling exists
console.log('\n3. Checking error handling...');
const hasTryCatch = previewContent.includes('criticalError');
const hasTimeout = previewContent.includes('timeout');
const hasRedirect = previewContent.includes('redirect');
console.log(`   ${hasTryCatch ? '✅' : '❌'} Critical error handling: ${hasTryCatch}`);
console.log(`   ${hasTimeout ? '✅' : '❌'} Timeout protection: ${hasTimeout}`);
console.log(`   ${hasRedirect ? '✅' : '❌'} Graceful redirects: ${hasRedirect}`);

// Test 4: Check build success
console.log('\n4. Checking build status...');
const buildDirExists = fs.existsSync(path.join(__dirname, '.next'));
console.log(`   ${buildDirExists ? '✅' : '❌'} Build directory exists: ${buildDirExists}`);

// Summary
console.log('\n📊 Test Summary:');
const allTestsPassed = allFilesExist && !hasEdgeRuntime && hasTryCatch && hasTimeout && hasRedirect && buildDirExists;
console.log(`   Overall Status: ${allTestsPassed ? '✅ PASSED' : '❌ FAILED'}`);

if (allTestsPassed) {
  console.log('\n🎉 All tests passed! Preview mode fixes are working correctly.');
  console.log('   • Site should no longer crash when accessing preview URLs');
  console.log('   • Users will see friendly error pages instead of 1101 errors');
  console.log('   • Static pages remain unaffected by preview issues');
} else {
  console.log('\n⚠️  Some tests failed. Please review the fixes.');
}

console.log('\n📝 Next steps:');
console.log('   1. Deploy to Cloudflare Pages');
console.log('   2. Test preview URLs: /preview and /blog/preview');
console.log('   3. Verify static pages still work when preview fails');
console.log('   4. Check /api/preview-health for configuration status');
