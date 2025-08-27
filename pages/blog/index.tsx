import Head from 'next/head'
import { BiUserCircle, BiCalendarEvent, BiFileBlank, BiSort, BiShow, BiFilter, BiChevronDown, BiTimeFive, BiComment, BiSearch } from 'react-icons/bi';
import { GetStaticProps } from 'next'
import fs from 'fs'
import path from 'path'
import { useEffect, useState, useMemo } from 'react'
import NavigationLink from '../../components/NavigationLink'
import { generateBlogStructuredData, generatePageFAQStructuredData } from '../../utils/structuredData'
import { getMainPageMetadata } from '../../utils/structuredData';
import { useViewCount } from '@/hooks/useViewCount';

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

// Category configuration
const CATEGORIES = [
  { value: 'all', label: '全部 All', color: '#5b5fc7' },
  { value: 'DSE News', label: 'DSE News', color: '#ff6b35' },
  { value: 'Chinese', label: '中文 Chinese', color: '#d81b60' },
  { value: 'English', label: '英文 English', color: '#00acc1' },
  { value: 'Maths', label: '數學 Maths', color: '#fb8c00' },
  { value: 'CSD', label: '公民 CSD', color: '#8e24aa' },
  { value: 'Physics', label: '物理 Physics', color: '#ffd600' },
  { value: 'Chemistry', label: '化學 Chemistry', color: '#2e7d32' },
  { value: 'Biology', label: '生物 Biology', color: '#1565c0' },
  { value: 'ICT', label: '資訊 ICT', color: '#37474f' },
  { value: 'M1', label: 'M1', color: '#673ab7' },
  { value: 'M2', label: 'M2', color: '#00796b' },
  { value: 'Geography', label: '地理 Geography', color: '#0288d1' },
  { value: 'History', label: '歷史 History', color: '#795548' },
  { value: 'Chinese History', label: '中國歷史 Chinese History', color: '#b71c1c' },
  { value: 'Economics', label: '經濟 Economics', color: '#546e7a' },
  { value: 'BAFS', label: '企會財 BAFS', color: '#ff8f00' },
  { value: 'Visual Arts', label: '視藝 Visual Arts', color: '#0277bd' },
];

const SORT_OPTIONS = [
  { value: 'newest', label: '最新 Newest' },
  { value: 'oldest', label: '最舊 Oldest' },
  { value: 'popular', label: '熱門 Popular' },
];

