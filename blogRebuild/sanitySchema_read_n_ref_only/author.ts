// sanity/schemas/author.ts
// Shared author profiles — referenced from posts
// Place in your Sanity project's schemas/ folder

export default {
  name: 'author',
  title: 'Author',
  type: 'document',

  fields: [
    {
      name: 'displayName',
      title: 'Display Name',
      type: 'string',
      description: 'Name to be displayed on the author field',
      validation: (Rule: any) => Rule.required().error('Display name is required'),
    },
{
  name: 'tagline',
  title: 'Tagline',
  type: 'string',
  description: 'One-liner shown under the name in author cards (e.g. "數學 MC Killer, 2067 BIO 5**").',
},

    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'displayName' },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: { hotspot: true },
      description: 'Author profile picture shown in the author card. (Optional)',
    },
    {
      name: 'authorType',
      title: 'Author Type',
      type: 'string',
      options: {
        list: [
          { title: 'Team',      value: 'team'      },
          { title: 'Partner',     value: 'Partner'     },
          { title: 'Guest', value: 'Guest' },
        ],
        layout: 'radio',
      },
      initialValue: 'team',
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'text',
      rows: 2,
      description: 'Short intro shown in the author card.',
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      description: 'Optional contact email shown in author card.',
    },
{
  name: 'socialLinks',
  title: 'Social Links',
  type: 'array',
  of: [
    {
      type: 'object',
      preview: {
        select: { title: 'platform', subtitle: 'handle' },
      },
      fields: [
        {
          name: 'platform',
          title: 'Platform',
          type: 'string',
          options: {
            list: [
              { title: '📸 Instagram', value: 'instagram' },
              { title: '𝕏  X (Twitter)', value: 'x'         },
              { title: '🌐 Website',    value: 'website'   },
            ],
            layout: 'radio',
          },
          validation: (Rule: any) => Rule.required(),
        },

        // Handle — only makes sense for Instagram / X
        {
          name: 'handle',
          title: 'Handle',
          type: 'string',
          description: '@username without the @ symbol',
          hidden: ({ parent }: any) => parent?.platform === 'website',
          validation: (Rule: any) =>
            Rule.custom((value: string, context: any) => {
              const platform = context.parent?.platform
              if (platform === 'website') return true          // not applicable
              if (!value) return 'Handle is required for this platform'
              if (!/^[A-Za-z0-9_.]{1,50}$/.test(value))
                return 'Handle can only contain letters, numbers, underscores, dots — max 50 chars'
              return true
            }),
        },

        // URL — always required, regex varies by platform
        {
          name: 'url',
          title: 'Profile URL',
          type: 'url',
          validation: (Rule: any) =>
            Rule.required()
              .uri({ scheme: ['https'] })
              .custom((value: string, context: any) => {
                if (!value) return true
                const platform = context.parent?.platform
                if (platform === 'instagram' && !/^https:\/\/(www\.)?instagram\.com\//.test(value))
                  return 'Must be a valid Instagram URL (https://instagram.com/...)'
                if (platform === 'x' && !/^https:\/\/(www\.)?(x\.com|twitter\.com)\//.test(value))
                  return 'Must be a valid X/Twitter URL (https://x.com/...)'
                return true
              }),
        },
      ],
    },
  ],
},
{
  name: 'isActive',
  title: 'Active',
  type: 'boolean',
  initialValue: true,
  description: 'Uncheck to hide this author and their posts from public listings. Frontend must filter on this — does not auto-unpublish.',
},
  ],

  preview: {
    select: {
      title: 'displayName',
      subtitle: 'authorType',
      media: 'avatar',
    },
  },
}
