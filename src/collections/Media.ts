import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { useAsTitle: 'alt' },
  access: { read: () => true },
  fields: [
    { name: 'alt', type: 'text', required: true, label: 'Alt Text' },
    { name: 'caption', type: 'text', label: 'Caption' },
  ],
  upload: true,
}
