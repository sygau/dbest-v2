const fs = require('fs');
const path = require('path');

// Parse command line arguments
function parseArguments() {
  const args = process.argv.slice(2);
  const forceUpdate = [];
  
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--force-update' && args[i + 1]) {
      forceUpdate.push(...args[i + 1].split(','));
      i++; // Skip the next argument since we used it
    } else if (args[i].startsWith('--force-update=')) {
      forceUpdate.push(...args[i].split('=')[1].split(','));
    }
  }
  
  return { forceUpdate };
}

// List of all subjects with their directory names
const subjects = [
  'math', 'english', 'physics', 'biology', 'chemistry', 'chinese',
  'bafs', 'chinese-history', 'economics', 'history', 'geography',
  'm1', 'm2', 'ict', 'ths'
];

// Core subjects (highest priority)
const coreSubjects = ['math', 'english', 'chinese'];

// Other subjects (high priority)
const otherSubjects = ['physics', 'biology', 'chemistry', 'bafs', 'chinese-history', 'economics', 'history', 'geography', 'm1', 'm2', 'ict', 'ths'];

// Info pages
const infoPages = [
  { path: '/about', priority: '0.5', changefreq: 'monthly' },
  { path: '/contact', priority: '0.4', changefreq: 'monthly' },
  { path: '/disclaimer', priority: '0.3', changefreq: 'yearly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/countdown', priority: '0.8', changefreq: 'daily' },
  { path: '/resources', priority: '0.7', changefreq: 'daily' }
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

// Function to read existing sitemap and extract URL data
function readExistingSitemap() {
  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  
  try {
    const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
    console.log('✅ Successfully read existing sitemap.xml');
    
    // Extract existing URLs and their lastmod dates
    const existingUrls = new Map();
    const urlMatches = sitemapContent.match(/<url>[\s\S]*?<\/url>/g);
    
    if (urlMatches) {
      urlMatches.forEach(urlBlock => {
        const locMatch = urlBlock.match(/<loc>(.*?)<\/loc>/);
        const lastmodMatch = urlBlock.match(/<lastmod>(.*?)<\/lastmod>/);
        
        if (locMatch) {
          const url = locMatch[1];
          const lastmod = lastmodMatch ? lastmodMatch[1] : new Date().toISOString().split('T')[0];
          existingUrls.set(url, lastmod);
        }
      });
    }
    
    console.log(`📋 Found ${existingUrls.size} existing URLs with lastmod dates`);
    return existingUrls;
  } catch (error) {
    console.log(`⚠️  Could not read existing sitemap: ${error.message}`);
    console.log('📝 Creating new sitemap from scratch...');
    return new Map();
  }
}

// Function to get lastmod date for a URL
function getLastmodDate(url, existingUrls, forceUpdate = false, forceUpdateUrls = []) {
  const today = new Date().toISOString().split('T')[0];
  
  // Check if this URL should be force updated
  const shouldForceUpdate = forceUpdateUrls.some(forceUrl => {
    // Handle different URL formats
    if (forceUrl.startsWith('/')) {
      return url.endsWith(forceUrl);
    } else {
      return url.includes(forceUrl);
    }
  });
  
  if (forceUpdate || shouldForceUpdate) {
    return today;
  }
  
  // For year slug pages, always use today's date since they were just created
  if (url.match(/\/\d{4}$/)) {
    return today;
  }
  
  // For new URLs, use today's date
  if (!existingUrls.has(url)) {
    return today;
  }
  
  // For existing URLs, preserve the original lastmod date
  return existingUrls.get(url);
}

// Function to generate structured sitemap
function generateStructuredSitemap(existingUrls, forceUpdateUrls) {
  const baseUrl = 'https://dse.best';
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  
  <!-- Main Domain - Highest Priority -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${getLastmodDate(`${baseUrl}/`, existingUrls, false, forceUpdateUrls)}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  
  <!-- Core DSE Subject Pages - High Priority -->
`;

  // Add core subjects
  coreSubjects.forEach(subject => {
    const url = `${baseUrl}/${subject}`;
    xml += `  <url>
    <loc>${url}</loc>
    <lastmod>${getLastmodDate(url, existingUrls, false, forceUpdateUrls)}</lastmod>
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
    const url = `${baseUrl}/${subject}`;
    xml += `  <url>
    <loc>${url}</loc>
    <lastmod>${getLastmodDate(url, existingUrls, false, forceUpdateUrls)}</lastmod>
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
    const url = `${baseUrl}${page.path}`;
    xml += `  <url>
    <loc>${url}</loc>
    <lastmod>${getLastmodDate(url, existingUrls, false, forceUpdateUrls)}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  xml += `  
  <!-- Blog Index -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${getLastmodDate(`${baseUrl}/blog`, existingUrls, false, forceUpdateUrls)}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
  
  <!-- Blog Posts -->
`;

  // Add blog posts
  blogPosts.forEach(post => {
    const url = `${baseUrl}${post.path}`;
    xml += `  <url>
    <loc>${url}</loc>
    <lastmod>${getLastmodDate(url, existingUrls, false, forceUpdateUrls)}</lastmod>
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
        const url = `${baseUrl}/${subject}/${year}`;
        const isNewUrl = !existingUrls.has(url);
        const isYearSlug = url.match(/\/\d{4}$/);
        const isForceUpdated = forceUpdateUrls.some(forceUrl => url.includes(forceUrl));
        
        xml += `  <url>
    <loc>${url}</loc>
    <lastmod>${getLastmodDate(url, existingUrls, false, forceUpdateUrls)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
        
        if (isNewUrl) {
          console.log(`  ✅ Added (NEW): ${url}`);
        } else if (isForceUpdated) {
          console.log(`  🔄 Force Updated: ${url} (lastmod: ${getLastmodDate(url, existingUrls, false, forceUpdateUrls)})`);
        } else if (isYearSlug) {
          console.log(`  📅 Updated: ${url} (lastmod: ${getLastmodDate(url, existingUrls, false, forceUpdateUrls)})`);
        } else {
          console.log(`  🔄 Preserved: ${url} (lastmod: ${existingUrls.get(url)})`);
        }
      });
    } else {
      console.log(`❌ Year slug page missing: pages/${subject}/[year].tsx`);
    }
  });

  xml += `</urlset>`;

  return xml;
}

