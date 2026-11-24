import type { CollectionConfig } from 'payload'

export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  admin: {
    useAsTitle: 'fullName',
    description:
      'Contact/consultation form submissions. Logged alongside email notifications.',
    defaultColumns: ['fullName', 'company', 'service', 'status', 'createdAt'],
    group: 'Submissions',
  },
  access: {
    // Written by the submitInquiry Server Action via the Local API (overrideAccess: true);
    // the public collection API must not allow direct creation.
    create: () => false,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'fullName', type: 'text', required: true, label: 'Full Name' },
    { name: 'email', type: 'email', required: true, label: 'Email' },
    { name: 'phone', type: 'text', required: true, label: 'Phone' },
    { name: 'company', type: 'text', required: true, label: 'Company' },
    {
      name: 'service',
      type: 'select',
      required: true,
      label: 'Service Requested',
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
    {
      name: 'sector',
      type: 'select',
      required: true,
      label: 'Industry Sector',
      options: [
        { label: 'Financial Services', value: 'financial-services' },
        { label: 'Real Estate', value: 'real-estate' },
        { label: 'Energy', value: 'energy' },
        { label: 'Manufacturing', value: 'manufacturing' },
        { label: 'Healthcare', value: 'healthcare' },
      ],
    },
    { name: 'message', type: 'textarea', required: true, label: 'Message' },
    {
      name: 'turnstileVerified',
      type: 'checkbox',
      defaultValue: true,
      admin: { readOnly: true, description: 'Cloudflare Turnstile token verified at submission.' },
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Converted', value: 'converted' },
        { label: 'Archived', value: 'archived' },
        { label: 'Spam', value: 'spam' },
      ],
      defaultValue: 'new',
      admin: { position: 'sidebar' },
    },
    {
      name: 'source',
      type: 'select',
      options: [
        { label: 'Contact Page', value: 'contact-page' },
        { label: 'Consultation Modal', value: 'consultation-modal' },
        { label: 'Homepage CTA', value: 'homepage-cta' },
      ],
      defaultValue: 'contact-page',
      admin: { position: 'sidebar' },
    },
  ],
}
