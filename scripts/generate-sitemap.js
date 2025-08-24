const fs = require('fs');
const path = require('path');

// List of all subjects with their directory names
const subjects = [
  'math', 'english', 'physics', 'biology', 'chemistry', 'chinese',
  'bafs', 'chinese-history', 'economics', 'history', 'geography',
  'm1', 'm2', 'ict'
];

// Core subjects (highest priority)
const coreSubjects = ['math', 'english', 'chinese'];

// Other subjects (high priority)
const otherSubjects = ['physics', 'biology', 'chemistry', 'bafs', 'chinese-history', 'economics', 'history', 'geography', 'm1', 'm2', 'ict'];

// Info pages
const infoPages = [
  { path: '/about', priority: '0.5', changefreq: 'monthly' },
  { path: '/contact', priority: '0.4', changefreq: 'monthly' },
  { path: '/disclaimer', priority: '0.3', changefreq: 'yearly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/countdown', priority: '0.8', changefreq: 'daily' }
];

// Blog posts (extracted from existing sitemap)
const blogPosts = [
  { path: '/blog/dse-chinese-paper-1', priority: '0.6', changefreq: 'monthly' },
  { path: '/blog/10-useful-ai-tools-for-study-enchantment', priority: '0.6', changefreq: 'monthly' }
];

// Function to extract years from a JSON config file
function extractYearsFromConfig(configPath) {
  try {
    const configData = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const years = new Set();
    
    Object.keys(configData).forEach(key => {
      // Extract 4-digit years from keys like "2012_ans", "2023_p1", etc.
      const yearMatch = key.match(/^(20\d{2})_/);
      if (yearMatch) {
        years.add(yearMatch[1]);
      }
    });
    
    return Array.from(years).sort();
  } catch (error) {
    console.log(`Warning: Could not read config for ${configPath}: ${error.message}`);
    return [];
  }
}

// Function to check if a year slug page exists
function checkYearPageExists(subject, year) {
  const pagePath = path.join(__dirname, '..', 'pages', subject, '[year].tsx');
  return fs.existsSync(pagePath);
}

// Function to generate structured sitemap
function generateStructuredSitemap() {
  const baseUrl = 'https://dse.best';
  const today = new Date().toISOString().split('T')[0];
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <!-- Main Domain - Highest Priority -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Core DSE Subject Pages - High Priority -->
`;

  // Add core subjects
  coreSubjects.forEach(subject => {
    xml += `  <url>
    <loc>${baseUrl}/${subject}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;
  });

  xml += `  
  <!-- Other DSE Subject Pages - High Priority -->
`;

  // Add other subjects
  otherSubjects.forEach(subject => {
    xml += `  <url>
    <loc>${baseUrl}/${subject}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
  });

  xml += `  
  <!-- Information Pages -->
`;

  // Add info pages
  infoPages.forEach(page => {
    xml += `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  xml += `  
  <!-- Blog Index -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Blog Posts -->
`;

  // Add blog posts
  blogPosts.forEach(post => {
    xml += `  <url>
    <loc>${baseUrl}${post.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${post.changefreq}</changefreq>
    <priority>${post.priority}</priority>
  </url>
`;
  });

  xml += `  
  <!-- Year-Specific Pages for All Subjects -->
`;

  // Add year slug pages for all subjects
  subjects.forEach(subject => {
    const configPath = path.join(__dirname, '..', 'public', 'config', `${subject}.json`);
    const years = extractYearsFromConfig(configPath);
    
    console.log(`\n${subject.toUpperCase()}:`);
    console.log(`Available years: ${years.join(', ')}`);
    
    if (checkYearPageExists(subject, '2023')) {
      console.log(`✅ Year slug page exists: pages/${subject}/[year].tsx`);
      
      years.forEach(year => {
        xml += `  <url>
    <loc>${baseUrl}/${subject}/${year}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
        console.log(`  ✅ Added: ${baseUrl}/${subject}/${year}`);
      });
    } else {
      console.log(`❌ Year slug page missing: pages/${subject}/[year].tsx`);
    }
  });

  xml += `</urlset>`;

  return xml;
}

// Main execution
console.log('🔍 Generating structured sitemap with proper hierarchy...\n');

const sitemapXML = generateStructuredSitemap();

// Write sitemap to public directory
const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapXML);

// Count total URLs
const urlCount = (sitemapXML.match(/<loc>/g) || []).length;

console.log(`\n✅ Generated structured sitemap with ${urlCount} URLs`);
console.log(`📄 Sitemap saved to: ${sitemapPath}`);
console.log('\n📋 Sitemap Structure:');
console.log('  🏠 Main domain (priority: 1.0)');
console.log('  📚 Core subjects: Math, English, Chinese (priority: 0.9)');
console.log('  📖 Other subjects: Physics, Biology, Chemistry, etc. (priority: 0.8)');
console.log('  ℹ️  Info pages: About, Contact, Disclaimer, etc. (priority: 0.3-0.8)');
console.log('  📝 Blog index (priority: 0.8)');
console.log('  📄 Blog posts (priority: 0.6)');
console.log('  📅 Year slug pages for all subjects (priority: 0.7)'); 