// Individual blog card component
function BlogCard({ post, index }: { post: BlogPost, index: number }) {
  const { viewCount, isLoading } = useViewCount(post.slug);
  const [imageUrl, setImageUrl] = useState<string>('');
  
  // Update image URL when zoom level changes
  useEffect(() => {
    const updateImageUrl = () => {
      if (!post.featuredImage) {
        const categoryName = post.category || 'Uncategorized';
        const textColor = category.value === 'Physics' || category.value === 'BAFS' ? '000000' : 'ffffff';
        const colorCode = category.color.replace('#', '');
        
        // Adaptive resolution based on device pixel ratio and zoom level
        const pixelRatio = window.devicePixelRatio || 1;
        const zoomLevel = window.visualViewport?.scale || 1;
        const effectiveScale = pixelRatio * zoomLevel;
        
        // Calculate responsive dimensions
        const baseWidth = Math.round(400 * effectiveScale);
        const baseHeight = Math.round(250 * effectiveScale);
        
        setImageUrl(`https://dummyimage.com/${baseWidth}x${baseHeight}/${colorCode}/${textColor}&text=${encodeURIComponent(categoryName)}`);
      } else {
        setImageUrl(post.featuredImage);
      }
    };

    updateImageUrl();

    // Listen for zoom level changes
    const handleResize = () => {
      updateImageUrl();
    };

    window.addEventListener('resize', handleResize);
    if (window.visualViewport) {
      window.visualViewport.addEventListener('resize', handleResize);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (window.visualViewport) {
        window.visualViewport.removeEventListener('resize', handleResize);
      }
    };
  }, [post.featuredImage, post.category]);
  
  const category = CATEGORIES.find(cat => cat.value === post.category) || CATEGORIES[0];
  


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-HK', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <NavigationLink href={`/blog/${post.slug}`} style={{
      textDecoration: 'none',
      color: 'inherit',
      display: 'block',
      height: '100%',
      width: '100%'
    }}>
      <article className="blog-card" style={{
        background: 'var(--bs-card-bg, #ffffff)',
        borderRadius: '16px',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
        transition: 'all 0.3s ease',
        border: '1px solid var(--bs-border-color, #e5e7eb)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        width: '100%',
        maxWidth: '100%',
        boxSizing: 'border-box'
      }}>
        {/* Image Section */}
        <div className="blog-card-image" style={{
          position: 'relative',
          height: '200px',
          flexShrink: 0,
          width: '100%',
          borderTopLeftRadius: '16px',
          borderTopRightRadius: '16px',
          overflow: 'hidden'
        }}>
          <img 
            src={imageUrl} 
            alt={post.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              display: 'block'
            }}
            onError={(e) => {
              // Fallback to a simpler dummy image if the main one fails
              const target = e.target as HTMLImageElement;
              const categoryName = post.category || 'Uncategorized';
              const textColor = category.value === 'Physics' || category.value === 'BAFS' ? '000000' : 'ffffff';
              const colorCode = category.color.replace('#', '');
              target.src = `https://dummyimage.com/400x250/${colorCode}/${textColor}&text=${encodeURIComponent(categoryName)}`;
            }}
          />
          {/* Category Badge */}
          <div className="blog-card-category" style={{
            position: 'absolute',
            top: '12px',
            left: '12px',
            background: category.color,
            color: category.value === 'Physics' || category.value === 'BAFS' ? '#000' : '#fff',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.75rem',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            zIndex: 2,
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
            backdropFilter: 'blur(4px)'
          }}>
            {category.label}
          </div>
        </div>
        
        {/* Content Section */}
        <div className="blog-card-content" style={{
          padding: '16px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0,
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* Title */}
          <h3 className="blog-card-title" style={{
            fontSize: '1.1rem',
            fontWeight: '700',
            lineHeight: '1.4',
            margin: '0 0 8px 0',
            color: 'var(--bs-heading-color, #1f2937)',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            wordWrap: 'break-word',
            wordBreak: 'break-word'
          }}>
            {post.title}
          </h3>
          
          {/* Excerpt */}
          <p className="blog-card-excerpt" style={{
            fontSize: '0.85rem',
            lineHeight: '1.5',
            color: 'var(--bs-body-color, #6b7280)',
            margin: '0 0 12px 0',
            flex: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: 0,
            wordWrap: 'break-word',
            wordBreak: 'break-word'
          }}>
            {post.excerpt || post.content.substring(0, 120) + '...'}
          </p>
          
          {/* Meta Info - All three items */}
          <div className="blog-card-meta" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '0.75rem',
            color: 'var(--bs-body-color, #9ca3af)',
            marginTop: 'auto',
            flexWrap: 'wrap',
            flexShrink: 0
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <BiCalendarEvent style={{ fontSize: '12px' }} />
              {formatDate(post.date)}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <BiTimeFive style={{ fontSize: '12px' }} />
              {post.readingTime || Math.ceil(post.content.length / 500)}m
            </span>
            {!isLoading && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <BiShow style={{ fontSize: '12px' }} />
                {viewCount || 0}
              </span>
            )}
            {post.comments && (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <BiComment style={{ fontSize: '12px' }} />
                <a 
                  href={`/blog/${post.slug}#disqus_thread`}
                  data-disqus-identifier={post.slug}
                  style={{ 
                    color: 'inherit', 
                    textDecoration: 'none',
                    fontSize: 'inherit'
                  }}
                >
                  0
                </a>
              </span>
            )}
          </div>
        </div>
      </article>
    </NavigationLink>
  );
}

