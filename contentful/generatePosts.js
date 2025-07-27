const fs = require('fs-extra');
const path = require('path');
const { documentToHtmlString } = require('@contentful/rich-text-html-renderer');
const { BLOCKS, INLINES } = require('@contentful/rich-text-types');

/**
 * Generate HTML file for a single blog post
 * @param {Object} post - Contentful post object
 * @param {string} blogDir - Directory to save HTML files
 */
async function generatePostHTML(post, blogDir) {
  const fields = post.fields;
  const slug = fields.slug;
  const htmlFile = `${slug}.html`;
  const filePath = path.join(blogDir, htmlFile);

  // Read the template
  const templatePath = path.join(__dirname, '../blog', 'postTemplate.html');
  let template = await fs.readFile(templatePath, 'utf8');

  // Debug log for featured image
  console.log('Featured Image:', fields.featuredImage);

  // Helper to get the correct image URL
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
    return null; // Return null instead of default image
  }

  // Get featured image URL if available
  const featuredImageUrl = getFeaturedImageUrl(fields.media);

  // Generate Disqus comments section if enabled
  const generateDisqusSection = (enableComments, slug, title) => {
    if (!enableComments) {
      return ''; // Return empty string if comments are disabled
    }

    return `
          <!-- Comments Section -->
          <hr class="my-5" style="border-color: var(--bs-border-color-translucent);">
          <div class="comments-section px-3 py-2">
            <h4 class="mb-4">
              <i class="material-icons-outlined me-2">comment</i>
              留言討論
            </h4>

            <!-- Disqus Comments -->
            <div id="disqus_thread"></div>
            <script>
              var disqus_config = function () {
                this.page.url = 'https://dse.best/blog/${slug}';
                this.page.identifier = '${slug}';
                this.page.robots = 'noindex, nofollow';
              };

              (function() { // DON'T EDIT BELOW THIS LINE
                var d = document, s = d.createElement('script');
                s.src = 'https://dsebest.disqus.com/embed.js';
                s.setAttribute('data-timestamp', +new Date());
                (d.head || d.body).appendChild(s);
              })();
            </script>
            <noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>
          </div>`;
  };

  // Prepare replacements
  const replacements = {
    '{{title}}': fields.title || '',
    '{{seoTitle}}': fields.seoTitle || '',
    '{{seoDescription}}': fields.seoDescription || '',
    '{{seoTags}}': Array.isArray(fields.seoTags) ? fields.seoTags.join(', ') : '',
    '{{author}}': fields.author || '',
    '{{date}}': fields.date || '',
    '{{readingTime}}': fields.readingTime ? `${fields.readingTime}min read` : '',
    '{{tags}}': Array.isArray(fields.tags) ? fields.tags.map(tag => `<span class="badge bg-primary me-2">${tag}</span>`).join(' ') : '',
    '{{featuredImage}}': featuredImageUrl || '',
    '{{featuredImageSection}}': featuredImageUrl ?
      `<div class="text-center mb-4">
        <img src="${featuredImageUrl}" alt="${fields.title || 'placeholder'}"
          class="img-fluid rounded" style="max-height: 400px; object-fit: cover;">
      </div>` : '', // Empty string if no image
    '{{content}}': fields.content ? replaceButtonShortcodes(replaceYouTubeMarkers(documentToHtmlString(fields.content, {
      renderNode: {
        [BLOCKS.EMBEDDED_ASSET]: (node) => {
          const url = node.data.target.fields.file.url;
          const alt = node.data.target.fields.title || '';
          const caption = node.data.target.fields.description || ''; // or .caption if you have a custom field
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

          // Example for FAQ
          if (contentType === 'faq') {
            return `<div class="faq-block"><strong>Q: ${entry.question}</strong><div>A: ${entry.answer}</div></div>`;
          }

          // Example for Blog Post (customize as needed)
          if (contentType === 'blogPost') {
            return `
              <div class="embedded-blog-post">
                <h4>${entry.title}</h4>
                <div>${entry.description || ''}</div>
              </div>
            `;
          }

          // Fallback: render all fields for debugging
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
    }))) : '',
    '{{commentsSection}}': generateDisqusSection(fields.comments, fields.slug, fields.title),
    '{{slug}}': fields.slug || '',
    '{{category}}': fields.category || '',
    '{{lastUpdated}}': post.sys.updatedAt, // Use sys.updatedAt for last updated date
    '{{robotsMeta}}': fields.index === false ? 'noindex, nofollow' : 'index, follow'
  };

  // Replace all placeholders
  for (const [key, value] of Object.entries(replacements)) {
    template = template.split(key).join(value);
  }

  await fs.writeFile(filePath, template);
  console.log(`📄 Generated HTML file: ${htmlFile}`);
}

/**
 * Delete HTML file for a deleted post
 * @param {Object} post - Post object from blogIndex.json
 * @param {string} blogDir - Directory containing HTML files
 */
async function deletePostHTML(post, blogDir) {
  const filePath = path.join(blogDir, post.htmlFile);
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`🗑️ Deleted HTML file: ${post.htmlFile}`);
  }
}

