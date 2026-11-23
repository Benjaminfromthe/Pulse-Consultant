import type { Metadata } from 'next'
import Link from 'next/link'
import Button from '@/components/ui/Button'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn about Pulse Consultant Ltd — our story, vision, mission, core values, and the methodology that drives measurable results for our clients.',
  alternates: { canonical: '/about' },
}

const stats = [
  { value: '10+', label: 'Years of Experience' },
  { value: '50+', label: 'Clients Served' },
  { value: '9', label: 'Advisory Services' },
  { value: '5', label: 'Priority Industries' },
]

const coreValues = [
  { title: 'Integrity', desc: 'We uphold the highest standards of honesty and transparency in every engagement.' },
  { title: 'Excellence', desc: 'We pursue exceptional quality and rigour in all our work.' },
  { title: 'Partnership', desc: 'We build long-term collaborative relationships grounded in trust.' },
  { title: 'Evidence-Based', desc: 'Every recommendation is grounded in rigorous data and research.' },
  { title: 'Confidentiality', desc: 'Client information is handled with absolute discretion and security.' },
  { title: 'Sustainability', desc: 'We embed long-term thinking into every strategy we craft.' },
  { title: 'Agility', desc: 'We adapt quickly to evolving market conditions and client needs.' },
  { title: 'Impact', desc: 'We measure our success by the tangible outcomes we create for clients.' },
]

const methodologySteps = [
  { n: 1, title: 'Discovery', desc: 'Deep-dive assessment of your business context, challenges, and objectives.' },
  { n: 2, title: 'Analysis', desc: 'Rigorous data analysis, benchmarking, and stakeholder interviews.' },
  { n: 3, title: 'Strategy', desc: 'Tailored recommendations with clear prioritisation and a delivery roadmap.' },
  { n: 4, title: 'Execution', desc: 'Hands-on implementation support and continuous performance tracking.' },
]

const competitiveAdvantages = [
  { title: 'Deep Industry Expertise', desc: 'Sector-specific knowledge across 5 priority industries built over 10+ years.' },
  { title: 'Evidence-Based Approach', desc: 'Data-driven insights and analysis — not gut-feel recommendations.' },
  { title: 'Confidentiality First', desc: 'Rigorous data protection and NDA-backed client engagements.' },
  { title: 'End-to-End Solutions', desc: 'From strategic diagnosis through implementation and performance monitoring.' },
  { title: 'Local Market Mastery', desc: 'Deep knowledge of African and emerging market dynamics and regulatory environments.' },
  { title: 'Sustainable Growth Focus', desc: 'Strategies designed for long-term value creation, not short-term fixes.' },
]

