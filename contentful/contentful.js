// Remove dotenv import and add direct keys for Contentful
const contentful = require('contentful');
const fs = require('fs-extra');
const path = require('path');
const { generatePostHTML, deletePostHTML } = require('./generatePosts');
const { generateIndexHTML } = require('./generateIndex');

const client = contentful.createClient({
  space: '7quy4v63pv3p',
  environment: 'master', // Default environment
  accessToken: 'yQVmPw3JYw_y3mH71vuDdtpKYbAKUCIpcJgNEQnBkGQ'
});

// Define blog content type directly
const BLOG_CONTENT_TYPE = 'blogPost';

/**
 * Advanced sync function: detects new, updated, and deleted posts.
 * Handles HTML file generation, updates, and deletion based on changes.
 */
async function syncBlog() {
  const BLOG_INDEX_PATH = path.join(__dirname, 'blogIndex.json');
  const BLOG_DIR = path.join(__dirname, '../blog/');
  
  console.log('🔄 Starting blog sync...');
  
  // 1. Load existing index (source of truth for existing posts)
  let existingIndex = [];
  if (fs.existsSync(BLOG_INDEX_PATH)) {
    existingIndex = await fs.readJson(BLOG_INDEX_PATH);
    console.log(`📖 Loaded existing index with ${existingIndex.length} posts`);
  } else {
    console.log('📖 No existing index found, starting fresh');
  }

  // 2. Fetch all posts from Contentful
  console.log('🌐 Fetching posts from Contentful...');
  let response;
  try {
    response = await client.getEntries({
      content_type: BLOG_CONTENT_TYPE,
      order: '-fields.date',
      include: 1
    });
  } catch (err) {
    console.error('❌ Error fetching posts from Contentful:', err.message || err);
    return;
  }
  const posts = response.items;
  console.log(`📝 Found ${posts.length} posts in Contentful`);

  // 3. Build maps for comparison
  const existingByContentfulID = Object.fromEntries(existingIndex.map(post => [post.contentfulID, post]));
  const contentfulByID = Object.fromEntries(posts.map(post => [post.sys.id, post]));

  // 4. Detect new and updated posts
  const newPosts = [];
  const updatedPosts = [];
  for (const post of posts) {
    const contentfulID = post.sys.id;
    const existingPost = existingByContentfulID[contentfulID];
    if (!existingPost) {
      newPosts.push(post);
      console.log(`🆕 New post detected: ${post.fields.title}`);
    } else if (existingPost.updatedAt !== post.sys.updatedAt) {
      updatedPosts.push(post);
      console.log(`🔄 Updated post detected: ${post.fields.title}`);
    }
  }

  // 5. Detect deleted posts
  const deletedPosts = [];
  for (const existingPost of existingIndex) {
    if (!contentfulByID[existingPost.contentfulID]) {
      deletedPosts.push(existingPost);
      console.log(`🗑️ Deleted post detected: ${existingPost.title}`);
    }
  }

  // 6. Handle changes
  console.log(`\n📊 Changes detected:`);
  console.log(`   New posts: ${newPosts.length}`);
  console.log(`   Updated posts: ${updatedPosts.length}`);
  console.log(`   Deleted posts: ${deletedPosts.length}`);

  await fs.ensureDir(BLOG_DIR);

  for (const post of [...newPosts, ...updatedPosts]) {
    await generatePostHTML(post, BLOG_DIR);
  }
  for (const post of deletedPosts) {
    await deletePostHTML(post, BLOG_DIR);
  }

  // 7. Generate final blogIndex.json with all current posts
  console.log('\n📝 Generating final blogIndex.json...');
  const finalIndex = posts.map(post => {
    const fields = post.fields;
    const sys = post.sys;
    const postID = fields.postID;
    const slug = fields.slug;
    const title = fields.title;
    const createdAt = sys.createdAt;
    const updatedAt = sys.updatedAt;
    const date = fields.date;
    const author = fields.author;
    const category = fields.category || null;
    const featuredImage = fields.featuredImage && fields.featuredImage.fields && fields.featuredImage.fields.file ? fields.featuredImage.fields.file.url : null;
    const tags = fields.tags || [];
    const seoTitle = fields.seoTitle || null;
    const seoDescription = fields.seoDescription || null;
    const seoTags = fields.seoTags || [];
    const readingTime = fields.readingTime || null;
    const comments = fields.comments || false;
    const excerpt = fields.excerpt || null;
    const index = fields.index !== undefined ? fields.index : true; // Default to true if not specified
    const htmlFile = `${slug}.html`;
    const postPermalink = `https://dse.best/blog/${slug}`;
    return {
      postID,
      contentfulID: sys.id,
      slug,
      postPermalink,
      title,
      createdAt,
      updatedAt,
      htmlFile,
      date,
      author,
      category,
      featuredImage,
      tags,
      seoTitle,
      seoDescription,
      seoTags,
      readingTime,
      comments,
      excerpt,
      index
    };
  });
  await fs.writeJson(BLOG_INDEX_PATH, finalIndex, { spaces: 2 });
  console.log(`✅ Final blogIndex.json generated with ${finalIndex.length} posts`);
  
  // 8. Generate blog index page
  await generateIndexHTML(BLOG_DIR, finalIndex);
  
  console.log('🎉 Blog sync completed!');
}

// Main execution - runs when file is executed directly
if (require.main === module) {
  syncBlog().then(() => process.exit(0)).catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });
}

module.exports = { syncBlog };
