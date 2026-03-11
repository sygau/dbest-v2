const { getAllPosts } = require('../lib/contentful');
const fs = require('fs-extra');
const path = require('path');

async function generateBlogSitemap() {
  console.log('🌐 Generating blog sitemap...');
  
  try {
    const posts = await getAllPosts();
    const baseUrl = 'https://dse.best';
    
    // Filter indexable posts
    const indexablePosts = posts.filter(post => post && post.indexPageVis);
    
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <!-- Blog Index -->
  <url>
    <loc>${baseUrl}/blog</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.8</priority>
  </url>
`;

    // Add each blog post
    for (const post of indexablePosts) {
      if (!post.slug) continue;
      
      const lastmod = post.updatedAt 
        ? new Date(post.updatedAt).toISOString().split('T')[0] 
        : new Date().toISOString().split('T')[0];
        
      xml += `  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
    }

    xml += `</urlset>`;

    const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap-blog.xml');
    await fs.writeFile(sitemapPath, xml);
    
    console.log(`✅ Blog sitemap generated with ${indexablePosts.length} posts at ${sitemapPath}`);

  } catch (error) {
    console.error('❌ Blog sitemap generation failed:', error);
  }
}

if (require.main === module) {
  generateBlogSitemap();
}

module.exports = { generateBlogSitemap };
