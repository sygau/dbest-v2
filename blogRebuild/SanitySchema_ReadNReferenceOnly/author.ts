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
              { title: '� YouTube',    value: 'youtube'   },
              { title: '🧵 Threads',    value: 'threads'   },
              { title: '💜 Patreon',    value: 'patreon'   },
              { title: '�🌐 Website',    value: 'website'   },
            ],
            layout: 'radio',
          },
          validation: (Rule: any) => Rule.required(),
        },

        // Handle — only makes sense for Instagram / X / YouTube / Threads / Patreon
        {
          name: 'handle',
          title: 'Handle',
          type: 'string',
          description: 'For the display/styling in the author card. Do not include the @',
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
                const urlValidation = {
                  instagram: /^https:\/\/(www\.)?instagram\.com\/[A-Za-z0-9_.]{1,30}\/?$/,
                  x: /^https:\/\/(www\.)?(x\.com|twitter\.com)\/[A-Za-z0-9_]{1,15}\/?$/,
                  youtube: /^https:\/\/(www\.)?youtube\.com\/(c\/|@)[A-Za-z0-9_-]+\/?$/,
                  threads: /^https:\/\/(www\.)?threads\.com\/@[A-Za-z0-9_.]{1,50}\/?$/,
                  patreon: /^https:\/\/(www\.)?patreon\.com\/(c\/)?[A-Za-z0-9_-]+\/?$/,
                  website: /^https:\/\/.+/,
                }
                
                const regex = urlValidation[platform as keyof typeof urlValidation]
                if (!regex) return 'Unknown platform'
                if (!regex.test(value)) {
                  const hints = {
                    instagram: 'https://instagram.com/username',
                    x: 'https://x.com/username',
                    youtube: 'https://youtube.com/@username or https://youtube.com/c/channelname',
                    threads: 'https://threads.com/@username',
                    patreon: 'https://patreon.com/username or https://patreon.com/c/username',
                    website: 'https://yourdomain.com',
                  }
                  return `Must be a valid ${platform} URL. Example: ${hints[platform as keyof typeof hints]}`
                }
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
  description: 'Uncheck to not publish all posts under this author.',
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
