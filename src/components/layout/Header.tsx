'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Projects', href: '/projects' },
  { label: 'Team', href: '/team' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

export default function Header() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <header className="fixed top-0 inset-x-0 z-50 bg-[#10243D] shadow-[0_4px_16px_rgba(16,36,61,0.18)]">
        {/* Main nav row */}
        <div className="h-16 max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex flex-col">
              <span className="font-bold text-white leading-tight tracking-tight text-lg">
                Pulse
              </span>
              <span className="text-[10px] font-semibold text-[#C5A15B] uppercase tracking-widest hidden sm:block">
                Strategic Advisory
              </span>
            </div>
          </Link>

          {/* Desktop nav — hidden on mobile */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-semibold rounded transition-colors ${
                  isActive(link.href)
                    ? 'text-[#C5A15B] border-b-2 border-[#C5A15B]'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right CTA */}
          <Link
            href="/contact"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 bg-[#087F75] text-white text-sm font-semibold rounded hover:bg-[#066860] transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-base">calendar_month</span>
            Schedule Consultation
          </Link>

          {/* Mobile right — Consult + Hamburger */}
          <div className="flex md:hidden items-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center px-3 py-1.5 bg-[#087F75] text-white text-xs font-semibold rounded hover:bg-[#066860] transition-colors"
            >
              Consult
            </Link>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className="w-9 h-9 flex items-center justify-center text-white hover:text-[#C5A15B] transition-colors"
            >
              <span className="material-symbols-outlined">
                {open ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>

        {/* Tagline sub-bar */}
        <div className="bg-[#0d1d32] px-4 md:px-8 py-1.5 flex items-center justify-between">
          <p className="text-xs text-[#b5c8e8] truncate">
            Strategic Insights. Financial Solutions. Sustainable Growth.
          </p>
          <span className="text-xs text-[#C5A15B] font-semibold tracking-wide ml-2 flex items-center gap-1 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A15B] animate-pulse" />
            Executive Dashboard
          </span>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <div className="fixed inset-0 z-50 bg-[#10243D]/98 backdrop-blur-xl flex flex-col px-6 pt-6 pb-10">
          {/* Drawer header */}
          <div className="flex items-center justify-between mb-8">
            <span className="text-white font-bold text-lg">Pulse Advisory</span>
            <button
              onClick={() => setOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-white"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-1 flex-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`py-3 px-4 text-lg font-semibold rounded transition-colors ${
                  isActive(link.href)
                    ? 'text-[#C5A15B] bg-white/5'
                    : 'text-white hover:text-[#C5A15B] hover:bg-white/5'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Bottom CTAs */}
          <div className="flex flex-col gap-3 mt-6">
            <a
              href="/pulse-consultant-company-profile.pdf"
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-[#C5A15B] text-[#C5A15B] font-semibold rounded-lg hover:bg-[#C5A15B]/10 transition-colors"
            >
              <span className="material-symbols-outlined text-lg">download</span>
              Download Firm Profile
            </a>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#087F75] text-white font-semibold rounded-lg hover:bg-[#066860] transition-colors"
            >
              <span className="material-symbols-outlined text-lg">calendar_month</span>
              Book Consultation
            </Link>
          </div>
        </div>
      )}
    </>
  )
}
