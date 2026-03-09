import Head from 'next/head'
import { BiCategory, BiUserCircle, BiCalendarEvent, BiTimeFive, BiShow, BiComment, BiListUl } from 'react-icons/bi';
import { GetStaticProps, GetStaticPaths } from 'next'
import { useEffect, useState, useCallback } from 'react'
import fs from 'fs'
import path from 'path'
import NavigationLink from '../../components/NavigationLink'
import { useViewCount } from '@/hooks/useViewCount'

// Extend Window interface for Disqus
declare global {
  interface Window {
    DISQUS?: any;
  }
}

// ─── Types ───────────────────────────────────────────────────────────────────

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

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface BlogPostProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
  processedContent: string;   // pre-processed HTML with heading IDs injected
  headings: HeadingItem[];    // extracted at build time
}

// ─── Server-side HTML processing (runs at build time, not in browser) ─────────
// This is the KEY fix: heading IDs and scroll-margin are injected into the HTML
// during getStaticProps so AdSense sees a stable DOM on the very first paint.

function processHtmlContentServer(htmlContent: string): {
  processedHtml: string;
  headings: HeadingItem[];
} {
  const headings: HeadingItem[] = [];
  const usedIds = new Set<string>();
  let index = 0;

  const processedHtml = htmlContent.replace(
    /<(h[1-6])([^>]*?)>([\s\S]*?)<\/\1>/gi,
    (_match, tag: string, attrs: string, inner: string) => {
      const level = parseInt(tag.substring(1));
      // Strip any nested tags to get plain text
      const text = inner.replace(/<[^>]+>/g, '').trim();

      let baseId = text
        .toLowerCase()
        .replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '') || `heading-${index}`;

      let id = baseId;
      let counter = 1;
      while (usedIds.has(id)) {
        id = `${baseId}-${counter}`;
        counter++;
      }
      usedIds.add(id);
      index++;

      headings.push({ id, text, level });

      // Preserve any existing attrs, inject id + scroll-margin-top
      const cleanAttrs = attrs
        .replace(/\s*id="[^"]*"/gi, '')
        .replace(/\s*style="[^"]*"/gi, '');

      return `<${tag}${cleanAttrs} id="${id}" style="scroll-margin-top:120px;">${inner}</${tag}>`;
    }
  );

  return { processedHtml, headings };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getCategoryDisplayName(category: string): string {
  if (!category) return 'Uncategorized';
  const categoryMap: Record<string, string> = {
    Chinese: '中文 Chinese',
    English: '英文 English',
    Maths: '數學 Maths',
    CSD: '公民 CSD',
    Physics: '物理 Physics',
    Chemistry: '化學 Chemistry',
    Biology: '生物 Biology',
    ICT: '資訊 ICT',
    M1: 'M1',
    M2: 'M2',
    Geography: '地理 Geography',
    History: '歷史 History',
    'Chinese History': '中國歷史 Chinese History',
    Economics: '經濟 Economics',
    BAFS: '企會財 BAFS',
    'Visual Arts': '視藝 Visual Arts',
    'DSE News': 'DSE News',
    Testing: 'Testing',
  };
  return categoryMap[category] || category;
}

