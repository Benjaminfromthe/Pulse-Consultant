import type { CollectionConfig } from 'payload'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    description: 'Advisory services offered by Pulse Consultant Ltd.',
    defaultColumns: ['title', 'category', 'status', 'updatedAt'],
  },
  access: { read: () => true },
  fields: [
    { name: 'title', type: 'text', required: true, label: 'Service Title' },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { description: 'URL-friendly identifier. E.g. "financial-advisory".' },
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      label: 'Service Category',
      options: [
        { label: 'Financial Advisory', value: 'financial-advisory' },
        { label: 'Strategic Consulting', value: 'strategic-consulting' },
        { label: 'Investment Management', value: 'investment-management' },
        { label: 'Tax & Compliance', value: 'tax-compliance' },
        { label: 'Risk Assessment', value: 'risk-assessment' },
        { label: 'Corporate Governance', value: 'corporate-governance' },
        { label: 'Business Restructuring', value: 'business-restructuring' },
        { label: 'Capital Markets', value: 'capital-markets' },
        { label: 'ESG & Sustainability', value: 'esg-sustainability' },
      ],
    },
    { name: 'shortDescription', type: 'textarea', required: true, label: 'Short Description' },
    { name: 'icon', type: 'text', label: 'Icon (emoji or icon class name)' },
    { name: 'heroImage', type: 'upload', relationTo: 'media', label: 'Service Hero Image' },
    { name: 'overview', type: 'richText', label: 'Service Overview', required: true },
    {
      name: 'areasOfExpertise',
      type: 'array',
      label: 'Areas of Expertise',
      minRows: 1,
      fields: [
        { name: 'area', type: 'text', required: true, label: 'Area of Expertise' },
        { name: 'description', type: 'textarea', label: 'Description' },
      ],
    },
    {
      name: 'methodology',
      type: 'array',
      label: 'Methodology Steps',
      fields: [
        { name: 'step', type: 'number', required: true, label: 'Step Number' },
        { name: 'title', type: 'text', required: true, label: 'Step Title' },
        { name: 'description', type: 'textarea', required: true, label: 'Step Description' },
      ],
    },
    {
      name: 'keyBenefits',
      type: 'array',
      label: 'Key Benefits',
      fields: [{ name: 'benefit', type: 'text', required: true }],
    },
    { name: 'relatedIndustries', type: 'relationship', relationTo: 'industries', hasMany: true, label: 'Related Industries' },
    { name: 'featuredCaseStudies', type: 'relationship', relationTo: 'case-studies', hasMany: true, label: 'Featured Case Studies' },
    {
      name: 'callToAction',
      type: 'group',
      label: 'Call to Action',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Ready to get started?' },
        { name: 'buttonText', type: 'text', defaultValue: 'Schedule a Consultation' },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      fields: [
        { name: 'metaTitle', type: 'text', label: 'Meta Title' },
        { name: 'metaDescription', type: 'textarea', label: 'Meta Description' },
        { name: 'keywords', type: 'text', label: 'Keywords (comma-separated)' },
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
    { name: 'featuredOnHomepage', type: 'checkbox', label: 'Feature on Homepage', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'sortOrder', type: 'number', label: 'Sort Order', admin: { position: 'sidebar', description: 'Lower numbers appear first.' } },
  ],
}
