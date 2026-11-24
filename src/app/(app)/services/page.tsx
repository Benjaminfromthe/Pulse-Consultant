import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Advisory Services',
  description:
    'Nine specialist advisory practices: financial advisory, strategy consulting, M&A, risk management, digital transformation, ESG, tax structuring, turnaround, and PPP advisory.',
  alternates: { canonical: '/services' },
}

const services = [
  {
    num: '01',
    slug: 'financial-advisory',
    icon: 'account_balance_wallet',
    title: 'Financial Advisory & Capital Raising',
    description:
      'Debt syndication, private equity placement, and institutional balance sheet restructuring to fuel sustainable growth and mitigate FX exposure.',
  },
  {
    num: '02',
    slug: 'strategic-consulting',
    icon: 'trending_up',
    title: 'Strategic Management & Corporate Growth',
    description:
      'Formulating defensible corporate trajectories, market entry blueprints, and board-level strategic oversight tailored for African economic cycles.',
  },
  {
    num: '03',
    slug: 'transaction-advisory',
    icon: 'handshake',
    title: 'Mergers & Acquisitions (M&A)',
    description:
      'Buy-side and sell-side transaction advisory, discrete target screening, valuation modelling, and comprehensive post-merger integration.',
  },
  {
    num: '04',
    slug: 'risk-management',
    icon: 'gavel',
    title: 'Risk Management & Regulatory Compliance',
    description:
      'Enterprise risk governance, statutory compliance audits, and sovereign regulatory dispute mitigation across central banking jurisdictions.',
  },
  {
    num: '05',
    slug: 'digital-transformation',
    icon: 'hub',
    title: 'Digital Transformation & FinTech Advisory',
    description:
      'Modernising core banking infrastructure, cross-border digital payments architecture, and proprietary tech stack evaluation.',
  },
  {
    num: '06',
    slug: 'esg-sustainability',
    icon: 'eco',
    title: 'ESG & Sustainable Investment Advisory',
    description:
      'Aligning institutional portfolios with global climate standards, green bond certification, and sovereign sustainability taxonomies.',
  },
  {
    num: '07',
    slug: 'tax-compliance',
    icon: 'calculate',
    title: 'Tax Optimisation & Cross-Border Structuring',
    description:
      'International treaty utilisation, transfer pricing governance, and double-taxation defence across regional trade zones (AfCFTA).',
  },
  {
    num: '08',
    slug: 'business-restructuring',
    icon: 'sync_alt',
    title: 'Operational Restructuring & Turnaround',
    description:
      'Emergency cash preservation, operational cost rationalisation, and creditor standstill agreements for distressed institutional assets.',
  },
  {
    num: '09',
    slug: 'corporate-governance',
    icon: 'domain',
    title: 'Sovereign & Public-Private Partnerships (PPP)',
    description:
      'Advising ministerial authorities and concessionaires on bankable framework design, risk-sharing matrices, and multilateral funding.',
  },
]

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full">

      {/* ── HERO ── */}
      <section className="w-full bg-[#10243D] text-white px-margin-mobile py-space-2xl md:px-margin-desktop">
        <div className="flex items-center gap-1 font-label-sm text-label-sm text-white/40 mb-4 text-xs">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#C5A15B]">Services</span>
        </div>
        <div className="flex items-center gap-1 mb-3">
          <span className="material-symbols-outlined text-[16px] text-[#C5A15B]">verified</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#C5A15B] font-semibold">Specialised Advisory Practices</span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-white font-semibold leading-tight mb-3">
          Engineered for<br />Complex Environments
        </h1>
        <p className="font-body-md text-body-md text-white/70 leading-relaxed max-w-2xl">
          Nine partner-led advisory practices designed to resolve operational complexity,
          de-risk cross-border growth, and unlock enterprise equity across Africa.
        </p>
      </section>

      {/* ── SERVICES GRID ── */}
      <section className="w-full bg-surface-container-low px-margin-mobile py-space-2xl md:px-margin-desktop">
        <div className="flex flex-col gap-space-sm max-w-4xl mx-auto">
          {services.map((s) => (
            <div
              key={s.slug}
              className="p-space-md rounded-lg bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs transition-all hover:shadow-md"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-[22px]">{s.icon}</span>
                </div>
                <span className="font-label-sm text-label-sm text-[#C5A15B] font-bold tracking-wider">
                  PRACTICE {s.num}
                </span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-[#10243D]">{s.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                {s.description}
              </p>
              <Link
                href={`/services/${s.slug}`}
                className="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-semibold hover:text-[#10243D] pt-space-2xs transition-colors"
              >
                <span>Engage Practice</span>
                <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full bg-[#10243D] px-margin-mobile py-space-2xl md:px-margin-desktop text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C5A15B] via-[#e8c178] to-transparent" />
        <div className="flex items-center justify-center gap-1 mb-3">
          <span className="material-symbols-outlined text-[16px] text-[#C5A15B]">lock</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#C5A15B] font-semibold">Strict Discretion Guaranteed</span>
        </div>
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-white font-semibold mb-space-sm">
          Ready to Engage a Practice?
        </h2>
        <p className="font-body-md text-body-md text-white/70 leading-relaxed mb-space-lg max-w-xl mx-auto">
          Our senior partners are ready to discuss your mandate in complete confidence.
          No obligation — just a focused conversation about your challenge.
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
            href="/industries"
            className="inline-flex items-center justify-center gap-2 px-space-lg py-space-sm border border-[#C5A15B] text-[#C5A15B] font-label-lg text-label-lg rounded hover:bg-[#C5A15B]/10 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">domain</span>
            View Industries
          </Link>
        </div>
      </section>

    </div>
  )
}
