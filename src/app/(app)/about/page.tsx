import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Pulse Consultant Ltd — our story, vision, mission, core values, and the methodology that drives measurable results across Pan-African markets.',
  alternates: { canonical: '/about' },
}

const stats = [
  { value: 'Pan-African', label: 'Advisory Reach' },
  { value: '9', label: 'Advisory Practices' },
  { value: '5', label: 'Priority Sectors' },
  { value: 'Partner-Led', label: 'Every Engagement' },
]

const values = [
  { icon: 'verified_user', title: 'Integrity', desc: 'Uncompromising ethical standards in every client engagement and transaction.' },
  { icon: 'workspace_premium', title: 'Excellence', desc: 'Delivering outcomes that consistently exceed client expectations.' },
  { icon: 'handshake', title: 'Partnership', desc: 'Building long-term collaborative relationships grounded in trust.' },
  { icon: 'analytics', title: 'Evidence-Based', desc: 'Every recommendation grounded in rigorous data analysis and research.' },
  { icon: 'lock', title: 'Confidentiality', desc: 'Absolute discretion in every client relationship and mandate.' },
  { icon: 'eco', title: 'Sustainability', desc: 'Embedding long-term thinking into every strategy we craft.' },
  { icon: 'bolt', title: 'Agility', desc: 'Adapting quickly to evolving market conditions and client needs.' },
  { icon: 'track_changes', title: 'Impact', desc: 'Measured by the tangible, lasting value created for our clients.' },
]

const methodology = [
  { n: '01', title: 'Discovery', desc: 'Deep-dive assessment of your business context, challenges, and strategic objectives through stakeholder interviews and data gathering.' },
  { n: '02', title: 'Analysis', desc: 'Rigorous quantitative and qualitative analysis, benchmarking, and financial modelling to surface root causes and opportunities.' },
  { n: '03', title: 'Strategy', desc: 'Tailored, evidence-based recommendations with clear prioritisation, risk assessment, and an actionable delivery roadmap.' },
  { n: '04', title: 'Execution', desc: 'Hands-on implementation support, change management, and continuous performance tracking to ensure lasting results.' },
]

