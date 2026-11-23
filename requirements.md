# Pulse Consultant Ltd — Platform Requirements

## 1. Project Overview
Corporate portfolio and business development web platform for Pulse Consultant Ltd.
Tagline: "Strategic Insights. Financial Solutions. Sustainable Growth."
Stack: Next.js 15 (App Router), TypeScript, Tailwind CSS, static data only.

## 2. Functional Requirements

### 2.1 Section: Hero (#hero)
- Full-viewport height (min-h-screen)
- Background: dark navy overlay over a subtle gradient or decorative pattern
- Headline: "Strategic Insights. Financial Solutions. Sustainable Growth." in Playfair Display, white, 3.5rem desktop / 2.25rem mobile
- Subheadline paragraph describing Pulse Consultant Ltd's mission
- Primary CTA: "Schedule Consultation" — teal button, links to #contact
- Secondary CTA: "Download Company Profile" — gold outlined button, downloads /pulse-consultant-company-profile.pdf
- Scroll-down indicator at bottom

### 2.2 Section: About Us (#about)
- Split layout: text left, stats right
- Company history paragraph, mission statement, vision statement, core values list
- Leadership bios: 3 bios with name, title, photo placeholder, short bio
- 4 stat blocks with gold top-border: 15+ Years Experience, 500+ Clients Served, $2B+ Assets Managed, 98% Client Retention

### 2.3 Section: Services (#services)
- Off-white background
- Section heading: "Our Services" in Playfair Display navy
- 6 service cards in a responsive grid (1-col mobile, 2-col tablet, 3-col desktop)
- Each card: white background, card-1 shadow, gold top-border on hover, icon, title in Playfair Display, 2-line description
- Services: Financial Advisory, Strategic Consulting, Investment Management, Tax & Compliance, Risk Assessment, Corporate Governance

### 2.4 Section: Why Choose Us (#why-us)
- Navy background, white text
- Section heading in Playfair Display white
- 4 differentiator columns: Expert Team, Proven Track Record, Tailored Solutions, End-to-End Support
- Each column: gold icon or number, title, description
- Trust badges row: 3–4 certification/membership placeholder badges with gold border

### 2.5 Section: Our Process (#process)
- Off-white background
- Section heading in Playfair Display navy
- 4-step horizontal timeline (mobile: vertical): 01 Discovery, 02 Strategy, 03 Implementation, 04 Review & Growth
- Steps connected by a gold dashed line (desktop)
- Each step: teal circle number badge, Playfair Display title, description

### 2.6 CTA Banner (between Process and Testimonials)
- Full-width navy-to-teal gradient banner
- Bold headline: "Ready to Transform Your Business?"
- Subtext: "Partner with Pulse Consultant for expert guidance on your financial and strategic goals."
- Button: "Schedule a Free Consultation" — white button linking to #contact

### 2.7 Section: Testimonials (#testimonials)
- White background
- 3 testimonial cards in a row (single column on mobile)
- Each card: quote text, client name, company, 5 gold stars
- Partner logos strip: 5 placeholder logo boxes with gold border

### 2.8 Section: Contact (#contact)
- Split layout: form left (60%), contact info right (40%)
- Form fields: Full Name (text), Email (email), Phone (tel), Company (text), Service Interest (dropdown: Financial Advisory, Strategic Consulting, Investment Management, Tax & Compliance, Risk Assessment, Corporate Governance, Other), Message (textarea)
- Submit button: "Send Message" — teal primary
- Right side: address, phone number, email address, WhatsApp CTA link
- Map placeholder: a styled gray rectangle
- Form uses React useState for local state; no backend

### 2.9 Footer
- Navy background, white text
- 4-column layout: Brand (logo + tagline + social links), Services (list), Quick Links (list), Contact Info
- Newsletter signup: email input + "Subscribe" button
- Bottom bar: copyright, Privacy Policy link, Terms of Service link, "Download Company Profile" PDF button (gold outlined)

### 2.10 Persistent UI Elements
- WhatsApp button: fixed bottom-right, z-50, 56px teal circle, WhatsApp SVG icon, tooltip "Chat on WhatsApp", pulse animation, links to https://wa.me/2348000000000
- Downloadable PDF: /pulse-consultant-company-profile.pdf, download attribute, appears in hero + footer

### 2.11 Header
- Sticky, scroll-aware (adds backdrop-blur + shadow after 20px scroll)
- Navy background (#10243D)
- Logo: "Pulse Consultant" in Playfair Display with a gold accent
- Nav links: Home, About, Services, Why Us, Process, Testimonials, Contact
- Active link: gold 2px underline
- CTA button: "Schedule Consultation" — teal
- Mobile: hamburger icon opens full-width nav drawer
- Height: 72px desktop, 64px mobile

## 3. Non-Functional Requirements

### 3.1 Performance
- Lighthouse Performance score ≥ 90
- Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
- Next.js Image optimization for all images
- Google Fonts loaded via next/font/google (zero layout shift)

### 3.2 Accessibility
- WCAG 2.1 AA compliance
- All interactive elements keyboard-navigable
- Minimum 4.5:1 contrast ratio for body text
- Semantic HTML: proper heading hierarchy (h1→h2→h3), landmarks (nav, main, footer, section)
- Alt text on all images; aria-label on icon-only buttons

### 3.3 SEO
- Next.js Metadata API: title, description, openGraph, twitter cards
- Structured data (JSON-LD) for Organization schema
- Canonical URL
- robots.txt and sitemap.xml (static)

### 3.4 Responsiveness
- Mobile-first; breakpoints: sm 640px, md 768px, lg 1024px, xl 1280px, 2xl 1536px
- Touch targets ≥ 48px on mobile
- No horizontal overflow on any viewport

### 3.5 Browser Support
- Chrome, Firefox, Safari, Edge — last 2 major versions

## 4. Technical Constraints
- Next.js 15 App Router, TypeScript strict mode
- Tailwind CSS only (no CSS-in-JS, no styled-components)
- 'use client' directive only on interactive components
- All data static/hardcoded for initial release
- WhatsApp number: +2348000000000
