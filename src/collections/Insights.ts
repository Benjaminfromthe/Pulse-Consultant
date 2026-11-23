import type { CollectionConfig } from 'payload'

export const Insights: CollectionConfig = {
  slug: 'insights',
  admin: {
    useAsTitle: 'title',
    description: 'Articles, publications, and market analysis from Pulse Consultant.',
    defaultColumns: ['title', 'type', 'author', 'publishedAt', 'status', 'updatedAt'],
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', required: true, unique: true },
    {
      name: 'type',
      type: 'select',
      required: true,
      label: 'Content Type',
      options: [
        { label: 'Article', value: 'article' },
        { label: 'Market Analysis', value: 'market-analysis' },
        { label: 'Publication', value: 'publication' },
        { label: 'White Paper', value: 'white-paper' },
        { label: 'Press Release', value: 'press-release' },
        { label: 'Newsletter', value: 'newsletter' },
      ],
    },
    { name: 'featuredImage', type: 'upload', relationTo: 'media' },
    { name: 'excerpt', type: 'textarea', required: true, label: 'Excerpt / Summary' },
    { name: 'body', type: 'richText', required: true, label: 'Article Body' },
    { name: 'author', type: 'relationship', relationTo: 'team-members', label: 'Author' },
    { name: 'relatedServices', type: 'relationship', relationTo: 'services', hasMany: true },
    { name: 'relatedIndustries', type: 'relationship', relationTo: 'industries', hasMany: true },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Published Date',
      admin: { date: { pickerAppearance: 'dayOnly' } },
    },
    { name: 'isFeatured', type: 'checkbox', label: 'Featured Article', defaultValue: false, admin: { position: 'sidebar' } },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
        { label: 'Archived', value: 'archived' },
      ],
      defaultValue: 'draft',
      admin: { position: 'sidebar' },
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'keywords', type: 'text' },
      ],
    },
  ],
}
