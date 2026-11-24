import { Suspense } from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import InquiryForm from '@/components/contact/InquiryForm'
import CalWidget from '@/components/contact/CalWidget'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Pulse Consultant Ltd. Schedule a strategy call or send an inquiry.',
  alternates: { canonical: '/contact' },
}

const contactDetails = [
  { icon: 'location_on', label: 'Office', value: '1 Broad Street, Lagos Island, Lagos, Nigeria' },
  { icon: 'call', label: 'Phone', value: '+234 800 000 0000' },
  { icon: 'mail', label: 'Email', value: 'enquiries@pulseconsultant.com' },
  { icon: 'schedule', label: 'Hours', value: 'Monday – Friday, 8:00 AM – 6:00 PM WAT' },
]

export default function ContactPage() {
  const whatsappUrl = buildWhatsAppUrl()

  return (
    <div className="flex flex-col w-full">

      {/* ── HERO ── */}
      <section className="w-full bg-[#10243D] text-white px-margin-mobile py-space-2xl md:px-margin-desktop">
        <div className="flex items-center gap-1 font-label-sm text-label-sm text-white/40 mb-4 text-xs">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#C5A15B]">Contact</span>
        </div>
        <div className="flex items-center gap-1 mb-3">
          <span className="material-symbols-outlined text-[16px] text-[#C5A15B]">connect_without_contact</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#C5A15B] font-semibold">Get In Touch</span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-white font-semibold leading-tight mb-3">
          Start a Confidential<br />Conversation
        </h1>
        <p className="font-body-md text-body-md text-white/70 leading-relaxed max-w-2xl">
          Our senior partners respond to all inquiries within one business day.
          For urgent matters, reach us directly on WhatsApp.
        </p>
      </section>

      {/* ── CONTACT METHOD CARDS ── */}
      <section className="w-full bg-surface-container-low px-margin-mobile py-space-xl md:px-margin-desktop">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm max-w-4xl mx-auto">
          <a href="#inquiry-form" className="relative p-space-md rounded-lg bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs text-center items-center hover:shadow-md transition-shadow overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary-container" />
            <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px] text-primary">mail</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-[#10243D]">Send Inquiry</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Fill our form — reply within 1 business day</span>
          </a>
          <a href="#schedule" className="relative p-space-md rounded-lg bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs text-center items-center hover:shadow-md transition-shadow overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C5A15B]" />
            <div className="w-10 h-10 rounded bg-[#C5A15B]/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[22px] text-[#C5A15B]">calendar_month</span>
            </div>
            <span className="font-headline-sm text-headline-sm text-[#10243D]">Book a Call</span>
            <span className="font-body-sm text-body-sm text-on-surface-variant">Schedule directly with a senior partner</span>
          </a>
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="relative p-space-md rounded-lg bg-[#25D366] shadow-sm flex flex-col gap-space-xs text-center items-center hover:bg-[#1ebe59] transition-colors overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/30" />
            <div className="w-10 h-10 rounded bg-white/20 flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <span className="font-headline-sm text-headline-sm text-white">WhatsApp</span>
            <span className="font-body-sm text-body-sm text-white/80">Chat directly for urgent matters</span>
          </a>
        </div>
      </section>

      {/* ── INQUIRY FORM + CONTACT INFO ── */}
      <section id="inquiry-form" className="w-full bg-surface px-margin-mobile py-space-2xl md:px-margin-desktop">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-space-xl max-w-6xl mx-auto">

          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-space-lg">
            <div>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Contact Details</span>
              <h2 className="font-headline-sm text-headline-sm text-[#10243D] mt-1 mb-space-md">Our Office</h2>
              <div className="flex flex-col gap-space-sm">
                {contactDetails.map((item) => (
                  <div key={item.label} className="flex items-start gap-space-sm">
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[16px] text-primary">{item.icon}</span>
                    </div>
                    <div>
                      <p className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mb-0.5">{item.label}</p>
                      <p className="font-body-sm text-body-sm text-on-surface">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* Map placeholder */}
            <div className="rounded-lg bg-surface-container overflow-hidden h-44 flex items-center justify-center">
              <div className="text-center">
                <span className="material-symbols-outlined text-[36px] text-on-surface-variant block mb-2">map</span>
                <p className="font-label-md text-label-md text-[#10243D] font-semibold">1 Broad Street</p>
                <p className="font-body-sm text-body-sm text-on-surface-variant">Lagos Island, Lagos, Nigeria</p>
                <a href="https://maps.google.com/?q=1+Broad+Street+Lagos" target="_blank" rel="noopener noreferrer"
                  className="font-label-sm text-label-sm text-primary hover:underline mt-1 inline-block">
                  View on Google Maps →
                </a>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-3">
            <div className="rounded-xl bg-surface-container-lowest shadow-md p-space-lg">
              <h2 className="font-headline-sm text-headline-sm text-[#10243D] mb-1">Send an Inquiry</h2>
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-space-md">
                Fill in the form and we&apos;ll respond within one business day.
              </p>
              <Suspense fallback={<div className="animate-pulse h-96 bg-surface-container-low rounded-lg" />}>
                <InquiryForm />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* ── CAL.COM SCHEDULING ── */}
      <section id="schedule" className="w-full bg-surface-container-low px-margin-mobile py-space-2xl md:px-margin-desktop">
        <div className="text-center mb-space-xl">
          <div className="flex items-center justify-center gap-1 mb-2">
            <span className="material-symbols-outlined text-[16px] text-[#C5A15B]">calendar_month</span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#C5A15B] font-semibold">Executive Scheduling</span>
          </div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-[#10243D] font-semibold">Book a Strategy Call</h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-xl mx-auto">
            Select a time that works for you. All calls are conducted by a senior partner.
          </p>
        </div>
        <div className="rounded-xl bg-surface-container-lowest shadow-md p-space-md max-w-4xl mx-auto">
          <Suspense fallback={<div className="h-96 animate-pulse bg-surface-container-low rounded-lg" />}>
            <CalWidget />
          </Suspense>
        </div>
      </section>

    </div>
  )
}
