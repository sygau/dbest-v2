import type { PortableTextBlock } from '@portabletext/types'

export interface SanityImage {
  _type?: 'image'
  asset?: { _ref: string; _type: 'reference' }
  alt?: string
  caption?: string
  hotspot?: any
  crop?: any
}

export interface SanityCategory {
  _id: string
  title: string
  slug: { current: string }
  color: string
  emoji?: string
  lucideIcon?: string
  displayOrder?: number
}

export type AuthorMode = 'disabled' | 'team' | 'custom'

export interface PostAuthorIndex {
  mode: AuthorMode
  displayName?: string
  avatar?: SanityImage
  avatarUrl?: string
}

export interface SocialLink {
  platform: 'instagram' | 'x' | 'youtube' | 'threads' | 'patreon' | 'website'
  handle?: string
  url: string
}

export interface PostAuthorFull extends PostAuthorIndex {
  tagline?: string
  bio?: string
  email?: string
  socialLinks?: SocialLink[]
  isActive?: boolean
}

export interface Post {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  coverImage?: SanityImage
  coverImageAlt?: string
  category?: SanityCategory
  tags?: string[]
  author?: PostAuthorIndex
  publishedAt?: string
  _createdAt: string
  readingTime?: number
  pinned: boolean
  showViews: boolean
}

export interface RelatedPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  readingTime?: number
  coverImage?: SanityImage
  category?: { _id: string; title: string; color: string; lucideIcon?: string }
  publishedAt?: string
  _createdAt?: string
  author?: { displayName?: string; avatarUrl?: string } | null
}

export interface PostFull {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  body?: PortableTextBlock[]
  hasMath?: boolean
  coverImage?: SanityImage
  coverImageAlt?: string
  heroImage?: SanityImage
  heroImageAlt?: string
  category?: SanityCategory
  tags?: string[]
  author?: PostAuthorFull
  publishedAt?: string
  _createdAt: string
  readingTime?: number
  showViews: boolean
  showToc?: boolean
  noIndex?: boolean
  loadAds?: boolean
  seoTitle?: string
  seoDescription?: string
  relatedPosts?: RelatedPost[]
}
