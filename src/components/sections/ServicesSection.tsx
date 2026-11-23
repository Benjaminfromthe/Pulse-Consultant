const services = [
  {
    icon: '📊',
    title: 'Financial Advisory',
    description:
      'Comprehensive financial planning, capital structure advisory, and transaction support for complex business decisions.',
  },
  {
    icon: '🎯',
    title: 'Strategic Consulting',
    description:
      'Market entry strategy, competitive positioning, and organizational transformation to accelerate growth.',
  },
  {
    icon: '📈',
    title: 'Investment Management',
    description:
      'Disciplined portfolio construction, asset allocation, and performance monitoring aligned to your objectives.',
  },
  {
    icon: '📋',
    title: 'Tax & Compliance',
    description:
      'Tax planning, structuring, and regulatory compliance services to protect your financial interests.',
  },
  {
    icon: '🛡️',
    title: 'Risk Assessment',
    description:
      'Enterprise risk identification, quantification, and mitigation frameworks tailored to your exposure profile.',
  },
  {
    icon: '🏛️',
    title: 'Corporate Governance',
    description:
      'Board advisory, governance framework design, and executive accountability structures for sustainable leadership.',
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-offwhite py-20 md:py-28">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-block w-12 h-0.5 bg-gold mb-4" aria-hidden="true" />
          <h2 className="font-playfair text-navy font-semibold text-3xl md:text-4xl mb-4">
            Our Services
          </h2>
          <p className="font-jakarta text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A comprehensive suite of financial and strategic advisory services, delivered by seasoned
            professionals with deep sector expertise.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-white border border-border rounded-lg p-7 shadow-card-1 hover:shadow-card-2 hover:border-gold/50 transition-all duration-200 cursor-default"
              style={{borderTopWidth: '2px'}}
            >
              <div
                className="text-3xl mb-4 w-14 h-14 rounded-lg flex items-center justify-center bg-offwhite group-hover:bg-teal/5 transition-colors duration-200"
                aria-hidden="true"
              >
                {service.icon}
              </div>
              <h3 className="font-playfair text-navy font-semibold text-xl mb-3 group-hover:text-teal transition-colors duration-200">
                {service.title}
              </h3>
              <p className="font-jakarta text-slate-600 text-sm leading-relaxed">
                {service.description}
              </p>
              <div className="mt-5 flex items-center gap-2 text-teal font-jakarta text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <span>Learn more</span>
                <span aria-hidden="true">&rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
