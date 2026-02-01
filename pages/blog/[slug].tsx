import Head from 'next/head'
import { BiCategory, BiUserCircle, BiCalendarEvent, BiTimeFive, BiShow, BiComment, BiListUl, BiArrowBack } from 'react-icons/bi';
import { GetStaticProps, GetStaticPaths } from 'next'
import { useEffect, useState, useCallback } from 'react'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import NavigationLink from '../../components/NavigationLink'
import { useViewCount } from '@/hooks/useViewCount'

// Extend Window interface for Disqus
declare global {
  interface Window {
    DISQUS?: any;
  }
}

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
  faqs?: { question: string; answer: string }[];
}

interface BlogPostProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

// Helper function to get category display name (from your original generateIndex.js)
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

// Helper function to get category color
function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    'DSE News': '#ff6b35',
    'Chinese': '#d81b60',
    'English': '#00acc1',
    'Maths': '#fb8c00',
    'CSD': '#8e24aa',
    'Physics': '#ffd600',
    'Chemistry': '#2e7d32',
    'Biology': '#1565c0',
    'ICT': '#37474f',
    'M1': '#673ab7',
    'M2': '#00796b',
    'Geography': '#0288d1',
    'History': '#795548',
    'Chinese History': '#b71c1c',
    'Economics': '#546e7a',
    'BAFS': '#ff8f00',
    'Visual Arts': '#0277bd'
  };

  return colorMap[category] || '#5b5fc7';
}

// Helper function to process HTML content and extract headings
function processHtmlContent(htmlContent: string): { 
  processedHtml: string; 
  headings: { id: string; text: string; level: number }[] 
} {
  const headings: { id: string; text: string; level: number }[] = [];
  
  if (typeof window === 'undefined') {
    return { processedHtml: htmlContent, headings };
  }
  
  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const headingElements = doc.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const usedIds = new Set<string>();
    
    headingElements.forEach((heading, index) => {
      const level = parseInt(heading.tagName.substring(1));
      const text = heading.textContent || '';
      
      // Generate base ID from text
      let baseId = text.toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '') || `heading-${index}`;
      
      // Handle duplicate IDs
      let id = baseId;
      let counter = 1;
      while (usedIds.has(id)) {
        id = `${baseId}-${counter}`;
        counter++;
      }
      usedIds.add(id);
      
      // Set ID and scroll margin on the element
      heading.setAttribute('id', id);
      (heading as HTMLElement).style.scrollMarginTop = '120px';
      
      headings.push({ id, text, level });
    });
    
    // Return the modified HTML as a string
    const processedHtml = doc.body.innerHTML;
    return { processedHtml, headings };
  } catch (error) {
    console.error('Error processing HTML content:', error);
    return { processedHtml: htmlContent, headings };
  }
}

