import type { CollectionConfig } from 'payload'

export const TeamMembers: CollectionConfig = {
  slug: 'team-members',
  admin: {
    useAsTitle: 'fullName',
    description: 'Consulting team members, qualifications, and specializations.',
    defaultColumns: ['fullName', 'title', 'yearsExperience', 'isActive', 'updatedAt'],
  },
  access: { read: () => true },
  fields: [
    { name: 'fullName', type: 'text', required: true, label: 'Full Name' },
    { name: 'slug', type: 'text', required: true, unique: true },
    { name: 'title', type: 'text', required: true, label: 'Job Title / Role' },
    { name: 'photo', type: 'upload', relationTo: 'media', label: 'Profile Photo' },
    { name: 'bio', type: 'richText', label: 'Biography', required: true },
    { name: 'shortBio', type: 'textarea', label: 'Short Bio (for cards)' },
    { name: 'yearsExperience', type: 'number', label: 'Years of Experience', min: 0, required: true },
    {
      name: 'qualifications',
      type: 'array',
      label: 'Academic Qualifications',
      fields: [
        { name: 'degree', type: 'text', required: true, label: 'Degree / Qualification' },
        { name: 'institution', type: 'text', label: 'Institution' },
        { name: 'year', type: 'number', label: 'Year Obtained' },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      label: 'Professional Certifications',
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Certification Name' },
        { name: 'issuingBody', type: 'text', label: 'Issuing Body' },
        { name: 'year', type: 'number', label: 'Year Issued' },
        { name: 'expiryYear', type: 'number', label: 'Expiry Year (if applicable)' },
      ],
    },
    {
      name: 'specializations',
      type: 'array',
      label: 'Areas of Specialization',
      fields: [{ name: 'area', type: 'text', required: true }],
    },
    { name: 'expertiseInServices', type: 'relationship', relationTo: 'services', hasMany: true, label: 'Service Expertise' },
    { name: 'expertiseInIndustries', type: 'relationship', relationTo: 'industries', hasMany: true, label: 'Industry Expertise' },
    { name: 'linkedIn', type: 'text', label: 'LinkedIn URL' },
    { name: 'email', type: 'email', label: 'Work Email' },
    { name: 'isLeadership', type: 'checkbox', label: 'Show in Leadership Section', defaultValue: false, admin: { position: 'sidebar' } },
    { name: 'isActive', type: 'checkbox', label: 'Active / Current Staff', defaultValue: true, admin: { position: 'sidebar' } },
    { name: 'sortOrder', type: 'number', admin: { position: 'sidebar' } },
  ],
}
