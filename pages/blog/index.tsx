import Head from 'next/head'
import { BiUserCircle, BiCalendarEvent, BiTimeFive, BiComment, BiFileBlank, BiSort } from 'react-icons/bi';
import { GetStaticProps } from 'next'
import fs from 'fs'
import path from 'path'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import NavigationLink from '../../components/NavigationLink'

// Define types
interface BlogPost {
  id: string;
  slug: string;
  title: string;
  seoTitle: string;
  seoDescription: string;
  author: string;
  date: string;
  readingTime: number | null;
  tags: string[];
  category: string;
  featuredImage: string | null;
  content: string;
  comments: boolean;
  index: boolean;
  excerpt: string;
  createdAt: string;
  updatedAt: string;
  robots: string;
}

interface BlogIndexProps {
  posts: BlogPost[];
}

// Helper functions for category styling (from your original generateIndex.js)
function getCategoryColorClass(category: string): string {
  if (!category) return 'bg-secondary';
  
  const categoryMap: Record<string, string> = {
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

function getCategoryColorCode(category: string): string {
  if (!category) return '6c757d';
  
  const categoryMap: Record<string, string> = {
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

function getCategoryTextColor(category: string): string {
  if (!category) return 'ffffff';
  
  const darkTextCategories = ['Maths', 'Physics', 'BAFS'];
  return darkTextCategories.includes(category) ? '000000' : 'ffffff';
}

function getCategoryDisplayName(category: string): string {
  if (!category) return 'Uncategorized';

  const categoryMap: Record<string, string> = {
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

export default function BlogIndex({ posts }: BlogIndexProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Debug: Log posts data
  console.log('BlogIndex component rendered with posts:', posts?.length || 0);
  
  useEffect(() => {
    setIsClient(true);
    setIsLoaded(true);

    // Blog functionality - moved from script tag to useEffect
    if (typeof window !== 'undefined') {
      console.log('Blog initialization starting...');
      console.log('Posts available:', posts?.length || 0);
      
      // Private variables
      let categoryButtons: NodeListOf<HTMLButtonElement> | null = null;
      let blogCards: NodeListOf<HTMLElement> | null = null;
      let currentCategory = 'all';
      let currentSort = 'newest';
      let currentPage = 1;
      const POSTS_PER_PAGE = 6;
      
      // Store event listeners for cleanup
      const eventListeners: Array<{element: Element, event: string, handler: EventListener}> = [];
      
      // Helper function to add tracked event listeners
      const addTrackedEventListener = (element: Element, event: string, handler: EventListener) => {
        element.addEventListener(event, handler);
        eventListeners.push({ element, event, handler });
      };
      
      const filterAndSortCards = () => {
        console.log('Filtering and sorting cards...', { currentCategory, currentSort });
        if (!blogCards) {
          console.log('No blog cards found');
          return;
        }
        
        // Filter
        blogCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (currentCategory === 'all' || cardCategory === currentCategory) {
            card.classList.add('filtered-in');
          } else {
            card.classList.remove('filtered-in');
          }
        });
        
        // Sort only filtered-in cards
        const visibleCards = Array.from(blogCards).filter(card => card.classList.contains('filtered-in'));
        console.log('Visible cards after filter:', visibleCards.length);
        
        visibleCards.sort((a, b) => {
          if (currentSort === 'newest') {
            return (b.getAttribute('data-date') || '').localeCompare(a.getAttribute('data-date') || '');
          } else if (currentSort === 'oldest') {
            return (a.getAttribute('data-date') || '').localeCompare(b.getAttribute('data-date') || '');
          } else if (currentSort === 'popular') {
            return parseInt(b.getAttribute('data-popularity') || '50') - parseInt(a.getAttribute('data-popularity') || '50');
          }
          return 0;
        });
        
        // Re-append in sorted order
        const blogCardRow = document.getElementById('blogCardRow');
        if (blogCardRow) {
          visibleCards.forEach(card => blogCardRow.appendChild(card));
        }
      };
      
      const setupCategoryButtons = () => {
        console.log('Setting up category buttons...');
        if (!categoryButtons) return;
        
        categoryButtons.forEach(btn => {
          const handler = () => {
            console.log('Category button clicked:', btn.getAttribute('data-category'));
            // Remove active from all
            categoryButtons?.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');
            // Update currentCategory and filter
            currentCategory = btn.getAttribute('data-category') || 'all';
            filterAndSortCards();
            currentPage = 1;
            showPage();
          };
          addTrackedEventListener(btn, 'click', handler);
        });
      };
      
      const setupSortOptions = () => {
        console.log('Setting up sort options...');
        const sortOptions = document.querySelectorAll('.sort-option');
        const sortLabel = document.getElementById('sortLabel');
        
        if (!sortOptions.length) return;
        
        const setSort = (sortType: string) => {
          console.log('Sort changed to:', sortType);
          currentSort = sortType;
          filterAndSortCards();
          currentPage = 1;
          showPage();
        };
        
        sortOptions.forEach(opt => {
          const handler = (e: Event) => {
            e.preventDefault();
            sortOptions.forEach(o => o.classList.remove('active'));
            (e.target as HTMLElement).classList.add('active');
            if (sortLabel) {
              sortLabel.textContent = (e.target as HTMLElement).textContent;
            }
            setSort((e.target as HTMLElement).getAttribute('data-sort') || 'newest');
          };
          addTrackedEventListener(opt, 'click', handler);
        });
      };
      
      const getVisibleCards = () => {
        if (!blogCards) return [];
        return Array.from(blogCards).filter(card => card.classList.contains('filtered-in'));
      };
      
      const renderPagination = () => {
        const visibleCards = getVisibleCards();
        const totalPages = Math.max(1, Math.ceil(visibleCards.length / POSTS_PER_PAGE));
        const pagination = document.getElementById('blogPagination');
        
        console.log('Rendering pagination:', { visibleCards: visibleCards.length, totalPages, currentPage });
        
        if (!pagination) return;
        
        pagination.innerHTML = '';
        
        // Only show pagination if more than 1 page
        if (totalPages <= 1) return;
        
        // Prev button
        const prevLi = document.createElement('li');
        prevLi.className = 'page-item' + (currentPage <= 1 ? ' disabled' : '');
        prevLi.innerHTML = '<a class="page-link" href="#" aria-label="Previous"><span aria-hidden="true">&laquo;</span></a>';
        const prevHandler = (e: Event) => { 
          e.preventDefault(); 
          if (currentPage > 1) { 
            currentPage--; 
            showPage(); 
          } 
        };
        addTrackedEventListener(prevLi, 'click', prevHandler);
        pagination.appendChild(prevLi);
        
        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
          const li = document.createElement('li');
          li.className = 'page-item' + (i === currentPage ? ' active' : '');
          li.innerHTML = '<a class="page-link" href="#">' + i + '</a>';
          const pageHandler = (e: Event) => { 
            e.preventDefault(); 
            currentPage = i; 
            showPage(); 
          };
          addTrackedEventListener(li, 'click', pageHandler);
          pagination.appendChild(li);
        }
        
        // Next button
        const nextLi = document.createElement('li');
        nextLi.className = 'page-item' + (currentPage >= totalPages ? ' disabled' : '');
        nextLi.innerHTML = '<a class="page-link" href="#" aria-label="Next"><span aria-hidden="true">&raquo;</span></a>';
        const nextHandler = (e: Event) => { 
          e.preventDefault(); 
          if (currentPage < totalPages) { 
            currentPage++; 
            showPage(); 
          } 
        };
        addTrackedEventListener(nextLi, 'click', nextHandler);
        pagination.appendChild(nextLi);
      };
      
      const showPage = () => {
        const visibleCards = getVisibleCards();
        console.log('Showing page:', currentPage, 'Total visible cards:', visibleCards.length);
        
        // Show/hide cards based on current page
        visibleCards.forEach((card, idx) => {
          const shouldShow = idx >= (currentPage - 1) * POSTS_PER_PAGE && idx < currentPage * POSTS_PER_PAGE;
          (card as HTMLElement).style.display = shouldShow ? '' : 'none';
        });
        
        // Hide all non-filtered-in cards
        if (blogCards) {
          Array.from(blogCards).filter(card => !card.classList.contains('filtered-in')).forEach(card => {
            (card as HTMLElement).style.display = 'none';
          });
        }
        
        renderPagination();
      };
      
      const initializeBlog = () => {
        console.log('Attempting to initialize blog...');
        
        // Get DOM elements
        categoryButtons = document.querySelectorAll('.category-btn');
        blogCards = document.querySelectorAll('.blog-card-wrapper');
        
        console.log('Found elements:', {
          categoryButtons: categoryButtons.length,
          blogCards: blogCards.length
        });
        
        // Only proceed if we have the required elements
        if (!categoryButtons.length || !blogCards.length) {
          console.warn('Blog index elements not found, retrying...');
          // Retry after a short delay
          setTimeout(initializeBlog, 200);
          return;
        }
        
        // Reset state
        currentCategory = 'all';
        currentSort = 'newest';
        currentPage = 1;
        
        // Set initial active state for "All" button
        if (categoryButtons.length > 0) {
          categoryButtons[0].classList.add('active');
          console.log('Set active state on first button');
        }
        
        // Setup functionality
        setupCategoryButtons();
        setupSortOptions();
        
        // Initial filter, sort and pagination
        filterAndSortCards();
        showPage();
        
        console.log('Blog index initialized successfully');
      };
      
      // Initialize after DOM is ready and component has mounted
      const timeoutId = setTimeout(() => {
        // Double-check that we're still on the right page and elements exist
        if (document.querySelector('.blog-card-wrapper')) {
          initializeBlog();
        } else {
          console.warn('Blog elements not found after mount, retrying...');
          setTimeout(initializeBlog, 300);
        }
      }, 200);
      
      // Cleanup function
      return () => {
        console.log('Cleaning up blog functionality');
        clearTimeout(timeoutId);
        eventListeners.forEach(({ element, event, handler }) => {
          element.removeEventListener(event, handler);
        });
      };
    }
  }, []);

  return (
    <>
      <Head>
        <title>DSEBest Blog | 最新DSE考試資訊與學習資源</title>
        <meta name="description" content="DSEBest Blog - 提供最新DSE考試資訊、學習資源、溫習心得、考生經驗分享，助你掌握DSE動向。" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="DSEBest Blog | 最新DSE考試資訊與學習資源" />
        <meta property="og:description" content="DSEBest Blog - 提供最新DSE考試資訊、學習資源、溫習心得、考生經驗分享，助你掌握DSE動向。" />
        <meta property="og:image" content="https://dse.best/assets/images/logo-icon.webp" />
        <meta property="og:url" content="https://dse.best/blog/" />
        <meta property="og:type" content="website" />
        
        {/* Blog Index Styles */}
        <style dangerouslySetInnerHTML={{
          __html: `
            .blog-loading {
              opacity: 0;
              transition: opacity 0.3s ease-in-out;
            }
            .blog-loaded {
              opacity: 1;
            }
            
            /* Category Button Styles */
            .category-btn {
              background: rgba(255, 255, 255, 0.1);
              border: 1px solid rgba(255, 255, 255, 0.2);
              color: var(--bs-body-color);
              border-radius: 25px;
              padding: 8px 16px;
              margin: 4px;
              font-size: 0.9rem;
              transition: all 0.3s ease;
              white-space: nowrap;
            }
            
            .category-btn:hover {
              background: var(--bs-primary);
              border-color: var(--bs-primary);
              color: white;
              transform: translateY(-2px);
              box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
            }
            
            .category-btn.active {
              background: var(--bs-primary);
              border-color: var(--bs-primary);
              color: white;
              box-shadow: 0 4px 12px rgba(0, 123, 255, 0.3);
            }
            
            /* Blog Card Styles */
            .blog-card {
              transition: transform 0.3s ease, box-shadow 0.3s ease;
              border-radius: 1.5rem;
            }
            
            .blog-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
            }
            
            /* Filter Bar Styles */
            .filter-bar-card {
              backdrop-filter: blur(10px);
              background: rgba(255, 255, 255, 0.05);
              border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            /* Pagination Styles */
            .pagination .page-link {
              border-radius: 50%;
              margin: 0 2px;
              width: 40px;
              height: 40px;
              display: flex;
              align-items: center;
              justify-content: center;
              border: 1px solid rgba(255, 255, 255, 0.2);
              background: rgba(255, 255, 255, 0.1);
              color: var(--bs-body-color);
            }
            
            .pagination .page-item.active .page-link {
              background: var(--bs-primary);
              border-color: var(--bs-primary);
              color: white;
            }
            
            .pagination .page-link:hover {
              background: var(--bs-primary);
              border-color: var(--bs-primary);
              color: white;
            }
          `
        }} />
      </Head>

      <div className={`blog-loading ${isLoaded ? 'blog-loaded' : ''}`}>

      {/* Breadcrumb */}
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">Blog</div>
        <div className="ps-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 p-0">
              <li className="breadcrumb-item active" aria-current="page">
                主頁
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="card rounded-4" style={{ height: 'auto' }}>
        <div className="card-body">
          <h1>Blog</h1>
          <br />
          <p style={{ marginBottom: '0.7rem' }}>
            <strong>DSE.BEST</strong> 為香港中學文憑試（DSE）考生提供最全面、最實用的學習資源和最新考試資訊。無論你是準備核心科目還是選修科目，這裡都能找到歷屆試題、詳細答案、熱門溫習策略、考生經驗分享，以及專家撰寫的學習心得。<br />
            我們的目標是幫助你掌握DSE考試趨勢，提升溫習效率，並以輕鬆自信的心態迎戰公開試。<br />
            本網站每日更新，涵蓋最新DSE新聞、放榜資訊、JUPAS申請貼士、常見問題解答，以及各科重點難題分析。<br />
            立即瀏覽 DSE.BEST，與全港考生一同進步，邁向理想成績！
          </p>
          <hr className="my-4" style={{ marginTop: '0.7rem', marginBottom: '1.2rem' }} />

          {/* Filter/Sort Bar Card (Transparent) */}
          <div className="card mb-4 px-3 py-2 filter-bar-card" style={{ borderRadius: '1.5rem', background: 'transparent' }}>
            <div className="filter-bar-inner d-flex align-items-center justify-content-between gap-2 w-100" style={{ background: 'none !important' }}>
              
              {/* Category Buttons Wrapper */}
              <div className="d-flex align-items-center flex-grow-1 flex-wrap gap-2 category-sorter">
                <button className="btn category-btn" data-category="all" type="button">全部 All</button>
                <button className="btn category-btn" data-category="DSE News" type="button">DSE News</button>
                <button className="btn category-btn" data-category="Chinese" type="button">中文 Chinese</button>
                <button className="btn category-btn" data-category="English" type="button">英文 English</button>
                <button className="btn category-btn" data-category="Maths" type="button">數學 Maths</button>
                <button className="btn category-btn" data-category="CSD" type="button">公民 CSD</button>
                <button className="btn category-btn" data-category="Physics" type="button">物理 Physics</button>
                <button className="btn category-btn" data-category="Chemistry" type="button">化學 Chemistry</button>
                <button className="btn category-btn" data-category="Biology" type="button">生物 Biology</button>
                <button className="btn category-btn" data-category="ICT" type="button">資訊 ICT</button>
                <button className="btn category-btn" data-category="M1" type="button">M1</button>
                <button className="btn category-btn" data-category="M2" type="button">M2</button>
                <button className="btn category-btn" data-category="Geography" type="button">地理 Geography</button>
                <button className="btn category-btn" data-category="History" type="button">歷史 History</button>
                <button className="btn category-btn" data-category="Chinese History" type="button">中國歷史 Chinese History</button>
                <button className="btn category-btn" data-category="Economics" type="button">經濟 Economics</button>
                <button className="btn category-btn" data-category="BAFS" type="button">企會財 BAFS</button>
                <button className="btn category-btn" data-category="Visual Arts" type="button">視藝 Visual Arts</button>
              </div>
              <br />
              
              {/* Sort Dropdown Wrapper */}
              <div className="dropdown">
                <button className="btn btn-primary rounded-pill px-4 shadow-sm dropdown-toggle sort-dropdown" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <span id="sortLabel">Newest</span>
                </button>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item sort-option active" href="#" data-sort="newest">Newest</a></li>
                  <li><a className="dropdown-item sort-option" href="#" data-sort="oldest">Oldest</a></li>
                  <li><a className="dropdown-item sort-option" href="#" data-sort="popular">Popular</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Reduced or removed spacer for mobile, keep for desktop only */}
          <div className="filter-bar-spacer d-none d-md-block" style={{ height: '20px', clear: 'both' }}></div>

          {/* Blog Cards Container */}
          <div className="container my-4">
            <div className="row g-4 mb-5 align-items-stretch" id="blogCardRow">
              {(() => {
                console.log('Rendering blog cards, total posts:', posts.length);
                return posts.length === 0 ? (
                  <div className="col-12">
                    <div className="alert alert-info">
                      No blog posts found. Check the data/blog-index.json file.
                    </div>
                  </div>
                ) : (
                  posts.map((post, index) => {
                    console.log(`Rendering post ${index + 1}:`, post.title, 'Category:', post.category);
                    const categoryColorClass = getCategoryColorClass(post.category);
                    const categoryColorCode = getCategoryColorCode(post.category);
                    const categoryTextColor = getCategoryTextColor(post.category);
                    const categoryDisplayName = getCategoryDisplayName(post.category);
                    
                    // Get featured image or fallback
                    let featuredImageUrl;
                    if (post.featuredImage) {
                      featuredImageUrl = post.featuredImage;
                    } else {
                      const categoryName = post.category || 'Uncategorized';
                      featuredImageUrl = `https://dummyimage.com/200x200/${categoryColorCode}/${categoryTextColor}&text=${encodeURIComponent(categoryName)}`;
                    }

                    return (
                      <div 
                        key={post.id} 
                        className="col-12 blog-card-wrapper" 
                        data-category={post.category || 'Uncategorized'}
                        data-date={post.date}
                        data-popularity="50"
                        suppressHydrationWarning={true}
                      >
                        <NavigationLink href={`/blog/${post.slug}`} className="text-decoration-none">
                          <div className="card blog-card border-0 shadow position-relative mb-3 h-100" style={{ cursor: 'pointer', alignItems: 'stretch' }}>
                            <div className="position-absolute top-0 start-0 w-100" style={{ height: '6px', borderRadius: '1.5rem 1.5rem 0 0', zIndex: 2 }}>
                              <div className={`${categoryColorClass} w-100 h-100`} style={{ borderRadius: '1.5rem 1.5rem 0 0' }}></div>
                            </div>
                            <img src={featuredImageUrl} className="img-fluid blog-card-img h-100" alt={post.category || 'Uncategorized'} />
                            <div className="card-body blog-card-body" style={{ zIndex: 1 }}>
                              <span className={`badge ${categoryColorClass.replace('bg-', 'bg-')} mb-2`} style={{ fontSize: '0.9rem', padding: '0.4em 0.6em' }}>
                                {categoryDisplayName}
                              </span>
                              <h2 className="card-title blog-card-title mb-2">{post.title}</h2>
                              <div className="d-flex blog-meta mb-2 flex-wrap">
                                <span className="blog-meta-item d-flex align-items-center">
                                  <BiUserCircle className="me-1" style={{ fontSize: '1.1em', verticalAlign: 'text-bottom' }} />
                                  {post.author || 'DSEBest'}
                                </span>
                                <span className="blog-meta-item d-flex align-items-center">
                                  <BiCalendarEvent className="me-1" style={{ fontSize: '1.1em', verticalAlign: 'text-bottom' }} />
                                  {post.date}
                                </span>
                                <span className="blog-meta-item d-flex align-items-center">
                                  <BiTimeFive className="me-1" style={{ fontSize: '1.1em', verticalAlign: 'text-bottom' }} />
                                  {post.readingTime ? post.readingTime + ' min' : ''}
                                </span>
                                {post.comments ? (
                                  <span className="blog-meta-item d-flex align-items-center">
                                    <BiComment className="me-1" style={{ fontSize: '1.1em', verticalAlign: 'text-bottom' }} />
                                    <span className="disqus-comment-count" data-disqus-identifier={post.slug}>0</span>
                                  </span>
                                ) : null}
                              </div>
                              <p className="card-text mb-1">{post.excerpt}</p>
                            </div>
                          </div>
                        </NavigationLink>
                      </div>
                    );
                  })
                );
              })()}
            </div>

            {/* Pagination */}
            <nav aria-label="Blog pagination" className="d-flex justify-content-center mt-4">
              <ul className="pagination justify-content-center" id="blogPagination" suppressHydrationWarning={true}>
                {/* Pagination items will be injected by JS */}
              </ul>
            </nav>
          </div>

          {posts.length === 0 && (
            <div className="text-center py-5">
              <BiFileBlank className="display-1 text-muted" />
              <h3 className="mt-3 text-muted">暫無文章</h3>
              <p className="text-muted">請稍後再來查看最新內容</p>
            </div>
          )}
        </div>
      </div>
      </div>
    </>
  )
}

export async function getStaticProps(): Promise<{ props: BlogIndexProps }> {
  try {
    // Read from static JSON file generated at build time
    const dataPath = path.join(process.cwd(), 'data', 'blog-index.json');
    const posts = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    return {
      props: {
        posts
      }
    };
  } catch (error) {
    console.error('Error loading blog data:', error);
    return {
      props: {
        posts: []
      }
    };
  }
}
