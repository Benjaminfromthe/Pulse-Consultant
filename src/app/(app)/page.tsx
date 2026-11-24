'use client';

import { useState } from 'react';
import Link from 'next/link';

const LOGO_URL =
  'https://lh3.googleusercontent.com/aida/ALJJyrBSjpqaVEyfi_krpHNJwokl1hq7NvmyPOnwWu3iTlblIWWwsOhEp7ITUZo_fi8lBWthoahDpkPFew-hDgrgD7m-tnARXULZUTMuulaJiIds9AVUUfuhifpdspXQOjRnYHCnjT9oHDxdGpS_BLVC_kNL_fDh8j4LegNK2t-HSnuYZ98vlp3kj3Wwt7jYQnSaWVZI7W-9S_ZrKi2ay6wx8lNu7-_bOpGXUz2tU1WU_64';

export default function HomePage() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormSubmitted(true);
  }

  return (
    <div className="flex flex-col w-full text-on-surface">

      {/* ── SECTION 1: TOP ACTION QUICK BAR ── */}
      <section className="w-full bg-[#10243D] text-surface-container-lowest px-margin-mobile py-space-sm shadow-md">
        <div className="flex items-center justify-between gap-space-xs">
          <div className="flex items-center gap-space-xs min-w-0">
            <img
              alt="Pulse Consultant Ltd Logo"
              className="w-9 h-9 object-contain rounded-sm bg-surface-container-lowest p-1 shadow-sm shrink-0"
              src={LOGO_URL}
            />
            <div className="flex flex-col min-w-0">
              <span className="font-headline-sm text-headline-sm text-surface-container-lowest leading-none truncate">
                Pulse Consultant Ltd
              </span>
              <span className="font-label-sm text-label-sm text-tertiary-fixed-dim uppercase tracking-wider truncate">
                Strategic Advisory
              </span>
            </div>
          </div>
          <div className="flex items-center gap-space-2xs shrink-0">
            <a
              className="flex items-center gap-1 px-space-xs py-1.5 bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 text-surface-container-lowest font-label-md text-label-md rounded transition-colors"
              href="#profile-download"
              title="Download Profile"
            >
              <span className="material-symbols-outlined text-[16px] text-tertiary-fixed-dim">download</span>
              <span className="hidden sm:inline">Profile</span>
            </a>
            <a
              className="flex items-center gap-1 px-space-sm py-1.5 bg-primary-container text-on-primary font-label-md text-label-md rounded shadow-sm hover:opacity-95 transition-opacity"
              href="#consultation-form"
            >
              <span className="material-symbols-outlined text-[16px]">calendar_month</span>
              <span>Book</span>
            </a>
          </div>
        </div>
      </section>

      {/* ── SECTION 2: HERO ── */}
      <section className="w-full px-margin-mobile pt-space-lg pb-space-xl flex flex-col gap-space-lg bg-surface">
        <div className="flex flex-col gap-space-sm">
          {/* Badge */}
          <div className="inline-flex items-center gap-space-xs self-start px-space-sm py-1 rounded-full bg-tertiary-fixed/20 text-[#876828]">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
              Premier Pan-African Strategic Advisory
            </span>
          </div>

          <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-[#10243D] leading-tight font-semibold tracking-tight">
            Turning Opportunities into{' '}
            <span className="italic text-primary">Sustainable Growth</span>
          </h1>

          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Delivering high-stakes financial advisory, capital structuring, and strategic
            transformation for ambitious enterprises, sovereigns, and institutional investors
            across Africa.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-space-xs pt-space-xs">
            <a
              className="flex items-center justify-center gap-space-xs w-full py-space-sm px-space-lg bg-primary-container text-on-primary font-label-lg text-label-lg rounded shadow-md hover:bg-primary transition-all active:scale-[0.99] min-h-[48px]"
              href="#consultation-form"
            >
              <span className="material-symbols-outlined text-[20px]">calendar_today</span>
              <span>Book Consultation</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </a>
            <a
              className="flex items-center justify-center gap-space-xs w-full py-space-sm px-space-lg bg-surface-container-lowest text-[#10243D] font-label-lg text-label-lg rounded shadow-sm hover:bg-surface-container transition-all active:scale-[0.99] min-h-[48px]"
              href="#profile-download"
            >
              <span className="material-symbols-outlined text-[20px] text-tertiary">picture_as_pdf</span>
              <span>Download Firm Profile</span>
            </a>
          </div>
        </div>

        {/* Boardroom image */}
        <div className="relative w-full rounded-xl overflow-hidden shadow-xl bg-surface-container-high">
          <div className="h-1 w-full bg-gradient-to-r from-tertiary-fixed-dim via-tertiary to-primary-container"></div>
          <div
            className="relative w-full aspect-[4/3] bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBICLOV9EBMriB_n_HJpaXDI25-hky7qpxKvREZ-jXiPyau1XgbZZVd2T7r4n0tRFVF9wZ_OoWJ9mqzK6EbDiiToE03nGfr0awPQ2ArpfoFbG-WNdKxdhmEoSoxzOpBJsebbXBUb_8jqIGDicq-fzf6FM3bOP64n2KPZ-vhs2d2vGbxHMfKsjofH9wFRnXKaAWHX9U4VFI5zkNED92_56SWcu6X6wnpUwrqEF8hTQ')",
            }}
          >
            {/* Gradient scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#10243D]/90 via-[#10243D]/30 to-transparent"></div>

            {/* Pan-African Mandate pill */}
            <div className="absolute top-space-sm right-space-sm px-space-sm py-1 rounded-full bg-[#10243D]/80 backdrop-blur-md text-surface-container-lowest flex items-center gap-1.5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-fixed animate-ping"></span>
              <span className="font-label-sm text-label-sm text-tertiary-fixed-dim tracking-wide font-medium">
                Pan-African Mandate
              </span>
            </div>

            {/* Bottom metric pill */}
            <div className="absolute bottom-space-sm inset-x-space-sm p-space-sm rounded-lg bg-[#10243D]/95 backdrop-blur-lg shadow-lg flex items-center gap-space-sm">
              <div className="w-10 h-10 rounded bg-tertiary/20 flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-tertiary-fixed text-[24px]">account_balance</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-headline-sm text-headline-sm text-tertiary-fixed-dim font-bold leading-tight truncate">
                  $1.4B+ Deals Advised
                </span>
                <span className="font-label-sm text-label-sm text-secondary-fixed-dim truncate">
                  Across 18 Sovereign African Jurisdictions
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: METRICS RIBBON ── */}
      <section className="w-full bg-[#10243D] text-surface-container-lowest px-margin-mobile py-space-xl">
        <div className="flex flex-col gap-space-xs mb-space-md">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-tertiary-fixed-dim font-semibold">
            Institutional Standing
          </span>
          <h2 className="font-headline-sm text-headline-sm text-surface-container-lowest leading-tight">
            Delivering Quantifiable African Impact
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-space-sm">
          {[
            { value: '$1.4B+', label: 'Capital Raised & Structured' },
            { value: '98.4%', label: 'Advisory Client Retention' },
            { value: '18', label: 'African Jurisdictions' },
            { value: '250+', label: 'Executed Transactions' },
          ].map((metric) => (
            <div
              key={metric.label}
              className="p-space-md rounded-lg bg-surface-container-lowest/5 backdrop-blur-sm flex flex-col gap-1 relative overflow-hidden shadow-sm"
            >
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-tertiary-fixed-dim"></div>
              <span className="font-headline-lg-mobile text-headline-lg-mobile text-tertiary-fixed font-bold leading-none">
                {metric.value}
              </span>
              <span className="font-label-sm text-label-sm text-secondary-fixed-dim uppercase tracking-wider mt-1">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 4: SERVICES ── */}
      <section
        className="w-full px-margin-mobile py-space-2xl bg-surface-container-low flex flex-col gap-space-lg"
        id="services"
      >
        <div className="flex flex-col gap-1">
          <div className="inline-flex items-center gap-1 text-primary">
            <span className="material-symbols-outlined text-[18px]">verified</span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest font-bold">
              Specialized Advisory Practices
            </span>
          </div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-[#10243D] font-semibold">
            Engineered for Complex Environments
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            Comprehensive, partner-led solutions engineered to resolve operational complexity,
            de-risk cross-border growth, and unlock enterprise equity.
          </p>
        </div>

        <div className="flex flex-col gap-space-sm">
          {[
            {
              icon: 'trending_up',
              num: '01',
              title: 'Strategic Management & Corporate Growth',
              desc: 'Formulating defensible corporate trajectories, market entry blueprints, and board-level strategic oversight tailored for African economic cycles.',
            },
            {
              icon: 'account_balance_wallet',
              num: '02',
              title: 'Financial Advisory & Capital Raising',
              desc: 'Debt syndication, private equity placement, and institutional balance sheet restructuring to fuel sustainable growth and mitigate FX exposure.',
            },
            {
              icon: 'handshake',
              num: '03',
              title: 'Mergers & Acquisitions (M&A)',
              desc: 'Buy-side and sell-side transaction advisory, discrete target screening, valuation modeling, and comprehensive post-merger integration.',
            },
            {
              icon: 'gavel',
              num: '04',
              title: 'Risk Management & Regulatory Compliance',
              desc: 'Enterprise risk governance, statutory compliance audits, and sovereign regulatory dispute mitigation across central banking jurisdictions.',
            },
            {
              icon: 'hub',
              num: '05',
              title: 'Digital Transformation & FinTech Advisory',
              desc: 'Modernizing core banking infrastructure, cross-border digital payments architecture, and proprietary tech stack evaluation.',
            },
            {
              icon: 'eco',
              num: '06',
              title: 'ESG & Sustainable Investment Advisory',
              desc: 'Aligning institutional portfolios with global climate standards, green bonds certification, and sovereign sustainability taxonomies.',
            },
            {
              icon: 'calculate',
              num: '07',
              title: 'Tax Optimization & Cross-Border Structuring',
              desc: 'International treaty utilization, transfer pricing governance, and double-taxation defense across regional trade zones (AfCFTA).',
            },
            {
              icon: 'sync_alt',
              num: '08',
              title: 'Operational Restructuring & Turnaround',
              desc: 'Emergency cash preservation, operational cost rationalization, and creditor standstill agreements for distressed institutional assets.',
            },
            {
              icon: 'domain',
              num: '09',
              title: 'Sovereign & Public-Private Partnerships (PPP)',
              desc: 'Advising ministerial authorities and concessionaires on bankable framework design, risk-sharing matrices, and multi-lateral funding.',
            },
          ].map((service) => (
            <div
              key={service.num}
              className="p-space-md rounded-lg bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]">{service.icon}</span>
                </div>
                <span className="font-label-sm text-label-sm text-tertiary font-bold tracking-wider">
                  PRACTICE {service.num}
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-[#10243D]">{service.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                {service.desc}
              </p>
              <a
                className="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-semibold hover:text-[#10243D] pt-space-2xs"
                href="#consultation-form"
              >
                <span>Engage Practice</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 5: INDUSTRIES STRIP ── */}
      <section className="w-full px-margin-mobile py-space-xl bg-surface flex flex-col gap-space-md">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-tertiary font-bold">
              Deep Domain Focus
            </span>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-[#10243D] font-semibold">
              Sectors We Empower
            </h2>
          </div>
          <span className="font-label-sm text-label-sm text-secondary px-2.5 py-1 rounded-full bg-surface-container font-medium">
            Pan-Africa
          </span>
        </div>

        <div className="flex gap-space-sm overflow-x-auto pb-space-xs pt-1 -mx-margin-mobile px-margin-mobile">
          {[
            {
              icon: 'account_balance',
              title: 'Banking & Financial Services',
              desc: 'Tier-1 balance sheet recapitalization, prudential compliance, and cross-border bank integrations.',
              stat: '12 Mandates Advised',
            },
            {
              icon: 'solar_power',
              title: 'Energy & Renewables',
              desc: 'Utility-scale solar, hydro IPP financing, and transmission infrastructure concession frameworks.',
              stat: '450MW Financed',
            },
            {
              icon: 'agriculture',
              title: 'Agribusiness Value Chains',
              desc: 'Commercial processing hubs, export logistics syndication, and sustainable crop monetization.',
              stat: '$220M Outlay',
            },
            {
              icon: 'local_hospital',
              title: 'Healthcare & Life Sciences',
              desc: 'Regional hospital network mergers, pharmaceutical supply chain funding, and cold-storage REITs.',
              stat: 'Pan-Regional',
            },
            {
              icon: 'cell_tower',
              title: 'Technology & Telecom (TMT)',
              desc: 'Fiber consortium debt restructuring, sovereign spectrum acquisitions, and data center developments.',
              stat: 'Tier-3 Infrastructure',
            },
          ].map((sector) => (
            <div
              key={sector.title}
              className="w-64 shrink-0 p-space-md rounded-lg bg-surface-container-lowest shadow-sm flex flex-col justify-between gap-space-md"
            >
              <div className="flex flex-col gap-space-xs">
                <div className="w-10 h-10 rounded bg-surface-container flex items-center justify-center text-[#10243D]">
                  <span className="material-symbols-outlined text-[22px]">{sector.icon}</span>
                </div>
                <h4 className="font-headline-sm text-headline-sm text-[#10243D]">{sector.title}</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-normal">
                  {sector.desc}
                </p>
              </div>
              <div className="flex items-center gap-1 text-primary font-label-sm text-label-sm font-semibold">
                <span>{sector.stat}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── SECTION 6: CASE STUDIES ── */}
      <section className="w-full px-margin-mobile py-space-2xl bg-surface-container flex flex-col gap-space-lg">
        <div className="flex flex-col gap-1">
          <div className="inline-flex items-center gap-1 text-tertiary">
            <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest font-bold">
              Proven Track Record
            </span>
          </div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-[#10243D] font-semibold">
            Measurable Impact Delivered
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
            High-stakes African corporate transactions resolved through strategic precision and
            sovereign diplomacy.
          </p>
        </div>

        <div className="flex flex-col gap-space-md">
          {/* Case Study 1 */}
          <div className="rounded-xl bg-surface-container-lowest shadow-md overflow-hidden flex flex-col">
            <div
              className="h-44 w-full bg-cover bg-center relative"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDCP6IQSB1Xp17z6tCZa7s76Z_RCVkXk9ZGy8nLtJAdv_Vtw1k97b3uJRApfxRjWyI3Etbn-Jwt1vJYgaG0LkR0fTmo4aaR5JRXi7FxKEoqBZo4u4TymndyYGpfEdW8wZY8A9MiFdnD-BM1MAJepVOU0LcsoX6np4ocmRz0Lr03FyajnQHI_wueyNJKKYQntVbYgK49LRP-apBrUPWF3-b5DamORNeGWpy9kdD3Gw')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#10243D] via-[#10243D]/40 to-transparent"></div>
              <div className="absolute top-space-sm left-space-sm px-2.5 py-1 rounded bg-[#10243D]/90 backdrop-blur-md text-secondary-fixed font-label-sm text-label-sm">
                Telecommunications • East Africa
              </div>
              <div className="absolute bottom-space-sm right-space-sm px-2.5 py-1 rounded-full bg-tertiary-fixed text-[#5c4202] font-label-sm text-label-sm font-bold shadow-sm">
                Completed in 7 Months
              </div>
            </div>
            <div className="p-space-md flex flex-col gap-space-xs">
              <h3 className="font-headline-sm text-headline-sm text-[#10243D]">
                Pan-African Telecommunications Debt Restructuring
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Consortium advisory for syndicated multilateral credit facilities covering 4
                operational national subsidiaries facing acute foreign currency shortages.
              </p>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-0.5 mt-space-2xs">
                <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">
                  Verified Advisory Outcome
                </span>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">
                  $420M Restructured & 34% Lower Financing Cost
                </span>
              </div>
            </div>
          </div>

          {/* Case Study 2 */}
          <div className="rounded-xl bg-surface-container-lowest shadow-md overflow-hidden flex flex-col">
            <div
              className="h-44 w-full bg-cover bg-center relative"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBK_Ch7D5htpLfVGEpEio8D3v4Mi52w8hsfG9x3133xr5WGoT1Hgm8Z-nq_dCeXl9LJg3mrWy8vbNaQTU3mPIKe0enSTJyVjawUKxSgzyks2EqRpgWJmfLn_ha5fWck1eE7mPEMVpn9zFCV1PYM2_4kAf_n6WhtnGmNVjMzW00WDVjwAUjnJyR1B1pRgBKAe1aKi1GZC0y6RMZduwTumN2zhlg-Jh_zLdi38ZrxYQ')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#10243D] via-[#10243D]/40 to-transparent"></div>
              <div className="absolute top-space-sm left-space-sm px-2.5 py-1 rounded bg-[#10243D]/90 backdrop-blur-md text-secondary-fixed font-label-sm text-label-sm">
                Banking M&A • West & Central Africa
              </div>
              <div className="absolute bottom-space-sm right-space-sm px-2.5 py-1 rounded-full bg-tertiary-fixed text-[#5c4202] font-label-sm text-label-sm font-bold shadow-sm">
                +45% Market Share Expansion
              </div>
            </div>
            <div className="p-space-md flex flex-col gap-space-xs">
              <h3 className="font-headline-sm text-headline-sm text-[#10243D]">
                Commercial Bank Cross-Border Acquisition
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Lead transactional advisory for Tier-1 regional lender acquisition, prudential
                central bank clearances, and syndicated equity placement.
              </p>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-0.5 mt-space-2xs">
                <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">
                  Verified Advisory Outcome
                </span>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">
                  $180M Tier-1 Capital Injection & Clearance
                </span>
              </div>
            </div>
          </div>

          {/* Case Study 3 */}
          <div className="rounded-xl bg-surface-container-lowest shadow-md overflow-hidden flex flex-col">
            <div
              className="h-44 w-full bg-cover bg-center relative"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1k_c2xCGW9S5UV2YLtHjhjbL4-E7UQIuatZSyoLt59ZwKs1AcpyE4a2mmy6ks1gvqbKarI4oIewsLOv6rpNM-TXY3uS1G90K4NhoGtEsp8Fi1TdzVCaFVqM_zlAvPQeH9aexAV_xfKWyunVAo9XEpH3x_woxM07d0i2Ts6smR9T6lvolQxaiHQZatmIaJf1E800vKTvON77myglZuzgLy1OteZ9BINUNLryTlkQ')",
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#10243D] via-[#10243D]/40 to-transparent"></div>
              <div className="absolute top-space-sm left-space-sm px-2.5 py-1 rounded bg-[#10243D]/90 backdrop-blur-md text-secondary-fixed font-label-sm text-label-sm">
                Renewable Energy PPP • Southern Africa
              </div>
              <div className="absolute bottom-space-sm right-space-sm px-2.5 py-1 rounded-full bg-tertiary-fixed text-[#5c4202] font-label-sm text-label-sm font-bold shadow-sm">
                Zero Carbon Milestone
              </div>
            </div>
            <div className="p-space-md flex flex-col gap-space-xs">
              <h3 className="font-headline-sm text-headline-sm text-[#10243D]">
                Renewable Energy Grid PPP Financial Close
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Structuring the 25-year Power Purchase Agreement (PPA), government sovereign
                guarantee, and non-recourse senior debt package.
              </p>
              <div className="p-space-sm rounded-lg bg-surface-container-low flex flex-col gap-0.5 mt-space-2xs">
                <span className="font-label-sm text-label-sm text-secondary uppercase font-semibold">
                  Verified Advisory Outcome
                </span>
                <span className="font-headline-sm text-headline-sm text-primary font-bold">
                  120MW Solar Farm $95M Project Financing
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: TRUST / TESTIMONIALS ── */}
      <section className="w-full px-margin-mobile py-space-xl bg-surface flex flex-col gap-space-xl">
        {/* Institutional Badges */}
        <div className="flex flex-col gap-space-xs">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-widest font-semibold text-center">
            Institutional Endorsements & Regulatory Alignment
          </span>
          <div className="grid grid-cols-2 gap-space-xs pt-1">
            {[
              'Authorized Regulatory Advisors',
              'Global PE Partner Network',
              'Chambers Global Ranked',
              'AfDB Governance Aligned',
            ].map((badge) => (
              <div
                key={badge}
                className="p-space-sm rounded bg-surface-container flex items-center justify-center text-center"
              >
                <span className="font-label-md text-label-md font-semibold text-[#10243D]">
                  {badge}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Executive Testimonials */}
        <div className="flex flex-col gap-space-md">
          <div className="flex flex-col">
            <span className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest font-bold">
              Client Confidence
            </span>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-[#10243D] font-semibold">
              Executive Perspectives
            </h2>
          </div>

          {/* Testimonial 1 */}
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-md flex flex-col gap-space-sm relative">
            <div className="flex items-center gap-1 text-tertiary">
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
            <p className="font-body-md text-body-md text-[#10243D] italic leading-relaxed">
              &ldquo;Pulse Consultant Ltd demonstrated peerless financial acumen and deep local
              regulatory navigation during our cross-border syndicated financing across West Africa.
              They are indispensable counselors.&rdquo;
            </p>
            <div className="flex items-center gap-space-xs pt-space-xs">
              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                LC
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-bold text-[#10243D]">
                  Group Chief Executive Officer
                </span>
                <span className="font-label-sm text-label-sm text-secondary">
                  Pan-African Logistics Holding Corp
                </span>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="p-space-md rounded-xl bg-surface-container-lowest shadow-md flex flex-col gap-space-sm relative">
            <div className="flex items-center gap-1 text-tertiary">
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              ))}
            </div>
            <p className="font-body-md text-body-md text-[#10243D] italic leading-relaxed">
              &ldquo;Their strategic clarity turned an intricate multi-stakeholder turnaround into
              our fund&rsquo;s most resilient asset. Their partner-led model provides unwavering
              discretionary confidence.&rdquo;
            </p>
            <div className="flex items-center gap-space-xs pt-space-xs">
              <div className="w-9 h-9 rounded-full bg-tertiary/20 flex items-center justify-center text-tertiary font-bold">
                MD
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-label-md font-bold text-[#10243D]">
                  Managing Director
                </span>
                <span className="font-label-sm text-label-sm text-secondary">
                  Sovereign Wealth & Infrastructure Fund
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 8: CONSULTATION FORM ── */}
      <section
        className="w-full px-margin-mobile py-space-2xl bg-[#10243D] text-surface-container-lowest flex flex-col gap-space-xl relative overflow-hidden"
        id="consultation-form"
      >
        {/* Gold accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-tertiary-fixed-dim via-tertiary to-primary-fixed"></div>

        <div className="flex flex-col gap-space-xs">
          <div className="inline-flex items-center gap-1 text-tertiary-fixed">
            <span className="material-symbols-outlined text-[18px]">lock</span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest font-semibold">
              Strict Discretion Guaranteed
            </span>
          </div>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-surface-container-lowest font-semibold">
            Ready to Accelerate Your Strategic Agenda?
          </h2>
          <p className="font-body-md text-body-md text-secondary-fixed-dim leading-relaxed">
            Engage our senior partners for an executive-level consultation on debt restructuring,
            capital syndication, or Pan-African market expansion.
          </p>
        </div>

        {/* Form */}
        {!formSubmitted ? (
          <form
            className="flex flex-col gap-space-sm bg-surface-container-lowest/5 p-space-md rounded-xl backdrop-blur-md shadow-xl"
            onSubmit={handleSubmit}
          >
            <div className="flex flex-col gap-1">
              <label
                className="font-label-md text-label-md text-secondary-fixed-dim uppercase tracking-wider"
                htmlFor="lead-name"
              >
                Executive Name & Title
              </label>
              <input
                className="w-full h-12 px-space-md rounded bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                id="lead-name"
                placeholder="e.g. Dr. Kwame Mensah, Chief Executive"
                required
                type="text"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="font-label-md text-label-md text-secondary-fixed-dim uppercase tracking-wider"
                htmlFor="lead-email"
              >
                Corporate Email Address
              </label>
              <input
                className="w-full h-12 px-space-md rounded bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                id="lead-email"
                placeholder="k.mensah@institution.com"
                required
                type="email"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="font-label-md text-label-md text-secondary-fixed-dim uppercase tracking-wider"
                htmlFor="advisory-focus"
              >
                Advisory Practice Focus
              </label>
              <select
                className="w-full h-12 px-space-md rounded bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                id="advisory-focus"
              >
                <option value="growth">Strategic Management & Corporate Growth</option>
                <option value="capital">Financial Advisory & Capital Raising</option>
                <option value="mna">Mergers & Acquisitions (M&A)</option>
                <option value="risk">Risk Management & Regulatory Compliance</option>
                <option value="digital">Digital Transformation & FinTech Advisory</option>
                <option value="esg">ESG & Sustainable Investment Advisory</option>
                <option value="tax">Tax Optimization & Cross-Border Structuring</option>
                <option value="turnaround">Operational Restructuring & Turnaround</option>
                <option value="ppp">Sovereign & Public-Private Partnerships (PPP)</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label
                className="font-label-md text-label-md text-secondary-fixed-dim uppercase tracking-wider"
                htmlFor="jurisdiction"
              >
                Primary African Jurisdiction
              </label>
              <select
                className="w-full h-12 px-space-md rounded bg-surface-container-lowest text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-primary"
                id="jurisdiction"
              >
                <option value="kenya">Kenya & East Africa Community (EAC)</option>
                <option value="nigeria">Nigeria & West Africa (ECOWAS)</option>
                <option value="south-africa">South Africa & SADC</option>
                <option value="ghana">Ghana & Regional Hubs</option>
                <option value="multi">Pan-African Multi-Jurisdiction</option>
              </select>
            </div>
            <div className="pt-space-xs flex flex-col gap-space-xs">
              <button
                className="flex items-center justify-center gap-space-xs w-full py-space-sm px-space-lg bg-primary-container text-on-primary font-label-lg text-label-lg rounded shadow-lg hover:bg-primary transition-all active:scale-[0.99] min-h-[48px]"
                type="submit"
              >
                <span className="material-symbols-outlined text-[20px]">verified_user</span>
                <span>Schedule Confidential Advisory Session</span>
              </button>
              <span className="font-label-sm text-label-sm text-center text-secondary-fixed-dim/70">
                Protected by non-disclosure protocol. Direct partner reply within 4 hours.
              </span>
            </div>
          </form>
        ) : (
          <div className="p-space-lg rounded-xl bg-surface-container-lowest text-on-surface flex flex-col items-center text-center gap-space-sm">
            <div className="w-12 h-12 rounded-full bg-primary/20 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[28px]">mark_email_read</span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-[#10243D]">
              Confidential Dossier Received
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Thank you. A Senior Managing Partner from Pulse Consultant Ltd has been designated to
              review your institutional mandate. Our executive office will contact you within 4
              business hours.
            </p>
            <button
              className="mt-2 text-primary font-label-md text-label-md font-semibold underline"
              onClick={() => setFormSubmitted(false)}
            >
              Submit Another Brief
            </button>
          </div>
        )}
      </section>

      {/* ── SECTION 9: FIRM PROFILE DOWNLOAD ── */}
      <section
        className="w-full px-margin-mobile py-space-xl bg-surface-container-lowest flex flex-col gap-space-md"
        id="profile-download"
      >
        <div className="p-space-md rounded-xl bg-surface-container-low flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-sm">
            <div className="w-12 h-12 rounded bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[28px]">description</span>
            </div>
            <div className="flex flex-col">
              <h4 className="font-headline-sm text-headline-sm text-[#10243D]">
                Pulse 2024 Institutional Firm Profile
              </h4>
              <span className="font-label-sm text-label-sm text-secondary">
                PDF Comprehensive Capabilities & Track Record (4.2 MB)
              </span>
            </div>
          </div>
          <a
            className="w-full sm:w-auto px-space-md py-2.5 rounded bg-primary-container text-on-primary font-label-md text-label-md font-semibold text-center hover:bg-primary transition-all"
            href="/pulse-consultant-company-profile.pdf"
          >
            Download PDF
          </a>
        </div>
      </section>

      {/* ── BOTTOM NAV (Mobile fixed) ── */}
      <nav className="fixed bottom-0 inset-x-0 z-40 pb-safe bg-[#10243D]/95 backdrop-blur-xl shadow-[0_-4px_16px_rgba(16,36,61,0.15)]">
        <div className="flex justify-around items-center h-20 px-space-xs">
          <Link
            href="/"
            className="flex flex-col items-center justify-center gap-1 w-16 h-14 transition-colors text-tertiary-fixed font-semibold"
          >
            <span className="material-symbols-outlined text-xl">dashboard</span>
            <span className="font-label-sm text-label-sm">Overview</span>
          </Link>
          <Link
            href="/#services"
            className="flex flex-col items-center justify-center gap-1 w-16 h-14 text-secondary-fixed-dim transition-colors"
          >
            <span className="material-symbols-outlined text-xl">corporate_fare</span>
            <span className="font-label-sm text-label-sm">Services</span>
          </Link>
          <Link
            href="/projects"
            className="flex flex-col items-center justify-center gap-1 w-16 h-14 text-secondary-fixed-dim transition-colors"
          >
            <span className="material-symbols-outlined text-xl">pie_chart</span>
            <span className="font-label-sm text-label-sm">Projects</span>
          </Link>
          <Link
            href="/insights"
            className="flex flex-col items-center justify-center gap-1 w-16 h-14 text-secondary-fixed-dim transition-colors"
          >
            <span className="material-symbols-outlined text-xl">auto_stories</span>
            <span className="font-label-sm text-label-sm">Insights</span>
          </Link>
          <Link
            href="/#consultation-form"
            className="flex flex-col items-center justify-center gap-1 w-16 h-14 text-secondary-fixed-dim transition-colors"
          >
            <span className="material-symbols-outlined text-xl">verified_user</span>
            <span className="font-label-sm text-label-sm">Advisory</span>
          </Link>
        </div>
      </nav>

      {/* ── WHATSAPP FAB ── */}
      <a
        aria-label="WhatsApp Client Inquiry"
        className="fixed bottom-20 right-4 z-40 md:bottom-6 w-13 h-13 min-w-[48px] min-h-[48px] p-3 rounded-full bg-emerald-700 text-white shadow-[0_8px_20px_rgba(4,120,87,0.4)] flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200"
        href="https://wa.me/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <span className="material-symbols-outlined text-[26px]">chat</span>
      </a>
    </div>
  );
}
