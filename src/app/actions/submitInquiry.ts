'use server'

import { inquirySchema, CONSULTING_SERVICES, SECTORS } from '@/lib/schemas/inquirySchema'

export type SubmitInquiryState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

async function verifyTurnstile(token: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY
  if (!secret) return true

  try {
    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ secret, response: token }),
    })
    const data = (await res.json()) as { success: boolean }
    return data.success
  } catch {
    return false
  }
}

export async function submitInquiry(
  _prevState: SubmitInquiryState,
  formData: FormData
): Promise<SubmitInquiryState> {
  const raw = {
    fullName: formData.get('fullName'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    company: formData.get('company'),
    service: formData.get('service'),
    sector: formData.get('sector'),
    message: formData.get('message'),
    turnstileToken: formData.get('cf-turnstile-response') || formData.get('turnstileToken'),
  }

  const result = inquirySchema.safeParse(raw)
  if (!result.success) {
    return {
      success: false,
      message: 'Please correct the errors below.',
      errors: result.error.flatten().fieldErrors as Record<string, string[]>,
    }
  }

  const turnstileValid = await verifyTurnstile(result.data.turnstileToken)
  if (!turnstileValid) {
    return {
      success: false,
      message: 'Security check failed. Please try again.',
      errors: { turnstileToken: ['Security verification failed'] },
    }
  }

  const apiKey = process.env.RESEND_API_KEY
  if (apiKey && !apiKey.startsWith('re_placeholder')) {
    try {
      const { Resend } = await import('resend')
      const resend = new Resend(apiKey)

      const serviceLabel =
        CONSULTING_SERVICES.find((s) => s.value === result.data.service)?.label ??
        result.data.service
      const sectorLabel =
        SECTORS.find((s) => s.value === result.data.sector)?.label ?? result.data.sector

      await resend.emails.send({
        from: `Pulse Consultant Website <${process.env.RESEND_FROM_EMAIL || 'enquiries@pulseconsultant.com'}>`,
        to: [process.env.RESEND_TO_EMAIL || 'enquiries@pulseconsultant.com'],
        replyTo: result.data.email,
        subject: `New Inquiry: ${serviceLabel} — ${result.data.company}`,
        html: `<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;"><div style="background: #10243D; padding: 24px 32px;"><h1 style="color: #C5A15B; font-size: 20px; margin: 0;">New Client Inquiry</h1><p style="color: rgba(255,255,255,0.7); margin: 4px 0 0; font-size: 14px;">Pulse Consultant Ltd — Website Submission</p></div><div style="padding: 32px; background: #FFFFFF; border: 1px solid #E2E8F0;"><table style="width: 100%; border-collapse: collapse;"><tr><td style="padding: 8px 0; color: #475569; font-size: 13px; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600; color: #0F172A;">${result.data.fullName}</td></tr><tr><td style="padding: 8px 0; color: #475569; font-size: 13px;">Email</td><td style="padding: 8px 0; color: #087F75;">${result.data.email}</td></tr><tr><td style="padding: 8px 0; color: #475569; font-size: 13px;">Phone</td><td style="padding: 8px 0; color: #0F172A;">${result.data.phone}</td></tr><tr><td style="padding: 8px 0; color: #475569; font-size: 13px;">Company</td><td style="padding: 8px 0; font-weight: 600; color: #0F172A;">${result.data.company}</td></tr><tr><td style="padding: 8px 0; color: #475569; font-size: 13px;">Service</td><td style="padding: 8px 0;"><span style="background: rgba(8,127,117,0.1); color: #087F75; padding: 2px 10px; border-radius: 9999px; font-size: 13px;">${serviceLabel}</span></td></tr><tr><td style="padding: 8px 0; color: #475569; font-size: 13px;">Sector</td><td style="padding: 8px 0; color: #0F172A;">${sectorLabel}</td></tr></table><div style="margin-top: 24px; padding: 16px; background: #F5F7FA; border-radius: 6px; border-left: 3px solid #C5A15B;"><p style="color: #475569; font-size: 12px; margin: 0 0 8px; text-transform: uppercase; letter-spacing: 0.05em;">Business Challenge</p><p style="color: #0F172A; margin: 0; line-height: 1.6;">${result.data.message}</p></div></div><div style="padding: 16px 32px; background: #F5F7FA; text-align: center;"><p style="color: #94A3B8; font-size: 12px; margin: 0;">Pulse Consultant Ltd · Strategic Insights. Financial Solutions. Sustainable Growth.</p></div></div>`,
      })
    } catch (err) {
      console.error('Resend error:', err)
    }
  }

  return {
    success: true,
    message:
      'Thank you for your inquiry. A member of our team will contact you within one business day.',
  }
}
