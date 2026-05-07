import { DualBodyInput } from '../components/DualBodyInput'
export default {
  name: 'post',
  title: 'Post',
  type: 'document',

  groups: [
    { name: 'content', title: '📝 Content', default: true },
    { name: 'author', title: '👤 Author' },
    { name: 'display', title: '🖥️ Display' },
    { name: 'advanced', title: '⚙️ Advanced' },
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
      description: 'The URL slug for this post. (e.g., dse.best/*dse-english-tips*) Must be unique.',
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
      components: { input: DualBodyInput },
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt text' },
            { name: 'caption', type: 'string', title: 'Caption' },
          ],
        },

        // ── Code Block (requires @sanity/code-input plugin in Studio) ─────────
        {
          type: 'code',
          options: {
            withFilename: true,
            languageAlternatives: [
              { title: 'TSX', value: 'tsx' },
              { title: 'JavaScript', value: 'javascript' },
              { title: 'TypeScript', value: 'typescript' },
              { title: 'HTML', value: 'html' },
              { title: 'CSS', value: 'css' },
              { title: 'JSON', value: 'json' },
              { title: 'Bash', value: 'bash' },
              { title: 'Python', value: 'python' },
              { title: 'Go', value: 'go' },
              { title: 'SQL', value: 'sql' },
            ],
          },
        },

        // ── Separator (requires separator schema type registered in Studio) ───
        { type: 'separator' },

        // ── Table (requires @sanity/table plugin in Studio) ────────────────
        { type: 'table' },

        // ── YouTube Embed ─────────────────────────────────────────────────────
        {
          type: 'object',
          name: 'youtubeEmbed',
          title: 'YouTube Video',
          fields: [
            {
              name: 'url',
              title: 'YouTube URL',
              type: 'url',
              description: 'Paste the YouTube video link (e.g. https://youtu.be/abc123 or https://www.youtube.com/watch?v=abc123)',
              validation: (Rule: any) => Rule.required().uri({ scheme: ['https', 'http'] }),
            },
            {
              name: 'caption',
              title: 'Caption (optional)',
              type: 'string',
            },
          ],
          preview: {
            select: { url: 'url', caption: 'caption' },
            prepare: ({ url, caption }: any) => ({
              title: caption || 'YouTube Video',
              subtitle: url || '',
            }),
          },
        },

        // ── Blog Alert ────────────────────────────────────────────────────────
        {
          type: 'object',
          name: 'blogAlert',
          title: 'Alert',
          fields: [
            {
              name: 'variant',
              title: 'Type',
              type: 'string',
              options: {
                list: [
                  { title: 'ℹ️  Information', value: 'info' },
                  { title: '✅ Success', value: 'success' },
                  { title: '⚠️  Warning', value: 'warning' },
                  { title: '❌ Error', value: 'destructive' },
                ],
                layout: 'radio',
              },
              initialValue: 'info',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
              validation: (Rule: any) => Rule.required(),
            },
          ],
          preview: {
            select: { variant: 'variant', title: 'title', description: 'description' },
            prepare: ({ variant, title, description }: any) => {
              const emoji: Record<string, string> = { info: 'ℹ️', success: '✅', warning: '⚠️', destructive: '❌' }
              return {
                title: `${emoji[variant] ?? 'ℹ️'} ${title || description || 'Alert'}`,
                subtitle: title ? description : '',
              }
            },
          },
        },

        // ── Blog Button ───────────────────────────────────────────────────────
        {
          type: 'object',
          name: 'blogButton',
          title: 'Button',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
            },
            {
              name: 'href',
              title: 'URL',
              type: 'url',
              validation: (Rule: any) => Rule.required().uri({ allowRelative: true }),
            },
            {
              name: 'variant',
              title: 'Style',
              type: 'string',
              options: {
                list: [
                  { title: 'Default (sky blue)', value: 'default' },
                  { title: 'Secondary', value: 'secondary' },
                  { title: 'Outline', value: 'outline' },
                  { title: 'Success', value: 'success' },
                  { title: 'Warning', value: 'warning' },
                  { title: 'Info', value: 'info' },
                  { title: 'Danger', value: 'danger' },
                  { title: 'Link Out ↗', value: 'linkout' },
                ],
                layout: 'dropdown',
              },
              initialValue: 'default',
            },
          ],
          preview: {
            select: { label: 'label', variant: 'variant', href: 'href' },
            prepare: ({ label, variant, href }: any) => ({
              title: label || '(no label)',
              subtitle: `${variant || 'default'} → ${href || ''}`,
            }),
          },
        },
      ],
    },
    {
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      description: 'Shown on card thumbnails and used in social previews, like WhatsApp, Instagram. (og:image).',
      fields: [
        { name: 'alt', description: 'can be left empty', type: 'string', title: 'Alt text' },
      ],
    },
    {
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      group: 'content',
      options: { hotspot: true },
      description: 'Hero image shown on top of the post, directly below the title. Not used/shown anywhere else.',
      fields: [
        { name: 'alt', description: 'can be left empty', type: 'string', title: 'Alt text' },
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
      description: 'Manually pick related posts shown at the bottom of this post. If not set, related posts will be automatically selected based on same category.',
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
              { title: '🚫 No author info', value: 'disabled' },
              { title: '👤 Team member (shared profile)', value: 'team' },
              { title: '✍️  Custom (this post only)', value: 'custom' },
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
      description: '(Optional) Leave empty to use creation date. Fill only to correct a mistake.',
    },
    {
      name: 'readingTime',
      title: 'Reading Time (min)',
      type: 'number',
      group: 'display',
    },
    {
      name: 'showInDirectory',
      title: 'Show in Blog Homepage/Directory. Post is still visible via direct link.',
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
      description: '(Optional) Pin to top of blog homepage/directory.',
    },
    {
      name: 'showToc',
      title: 'Show Table of Contents',
      type: 'boolean',
      group: 'display',
      initialValue: false,
      description: 'Generate a Table of Contents from H1–H4 headings in the body. Defaults to off.',
    },

    // ─── ADVANCED ────────────────────────────────────────────────────────────

    {
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'advanced',
      description: '(Optional) Falls back to Title if empty.',
    },
    {
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      group: 'advanced',
      description: '(Optional) Falls back to Excerpt if empty.',
    },
    {
      name: 'noIndex',
      title: 'No Index',
      type: 'boolean',
      group: 'advanced',
      initialValue: false,
      description: 'Prevent search engines from indexing this post. i.e. Post will not be visible in Google Search, etc.',
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
      title: 'title',
      publishedAt: 'publishedAt',
      _createdAt: '_createdAt',
      media: 'coverImage',
      pinned: 'pinned',
      noIndex: 'noIndex',
    },
    prepare({ title, publishedAt, _createdAt, media, pinned, noIndex }: any) {
      const flags = [pinned && '📌', noIndex && '🚫'].filter(Boolean).join(' ')
      const date = publishedAt || _createdAt
      const dateStr = date ? new Date(date).toLocaleDateString('zh-HK') : ''
      return {
        title: flags ? `${flags} ${title}` : title,
        subtitle: dateStr,
        media,
      }
    },
  },
}