// Main execution
const { forceUpdate } = parseArguments();

if (forceUpdate.length > 0) {
  console.log(`🔧 Force update mode enabled for: ${forceUpdate.join(', ')}`);
}

console.log('🔍 Reading existing sitemap and generating structured sitemap...\n');

const existingUrls = readExistingSitemap();
const sitemapXML = generateStructuredSitemap(existingUrls, forceUpdate);

// Write sitemap to public directory
const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
fs.writeFileSync(sitemapPath, sitemapXML);

// Count total URLs and analyze changes
const urlCount = (sitemapXML.match(/<loc>/g) || []).length;
const newUrlCount = urlCount - existingUrls.size;

console.log(`\n✅ Generated structured sitemap with ${urlCount} URLs`);
console.log(`📄 Sitemap saved to: ${sitemapPath}`);
console.log(`📊 URL Analysis:`);
console.log(`  📋 Total URLs: ${urlCount}`);
console.log(`  🔄 Preserved URLs: ${existingUrls.size}`);
console.log(`  ✅ New URLs: ${newUrlCount}`);

if (forceUpdate.length > 0) {
  console.log(`  🔧 Force Updated URLs: ${forceUpdate.length}`);
}

console.log('\n📋 Sitemap Structure:');
console.log('  🏠 Main domain (priority: 1.0)');
console.log('  📚 Core subjects: Math, English, Chinese (priority: 0.9)');
console.log('  📖 Other subjects: Physics, Biology, Chemistry, etc. (priority: 0.8)');
console.log('  ℹ️  Info pages: About, Contact, Disclaimer, etc. (priority: 0.3-0.8)');
console.log('  📝 Blog index (priority: 0.8)');
console.log('  📄 Blog posts (priority: 0.6)');
console.log('  📅 Year slug pages for all subjects (priority: 0.7)');

if (newUrlCount > 0) {
  console.log(`\n🎉 Added ${newUrlCount} new URLs with today's date as lastmod`);
} else {
  console.log('\n🔄 All URLs preserved with their original lastmod dates');
}
console.log('📅 Year slug pages always use today\'s date (recently created)');

if (forceUpdate.length > 0) {
  console.log(`\n🔧 Force updated ${forceUpdate.length} URLs to today's date`);
} 