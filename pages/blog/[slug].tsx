import Head from 'next/head'
import { BiCategory, BiUserCircle, BiCalendarEvent, BiTimeFive, BiShow, BiListUl, BiShare, BiLink } from 'react-icons/bi';
import { GetStaticProps, GetStaticPaths } from 'next'
import { useEffect, useState, useCallback, useRef } from 'react'
import fs from 'fs'
import path from 'path'
import NavigationLink from '../../components/NavigationLink'
import { useViewCount } from '@/hooks/useViewCount'

interface BlogPost {
  id: string; slug: string; title: string; seoTitle: string;
  seoDescription: string; author: string; date: string;
  readingTime: number | null; tags: string[]; category: string;
  featuredImage: string | null; content: string; comments: boolean;
  index: boolean; excerpt: string; createdAt: string; updatedAt: string;
  robots: string; faqs?: { question: string; answer: string }[];
}
interface HeadingItem { id: string; text: string; level: number; }
interface BlogPostProps {
  post: BlogPost; relatedPosts: BlogPost[];
  processedContent: string; headings: HeadingItem[];
}

function processHtmlContentServer(htmlContent: string): { processedHtml: string; headings: HeadingItem[] } {
  const headings: HeadingItem[] = [];
  const usedIds = new Set<string>();
  let index = 0;

  let html = htmlContent.replace(
    /<(h[1-6])([^>]*?)>([\s\S]*?)<\/\1>/gi,
    (_match, tag: string, attrs: string, inner: string) => {
      const level = parseInt(tag.substring(1));
      const text = inner.replace(/<[^>]+>/g, '').trim();
      let baseId = text.toLowerCase().replace(/[^a-z0-9\u4e00-\u9fa5]+/g, '-').replace(/^-+|-+$/g, '') || `heading-${index}`;
      let id = baseId; let counter = 1;
      while (usedIds.has(id)) { id = `${baseId}-${counter}`; counter++; }
      usedIds.add(id); index++;
      headings.push({ id, text, level });
      const cleanAttrs = attrs.replace(/\s*id="[^"]*"/gi, '').replace(/\s*style="[^"]*"/gi, '');
      return `<${tag}${cleanAttrs} id="${id}" style="scroll-margin-top:120px;">${inner}</${tag}>`;
    }
  );

  // Wrap every <table> in a scrollable div — fixes mobile overflow
  html = html.replace(/<table(\s[^>]*)?>/gi, (match) => {
    return `<div class="table-scroll-wrapper">${match}`;
  });
  html = html.replace(/<\/table>/gi, '</table></div>');

  // Nofollow external links
  html = html.replace(/<a\s([^>]*?)>/gi, (_match, attrs: string) => {
    const href = (attrs.match(/href="([^"]*)"/i) || [])[1] || '';
    const isInternal = !href || href.startsWith('#') || href.startsWith('/') || href.includes('dse.best');
    if (isInternal) return `<a ${attrs}>`;
    const cleanAttrs = attrs.replace(/\s*rel="[^"]*"/gi, '').replace(/\s*target="[^"]*"/gi, '');
    return `<a ${cleanAttrs} rel="nofollow noopener noreferrer" target="_blank">`;
  });

  return { processedHtml: html, headings };
}

function getCategoryDisplayName(category: string): string {
  const map: Record<string, string> = {
    Chinese: '中文 Chinese', English: '英文 English', Maths: '數學 Maths',
    CSD: '公民 CSD', Physics: '物理 Physics', Chemistry: '化學 Chemistry',
    Biology: '生物 Biology', ICT: '資訊 ICT', M1: 'M1', M2: 'M2',
    Geography: '地理 Geography', History: '歷史 History',
    'Chinese History': '中國歷史 Chinese History', Economics: '經濟 Economics',
    BAFS: '企會財 BAFS', 'Visual Arts': '視藝 Visual Arts',
    'DSE News': 'DSE News', Testing: 'Testing',
  };
  return map[category] || category || 'Uncategorized';
}

function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    'DSE News': '#ff6b35', Chinese: '#d81b60', English: '#00acc1',
    Maths: '#fb8c00', CSD: '#8e24aa', Physics: '#c8a800',
    Chemistry: '#2e7d32', Biology: '#1565c0', ICT: '#37474f',
    M1: '#673ab7', M2: '#00796b', Geography: '#0288d1',
    History: '#795548', 'Chinese History': '#b71c1c', Economics: '#546e7a',
    BAFS: '#ff8f00', 'Visual Arts': '#0277bd',
  };
  return map[category] || '#5b5fc7';
}

