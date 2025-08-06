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
    const postsDir = path.join(dataDir, 'posts');
    await fs.ensureDir(dataDir);
    await fs.ensureDir(postsDir);
    
    // Load existing posts to detect changes
    let existingPosts = {};
    try {
      const existingIndex = await fs.readJson(path.join(dataDir, 'blog-index.json'));
      existingPosts = Object.fromEntries(existingIndex.map(post => [post.slug, post]));
    } catch (e) {
      console.log('ℹ️  No existing blog index found, generating fresh');
    }
    
    // Track changes
    const newPosts = [];
    const updatedPosts = [];
    const currentSlugs = new Set();
    
    // Process current posts
    for (const post of posts) {
      currentSlugs.add(post.slug);
      const existingPost = existingPosts[post.slug];
      
      if (!existingPost) {
        newPosts.push(post);
        console.log(`🆕 New post: ${post.title}`);
      } else if (existingPost.updatedAt !== post.updatedAt) {
        updatedPosts.push(post);
        console.log(`🔄 Updated post: ${post.title}`);
      }
      
      // Always write/update the post file
      await fs.writeJson(path.join(postsDir, `${post.slug}.json`), post, { spaces: 2 });
    }
    
    // Detect deleted posts
    const existingSlugs = Object.keys(existingPosts);
    const deletedSlugs = existingSlugs.filter(slug => !currentSlugs.has(slug));
    
    // Remove deleted post files
    for (const slug of deletedSlugs) {
      const filePath = path.join(postsDir, `${slug}.json`);
      if (await fs.pathExists(filePath)) {
        await fs.remove(filePath);
        console.log(`🗑️  Deleted post file: ${slug}`);
      }
    }
    
    // Generate blog index data
    const indexablePosts = posts
      .filter(post => post.index)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    await fs.writeJson(path.join(dataDir, 'blog-index.json'), indexablePosts, { spaces: 2 });
    
    // Generate posts manifest for static paths
    const slugs = posts.map(post => post.slug);
    await fs.writeJson(path.join(dataDir, 'post-slugs.json'), slugs, { spaces: 2 });
    
    // Summary
    console.log('📊 Blog data generation summary:');
    console.log(`   📝 Total posts: ${posts.length}`);
    console.log(`   🆕 New posts: ${newPosts.length}`);
    console.log(`   🔄 Updated posts: ${updatedPosts.length}`);
    console.log(`   🗑️  Deleted posts: ${deletedSlugs.length}`);
    console.log(`   📋 Indexable posts: ${indexablePosts.length}`);
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
