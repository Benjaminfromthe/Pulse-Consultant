'use client'

import { useState } from 'react'
import ConsultationModal from '@/components/contact/ConsultationModal'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

export default function ContactSection() {
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTab, setModalTab] = useState<'book' | 'inquiry'>('book')

  const openBook = () => {
    setModalTab('book')
    setModalOpen(true)
  }
  const openInquiry = () => {
    setModalTab('inquiry')
    setModalOpen(true)
  }

  return (
    <section id="contact" className="py-24 bg-offwhite">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <div className="inline-block w-12 h-0.5 bg-gold mb-4" aria-hidden="true" />
          <h2 className="font-playfair text-4xl font-semibold text-navy mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Our senior consultants are ready to help you navigate complex business challenges.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <button
            onClick={openBook}
            className="bg-white rounded-xl border-t-2 border-t-transparent border border-[#E2E8F0] shadow-card-1 hover:shadow-card-2 hover:border-t-gold p-8 text-center transition-all group"
          >
            <span className="text-4xl mb-4 block">📅</span>
            <h3 className="font-playfair text-lg font-semibold text-navy mb-2">
              Book a Strategy Call
            </h3>
            <p className="text-sm text-slate-500">
              Schedule a 30-minute call with a senior consultant at a time that suits you.
            </p>
            <span className="inline-block mt-4 text-sm font-semibold text-teal group-hover:text-navy transition-colors">
              Schedule Now →
            </span>
          </button>

          <button
            onClick={openInquiry}
            className="bg-white rounded-xl border-t-2 border-t-transparent border border-[#E2E8F0] shadow-card-1 hover:shadow-card-2 hover:border-t-gold p-8 text-center transition-all group"
          >
            <span className="text-4xl mb-4 block">✉️</span>
            <h3 className="font-playfair text-lg font-semibold text-navy mb-2">Send an Inquiry</h3>
            <p className="text-sm text-slate-500">
              Tell us about your business challenge. We respond within one business day.
            </p>
            <span className="inline-block mt-4 text-sm font-semibold text-teal group-hover:text-navy transition-colors">
              Send Inquiry →
            </span>
          </button>

          <a
            href={buildWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#25D366] rounded-xl shadow-card-1 hover:shadow-card-2 p-8 text-center transition-all group block"
          >
            <span className="text-4xl mb-4 block">💬</span>
            <h3 className="font-playfair text-lg font-semibold text-white mb-2">
              WhatsApp Business
            </h3>
            <p className="text-sm text-white/80">
              Connect directly for quick questions and urgent advisory matters.
            </p>
            <span className="inline-block mt-4 text-sm font-semibold text-white/90 group-hover:text-white transition-colors">
              Chat Now →
            </span>
          </a>
        </div>
      </div>

      <ConsultationModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        defaultTab={modalTab}
      />
    </section>
  )
}
