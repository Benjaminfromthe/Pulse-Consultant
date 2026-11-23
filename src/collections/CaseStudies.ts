import type { CollectionConfig } from 'payload'

export const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  admin: {
    useAsTitle: 'projectTitle',
    description: 'Client case studies. Only approved entries appear on the public website.',
    defaultColumns: ['projectTitle', 'sector', 'isApprovedForPublic', 'status', 'updatedAt'],
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { isApprovedForPublic: { equals: true } }
    },
  },
  fields: [
    { name: 'projectTitle', type: 'text', required: true, label: 'Project Title' },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'sector', type: 'relationship', relationTo: 'industries', required: true, label: 'Industry Sector' },
    {
      name: 'authorizedClientName',
      type: 'text',
      label: 'Authorized Client Name',
      admin: { description: 'Use "Confidential Client" if anonymous.' },
    },
    { name: 'clientLogoOrImage', type: 'upload', relationTo: 'media', label: 'Client Logo / Featured Image' },
    {
      name: 'engagement',
      type: 'group',
      label: 'Engagement Details',
      fields: [
        { name: 'businessChallenge', type: 'richText', required: true, label: 'Business Challenge' },
        { name: 'assignmentScope', type: 'richText', required: true, label: 'Assignment Scope' },
        { name: 'consultingApproach', type: 'richText', required: true, label: 'Consulting Approach' },
        {
          name: 'deliverables',
          type: 'array',
          label: 'Deliverables',
          fields: [{ name: 'deliverable', type: 'text', required: true }],
        },
      ],
    },
    {
      name: 'results',
      type: 'group',
      label: 'Verified Results',
      fields: [
        { name: 'summary', type: 'richText', label: 'Results Summary' },
        {
          name: 'metrics',
          type: 'array',
          label: 'Key Result Metrics',
          fields: [
            { name: 'metric', type: 'text', required: true, label: 'Metric / Headline' },
            { name: 'value', type: 'text', required: true, label: 'Value (e.g. "35%", "$2.4M")' },
            { name: 'context', type: 'text', label: 'Context / Note' },
          ],
        },
        { name: 'clientTestimonial', type: 'textarea', label: 'Client Testimonial (optional)' },
        { name: 'testimonialAuthor', type: 'text', label: 'Testimonial Author Name & Title' },
      ],
    },
    { name: 'relatedService', type: 'relationship', relationTo: 'services', hasMany: true, label: 'Related Services' },
    {
      name: 'isApprovedForPublic',
      type: 'checkbox',
      label: 'Approved for Public Display',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: '⚠️ Only check this after client has given written consent for public disclosure.',
      },
    },
    { name: 'featuredOnHomepage', type: 'checkbox', label: 'Feature on Homepage', defaultValue: false, admin: { position: 'sidebar' } },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Under Review', value: 'under-review' },
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
      ],
    },
  ],
}