// Filter and Sort Bar Component
function FilterSortBar({ 
  selectedCategory, 
  onCategoryChange, 
  selectedSort, 
  onSortChange,
  searchQuery,
  onSearchChange
}: {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  selectedSort: string;
  onSortChange: (sort: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);

  return (
    <div className="filter-sort-bar" style={{
      background: 'var(--bs-card-bg, #ffffff)',
      borderRadius: '12px',
      padding: '12px',
      marginBottom: '20px',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)',
      border: '1px solid var(--bs-border-color, #e5e7eb)'
    }}>
      {/* Desktop Layout */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: '12px'
      }} className="d-none d-md-flex">
        {/* Category Filter */}
        <div style={{ flex: 1 }}>
          <label style={{
            display: 'block',
            fontSize: '0.75rem',
            fontWeight: '600',
            color: 'var(--bs-body-color, #374151)',
            marginBottom: '6px'
          }}>
            分類 Categories
          </label>
          
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px'
          }}>
            {CATEGORIES.map((category) => (
              <button
                key={category.value}
                onClick={() => onCategoryChange(category.value)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '16px',
                  border: selectedCategory === category.value ? '2px solid' + category.color : '2px solid var(--bs-border-color, #e5e7eb)',
                  background: selectedCategory === category.value ? category.color : 'var(--bs-card-bg, #ffffff)',
                  color: selectedCategory === category.value 
                    ? (category.value === 'Physics' || category.value === 'BAFS' ? '#000' : '#fff')
                    : 'var(--bs-body-color, #374151)',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap'
                }}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Controls */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
          {/* Sort Dropdown */}
          <div style={{ position: 'relative' }}>
            <label style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: 'var(--bs-body-color, #374151)',
              marginBottom: '4px'
            }}>
              排序 Sort
            </label>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid var(--bs-border-color, #e5e7eb)',
                background: 'var(--bs-card-bg, #ffffff)',
                color: 'var(--bs-body-color, #374151)',
                fontSize: '0.8rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                minWidth: '120px'
              }}
            >
              <BiSort style={{ fontSize: '14px' }} />
              {SORT_OPTIONS.find(option => option.value === selectedSort)?.label}
            </button>
            
            {isDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'var(--bs-card-bg, #ffffff)',
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                border: '1px solid var(--bs-border-color, #e5e7eb)',
                zIndex: 1000,
                marginTop: '2px'
              }}>
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onSortChange(option.value);
                      setIsDropdownOpen(false);
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '8px 12px',
                      border: 'none',
                      background: 'transparent',
                      color: selectedSort === option.value ? 'var(--bs-primary, #3b82f6)' : 'var(--bs-body-color, #374151)',
                      fontSize: '0.8rem',
                      fontWeight: selectedSort === option.value ? '600' : '400',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.2s ease'
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="d-block d-md-none">
        {/* Category Section - Horizontal */}
        <div style={{ marginBottom: '12px' }}>
          <label style={{
            display: 'block',
            fontSize: '0.75rem',
            fontWeight: '600',
            color: 'var(--bs-body-color, #374151)',
            marginBottom: '6px'
          }}>
            分類 Categories
          </label>
          
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid var(--bs-border-color, #e5e7eb)',
                background: 'var(--bs-card-bg, #ffffff)',
                color: 'var(--bs-body-color, #374151)',
                fontSize: '0.8rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                width: '100%',
                justifyContent: 'space-between'
              }}
            >
              <span>
                {CATEGORIES.find(cat => cat.value === selectedCategory)?.label || 'Select Category'}
              </span>
              <BiChevronDown style={{ fontSize: '14px' }} />
            </button>
            
            {isCategoryDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'var(--bs-card-bg, #ffffff)',
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                border: '1px solid var(--bs-border-color, #e5e7eb)',
                zIndex: 1000,
                marginTop: '2px',
                maxHeight: '200px',
                overflowY: 'auto'
              }}>
                {CATEGORIES.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => {
                      onCategoryChange(category.value);
                      setIsCategoryDropdownOpen(false);
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '8px 12px',
                      border: 'none',
                      background: 'transparent',
                      color: selectedCategory === category.value ? 'var(--bs-primary, #3b82f6)' : 'var(--bs-body-color, #374151)',
                      fontSize: '0.8rem',
                      fontWeight: selectedCategory === category.value ? '600' : '400',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.2s ease'
                    }}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sort Section - Mobile Only */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          gap: '12px'
        }}>
          {/* Sort Dropdown */}
          <div style={{ position: 'relative', flex: 1 }}>
            <label style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: '600',
              color: 'var(--bs-body-color, #374151)',
              marginBottom: '4px'
            }}>
              排序 Sort
            </label>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid var(--bs-border-color, #e5e7eb)',
                background: 'var(--bs-card-bg, #ffffff)',
                color: 'var(--bs-body-color, #374151)',
                fontSize: '0.8rem',
                fontWeight: '500',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                width: '100%'
              }}
            >
              <BiSort style={{ fontSize: '14px' }} />
              {SORT_OPTIONS.find(option => option.value === selectedSort)?.label}
            </button>
            
            {isDropdownOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: 'var(--bs-card-bg, #ffffff)',
                borderRadius: '8px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
                border: '1px solid var(--bs-border-color, #e5e7eb)',
                zIndex: 1000,
                marginTop: '2px'
              }}>
                {SORT_OPTIONS.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      onSortChange(option.value);
                      setIsDropdownOpen(false);
                    }}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '8px 12px',
                      border: 'none',
                      background: 'transparent',
                      color: selectedSort === option.value ? 'var(--bs-primary, #3b82f6)' : 'var(--bs-body-color, #374151)',
                      fontSize: '0.8rem',
                      fontWeight: selectedSort === option.value ? '600' : '400',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'background 0.2s ease'
                    }}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar - Below Category and Sort Controls */}
      <div style={{
        marginTop: '12px',
        paddingTop: '12px',
        borderTop: '1px solid var(--bs-border-color, #e5e7eb)'
      }}>
        <div style={{
          position: 'relative',
          width: '100%'
        }}>
          <BiSearch style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: '16px',
            color: 'var(--bs-body-color, #9ca3af)',
            zIndex: 1
          }} />
          <input
            type="text"
            placeholder="搜尋文章... Search posts..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px 10px 40px',
              borderRadius: '8px',
              border: '1px solid var(--bs-border-color, #e5e7eb)',
              background: 'var(--bs-card-bg, #ffffff)',
              color: 'var(--bs-body-color, #374151)',
              fontSize: '0.875rem',
              outline: 'none',
              transition: 'border-color 0.2s ease, box-shadow 0.2s ease'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--bs-primary, #3b82f6)';
              e.target.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'var(--bs-border-color, #e5e7eb)';
              e.target.style.boxShadow = 'none';
            }}
          />
        </div>
      </div>
    </div>
  );
}

