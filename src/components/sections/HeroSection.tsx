import Button from '@/components/ui/Button';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{background:
          'linear-gradient(135deg, #0A1826 0%, #10243D 50%, #0D2F2A 100%)',}}
    >
      {/* Decorative background elements */}
      <div
        className="absolute inset-0 opacity-5"
        style={{backgroundImage:
            'radial-gradient(circle at 20% 50%, #087F75 0%, transparent 50%), radial-gradient(circle at 80% 20%, #C5A15B 0%, transparent 40%)',}}
        aria-hidden="true"
      />
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{backgroundImage:
            'linear-gradient(#E2E8F0 1px, transparent 1px), linear-gradient(90deg, #E2E8F0 1px, transparent 1px)',
          backgroundSize: '60px 60px',}}
        aria-hidden="true"
      />

      <div className="section-container relative z-10 text-center py-32 md:py-40">
        {/* Pre-heading badge */}
        <div className="inline-flex items-center gap-2 bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-gold" aria-hidden="true" />
          <span className="font-jakarta text-gold text-xs font-semibold tracking-widest uppercase">
            Trusted Financial Partner
          </span>
        </div>

        {/* Main headline */}
        <h1 className="font-playfair text-white font-semibold mb-6 leading-tight" style={{fontSize: 'clamp(2rem, 5vw, 3.5rem)'}}>
          Strategic Insights.<br />
          <span className="text-teal">Financial Solutions.</span><br />
          Sustainable Growth.
        </h1>

        {/* Subheadline */}
        <p className="font-jakarta text-white/75 max-w-2xl mx-auto mb-10 leading-relaxed" style={{fontSize: 'clamp(1rem, 2vw, 1.125rem)'}}>
          Pulse Consultant Ltd delivers expert financial advisory, strategic consulting, and
          investment management services. We partner with corporations and high-net-worth
          individuals to build lasting financial success.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg" href="#contact">
            Schedule Consultation
          </Button>
          <Button
            variant="outline"
            size="lg"
            href="/pulse-consultant-company-profile.pdf"
            download="Pulse-Consultant-Company-Profile.pdf"
          >
            Download Company Profile
          </Button>
        </div>

        {/* Stats strip */}
        <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 max-w-3xl mx-auto">
          {[
            { value: '15+', label: 'Years Experience' },
            { value: '500+', label: 'Clients Served' },
            { value: '$2B+', label: 'Assets Managed' },
            { value: '98%', label: 'Client Retention' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-playfair text-gold font-semibold text-2xl md:text-3xl font-tabular-nums">
                {stat.value}
              </div>
              <div className="font-jakarta text-white/60 text-xs uppercase tracking-wider mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll down indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40" aria-hidden="true">
        <span className="font-jakarta text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
