const fs = require('fs-extra');
const path = require('path');

const subjects = [
  'math', 'english', 'physics', 'biology', 'chemistry', 'chinese',
  'bafs', 'chinese-history', 'economics', 'history', 'geography',
  'm1', 'm2', 'ict', 'ths', 'citizen'
];

async function generateSubjectsSitemap() {
  console.log('🌐 Generating subjects sitemap...');
  const baseUrl = 'https://dse.best';
  const today = new Date().toISOString().split('T')[0];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  for (const subject of subjects) {
    // Subject main page
    xml += `  <url>
    <loc>${baseUrl}/${subject}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;

    // Year pages
    const configPath = path.join(__dirname, '..', 'public', 'config', `${subject}.json`);
    if (await fs.pathExists(configPath)) {
      try {
        const configData = await fs.readJson(configPath);
        const years = new Set();
        Object.keys(configData).forEach(key => {
          const yearMatch = key.match(/^(20\d{2})_/);
          if (yearMatch) years.add(yearMatch[1]);
        });

        for (const year of Array.from(years).sort()) {
          xml += `  <url>
    <loc>${baseUrl}/${subject}/${year}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
        }
      } catch (e) {
        console.warn(`Warning: Could not read config for ${subject}`);
      }
    }
    
    // Check for cutoff subject pages
    const cutoffPath = `${baseUrl}/cutoff/${subject}`;
    xml += `  <url>
    <loc>${cutoffPath}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
  }

  xml += `</urlset>`;

  const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap-subjects.xml');
  await fs.writeFile(sitemapPath, xml);
  console.log(`✅ Subjects sitemap generated at ${sitemapPath}`);
}

if (require.main === module) {
  generateSubjectsSitemap();
}

module.exports = { generateSubjectsSitemap };