function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    'DSE News': '#ff6b35',
    Chinese: '#d81b60',
    English: '#00acc1',
    Maths: '#fb8c00',
    CSD: '#8e24aa',
    Physics: '#ffd600',
    Chemistry: '#2e7d32',
    Biology: '#1565c0',
    ICT: '#37474f',
    M1: '#673ab7',
    M2: '#00796b',
    Geography: '#0288d1',
    History: '#795548',
    'Chinese History': '#b71c1c',
    Economics: '#546e7a',
    BAFS: '#ff8f00',
    'Visual Arts': '#0277bd',
  };
  return colorMap[category] || '#5b5fc7';
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function BlogPost({ post, relatedPosts, processedContent, headings }: BlogPostProps) {
  const [activeId, setActiveId] = useState<string>('');
  const categoryDisplayName = getCategoryDisplayName(post.category);
  const featuredImageUrl = post.featuredImage || 'https://dse.best/assets/images/logo-icon.webp';
  const { viewCount, isLoading } = useViewCount(post.slug);
  const canonicalUrl = `https://dse.best/blog/${post.slug}`;
  const faqItems = post.faqs?.filter(f => f?.question && f?.answer) || [];

  // NOTE: No content-processing useEffect here anymore.
  // processedContent arrives ready from the server, so AdSense sees
  // a fully-formed DOM on the very first paint.

  // ── Scroll-spy for active TOC heading ──────────────────────────────────────
  useEffect(() => {
    if (headings.length === 0) return;

    let rafId: number | null = null;
    let lastActiveId = '';

    const updateActiveHeading = () => {
      let activeHeading = '';
      const scrollOffset = 150;

      for (let i = headings.length - 1; i >= 0; i--) {
        const element = document.getElementById(headings[i].id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= scrollOffset) {
            activeHeading = headings[i].id;
            break;
          }
        }
      }

      if (activeHeading !== lastActiveId) {
        lastActiveId = activeHeading;
        setActiveId(activeHeading);
      }
    };

    const handleScroll = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateActiveHeading);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [headings]);

  // ── Lazy-load Disqus ──────────────────────────────────────────────────────
  useEffect(() => {
    if (!post.comments) return;
    const timer = setTimeout(() => {
      const disqusThread = document.getElementById('disqus_thread');
      if (disqusThread && !window.DISQUS) {
        const script = document.createElement('script');
        script.src = 'https://dsebest.disqus.com/embed.js';
        script.setAttribute('data-timestamp', String(+new Date()));
        (document.head || document.body).appendChild(script);
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [post.comments]);

  // ── TOC click handler ─────────────────────────────────────────────────────
  const scrollToHeading = useCallback((headingId: string) => {
    const element = document.getElementById(headingId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(headingId);
      window.history.replaceState(null, '', `#${headingId}`);
    }
  }, []);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <>
      <Head>
        <title>{post.seoTitle}</title>
        <meta name="description" content={post.seoDescription} />
        <meta name="robots" content={post.robots} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph */}
        <meta property="og:title" content={post.seoTitle} />
        <meta property="og:description" content={post.seoDescription} />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta name="theme-color" content="#0f1535" />

        {/* BlogPosting structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
              headline: post.seoTitle,
              description: post.seoDescription,
              image: [featuredImageUrl],
              url: canonicalUrl,
              author: { '@type': 'Person', name: post.author },
              publisher: {
                '@type': 'Organization',
                name: 'dse.best',
                logo: { '@type': 'ImageObject', url: 'https://dse.best/assets/images/logo-icon.webp' },
              },
              datePublished: post.createdAt,
              dateModified: post.updatedAt,
              keywords: post.tags,
              articleSection: post.category,
            }),
          }}
        />

        {faqItems.length > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: faqItems.map(f => ({
                  '@type': 'Question',
                  name: f.question,
                  acceptedAnswer: { '@type': 'Answer', text: f.answer },
                })),
              }),
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
                <BiCategory style={{ verticalAlign: 'text-bottom', fontSize: '1.2em', marginRight: '0.25em' }} />
                {categoryDisplayName}
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Blog layout */}
      <div className="blog-post-container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="blog-content-wrapper">

          {/* ── Main content card ─────────────────────────────────────────── */}
          <div className="blog-main-content">
            <div className="card rounded-4">
              <div className="card-body">

                {/* Post header */}
                <div className="post-header mb-4">
                  <h1
                    className="display-6"
                    style={{
                      fontSize: '2.5rem',
                      fontWeight: 700,
                      lineHeight: '1.3',
                      marginBottom: '1.5rem',
                      color: 'var(--bs-heading-color)',
                      fontFamily: "'Noto Sans HK', 'PingFang HK', 'Microsoft JhengHei', sans-serif",
                      overflowWrap: 'anywhere',
                      wordBreak: 'break-word',
                    }}
                  >
                    {post.title}
                  </h1>

                  {/* Post meta */}
                  <div
                    className="d-flex flex-wrap align-items-center justify-content-center gap-3 mb-3"
                    style={{ fontSize: '0.875rem', color: 'var(--bs-body-color)' }}
                  >
                    {[
                      { icon: <BiUserCircle style={{ fontSize: '1.1em', color: '#0d6efd' }} />, bg: 'rgba(13,110,253,0.1)', label: post.author },
                      { icon: <BiCalendarEvent style={{ fontSize: '1.1em', color: '#198754' }} />, bg: 'rgba(25,135,84,0.1)', label: post.date },
                      { icon: <BiTimeFive style={{ fontSize: '1.1em', color: '#0dcaf0' }} />, bg: 'rgba(13,202,240,0.1)', label: `${post.readingTime} min read` },
                      { icon: <BiShow style={{ fontSize: '1.1em', color: '#ffc107' }} />, bg: 'rgba(255,193,7,0.1)', label: isLoading ? '...' : `${viewCount || 0} views` },
                    ].map((item, i, arr) => (
                      <>
                        <span key={`meta-${i}`} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', background: item.bg }}>
                            {item.icon}
                          </span>
                          {item.label}
                        </span>
                        {i < arr.length - 1 && <span key={`sep-${i}`} style={{ color: '#dee2e6' }}>•</span>}
                      </>
                    ))}
                  </div>
                </div>

                {/*
                  ── Post content ─────────────────────────────────────────────
                  processedContent is already server-rendered with heading IDs,
                  so the DOM is stable when AdSense initialises on first paint.
                */}
                <div className="post-content" dangerouslySetInnerHTML={{ __html: processedContent }} />

                {/* Comments */}
                {post.comments && (
                  <>
                    <hr className="my-5" style={{ borderColor: 'var(--bs-border-color-translucent)' }} />
                    <div className="comments-section px-3 py-2">
                      <h4 className="mb-4" style={{ fontFamily: "'Noto Sans HK', sans-serif", fontSize: '1.5rem' }}>
                        <BiComment style={{ fontSize: '1.2em', marginRight: '0.5em', color: 'var(--bs-body-color, #6c757d)' }} />
                        留言討論
                      </h4>
                      <div id="disqus_thread" />
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

          {/* ── Sidebar ───────────────────────────────────────────────────── */}
          <aside className="blog-sidebar">
            <div style={{ position: 'sticky', top: '100px' }}>

              {/* Table of Contents */}
              {headings.length > 0 && (
                <SidebarCard title="目錄" icon={<BiListUl style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />}>
                  <nav style={{ fontSize: '0.9rem', lineHeight: '1.8' }}>
                    {headings.map((heading, index) => {
                      const isActive = activeId === heading.id;
                      return (
                        <a
                          key={index}
                          href={`#${heading.id}`}
                          onClick={e => { e.preventDefault(); scrollToHeading(heading.id); }}
                          style={{
                            display: 'block',
                            color: isActive ? 'var(--bs-primary)' : 'var(--bs-body-color)',
                            background: isActive ? 'rgba(13,110,253,0.08)' : 'transparent',
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
                            fontWeight: isActive ? 600 : 400,
                            cursor: 'pointer',
                            borderLeft: isActive ? '3px solid var(--bs-primary)' : '3px solid transparent',
                          }}
                          onMouseEnter={e => {
                            if (!isActive) {
                              e.currentTarget.style.background = 'rgba(13,110,253,0.05)';
                              e.currentTarget.style.color = 'var(--bs-primary)';
                            }
                          }}
                          onMouseLeave={e => {
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
                </SidebarCard>
              )}

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <SidebarCard title="標籤" icon={<BiCategory style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />}>
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
                          fontFamily: "'Noto Sans HK', sans-serif",
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#0a58ca'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = '#0d6efd'; e.currentTarget.style.transform = 'translateY(0)'; }}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </SidebarCard>
              )}

              {/* Category */}
              <SidebarCard title="分類" icon={<BiCategory style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />}>
                <div style={{
                  display: 'inline-block',
                  background: getCategoryColor(post.category),
                  color: post.category === 'Physics' || post.category === 'BAFS' ? '#000' : '#fff',
                  padding: '8px 16px',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  fontFamily: "'Noto Sans HK', sans-serif",
                }}>
                  {categoryDisplayName}
                </div>
              </SidebarCard>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <SidebarCard title="相關文章" icon={<BiListUl style={{ marginRight: '8px', verticalAlign: 'text-bottom' }} />}>
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
                          fontFamily: "'Noto Sans HK', sans-serif",
                        }}
                        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = 'var(--bs-primary)'; }}
                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = 'var(--bs-border-color)'; }}
                      >
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '4px', lineHeight: '1.4' }}>
                          {relatedPost.title}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--bs-secondary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span>{relatedPost.date}</span>
                          <span>•</span>
                          <span>{relatedPost.readingTime} min</span>
                        </div>
                      </NavigationLink>
                    ))}
                  </div>
                </SidebarCard>
              )}

              {/* Back to Blog */}
              <div style={{ background: 'var(--bs-card-bg)', borderRadius: '12px', padding: '20px', border: '1px solid var(--bs-border-color)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <NavigationLink href="/blog/" style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '12px',
                  background: 'var(--bs-primary)',
                  color: '#fff',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  transition: 'all 0.2s ease',
                  fontFamily: "'Noto Sans HK', sans-serif",
                }}>
                  ← 返回所有文章
                </NavigationLink>
              </div>

            </div>
          </aside>

        </div>
      </div>
    </>
  );
}

