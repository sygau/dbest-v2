const { getAllPosts } = require('../lib/contentful');
const fs = require('fs-extra');
const path = require('path');

async function generateBlogData() {
  console.log('🔄 Generating blog data (Smart Diff Mode)...');
  
  try {
    const posts = await getAllPosts();
    const dataDir = path.join(__dirname, '..', 'data');
    const postsDir = path.join(dataDir, 'posts');
    await fs.ensureDir(postsDir);
    
    let existingPosts = {};
    try {
      const existingIndex = await fs.readJson(path.join(dataDir, 'blog-index.json'));
      existingPosts = Object.fromEntries(existingIndex.map(post => [post.slug, post]));
    } catch (e) {
      console.log('ℹ️  No existing blog index found, generating fresh');
    }
    
    const newPosts = [];
    const updatedPosts = [];
    let skippedCount = 0;
    const currentSlugs = new Set();
    
    for (const post of posts) {
      currentSlugs.add(post.slug);
      const existingPost = existingPosts[post.slug];
      const filePath = path.join(postsDir, `${post.slug}.json`);
      
      // MAGIC HAPPENS HERE: Only write if new or actually changed
      if (!existingPost) {
        newPosts.push(post);
        console.log(`🆕 New post: ${post.title}`);
        await fs.writeJson(filePath, post, { spaces: 2 });
      } else if (existingPost.updatedAt !== post.updatedAt) {
        updatedPosts.push(post);
        console.log(`🔄 Updated post: ${post.title}`);
        await fs.writeJson(filePath, post, { spaces: 2 });
      } else {
        // If the file exists and hasn't changed, DO NOTHING.
        // This preserves the file timestamp so Next.js build cache skips it.
        skippedCount++;
      }
    }
    
    const existingSlugs = Object.keys(existingPosts);
    const deletedSlugs = existingSlugs.filter(slug => !currentSlugs.has(slug));
    
    for (const slug of deletedSlugs) {
      const filePath = path.join(postsDir, `${slug}.json`);
      if (await fs.pathExists(filePath)) {
        await fs.remove(filePath);
        console.log(`🗑️  Deleted post file: ${slug}`);
      }
    }
    
    const indexablePosts = posts
      .filter(post => post.indexPageVis)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    await fs.writeJson(path.join(dataDir, 'blog-index.json'), indexablePosts, { spaces: 2 });
    
    const slugs = posts.map(post => post.slug);
    await fs.writeJson(path.join(dataDir, 'post-slugs.json'), slugs, { spaces: 2 });
    
    console.log('📊 Smart Sync Summary:');
    console.log(`   🆕 New: ${newPosts.length} | 🔄 Updated: ${updatedPosts.length} | ⏭️ Skipped: ${skippedCount} | 🗑️ Deleted: ${deletedSlugs.length}`);
    
  } catch (error) {
    console.error('❌ Error generating blog data:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  generateBlogData();
}

module.exports = { generateBlogData };