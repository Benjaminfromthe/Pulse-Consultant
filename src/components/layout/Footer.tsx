'use client';

import Link from 'next/link';

const LOGO_URL =
  'https://lh3.googleusercontent.com/aida/ALJJyrBSjpqaVEyfi_krpHNJwokl1hq7NvmyPOnwWu3iTlblIWWwsOhEp7ITUZo_fi8lBWthoahDpkPFew-hDgrgD7m-tnARXULZUTMuulaJiIds9AVUUfuhifpdspXQOjRnYHCnjT9oHDxdGpS_BLVC_kNL_fDh8j4LegNK2t-HSnuYZ98vlp3kj3Wwt7jYQnSaWVZI7W-9S_ZrKi2ay6wx8lNu7-_bOpGXUz2tU1WU_64';

export default function Footer() {
  return (
    <footer className="mt-space-2xl bg-[#10243D] text-white/70 px-4 md:px-8 pt-space-xl pb-space-2xl">
      {/* Gold gradient top border */}
      <div className="w-full h-[2px] bg-gradient-to-r from-[#C5A15B] via-[#e8c178] to-transparent mb-space-lg"></div>

      {/* Main grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-space-xl max-w-7xl mx-auto">
        {/* Col 1 — Brand */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <img
              alt="Pulse Consultant Ltd Logo"
              className="h-7 w-auto object-contain"
              src={LOGO_URL}
            />
            <span className="font-headline-sm text-headline-sm text-white">
              Pulse Consultant Ltd
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-white/70 leading-relaxed">
            Elite corporate strategic advisory, risk governance, and sovereign financial solutions
            engineered for institutional excellence across Pan-African markets.
          </p>
        </div>

        {/* Col 2 — Pan-African Presence */}
        <div className="flex flex-col gap-4">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#C5A15B]">
            Pan-African Presence
          </span>
          <div className="grid grid-cols-1 gap-2 font-label-md text-label-md text-white">
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px] text-[#95f3e7]">location_on</span>
              Nairobi
            </span>
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px] text-[#95f3e7]">location_on</span>
              Johannesburg
            </span>
            <span className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px] text-[#95f3e7]">location_on</span>
              Lagos
            </span>
          </div>
        </div>

        {/* Col 3 — Navigation */}
        <div className="flex flex-col gap-4">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#C5A15B]">
            Navigation
          </span>
          <nav className="flex flex-col gap-2 font-label-md text-label-md text-white/70">
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <Link href="/industries" className="hover:text-white transition-colors">Industries</Link>
            <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
            <Link href="/team" className="hover:text-white transition-colors">Team</Link>
            <Link href="/insights" className="hover:text-white transition-colors">Insights</Link>
            <Link href="/#consultation-form" className="hover:text-white transition-colors">Consultation</Link>
          </nav>
        </div>

        {/* Col 4 — Contact */}
        <div className="flex flex-col gap-4">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#C5A15B]">
            Contact
          </span>
          <div className="flex flex-col gap-2 font-label-md text-label-md text-white/70">
            <a href="mailto:info@pulseconsultant.com" className="hover:text-white transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px] text-[#95f3e7]">mail</span>
              info@pulseconsultant.com
            </a>
            <a href="tel:+254000000000" className="hover:text-white transition-colors flex items-center gap-2">
              <span className="material-symbols-outlined text-[14px] text-[#95f3e7]">phone</span>
              +254 000 000 000
            </a>
          </div>
          <Link
            href="/contact"
            className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#087F75] text-white text-xs font-semibold rounded-lg hover:bg-[#066860] transition-colors"
          >
            <span className="material-symbols-outlined text-[14px]">calendar_month</span>
            Book Consultation
          </Link>
        </div>
      </div>

      {/* Copyright bar */}
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-space-md flex flex-wrap gap-2 items-center justify-between">
        <span className="font-label-sm text-label-sm text-white/70">
          Licensed Advisory Firm | ISO 9001:2015 Compliant
        </span>
        <span className="font-label-sm text-label-sm text-white/70">
          © 2024 Pulse Consultant Ltd. All rights reserved.
        </span>
      </div>
    </footer>
  );
}
