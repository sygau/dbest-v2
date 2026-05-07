# SEO Link & OG Image Implementation Guide

## 1. OG Image Generation (Build Time)

### Setup
```bash
npm install sharp@0.33.0
npm run og:generate        # First time generation
npm run build:full         # Includes OG generation + build
```

### How it works
- Reads all posts from `data/blog-index.json`
- Generates 1200×750 PNG images using post title + category colors
- Caches results by post slug to skip regeneration
- Outputs to `public/og/` (served statically by Cloudflare)
- For 5000 posts: ~30-60s initial, ~2-5s cached builds

### Using OG images in HTML head
```tsx
// In your blog post page component
const ogImageUrl = `https://dse.best/og/${post.slug}.png`;

// Add to PageSEO or Head:
<meta property="og:image" content={ogImageUrl} />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="750" />
```

### Regenerate on demand
```bash
# Re-run if you update post titles or categories
npm run og:generate
```

---

## 2. External Link Security (Client-side)

### Setup
Use the `SafeBlogContent` component when rendering blog HTML:

```tsx
import { SafeBlogContent } from '@/components/SafeBlogContent';

export default function BlogPost({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      
      {/* Use this for blog content HTML */}
      <SafeBlogContent 
        html={post.content}
        className="blog-prose"
      />
    </div>
  );
}
```

### What it does
- Finds all external links in blog content
- Adds `rel="nofollow noopener"` (prevents link juice leakage)
- Adds `target="_blank"` (opens in new tab)
- **Excludes** dse.best domain links (internal links unaffected)

### Alternative: Server-side transformation
If you need to transform HTML server-side (e.g., static generation):

```tsx
import { transformBlogHTML } from '@/components/SafeBlogContent';

// During static generation or API route
const safeHTML = transformBlogHTML(post.content);
// Now all external links have nofollow/target="_blank"
```

---

## 3. Example Integration (Sanity Blog Post)

```tsx
import PageSEO from '@/components/PageSEO';
import { SafeBlogContent } from '@/components/SafeBlogContent';

export default function BlogPostPage({ post }) {
  const ogImageUrl = `https://dse.best/og/${post.slug}.current}.png`;

  return (
    <>
      <PageSEO
        title={post.title}
        description={post.excerpt}
        image={ogImageUrl}
      />

      <article className="blog-post">
        <h1>{post.title}</h1>
        
        {post.heroImage && (
          <img src={post.heroImage} alt={post.title} />
        )}

        {/* All external links automatically get nofollow + target="_blank" */}
        <SafeBlogContent html={post.body} className="blog-prose" />
      </article>
    </>
  );
}
```

---

## Files Created

- `scripts/generate-og-images.js` - OG image builder (runs at build time)
- `components/SafeBlogContent.tsx` - Link transformation component
- `utils/externalLinkTransformer.ts` - Utility functions (optional)
- `.og-cache.json` - Auto-generated cache file (add to .gitignore)

## .gitignore Updates

Add these to avoid committing generated files:
```
.og-cache.json
public/og/
```
