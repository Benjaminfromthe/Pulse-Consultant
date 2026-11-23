const steps = [
  {
    number: '01',
    title: 'Discovery',
    description:
      'We begin with a thorough assessment of your financial position, business objectives, and operating environment to establish a precise baseline.',
  },
  {
    number: '02',
    title: 'Strategy',
    description:
      'Our experts design a tailored strategy — grounded in data and aligned with your goals — with clear milestones and accountability frameworks.',
  },
  {
    number: '03',
    title: 'Implementation',
    description:
      'We work alongside your team to execute the agreed strategy with precision, managing complexity and adapting to evolving conditions.',
  },
  {
    number: '04',
    title: 'Review & Growth',
    description:
      'Continuous performance measurement, strategic recalibration, and proactive advisory ensure your trajectory remains on course for sustainable growth.',
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="bg-offwhite py-20 md:py-28">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-block w-12 h-0.5 bg-gold mb-4" aria-hidden="true" />
          <h2 className="font-playfair text-navy font-semibold text-3xl md:text-4xl mb-4">
            Our Engagement Process
          </h2>
          <p className="font-jakarta text-slate-600 max-w-2xl mx-auto leading-relaxed">
            A structured, proven approach that moves from insight to action — delivering clarity at
            every phase of your advisory journey.
          </p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line — desktop only */}
          <div
            className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-0.5"
            style={{background:
                'repeating-linear-gradient(90deg, #C5A15B 0px, #C5A15B 12px, transparent 12px, transparent 24px)',}}
            aria-hidden="true"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={step.number} className="relative flex flex-col items-center text-center">
                {/* Vertical connector line — mobile/tablet */}
                {index < steps.length - 1 && (
                  <div
                    className="lg:hidden absolute top-20 left-1/2 -translate-x-1/2 w-0.5 h-8"
                    style={{background:
                        'repeating-linear-gradient(180deg, #C5A15B 0px, #C5A15B 6px, transparent 6px, transparent 12px)',}}
                    aria-hidden="true"
                  />
                )}

                {/* Number badge */}
                <div className="relative z-10 w-20 h-20 rounded-full bg-teal flex items-center justify-center mb-6 shadow-card-2">
                  <span className="font-playfair text-white font-semibold text-2xl">
                    {step.number}
                  </span>
                </div>

                <h3 className="font-playfair text-navy font-semibold text-xl mb-3">{step.title}</h3>
                <p className="font-jakarta text-slate-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
