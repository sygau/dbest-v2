// Remove dotenv import and add direct keys for Contentful
const contentful = require('contentful');
const fs = require('fs-extra');
const path = require('path');
const { generatePostHTML, deletePostHTML } = require('./generatePosts');
const { generateIndexHTML } = require('./generateIndex');

// To get your Content Delivery API token:
// 1. Log in to Contentful
// 2. Go to your Space → Settings → API Keys
// 3. Look for "Content delivery / preview tokens" section
// 4. Copy the "Content Delivery API - access token"
const client = contentful.createClient({
  space: 'fqnskombkl24',
  environment: 'master', // Default environment
  accessToken: 'VGIR_FUs5N8woFJ4K47tm-JWr2YVbAe521Ev4oAWVc0'
});

// Define blog content type directly
const BLOG_CONTENT_TYPE = 'blogPost';
const LOG_FILE = path.join(__dirname, 'logs.txt');

function logToFile(message) {
  const timestamp = new Date().toISOString();
  fs.appendFileSync(LOG_FILE, `[${timestamp}] ${message}\n`);
}

/**
 * Advanced sync function: detects new, updated, and deleted posts.
 * Handles HTML file generation, updates, and deletion based on changes.
 */
async function syncBlog() {
  const BLOG_INDEX_PATH = path.join(__dirname, 'blogIndex.json');
  const BLOG_DIR = path.join(__dirname, '../blog/');
  logToFile('--- Sync started ---');
  
  console.log('🔄 Starting blog sync...');
  
  // 1. Load existing index (source of truth for existing posts)
  let existingIndex = [];
  try {
    if (fs.existsSync(BLOG_INDEX_PATH)) {
      existingIndex = await fs.readJson(BLOG_INDEX_PATH);
      console.log(`📖 Loaded existing index with ${existingIndex.length} posts`);
    } else {
      console.log('📖 No existing index found, starting fresh');
    }
  } catch (err) {
    logToFile(`❌ Error loading existing index: ${err.message || err}`);
    console.error('❌ Error loading existing index:', err.message || err);
    process.exit(1); // Exit with error code
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
    logToFile(`❌ Error fetching posts from Contentful: ${err.message || err}`);
    console.error('❌ Error fetching posts from Contentful:', err);
    process.exit(1); // Exit with error code
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
  logToFile(`New posts: ${newPosts.length}, Updated posts: ${updatedPosts.length}, Deleted posts: ${deletedPosts.length}`);

  try {
    await fs.ensureDir(BLOG_DIR);

    // Process new and updated posts
    for (const post of [...newPosts, ...updatedPosts]) {
      try {
        await generatePostHTML(post, BLOG_DIR);
        logToFile(`Generated/Updated: ${post.fields.title} (${post.fields.slug})`);
      } catch (err) {
        logToFile(`❌ Error generating HTML for post "${post.fields.title}": ${err.message || err}`);
        console.error(`❌ Error generating HTML for post "${post.fields.title}":`, err.message || err);
        process.exit(1); // Exit with error code
      }
    }
    
    // Process deleted posts
    for (const post of deletedPosts) {
      try {
        await deletePostHTML(post, BLOG_DIR);
        logToFile(`Deleted: ${post.title} (${post.slug || post.htmlFile})`);
      } catch (err) {
        logToFile(`❌ Error deleting HTML for post "${post.title}": ${err.message || err}`);
        console.error(`❌ Error deleting HTML for post "${post.title}":`, err.message || err);
        process.exit(1); // Exit with error code
      }
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
    logToFile(`✅ blogIndex.json generated successfully with ${finalIndex.length} posts`);
    logToFile('Posts after sync:');
    finalIndex.forEach(post => {
      logToFile(`- ${post.title} (${post.slug})`);
    });
    if (finalIndex.length === 0) {
      logToFile('No posts in index after sync.');
    }
    // 8. Generate blog index page
    await generateIndexHTML(BLOG_DIR, finalIndex);
    logToFile('✅ Blog index page generated successfully.');
    
    if (newPosts.length === 0 && updatedPosts.length === 0 && deletedPosts.length === 0) {
      logToFile('No changes detected in this sync run.');
    }
    
    logToFile('--- Sync completed ---');
    
    console.log('🎉 Blog sync completed!');
  } catch (err) {
    logToFile(`❌ Error during blog sync: ${err.message || err}`);
    console.error('❌ Error during blog sync:', err.message || err);
    process.exit(1); // Exit with error code
  }
}

// Main execution - runs when file is executed directly
if (require.main === module) {
  syncBlog().then(() => {
    console.log('✅ Blog sync executed successfully');
    process.exit(0);
  }).catch(err => {
    logToFile(`❌ Error during blog sync execution: ${err.message || err}`);
    console.error('❌ Error during blog sync execution:', err);
    process.exit(1);
  });
}

module.exports = { syncBlog };
