import { z } from 'zod'

export const CONSULTING_SERVICES = [
  { value: 'financial-advisory', label: 'Financial Advisory' },
  { value: 'strategic-consulting', label: 'Strategic Consulting' },
  { value: 'investment-management', label: 'Investment Management' },
  { value: 'tax-compliance', label: 'Tax & Compliance' },
  { value: 'risk-assessment', label: 'Risk Assessment' },
  { value: 'corporate-governance', label: 'Corporate Governance' },
  { value: 'business-restructuring', label: 'Business Restructuring' },
  { value: 'capital-markets', label: 'Capital Markets' },
  { value: 'esg-sustainability', label: 'ESG & Sustainability' },
] as const

export const SECTORS = [
  { value: 'financial-services', label: 'Financial Services' },
  { value: 'real-estate', label: 'Real Estate & Construction' },
  { value: 'energy', label: 'Energy & Natural Resources' },
  { value: 'manufacturing', label: 'Manufacturing & Industry' },
  { value: 'healthcare', label: 'Healthcare & Life Sciences' },
] as const

export const inquirySchema = z.object({
  fullName: z.string().min(2, 'Please enter your full name'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().min(7, 'Please enter a valid phone number'),
  company: z.string().min(1, 'Please enter your company name'),
  service: z.enum(
    CONSULTING_SERVICES.map((s) => s.value) as [string, ...string[]],
    { error: () => 'Please select a consulting service' }
  ),
  sector: z.enum(
    SECTORS.map((s) => s.value) as [string, ...string[]],
    { error: () => 'Please select your industry sector' }
  ),
  message: z.string().min(20, 'Please describe your business challenge (min 20 characters)'),
  turnstileToken: z.string().min(1, 'Please complete the security check'),
})

export type InquiryFormData = z.infer<typeof inquirySchema>