export default function BlogPost({ post, relatedPosts }: BlogPostProps) {
  const [processedContent, setProcessedContent] = useState<string>(post.content);
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>('');
  const categoryDisplayName = getCategoryDisplayName(post.category);
  const featuredImageUrl = post.featuredImage || 'https://dse.best/assets/images/logo-icon.webp';
  const { viewCount, isLoading } = useViewCount(post.slug);
  const canonicalUrl = `https://dse.best/blog/${post.slug}`;
  const faqItems = post.faqs?.filter(f => f?.question && f?.answer) || [];

  // Process HTML content and extract headings
  useEffect(() => {
    const { processedHtml, headings: extractedHeadings } = processHtmlContent(post.content);
    setProcessedContent(processedHtml);
    setHeadings(extractedHeadings);
  }, [post.content]);

  // Scroll-based active heading detection
  useEffect(() => {
    if (headings.length === 0) return;

    let rafId: number | null = null;
    let lastActiveId = '';

    const updateActiveHeading = () => {
      // Find the active heading based on scroll position
      let activeHeading = '';
      const scrollOffset = 150; // Offset from top of viewport

      // Iterate through headings to find the last one above the scroll offset
      for (let i = headings.length - 1; i >= 0; i--) {
        const element = document.getElementById(headings[i].id);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If heading is above or near the top of viewport
          if (rect.top <= scrollOffset) {
            activeHeading = headings[i].id;
            break;
          }
        }
      }

      // Don't activate any heading if we're still reading content before the first heading
      // (This prevents highlighting the first TOC item when there's intro text above it)

      // Only update state if active heading changed
      if (activeHeading !== lastActiveId) {
        lastActiveId = activeHeading;
        setActiveId(activeHeading);
      }
    };

    const handleScroll = () => {
      // Cancel previous frame if it exists
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      // Schedule update for next frame
      rafId = requestAnimationFrame(updateActiveHeading);
    };

    // Add scroll listener (no initial update to prevent auto-jump)
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [headings]);

  // Load Disqus
  useEffect(() => {
    const disqusTimer = setTimeout(() => {
      const disqusThread = document.getElementById('disqus_thread');
      if (disqusThread && !window.DISQUS) {
        const script = document.createElement('script');
        script.src = 'https://dsebest.disqus.com/embed.js';
        script.setAttribute('data-timestamp', String(+new Date()));
        (document.head || document.body).appendChild(script);
      }
    }, 400);
    
    return () => {
      clearTimeout(disqusTimer);
    };
  }, []);
  
  // Scroll to heading handler - using scrollIntoView
  const scrollToHeading = useCallback((headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(headingId);
      window.history.replaceState(null, '', `#${headingId}`);
    }
  }, []);

  return (
    <>
      <Head>
        <title>{post.seoTitle}</title>
        <meta name="description" content={post.seoDescription} />
        <meta name="robots" content={post.robots} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={post.seoTitle} />
        <meta property="og:description" content={post.seoDescription} />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta name="theme-color" content="#0f1535" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BlogPosting",
              "mainEntityOfPage": {
                "@type": "WebPage",
                "@id": canonicalUrl
              },
              "headline": post.seoTitle,
              "description": post.seoDescription,
              "image": [featuredImageUrl],
              "url": canonicalUrl,
              "author": {
                "@type": "Person",
                "name": post.author
              },
              "publisher": {
                "@type": "Organization",
                "name": "DSE.BEST",
                "logo": {
                  "@type": "ImageObject",
                  "url": "https://dse.best/assets/images/logo-icon.webp"
                }
              },
              "datePublished": post.createdAt,
              "dateModified": post.updatedAt,
              "keywords": post.tags,
              "articleSection": post.category
            })
          }}
        />

        {faqItems.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                "mainEntity": faqItems.map((f) => ({
                  "@type": "Question",
                  "name": f.question,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": f.answer
                  }
                }))
              })
            }}
          />
        )}
      </Head>

      {/* Breadcrumb */}
      <div className="page-breadcrumb d-none d-sm-flex align-items-center mb-3">
        <div className="breadcrumb-title pe-3">Blog</div>
        <div className="ps-3">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-0 p-0">
              <li className="breadcrumb-item">
                <BiCategory style={{ verticalAlign: 'text-bottom', fontSize: '1.2em', marginRight: '0.25em' }} /> {categoryDisplayName}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Blog Post Content */}
      <div className="blog-post-container" style={{
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div className="blog-content-wrapper">
          {/* Main Content - Card */}
          <div className="blog-main-content">
            <div className="card rounded-4">
              <div className="card-body">
                {/* Post Header */}
                <div className="post-header mb-4">
                  <h1 className="display-6" style={{
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    lineHeight: '1.3',
                    marginBottom: '1.5rem',
                    color: 'var(--bs-heading-color)',
                    fontFamily: "'Noto Sans HK', 'PingFang HK', 'Microsoft JhengHei', sans-serif",
                    overflowWrap: 'anywhere',
                    wordBreak: 'break-word'
                  }}>
                    {post.title}
                  </h1>

                  {/* Post Meta - Modern with Colored Icons */}
                  <div className="d-flex flex-wrap align-items-center justify-content-center gap-3 mb-3" style={{
                    fontSize: '0.875rem',
                    color: 'var(--bs-body-color)'
                  }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: 'rgba(13, 110, 253, 0.1)'
                      }}>
                        <BiUserCircle style={{ fontSize: '1.1em', color: '#0d6efd' }} />
                      </span>
                      {post.author}
                    </span>
                    <span style={{ color: '#dee2e6' }}>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: 'rgba(25, 135, 84, 0.1)'
                      }}>
                        <BiCalendarEvent style={{ fontSize: '1.1em', color: '#198754' }} />
                      </span>
                      {post.date}
                    </span>
                    <span style={{ color: '#dee2e6' }}>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: 'rgba(13, 202, 240, 0.1)'
                      }}>
                        <BiTimeFive style={{ fontSize: '1.1em', color: '#0dcaf0' }} />
                      </span>
                      {post.readingTime} min read
                    </span>
                    <span style={{ color: '#dee2e6' }}>•</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        background: 'rgba(255, 193, 7, 0.1)'
                      }}>
                        <BiShow style={{ fontSize: '1.1em', color: '#ffc107' }} />
                      </span>
                      {isLoading ? '...' : `${viewCount || 0} views`}
                    </span>
                  </div>
                </div>

                {/* Post Content */}
                <div className="post-content" dangerouslySetInnerHTML={{ __html: processedContent }} />

                {/* Comments Section */}
                {post.comments && (
                  <>
                    <hr className="my-5" style={{ borderColor: 'var(--bs-border-color-translucent)' }} />
                    <div className="comments-section px-3 py-2">
                      <h4 className="mb-4" style={{
                        fontFamily: "'Noto Sans HK', sans-serif",
                        fontSize: '1.5rem'
                      }}>
                        <BiComment style={{
                          fontSize: '1.2em',
                          marginRight: '0.5em',
                          color: 'var(--bs-body-color, #6c757d)'
                        }} />
                        留言討論
                      </h4>

                      {/* Disqus Comments */}
                      <div id="disqus_thread"></div>
                      <script dangerouslySetInnerHTML={{
                        __html: `
                          var disqus_config = function () {
                            this.page.url = 'https://dse.best/blog/${post.slug}';
                            this.page.identifier = '${post.slug}';
                            this.page.robots = 'noindex, nofollow';
                          };

                          (function() {
                            var d = document, s = d.createElement('script');
                            s.src = 'https://dsebest.disqus.com/embed.js';
                            s.setAttribute('data-timestamp', +new Date());
                            (d.head || d.body).appendChild(s);
                          })();
                        `
                      }} />
                      <noscript>
                        Please enable JavaScript to view the{' '}
                        <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
                      </noscript>
                    </div>
                  </>
                )}

              </div>
            </div>
          </div>
              
          {/* Sidebar - Outside Card */}
          <aside className="blog-sidebar">
                <div style={{
                  position: 'sticky',
                  top: '100px'
                }}>
                  {/* Table of Contents Card - MOVED TO TOP */}
                  {headings.length > 0 && (
                    <div style={{
                      background: 'var(--bs-card-bg)',
                      borderRadius: '12px',
                      padding: '20px',
                      marginBottom: '20px',
                      border: '1px solid var(--bs-border-color)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                    }}>
                      <h5 style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        marginBottom: '16px',
                        fontFamily: "'Noto Sans HK', sans-serif",
                        color: 'var(--bs-heading-color)'
                      }}>
                        <BiListUl style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />
                        目錄
                      </h5>
                      <nav style={{
                        fontSize: '0.9rem',
                        lineHeight: '1.8'
                      }}>
                        {headings.map((heading, index) => {
                          const isActive = activeId === heading.id;
                          return (
                            <a
                              key={index}
                              href={`#${heading.id}`}
                              onClick={(e) => {
                                e.preventDefault();
                                scrollToHeading(heading.id);
                              }}
                              style={{
                                display: 'block',
                                color: isActive ? 'var(--bs-primary)' : 'var(--bs-body-color)',
                                background: isActive ? 'rgba(13, 110, 253, 0.08)' : 'transparent',
                                textDecoration: 'none',
                                paddingLeft: `${4 + (heading.level - 1) * 8}px`,
                                paddingRight: '8px',
                                paddingTop: '8px',
                                paddingBottom: '8px',
                                marginBottom: '2px',
                                borderRadius: '6px',
                                transition: 'all 0.2s ease',
                                fontFamily: "'Noto Sans HK', sans-serif",
                                fontSize: '0.9rem',
                                fontWeight: isActive ? '600' : '400',
                                cursor: 'pointer',
                                borderLeft: isActive ? '3px solid var(--bs-primary)' : '3px solid transparent'
                              }}
                              onMouseEnter={(e) => {
                                if (!isActive) {
                                  e.currentTarget.style.background = 'rgba(13, 110, 253, 0.05)';
                                  e.currentTarget.style.color = 'var(--bs-primary)';
                                }
                              }}
                              onMouseLeave={(e) => {
                                if (!isActive) {
                                  e.currentTarget.style.background = 'transparent';
                                  e.currentTarget.style.color = 'var(--bs-body-color)';
                                }
                              }}
                            >
                              {heading.text}
                            </a>
                          );
                        })}
                      </nav>
                    </div>
                  )}
                  
                  {/* Tags Card */}
                  {post.tags && post.tags.length > 0 && (
                    <div style={{
                      background: 'var(--bs-card-bg)',
                      borderRadius: '12px',
                      padding: '20px',
                      marginBottom: '20px',
                      border: '1px solid var(--bs-border-color)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                    }}>
                      <h5 style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        marginBottom: '16px',
                        fontFamily: "'Noto Sans HK', sans-serif",
                        color: 'var(--bs-heading-color)'
                      }}>
                        <BiCategory style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />
                        標籤
                      </h5>
                      <div className="d-flex flex-wrap gap-2">
                        {post.tags.map((tag, index) => (
                          <span
                            key={index}
                            style={{
                              display: 'inline-block',
                              background: '#0d6efd',
                              color: '#fff',
                              borderRadius: '999px',
                              padding: '0.4em 1.1em',
                              fontWeight: 500,
                              fontSize: '0.85rem',
                              letterSpacing: '0.02em',
                              boxShadow: '0 2px 8px rgba(13,110,253,0.15)',
                              border: 'none',
                              fontFamily: "'Noto Sans HK', sans-serif",
                              cursor: 'pointer',
                              transition: 'all 0.2s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = '#0a58ca';
                              e.currentTarget.style.transform = 'translateY(-2px)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = '#0d6efd';
                              e.currentTarget.style.transform = 'translateY(0)';
                            }}
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Category Card */}
                  <div style={{
                    background: 'var(--bs-card-bg)',
                    borderRadius: '12px',
                    padding: '20px',
                    marginBottom: '20px',
                    border: '1px solid var(--bs-border-color)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                  }}>
                    <h5 style={{
                      fontSize: '1.1rem',
                      fontWeight: '700',
                      marginBottom: '16px',
                      fontFamily: "'Noto Sans HK', sans-serif",
                      color: 'var(--bs-heading-color)'
                    }}>
                      <BiCategory style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />
                      分類
                    </h5>
                    <div style={{
                      display: 'inline-block',
                      background: getCategoryColor(post.category),
                      color: (post.category === 'Physics' || post.category === 'BAFS') ? '#000' : '#fff',
                      padding: '8px 16px',
                      borderRadius: '20px',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      fontFamily: "'Noto Sans HK', sans-serif"
                    }}>
                      {categoryDisplayName}
                    </div>
                  </div>
                  
                  {/* Related Posts Card */}
                  {relatedPosts.length > 0 && (
                    <div style={{
                      background: 'var(--bs-card-bg)',
                      borderRadius: '12px',
                      padding: '20px',
                      marginBottom: '20px',
                      border: '1px solid var(--bs-border-color)',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                    }}>
                      <h5 style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        marginBottom: '16px',
                        fontFamily: "'Noto Sans HK', sans-serif",
                        color: 'var(--bs-heading-color)'
                      }}>
                        <BiListUl style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />
                        相關文章
                      </h5>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {relatedPosts.map((relatedPost, index) => (
                          <NavigationLink
                            key={index}
                            href={`/blog/${relatedPost.slug}`}
                            style={{
                              display: 'block',
                              padding: '12px',
                              background: 'var(--bs-body-bg)',
                              borderRadius: '8px',
                              textDecoration: 'none',
                              color: 'var(--bs-body-color)',
                              border: '1px solid var(--bs-border-color)',
                              transition: 'all 0.2s ease',
                              fontFamily: "'Noto Sans HK', sans-serif"
                            }}
                            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                              e.currentTarget.style.borderColor = 'var(--bs-primary)';
                            }}
                            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                              e.currentTarget.style.borderColor = 'var(--bs-border-color)';
                            }}
                          >
                            <div style={{
                              fontSize: '0.85rem',
                              fontWeight: '600',
                              marginBottom: '4px',
                              lineHeight: '1.4'
                            }}>
                              {relatedPost.title}
                            </div>
                            <div style={{
                              fontSize: '0.75rem',
                              color: 'var(--bs-secondary)',
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px'
                            }}>
                              <span>{relatedPost.date}</span>
                              <span>•</span>
                              <span>{relatedPost.readingTime} min</span>
                            </div>
                          </NavigationLink>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Back to Blog Card */}
                  <div style={{
                    background: 'var(--bs-card-bg)',
                    borderRadius: '12px',
                    padding: '20px',
                    border: '1px solid var(--bs-border-color)',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)'
                  }}>
                    <NavigationLink href="/blog/" style={{
                      display: 'block',
                      textAlign: 'center',
                      padding: '12px',
                      background: 'var(--bs-primary)',
                      color: '#fff',
                      borderRadius: '8px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      transition: 'all 0.2s ease',
                      fontFamily: "'Noto Sans HK', sans-serif"
                    }}>
                      ← 返回所有文章
                    </NavigationLink>
                  </div>
                </div>
              </aside>
        </div>
      </div>
      


    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    // Read from static JSON file generated at build time
    const slugsPath = path.join(process.cwd(), 'data', 'post-slugs.json');
    const slugs: string[] = JSON.parse(fs.readFileSync(slugsPath, 'utf8'));
    
    const paths = slugs.map((slug: string) => ({
      params: { slug }
    }));

    return {
      paths,
      fallback: false // No fallback for static export
    };
  } catch (error) {
    console.error('Error loading post slugs:', error);
    return {
      paths: [],
      fallback: false
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  
  if (!slug) {
    return {
      notFound: true
    };
  }

  try {
    // Read current post
    const postPath = path.join(process.cwd(), 'data', 'posts', `${slug}.json`);
    const post = JSON.parse(fs.readFileSync(postPath, 'utf8'));

    // Read all posts for related posts logic
    const blogIndexPath = path.join(process.cwd(), 'data', 'blog-index.json');
    const allPosts: BlogPost[] = JSON.parse(fs.readFileSync(blogIndexPath, 'utf8'));
    
    // Find related posts based on tags and category
    const relatedPosts = allPosts
      .filter(p => p.slug !== slug) // Exclude current post
      .map(p => {
        let score = 0;
        
        // Same category gets +3 points
        if (p.category === post.category) {
          score += 3;
        }
        
        // Each matching tag gets +1 point
        const matchingTags = p.tags.filter(tag => post.tags.includes(tag));
        score += matchingTags.length;
        
        return { post: p, score };
      })
      .filter(item => item.score > 0) // Only posts with some relevance
      .sort((a, b) => b.score - a.score) // Sort by relevance score
      .slice(0, 3) // Take top 3
      .map(item => item.post);

    return {
      props: {
        post,
        relatedPosts
      }
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return {
      notFound: true
    };
  }
};
