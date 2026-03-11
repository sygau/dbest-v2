const { getAllPosts } = require('../lib/contentful');
const fs = require('fs-extra');
const path = require('path');

async function generateBlogData() {
  console.log('🔄 Generating blog data (Full Deep Sync)...');
  
  try {
    const posts = await getAllPosts();
    const dataDir = path.join(__dirname, '..', 'data');
    const postsDir = path.join(dataDir, 'posts');
    await fs.ensureDir(postsDir);
    
    // 1. SECURE CHECK: Scan the physical files to see what's actually there
    const existingPosts = {};
    if (await fs.pathExists(postsDir)) {
      const localFiles = await fs.readdir(postsDir);
      for (const file of localFiles) {
        if (file.endsWith('.json')) {
          try {
            const content = await fs.readJson(path.join(postsDir, file));
            if (content.slug) {
              existingPosts[content.slug] = content;
            }
          } catch (e) {
            // Skip corrupted files
          }
        }
      }
    }
    
    const newPosts = [];
    const updatedPosts = [];
    let skippedCount = 0;
    const currentSlugs = new Set();
    
    for (const post of posts) {
      if (!post.slug) continue;
      currentSlugs.add(post.slug);
      
      const existingPost = existingPosts[post.slug];
      const filePath = path.join(postsDir, `${post.slug}.json`);
      
      // 2. ROBUST COMPARISON: Compare dates as Strings
      const isNew = !existingPost;
      const isChanged = existingPost && String(existingPost.updatedAt) !== String(post.updatedAt);

      if (isNew) {
        newPosts.push(post);
        console.log(`🆕 New: ${post.title}`);
        await fs.writeJson(filePath, post, { spaces: 2 });
      } else if (isChanged) {
        updatedPosts.push(post);
        console.log(`🔄 Updated: ${post.title}`);
        await fs.writeJson(filePath, post, { spaces: 2 });
      } else {
        skippedCount++;
      }
    }
    
    // 3. CLEANUP: Delete files that were removed from Contentful
    const existingSlugs = Object.keys(existingPosts);
    const deletedSlugs = existingSlugs.filter(slug => !currentSlugs.has(slug));
    
    for (const slug of deletedSlugs) {
      const filePath = path.join(postsDir, `${slug}.json`);
      await fs.remove(filePath);
      console.log(`🗑️  Deleted: ${slug}`);
    }
    
    // 4. GENERATE INDICES (Preserving ALL fields, including content)
    const indexablePosts = posts
      .filter(post => post && post.indexPageVis)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Writes the full data to blog-index.json (Content included)
    await fs.writeJson(path.join(dataDir, 'blog-index.json'), indexablePosts, { spaces: 2 });
    
    const allSlugs = posts.map(post => post.slug).filter(Boolean);
    await fs.writeJson(path.join(dataDir, 'post-slugs.json'), allSlugs, { spaces: 2 });
    
    console.log('---');
    console.log(`📊 Smart Sync Summary: 🆕 ${newPosts.length} | 🔄 ${updatedPosts.length} | ⏭️ ${skippedCount} | 🗑️ ${deletedSlugs.length}`);
    console.log('---');
    
  } catch (error) {
    console.error('❌ Critical Sync Error:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  generateBlogData();
}

module.exports = { generateBlogData };