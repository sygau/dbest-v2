import { LuInstagram, LuGlobe, LuAtSign } from 'react-icons/lu'
import { FaXTwitter, FaYoutube, FaPatreon } from 'react-icons/fa6'
import { urlFor } from '../../lib/sanity'
import type { PostAuthorFull } from '../../lib/blogTypes'

export default function AuthorCardBottom({ author }: { author: PostAuthorFull }) {
  if (!author || author.mode === 'disabled' || !author.displayName) return null

  const avatarSrc = author.avatar
    ? urlFor(author.avatar).width(128).height(128).format('webp').url()
    : null
  
  const authorInitial = author.displayName ? author.displayName.slice(0, 1).toUpperCase() : '?'

  return (
    <div className="blog-author-card-wrap">
      <div className="flex flex-col sm:flex-row items-start gap-4" style={{ alignItems: author.tagline ? 'flex-start' : 'center' }}>
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={author.displayName}
            className="blog-author-avatar flex-shrink-0"
            style={{ alignSelf: 'flex-start' }}
            width={64}
            height={64}
          />
        ) : (
          <span style={{
            width: '64px', height: '64px', borderRadius: '9999px',
            background: 'rgba(139,92,246,0.15)', color: '#8b5cf6',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', fontWeight: 700, flexShrink: 0,
            border: '2px solid var(--color-border)',
            alignSelf: 'flex-start'
          }}>
            {authorInitial}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap translate-y-2">
            <span className="blog-author-card-name">{author.displayName}</span>
          </div>
          {author.bio && (
            <p className="blog-author-card-bio mb-3 whitespace-pre-line">{author.bio}</p>
          )}
          <div className="flex items-center gap-2 flex-wrap translate-y-1">
            {author.email && (
              <a href={`mailto:${author.email}`} className="blog-social-link">
                <span>{author.email}</span>
              </a>
            )}
            {author.socialLinks?.map((link, i) => {
              const Icon =
                link.platform === 'instagram' ? LuInstagram :
                link.platform === 'x' ? FaXTwitter :
                link.platform === 'youtube' ? FaYoutube :
                link.platform === 'threads' ? LuAtSign :
                link.platform === 'patreon' ? FaPatreon :
                LuGlobe
              const label =
                link.platform === 'website'
                  ? '個人網站'
                  : `@${link.handle ?? ''}`
              return (
                <a
                  key={i}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="blog-social-link"
                >
                  <Icon size={13} style={{ marginTop: '2px' }} />
                  <span>{label}</span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
