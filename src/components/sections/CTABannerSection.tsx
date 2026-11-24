import Button from '@/components/ui/Button';
import { companyProfileUrl } from '@/lib/companyProfileUrl';

export default function CTABannerSection() {
  return (
    <section
      className="py-20 md:py-24"
      style={{background: 'linear-gradient(135deg, #10243D 0%, #0D3330 50%, #087F75 100%)',}}
    >
      <div className="section-container text-center">
        <div className="inline-block w-12 h-0.5 bg-gold mb-6" aria-hidden="true" />
        <h2 className="font-playfair text-white font-semibold text-3xl md:text-4xl mb-5 leading-tight">
          Ready to Transform Your Business?
        </h2>
        <p className="font-jakarta text-white/75 max-w-xl mx-auto mb-10 leading-relaxed">
          Partner with Pulse Consultant for expert guidance on your financial and strategic goals.
          Your first consultation is complimentary.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button variant="primary" size="lg" href="#contact">
            Schedule a Free Consultation
          </Button>
          <Button
            variant="outline"
            size="lg"
            href={companyProfileUrl()}
            download="Pulse-Consultant-Company-Profile.pdf"
            className="border-white/40 text-white hover:border-gold hover:text-gold"
          >
            Download Company Profile
          </Button>
        </div>
      </div>
    </section>
  );
}