// Pagination Component
function Pagination({ 
  currentPage, 
  totalPages, 
  onPageChange 
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: '8px',
      marginTop: '40px'
    }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{
          padding: '10px 16px',
          borderRadius: '12px',
          border: '2px solid var(--bs-border-color, #e5e7eb)',
          background: 'var(--bs-card-bg, #ffffff)',
          color: currentPage === 1 ? 'var(--bs-body-color, #9ca3af)' : 'var(--bs-heading-color, #1f2937)',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          fontSize: '0.875rem',
          fontWeight: '600'
        }}
      >
        Previous
      </button>
      
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          style={{
            padding: '10px 16px',
            borderRadius: '12px',
            border: page === currentPage ? '2px solid var(--bs-primary, #3b82f6)' : '2px solid var(--bs-border-color, #e5e7eb)',
            background: page === currentPage ? 'var(--bs-primary, #3b82f6)' : 'var(--bs-card-bg, #ffffff)',
            color: page === currentPage ? '#fff' : 'var(--bs-heading-color, #1f2937)',
            cursor: page === '...' ? 'default' : 'pointer',
            transition: 'all 0.2s ease',
            fontSize: '0.875rem',
            fontWeight: '600',
            minWidth: '44px'
          }}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{
          padding: '10px 16px',
          borderRadius: '12px',
          border: '2px solid var(--bs-border-color, #e5e7eb)',
          background: 'var(--bs-card-bg, #ffffff)',
          color: currentPage === totalPages ? 'var(--bs-body-color, #9ca3af)' : 'var(--bs-heading-color, #1f2937)',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          transition: 'all 0.2s ease',
          fontSize: '0.875rem',
          fontWeight: '600'
        }}
      >
        Next
      </button>
    </div>
  );
}

