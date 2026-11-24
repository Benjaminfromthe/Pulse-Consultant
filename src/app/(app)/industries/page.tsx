import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Industries We Serve | Pulse Consultant Ltd',
  description: 'Strategic advisory across Banking & Financial Services, Energy & Renewables, Agribusiness, Healthcare, and Technology & Telecom.',
}

const industries = [
  {
    slug: 'banking-financial-services',
    icon: 'account_balance',
    title: 'Banking & Financial Services',
    description: 'Capital structuring, regulatory advisory, and transaction support for commercial banks, development finance institutions, and capital markets participants across East and Central Africa.',
    stat: '40+ mandates',
  },
  {
    slug: 'energy-renewables',
    icon: 'bolt',
    title: 'Energy & Renewables',
    description: 'Project finance and feasibility advisory for large-scale renewables, hydro, geothermal, and off-grid solutions across the African energy transition.',
    stat: '20+ projects',
  },
  {
    slug: 'agribusiness',
    icon: 'agriculture',
    title: 'Agribusiness Value Chains',
    description: 'End-to-end advisory on value chain development, agri-finance structuring, and market linkages for smallholder to large-scale agribusiness operations.',
    stat: '15+ mandates',
  },
  {
    slug: 'healthcare-life-sciences',
    icon: 'local_hospital',
    title: 'Healthcare & Life Sciences',
    description: 'Strategic advisory for healthcare infrastructure expansion, pharmaceutical distribution, and health system financing across public and private sectors.',
    stat: '10+ mandates',
  },
  {
    slug: 'technology-telecom',
    icon: 'devices',
    title: 'Technology & Telecom (TMT)',
    description: 'Advisory on digital transformation investments, fintech strategy, and telecom infrastructure transactions for emerging market operators and investors.',
    stat: '12+ mandates',
  },
]

export default function IndustriesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#10243D] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-2 text-xs text-[#b5c8e8] mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-[#C5A15B]">Industries</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Industries We Serve
          </h1>
          <p className="text-lg text-[#b5c8e8] max-w-2xl">
            Deep sector expertise across the most dynamic industries shaping Africa&apos;s economic future.
          </p>
        </div>
      </section>

      {/* Industry cards */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((ind) => (
              <Link
                key={ind.slug}
                href={`/industries/${ind.slug}`}
                className="group flex flex-col bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-[#087F75] transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-[#10243D] flex items-center justify-center mb-6 group-hover:bg-[#087F75] transition-colors">
                  <span className="material-symbols-outlined text-white text-2xl">{ind.icon}</span>
                </div>
                <h2 className="text-xl font-bold text-[#10243D] mb-3 group-hover:text-[#087F75] transition-colors">
                  {ind.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6">
                  {ind.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#C5A15B] uppercase tracking-wide">
                    {ind.stat}
                  </span>
                  <span className="material-symbols-outlined text-[#087F75] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#087F75] py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Ready to explore sector-specific solutions?
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto">
            Connect with our sector specialists for a focused conversation about your industry.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#087F75] font-bold rounded-lg hover:bg-gray-100 transition-colors"
          >
            <span className="material-symbols-outlined text-lg">calendar_month</span>
            Book a Sector Briefing
          </Link>
        </div>
      </section>
    </>
  )
}
