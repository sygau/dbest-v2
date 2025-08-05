// DEPRECATED: This file is no longer used
// Blog functionality has been moved directly into pages/blog/index.tsx
// This file is kept for reference only

// Blog Index Module - Handles category filtering, sorting, and pagination
window.DSEBlogIndex = (function() {
  // Private variables
  let categoryButtons = null;
  let blogCards = null;
  let currentCategory = 'all';
  let currentSort = 'newest';
  let currentPage = 1;
  const POSTS_PER_PAGE = 6;
  
  // Store event listeners for cleanup
  let eventListeners = [];
  
  // Helper function to add tracked event listeners
  function addTrackedEventListener(element, event, handler) {
    element.addEventListener(event, handler);
    eventListeners.push({ element, event, handler });
  }
  
  function filterAndSortCards() {
    if (!blogCards) return;
    
    // Filter
    blogCards.forEach(card => {
      if (currentCategory === 'all' || card.getAttribute('data-category') === currentCategory) {
        card.classList.add('filtered-in');
      } else {
        card.classList.remove('filtered-in');
      }
    });
    
    // Sort only filtered-in cards
    const visibleCards = Array.from(blogCards).filter(card => card.classList.contains('filtered-in'));
    visibleCards.sort((a, b) => {
      if (currentSort === 'newest') {
        return b.getAttribute('data-date').localeCompare(a.getAttribute('data-date'));
      } else if (currentSort === 'oldest') {
        return a.getAttribute('data-date').localeCompare(b.getAttribute('data-date'));
      } else if (currentSort === 'popular') {
        return parseInt(b.getAttribute('data-popularity')) - parseInt(a.getAttribute('data-popularity'));
      }
      return 0;
    });
    
    // Re-append in sorted order
    const blogCardRow = document.getElementById('blogCardRow');
    if (blogCardRow) {
      visibleCards.forEach(card => blogCardRow.appendChild(card));
    }
  }
  
  function setupCategoryButtons() {
    if (!categoryButtons) return;
    
    categoryButtons.forEach(btn => {
      const handler = function() {
        // Remove active from all
        categoryButtons.forEach(b => b.classList.remove('active'));
        // Add active to clicked
        this.classList.add('active');
        // Update currentCategory and filter
        currentCategory = this.getAttribute('data-category');
        filterAndSortCards();
        showPage(1);
      };
      addTrackedEventListener(btn, 'click', handler);
    });
  }
  
  function setupSortOptions() {
    const sortOptions = document.querySelectorAll('.sort-option');
    const sortLabel = document.getElementById('sortLabel');
    
    if (!sortOptions.length) return;
    
    function setSort(sortType) {
      currentSort = sortType;
      filterAndSortCards();
    }
    
    sortOptions.forEach(opt => {
      const handler = function(e) {
        e.preventDefault();
        sortOptions.forEach(o => o.classList.remove('active'));
        this.classList.add('active');
        if (sortLabel) {
          sortLabel.textContent = this.textContent;
        }
        setSort(this.getAttribute('data-sort'));
      };
      addTrackedEventListener(opt, 'click', handler);
    });
  }
  
  function getVisibleCards() {
    if (!blogCards) return [];
    return Array.from(blogCards).filter(card => card.classList.contains('filtered-in'));
  }
  
  function renderPagination() {
    const visibleCards = getVisibleCards();
    const totalPages = Math.max(1, Math.ceil(visibleCards.length / POSTS_PER_PAGE));
    const pagination = document.getElementById('blogPagination');
    
    if (!pagination) return;
    
    pagination.innerHTML = '';
    
    // Prev button
    const prevLi = document.createElement('li');
    prevLi.className = 'page-item' + (currentPage <= 1 ? ' disabled' : '');
    prevLi.innerHTML = `<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>`;
    const prevHandler = e => { 
      e.preventDefault(); 
      if (currentPage > 1) { 
        currentPage--; 
        showPage(); 
      } 
    };
    addTrackedEventListener(prevLi, 'click', prevHandler);
    pagination.appendChild(prevLi);
    
    // Page numbers (only show if more than 1 page)
    if (totalPages > 1) {
      for (let i = 1; i <= totalPages; i++) {
        const li = document.createElement('li');
        li.className = 'page-item' + (i === currentPage ? ' active' : '');
        li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        const pageHandler = e => { 
          e.preventDefault(); 
          currentPage = i; 
          showPage(); 
        };
        addTrackedEventListener(li, 'click', pageHandler);
        pagination.appendChild(li);
      }
    }
    
    // Next button
    const nextLi = document.createElement('li');
    nextLi.className = 'page-item' + (currentPage >= totalPages ? ' disabled' : '');
    nextLi.innerHTML = `<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>`;
    const nextHandler = e => { 
      e.preventDefault(); 
      if (currentPage < totalPages) { 
        currentPage++; 
        showPage(); 
      } 
    };
    addTrackedEventListener(nextLi, 'click', nextHandler);
    pagination.appendChild(nextLi);
  }
  
  function showPage() {
    const visibleCards = getVisibleCards();
    visibleCards.forEach((card, idx) => {
      card.style.display = (idx >= (currentPage - 1) * POSTS_PER_PAGE && idx < currentPage * POSTS_PER_PAGE) ? '' : 'none';
    });
    
    // Hide all non-filtered-in cards
    if (blogCards) {
      Array.from(blogCards).filter(card => !card.classList.contains('filtered-in')).forEach(card => {
        card.style.display = 'none';
      });
    }
    
    renderPagination();
  }
  
  // Enhanced filterAndSortCards to reset pagination
  function filterAndSortCardsWithPagination() {
    filterAndSortCards();
    currentPage = 1;
    showPage();
  }
  
  // Public methods
  return {
    init: function() {
      // Check if we're on the blog page and elements exist
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/blog')) {
        return;
      }
      
      // Wait a bit for DOM to be fully ready
      setTimeout(() => {
        // Get DOM elements
        categoryButtons = document.querySelectorAll('.category-btn');
        blogCards = document.querySelectorAll('.blog-card-wrapper');
        
        // Only proceed if we have the required elements
        if (!categoryButtons.length || !blogCards.length) {
          console.warn('Blog index elements not found, retrying...');
          // Retry after a short delay
          setTimeout(() => this.init(), 200);
          return;
        }
        
        // Reset state
        currentCategory = 'all';
        currentSort = 'newest';
        currentPage = 1;
        
        // Set initial active state for "All" button
        if (categoryButtons.length > 0) {
          categoryButtons[0].classList.add('active');
        }
        
        // Setup functionality
        setupCategoryButtons();
        setupSortOptions();
        
        // Initial filter, sort and pagination
        filterAndSortCardsWithPagination();
        
        console.log('Blog index initialized successfully');
      }, 100);
    },
    
    cleanup: function() {
      // Remove all tracked event listeners
      eventListeners.forEach(({ element, event, handler }) => {
        if (element && element.removeEventListener) {
          element.removeEventListener(event, handler);
        }
      });
      eventListeners = [];
      
      // Clear references
      categoryButtons = null;
      blogCards = null;
      currentCategory = 'all';
      currentSort = 'newest';
      currentPage = 1;
      
      console.log('Blog index cleaned up');
    }
  };
})();

// Manual initialization - let the TSX file handle initialization
// This prevents conflicts with Next.js hydration