// Main Blog Index Component
export default function BlogIndex({ posts }: BlogIndexProps) {
  const metadata = getMainPageMetadata('blog');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6; // Show 6 posts per page

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts;
    
    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = posts.filter(post => post.category === selectedCategory);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter(post => 
        post.title.toLowerCase().includes(query) ||
        post.seoDescription.toLowerCase().includes(query) ||
        post.tags.some(tag => tag.toLowerCase().includes(query)) ||
        post.category.toLowerCase().includes(query)
      );
    }
    
    // Sort posts
    const sorted = [...filtered].sort((a, b) => {
      switch (selectedSort) {
        case 'newest':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'oldest':
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case 'popular':
          // For now, sort by date as popularity data isn't available
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        default:
          return 0;
      }
    });
    
    return sorted;
  }, [posts, selectedCategory, selectedSort, searchQuery]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);
  const currentPosts = filteredAndSortedPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, selectedSort, searchQuery]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      // This will be handled by the dropdown component
    };
    
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <Head>
        <title>{metadata?.title}</title>
        <meta name="description" content={metadata?.description} />
        <meta name="robots" content={metadata?.robots} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metadata?.ogTitle} />
        <meta property="og:description" content={metadata?.ogDescription} />
        <meta property="og:image" content={metadata?.ogImage} />
        <meta property="og:url" content={metadata?.ogUrl} />
        <meta property="og:type" content={metadata?.ogType} />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateBlogStructuredData(posts))
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generatePageFAQStructuredData('blog'))
          }}
        />
      </Head>

      {/* Disqus Comment Count Script */}
      <script 
        id="dsq-count-scr" 
        src="https://dsebest.disqus.com/count.js" 
        async
      />

      {/*breadcrumb*/}
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">其他</div>
        <div className="ps-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 p-0">
              <li className="breadcrumb-item active" aria-current="page">
                Blog
              </li>
            </ol>
          </nav>
        </div>
      </div>
      {/*end breadcrumb*/}

      <div className="card rounded-4" style={{ height: "auto" }}>
        <div className="card-body">
          {/* Custom Blog Header Section */}
          <div style={{
            textAlign: 'center',
            padding: '20px 20px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            <h1 style={{
              fontSize: '2.5rem',
              fontWeight: '700',
              marginBottom: '24px',
              lineHeight: '1.2',
              color: '#667eea'
            }}>
              Blog
            </h1>
            <p style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              color: 'var(--bs-body-color, #6b7280)',
              marginBottom: '0',
              textAlign: 'center'
            }}>
              <strong>DSE.BEST</strong> 為香港中學文憑試（DSE）考生提供最全面的學習資源和最新考試資訊，包括歷屆試題、詳細答案、溫習策略和心得分享。
            </p>
          </div>
          <hr className="my-4" style={{ marginTop: '0rem !important', marginBottom: '0.2rem !important' }} />

          {/* Filter and Sort Bar */}
          <FilterSortBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedSort={selectedSort}
            onSortChange={setSelectedSort}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Blog Posts Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '40px',
            width: '100%',
            maxWidth: '100%',
            boxSizing: 'border-box'
          }} className="blog-grid-container">
            {currentPosts.map((post, index) => (
              <BlogCard key={post.id} post={post} index={index} />
            ))}
          </div>

          <style jsx>{`
            .blog-grid-container {
              display: grid !important;
              grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)) !important;
              max-width: 1200px !important;
              margin: 0 auto !important;
            }
            
            @media (min-width: 768px) {
              .blog-grid-container {
                grid-template-columns: repeat(3, 1fr) !important;
                justify-items: center !important;
              }
              
              .blog-grid-container > * {
                width: 320px !important;
                max-width: 320px !important;
              }
            }
            
            @media (max-width: 767px) {
              .blog-grid-container {
                grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)) !important;
              }
            }
          `}</style>

          {/* No Results */}
          {currentPosts.length === 0 && (
            <div style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: 'var(--bs-body-color, #6b7280)'
            }}>
              <BiFileBlank style={{ fontSize: '64px', marginBottom: '16px', opacity: 0.5 }} />
              <h3 style={{ margin: '0 0 8px 0', fontSize: '1.25rem' }}>
                {searchQuery.trim() ? '找不到相關文章' : '暫無文章'}
              </h3>
              <p style={{ margin: '0', fontSize: '0.875rem' }}>
                {searchQuery.trim() 
                  ? `沒有找到包含 "${searchQuery}" 的文章，請嘗試其他關鍵字`
                  : '請稍後再來查看最新內容'
                }
              </p>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'blog-index.json');
    const jsonData = fs.readFileSync(dataPath, 'utf8');
    const posts: BlogPost[] = JSON.parse(jsonData);

    return {
      props: {
        posts: posts.filter(post => post.index !== false)
      },
      revalidate: 3600 // Revalidate every hour
    };
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return {
      props: {
        posts: []
      },
      revalidate: 3600
    };
  }
};
