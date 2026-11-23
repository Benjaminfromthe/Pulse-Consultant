# Team & Insights Implementation — Coder Context File

This file contains verbatim source extracts and field inventories for the coder implementing
`/team`, `/insights`, and `/insights/[slug]`. Do not re-derive anything already stated here.

---

## 1. `src/components/layout/Header.tsx` — Full verbatim content

```tsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

const navLinks = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Why Us', href: '#why-us' },
  { label: 'Process', href: '#process' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setActiveSection(href);
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-navy/95 backdrop-blur-sm shadow-card-2'
          : 'bg-navy'
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link
            href="#hero"
            className="flex items-center gap-1"
            onClick={() => handleNavClick('#hero')}
          >
            <span className="font-playfair text-white text-lg md:text-xl font-semibold tracking-tight">
              Pulse
            </span>
            <span className="font-playfair text-gold text-lg md:text-xl font-semibold tracking-tight">
              Consultant
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`font-jakarta text-sm transition-colors duration-150 pb-0.5 ${
                  activeSection === link.href
                    ? 'text-white border-b-2 border-gold'
                    : 'text-white/80 hover:text-white border-b-2 border-transparent'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <Button variant="primary" size="sm" href="#contact" onClick={() => handleNavClick('#contact')}>
              Schedule Consultation
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${
                mobileOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-opacity duration-200 ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-white transition-transform duration-200 ${
                mobileOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-0 top-16 bg-navy z-30 transition-transform duration-300 ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col px-6 py-8 gap-2" aria-label="Mobile navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => handleNavClick(link.href)}
              className={`font-jakarta text-base py-3 border-b border-white/10 transition-colors duration-150 ${
                activeSection === link.href ? 'text-gold' : 'text-white/80 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
          <div className="mt-6">
            <Button variant="primary" size="lg" href="#contact" className="w-full justify-center">
              Schedule Consultation
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
```

### What the coder must change in Header.tsx

The current `navLinks` array uses **anchor fragment hrefs** (`#hero`, `#about`, etc.) because
the site launched as a single-page layout. Now that `/team`, `/insights`, `/about`, and
`/projects` are real Next.js routes, the nav must be updated to use **page-level `href` values**
(`/`, `/about`, `/services`, `/projects`, `/team`, `/insights`) and the active-section logic
must be replaced with a pathname-based active state using `usePathname()`.

Replace the `navLinks` array and the active-state logic as follows:
- Use `import { usePathname } from 'next/navigation'` (already a client component).
- Replace all `<a href={link.href}>` with `<Link href={link.href}>` for proper client-side routing.
- Remove `handleNavClick`'s `setActiveSection` call; derive active state from `pathname.startsWith(link.href)` (special-case `/` with `pathname === '/'`).
- Keep the scroll behaviour, mobile drawer, and all visual classes exactly as they are.

New `navLinks` to use:
```ts
const navLinks = [
  { label: 'Home',     href: '/' },
  { label: 'About',    href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Projects', href: '/projects' },
  { label: 'Team',     href: '/team' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact',  href: '/#contact' },
];
```

The CTA button `href` stays as `/#contact` (hash on the home page).

---

## 2. `src/collections/TeamMembers.ts` — Exact field inventory

| Field name            | Type           | Notes                                              |
|-----------------------|----------------|----------------------------------------------------|
| `fullName`            | `text`         | required; used as admin title                      |
| `slug`                | `text`         | required, unique                                   |
| `title`               | `text`         | Job Title / Role; required                         |
| `photo`               | `upload`       | relationTo: `'media'`                              |
| `bio`                 | `richText`     | Full biography; required                           |
| `shortBio`            | `textarea`     | Short bio for cards (may be undefined/null)        |
| `yearsExperience`     | `number`       | required, min 0                                    |
| `qualifications`      | `array`        | sub-fields: `degree`, `institution`, `year`        |
| `certifications`      | `array`        | sub-fields: `name`, `issuingBody`, `year`, `expiryYear` |
| `specializations`     | `array`        | sub-fields: `area` (text)                          |
| `expertiseInServices` | `relationship` | relationTo: `'services'`; `hasMany: true`          |
| `expertiseInIndustries`| `relationship`| relationTo: `'industries'`; `hasMany: true`        |
| `linkedIn`            | `text`         | LinkedIn URL (optional)                            |
| `email`               | `email`        | Work email (optional)                              |
| `isLeadership`        | `checkbox`     | sidebar; default `false`                           |
| `isActive`            | `checkbox`     | sidebar; default `true`                            |
| `sortOrder`           | `number`       | sidebar; used for display ordering                 |

**No `expertiseInServices` / no direct `services` text field** — it is a relationship.
**No standalone `name` field** — the display name field is `fullName`.
There is **no `isPublic` field** — filter by `isActive: true` instead.

---

## 3. `src/collections/Insights.ts` — Exact field inventory

| Field name         | Type           | Notes                                                       |
|--------------------|----------------|-------------------------------------------------------------|
| `title`            | `text`         | required; used as admin title                               |
| `slug`             | `text`         | required, unique                                            |
| `type`             | `select`       | values: `article`, `market-analysis`, `publication`, `white-paper`, `press-release`, `newsletter` |
| `featuredImage`    | `upload`       | relationTo: `'media'` (optional)                            |
| `excerpt`          | `textarea`     | required; used for card summaries                           |
| `body`             | `richText`     | required; full article body                                 |
| `author`           | `relationship` | relationTo: `'team-members'` (single, optional)             |
| `relatedServices`  | `relationship` | relationTo: `'services'`; `hasMany: true`                   |
| `relatedIndustries`| `relationship` | relationTo: `'industries'`; `hasMany: true`                 |
| `tags`             | `array`        | sub-field: `tag` (text)                                     |
| `publishedAt`      | `date`         | Published date                                              |
| `isFeatured`       | `checkbox`     | sidebar; default `false`                                    |
| `status`           | `select`       | values: `draft`, `published`, `archived`; default `draft`; sidebar |
| `seo`              | `group`        | sub-fields: `metaTitle`, `metaDescription`, `keywords`      |

Filter for public display: `status: { equals: 'published' }`.
Filter featured: `isFeatured: { equals: true }`.

---

## 4. `src/app/layout.tsx` — Font class names

The root layout applies two CSS custom-property variables on `<html>`:

```tsx
<html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
```

| Variable            | Tailwind class     | Font                 | Use                              |
|---------------------|--------------------|----------------------|----------------------------------|
| `--font-playfair`   | `font-playfair`    | Playfair Display     | Headings (h1–h3), display text   |
| `--font-jakarta`    | `font-jakarta`     | Plus Jakarta Sans    | Body copy, nav, labels, UI text  |

Both fonts are loaded with weights `400`, `500`, `600`, `700`.

---

## 5. `src/lib/payload.ts` — Export confirmation

```ts
export async function getPayloadClient() { … }
```

Export name: **`getPayloadClient`** (named export, async function).
Import pattern used throughout the codebase:
```ts
import { getPayloadClient } from '@/lib/payload'
const payload = await getPayloadClient()
```

---

## 6. `tailwind.config.ts` — Available design tokens

### Colors
| Token            | Value / Notes                                      |
|------------------|----------------------------------------------------|
| `navy`           | `#10243D`                                          |
| `navy-hover`     | `#1B3659` (via `navy.hover`)                       |
| `teal`           | `#087F75`                                          |
| `teal-hover`     | `#066860` (via `teal.hover`)                       |
| `gold`           | `#C5A15B`                                          |
| `gold-light`     | `rgba(197,161,91,0.12)` (via `gold.light`)         |
| `gold-border`    | `rgba(197,161,91,0.3)` (via `gold.border`)         |
| `offwhite`       | `#F5F7FA`                                          |
| `border`         | `#E2E8F0`                                          |
| `slate-900`      | `#0F172A`                                          |
| `slate-600`      | `#475569`                                          |

### Box Shadows (card variants)
| Token      | Value                                                                           |
|------------|---------------------------------------------------------------------------------|
| `card-1`   | `0px 1px 3px rgba(16,36,61,0.04), 0px 4px 8px rgba(16,36,61,0.02)`            |
| `card-2`   | `0px 4px 12px rgba(16,36,61,0.06), 0px 1px 2px rgba(16,36,61,0.04)`           |
| `card-3`   | `0px 16px 32px -4px rgba(16,36,61,0.12), 0px 4px 8px -2px rgba(16,36,61,0.06)` |

Usage: `shadow-card-1`, `shadow-card-2`, `shadow-card-3`.

### Font families
`font-playfair`, `font-jakarta` (see §4 above).

### Custom spacing tokens
`gutter` (1.5rem), `margin-desktop` (3rem), `space-md/lg/xl/2xl/3xl`, `18` (4.5rem).

### Animation
`animate-pulse-ring` — used on the WhatsApp FAB pulse ring.

---

## 7. `src/app/insights/[slug]/page.tsx` — Existing stub (verbatim)

```tsx
import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'insights',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
  })

  const insight = docs[0]
  if (!insight) notFound()

  return (
    <main className="min-h-screen bg-offwhite">
      <section className="section-container py-20">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-sm font-semibold text-teal uppercase tracking-widest mb-4">
            {String(insight.type).replace(/-/g, ' ')}
          </span>
          <h1 className="font-playfair text-4xl md:text-5xl text-navy font-semibold mb-6">
            {insight.title as string}
          </h1>
          <p className="text-slate-600 text-lg mb-10">{insight.excerpt as string}</p>
        </div>
      </section>
    </main>
  )
}

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'insights',
      limit: 100,
      where: { status: { equals: 'published' } },
    })
    return docs.map((i) => ({ slug: i.slug as string }))
  } catch {
    return []
  }
}
```

**What to expand here:** replace the stub `<main>` body with the full article layout:
hero banner with `featuredImage`, author card (linked to `/team`), richText body rendered
via `@payloadcms/richtext-lexical/react` or a custom serializer, related services/industries
chips, back-to-insights link, and SEO metadata via `generateMetadata`.

---

## 8. Additional files the coder should check before writing

The following files exist in the repo and establish patterns to follow:

| File path                                      | Why to read it                                          |
|------------------------------------------------|---------------------------------------------------------|
| `src/app/projects/page.tsx`                    | Filtering pattern (sector/service), card layout         |
| `src/app/projects/[slug]/page.tsx`             | Detail page pattern, `generateStaticParams` shape       |
| `src/app/about/page.tsx`                       | Section/hero layout, `section-container` usage          |
| `src/components/ui/Button.tsx`                 | Button variants and props                               |
| `src/components/ui/WhatsAppButton.tsx`         | FAB pattern                                             |
| `src/app/globals.css`                          | `.section-container`, `.btn-*` utility classes          |
| `src/collections/Services.ts`                  | Relationship target schema for `expertiseInServices`    |

---

## 9. Key implementation notes for the coder

1. **Header nav update is a prerequisite** — do it first. All new pages are unreachable without it.
2. **Team page filtering:** render all members where `isActive: true`, sorted ascending by `sortOrder`. Show leadership members first (or in a separate "Leadership" row). No client-side filter UI needed unless the brief explicitly asks for one.
3. **Insights hub (`/insights`):** support URL-synced filter by `type` using a `?type=` query param (read via `useSearchParams` in a `'use client'` filter component; the page itself stays a Server Component). Paginate or show a "Load more" if >12 results.
4. **Insights detail (`/insights/[slug]`):** expand the existing stub — do not rewrite the `generateStaticParams` function, just add `generateMetadata` and flesh out the return JSX.
5. **richText body rendering:** Payload 3 uses Lexical by default. Use the `RichText` component from `@payloadcms/richtext-lexical/react` **if it is already installed**, otherwise render `body` as a JSON stringified fallback with a TODO comment — do not add new dependencies.
6. **TypeScript casting:** Payload's returned docs are typed loosely. Cast relationship fields with `as` or narrow with type guards rather than suppressing the whole module.
7. **`isApprovedForPublic` does not exist on TeamMembers** — use `isActive`.
8. **No `name` field on TeamMembers** — always use `fullName`.
