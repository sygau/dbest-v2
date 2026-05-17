const fs = require('fs-extra');
const path = require('path');

async function generateCoreSitemap() {
  console.log('🌐 Generating core sitemap...');
  const baseUrl = 'https://dse.best';
  const today = new Date().toISOString().split('T')[0];

  const corePages = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/about', priority: '0.5', changefreq: 'monthly' },
    { path: '/disclaimer', priority: '0.3', changefreq: 'yearly' },
    { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
    { path: '/countdown', priority: '0.8', changefreq: 'daily' },
    { path: '/countdown/2028', priority: '0.6', changefreq: 'monthly' },
    { path: '/countdown/2029', priority: '0.5', changefreq: 'monthly' },
    { path: '/pomodoro', priority: '0.7', changefreq: 'monthly' },
    { path: '/timer', priority: '0.6', changefreq: 'monthly' },
    { path: '/translator', priority: '0.6', changefreq: 'monthly' },
    { path: '/eng-writing', priority: '0.6', changefreq: 'monthly' },
    { path: '/individual-response', priority: '0.7', changefreq: 'monthly' },
    { path: '/cutoff', priority: '0.8', changefreq: 'weekly' },
    { path: '/chat', priority: '0.6', changefreq: 'daily' },
    { path: '/12p', priority: '0.8', changefreq: 'weekly' },
    { path: '/12p/study', priority: '0.7', changefreq: 'weekly' },
    { path: '/12p/quiz', priority: '0.7', changefreq: 'weekly' },
    { path: '/jupas', priority: '0.9', changefreq: 'weekly' },
    { path: '/jupas/calculator', priority: '1.0', changefreq: 'weekly' },
    { path: '/jupas/bookmarks', priority: '0.6', changefreq: 'monthly' },
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  for (const page of corePages) {
    xml += `  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  }

  xml += `</urlset>`;

  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap-core.xml');
  await fs.writeFile(sitemapPath, xml);
  console.log(`✅ Core sitemap generated at ${sitemapPath}`);
}

if (require.main === module) {
  generateCoreSitemap();
}

module.exports = { generateCoreSitemap };
