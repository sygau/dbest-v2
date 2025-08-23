import Head from 'next/head'
import { BiCategory, BiUserCircle, BiCalendarEvent, BiTimeFive, BiShow, BiComment } from 'react-icons/bi';
import { GetStaticProps, GetStaticPaths } from 'next'
import { useEffect } from 'react'
import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import NavigationLink from '../../components/NavigationLink'
import { useViewCount } from '@/hooks/useViewCount'
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

interface BlogPostProps {
  post: BlogPost;
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

export default function BlogPost({ post }: BlogPostProps) {

  const categoryDisplayName = getCategoryDisplayName(post.category);
  const featuredImageUrl = post.featuredImage || 'https://dse.best/assets/images/logo-icon.webp';
  const { viewCount, isLoading } = useViewCount(post.slug);

  useEffect(() => {
    // Load Disqus comments script if comments section exists and not already loaded
    setTimeout(() => {
      const disqusThread = document.getElementById('disqus_thread');
      if (disqusThread && !(window as any).DisqusLoaded) {
        // Configure Disqus
        (window as any).disqus_config = function () {
          this.page.url = `https://dse.best/blog/${post.slug}`;
          this.page.identifier = post.slug;
          this.page.robots = 'noindex, nofollow';
        };
        
        // Load Disqus embed script
        const disqusScript = document.createElement('script');
        disqusScript.src = 'https://dsebest.disqus.com/embed.js';
        disqusScript.setAttribute('data-timestamp', (+new Date()).toString());
        disqusScript.onload = () => { (window as any).DisqusLoaded = true; };
        (document.head || document.body).appendChild(disqusScript);
      }
    }, 400);
  }, [post.slug]);

  return (
    <>
      <Head>
        <title>{post.seoTitle}</title>
        <meta name="description" content={post.seoDescription} />
        <meta name="robots" content={post.robots} />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={post.seoTitle} />
        <meta property="og:description" content={post.seoDescription} />
        <meta property="og:image" content={featuredImageUrl} />
        <meta property="og:url" content={`https://dse.best/blog/${post.slug}`} />
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
                "@id": `https://dse.best/blog/${post.slug}`
              },
              "headline": post.seoTitle,
              "description": post.seoDescription,
              "image": "https://dse.best/assets/images/logo-icon.webp",
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
              "dateModified": post.updatedAt
            })
          }}
        />
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
      <div className="card rounded-4">
        <div className="card-body">
          {/* Post Header */}
          <div className="post-header mb-4">
            <h1 className="display-6">
              {post.title}
            </h1>

            {/* Post Meta */}
            <div className="post-meta d-flex flex-wrap align-items-center gap-3 justify-content-between">
              <div className="d-flex align-items-center gap-3">
                <div className="d-flex align-items-center">
                  <BiUserCircle style={{
                    verticalAlign: 'text-bottom',
                    fontSize: '2em',
                    marginRight: '0.25em',
                    color: '#0d6efd',
                    background: 'rgba(13,110,253,0.12)',
                    borderRadius: '50%',
                    padding: '0.18em',
                    boxShadow: '0 1px 4px rgba(13,110,253,0.10)'
                  }} />
                  <span>{post.author}</span>
                </div>
                <div className="d-flex align-items-center">
                  <BiCalendarEvent style={{
                    verticalAlign: 'text-bottom',
                    fontSize: '2em',
                    marginRight: '0.25em',
                    color: '#198754',
                    background: 'rgba(25,135,84,0.12)',
                    borderRadius: '50%',
                    padding: '0.18em',
                    boxShadow: '0 1px 4px rgba(25,135,84,0.10)'
                  }} />
                  <span>{post.date}</span>
                </div>
                <div className="d-flex align-items-center">
                  <BiTimeFive style={{
                    verticalAlign: 'text-bottom',
                    fontSize: '2em',
                    marginRight: '0.25em',
                    color: '#0dcaf0',
                    background: 'rgba(13,202,240,0.12)',
                    borderRadius: '50%',
                    padding: '0.18em',
                    boxShadow: '0 1px 4px rgba(13,202,240,0.10)'
                  }} />
                  <span>{post.readingTime ? `${post.readingTime}min read` : ''}</span>
                </div>
                <div className="d-flex align-items-center">
                  <BiShow style={{
                    verticalAlign: 'text-bottom',
                    fontSize: '2em',
                    marginRight: '0.25em',
                    color: '#ffc107',
                    background: 'rgba(255,193,7,0.12)',
                    borderRadius: '50%',
                    padding: '0.18em',
                    boxShadow: '0 1px 4px rgba(255,193,7,0.10)'
                  }} />
                  <span>
                    {isLoading ? '...' : (viewCount || 0)} 
                  </span>
                </div>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="post-tags d-flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        display: 'inline-block',
                        background: 'linear-gradient(90deg, #0d6efd 60%, #0dcaf0 100%)',
                        color: '#fff',
                        borderRadius: '999px',
                        padding: '0.35em 1em',
                        fontWeight: 500,
                        fontSize: '1em',
                        letterSpacing: '0.03em',
                        boxShadow: '0 1px 6px rgba(13,110,253,0.10)',
                        border: 'none',
                        transition: 'background 0.2s',
                        cursor: 'default',
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Featured Image */}
            {post.featuredImage && (
              <div className="text-center mb-4">
                <img 
                  src={post.featuredImage} 
                  alt={post.title}
                  className="img-fluid rounded" 
                  style={{ maxHeight: '400px', objectFit: 'cover' }} 
                />
              </div>
            )}
          </div>

          {/* Post Content */}
          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />

          {/* Comments Section */}
          {post.comments && (
            <>
              <hr className="my-5" style={{ borderColor: 'var(--bs-border-color-translucent)' }} />
              <div className="comments-section px-3 py-2">
                <h4 className="mb-4">
                  <BiComment style={{
                    verticalAlign: 'text-bottom',
                    fontSize: '2em',
                    marginRight: '0.25em',
                    color: '#6c757d',
                    background: 'rgba(108,117,125,0.12)',
                    borderRadius: '50%',
                    padding: '0.18em',
                    boxShadow: '0 1px 4px rgba(108,117,125,0.10)'
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

          {/* Post Footer */}
          <div className="post-footer mt-5 pt-4 border-top">
            <div className="row">
              <div className="col-md-12 text-md-end">
                <NavigationLink href="/blog/" className="btn btn-outline-primary back-to-blog">
                  <span className="d-flex align-items-center">
                    <span className="me-2" style={{ fontSize: '1.2em' }}>←</span>
                    返回主頁
                  </span>
                </NavigationLink>
              </div>
            </div>
          </div>
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
    // Read from static JSON file generated at build time
    const postPath = path.join(process.cwd(), 'data', 'posts', `${slug}.json`);
    const post = JSON.parse(fs.readFileSync(postPath, 'utf8'));

    return {
      props: {
        post
      }
    };
  } catch (error) {
    console.error(`Error loading post ${slug}:`, error);
    return {
      notFound: true
    };
  }
};
