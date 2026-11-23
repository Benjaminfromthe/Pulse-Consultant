const testimonials = [
  {
    quote:
      'Pulse Consultant transformed our capital structure at a critical juncture. Their strategic clarity and execution discipline were instrumental in securing the financing we needed.',
    name: 'Mr. Biodun Fashola',
    company: 'Fashola Holdings Ltd',
    role: 'Group CEO',
  },
  {
    quote:
      'The investment management team at Pulse Consultant has consistently outperformed our benchmarks while maintaining the risk parameters we set together. Truly exceptional partners.',
    name: 'Dr. Ngozi Adeyemi',
    company: 'Adeyemi Family Office',
    role: 'Principal',
  },
  {
    quote:
      'From governance restructuring to tax optimization, their holistic approach gave us the institutional confidence to pursue our expansion strategy. Highly recommended.',
    name: 'Mrs. Amaka Obi',
    company: 'Greenfield Industries Plc',
    role: 'Chief Financial Officer',
  },
];

const partners = [
  'Partner One',
  'Partner Two',
  'Partner Three',
  'Partner Four',
  'Partner Five',
];

function StarRating() {
  return (
    <div className="flex gap-1 mb-4" aria-label="5 star rating">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          fill="#C5A15B"
          className="w-4 h-4"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="bg-white py-20 md:py-28">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-block w-12 h-0.5 bg-gold mb-4" aria-hidden="true" />
          <h2 className="font-playfair text-navy font-semibold text-3xl md:text-4xl mb-4">
            What Our Clients Say
          </h2>
          <p className="font-jakarta text-slate-600 max-w-xl mx-auto leading-relaxed">
            Relationships built on trust, results that speak for themselves.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-offwhite border border-border rounded-lg p-7 shadow-card-1 hover:shadow-card-2 transition-shadow duration-200 gold-hairline"
            >
              <StarRating />
              <blockquote className="font-jakarta text-slate-600 text-sm leading-relaxed mb-6 italic">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white font-playfair font-semibold text-sm flex-shrink-0"
                  style={{background: 'linear-gradient(135deg, #10243D, #087F75)'}}
                  aria-hidden="true"
                >
                  {t.name.split(' ').slice(-1)[0][0]}
                </div>
                <div>
                  <p className="font-jakarta text-navy font-semibold text-sm">{t.name}</p>
                  <p className="font-jakarta text-slate-600 text-xs">
                    {t.role}, {t.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partner logos strip */}
        <div className="border-t border-border pt-10">
          <p className="font-jakarta text-slate-600/60 text-xs uppercase tracking-widest text-center mb-6">
            Trusted By Industry Leaders
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {partners.map((partner) => (
              <div
                key={partner}
                className="px-8 py-4 border border-gold/30 rounded bg-offwhite text-slate-600/50 font-jakarta text-sm font-semibold tracking-wide"
                aria-label={`Partner: ${partner}`}
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
