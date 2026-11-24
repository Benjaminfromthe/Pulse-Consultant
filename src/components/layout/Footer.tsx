'use client';

import Link from 'next/link';

const LOGO_URL =
  'https://lh3.googleusercontent.com/aida/ALJJyrBSjpqaVEyfi_krpHNJwokl1hq7NvmyPOnwWu3iTlblIWWwsOhEp7ITUZo_fi8lBWthoahDpkPFew-hDgrgD7m-tnARXULZUTMuulaJiIds9AVUUfuhifpdspXQOjRnYHCnjT9oHDxdGpS_BLVC_kNL_fDh8j4LegNK2t-HSnuYZ98vlp3kj3Wwt7jYQnSaWVZI7W-9S_ZrKi2ay6wx8lNu7-_bOpGXUz2tU1WU_64';

export default function Footer() {
  return (
    <footer className="mt-space-2xl bg-[#10243D] text-surface-container-low px-margin-mobile pt-space-xl pb-space-2xl">
      {/* Gold gradient top border */}
      <div className="w-full h-[2px] bg-gradient-to-r from-tertiary-fixed-dim via-tertiary to-transparent mb-space-lg"></div>

      <div className="flex flex-col gap-space-lg">
        {/* Logo + name */}
        <div className="flex items-center gap-space-xs">
          <img
            alt="Pulse Consultant Ltd Logo"
            className="h-7 w-auto object-contain"
            src={LOGO_URL}
          />
          <span className="font-headline-sm text-headline-sm text-surface-container-lowest">
            Pulse Consultant Ltd
          </span>
        </div>

        {/* Description */}
        <p className="font-body-sm text-body-sm text-secondary-fixed-dim leading-relaxed">
          Elite corporate strategic advisory, risk governance, and sovereign financial solutions
          engineered for institutional excellence across Pan-African markets.
        </p>

        {/* Pan-African Presence */}
        <div className="flex flex-col gap-space-xs">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary-fixed-dim">
            Pan-African Presence
          </span>
          <div className="grid grid-cols-3 gap-space-xs font-label-md text-label-md text-surface-container-lowest">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-primary-fixed">location_on</span>
              Nairobi
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-primary-fixed">location_on</span>
              Johannesburg
            </span>
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-primary-fixed">location_on</span>
              Lagos
            </span>
          </div>
        </div>

        {/* Nav links */}
        <div className="flex flex-wrap gap-space-md font-label-md text-label-md text-secondary-fixed-dim pt-space-xs">
          <Link href="/about" className="hover:text-surface-container-lowest transition-colors">
            About
          </Link>
          <Link href="/services" className="hover:text-surface-container-lowest transition-colors">
            Services
          </Link>
          <Link href="/insights" className="hover:text-surface-container-lowest transition-colors">
            Insights
          </Link>
          <Link href="/#consultation-form" className="hover:text-surface-container-lowest transition-colors">
            Consultation
          </Link>
        </div>

        {/* Copyright */}
        <div className="pt-space-md border-t border-surface-container-highest/10 flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-secondary-fixed-dim/70">
            Licensed Advisory Firm | ISO 9001:2015 Compliant
          </span>
          <span className="font-label-sm text-label-sm text-secondary-fixed-dim/70">
            © 2024 Pulse Consultant Ltd. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
