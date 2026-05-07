import { useState, useMemo, useEffect } from 'react'
import { GetStaticProps } from 'next'
import {
  BiCalendarEvent, BiTimeFive, BiShow,
  BiSearch, BiSort, BiFileBlank, BiUser,
} from 'react-icons/bi'
import NavigationLink from '../../components/NavigationLink'
import PageBreadcrumb from '../../components/PageBreadcrumb'
import PageSEO from '../../components/PageSEO'
import DefaultThumb from '../../components/DefaultThumb'
import { buildBlogJsonLd } from '../../data/jsonld/pages'
import { sanityClient, urlFor } from '../../lib/sanity'
import { INDEX_POSTS_QUERY, CATEGORIES_QUERY } from '../../lib/sanityQueries'
import type { Post, SanityCategory } from '../../lib/blogTypes'
import { CatIcon } from '../../lib/catIcon'

interface BlogIndexProps {
  posts: Post[]
  categories: SanityCategory[]
}

const SORT_OPTIONS = [
  { value: 'newest', label: '最新 Newest' },
  { value: 'oldest', label: '最舊 Oldest' },
  { value: 'popular', label: '熱門 Popular' },
]

const POSTS_PER_PAGE = 9

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('zh-HK', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function postEffectiveDate(post: Post) {
  return post.publishedAt || post._createdAt
}

function coverSrc(post: Post): string | null {
  if (!post.coverImage?.asset) return null
  return urlFor(post.coverImage).width(600).height(380).format('webp').url()
}

function authorAvatarSrc(post: Post): string | null {
  const av = post.author?.avatar
  if (!av?.asset) return null
  return urlFor(av).width(64).height(64).format('webp').url()
}

function BlogCard({
  post,
  viewCount,
  isLoadingCounts,
  priority = false,
}: {
  post: Post
  viewCount?: number
  isLoadingCounts: boolean
  priority?: boolean
}) {
  const catColor = post.category?.color ?? '#549ee8'
  const catLabel = post.category?.title ?? '其他'
  const effectiveDate = postEffectiveDate(post)
  const hasAuthor =
    post.author && post.author.mode !== 'disabled' && post.author.displayName
  const cover = coverSrc(post)
  const avatar = authorAvatarSrc(post)

  return (
    <NavigationLink
      href={`/blog/${post.slug.current}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
    >
      <article
        style={{
          background: 'var(--color-card-bg)',
          borderRadius: '12px',
          border: '1px solid var(--color-border)',
          boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'relative', height: '190px', flexShrink: 0, overflow: 'hidden' }}>
          {cover ? (
            <img
              src={cover}
              alt={post.coverImageAlt || post.title}
              width={600}
              height={190}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              loading={priority ? 'eager' : 'lazy'}
            />
          ) : (
            <DefaultThumb title={post.title} subtitle={catLabel} color={catColor} id={post._id} />
          )}

          <span
            style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              background: catColor,
              color: '#fff',
              padding: '3px 10px',
              borderRadius: '20px',
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.4px',
              zIndex: 2,
              border: '2px solid rgba(255,255,255,0.45)',
              boxShadow: '0 2px 8px rgba(0,0,0,0.22)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <CatIcon name={post.category?.lucideIcon} size={10} />
            {catLabel}
          </span>

          {post.pinned && (
            <span
              style={{
                position: 'absolute',
                top: '10px',
                right: '10px',
                fontSize: '0.7rem',
                background: 'rgba(0,0,0,0.55)',
                color: '#fff',
                padding: '2px 8px',
                borderRadius: '20px',
                fontWeight: 600,
              }}
            >
              📌
            </span>
          )}
        </div>

        <div
          style={{
            padding: '14px 16px',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}
        >
          <h3
            style={{
              margin: 0,
              fontSize: '1.3rem',
              fontWeight: 700,
              lineHeight: 1.4,
              color: 'var(--color-heading)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              wordBreak: 'break-word',
            }}
          >
            {post.title}
          </h3>

          {post.excerpt && (
            <p
              style={{
                margin: 0,
                fontSize: '0.95rem',
                lineHeight: 1.55,
                color: 'var(--color-secondary)',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                wordBreak: 'break-word',
                flex: 1,
              }}
            >
              {post.excerpt}
            </p>
          )}

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontSize: '0.9em',
              color: 'var(--color-muted)',
              marginTop: 'auto',
              paddingBottom: '1px',
              paddingTop: '8px',
            }}
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
              <BiCalendarEvent style={{ fontSize: '13px' }} />
              {formatDate(effectiveDate)}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {post.readingTime && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <BiTimeFive style={{ fontSize: '13px', marginTop: '1px' }} />
                  {post.readingTime}m
                </span>
              )}
              {post.showViews && (
                <span style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                  <BiShow style={{ fontSize: '13px', marginTop: '2px' }} />
                  {isLoadingCounts ? (
                    <span
                      style={{
                        display: 'inline-block',
                        height: '10px',
                        width: '26px',
                        borderRadius: '4px',
                        background: 'var(--color-border)',
                      }}
                    />
                  ) : (
                    viewCount ?? 0
                  )}
                </span>
              )}
            </div>
          </div>

          <div
            style={{
              height: '1.99px',
              background: 'var(--color-border)',
              margin: '3px 0',
            }}
          />

          {hasAuthor && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.88rem',
                color: 'var(--color-body)',
              }}
            >
              {avatar ? (
                <img
                  src={avatar}
                  alt={post.author!.displayName}
                  width={18}
                  height={18}
                  style={{ borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                />
              ) : (
                <BiUser style={{ fontSize: '14px', flexShrink: 0, opacity: 0.7, marginTop: '2px' }} />
              )}
              <span style={{ fontWeight: 500 }}>{post.author!.displayName}</span>
            </div>
          )}
        </div>
      </article>
    </NavigationLink>
  )
}

function FilterSortBar({
  categories,
  selectedCategory,
  onCategoryChange,
  selectedSort,
  onSortChange,
  searchQuery,
  onSearchChange,
}: {
  categories: SanityCategory[]
  selectedCategory: string
  onCategoryChange: (v: string) => void
  selectedSort: string
  onSortChange: (v: string) => void
  searchQuery: string
  onSearchChange: (v: string) => void
}) {
  const [sortOpen, setSortOpen] = useState(false)

  useEffect(() => {
    if (!sortOpen) return
    function close() { setSortOpen(false) }
    document.addEventListener('click', close)
    return () => document.removeEventListener('click', close)
  }, [sortOpen])

  const allCategories = [
    { _id: '__all__', title: '全部 All', slug: { current: 'all' }, color: '#5b5fc7' } as SanityCategory,
    ...categories.filter((c) => c.title !== '其他'),
    ...categories.filter((c) => c.title === '其他'),
  ]

  const cardStyle: React.CSSProperties = {
    background: 'var(--color-card-bg)',
    borderRadius: '10px',
    padding: '14px',
    marginBottom: '20px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
    border: '1px solid var(--color-border)',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.73rem',
    fontWeight: 600,
    color: 'var(--color-body)',
    marginBottom: '6px',
  }

  const inputBorderStyle: React.CSSProperties = {
    width: '100%',
    padding: '9px 12px 9px 38px',
    borderRadius: '8px',
    border: '1px solid var(--color-border)',
    background: 'var(--color-card-bg)',
    color: 'var(--color-body)',
    fontSize: '0.875rem',
    outline: 'none',
  }

  return (
    <div style={cardStyle}>
      <div className="hidden md:flex" style={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: '14px' }}>
        <div style={{ flex: 1 }}>
          <label style={labelStyle}>分類 Categories</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {allCategories.map((cat) => {
              const active = selectedCategory === cat.slug.current
              const catColor = cat.color || '#549ee8'
              return (
                <button
                  key={cat._id}
                  onClick={() => onCategoryChange(cat.slug.current)}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '5px',
                    padding: '5px 12px',
                    borderRadius: '13px',
                    border: active ? `2px solid ${catColor}` : '2px solid rgba(0,0,0,0.1)',
                    backgroundColor: catColor,
                    color: '#fff',
                    fontSize: '0.78rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    whiteSpace: 'nowrap',
                    opacity: active ? 1 : 0.75,
                    boxShadow: active ? `0px 4px 17px ${catColor}77` : 'none',
                  }}
                >
                  <CatIcon name={cat.lucideIcon} size={11} />
                  {cat.title}
                </button>
              )
            })}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '4px' }}>
          <label style={labelStyle}>排序 Sort</label>
          <div style={{ position: 'relative' }} onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setSortOpen((o) => !o)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid var(--color-border)',
                background: 'var(--color-card-bg)',
                color: 'var(--color-body)',
                fontSize: '0.8rem',
                fontWeight: 500,
                cursor: 'pointer',
                minWidth: '130px',
              }}
            >
              <BiSort style={{ fontSize: '14px' }} />
              {SORT_OPTIONS.find((o) => o.value === selectedSort)?.label}
            </button>
            {sortOpen && (
              <div
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: 'var(--color-card-bg)',
                  borderRadius: '8px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.14)',
                  border: '1px solid var(--color-border)',
                  zIndex: 100,
                  marginTop: '2px',
                  overflow: 'hidden',
                }}
              >
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { onSortChange(opt.value); setSortOpen(false) }}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '8px 12px',
                      border: 'none',
                      background: 'transparent',
                      color: selectedSort === opt.value ? 'var(--color-primary)' : 'var(--color-body)',
                      fontSize: '0.8rem',
                      fontWeight: selectedSort === opt.value ? 600 : 400,
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="block md:hidden">
        <div style={{ marginBottom: '10px' }}>
          <label style={labelStyle}>分類 Categories</label>
          <select
            value={selectedCategory}
            onChange={(e) => onCategoryChange(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              background: 'var(--color-card-bg)',
              color: 'var(--color-body)',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {allCategories.map((cat) => (
              <option key={cat._id} value={cat.slug.current}>
                {cat.title}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={labelStyle}>排序 Sort</label>
          <select
            value={selectedSort}
            onChange={(e) => onSortChange(e.target.value)}
            style={{
              width: '100%',
              padding: '9px 12px',
              borderRadius: '8px',
              border: '1px solid var(--color-border)',
              background: 'var(--color-card-bg)',
              color: 'var(--color-body)',
              fontSize: '0.875rem',
              fontWeight: 500,
              cursor: 'pointer',
            }}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div
        style={{
          marginTop: '12px',
          paddingTop: '12px',
          borderTop: '1px solid var(--color-border)',
          position: 'relative',
        }}
      >
        <BiSearch
          style={{
            position: 'absolute',
            left: '12px',
            top: '50%',
            transform: 'translateY(-6%)',
            fontSize: '16px',
            color: 'var(--color-muted)',
            pointerEvents: 'none',
          }}
        />
        <input
          type="text"
          placeholder="搜尋文章… Search posts…"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          style={inputBorderStyle}
        />
      </div>
    </div>
  )
}

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}) {
  const pages: (number | '...')[] = []
  const max = 5

  if (totalPages <= max) {
    for (let i = 1; i <= totalPages; i++) pages.push(i)
  } else if (currentPage <= 3) {
    pages.push(1, 2, 3, 4, '...', totalPages)
  } else if (currentPage >= totalPages - 2) {
    pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages)
  } else {
    pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages)
  }

  function btnStyle(active: boolean, disabled: boolean): React.CSSProperties {
    return {
      padding: '9px 14px',
      borderRadius: '10px',
      border: active
        ? '2px solid var(--color-primary)'
        : '2px solid var(--color-border)',
      background: active ? 'var(--color-primary)' : 'var(--color-card-bg)',
      color: disabled
        ? 'var(--color-muted)'
        : active
          ? '#fff'
          : 'var(--color-body)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      fontSize: '0.875rem',
      fontWeight: 600,
      minWidth: '40px',
      opacity: disabled ? 0.6 : 1,
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '6px', marginTop: '36px' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={btnStyle(false, currentPage === 1)}
      >
        ← 上頁
      </button>

      {pages.map((page, i) =>
        page === '...' ? (
          <span
            key={`ellipsis-${i}`}
            style={{ padding: '9px 6px', color: 'var(--color-muted)', fontSize: '0.875rem' }}
          >
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page as number)}
            style={btnStyle(page === currentPage, false)}
          >
            {page}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={btnStyle(false, currentPage === totalPages)}
      >
        下頁 →
      </button>
    </div>
  )
}

export default function BlogIndex({ posts, categories }: BlogIndexProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSort, setSelectedSort] = useState('newest')
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [viewCounts, setViewCounts] = useState<Record<string, number>>({})
  const [isLoadingCounts, setIsLoadingCounts] = useState(false)
  const [fuse, setFuse] = useState<any>(null)

  // Fetch view counts (cached in sessionStorage, 5 min TTL)
  useEffect(() => {
    const fetchCounts = async () => {
      const cached = sessionStorage.getItem('blogViewCounts')
      const cacheTime = sessionStorage.getItem('blogViewCountsTime')
      const now = Date.now()
      if (cached && cacheTime && now - parseInt(cacheTime) < 5 * 60 * 1000) {
        setViewCounts(JSON.parse(cached))
        return
      }
      setIsLoadingCounts(true)
      try {
        const slugs = posts
          .slice()
          .sort((a, b) => new Date(postEffectiveDate(b)).getTime() - new Date(postEffectiveDate(a)).getTime())
          .slice(0, 100)
          .map((p) => p.slug.current)
        const merged: Record<string, number> = {}
        for (let i = 0; i < slugs.length; i += 80) {
          const chunk = slugs.slice(i, i + 80).join(',')
          const res = await fetch(`https://api-v2.dse.best/view-count?slugs=${encodeURIComponent(chunk)}`)
          if (res.ok) {
            const data = await res.json()
            Object.assign(merged, data.counts ?? {})
          }
        }
        setViewCounts(merged)
        sessionStorage.setItem('blogViewCounts', JSON.stringify(merged))
        sessionStorage.setItem('blogViewCountsTime', String(now))
      } catch {
        // silently fail — views just show 0
      } finally {
        setIsLoadingCounts(false)
      }
    }
    if (posts.length) fetchCounts()
  }, [posts])

  // Lazy-load Fuse on first non-empty search
  useEffect(() => {
    if (!searchQuery.trim() || fuse) return
    let cancelled = false
      ; (async () => {
        const Fuse = (await import('fuse.js')).default
        if (cancelled) return
        const instance = new Fuse(posts, {
          keys: [
            { name: 'title', weight: 3 },
            { name: 'tags', weight: 2 },
            { name: 'excerpt', weight: 1 },
            { name: 'category.title', weight: 1 },
          ],
          threshold: 0.35,
          ignoreLocation: true,
        })
        setFuse(instance)
      })()
    return () => { cancelled = true }
  }, [searchQuery, fuse, posts])

  const filteredPosts = useMemo(() => {
    let result = [...posts]

    if (selectedCategory !== 'all') {
      result = result.filter((p) => p.category?.slug.current === selectedCategory)
    }

    const q = searchQuery.trim()
    if (q) {
      if (fuse) {
        const hits = new Set(fuse.search(q).map((r: any) => r.item._id))
        result = result.filter((p) => hits.has(p._id))
      } else {
        const ql = q.toLowerCase()
        result = result.filter(
          (p) =>
            p.title.toLowerCase().includes(ql) ||
            (p.excerpt ?? '').toLowerCase().includes(ql) ||
            (p.tags ?? []).some((t) => t.toLowerCase().includes(ql)) ||
            (p.category?.title ?? '').toLowerCase().includes(ql)
        )
      }
    }

    result.sort((a, b) => {
      if (a.pinned && !b.pinned) return -1
      if (!a.pinned && b.pinned) return 1
      switch (selectedSort) {
        case 'newest':
          return new Date(postEffectiveDate(b)).getTime() - new Date(postEffectiveDate(a)).getTime()
        case 'oldest':
          return new Date(postEffectiveDate(a)).getTime() - new Date(postEffectiveDate(b)).getTime()
        case 'popular': {
          const diff = (viewCounts[b.slug.current] ?? 0) - (viewCounts[a.slug.current] ?? 0)
          return diff !== 0 ? diff : new Date(postEffectiveDate(b)).getTime() - new Date(postEffectiveDate(a)).getTime()
        }
        default:
          return 0
      }
    })

    return result
  }, [posts, selectedCategory, searchQuery, selectedSort, viewCounts, fuse])

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / POSTS_PER_PAGE))
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * POSTS_PER_PAGE,
    currentPage * POSTS_PER_PAGE
  )

  useEffect(() => { setCurrentPage(1) }, [selectedCategory, selectedSort, searchQuery])

  const jsonLdPosts = posts.map((p) => ({
    seoTitle: p.title,
    seoDescription: p.excerpt,
    author: p.author?.displayName ?? 'dse.best',
    createdAt: p._createdAt,
    updatedAt: p.publishedAt || p._createdAt,
    slug: p.slug.current,
  }))

  return (
    <>
      <PageSEO
        title="Blog | dse.best — DSE 學習資源、考試技巧、備考攻略"
        description="dse.best Blog 提供 DSE 考試資訊、中文英文數學物理化學生物 ICT M1 M2 歷屆試題分析、溫習技巧、考生心得、JUPAS 選科攻略、放榜資訊。"
        ogTitle="Blog | dse.best — DSE 學習資源"
        ogDescription="DSE Blog 提供 2025、2026 DSE 考試資訊及備考策略。"
        ogUrl="https://dse.best/blog"
        robots={['index', 'follow']}
        pageKey="blog"
        jsonLd={[buildBlogJsonLd(jsonLdPosts)]}
      />

      <PageBreadcrumb section="其他" text="Blog" />

      <div className="blog-index-wrap">
        <div style={{ textAlign: 'center', padding: '28px 16px 20px', maxWidth: '820px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '2.3rem', fontWeight: 100000, color: '#549ee8', marginBottom: '3px' }}>
            Blog
          </h1>
          <p style={{ color: 'var(--color-body)', margin: 0, fontSize: '1.2rem', lineHeight: 1.65 }}>
            <strong>dse.best</strong> 為香港中學文憑試（DSE）考生提供最全面的學習資源和最新考試資訊，
            包括歷屆試題、詳細答案、溫習策略和心得分享。
          </p>
        </div>

        <FilterSortBar
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          selectedSort={selectedSort}
          onSortChange={setSelectedSort}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {currentPosts.length > 0 ? (
          <div className="bi-blog-grid">
            {currentPosts.map((post, i) => (
              <BlogCard
                key={post._id}
                post={post}
                viewCount={viewCounts[post.slug.current]}
                isLoadingCounts={isLoadingCounts}
                priority={i < 2 && currentPage === 1}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: 'var(--color-body)',
              maxWidth: '540px',
              margin: '0 auto',
            }}
          >
            <BiFileBlank style={{ fontSize: '56px', marginBottom: '14px', opacity: 0.45 }} />
            <h3 style={{ margin: '0 0 8px', fontSize: '1.3rem' }}>
              {searchQuery.trim() ? '找不到相關文章' : '暫無文章'}
            </h3>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--color-muted)' }}>
              {searchQuery.trim()
                ? `沒有找到包含「${searchQuery}」的文章，請嘗試其他關鍵字`
                : '請稍後再來查看最新內容'}
            </p>
          </div>
        )}

        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </div>

      <style jsx>{`
        .blog-index-wrap {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 12px 48px;
        }

        .bi-blog-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
          margin-bottom: 8px;
        }

        @media (min-width: 640px) {
          .bi-blog-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 22px;
          }
        }

        @media (min-width: 992px) {
          .bi-blog-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 24px;
          }
        }
      `}</style>
    </>
  )
}

export const getStaticProps: GetStaticProps<BlogIndexProps> = async () => {
  let posts: Post[] = []
  let categories: SanityCategory[] = []

  try {
    [posts, categories] = await Promise.all([
      sanityClient.fetch(INDEX_POSTS_QUERY),
      sanityClient.fetch(CATEGORIES_QUERY),
    ])
  } catch (err) {
    console.warn('[blog/index] Sanity fetch failed:', (err as Error).message)
  }

  return { props: { posts: posts ?? [], categories: categories ?? [] } }
}