function useReadingProgress(ref: React.RefObject<HTMLDivElement | null>) {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let raf: number | null = null;
    const update = () => {
      const el = ref.current; if (!el) return;
      const { top, height } = el.getBoundingClientRect();
      const scrolled = Math.max(0, -top);
      const total = height - window.innerHeight;
      setProgress(total > 0 ? Math.min(100, (scrolled / total) * 100) : 0);
    };
    const onScroll = () => { if (raf) cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [ref]);
  return progress;
}

export default function BlogPost({ post, relatedPosts, processedContent, headings }: BlogPostProps) {
  const [activeId, setActiveId] = useState('');
  const [copied, setCopied] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const readingProgress = useReadingProgress(contentRef);

  const categoryDisplayName = getCategoryDisplayName(post.category);
  const categoryColor = getCategoryColor(post.category);
  const { viewCount, isLoading } = useViewCount(post.slug);
  const canonicalUrl = `https://dse.best/blog/${post.slug}`;
  const ogImage = post.featuredImage || 'https://dse.best/assets/images/logo-icon.webp';
  const faqItems = post.faqs?.filter(f => f?.question && f?.answer) || [];

  useEffect(() => {
    if (!headings.length) return;
    let raf: number | null = null; let last = '';
    const update = () => {
      let active = '';
      for (let i = headings.length - 1; i >= 0; i--) {
        const el = document.getElementById(headings[i].id);
        if (el && el.getBoundingClientRect().top <= 150) { active = headings[i].id; break; }
      }
      if (active !== last) { last = active; setActiveId(active); }
    };
    const onScroll = () => { if (raf) cancelAnimationFrame(raf); raf = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); if (raf) cancelAnimationFrame(raf); };
  }, [headings]);

  const scrollToHeading = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); setActiveId(id); window.history.replaceState(null, '', `#${id}`); }
  }, []);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try { await navigator.share({ title: post.title, url: canonicalUrl }); return; } catch { }
    }
    try { await navigator.clipboard.writeText(canonicalUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); } catch { }
  }, [post.title, canonicalUrl]);

  return (
    <>
      <Head>
        <title>{post.seoTitle}</title>
        <meta name="description" content={post.seoDescription} />
        <meta name="robots" content={post.robots} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={post.seoTitle} />
        <meta property="og:description" content={post.seoDescription} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta name="theme-color" content="#0f1535" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org', '@type': 'BlogPosting',
            mainEntityOfPage: { '@type': 'WebPage', '@id': canonicalUrl },
            headline: post.seoTitle, description: post.seoDescription,
            image: [ogImage], url: canonicalUrl,
            author: { '@type': 'Person', name: post.author },
            publisher: { '@type': 'Organization', name: 'dse.best', logo: { '@type': 'ImageObject', url: 'https://dse.best/assets/images/logo-icon.webp' } },
            datePublished: post.createdAt, dateModified: post.updatedAt,
            keywords: post.tags, articleSection: post.category,
          })
        }} />
        {faqItems.length > 0 && (
          <script type="application/ld+json" dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org', '@type': 'FAQPage',
              mainEntity: faqItems.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
            })
          }} />
        )}
      </Head>

      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '3px', zIndex: 9999, background: 'var(--bs-border-color)' }}>
        <div style={{ height: '100%', width: `${readingProgress}%`, background: `linear-gradient(90deg, ${categoryColor}, #8b5cf6)`, transition: 'width 0.1s linear' }} />
      </div>

      <style>{`
        .blog-content-wrapper { display: grid; grid-template-columns: 1fr 300px; gap: 24px; align-items: start; }
        @media (max-width: 991px) { .blog-content-wrapper { grid-template-columns: 1fr; } .blog-sidebar { display: none; } }

        /* ── Post title — bigger on mobile ───────────────────────────────── */
        .post-title {
          font-size: 2rem;
          font-weight: 700;
          line-height: 1.3;
          margin-bottom: 1.25rem;
          color: var(--bs-heading-color);
          font-family: 'Noto Sans HK', 'PingFang HK', 'Microsoft JhengHei', sans-serif;
          overflow-wrap: anywhere;
          word-break: break-word;
        }
        @media (min-width: 576px) { .post-title { font-size: 2.35rem; } }

        /* ── Prose typography ─────────────────────────────────────────────── */
        .post-content {
          font-family: 'Noto Sans HK', 'PingFang HK', 'Microsoft JhengHei', sans-serif;
          font-size: 1.05rem; line-height: 1.9; color: var(--bs-body-color);
        }
        .post-content h1, .post-content h2, .post-content h3, .post-content h4 {
          font-family: 'Noto Sans HK', 'PingFang HK', sans-serif;
          font-weight: 700; line-height: 1.35;
          margin-top: 2.25rem; margin-bottom: 0.9rem; color: var(--bs-heading-color);
        }
        .post-content h2 {
          font-size: 1.55rem; padding-bottom: 0.45rem;
          border-bottom: 2px solid var(--bs-border-color);
        }
        .post-content h3 { font-size: 1.2rem; }
        .post-content h4 { font-size: 1.05rem; }
        .post-content p { margin-bottom: 1.35rem; white-space: pre-line;}
          .post-content hr:has(+ h2) {
  display: none;
}

/* 2. Hide empty paragraphs to prevent invisible mega-gaps */
.post-content p:empty {
  display: none;
}
        /* ── Inline formatting ────────────────────────────────────────────── */
        .post-content strong, .post-content b { font-weight: 700; color: var(--bs-heading-color); }
        .post-content em, .post-content i { font-style: italic; }
        .post-content u { text-decoration: underline; text-underline-offset: 3px; }
        .post-content s, .post-content del { text-decoration: line-through; opacity: 0.65; }
        .post-content sup { font-size: 0.72em; vertical-align: super; line-height: 0; }
        .post-content sub { font-size: 0.72em; vertical-align: sub; line-height: 0; }

        /* Highlight / mark */
        .post-content mark {
          background: #fff176;
          color: #1a1a1a;
          border-radius: 3px;
          padding: 0.05em 0.25em;
        }
        /* Dark mode mark */
        [data-bs-theme="dark"] .post-content mark,
        [data-bs-theme="blue-theme"] .post-content mark {
          background: #6d6000;
          color: #fff176;
        }

        /* Inline code */
        .post-content code {
          font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
          font-size: 0.86em;
          background: var(--bs-secondary-bg, rgba(0,0,0,0.06));
          padding: 0.15em 0.45em;
          border-radius: 4px;
          color: #e83e8c;
          border: 1px solid var(--bs-border-color-translucent);
          word-break: break-word;
        }
        [data-bs-theme="dark"] .post-content code,
        [data-bs-theme="blue-theme"] .post-content code {
          background: rgba(255,255,255,0.08);
          color: #f78fb3;
          border-color: rgba(255,255,255,0.1);
        }

        /* Code block — overrides inline code styles */
        .post-content pre {
          background: #1e1e2e;
          color: #cdd6f4;
          border-radius: 10px;
          padding: 1.25rem 1.5rem;
          overflow-x: auto;
          margin: 1.75rem 0;
          font-size: 0.9rem;
          line-height: 1.7;
          border: none;
        }
        .post-content pre code {
          background: none !important;
          color: inherit !important;
          padding: 0 !important;
          border: none !important;
          font-size: inherit;
          word-break: normal;
        }

        /* ── Table — scrollable wrapper injected at build time ────────────── */
        .post-content .table-scroll-wrapper {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
          margin: 1.75rem 0;
          border-radius: 8px;
          border: 1px solid var(--bs-border-color);
          /* subtle scroll hint shadow */
          box-shadow: inset -8px 0 12px -8px rgba(0,0,0,0.08);
        }
        .post-content table {
          /* remove margin — wrapper handles spacing */
          width: 100%;
          min-width: 500px;      /* forces scroll on narrow screens */
          border-collapse: collapse;
          margin: 0;
          font-size: 0.95rem;
          border-radius: 0;
          border: none;          /* wrapper has the border */
        }
        .post-content th {
          background: var(--bs-secondary-bg, #f8f9fa);
          font-weight: 600; padding: 10px 14px;
          text-align: left; border-bottom: 2px solid var(--bs-border-color);
          white-space: nowrap;   /* header cells don't wrap while scrolling */
        }
        .post-content td { padding: 9px 14px; border-bottom: 1px solid var(--bs-border-color-translucent); }
        .post-content tr:last-child td { border-bottom: none; }
        .post-content tr:hover td { background: rgba(13,110,253,0.03); }

        .post-content a {
          color: var(--bs-primary); text-decoration: underline;
          text-decoration-color: rgba(13,110,253,0.3); text-underline-offset: 3px;
          transition: text-decoration-color 0.15s;
        }
        .post-content a:hover { text-decoration-color: var(--bs-primary); }

        .post-content blockquote {
          border-left: 4px solid var(--bs-primary); margin: 1.75rem 0;
          padding: 1rem 1.5rem; background: rgba(13,110,253,0.04);
          border-radius: 0 8px 8px 0; font-style: italic;
          color: var(--bs-secondary-color, #6c757d);
        }
        .post-content blockquote p { margin-bottom: 0; }

        .post-content img { max-width: 100%; border-radius: 8px; margin: 1.5rem auto; display: block; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
        .post-content ul, .post-content ol { padding-left: 1.6rem; margin-bottom: 1.35rem; }
        .post-content li { margin-bottom: 0.4rem; }
        .post-content li::marker { color: var(--bs-primary); }
        .post-content hr { border: none; border-top: 2px solid var(--bs-border-color); margin: 2.5rem 0; }

        /* ── TOC ──────────────────────────────────────────────────────────── */
        .toc-nav { max-height: 55vh; overflow-y: auto; scrollbar-width: thin; scrollbar-color: var(--bs-border-color) transparent; padding-right: 2px; }
        .toc-nav::-webkit-scrollbar { width: 3px; }
        .toc-nav::-webkit-scrollbar-thumb { background: var(--bs-border-color); border-radius: 99px; }
      `}</style>

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

      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div className="blog-content-wrapper">

          <div className="blog-main-content">
            <div className="card rounded-4" style={{ overflow: 'hidden' }}>
              <div className="card-body" style={{ padding: 'clamp(1.25rem, 4vw, 2rem)' }} ref={contentRef}>

                <h1 className="post-title">{post.title}</h1>

                <div className="d-flex flex-wrap align-items-center gap-3 mb-4" style={{ fontSize: '0.875rem', color: 'var(--bs-body-color)' }}>
                  {[
                    { icon: <BiUserCircle style={{ fontSize: '1.1em', color: '#0d6efd' }} />, bg: 'rgba(13,110,253,0.1)', label: post.author },
                    { icon: <BiCalendarEvent style={{ fontSize: '1.1em', color: '#198754' }} />, bg: 'rgba(25,135,84,0.1)', label: post.date },
                    { icon: <BiTimeFive style={{ fontSize: '1.1em', color: '#0dcaf0' }} />, bg: 'rgba(13,202,240,0.1)', label: `${post.readingTime ?? '?'} min read` },
                    { icon: <BiShow style={{ fontSize: '1.1em', color: '#ffc107' }} />, bg: 'rgba(255,193,7,0.1)', label: isLoading ? '...' : `${viewCount || 0} views` },
                  ].map((item, i) => (
                    <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '28px', height: '28px', borderRadius: '50%', background: item.bg, flexShrink: 0 }}>
                        {item.icon}
                      </span>
                      {item.label}
                    </span>
                  ))}

                  <button onClick={handleShare} title="Share"
                    style={{
                      marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px',
                      background: copied ? 'rgba(25,135,84,0.1)' : 'var(--bs-secondary-bg, rgba(0,0,0,0.05))',
                      border: '1px solid var(--bs-border-color)', borderRadius: '999px',
                      padding: '4px 14px', fontSize: '0.82rem', fontWeight: 500,
                      cursor: 'pointer', color: copied ? '#198754' : 'var(--bs-body-color)',
                      transition: 'all 0.2s', fontFamily: "'Noto Sans HK', sans-serif",
                    }}
                  >
                    {copied ? <><BiLink style={{ fontSize: '1.1em' }} /></> : <><BiShare style={{ fontSize: '1.1em' }} /></>}
                  </button>
                </div>

                <hr style={{ borderColor: 'var(--bs-border-color-translucent)' }} />

                <div className="post-content" dangerouslySetInnerHTML={{ __html: processedContent }} />

              </div>
            </div>
          </div>

          <aside className="blog-sidebar">
            <div style={{ position: 'sticky', top: '100px' }}>

              {headings.length > 0 && (
                <SidebarCard title="目錄" icon={<BiListUl />}>
                  <nav className="toc-nav" style={{ fontSize: '0.875rem', lineHeight: '1.7' }}>
                    {headings.map((h, i) => {
                      const active = activeId === h.id;
                      return (
                        <a key={i} href={`#${h.id}`}
                          onClick={e => { e.preventDefault(); scrollToHeading(h.id); }}
                          style={{
                            display: 'block',
                            color: active ? 'var(--bs-primary)' : 'var(--bs-body-color)',
                            background: active ? 'rgba(13,110,253,0.08)' : 'transparent',
                            textDecoration: 'none',
                            paddingLeft: `${4 + (h.level - 1) * 10}px`,
                            paddingRight: '8px', paddingTop: '7px', paddingBottom: '7px',
                            marginBottom: '1px', borderRadius: '6px', transition: 'all 0.15s',
                            fontFamily: "'Noto Sans HK', sans-serif",
                            fontSize: h.level <= 2 ? '0.88rem' : '0.82rem',
                            fontWeight: active ? 600 : 400, cursor: 'pointer',
                            borderLeft: active ? '3px solid var(--bs-primary)' : '3px solid transparent',
                          }}
                          onMouseEnter={e => { if (!active) { e.currentTarget.style.background = 'rgba(13,110,253,0.05)'; e.currentTarget.style.color = 'var(--bs-primary)'; } }}
                          onMouseLeave={e => { if (!active) { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--bs-body-color)'; } }}
                        >
                          {h.text}
                        </a>
                      );
                    })}
                  </nav>
                </SidebarCard>
              )}

              {post.tags?.length > 0 && (
                <SidebarCard title="標籤" icon={<BiCategory />}>
                  <div className="d-flex flex-wrap gap-2">
                    {post.tags.map((tag, i) => (
                      <span key={i} style={{
                        display: 'inline-block', background: '#0d6efd', color: '#fff',
                        borderRadius: '999px', padding: '0.3em 0.85em', fontWeight: 500,
                        fontSize: '0.8rem', fontFamily: "'Noto Sans HK', sans-serif", cursor: 'default',
                      }}>#{tag}</span>
                    ))}
                  </div>
                </SidebarCard>
              )}

              <SidebarCard title="分類" icon={<BiCategory />}>
                <span style={{
                  display: 'inline-block', padding: '6px 16px', borderRadius: '20px',
                  fontSize: '0.88rem', fontWeight: 600, fontFamily: "'Noto Sans HK', sans-serif",
                  background: `${categoryColor}18`, color: categoryColor, border: `1px solid ${categoryColor}40`,
                }}>
                  {categoryDisplayName}
                </span>
              </SidebarCard>

              {relatedPosts.length > 0 && (
                <SidebarCard title="相關文章" icon={<BiListUl />}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {relatedPosts.map((rp, i) => (
                      <NavigationLink key={i} href={`/blog/${rp.slug}`}
                        style={{ display: 'block', padding: '11px 12px', background: 'var(--bs-body-bg)', borderRadius: '8px', textDecoration: 'none', color: 'var(--bs-body-color)', border: '1px solid var(--bs-border-color)', transition: 'border-color 0.2s', fontFamily: "'Noto Sans HK', sans-serif" }}
                        onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = 'var(--bs-primary)'; }}
                        onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.borderColor = 'var(--bs-border-color)'; }}
                      >
                        <div style={{ fontSize: '0.84rem', fontWeight: 600, marginBottom: '4px', lineHeight: 1.45 }}>{rp.title}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--bs-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>{rp.date}</span><span>•</span><span>{rp.readingTime} min</span>
                        </div>
                      </NavigationLink>
                    ))}
                  </div>
                </SidebarCard>
              )}

              <div style={{ background: 'var(--bs-card-bg)', borderRadius: '12px', padding: '16px', border: '1px solid var(--bs-border-color)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                <NavigationLink href="/blog/" style={{ display: 'block', textAlign: 'center', padding: '10px', background: 'var(--bs-primary)', color: '#fff', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem', fontFamily: "'Noto Sans HK', sans-serif" }}>
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

function SidebarCard({ title, icon, children }: { title: string; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <div style={{ background: 'var(--bs-card-bg)', borderRadius: '12px', padding: '18px', marginBottom: '16px', border: '1px solid var(--bs-border-color)', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <h5 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '14px', fontFamily: "'Noto Sans HK', sans-serif", color: 'var(--bs-heading-color)', display: 'flex', alignItems: 'center', gap: '6px' }}>
        {icon}{title}
      </h5>
      {children}
    </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const slugs: string[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'post-slugs.json'), 'utf8'));
    return { paths: slugs.map(slug => ({ params: { slug } })), fallback: false };
  } catch { return { paths: [], fallback: false }; }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  if (!slug) return { notFound: true };
  try {
    const post: BlogPost = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'posts', `${slug}.json`), 'utf8'));
    const { processedHtml, headings } = processHtmlContentServer(post.content);
    const allPosts: BlogPost[] = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'data', 'blog-index.json'), 'utf8'));
    const relatedPosts = allPosts
      .filter(p => p.slug !== slug)
      .map(p => { let s = p.category === post.category ? 3 : 0; s += p.tags.filter(t => post.tags.includes(t)).length; return { post: p, score: s }; })
      .filter(x => x.score > 0).sort((a, b) => b.score - a.score).slice(0, 3).map(x => x.post);
    return { props: { post, relatedPosts, processedContent: processedHtml, headings } };
  } catch { return { notFound: true }; }
};