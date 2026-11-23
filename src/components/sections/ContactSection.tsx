'use client';

import { useState, FormEvent } from 'react';
import Button from '@/components/ui/Button';

const serviceOptions = [
  'Financial Advisory',
  'Strategic Consulting',
  'Investment Management',
  'Tax & Compliance',
  'Risk Assessment',
  'Corporate Governance',
  'Other',
];

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
}

export default function ContactSection() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // No backend yet — just show success state
    setSubmitted(true);
  };

  const inputClass =
    'w-full bg-white border border-border rounded px-4 py-3 font-jakarta text-sm text-slate-900 placeholder-slate-600/50 focus:outline-none focus:border-teal focus:ring-2 focus:ring-teal/15 transition-all duration-150 min-h-[48px]';

  return (
    <section id="contact" className="bg-offwhite py-20 md:py-28">
      <div className="section-container">
        {/* Section header */}
        <div className="text-center mb-14">
          <div className="inline-block w-12 h-0.5 bg-gold mb-4" aria-hidden="true" />
          <h2 className="font-playfair text-navy font-semibold text-3xl md:text-4xl mb-4">
            Start a Conversation
          </h2>
          <p className="font-jakarta text-slate-600 max-w-xl mx-auto leading-relaxed">
            Tell us about your goals. Our team will respond within one business day.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14">
          {/* Form */}
          <div className="lg:col-span-3">
            {submitted ? (
              <div className="bg-white border border-teal/30 rounded-lg p-10 text-center shadow-card-1">
                <div className="w-16 h-16 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-5">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#087F75" strokeWidth={2} className="w-8 h-8">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-playfair text-navy font-semibold text-2xl mb-3">
                  Message Sent
                </h3>
                <p className="font-jakarta text-slate-600 text-sm leading-relaxed">
                  Thank you for reaching out. A member of our team will be in touch within one business day.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 font-jakarta text-teal text-sm font-semibold hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white border border-border rounded-lg p-8 shadow-card-1"
                noValidate
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                  <div>
                    <label htmlFor="fullName" className="block font-jakarta text-navy text-sm font-semibold mb-2">
                      Full Name <span className="text-teal" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Dr. Emmanuel Okafor"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block font-jakarta text-navy text-sm font-semibold mb-2">
                      Email Address <span className="text-teal" aria-hidden="true">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@company.com"
                      required
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block font-jakarta text-navy text-sm font-semibold mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+234 800 000 0000"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block font-jakarta text-navy text-sm font-semibold mb-2">
                      Company Name
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Organisation"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mb-5">
                  <label htmlFor="service" className="block font-jakarta text-navy text-sm font-semibold mb-2">
                    Service Interest
                  </label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select a service…</option>
                    {serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label htmlFor="message" className="block font-jakarta text-navy text-sm font-semibold mb-2">
                    Message <span className="text-teal" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell us about your goals and how we can help…"
                    required
                    className={`${inputClass} min-h-[120px] resize-y`}
                  />
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full justify-center">
                  Send Message
                </Button>
              </form>
            )}
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            <div className="bg-white border border-border rounded-lg p-7 shadow-card-1">
              <h3 className="font-playfair text-navy font-semibold text-xl mb-5 gold-hairline pt-3">
                Contact Information
              </h3>
              <div className="space-y-4">
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded bg-teal/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#087F75" strokeWidth={1.5} className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-jakarta text-navy text-sm font-semibold mb-0.5">Office Address</p>
                    <p className="font-jakarta text-slate-600 text-sm leading-relaxed">123 Victoria Island, Lagos, Nigeria</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded bg-teal/10 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#087F75" strokeWidth={1.5} className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-jakarta text-navy text-sm font-semibold mb-0.5">Phone</p>
                    <a href="tel:+2348000000000" className="font-jakarta text-slate-600 text-sm hover:text-teal transition-colors duration-150">+234 800 000 0000</a>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded bg-teal/10 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#087F75" strokeWidth={1.5} className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-jakarta text-navy text-sm font-semibold mb-0.5">Email</p>
                    <a href="mailto:info@pulseconsultant.ng" className="font-jakarta text-slate-600 text-sm hover:text-teal transition-colors duration-150">info@pulseconsultant.ng</a>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="w-9 h-9 rounded bg-teal/10 flex items-center justify-center flex-shrink-0">
                    <svg viewBox="0 0 24 24" fill="#087F75" className="w-5 h-5">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-jakarta text-navy text-sm font-semibold mb-0.5">WhatsApp</p>
                    <a
                      href="https://wa.me/2348000000000"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-jakarta text-slate-600 text-sm hover:text-teal transition-colors duration-150"
                    >
                      Chat with us
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div
              className="rounded-lg overflow-hidden border border-border shadow-card-1 flex items-center justify-center bg-slate-100 h-48"
              aria-label="Office location map (placeholder)"
            >
              <div className="text-center">
                <svg viewBox="0 0 24 24" fill="none" stroke="#475569" strokeWidth={1.5} className="w-8 h-8 mx-auto mb-2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
                <p className="font-jakarta text-slate-600 text-xs">Map — Victoria Island, Lagos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
