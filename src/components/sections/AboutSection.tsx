const stats = [
  { value: '15+', label: 'Years Experience', description: 'Delivering expert financial guidance' },
  { value: '500+', label: 'Clients Served', description: 'Across diverse industries' },
  { value: '$2B+', label: 'Assets Managed', description: 'Under active advisory' },
  { value: '98%', label: 'Client Retention', description: 'Year over year consistency' },
];

const values = [
  { title: 'Integrity', description: 'Unwavering commitment to ethical practice and transparent counsel.' },
  { title: 'Excellence', description: 'Delivering work of the highest professional standard, every engagement.' },
  { title: 'Innovation', description: 'Applying forward-thinking strategies to complex financial challenges.' },
  { title: 'Partnership', description: 'Building long-term relationships grounded in trust and results.' },
];

const leadership = [
  {
    name: 'Dr. Emmanuel Okafor',
    title: 'Chief Executive Officer',
    bio: 'A seasoned financial strategist with 20+ years leading corporate advisory mandates across West Africa.',
  },
  {
    name: 'Mrs. Adaeze Nwosu',
    title: 'Managing Director, Strategic Advisory',
    bio: 'Former investment banker turned strategic architect. Specializes in cross-border M&A and capital structure optimization.',
  },
  {
    name: 'Mr. Chukwuemeka Eze',
    title: 'Chief Investment Officer',
    bio: 'CFA charterholder with deep expertise in portfolio management, risk modeling, and alternative assets.',
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-white py-20 md:py-28">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block w-12 h-0.5 bg-gold mb-4" aria-hidden="true" />
          <h2 className="font-playfair text-navy font-semibold text-3xl md:text-4xl mb-4">
            About Pulse Consultant
          </h2>
          <p className="font-jakarta text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Founded with a mandate to bring institutional-grade financial expertise to growing businesses,
            Pulse Consultant has been a trusted partner for over 15 years.
          </p>
        </div>

        {/* Story + Stats grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
          {/* Story */}
          <div>
            <h3 className="font-playfair text-navy font-semibold text-2xl mb-5">Our Story</h3>
            <div className="space-y-4 font-jakarta text-slate-600 leading-relaxed">
              <p>
                Established in Lagos in 2009, Pulse Consultant Ltd was born from a vision to bridge the gap
                between world-class financial expertise and the ambitious businesses driving Africa's
                economic transformation.
              </p>
              <p>
                Over the years, we have advised government agencies, multinational corporations, and
                high-net-worth individuals — consistently delivering results that compound over time.
              </p>
              <p>
                Our mission is to empower organizations with strategic clarity, rigorous analysis, and
                actionable financial solutions that create lasting, sustainable value.
              </p>
            </div>

            <div className="mt-8 p-6 bg-offwhite rounded-lg border-l-4 border-gold">
              <p className="font-playfair text-navy text-lg font-medium italic">
                &ldquo;Our vision is to be the most trusted financial advisory partner for businesses
                pursuing excellence across Africa and beyond.&rdquo;
              </p>
            </div>

            {/* Core Values */}
            <div className="mt-8">
              <h4 className="font-playfair text-navy font-semibold text-xl mb-4">Core Values</h4>
              <div className="grid grid-cols-2 gap-3">
                {values.map((v) => (
                  <div key={v.title} className="p-4 bg-offwhite rounded-lg">
                    <div className="w-6 h-0.5 bg-gold mb-2" aria-hidden="true" />
                    <h5 className="font-jakarta text-navy font-semibold text-sm mb-1">{v.title}</h5>
                    <p className="font-jakarta text-slate-600 text-xs leading-relaxed">{v.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-col gap-5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white border border-border rounded-lg p-6 shadow-card-1 gold-hairline hover:shadow-card-2 transition-shadow duration-200"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-playfair text-navy font-semibold text-4xl font-tabular-nums">
                    {stat.value}
                  </span>
                  <span className="font-jakarta text-teal font-semibold text-sm uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
                <p className="font-jakarta text-slate-600 text-sm mt-1">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Leadership */}
        <div>
          <h3 className="font-playfair text-navy font-semibold text-2xl mb-8 text-center">Leadership Team</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {leadership.map((person) => (
              <div
                key={person.name}
                className="bg-white border border-border rounded-lg p-6 shadow-card-1 hover:shadow-card-2 transition-shadow duration-200 text-center"
              >
                {/* Avatar placeholder */}
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-playfair text-xl font-semibold"
                  style={{background: 'linear-gradient(135deg, #10243D, #087F75)'}}
                  aria-label={`Photo of ${person.name}`}
                >
                  {person.name.split(' ').slice(-1)[0][0]}
                </div>
                <h4 className="font-playfair text-navy font-semibold text-base mb-1">{person.name}</h4>
                <p className="font-jakarta text-teal text-xs font-semibold uppercase tracking-wider mb-3">
                  {person.title}
                </p>
                <p className="font-jakarta text-slate-600 text-sm leading-relaxed">{person.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
