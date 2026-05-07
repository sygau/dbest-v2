export default {
  name: 'category',
  title: 'Category',
  type: 'document',

  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule: any) => Rule.required().error('Title is required'),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (Rule: any) => Rule.required().error('Slug is required'),
      description: 'Used in URLs and frontend filtering. Auto-generated from title.',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      description: 'Optional — shown on category landing pages.',
    },
{
  name: 'coverImage',
  title: 'Cover Image',
  type: 'image',
  options: { hotspot: true },
  description: 'Hero image for category landing pages (/blog/category/slug).',
  fields: [
    { name: 'alt', type: 'string', title: 'Alt text' },
  ],
},
    {
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex code or Tailwind token (e.g. #3b82f6 or blue-500). Used for badges/tags.',
    },
    {
      name: 'emoji',
      title: 'Emoji',
      type: 'string',
      description: 'Optional icon shown next to the category name (e.g. 📚).',
    },
    {
      name: 'lucideIcon',
      title: 'Lucide Icon',
      type: 'string',
      description: 'Lucide icon component name (e.g. LuBookOpen, LuGraduationCap). Browse at lucide.dev — prefix with Lu.',
    },
    {
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower number = appears first in listings. Leave empty to sort alphabetically.',
    },
  ],

  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
    },
    prepare({ title, subtitle }: any) {
      return {
        title,
        subtitle: subtitle ?? 'No description',
      }
    },
  },

  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrderAsc',
      by: [{ field: 'displayOrder', direction: 'asc' }],
    },
    {
      title: 'Title A–Z',
      name: 'titleAsc',
      by: [{ field: 'title', direction: 'asc' }],
    },
  ],
}