const advantages = [
  { icon: 'hub', title: 'Deep Sector Expertise', desc: 'Sector-specific knowledge across 5 priority industries built over a decade of pan-African advisory mandates.' },
  { icon: 'person_pin', title: 'Senior-Led Engagements', desc: 'Every mandate is led by a senior partner — not delegated to junior staff. You get our best people, always.' },
  { icon: 'analytics', title: 'Proprietary Frameworks', desc: 'Internally developed analytical models refined across hundreds of transactions and strategic engagements.' },
  { icon: 'diversity_3', title: 'Integrated Advisory', desc: 'Financial, strategic, transactional, and operational expertise under one roof for seamless end-to-end support.' },
  { icon: 'public', title: 'Pan-African Intelligence', desc: 'Deep understanding of African market dynamics, regulatory environments, and cross-border structuring nuances.' },
  { icon: 'verified', title: 'Measurable Outcomes', desc: 'All engagements defined by agreed KPIs and verified result metrics — we are accountable to your outcomes.' },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">

      {/* ── HERO ── */}
      <section className="w-full bg-[#10243D] text-white px-margin-mobile py-space-2xl md:px-margin-desktop">
        <div className="flex items-center gap-1 mb-3">
          <span className="material-symbols-outlined text-[16px] text-[#C5A15B]">domain</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#C5A15B] font-semibold">Our Firm</span>
        </div>
        <div className="flex items-center gap-1 font-label-sm text-label-sm text-white/40 mb-4 text-xs">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#C5A15B]">About Us</span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-white font-semibold leading-tight mb-3">
          Turning Complexity into<br />
          <span className="italic text-primary-fixed-dim">Measurable Growth</span>
        </h1>
        <p className="font-body-md text-body-md text-white/70 leading-relaxed max-w-2xl">
          Pulse Consultant Ltd is a premier pan-African strategic advisory and financial solutions firm,
          delivering evidence-based counsel to corporations, sovereigns, and institutional investors
          navigating complex market environments.
        </p>
      </section>

      {/* ── STATS ── */}
      <section className="w-full bg-surface-container-low px-margin-mobile py-space-xl md:px-margin-desktop">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm">
          {stats.map((s) => (
            <div key={s.label} className="relative p-space-md rounded-lg bg-surface-container-lowest shadow-sm flex flex-col gap-1 overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C5A15B]" />
              <span className="font-headline-lg-mobile text-headline-lg-mobile text-[#C5A15B] font-bold leading-none">{s.value}</span>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section className="w-full bg-surface px-margin-mobile py-space-2xl md:px-margin-desktop">
        <div className="flex flex-col md:grid md:grid-cols-2 gap-space-xl max-w-6xl mx-auto">
          <div className="flex flex-col gap-space-md">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[16px] text-primary">auto_stories</span>
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Our Story</span>
            </div>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-[#10243D] font-semibold leading-tight">
              Built on Expertise.<br />Driven by Results.
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              Founded with the conviction that African enterprises deserve world-class strategic advisory,
              Pulse Consultant Ltd has grown into a trusted partner for institutions seeking rigorous,
              partner-led counsel on their most consequential decisions.
            </p>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              From capital structuring and M&A to regulatory navigation and digital transformation,
              our integrated approach ensures that every recommendation is grounded in evidence,
              calibrated to the African context, and built to deliver lasting competitive advantage.
            </p>
          </div>
          <div className="relative rounded-xl overflow-hidden bg-surface-container-high min-h-[280px]">
            <div
              className="w-full h-full min-h-[280px] bg-cover bg-center"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBICLOV9EBMriB_n_HJpaXDI25-hky7qpxKvREZ-jXiPyau1XgbZZVd2T7r4n0tRFVF9wZ_OoWJ9mqzK6EbDiiToE03nGfr0awPQ2ArpfoFbG-WNdKxdhmEoSoxzOpBJsebbXBUb_8jqIGDicq-fzf6FM3bOP64n2KPZ-vhs2d2vGbxHMfKsjofH9wFRnXKaAWHX9U4VFI5zkNED92_56SWcu6X6wnpUwrqEF8hTQ')" }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#10243D]/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── VISION & MISSION ── */}
      <section className="w-full bg-surface-container-low px-margin-mobile py-space-2xl md:px-margin-desktop">
        <div className="text-center mb-space-xl">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Our Purpose</span>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-[#10243D] font-semibold mt-1">Vision &amp; Mission</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-md max-w-4xl mx-auto">
          <div className="relative p-space-lg rounded-xl bg-surface-container-lowest shadow-md overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-[#C5A15B]" />
            <div className="pl-space-sm">
              <div className="w-10 h-10 rounded bg-[#C5A15B]/10 flex items-center justify-center mb-space-sm">
                <span className="material-symbols-outlined text-[22px] text-[#C5A15B]">visibility</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-[#10243D] mb-space-xs">Our Vision</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                To be Africa&apos;s most trusted strategic advisory partner — the firm that institutions
                call when the stakes are highest and precision matters most.
              </p>
            </div>
          </div>
          <div className="relative p-space-lg rounded-xl bg-surface-container-lowest shadow-md overflow-hidden">
            <div className="absolute top-0 left-0 bottom-0 w-[3px] bg-primary-container" />
            <div className="pl-space-sm">
              <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center mb-space-sm">
                <span className="material-symbols-outlined text-[22px] text-primary">flag</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-[#10243D] mb-space-xs">Our Mission</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                To deliver expert-driven, evidence-based advisory that solves complex business challenges,
                unlocks new value, and builds lasting competitive advantage for our clients across Africa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="w-full bg-surface px-margin-mobile py-space-2xl md:px-margin-desktop">
        <div className="text-center mb-space-xl">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">What We Stand For</span>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-[#10243D] font-semibold mt-1">Our Core Values</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm max-w-6xl mx-auto">
          {values.map((v) => (
            <div key={v.title} className="relative p-space-md rounded-lg bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C5A15B]" />
              <div className="w-9 h-9 rounded bg-[#C5A15B]/10 flex items-center justify-center">
                <span className="material-symbols-outlined text-[20px] text-[#C5A15B]">{v.icon}</span>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-[#10243D]">{v.title}</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── METHODOLOGY ── */}
      <section className="w-full bg-[#10243D] text-white px-margin-mobile py-space-2xl md:px-margin-desktop">
        <div className="text-center mb-space-xl">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#C5A15B] font-semibold">How We Work</span>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-white font-semibold mt-1">Our Methodology</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm max-w-6xl mx-auto">
          {methodology.map((m) => (
            <div key={m.n} className="relative p-space-md rounded-lg bg-white/5 backdrop-blur-sm flex flex-col gap-space-xs overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-primary-fixed-dim" />
              <span className="font-headline-lg-mobile text-headline-lg-mobile text-primary-fixed-dim font-bold leading-none">{m.n}</span>
              <h3 className="font-headline-sm text-headline-sm text-white">{m.title}</h3>
              <p className="font-body-sm text-body-sm text-white/60 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── COMPETITIVE ADVANTAGES ── */}
      <section className="w-full bg-surface-container-low px-margin-mobile py-space-2xl md:px-margin-desktop">
        <div className="text-center mb-space-xl">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Why Choose Us</span>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-[#10243D] font-semibold mt-1">Our Competitive Edge</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-sm max-w-6xl mx-auto">
          {advantages.map((a) => (
            <div key={a.title} className="p-space-md rounded-lg bg-surface-container-lowest shadow-sm flex flex-col gap-space-xs">
              <div className="flex items-start gap-space-sm">
                <div className="w-10 h-10 rounded bg-primary/10 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[20px] text-primary">{a.icon}</span>
                </div>
                <div>
                  <h3 className="font-headline-sm text-headline-sm text-[#10243D] mb-1">{a.title}</h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{a.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full bg-[#10243D] px-margin-mobile py-space-2xl md:px-margin-desktop">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#C5A15B] via-[#e8c178] to-transparent" />
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-white font-semibold mb-space-sm">
            Ready to Work With Us?
          </h2>
          <p className="font-body-md text-body-md text-white/70 leading-relaxed mb-space-lg">
            Engage our senior partners for a confidential consultation on your most critical business challenge.
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
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              View Our Services
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
