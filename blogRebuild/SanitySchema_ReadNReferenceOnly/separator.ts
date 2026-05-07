import { defineType } from 'sanity'

export default defineType({
  name: 'separator',
  title: 'Separator',
  type: 'object',
  fields: [
    {
      name: 'placeholder',
      type: 'string',
      title: 'Placeholder',
      hidden: true,
    }
  ],
  preview: { prepare: () => ({ title: '— Separator —' }) }
})