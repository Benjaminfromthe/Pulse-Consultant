'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LOGO_URL =
  'https://lh3.googleusercontent.com/aida/ALJJyrBSjpqaVEyfi_krpHNJwokl1hq7NvmyPOnwWu3iTlblIWWwsOhEp7ITUZo_fi8lBWthoahDpkPFew-hDgrgD7m-tnARXULZUTMuulaJiIds9AVUUfuhifpdspXQOjRnYHCnjT9oHDxdGpS_BLVC_kNL_fDh8j4LegNK2t-HSnuYZ98vlp3kj3Wwt7jYQnSaWVZI7W-9S_ZrKi2ay6wx8lNu7-_bOpGXUz2tU1WU_64';

const navLinks = [
  { label: 'Home',       href: '/' },
  { label: 'About',      href: '/about' },
  { label: 'Services',   href: '/services' },
  { label: 'Industries', href: '/industries' },
  { label: 'Projects',   href: '/projects' },
  { label: 'Team',       href: '/team' },
  { label: 'Insights',   href: '/insights' },
  { label: 'Contact',    href: '/contact' },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const pathname = usePathname();

  const closeDrawer = () => setDrawerOpen(false);

  return (
    <>
      {/* Fixed header bar */}
      <header className="fixed top-0 inset-x-0 z-50 bg-[#10243D]/95 backdrop-blur-xl pt-safe shadow-[0_4px_16px_rgba(16,36,61,0.18)]">
        <div className="h-20 px-margin-mobile flex items-center justify-between gap-space-sm">
          {/* Logo */}
          <div className="flex items-center gap-space-xs">
            <img
              alt="Pulse Consultant Ltd Logo"
              className="h-8 w-auto object-contain"
              src={LOGO_URL}
            />
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-surface-container-lowest leading-tight tracking-tight">
                Pulse
              </span>
              <span className="font-label-sm text-label-sm text-tertiary-fixed-dim uppercase tracking-wider hidden sm:inline">
                Strategic Advisory
              </span>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-space-xs">
            <Link
              href="/#consultation-form"
              className="hidden xs:inline-flex items-center justify-center px-space-sm py-space-2xs bg-primary-container text-on-primary font-label-md text-label-md rounded-lg shadow-sm hover:bg-primary transition-all min-h-[36px]"
            >
              Consult
            </Link>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-inner">
              <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
            </div>
            <button
              aria-label="Toggle Navigation Drawer"
              className="w-11 h-11 flex items-center justify-center text-surface-container-lowest hover:text-tertiary-fixed-dim transition-colors"
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
          </div>
        </div>

        {/* Tagline sub-bar */}
        <div className="bg-[#0d1d32] px-margin-mobile py-1 flex items-center justify-between">
          <p className="font-label-sm text-label-sm text-secondary-fixed-dim truncate">
            Strategic Insights. Financial Solutions. Sustainable Growth.
          </p>
          <span className="font-label-sm text-label-sm text-tertiary-fixed font-semibold tracking-wide ml-space-xs flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary-fixed animate-pulse"></span>
            Executive Dashboard
          </span>
        </div>
      </header>

      {/* Mobile full-screen drawer */}
      <div
        className={`${drawerOpen ? 'flex' : 'hidden'} fixed inset-0 z-50 bg-[#10243D]/95 backdrop-blur-2xl flex-col pt-safe pb-safe px-margin-mobile transition-all duration-300`}
      >
        {/* Drawer header */}
        <div className="h-20 flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <img
              alt="Pulse Consultant Ltd Logo"
              className="h-8 w-auto object-contain"
              src={LOGO_URL}
            />
            <span className="font-headline-sm text-headline-sm text-surface-container-lowest">
              Pulse Advisory
            </span>
          </div>
          <button
            className="w-11 h-11 flex items-center justify-center text-surface-container-lowest"
            onClick={closeDrawer}
          >
            <span className="material-symbols-outlined text-2xl">close</span>
          </button>
        </div>

        {/* Nav links */}
        <div className="flex flex-col gap-space-xs py-space-md overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-space-md py-space-sm font-headline-sm text-headline-sm hover:text-tertiary-fixed-dim transition-colors ${
                (link.href === '/' ? pathname === '/' : pathname.startsWith(link.href))
                  ? 'text-tertiary-fixed-dim'
                  : 'text-surface-container-lowest'
              }`}
              onClick={closeDrawer}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Bottom CTAs */}
        <div className="mt-auto pb-space-lg pt-space-md flex flex-col gap-space-sm">
          <a
            href="/public/pulse-consultant-company-profile.pdf"
            className="w-full flex items-center justify-center gap-space-xs px-space-md py-space-sm bg-transparent border border-tertiary-fixed-dim text-surface-container-lowest font-label-lg text-label-lg rounded-lg hover:bg-tertiary-fixed-dim/10"
          >
            <span className="material-symbols-outlined text-[18px] text-tertiary-fixed-dim">download</span>
            Download Firm Profile
          </a>
          <Link
            href="/#consultation-form"
            className="w-full flex items-center justify-center gap-space-xs px-space-md py-space-sm bg-primary-container text-on-primary font-label-lg text-label-lg rounded-lg hover:bg-primary shadow-md"
            onClick={closeDrawer}
          >
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            Book Consultation
          </Link>
        </div>
      </div>
    </>
  );
}
