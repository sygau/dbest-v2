const contentful = require('contentful');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const { BLOCKS, INLINES } = require('@contentful/rich-text-types');

const client = contentful.createClient({
  space: 'fqnskombkl24',
  environment: 'master',
  accessToken: 'VGIR_FUs5N8woFJ4K47tm-JWr2YVbAe521Ev4oAWVc0'
});

const BLOG_CONTENT_TYPE = 'blogPost';

function replaceYouTubeMarkers(content) {
  if (!content) return '';
  return content.replace(/\[youtube:([a-zA-Z0-9_-]{11})\]/g, (match, videoId) => {
    return `
      <div class="youtube-embed-responsive" style="max-width: 700px; margin: 2rem auto;">
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
          <iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" frameborder="0" loading="lazy" allowfullscreen></iframe>
        </div>
      </div>`;
  });
}

function replaceButtonShortcodes(content) {
  if (!content) return '';
  return content.replace(/\[button;([a-zA-Z0-9_+-]+);([a-zA-Z-]+);([^;\]]+);([^\]]+)\]/g, (match, type, style, label, url) => {
    let cleanUrl = url.replace(/<[^>]*>/g, '');
    if (url.includes('href=')) {
      const m = url.match(/href=["']([^"']+)["']/);
      if (m) cleanUrl = m[1];
    }
    const isIcon = type.startsWith('icon+');
    const iconPart = isIcon ? `<i class="bi bi-${type.slice(5)}" style="margin-right:0.5em;"></i>` : '';
    const btnClass = `btn btn-${style || 'primary'} px-4 mb-2`;
    return `<a href="${cleanUrl}" class="${btnClass}">${iconPart}${label}</a>`;
  });
}

function getFeaturedImageUrl(featuredImage) {
  const url = featuredImage?.fields?.file?.url;
  if (!url) return null;
  return (url.startsWith('http') ? url : 'https:' + url) + '?fm=webp&q=85';
}

const renderOptions = {
  renderNode: {
    [BLOCKS.PARAGRAPH]: (node, next) => {
      const children = next(node.content);
      // Fixed: ensures empty lines in Contentful render as visible space
      if (!children || children.trim() === '' || children === '<br />') {
        return `<p style="min-height: 1.2em;">&nbsp;</p>`;
      }
      return `<p>${children}</p>`;
    },
    [BLOCKS.TEXT]: (node) => {
      if (!node.value) return '';
      // Fixed: preserves manual line breaks
      return node.value.split('\n').join('<br />');
    },
    hardBreak: () => '<br />',
    [BLOCKS.EMBEDDED_ASSET]: (node) => {
      const f = node.data?.target?.fields;
      if (!f?.file?.url) return '';
      const url = f.file.url.startsWith('http') ? f.file.url : 'https:' + f.file.url;
      return `<div class="my-4 text-center"><img src="${url}?fm=webp&w=1000" alt="${f.title || ''}" class="img-fluid" loading="lazy" /></div>`;
    },
    [BLOCKS.EMBEDDED_ENTRY]: (node) => {
      const entry = node.data?.target?.fields;
      if (!entry) return '';
      const type = node.data.target.sys?.contentType?.sys?.id;
      if (type === 'faq') return `<div class="p-3 border rounded my-3"><strong>Q: ${entry.question}</strong><p>A: ${entry.answer}</p></div>`;
      return '';
    }
  }
};

function transformPost(post) {
  if (!post || !post.fields) return null;
  const f = post.fields;
  let htmlContent = '';
  if (f.content) {
    htmlContent = documentToHtmlString(f.content, renderOptions);
    htmlContent = replaceButtonShortcodes(replaceYouTubeMarkers(htmlContent));
  }
  return {
    id: post.sys.id,
    slug: f.slug,
    title: f.title || '',
    seoTitle: f.seoTitle || f.title || '',
    seoDescription: f.seoDescription || '',
    author: f.author || '',
    date: f.date || '',
    readingTime: f.readingTime || null,
    tags: Array.isArray(f.tags) ? f.tags : [],
    category: f.category || '',
    featuredImage: getFeaturedImageUrl(f.media),
    content: htmlContent,
    comments: f.comments || false,
    indexPageVis: f.indexPageVis !== false,
    excerpt: f.excerpt || '',
    robots: f.index === false ? 'noindex, nofollow' : 'index, follow'
  };
}

async function getAllPosts() {
  try {
    const response = await client.getEntries({
      content_type: BLOG_CONTENT_TYPE,
      order: '-fields.date',
      include: 1
      // Removed 'select' to ensure 'fields.content' is never dropped
    });
    return response.items.map(transformPost);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

async function getPostBySlug(slug) {
  try {
    const response = await client.getEntries({
      content_type: BLOG_CONTENT_TYPE,
      'fields.slug': slug,
      include: 2
    });
    return response.items.length ? transformPost(response.items[0]) : null;
  } catch (error) {
    return null;
  }
}

async function getAllPostSlugs() {
  try {
    const response = await client.getEntries({ content_type: BLOG_CONTENT_TYPE, select: 'fields.slug' });
    return response.items.map(post => post.fields.slug).filter(Boolean);
  } catch (error) { return []; }
}

async function getIndexablePosts() {
  const allPosts = await getAllPosts();
  return allPosts.filter(post => post && post.indexPageVis);
}

module.exports = { getAllPosts, getAllPostSlugs, getPostBySlug, getIndexablePosts };