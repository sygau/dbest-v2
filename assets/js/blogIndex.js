// Category Sorter (single select, bubble look)
const categoryButtons = document.querySelectorAll('.category-btn');
const blogCards = document.querySelectorAll('.blog-card-wrapper');
let currentCategory = 'all';
let currentSort = 'newest';

function filterAndSortCards() {
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
  visibleCards.forEach(card => blogCardRow.appendChild(card));
}

categoryButtons.forEach(btn => {
  btn.addEventListener('click', function() {
    // Remove active from all
    categoryButtons.forEach(b => b.classList.remove('active'));
    // Add active to clicked
    this.classList.add('active');
    // Update currentCategory and filter
    currentCategory = this.getAttribute('data-category');
    filterAndSortCards();
    showPage(1);
  });
});
// Sort Dropdown
const sortOptions = document.querySelectorAll('.sort-option');
const sortLabel = document.getElementById('sortLabel');
function setSort(sortType) {
  currentSort = sortType;
  filterAndSortCards();
}
sortOptions.forEach(opt => {
  opt.addEventListener('click', function(e) {
    e.preventDefault();
    sortOptions.forEach(o => o.classList.remove('active'));
    this.classList.add('active');
    sortLabel.textContent = this.textContent;
    setSort(this.getAttribute('data-sort'));
  });
});
// Initial sort and filter
filterAndSortCards();

// Pagination logic
const POSTS_PER_PAGE = 6;
let currentPage = 1;
function getVisibleCards() {
  return Array.from(blogCards).filter(card => card.classList.contains('filtered-in'));
}
function renderPagination() {
  const visibleCards = getVisibleCards();
  const totalPages = Math.max(1, Math.ceil(visibleCards.length / POSTS_PER_PAGE));
  const pagination = document.getElementById('blogPagination');
  pagination.innerHTML = '';
  
  // Prev button
  const prevLi = document.createElement('li');
  prevLi.className = 'page-item' + (currentPage <= 1 ? '' : '');
  prevLi.innerHTML = `<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>`;
  prevLi.onclick = e => { e.preventDefault(); if (currentPage > 1) { currentPage--; showPage(); } };
  pagination.appendChild(prevLi);
  
  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    const li = document.createElement('li');
    li.className = 'page-item' + (i === currentPage ? ' active' : '');
    li.innerHTML = `<a class="page-link" href="#">${i}</a>`;
    li.onclick = e => { e.preventDefault(); currentPage = i; showPage(); };
    pagination.appendChild(li);
  }
  
  // Next button
  const nextLi = document.createElement('li');
  nextLi.className = 'page-item' + (currentPage >= totalPages ? '' : '');
  nextLi.innerHTML = `<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>`;
  nextLi.onclick = e => { e.preventDefault(); if (currentPage < totalPages) { currentPage++; showPage(); } };
  pagination.appendChild(nextLi);
}
function showPage() {
  const visibleCards = getVisibleCards();
  visibleCards.forEach((card, idx) => {
    card.style.display = (idx >= (currentPage - 1) * POSTS_PER_PAGE && idx < currentPage * POSTS_PER_PAGE) ? '' : 'none';
  });
  // Hide all non-filtered-in cards
  Array.from(blogCards).filter(card => !card.classList.contains('filtered-in')).forEach(card => {
    card.style.display = 'none';
  });
  renderPagination();
}
// Patch filterAndSortCards to reset to page 1 and showPage
const origFilterAndSortCards = filterAndSortCards;
filterAndSortCards = function() {
  origFilterAndSortCards();
  currentPage = 1;
  showPage();
};
// Initial pagination setup
showPage();