// ─── Small reusable sidebar card ─────────────────────────────────────────────

function SidebarCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{
      background: 'var(--bs-card-bg)',
      borderRadius: '12px',
      padding: '20px',
      marginBottom: '20px',
      border: '1px solid var(--bs-border-color)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    }}>
      <h5 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '16px', fontFamily: "'Noto Sans HK', sans-serif", color: 'var(--bs-heading-color)' }}>
        {icon}{title}
      </h5>
      {children}
    </div>
  );
}

// ─── Static generation ───────────────────────────────────────────────────────

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const slugsPath = path.join(process.cwd(), 'data', 'post-slugs.json');
    const slugs: string[] = JSON.parse(fs.readFileSync(slugsPath, 'utf8'));
    return {
      paths: slugs.map(slug => ({ params: { slug } })),
      fallback: false,
    };
  } catch (error) {
    console.error('Error loading post slugs:', error);
    return { paths: [], fallback: false };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  if (!slug) return { notFound: true };

  try {
    const postPath = path.join(process.cwd(), 'data', 'posts', `${slug}.json`);
    const post: BlogPost = JSON.parse(fs.readFileSync(postPath, 'utf8'));

    // ── Process HTML at build time ──────────────────────────────────────────
    // Heading IDs are baked into the static HTML, so the first-paint DOM is
    // complete and AdSense can find every ad slot without waiting for JS.
    const { processedHtml, headings } = processHtmlContentServer(post.content);

    // ── Related posts ───────────────────────────────────────────────────────
    const blogIndexPath = path.join(process.cwd(), 'data', 'blog-index.json');
    const allPosts: BlogPost[] = JSON.parse(fs.readFileSync(blogIndexPath, 'utf8'));

    const relatedPosts = allPosts
      .filter(p => p.slug !== slug)
      .map(p => {
        let score = p.category === post.category ? 3 : 0;
        score += p.tags.filter(tag => post.tags.includes(tag)).length;
        return { post: p, score };
      })
      .filter(item => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map(item => item.post);

    return {
      props: {
        post,
        relatedPosts,
        processedContent: processedHtml,  // ← pre-baked HTML, not raw content
        headings,                          // ← extracted server-side
      },
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return { notFound: true };
  }
};