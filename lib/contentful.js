const contentful = require('contentful');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const { BLOCKS, INLINES } = require('@contentful/rich-text-types');

// Contentful client configuration
const client = contentful.createClient({
  space: 'fqnskombkl24',
  environment: 'master',
  accessToken: 'VGIR_FUs5N8woFJ4K47tm-JWr2YVbAe521Ev4oAWVc0'
});

const BLOG_CONTENT_TYPE = 'blogPost';

// Helper functions from your original code
function replaceYouTubeMarkers(content) {
  // Add your YouTube replacement logic here if needed
  return content;
}

function replaceButtonShortcodes(content) {
  // Add your button shortcode replacement logic here if needed
  return content;
}

function getFeaturedImageUrl(featuredImage) {
  if (
    featuredImage &&
    featuredImage.fields &&
    featuredImage.fields.file &&
    featuredImage.fields.file.url
  ) {
    const url = featuredImage.fields.file.url;
    return url.startsWith('http') ? url : 'https:' + url;
  }
  return null;
}

// Rich text rendering options
const renderOptions = {
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const url = node.data.target.fields.file.url;
      const alt = node.data.target.fields.title || '';
      const caption = node.data.target.fields.description || '';
      return `
        <div class="custom-image-block text-center my-3">
          <img src="${url}" alt="${alt}" class="img-fluid" />
          ${caption ? `<div class="image-caption small text-muted mt-1">${caption}</div>` : ''}
        </div>
      `;
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const entry = node.data.target.fields;
      const contentType = node.data.target.sys.contentType.sys.id;

      if (!entry) return '<div class="embedded-entry-block">[Embedded Entry: Data Missing]</div>';

      if (contentType === 'faq') {
        return `<div class="faq-block"><strong>Q: ${entry.question}</strong><div>A: ${entry.answer}</div></div>`;
      }

      if (contentType === 'blogPost') {
        return `
          <div class="embedded-blog-post">
            <h4>${entry.title}</h4>
            <div>${entry.description || ''}</div>
          </div>
        `;
      }

      return `
        <div class="embedded-entry-block">
          <strong>Embedded Entry (${contentType})</strong>
          <pre>${JSON.stringify(entry, null, 2)}</pre>
        </div>
      `;
    },
    [INLINES.EMBEDDED_ENTRY]: (node) => {
      const entry = node.data.target.fields;
      if (entry && entry.title) {
        return `<span class="embedded-entry-inline">${entry.title}</span>`;
      }
      return '<span class="embedded-entry-inline">[Inline Entry]</span>';
    }
  }
};

// Transform Contentful post to clean format
function transformPost(post) {
  const fields = post.fields;
  
  return {
    id: post.sys.id,
    slug: fields.slug,
    title: fields.title || '',
    seoTitle: fields.seoTitle || fields.title || '',
    seoDescription: fields.seoDescription || '',
    author: fields.author || '',
    date: fields.date || '',
    readingTime: fields.readingTime || null,
    tags: Array.isArray(fields.tags) ? fields.tags : [],
    category: fields.category || '',
    featuredImage: getFeaturedImageUrl(fields.media),
    content: fields.content ? replaceButtonShortcodes(replaceYouTubeMarkers(documentToHtmlString(fields.content, renderOptions))) : '',
    comments: fields.comments || false,
    index: fields.index !== false, // Default to true if not specified
    excerpt: fields.excerpt || '',
    createdAt: post.sys.createdAt,
    updatedAt: post.sys.updatedAt,
    robots: fields.index === false ? 'noindex, nofollow' : 'index, follow'
  };
}

// Get all blog posts
async function getAllPosts() {
  try {
    const response = await client.getEntries({
      content_type: BLOG_CONTENT_TYPE,
      order: '-fields.date',
      include: 1
    });

    return response.items.map(transformPost);
  } catch (error) {
    console.error('Error fetching posts from Contentful:', error);
    return [];
  }
}

// Get all post slugs for static paths
async function getAllPostSlugs() {
  try {
    const response = await client.getEntries({
      content_type: BLOG_CONTENT_TYPE,
      select: 'fields.slug'
    });

    return response.items.map(post => post.fields.slug).filter(Boolean);
  } catch (error) {
    console.error('Error fetching post slugs:', error);
    return [];
  }
}

// Get a single post by slug
async function getPostBySlug(slug) {
  try {
    const response = await client.getEntries({
      content_type: BLOG_CONTENT_TYPE,
      'fields.slug': slug,
      include: 1
    });

    if (response.items.length === 0) {
      return null;
    }

    return transformPost(response.items[0]);
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

// Get indexable posts (for blog index page)
async function getIndexablePosts() {
  const allPosts = await getAllPosts();
  return allPosts
    .filter(post => post.index)
    .sort((a, b) => new Date(b.date) - new Date(a.date));
}

module.exports = {
  getAllPosts,
  getAllPostSlugs,
  getPostBySlug,
  getIndexablePosts
};
