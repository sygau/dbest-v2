import { BiCalendarEvent, BiFileBlank, BiSort, BiShow, BiTimeFive, BiSearch } from 'react-icons/bi';
import { GetStaticProps } from 'next'
import fs from 'fs'
import path from 'path'
import { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import NavigationLink from '../../components/NavigationLink'
import PageBreadcrumb from '../../components/PageBreadcrumb'
import DefaultThumb from '../../components/DefaultThumb'
import { buildBlogJsonLd } from '../../data/jsonld/pages'
import PageSEO from '../../components/PageSEO';

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
  indexPageVis: boolean;
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
function BlogCard({ post, index, viewCount, isLoadingCounts, priority}: { post: BlogPost, index: number, viewCount: number | undefined, isLoadingCounts: boolean, priority?: boolean   }) {
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
          {post.featuredImage ? (
            <Image
              src={post.featuredImage}
              alt={post.title}
              fill
              priority={priority}
              sizes="(max-width: 767px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{
                objectFit: 'cover',
                transition: 'transform 0.3s ease'
              }}
            />
          ) : (
            <DefaultThumb title={post.title} subtitle={category.label} color={category.color} />
          )}
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
            border: '2px solid rgba(255, 255, 255, 0.5)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.25), 0 2px 4px rgba(0, 0, 0, 0.15)',
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
            overflowWrap: 'anywhere',
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
            overflowWrap: 'anywhere',
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
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <BiShow style={{ fontSize: '12px' }} />
              {isLoadingCounts ? (
                <span className="blog-skeleton" style={{ display: 'inline-block', height: '12px', width: '28px', borderRadius: '6px' }} />
              ) : (
                (viewCount || 0)
              )}
            </span>
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
      }} className="hidden md:flex">
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
      <div className="block md:hidden">
        {/* Category Section - Native Select for mobile */}
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
          
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid var(--bs-border-color, #e5e7eb)',
              background: 'var(--bs-card-bg, #ffffff)',
              color: 'var(--bs-body-color, #374151)',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: 'pointer',
              appearance: 'auto'
            }}
          >
            {CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
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
          color: currentPage === 1 ? '#9ca3af' : 'var(--bs-body-color, #374151)',
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
            color: page === currentPage ? '#fff' : 'var(--bs-body-color, #374151)',
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
          color: currentPage === totalPages ? '#9ca3af' : 'var(--bs-body-color, #374151)',
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
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedSort, setSelectedSort] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({});
  const [isLoadingCounts, setIsLoadingCounts] = useState(false);
  const postsPerPage = 6; // Show 6 posts per page

  // Fetch all view counts on mount (cached for the session)
  useEffect(() => {
    const fetchViewCounts = async () => {
      // Check if we already have cached counts in sessionStorage
      const cached = sessionStorage.getItem('blogViewCounts');
      const cacheTime = sessionStorage.getItem('blogViewCountsTime');
      const now = Date.now();
      
      // Use cache if it's less than 5 minutes old
      if (cached && cacheTime && (now - parseInt(cacheTime)) < 5 * 60 * 1000) {
        setViewCounts(JSON.parse(cached));
        return;
      }

      setIsLoadingCounts(true);
      try {
        const maxPostsForCounts = 100;
        const slugList = [...posts]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, maxPostsForCounts)
          .map(p => p.slug);
        const chunkSize = 80;
        const mergedCounts: Record<string, number> = {};

        for (let i = 0; i < slugList.length; i += chunkSize) {
          const chunk = slugList.slice(i, i + chunkSize);
          const slugs = chunk.join(',');
          const response = await fetch(`https://api-v2.dse.best/view-count?slugs=${encodeURIComponent(slugs)}`);

          if (response.ok) {
            const data = await response.json();
            const counts = data.counts || {};
            Object.assign(mergedCounts, counts);
          }
        }

        setViewCounts(mergedCounts);

        // Cache the results
        sessionStorage.setItem('blogViewCounts', JSON.stringify(mergedCounts));
        sessionStorage.setItem('blogViewCountsTime', now.toString());
      } catch (error) {
        console.error('Failed to fetch view counts:', error);
      } finally {
        setIsLoadingCounts(false);
      }
    };

    fetchViewCounts();
  }, [posts]);

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
          // Sort by view count (descending)
          const countA = viewCounts[a.slug] || 0;
          const countB = viewCounts[b.slug] || 0;
          if (countB !== countA) return countB - countA;
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        default:
          return 0;
      }
    });
    
    return sorted;
  }, [posts, selectedCategory, selectedSort, searchQuery, viewCounts]);

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
      <PageSEO
        title="dse.best Blog | 學習資源、考試技巧、溫習策略、心得分享"
        description="DSE Blog 提供2025、2026 DSE考試資訊、中文英文數學物理化學生物ICT M1 M2歷屆試題分析、溫習技巧、考生心得、JUPAS選科攻略、放榜資訊。最新DSE動向、考試趨勢、備考策略、科目指南。"
        ogTitle="dse.best Blog | 學習資源、考試技巧、溫習策略、心得分享"
        ogDescription="DSE Blog 提供2025、2026 DSE考試資訊、中文英文數學物理化學生物ICT M1 M2歷屆試題分析、溫習技巧、考生心得、JUPAS選科攻略、放榜資訊。"
        ogUrl="https://dse.best/blog"
        robots={['index', 'follow']}
        pageKey="blog"
        jsonLd={[buildBlogJsonLd(posts)]}
      />

      {/*breadcrumb*/}
      <PageBreadcrumb section="其他" text="Blog" />
      {/*end breadcrumb*/}

      <div className="card rounded-4" style={{ height: "auto" }}>
        <div className="card-body">
          <div className="blog-container">
            {/* Custom Blog Header Section */}
            <div style={{
              textAlign: 'center',
              padding: '30px 20px',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              <h1 className="blog-header-title" style={{
                marginBottom: '24px',
                color: '#667eea'
              }}>
                Blog
              </h1>
              <p className="blog-header-description" style={{
                color: 'var(--bs-body-color, #6b7280)',
                marginBottom: '0',
                textAlign: 'center'
              }}>
                <strong>dse.best</strong> 為香港中學文憑試（DSE）考生提供最全面的學習資源和最新考試資訊，包括歷屆試題、詳細答案、溫習策略和心得分享。
              </p>
            </div>

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
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px',
              marginBottom: '40px',
              maxWidth: '1200px',
              margin: '0 auto'
            }} className="blog-grid-container">
              {currentPosts.map((post, index) => (
                <BlogCard 
                  key={post.id} 
                  post={post} 
                  index={index} 
                  priority={index < 2 && currentPage === 1}
                  viewCount={viewCounts[post.slug]} 
                  isLoadingCounts={isLoadingCounts}
                />
              ))}
            </div>

            <style jsx>{`
              .blog-grid-container {
                display: grid !important;
                grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)) !important;
                gap: 24px !important;
                max-width: 1200px !important;
                margin: 0 auto 40px auto !important;
              }

              .blog-skeleton {
                background: linear-gradient(
                  90deg,
                  rgba(148, 163, 184, 0.18) 25%,
                  rgba(148, 163, 184, 0.32) 37%,
                  rgba(148, 163, 184, 0.18) 63%
                );
                background-size: 400% 100%;
                animation: blogShimmer 1.2s ease-in-out infinite;
              }

              @keyframes blogShimmer {
                0% { background-position: 100% 0; }
                100% { background-position: -100% 0; }
              }
              
              @media (max-width: 767px) {
                .blog-grid-container {
                  grid-template-columns: 1fr !important;
                  gap: 20px !important;
                }
              }
              
              @media (min-width: 768px) and (max-width: 991px) {
                .blog-grid-container {
                  grid-template-columns: repeat(2, 1fr) !important;
                }
              }
              
              @media (min-width: 992px) {
                .blog-grid-container {
                  grid-template-columns: repeat(3, 1fr) !important;
                }
              }
            `}</style>

            {/* No Results */}
            {currentPosts.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'var(--bs-body-color, #6b7280)',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                <BiFileBlank style={{ fontSize: '64px', marginBottom: '16px', opacity: 0.5 }} />
                <h3 style={{ margin: '0 0 8px 0', fontSize: '1.4rem', fontFamily: "var(--font-noto-sans-hk), sans-serif" }}>
                  {searchQuery.trim() ? '找不到相關文章' : '暫無文章'}
                </h3>
                <p style={{ margin: '0', fontSize: '1rem', fontFamily: "var(--font-noto-sans-hk), sans-serif" }}>
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
        posts: posts.filter(post => post.indexPageVis !== false)
      },
      // revalidate: 3600 // Revalidate every hour - commented out for static export compatibility
    };
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return {
      props: {
        posts: []
      },
      // revalidate: 3600 // Revalidate every hour - commented out for static export compatibility
    };
  }
};