function replaceYouTubeMarkers(html) {
  // Matches [youtube:VIDEO_ID] where VIDEO_ID is 11 chars (YouTube standard)
  return html.replace(/\[youtube:([a-zA-Z0-9_-]{11})\]/g, (match, videoId) => {
    return `
      <div class="youtube-embed-responsive" style="max-width: 700px; margin: 0 auto;">
        <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden;">
          <iframe
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
            src="https://www.youtube.com/embed/${videoId}"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    `;
  });
}

function replaceButtonShortcodes(html) {
  // Matches [button;TYPE;STYLE;LABEL;URL]
  return html.replace(/\[button;([a-zA-Z0-9_+-]+);([a-zA-Z-]+);([^;\]]+);([^\]]+)\]/g, (match, type, style, label, url) => {
    // Fix URL if it contains HTML tags or entities
    if (url.includes('&lt;') || url.includes('&gt;') || url.includes('<a') || url.includes('</a>')) {
      // Extract the actual URL from href attribute if present
      const hrefMatch = url.match(/href=["']([^"']+)["']/);
      if (hrefMatch && hrefMatch[1]) {
        url = hrefMatch[1];
      } else {
        // Remove HTML tags if present
        url = url.replace(/<[^>]*>/g, '');
      }
    }

    // Icon button logic first
    if (type.startsWith('icon+')) {
      const iconName = type.slice(5);
      const className = `btn btn-${style} px-4 raised me-2 mb-2`;
      return `<a href="${url}" class="${className}"><i class="material-icons-outlined" style="vertical-align: middle; margin-right: 0.3em;">${iconName}</i>${label}</a>`;
    }
    
    // Normalize inputs
    type = (type || '').toLowerCase();
    style = (style || '').toLowerCase();
    const allowedTypes = ['gradient', 'color', 'raised', 'outline', 'inverse'];
    const allowedStyles = [
      'primary', 'danger', 'success', 'info', 'warning', 'voilet', 'royal', 'branding', 'deep-blue',
      'dark', 'secondary', 'light'
    ];
    
    // Handle special cases
    if (type === 'primary' || !allowedTypes.includes(type)) {
      return `<a href="${url}" class="btn btn-primary px-5 me-2 mb-2">${label}</a>`;
    }
    
    if (!allowedStyles.includes(style)) {
      style = 'primary';
    }
    
    let className = '';
    switch (type) {
      case 'gradient':
        className = `btn btn-grd btn-grd-${style} px-5 me-2 mb-2`;
        break;
      case 'color':
        className = `btn btn-${style} px-5 me-2 mb-2`;
        break;
      case 'raised':
        className = `btn btn-${style} px-5 raised me-2 mb-2`;
        break;
      case 'outline':
        className = `btn btn-outline-${style} px-5 me-2 mb-2`;
        break;
      case 'inverse':
        className = `btn btn-inverse-${style} px-5 me-2 mb-2`;
        break;
      default:
        className = `btn btn-${style} px-5 me-2 mb-2`;
    }
    
    return `<a href="${url}" class="${className}">${label}</a>`;
  });
}

module.exports = {
  generatePostHTML,
  deletePostHTML
}; 