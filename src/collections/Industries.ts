import type { CollectionConfig } from 'payload'

export const Industries: CollectionConfig = {
  slug: 'industries',
  admin: {
    useAsTitle: 'name',
    description: '5 priority industry sectors served by Pulse Consultant Ltd.',
    defaultColumns: ['name', 'slug', 'status', 'updatedAt'],
  },
  access: { read: () => true },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Industry Name' },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'E.g. "financial-services", "real-estate", "energy", "manufacturing", "healthcare"' },
    },
    { name: 'tagline', type: 'text', label: 'Industry Tagline' },
    { name: 'heroImage', type: 'upload', relationTo: 'media' },
    { name: 'overview', type: 'richText', label: 'Industry Overview', required: true },
    {
      name: 'challenges',
      type: 'array',
      label: 'Key Industry Challenges',
      fields: [
        { name: 'challenge', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
    { name: 'ourApproach', type: 'richText', label: 'Our Approach to This Industry' },
    { name: 'keyServices', type: 'relationship', relationTo: 'services', hasMany: true, label: 'Key Services for This Industry' },
    {
      name: 'stats',
      type: 'array',
      label: 'Industry Statistics / Track Record',
      fields: [
        { name: 'label', type: 'text', required: true, label: 'Stat Label' },
        { name: 'value', type: 'text', required: true, label: 'Stat Value (e.g. "$500M+")' },
      ],
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
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      admin: { position: 'sidebar' },
    },
    { name: 'sortOrder', type: 'number', admin: { position: 'sidebar' } },
  ],
}
