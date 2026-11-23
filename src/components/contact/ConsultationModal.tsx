'use client'

import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import InquiryForm from './InquiryForm'
import CalWidget from './CalWidget'
import { buildWhatsAppUrl } from '@/lib/whatsapp'

type Tab = 'book' | 'inquiry'

interface ConsultationModalProps {
  isOpen: boolean
  onClose: () => void
  defaultTab?: Tab
  prefilledService?: string
}

export default function ConsultationModal({
  isOpen,
  onClose,
  defaultTab = 'book',
  prefilledService,
}: ConsultationModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>(defaultTab)
  const [mounted, setMounted] = useState(false)

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    setMounted(true) // eslint-disable-line react-hooks/set-state-in-effect
  }, [])

  useEffect(() => {
    setActiveTab(defaultTab) // eslint-disable-line react-hooks/set-state-in-effect
  }, [defaultTab])

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  if (!mounted || !isOpen) return null

  const whatsappUrl = buildWhatsAppUrl(prefilledService)

  const modal = (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-navy/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-card-3 w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-navy px-6 py-5 flex items-start justify-between flex-shrink-0">
          <div>
            <h2 className="font-playfair text-xl font-semibold text-white">
              Start Your Consultation
            </h2>
            <p className="text-white/60 text-sm mt-0.5">
              Choose how you&apos;d like to connect with our team
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white ml-4 mt-0.5 flex-shrink-0 text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#E2E8F0] flex-shrink-0 bg-white">
          <button
            onClick={() => setActiveTab('book')}
            className={`flex-1 py-3.5 text-sm font-semibold transition-colors border-b-2 ${
              activeTab === 'book'
                ? 'border-teal text-teal'
                : 'border-transparent text-slate-500 hover:text-navy'
            }`}
          >
            📅 Book a Strategy Call
          </button>
          <button
            onClick={() => setActiveTab('inquiry')}
            className={`flex-1 py-3.5 text-sm font-semibold transition-colors border-b-2 ${
              activeTab === 'inquiry'
                ? 'border-teal text-teal'
                : 'border-transparent text-slate-500 hover:text-navy'
            }`}
          >
            ✉️ Send an Inquiry
          </button>
        </div>

        {/* Tab content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'book' ? (
            <div className="p-6">
              <CalWidget />
            </div>
          ) : (
            <div className="p-6">
              <InquiryForm prefilledService={prefilledService} />
            </div>
          )}
        </div>

        {/* WhatsApp footer */}
        <div className="border-t border-[#E2E8F0] px-6 py-4 bg-offwhite flex items-center gap-3 flex-shrink-0">
          <span className="text-sm text-slate-500 flex-1">Prefer WhatsApp?</span>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white text-sm font-semibold px-4 py-2 rounded hover:bg-[#1ebe59] transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </div>
  )

  return createPortal(modal, document.body)
}
