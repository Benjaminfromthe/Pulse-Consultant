import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Industries We Serve',
  description:
    'Strategic advisory across Banking & Financial Services, Energy & Renewables, Agribusiness, Healthcare & Life Sciences, and Technology & Telecom across Africa.',
  alternates: { canonical: '/industries' },
}

const industries = [
  {
    slug: 'banking-financial-services',
    icon: 'account_balance',
    title: 'Banking & Financial Services',
    description:
      'Tier-1 balance sheet recapitalisation, prudential compliance, cross-border bank integrations, and capital markets advisory for commercial banks and development finance institutions.',
    stat: '12 Mandates Advised',
    tags: ['Commercial Banking', 'DFIs', 'Capital Markets', 'Prudential Compliance'],
  },
  {
    slug: 'energy-renewables',
    icon: 'solar_power',
    title: 'Energy & Renewables',
    description:
      'Utility-scale solar, hydro IPP financing, transmission infrastructure concession frameworks, and off-grid energy solutions across the African energy transition.',
    stat: '450MW Financed',
    tags: ['Solar IPPs', 'Hydro', 'Off-Grid', 'PPAs'],
  },
  {
    slug: 'agribusiness',
    icon: 'agriculture',
    title: 'Agribusiness Value Chains',
    description:
      'Commercial processing hubs, export logistics syndication, sustainable crop monetisation, and agri-finance structuring from smallholder to large-scale operations.',
    stat: '$220M Outlay Advised',
    tags: ['Value Chains', 'Agri-Finance', 'Export Logistics', 'Processing'],
  },
  {
    slug: 'healthcare-life-sciences',
    icon: 'local_hospital',
    title: 'Healthcare & Life Sciences',
    description:
      'Regional hospital network mergers, pharmaceutical supply chain funding, cold-storage REITs, and health system financing across public and private sectors.',
    stat: 'Pan-Regional Coverage',
    tags: ['Hospital Networks', 'Pharma', 'Health REITs', 'PPP Structures'],
  },
  {
    slug: 'technology-telecom',
    icon: 'cell_tower',
    title: 'Technology & Telecom (TMT)',
    description:
      'Fibre consortium debt restructuring, sovereign spectrum acquisitions, data centre developments, and digital infrastructure concession frameworks.',
    stat: 'Tier-3 Infrastructure',
    tags: ['Fibre Networks', 'Spectrum', 'Data Centres', 'Digital Infra'],
  },
]

export default function IndustriesPage() {
  return (
    <div className="flex flex-col w-full">

      {/* ── HERO ── */}
      <section className="w-full bg-[#10243D] text-white px-margin-mobile py-space-2xl md:px-margin-desktop">
        <div className="flex items-center gap-1 font-label-sm text-label-sm text-white/40 mb-4 text-xs">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#C5A15B]">Industries</span>
        </div>
        <div className="flex items-center gap-1 mb-3">
          <span className="material-symbols-outlined text-[16px] text-[#C5A15B]">corporate_fare</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#C5A15B] font-semibold">Deep Domain Focus</span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-white font-semibold leading-tight mb-3">
          Sectors We Empower
        </h1>
        <p className="font-body-md text-body-md text-white/70 leading-relaxed max-w-2xl">
          Five priority industries where our advisory expertise runs deepest —
          backed by real mandates, verified outcomes, and pan-African market intelligence.
        </p>
      </section>

      {/* ── INDUSTRIES GRID ── */}
      <section className="w-full bg-surface px-margin-mobile py-space-2xl md:px-margin-desktop">
        <div className="flex flex-col gap-space-md max-w-4xl mx-auto">
          {industries.map((ind) => (
            <div
              key={ind.slug}
              className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden flex flex-col md:flex-row transition-all hover:shadow-md"
            >
              {/* Icon column */}
              <div className="flex items-center justify-center bg-[#10243D]/5 p-space-lg md:w-24 md:min-h-full shrink-0">
                <div className="w-12 h-12 rounded bg-[#10243D] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[26px] text-[#C5A15B]">{ind.icon}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-space-md flex flex-col gap-space-xs flex-1">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <h2 className="font-headline-sm text-headline-sm text-[#10243D] leading-tight">{ind.title}</h2>
                  <span className="font-label-sm text-label-sm text-primary font-semibold shrink-0 bg-primary/10 px-2 py-0.5 rounded">
                    {ind.stat}
                  </span>
                </div>

                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  {ind.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-space-2xs">
                  {ind.tags.map((tag) => (
                    <span
                      key={tag}
                      className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-2 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/industries/${ind.slug}`}
                  className="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-semibold hover:text-[#10243D] pt-space-2xs transition-colors self-start"
                >
                  <span>Explore Sector</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full bg-[#10243D] px-margin-mobile py-space-2xl md:px-margin-desktop text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C5A15B] via-[#e8c178] to-transparent" />
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-white font-semibold mb-space-sm">
          Operating in One of These Sectors?
        </h2>
        <p className="font-body-md text-body-md text-white/70 leading-relaxed mb-space-lg max-w-xl mx-auto">
          Our sector specialists are ready to discuss how we can support your most critical mandate.
        </p>
        <div className="flex flex-col sm:flex-row gap-space-sm justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-space-lg py-space-sm bg-primary-container text-white font-label-lg text-label-lg rounded shadow-md hover:bg-primary transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">calendar_month</span>
            Book a Consultation
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center gap-2 px-space-lg py-space-sm border border-[#C5A15B] text-[#C5A15B] font-label-lg text-label-lg rounded hover:bg-[#C5A15B]/10 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">verified</span>
            View Our Services
          </Link>
        </div>
      </section>

    </div>
  )
}
