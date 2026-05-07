const fs = require('fs-extra');
const path = require('path');
const { generateCoreSitemap } = require('./generate-sitemap-core');
const { generateSubjectsSitemap } = require('./generate-sitemap-subjects');
const { generateBlogSitemap } = require('./generate-blog-sitemap');
async function generateAllSitemaps() {
  console.log('🚀 Starting full sitemap generation...');

  try {
    // 1. Generate individual sitemaps
    await generateCoreSitemap();
    await generateSubjectsSitemap();
    await generateBlogSitemap();
    
    // 2. Create sitemap index (sitemap.xml)
    const sitemapXmlPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
    const baseUrl = 'https://dse.best';
    const today = new Date().toISOString().split('T')[0];

    const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${baseUrl}/sitemap-core.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-subjects.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${baseUrl}/sitemap-blog.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;

    await fs.writeFile(sitemapXmlPath, indexXml);
    console.log(`✅ Sitemap index restored at ${sitemapXmlPath}`);

    // 3. Cleanup redundant files if they exist
    const filesToRemove = [
      path.join(__dirname, '..', 'public', 'sitemap-index.xml'),
      path.join(__dirname, '..', 'public', 'sitemap-main.xml')
    ];

    for (const file of filesToRemove) {
      if (await fs.pathExists(file)) {
        await fs.remove(file);
        console.log(`🗑️ Removed redundant file: ${path.basename(file)}`);
      }
    }

    console.log('✅ Sitemaps consolidated to: core, subjects, and blog.');

  } catch (error) {
    console.error('❌ Failed to generate sitemaps:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  generateAllSitemaps();
}

module.exports = { generateAllSitemaps };
