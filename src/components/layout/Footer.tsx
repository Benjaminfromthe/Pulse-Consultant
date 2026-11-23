'use client';

import Button from '@/components/ui/Button';

const serviceLinks = [
  'Financial Advisory',
  'Strategic Consulting',
  'Investment Management',
  'Tax & Compliance',
  'Risk Assessment',
  'Corporate Governance',
];

const quickLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About Us', href: '#about' },
  { label: 'Our Services', href: '#services' },
  { label: 'Why Choose Us', href: '#why-us' },
  { label: 'Our Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact Us', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white" aria-label="Site footer">
      <div className="section-container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <span className="font-playfair text-white text-xl font-semibold">Pulse</span>
              <span className="font-playfair text-gold text-xl font-semibold">Consultant</span>
            </div>
            <p className="font-jakarta text-white/70 text-sm leading-relaxed mb-6">
              Strategic Insights. Financial Solutions. Sustainable Growth.
            </p>
            <p className="font-jakarta text-white/60 text-sm leading-relaxed mb-6">
              Empowering businesses with expert financial guidance and strategic consulting for over 15 years.
            </p>
            {/* Social Links */}
            <div className="flex gap-3">
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded flex items-center justify-center border border-white/20 text-white/70 hover:border-gold hover:text-gold transition-colors duration-150"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Twitter"
                className="w-9 h-9 rounded flex items-center justify-center border border-white/20 text-white/70 hover:border-gold hover:text-gold transition-colors duration-150"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="w-9 h-9 rounded flex items-center justify-center border border-white/20 text-white/70 hover:border-gold hover:text-gold transition-colors duration-150"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="font-playfair text-white font-semibold text-base mb-5 gold-hairline pt-3">
              Our Services
            </h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <a
                    href="#services"
                    className="font-jakarta text-white/70 text-sm hover:text-gold transition-colors duration-150"
                  >
                    {service}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-playfair text-white font-semibold text-base mb-5 gold-hairline pt-3">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="font-jakarta text-white/70 text-sm hover:text-gold transition-colors duration-150"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter Column */}
          <div>
            <h3 className="font-playfair text-white font-semibold text-base mb-5 gold-hairline pt-3">
              Get In Touch
            </h3>
            <address className="not-italic space-y-3 mb-6">
              <p className="font-jakarta text-white/70 text-sm">
                123 Victoria Island
                <br />Lagos, Nigeria
              </p>
              <p>
                <a href="tel:+2348000000000" className="font-jakarta text-white/70 text-sm hover:text-gold transition-colors duration-150">
                  +234 800 000 0000
                </a>
              </p>
              <p>
                <a href="mailto:info@pulseconsultant.ng" className="font-jakarta text-white/70 text-sm hover:text-gold transition-colors duration-150">
                  info@pulseconsultant.ng
                </a>
              </p>
            </address>

            {/* Newsletter */}
            <div>
              <p className="font-jakarta text-white/70 text-sm mb-3">Subscribe to our newsletter</p>
              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  aria-label="Newsletter email"
                  className="flex-1 bg-white/10 border border-white/20 rounded px-3 py-2 text-sm font-jakarta text-white placeholder-white/40 focus:outline-none focus:border-teal min-w-0"
                />
                <button
                  type="submit"
                  className="bg-teal hover:bg-teal-hover text-white text-sm font-jakarta font-semibold px-4 py-2 rounded transition-colors duration-150 whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="font-jakarta text-white/60 text-sm">
              &copy; 2025 Pulse Consultant Ltd. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-4 md:gap-6">
              <a href="#" className="font-jakarta text-white/60 text-sm hover:text-white transition-colors duration-150">
                Privacy Policy
              </a>
              <a href="#" className="font-jakarta text-white/60 text-sm hover:text-white transition-colors duration-150">
                Terms of Service
              </a>
              <Button variant="outline" size="sm" href="/pulse-consultant-company-profile.pdf" download="Pulse-Consultant-Company-Profile.pdf">
                Download Company Profile
              </Button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
