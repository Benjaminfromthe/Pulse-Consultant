# Pulse Consultant Ltd — Technical Design Document

## 1. Architecture
- Framework: Next.js 15 with App Router
- Language: TypeScript (strict mode)
- Styling: Tailwind CSS v3 with custom theme extension
- Fonts: next/font/google (Playfair Display, Plus Jakarta Sans)
- Deployment target: Vercel (static export compatible)

## 2. Folder Structure

```
d:\Downloads\Pulse-Consultant\
├── public/
│   └── pulse-consultant-company-profile.pdf
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx          # Root layout: fonts, metadata, Header, Footer, WhatsAppButton
│   │   └── page.tsx            # Home page: all 8 sections
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── ServicesSection.tsx
│   │   │   ├── WhyUsSection.tsx
│   │   │   ├── ProcessSection.tsx
│   │   │   ├── CTABannerSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── ContactSection.tsx
│   │   └── ui/
│   │       ├── Button.tsx
│   │       └── WhatsAppButton.tsx
├── tailwind.config.ts
├── tsconfig.json
├── next.config.ts
└── package.json
```

## 3. Color System

| Token | Hex | Usage |
|-------|-----|-------|
| navy | #10243D | Nav, headers, footer, card titles |
| navy-hover | #1B3659 | Navy button hover |
| teal | #087F75 | CTAs, interactive states, process badges |
| teal-hover | #066860 | Teal hover |
| gold | #C5A15B | Badges, hairlines, PDF button, active nav |
| offwhite | #F5F7FA | Canvas background |
| slate-900 | #0F172A | Body text |
| slate-600 | #475569 | Secondary text |
| border | #E2E8F0 | Borders/dividers |
| white | #FFFFFF | Card surfaces, elevated panels |

Tailwind config extends `theme.colors` with these tokens.

## 4. Typography System

### Font Loading (next/font/google in layout.tsx)
```typescript
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-playfair' });
const jakarta = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['400','500','600','700'], variable: '--font-jakarta' });
```
Apply both variables to `<html>` className.

### Tailwind Font Families
```typescript
fontFamily: {
  playfair: ['var(--font-playfair)', 'serif'],
  jakarta: ['var(--font-jakarta)', 'sans-serif'],
}
```

### Type Scale
| Name | Size | Weight | Font |
|------|------|--------|------|
| display-lg | 3.5rem | 600 | Playfair |
| display-md | 2.5rem | 600 | Playfair |
| headline-lg | 2rem | 500 | Playfair |
| headline-md | 1.5rem | 500 | Playfair |
| headline-sm | 1.25rem | 600 | Playfair |
| body-xl | 1.125rem | 400 | Jakarta |
| body-lg | 1rem | 400 | Jakarta |
| body-md | 0.875rem | 400 | Jakarta |

## 5. Component Inventory

### Layout Components
- **Header**: sticky, scroll-aware, navy, hamburger mobile menu, gold active indicator, teal CTA
- **Footer**: navy 4-column, newsletter, PDF download, copyright bar

### Section Components
- **HeroSection**: full-viewport, gradient bg, headline, two CTAs, scroll indicator
- **AboutSection**: split layout, company story, 4 stat blocks
- **ServicesSection**: offwhite bg, 3×2 service card grid
- **WhyUsSection**: navy bg, 4 differentiators, trust badges
- **ProcessSection**: 4-step timeline, gold dashed connector
- **CTABannerSection**: gradient banner, single CTA
- **TestimonialsSection**: 3 cards, partner logo strip
- **ContactSection**: split form + info, map placeholder

### UI Components
- **Button**: variants (primary/secondary/outline/ghost), sizes (sm/md/lg), supports href or onClick
- **WhatsAppButton**: fixed bottom-right, teal circle, pulse animation

## 6. Header Design Spec
- Height: 72px desktop (`h-18`), 64px mobile (`h-16`)
- Background: `bg-navy` → `bg-navy/95 backdrop-blur-sm` after scroll
- Logo: `font-playfair text-white text-xl font-semibold` + gold accent span
- Nav links: `font-jakarta text-white/80 hover:text-white text-sm`, active state: `border-b-2 border-gold text-white`
- CTA: primary teal button, sm size
- Mobile drawer: full-width, navy bg, all nav links stacked, closes on link click
- Scroll detection: `useEffect` + `useState` for `scrolled` boolean (threshold 20px)

## 7. Footer Design Spec
- Background: `bg-navy`
- Padding: `py-16` top section + `py-6` bottom bar
- Column 1 (Brand): logo, tagline, social icon links (LinkedIn, Twitter, Facebook)
- Columns 2–3 (Services, Quick Links): `font-jakarta text-white/70 text-sm` lists
- Column 4 (Contact): address, phone, email, WhatsApp link
- Newsletter: inline email input + Subscribe button
- Bottom bar: separated by `border-t border-white/10`, copyright left, links + PDF button right

## 8. Persistent UI Elements

### WhatsApp Button
- Position: `fixed bottom-6 right-6 z-50`
- Size: `w-14 h-14` (56px) circle `rounded-full`
- Background: `bg-teal hover:bg-teal-hover`
- Animation: CSS `animate-pulse` or custom keyframe ring animation
- Link: `https://wa.me/2348000000000`
- Tooltip: `title="Chat on WhatsApp"` or Tailwind group-hover tooltip div

### PDF Download Button
- Variant: `outline` (gold border, transparent bg)
- Text: "Download Company Profile"
- Href: `/pulse-consultant-company-profile.pdf`
- HTML `download` attribute
- Appears in: HeroSection (secondary CTA), Footer bottom bar

## 9. Responsive Breakpoints
- Mobile-first base styles, enhanced at `md:` (768px) and `lg:` (1024px)
- Max content width: `max-w-7xl mx-auto px-6` (desktop) → `px-4` (mobile)
- Section padding: `py-20` desktop → `py-12` mobile
- Grid columns: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` for service/feature grids
- Header hamburger visible at `< md`, desktop nav hidden at `< md`

## 10. Animation & Interaction Notes
- Scroll-aware header: smooth transition on background opacity and blur
- Service card hover: `border-t-2 border-gold`, `shadow-card-2`, `transform translate-y-[-2px]` with `transition-all duration-200`
- Button hover: smooth background transition, `duration-150`
- WhatsApp button: outer ring pulse animation (CSS @keyframes)
- Process step numbers: subtle scale on hover
- All transitions use `ease-in-out` and durations between 150–300ms
- No heavy JS animations; CSS transitions preferred for performance
