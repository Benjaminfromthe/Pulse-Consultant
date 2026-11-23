import HeroSection from '@/components/sections/HeroSection';
import AboutSection from '@/components/sections/AboutSection';
import ServicesSection from '@/components/sections/ServicesSection';
import WhyUsSection from '@/components/sections/WhyUsSection';
import ProcessSection from '@/components/sections/ProcessSection';
import CTABannerSection from '@/components/sections/CTABannerSection';
import TestimonialsSection from '@/components/sections/TestimonialsSection';
import ContactSection from '@/components/sections/ContactSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <WhyUsSection />
      <ProcessSection />
      <CTABannerSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
