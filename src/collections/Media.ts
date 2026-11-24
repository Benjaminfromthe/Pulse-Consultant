import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { useAsTitle: 'alt' },
  access: { read: () => true },
  fields: [
    { name: 'alt', type: 'text', required: true, label: 'Alt Text' },
    { name: 'caption', type: 'text', label: 'Caption' },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Media Category',
      admin: {
        position: 'sidebar',
        description: 'Organizes the file under this folder in the Supabase bucket.',
      },
      options: [
        { label: 'Team Avatar', value: 'team-avatar' },
        { label: 'Case Study', value: 'case-study' },
        { label: 'Insight Cover', value: 'insight-cover' },
        { label: 'Document', value: 'document' },
      ],
    },
  ],
  upload: true,
  hooks: {
    // Runs BEFORE the S3 plugin's normalizeUploadPrefix hook (the plugin spreads existing
    // collection hooks first), so the injected `prefix` field becomes the category and the
    // plugin composes it into the object key. Guarded: only on a real upload with a category.
    beforeChange: [
      ({ data, req }) => {
        if (!data || !req?.file) return data
        const record = data as Record<string, unknown>
        const category = record.category
        if (typeof category === 'string' && category.length > 0) {
          record.prefix = category
        }
        return data
      },
    ],
  },
}