export default async function AboutPage() {
  return (
    <main>
      {/* Section 1: Hero */}
      <div className="bg-navy">
        <div className="section-container py-24">
          <nav className="flex items-center gap-2 text-sm mb-6">
            <Link href="/" className="text-white/60 hover:text-white transition-colors">
              Home
            </Link>
            <span className="text-white/40">/</span>
            <span className="text-gold">About Us</span>
          </nav>
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-semibold text-white mt-6 mb-4">
            About Pulse Consultant Ltd
          </h1>
          <p className="text-white/80 text-lg md:text-xl">
            Strategic Insights. Financial Solutions. Sustainable Growth.
          </p>
        </div>
      </div>

      {/* Section 2: Our Story */}
      <section className="bg-offwhite">
        <div className="section-container py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="block uppercase text-teal tracking-widest text-sm font-semibold mb-4">
                Our Story
              </span>
              <h2 className="font-playfair text-3xl text-navy mb-6">
                Built on Expertise. Driven by Results.
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                Pulse Consultant Ltd was founded on a singular belief: that businesses across Africa and emerging
                markets deserve access to the same quality of strategic and financial advisory that the world&apos;s
                leading firms receive. We bridge that gap with rigorous analysis, sector-specific depth, and a
                genuine commitment to our clients&apos; long-term success.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Over more than a decade, we have built a team of specialists across financial advisory, strategy,
                risk, and governance — earning the trust of over 50 organisations through measurable, sustainable
                outcomes. Every engagement is treated as a partnership, not a transaction.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-white rounded-lg p-6 border-t-4 border-gold shadow-card-1">
                  <p className="font-playfair text-3xl text-gold font-bold">{stat.value}</p>
                  <p className="text-sm text-slate-600 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Vision & Mission */}
      <section className="bg-white">
        <div className="section-container py-20">
          <div className="text-center mb-12">
            <span className="block uppercase text-teal tracking-widest text-sm font-semibold mb-3">
              Our Foundation
            </span>
            <h2 className="font-playfair text-3xl text-navy">Vision &amp; Mission</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="pr-8 md:border-r md:border-gold pb-10 md:pb-0">
              <span className="block uppercase text-gold tracking-wider text-xs font-semibold mb-4">
                Our Vision
              </span>
              <h3 className="font-playfair text-2xl text-navy mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed">
                To be the most trusted financial advisory and strategic consulting firm in Africa and emerging
                markets, renowned for integrity, expertise, and transformational client outcomes.
              </p>
            </div>
            <div className="md:pl-8 pt-10 md:pt-0">
              <span className="block uppercase text-gold tracking-wider text-xs font-semibold mb-4">
                Our Mission
              </span>
              <h3 className="font-playfair text-2xl text-navy mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed">
                To deliver evidence-based, results-driven consulting that creates measurable, sustainable value
                for every client we serve — through deep industry expertise, rigorous analysis, and genuine
                partnership.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: 8 Core Values */}
      <section className="bg-offwhite">
        <div className="section-container py-20">
          <div className="text-center mb-12">
            <span className="block uppercase text-teal tracking-widest text-sm font-semibold mb-3">
              What We Stand For
            </span>
            <h2 className="font-playfair text-3xl text-navy">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {coreValues.map((value) => (
              <div key={value.title} className="bg-white rounded-lg p-6 border-t-2 border-gold shadow-card-1">
                <h3 className="font-semibold text-navy mb-2">{value.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Methodology */}
      <section className="bg-navy">
        <div className="section-container py-20">
          <div className="text-center mb-16">
            <span className="block uppercase text-gold/80 tracking-widest text-sm font-semibold mb-3">
              How We Work
            </span>
            <h2 className="font-playfair text-3xl text-white">Our Methodology</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-6">
            {methodologySteps.map((step) => (
              <div key={step.n} className="flex flex-col items-center text-center px-4">
                <div className="w-12 h-12 rounded-full bg-teal flex items-center justify-center font-playfair text-white text-xl font-bold mb-4">
                  {step.n}
                </div>
                <h3 className="font-semibold text-white text-lg mb-2">{step.title}</h3>
                <p className="text-white/70 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 6: Competitive Advantages */}
      <section className="bg-offwhite">
        <div className="section-container py-20">
          <div className="text-center mb-12">
            <span className="block uppercase text-teal tracking-widest text-sm font-semibold mb-3">
              Our Edge
            </span>
            <h2 className="font-playfair text-3xl text-navy">Why Choose Pulse Consultant</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {competitiveAdvantages.map((advantage) => (
              <div key={advantage.title} className="bg-white rounded-lg p-6 border-l-4 border-gold shadow-card-1">
                <h3 className="font-semibold text-navy mb-2">{advantage.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{advantage.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: CTA */}
      <section className="bg-teal">
        <div className="section-container py-20 text-center">
          <h2 className="font-playfair text-3xl md:text-4xl text-white mb-4">
            Partner with Pulse Consultant
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Let us help you turn strategic insights into sustainable growth.
          </p>
          <Button variant="secondary" size="lg" href="/#contact">
            Start a Conversation
          </Button>
        </div>
      </section>
    </main>
  )
}
