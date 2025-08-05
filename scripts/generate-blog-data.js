const { getAllPosts } = require('../lib/contentful');
const fs = require('fs-extra');
const path = require('path');

async function generateBlogData() {
  console.log('🔄 Generating blog data for static export...');
  
  try {
    // Fetch all posts from Contentful
    const posts = await getAllPosts();
    
    // Create data directory if it doesn't exist
    const dataDir = path.join(__dirname, '..', 'data');
    await fs.ensureDir(dataDir);
    
    // Generate blog index data
    const indexablePosts = posts
      .filter(post => post.index)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    await fs.writeJson(path.join(dataDir, 'blog-index.json'), indexablePosts, { spaces: 2 });
    console.log(`✅ Generated blog index with ${indexablePosts.length} posts`);
    
    // Generate individual post data files
    const postsDir = path.join(dataDir, 'posts');
    await fs.ensureDir(postsDir);
    
    for (const post of posts) {
      await fs.writeJson(path.join(postsDir, `${post.slug}.json`), post, { spaces: 2 });
    }
    console.log(`✅ Generated ${posts.length} individual post files`);
    
    // Generate posts manifest for static paths
    const slugs = posts.map(post => post.slug);
    await fs.writeJson(path.join(dataDir, 'post-slugs.json'), slugs, { spaces: 2 });
    console.log(`✅ Generated post slugs manifest`);
    
    console.log('🎉 Blog data generation completed successfully!');
    
  } catch (error) {
    console.error('❌ Error generating blog data:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  generateBlogData();
}

module.exports = { generateBlogData };
