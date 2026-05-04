export default {
  name: 'post',
  title: 'Post',
  type: 'document',
 
  groups: [
    { name: 'content',  title: '📝 Content',  default: true },
    { name: 'author',   title: '👤 Author'                  },
    { name: 'display',  title: '🖥️ Display'                 },
    { name: 'advanced', title: '⚙️ Advanced'                },
  ],

  orderings: [
    {
      title: 'Newest First',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
    {
      title: 'Oldest First',
      name: 'publishedAtAsc',
      by: [{ field: 'publishedAt', direction: 'asc' }],
    },
    {
      title: 'Title A–Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],

  fields: [
 
    // ─── CONTENT ─────────────────────────────────────────────────────────────
 
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      group: 'content',
      validation: (Rule: any) => Rule.required().error('Title is required'),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'content',
      options: { source: 'title' },
      validation: (Rule: any) => Rule.required().error('Slug is required'),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      group: 'content',
      description: 'Short preview shown in the blog directory.',
    },
    {
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt',     type: 'string', title: 'Alt text' },
            { name: 'caption', type: 'string', title: 'Caption'  },
          ],
        },
      ],
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      description: 'Shown on blog index cards and used as the og:image. Never rendered inside the post itself.',
      fields: [
        { name: 'alt', type: 'string', title: 'Alt text' },
      ],
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      description: 'Full-width banner shown inside the post, directly below the title. Not used for og:image or index cards.',
      fields: [
        { name: 'alt', type: 'string', title: 'Alt text' },
      ],
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      group: 'content',
      description: 'Pick from the shared category list. Add new categories in the Category section.',
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      group: 'content',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    },
    {
      name: 'relatedPosts',
      title: 'Related Posts',
      type: 'array',
      group: 'content',
      of: [{ type: 'reference', to: [{ type: 'post' }] }],
      description: 'Manually pick related posts shown at the bottom of this post.',
      // ✅ Change 1: max(5) + self-reference guard
      validation: (Rule: any) =>
        Rule.max(5).custom((posts: any[], context: any) => {
          if (!posts?.length) return true
          const selfId = context.document?._id?.replace('drafts.', '')
          const hasSelf = posts.some((p) => p._ref === selfId)
          return hasSelf ? 'A post cannot reference itself' : true
        }),
    },
 
    // ─── AUTHOR ──────────────────────────────────────────────────────────────
 
    {
      name: 'author',
      title: 'Author',
      type: 'object',
      group: 'author',
      fields: [
        {
          name: 'mode',
          title: 'Author Mode',
          type: 'string',
          options: {
            list: [
              { title: '🚫 No author info',               value: 'disabled' },
              { title: '👤 Team member (shared profile)',  value: 'team'     },
              { title: '✍️  Custom (this post only)',      value: 'custom'   },
            ],
            layout: 'radio',
          },
          initialValue: 'disabled',
        },
 
        // ── Mode: team ────────────────────────────────────────────────────────
        {
          name: 'teamAuthor',
          title: 'Team Member',
          type: 'reference',
          to: [{ type: 'author' }],
          description: 'Select a profile from the shared Author list.',
          // ✅ Change 2: only show active authors in the picker
          options: {
            filter: 'isActive == true',
          },
          hidden: ({ parent }: any) => parent?.mode !== 'team',
        },
 
        // ── Mode: custom ──────────────────────────────────────────────────────
        {
          name: 'customDisplayName',
          title: 'Display Name',
          type: 'string',
          hidden: ({ parent }: any) => parent?.mode !== 'custom',
        },
        {
          name: 'customAvatar',
          title: 'Avatar',
          type: 'image',
          options: { hotspot: true },
          hidden: ({ parent }: any) => parent?.mode !== 'custom',
        },
        {
          name: 'customBio',
          title: 'Bio',
          type: 'text',
          rows: 2,
          hidden: ({ parent }: any) => parent?.mode !== 'custom',
        },
      ],
    },
 
    // ─── DISPLAY ─────────────────────────────────────────────────────────────
 
    {
      name: 'publishedAt',
      title: 'Published At (Override)',
      type: 'date',
      group: 'display',
      options: { dateFormat: 'YYYY-MM-DD' },
      description: 'Leave empty to use creation date. Fill only to correct a mistake.',
    },
    {
      name: 'readingTime',
      title: 'Reading Time (min)',
      type: 'number',
      group: 'display',
    },
    {
      name: 'showInDirectory',
      title: 'Show in Directory',
      type: 'boolean',
      group: 'display',
      initialValue: true,
      description: 'Whether this post appears in the blog listing page.',
    },
    {
      name: 'showViews',
      title: 'Show View Count',
      type: 'boolean',
      group: 'display',
      initialValue: true,
    },
    {
      name: 'pinned',
      title: 'Pinned',
      type: 'boolean',
      group: 'display',
      initialValue: false,
      description: 'Pin to top of blog directory regardless of date.',
    },
 
    // ─── ADVANCED ────────────────────────────────────────────────────────────
 
    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'advanced',
      description: 'Falls back to Title if empty.',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      group: 'advanced',
      description: 'Falls back to Excerpt if empty.',
    },
    {
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      group: 'advanced',
      initialValue: false,
      description: 'Prevent search engines from indexing this post.',
    },
    {
      name: 'loadAds',
      title: 'Load Ads',
      type: 'boolean',
      group: 'advanced',
      initialValue: true,
      description: 'Whether Google AdSense ads are loaded on this post.',
    },
  ],
 
  preview: {
  select: {
    title:       'title',
    publishedAt: 'publishedAt',
    _createdAt:  '_createdAt',
    media:       'coverImage',
    pinned:      'pinned',
    noIndex:     'noIndex',
  },
  prepare({ title, publishedAt, _createdAt, media, pinned, noIndex }: any) {
    const flags = [pinned && '📌', noIndex && '🚫'].filter(Boolean).join(' ')
    const date = publishedAt || _createdAt
    const dateStr = date ? new Date(date).toLocaleDateString('zh-HK') : ''
    return {
      title:    flags ? `${flags} ${title}` : title,
      subtitle: dateStr,
      media,
    }
  },
},
}