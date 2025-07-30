const fs = require('fs-extra');
const path = require('path');

/**
 * Generate blog index HTML file from template and blogIndex.json
 * @param {string} blogDir - Directory to save HTML files
 * @param {Array} posts - Array of post objects from blogIndex.json
 */
async function generateIndexHTML(blogDir, posts) {
  console.log('🔄 Generating blog index page...');
  
  // Read the template
  const templatePath = path.join(__dirname, '../blog', 'indexTemplate.html');
  const outputPath = path.join(blogDir, 'index.html');
  let template = await fs.readFile(templatePath, 'utf8');

  // Filter out posts with index=false
  const indexablePosts = posts.filter(post => post.index !== false);
  
  // Sort posts by date (newest first)
  indexablePosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  // Generate blog cards HTML
  let blogCardsHTML = '';
  
  indexablePosts.forEach(post => {
    // Determine category color class and color code for dummyimage
    const categoryColorClass = getCategoryColorClass(post.category);
    const categoryColorCode = getCategoryColorCode(post.category);
    const categoryTextColor = getCategoryTextColor(post.category);
    
    // Get category display name (Chinese + English)
    const categoryDisplayName = getCategoryDisplayName(post.category);
    
    // Get featured image URL or use dummyimage as fallback
    let featuredImageUrl;
    if (post.featuredImage) {
      featuredImageUrl = post.featuredImage.startsWith('http') ? post.featuredImage : 'https:' + post.featuredImage;
    } else {
      // Use dummyimage with category color and text
      const categoryName = post.category || 'Uncategorized';
      featuredImageUrl = `https://dummyimage.com/200x200/${categoryColorCode}/${categoryTextColor}&text=${encodeURIComponent(categoryName)}`;
    }
    
    // Create excerpt from post content or use provided excerpt
    const excerpt = post.excerpt || '';
    
    // Format date for display if needed
    const displayDate = post.date;
    
    // Create blog card HTML
    blogCardsHTML += `
    <div class="col-12 blog-card-wrapper" data-category="${post.category || 'Uncategorized'}" data-date="${post.date}" data-popularity="50">
      <a href="${post.slug}" class="text-decoration-none">
        <div class="card blog-card border-0 shadow position-relative mb-3 h-100" style="cursor:pointer; align-items: stretch;">
          <div class="position-absolute top-0 start-0 w-100" style="height: 6px; border-radius: 1.5rem 1.5rem 0 0; z-index:2;">
            <div class="${categoryColorClass} w-100 h-100" style="border-radius: 1.5rem 1.5rem 0 0;"></div>
          </div>
          <img src="${featuredImageUrl}" class="img-fluid blog-card-img h-100" alt="${post.category || 'Uncategorized'}">
          <div class="card-body blog-card-body" style="z-index:1;">
            <span class="badge ${categoryColorClass.replace('bg-', 'bg-')} mb-2" style="font-size: 0.9rem; padding: 0.4em 0.6em;">${categoryDisplayName}</span>
            <h2 class="card-title blog-card-title mb-2">${post.title}</h2>
            <div class="d-flex blog-meta mb-2 flex-wrap">
              <span class="blog-meta-item">
                <span class="material-icons-outlined">person</span>${post.author || 'DSEBest'}
              </span>
              <span class="blog-meta-item">
                <span class="material-icons-outlined">event</span>${displayDate}
              </span>
              <span class="blog-meta-item">
                <span class="material-icons-outlined">schedule</span>${post.readingTime ? post.readingTime + ' min' : ''}
              </span>
              ${post.comments ? `<span class="blog-meta-item">
                <span class="material-icons-outlined">comment</span><span class="disqus-comment-count" data-disqus-identifier=${post.slug}>0</span>
              </span>` : ''}
            </div>
            <p class="card-text mb-1">${excerpt}</p>
          </div>
        </div>
      </a>
    </div>
    `;
  });

  // Replace the blog cards placeholder in the template
  template = template.replace(
    /<div class="row g-4 mb-5 align-items-stretch" id="blogCardRow">[\s\S]*?<\/div>\s*<!-- Pagination/,
    `<div class="row g-4 mb-5 align-items-stretch" id="blogCardRow">\n    ${blogCardsHTML}\n  </div>\n  <!-- Pagination`
  );

  // Write the generated HTML to the output file
  await fs.writeFile(outputPath, template);
  console.log(`📄 Generated blog index page: ${outputPath}`);
}

