import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Advisory Services | Pulse Consultant Ltd',
  description: 'Comprehensive advisory services: financial advisory, strategy consulting, transaction advisory, risk management, and more.',
}

const services = [
  {
    slug: 'financial-advisory',
    icon: 'account_balance_wallet',
    title: 'Financial Advisory',
    description: 'Capital structuring, debt advisory, equity raises, and balance sheet optimization for corporates, governments, and development institutions.',
  },
  {
    slug: 'strategy-consulting',
    icon: 'trending_up',
    title: 'Strategy Consulting',
    description: 'Market entry, growth strategy, competitive positioning, and business transformation for organizations navigating complex market dynamics.',
  },
  {
    slug: 'transaction-advisory',
    icon: 'handshake',
    title: 'Transaction Advisory',
    description: 'End-to-end M&A advisory, buy-side and sell-side mandates, due diligence, and deal structuring across sectors.',
  },
  {
    slug: 'project-finance',
    icon: 'construction',
    title: 'Project Finance',
    description: 'Feasibility studies, financial modeling, and lender advisory for infrastructure, energy, and large capital projects.',
  },
  {
    slug: 'risk-management',
    icon: 'security',
    title: 'Risk Management',
    description: 'Enterprise risk frameworks, regulatory compliance advisory, and risk quantification for financial institutions and corporates.',
  },
  {
    slug: 'public-sector-advisory',
    icon: 'domain',
    title: 'Public Sector Advisory',
    description: 'Policy analysis, public finance management, PPP structuring, and development finance for government entities and multilaterals.',
  },
  {
    slug: 'investment-research',
    icon: 'analytics',
    title: 'Investment Research',
    description: 'Sector research, market intelligence, and investment thesis development for fund managers, family offices, and institutional investors.',
  },
  {
    slug: 'sustainability-esg',
    icon: 'eco',
    title: 'Sustainability & ESG',
    description: 'ESG integration, green finance structuring, climate risk assessment, and sustainability reporting frameworks.',
  },
  {
    slug: 'corporate-governance',
    icon: 'gavel',
    title: 'Corporate Governance',
    description: 'Board effectiveness reviews, governance frameworks, and leadership advisory for boards and executive management teams.',
  },
]

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-[#10243D] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-2 text-xs text-[#b5c8e8] mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-[#C5A15B]">Services</span>
          </nav>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Advisory Services
          </h1>
          <p className="text-lg text-[#b5c8e8] max-w-2xl">
            Comprehensive advisory capabilities built on deep sector expertise and regional market knowledge.
          </p>
        </div>
      </section>

      {/* Service cards */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((svc) => (
              <Link
                key={svc.slug}
                href={`/services/${svc.slug}`}
                className="group flex flex-col bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-lg hover:border-[#087F75] transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-[#10243D] flex items-center justify-center mb-6 group-hover:bg-[#087F75] transition-colors">
                  <span className="material-symbols-outlined text-white text-2xl">{svc.icon}</span>
                </div>
                <h2 className="text-xl font-bold text-[#10243D] mb-3 group-hover:text-[#087F75] transition-colors">
                  {svc.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed flex-1 mb-6">
                  {svc.description}
                </p>
                <div className="flex items-center justify-end">
                  <span className="material-symbols-outlined text-[#087F75] group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#10243D] py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Looking for a specific advisory capability?
          </h2>
          <p className="text-[#b5c8e8] mb-8 max-w-xl mx-auto">
            Our multi-disciplinary teams bring integrated thinking across all our practice areas.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#087F75] text-white font-bold rounded-lg hover:bg-[#066860] transition-colors"
          >
            <span className="material-symbols-outlined text-lg">calendar_month</span>
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </>
  )
}
