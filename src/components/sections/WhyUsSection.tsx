const differentiators = [
  {
    icon: '👥',
    title: 'Expert Team',
    description:
      'Our advisors hold CFA, ACCA, and MBA credentials from leading institutions, with decades of frontline experience across financial markets.',
  },
  {
    icon: '📌',
    title: 'Proven Track Record',
    description:
      'Over 15 years of delivering measurable results — from successful capital raises to complex restructurings — across diverse sectors.',
  },
  {
    icon: '⚙️',
    title: 'Tailored Solutions',
    description:
      'No one-size-fits-all mandates. Every engagement begins with deep discovery to design solutions fit for your specific context.',
  },
  {
    icon: '🔄',
    title: 'End-to-End Support',
    description:
      'From initial strategy through execution and ongoing review, we stand beside you at every stage of your financial journey.',
  },
];

const trustBadges = [
  'SEC Registered',
  'ICAN Member Firm',
  'ISO 9001 Certified',
  'CIBN Accredited',
];

export default function WhyUsSection() {
  return (
    <section id="why-us" className="bg-navy py-20 md:py-28">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-block w-12 h-0.5 bg-gold mb-4" aria-hidden="true" />
          <h2 className="font-playfair text-white font-semibold text-3xl md:text-4xl mb-4">
            Why Choose Pulse Consultant
          </h2>
          <p className="font-jakarta text-white/70 max-w-2xl mx-auto leading-relaxed">
            We combine institutional rigor with the agility and personal attention of a dedicated
            advisory partner.
          </p>
        </div>

        {/* Differentiators grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {differentiators.map((item) => (
            <div
              key={item.title}
              className="p-7 rounded-lg border border-white/10 hover:border-gold/30 hover:bg-white/5 transition-all duration-200"
            >
              <div
                className="text-2xl mb-4 w-12 h-12 rounded-lg flex items-center justify-center bg-white/5"
                aria-hidden="true"
              >
                {item.icon}
              </div>
              <div className="w-8 h-0.5 bg-gold mb-4" aria-hidden="true" />
              <h3 className="font-playfair text-white font-semibold text-xl mb-3">{item.title}</h3>
              <p className="font-jakarta text-white/70 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Trust badges */}
        <div className="border-t border-white/10 pt-10">
          <p className="font-jakarta text-white/50 text-xs uppercase tracking-widest text-center mb-6">
            Certifications &amp; Memberships
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {trustBadges.map((badge) => (
              <div
                key={badge}
                className="px-5 py-2.5 rounded border border-gold/30 bg-gold/5 text-gold font-jakarta text-sm font-semibold tracking-wide"
              >
                {badge}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
