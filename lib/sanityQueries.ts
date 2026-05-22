import groq from 'groq'

const AUTHOR_FILTER = `(!defined(author.mode) || author.mode != "team" || author.teamAuthor->isActive == true)`

const AUTHOR_INDEX_PROJECTION = `
  "author": select(
    author.mode == "disabled" => { "mode": "disabled" },
    author.mode == "team" => {
      "mode": "team",
      "displayName": author.teamAuthor->displayName,
      "avatar": author.teamAuthor->avatar
    },
    author.mode == "custom" => {
      "mode": "custom",
      "displayName": author.customDisplayName,
      "avatar": author.customAvatar
    }
  )
`

const AUTHOR_FULL_PROJECTION = `
  "author": select(
    author.mode == "disabled" => { "mode": "disabled" },
    author.mode == "team" => {
      "mode": "team",
      "displayName": author.teamAuthor->displayName,
      "tagline":     author.teamAuthor->tagline,
      "avatar":      author.teamAuthor->avatar,
      "bio":         author.teamAuthor->bio,
      "email":       author.teamAuthor->email,
      "socialLinks": author.teamAuthor->socialLinks,
      "isActive":    author.teamAuthor->isActive
    },
    author.mode == "custom" => {
      "mode": "custom",
      "displayName": author.customDisplayName,
      "avatar": author.customAvatar,
      "bio": author.customBio
    }
  )
`

export const INDEX_POSTS_QUERY = groq`
*[_type == "post" && showInDirectory == true && ${AUTHOR_FILTER}]
| order(pinned desc, coalesce(publishedAt, _createdAt) desc) {
  _id, title, slug, excerpt,
  coverImage,
  "coverImageAlt": coverImage.alt,
  tags,
  category->{ _id, title, slug, color, emoji, lucideIcon, displayOrder },
  ${AUTHOR_INDEX_PROJECTION},
  publishedAt, _createdAt, readingTime, pinned, showViews
}
`

export const CATEGORIES_QUERY = groq`
*[_type == "category"] | order(displayOrder asc) {
  _id, title, slug, color, emoji, lucideIcon, displayOrder
}
`

export const POST_SLUGS_QUERY = groq`
*[_type == "post" && ${AUTHOR_FILTER}].slug.current
`

export const POST_BY_SLUG_QUERY = groq`
*[_type == "post" && slug.current == $slug && ${AUTHOR_FILTER}][0] {
  _id, title, slug, excerpt, body,
  "hasMath": count(body[_type == "latex"]) > 0
    || count(body[_type == "block"].children[_type == "latex"]) > 0,
  coverImage, "coverImageAlt": coverImage.alt,
  heroImage,  "heroImageAlt":  heroImage.alt,
  category->{ _id, title, slug, color, emoji, lucideIcon },
  tags,
  ${AUTHOR_FULL_PROJECTION},
  publishedAt, _createdAt, _updatedAt, readingTime,
  showViews, showToc, noIndex, loadAds, seoTitle, seoDescription,
  "relatedPosts": relatedPosts[]->{
    _id, title, slug, excerpt, readingTime,
    coverImage,
    category->{ _id, title, color, lucideIcon },
    publishedAt, _createdAt,
    "author": select(
      !defined(author.mode) || author.mode == "disabled" => null,
      author.mode == "team" => {
        "displayName": author.teamAuthor->displayName,
        "avatarUrl": author.teamAuthor->avatar.asset->url
      },
      {
        "displayName": author.customDisplayName,
        "avatarUrl": author.customAvatar.asset->url
      }
    )
  }
}
`

export const RELATED_BY_CATEGORY_QUERY = groq`
*[_type == "post" && _id != $currentId && showInDirectory == true
  && category._ref == $categoryId && ${AUTHOR_FILTER}]
| order(coalesce(publishedAt, _createdAt) desc)[0...3] {
  _id, title, slug, excerpt, readingTime,
  coverImage,
  category->{ _id, title, color },
  publishedAt, _createdAt,
  "author": select(
    !defined(author.mode) || author.mode == "disabled" => null,
    author.mode == "team" => {
      "displayName": author.teamAuthor->displayName,
      "avatarUrl": author.teamAuthor->avatar.asset->url
    },
    {
      "displayName": author.customDisplayName,
      "avatarUrl": author.customAvatar.asset->url
    }
  )
}
`

export const RELATED_LATEST_QUERY = groq`
*[_type == "post" && _id != $currentId && showInDirectory == true && ${AUTHOR_FILTER}]
| order(coalesce(publishedAt, _createdAt) desc)[0...3] {
  _id, title, slug, excerpt, readingTime,
  coverImage,
  category->{ _id, title, color },
  publishedAt, _createdAt,
  "author": select(
    !defined(author.mode) || author.mode == "disabled" => null,
    author.mode == "team" => {
      "displayName": author.teamAuthor->displayName,
      "avatarUrl": author.teamAuthor->avatar.asset->url
    },
    {
      "displayName": author.customDisplayName,
      "avatarUrl": author.customAvatar.asset->url
    }
  )
}
`

// For build-time scripts (OG/sitemap) — flat asset URL, no urlFor needed
export const BUILD_INDEX_QUERY = groq`
*[_type == "post" && showInDirectory == true && ${AUTHOR_FILTER}]
| order(coalesce(publishedAt, _createdAt) desc) {
  "slug": slug.current,
  title,
  "category": category->title,
  "categoryColor": category->color,
  "coverImageUrl": coverImage.asset->url,
  publishedAt, _createdAt,
  excerpt, tags
}
`