/**
 * Get the appropriate Bootstrap color class for a category
 * @param {string} category - The post category
 * @returns {string} - Bootstrap color class
 */
function getCategoryColorClass(category) {
  if (!category) return 'bg-secondary';
  
  const categoryMap = {
    'Chinese': 'bg-danger',
    'English': 'bg-info',
    'Maths': 'bg-warning',
    'CSD': 'bg-purple',
    'Physics': 'bg-warning',
    'Chemistry': 'bg-success',
    'Biology': 'bg-primary',
    'ICT': 'bg-dark',
    'M1': 'bg-purple',
    'M2': 'bg-teal',
    'Geography': 'bg-cyan',
    'History': 'bg-brown',
    'Chinese History': 'bg-danger',
    'Economics': 'bg-secondary',
    'BAFS': 'bg-amber',
    'Visual Arts': 'bg-info',
    'DSE News': 'bg-orange',
    'Testing': 'bg-secondary'
  };
  
  return categoryMap[category] || 'bg-secondary';
}

/**
 * Get the appropriate color code for dummyimage based on category
 * @param {string} category - The post category
 * @returns {string} - Color code without # prefix
 */
function getCategoryColorCode(category) {
  if (!category) return '6c757d';
  
  const categoryMap = {
    'Chinese': 'dc3545',
    'English': '17a2b8',
    'Maths': 'ffc107',
    'CSD': '8e24aa',
    'Physics': 'ffc107',
    'Chemistry': '28a745',
    'Biology': '007bff',
    'ICT': '343a40',
    'M1': '7c4dff',
    'M2': '009688',
    'Geography': '0097a7',
    'History': '6d4c41',
    'Chinese History': 'c62828',
    'Economics': '6c757d',
    'BAFS': 'ffb300',
    'Visual Arts': '03a9f4',
    'DSE News': 'ff7043',
    'Testing': '6c757d'
  };
  
  return categoryMap[category] || '6c757d';
}

/**
 * Get the appropriate text color for dummyimage based on category
 * @param {string} category - The post category
 * @returns {string} - Color code without # prefix
 */
function getCategoryTextColor(category) {
  if (!category) return 'ffffff';
  
  const darkTextCategories = ['Maths', 'Physics', 'BAFS'];
  return darkTextCategories.includes(category) ? '000000' : 'ffffff';
}

/**
 * Get the category display name (Chinese + English)
 * @param {string} category - The post category
 * @returns {string} - Combined display name
 */
function getCategoryDisplayName(category) {
  if (!category) return 'Uncategorized';

  const categoryMap = {
    'Chinese': '中文 Chinese',
    'English': '英文 English',
    'Maths': '數學 Maths',
    'CSD': '公民 CSD',
    'Physics': '物理 Physics',
    'Chemistry': '化學 Chemistry',
    'Biology': '生物 Biology',
    'ICT': '資訊 ICT',
    'M1': 'M1',
    'M2': 'M2',
    'Geography': '地理 Geography',
    'History': '歷史 History',
    'Chinese History': '中國歷史 Chinese History',
    'Economics': '經濟 Economics',
    'BAFS': '企會財 BAFS',
    'Visual Arts': '視藝 Visual Arts',
    'DSE News': 'DSE News',
    'Testing': 'Testing'
  };

  return categoryMap[category] || category;
}

module.exports = {
  generateIndexHTML
}; 