import { Suspense } from 'react'
import type { Metadata } from 'next'
import InquiryForm from '@/components/contact/InquiryForm'
import CalWidget from '@/components/contact/CalWidget'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Pulse Consultant Ltd. Schedule a strategy call or send an inquiry.',
  alternates: { canonical: '/contact' },
}

export default function ContactPage() {
  const whatsappUrl = buildWhatsAppUrl()

  return (
    <main className="min-h-screen bg-offwhite">
      {/* Hero */}
      <section className="bg-navy text-white pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <nav className="text-sm text-white/60 mb-6">
            <span>Home</span> <span className="mx-2">/</span>{' '}
            <span className="text-gold">Contact</span>
          </nav>
          <h1 className="font-playfair text-4xl md:text-5xl font-semibold mb-4">Get in Touch</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Our team responds to all inquiries within one business day. For urgent matters, reach us
            directly on WhatsApp.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid lg:grid-cols-5 gap-12">
          {/* Left: Contact Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-playfair text-2xl font-semibold text-navy mb-6">
                Contact Information
              </h2>
              <div className="space-y-4">
                {(
                  [
                    {
                      icon: '📍',
                      label: 'Office',
                      value: '1 Broad Street, Lagos Island, Lagos, Nigeria',
                    },
                    { icon: '📞', label: 'Phone', value: '+234 800 000 0000' },
                    { icon: '✉️', label: 'Email', value: 'enquiries@pulseconsultant.com' },
                    {
                      icon: '🕐',
                      label: 'Hours',
                      value: 'Monday – Friday, 8:00 AM – 6:00 PM WAT',
                    },
                  ] as const
                ).map((item) => (
                  <div key={item.label} className="flex gap-4">
                    <span className="text-2xl flex-shrink-0">{item.icon}</span>
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">
                        {item.label}
                      </p>
                      <p className="text-sm text-slate-700">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WhatsApp CTA */}
            <div className="bg-white rounded-lg border border-[#E2E8F0] p-5 shadow-card-1">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">💬</span>
                <h3 className="font-playfair text-lg font-semibold text-navy">
                  WhatsApp Business
                </h3>
              </div>
              <p className="text-sm text-slate-600 mb-4">
                Connect directly with our consulting team for quick questions and urgent matters.
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-semibold px-5 py-3 rounded-lg hover:bg-[#1ebe59] transition-colors w-full justify-center"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Start WhatsApp Chat
              </a>
            </div>

            {/* Map placeholder */}
            <div className="bg-navy/5 rounded-lg border border-[#E2E8F0] h-48 flex items-center justify-center text-center p-6">
              <div>
                <p className="text-3xl mb-2">🗺️</p>
                <p className="text-sm font-semibold text-navy">1 Broad Street</p>
                <p className="text-xs text-slate-500">Lagos Island, Lagos, Nigeria</p>
                <a
                  href="https://maps.google.com/?q=1+Broad+Street+Lagos"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-teal hover:underline mt-1 inline-block"
                >
                  View on Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Right: Inquiry Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-card-1 p-8">
              <h2 className="font-playfair text-2xl font-semibold text-navy mb-2">
                Send an Inquiry
              </h2>
              <p className="text-sm text-slate-500 mb-6">
                Fill in the form and we&apos;ll get back to you within one business day.
              </p>
              <Suspense fallback={<div className="animate-pulse h-96 bg-offwhite rounded" />}>
                <InquiryForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Cal.com Scheduling */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-semibold text-teal uppercase tracking-widest mb-3">
              Executive Scheduling
            </span>
            <h2 className="font-playfair text-3xl md:text-4xl font-semibold text-navy mb-4">
              Book a Strategy Call
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">
              Select a time that works for you. All strategy calls are conducted by a senior
              consultant.
            </p>
          </div>
          <div className="bg-offwhite rounded-xl border border-[#E2E8F0] p-6 shadow-card-1">
            <Suspense fallback={<div className="h-96 animate-pulse bg-white rounded-lg" />}>
              <CalWidget />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  )
}
