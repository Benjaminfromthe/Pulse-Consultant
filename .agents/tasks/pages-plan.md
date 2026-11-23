# Implementation Plan — Projects & About Pages

## Codebase Findings

- **Next.js**: v16.4.6 (with App Router), **TypeScript**, **Tailwind CSS 4.3.3**
- **Payload CMS**: v3.94.1, `getPayloadClient()` is in `src/lib/payload.ts` — cached singleton, returns a Payload instance.
- **Fonts**: `--font-playfair` → class `font-playfair`; `--font-jakarta` → class `font-jakarta` (confirmed in `src/app/layout.tsx`).
- **Tailwind tokens in use** (`globals.css`): `bg-navy`, `bg-teal`, `bg-offwhite`, `text-gold`, `shadow-card-1`, `shadow-card-2`, `border-[#E2E8F0]`, `section-container` utility class.
- **Dynamic route pattern** (confirmed in `src/app/services/[slug]/page.tsx` and `src/app/case-studies/[slug]/page.tsx`): `params: Promise<{ slug: string }>` with `const { slug } = await params`.
- **Existing `CaseStudyCard`** (`src/components/cards/CaseStudyCard.tsx`): uses a nested `caseStudy: { ... }` prop object — must be fully replaced with a flat-prop API.
- **CaseStudies collection fields** (from `src/collections/CaseStudies.ts`): `projectTitle`, `slug`, `sector` (relationship → `industries`), `authorizedClientName`, `engagement.businessChallenge` (richText), `engagement.assignmentScope` (richText), `engagement.consultingApproach` (richText), `engagement.deliverables[]`, `results.metrics[]`, `results.summary` (richText), `results.clientTestimonial`, `results.testimonialAuthor`, `relatedService[]` (relationship → `services`), `isApprovedForPublic`, `status`.
- **Industries fields** (`src/collections/Industries.ts`): `name`, `slug`, `status`.
- **Services fields** (`src/collections/Services.ts`): `title`, `slug`, `status`.
- **`src/app/projects/page.tsx`**: does NOT exist — create from scratch.
- **`src/app/projects/[slug]/page.tsx`**: directory exists but file does NOT — create from scratch.
- **`src/app/about/page.tsx`**: does NOT exist — create from scratch.
- **Button component** at `src/components/ui/Button.tsx` supports `href`, `variant`, `size`, `download` — use it for CTAs.

---

## Key Constraints

1. **Tailwind 4** — standard utility classes work. CSS variables are defined in `globals.css` via `--color-*`. Use `bg-navy`, `text-teal`, `text-gold`, `bg-offwhite` etc. directly.
2. **Do NOT modify** `src/app/page.tsx` or any existing section component in `src/components/sections/`.
3. **Do NOT import `@/payload-types`** in any client component — use plain TS interfaces instead.
4. **Dynamic route params**: always `params: Promise<{ slug: string }>` with `const { slug } = await params`.
5. **Wrap ALL Payload calls in `try/catch`** — render empty state if DB is unavailable.
6. **`ProjectsClient`**: must be `'use client'` and receive only plain serializable props (no Payload types).
7. **CaseStudyCard**: no `'use client'` needed — only uses `Link`, no hooks.
8. **`renderField` helper**: if value is a string, return it; if it's a Payload richText object, return `'[Content available in CMS]'`.

---

## normalizeCaseStudy Helper Shape

This helper runs in the RSC (`projects/page.tsx`) to strip Payload internal types before sending props to the client component.

```ts
interface NormalizedCaseStudy {
  slug: string
  projectTitle: string
  authorizedClientName?: string
  sectorName?: string
  sectorId?: string
  challengeExcerpt?: string
  metrics?: Array<{ metric: string; value: string; context?: string }>
  // Detail page extras (also used in [slug]/page.tsx directly)
  assignmentScope?: string
  consultingApproach?: string
  deliverables?: string[]
  resultsSummary?: string
  clientTestimonial?: string
  testimonialAuthor?: string
  relatedServices?: Array<{ title: string; slug: string }>
}
```

The `challengeExcerpt` field is derived from `engagement.businessChallenge` by extracting plain text and truncating to 150 chars.

---

## Implementation Steps

- [ ] 1. **Replace `src/components/cards/CaseStudyCard.tsx`** with the new flat-prop API.
  - Delete all existing code. Define the `CaseStudyCardProps` interface with flat fields: `slug`, `projectTitle`, `authorizedClientName?`, `sectorName?`, `challengeExcerpt?`, `metrics?`.
  - No `'use client'` directive — the component uses only `Link`, no hooks.
  - Design: white card, `h-1` top bar that transitions to `bg-gold` on group-hover, teal sector badge (`bg-teal/10 text-teal`), `font-playfair` title, 3-metric grid (`flex gap-4`), "View Case Study →" `Link` to `/projects/${slug}`.
  - Files: `src/components/cards/CaseStudyCard.tsx`
  - Verify: `npm run build` — no TypeScript errors from the card component.

- [ ] 2. **Create `src/app/projects/ProjectsClient.tsx`** — `'use client'` filter + grid component.
  - Props interface (plain, no Payload types):
    ```ts
    interface FilterOption { id: string; label: string }
    interface CaseStudyItem {
      slug: string; projectTitle: string; authorizedClientName?: string
      sectorName?: string; sectorId?: string; challengeExcerpt?: string
      metrics?: Array<{ metric: string; value: string; context?: string }>
    }
    interface ProjectsClientProps {
      caseStudies: CaseStudyItem[]
      industries: FilterOption[]
      services: FilterOption[]
    }
    ```
  - Use `useSearchParams` and `useRouter` from `'next/navigation'` for URL-synced filtering. Read `sector` and `service` query params on mount; push updated params on dropdown change.
  - Sticky filter bar: `sticky top-[72px] z-30 bg-white border-b border-[#E2E8F0] py-4`. Two `<select>` elements (one for sector, one for service). Active filter count badge (gold, only shown when count > 0). Clear button when filters active. Result count text `"{n} project(s) found"`.
  - Filter logic: `useMemo` — filter `caseStudies` by `sectorId` and/or matching service (note: service IDs won't be on `CaseStudyItem` for the grid — filter by `sectorId` only unless `serviceId` is passed through; see step 3 for how `relatedServiceIds` is added to `CaseStudyItem`).
    - **Correction**: add `relatedServiceIds?: string[]` to `CaseStudyItem` so the client can filter by service.
  - Card grid: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`. Renders `<CaseStudyCard>` per filtered item.
  - Empty state: centered message + clear filters button.
  - Wrap `useSearchParams` in `<Suspense>` by hoisting: the parent RSC wraps `<ProjectsClient>` in `<Suspense>`.
  - Files: `src/app/projects/ProjectsClient.tsx`
  - Verify: `npm run build` — no TypeScript errors; component compiles cleanly.

- [ ] 3. **Create `src/app/projects/page.tsx`** — async RSC that fetches data and renders the page.
  - Export `metadata` with `title: 'Projects & Portfolio | Pulse Consultant Ltd'` and appropriate `description`.
  - Define `extractPlainText(val: unknown): string` — same logic as the old CaseStudyCard: walk Payload Lexical JSON (`root.children[].children[].text`) and join; return `''` for non-objects. Truncate to 150 chars for excerpt.
  - Define `normalizeCaseStudy(doc: Record<string, unknown>): NormalizedCaseStudy` helper — casts Payload doc fields to plain types, extracts `sectorName`/`sectorId` from the populated `sector` relationship object, extracts `challengeExcerpt`, maps `metrics`, maps `relatedService` array to `relatedServiceIds: string[]`.
  - In a `try/catch`, call `getPayloadClient()` and three `payload.find()` calls:
    1. `case-studies` where `isApprovedForPublic = true` AND `status = published`, `depth: 2`, `limit: 100`.
    2. `industries` where `status = published`, `limit: 50`.
    3. `services` where `status = published`, `limit: 50`.
    - On catch, all three default to `[]`.
  - Map docs through `normalizeCaseStudy`; map industries to `{ id: string; label: string }`; map services to `{ id: string; label: string }`.
  - Render:
    1. Navy hero section (`bg-navy text-white py-20 section-container`): breadcrumb `Home / Projects`, `font-playfair` h1 "Projects & Portfolio", subtitle.
    2. `<Suspense fallback={<div className="py-20 text-center">Loading…</div>}>` wrapping `<ProjectsClient caseStudies={...} industries={...} services={...} />`.
  - Files: `src/app/projects/page.tsx`
  - Verify: `npm run build` — page compiles; no serialization errors.

- [ ] 4. **Create `src/app/projects/[slug]/page.tsx`** — async RSC detail page.
  - Interface: `interface Props { params: Promise<{ slug: string }> }`.
  - Export `generateStaticParams()`: fetches all `isApprovedForPublic: true` case studies, returns `docs.map(c => ({ slug: c.slug as string }))`. Wrapped in `try/catch` returning `[]`.
  - Export `metadata` as a dynamic `generateMetadata({ params })` function: awaits params, fetches the case study, returns title/description from `seo.metaTitle`/`seo.metaDescription` with fallbacks to `projectTitle`.
  - Define `renderField(val: unknown): string`: if `typeof val === 'string'` return val; else return `'[Content available in CMS]'`.
  - In the page component, `const { slug } = await params`. Fetch single case study: `payload.find({ collection: 'case-studies', where: { slug: { equals: slug }, isApprovedForPublic: { equals: true } }, depth: 2, limit: 1 })`. If no doc, `notFound()`. Wrap in `try/catch` — on catch also `notFound()`.
  - Build sections:
    1. **Hero** (`bg-navy text-white py-20`): breadcrumb, sector badge (teal), `font-playfair` h1 `projectTitle`, client name subtitle.
    2. **Business Challenge + Assignment Scope** (`bg-offwhite py-16`): 2-col grid. Left: "Business Challenge" heading + `renderField(engagement.businessChallenge)`. Right: "Assignment Scope" heading + `renderField(engagement.assignmentScope)`.
    3. **Consulting Approach** (`bg-white py-16`): full-width with gold left border (`border-l-4 border-gold pl-6`): "Consulting Approach" heading + `renderField(engagement.consultingApproach)`.
    4. **Deliverables** (`bg-navy text-white py-16`): "What We Delivered" heading + `ul` list of `engagement.deliverables[].deliverable`.
    5. **Verified Results** (`bg-offwhite py-16`): metrics cards grid (1/2/3 cols) with gold top-border, `font-playfair` large value, metric label; below metrics render `renderField(results.summary)`.
    6. **Testimonial** (conditional, `bg-white py-16`): only render if `results.clientTestimonial` exists. Blockquote with gold quote mark, testimonial text, `—` author name.
    7. **Related Services** (`bg-teal text-white py-16`): "Related Services" heading + card grid of linked service cards.
    8. **CTA** (`bg-navy text-white py-16`): "Ready to Start Your Project?" heading + `<Button variant="primary" href="/#contact">Schedule a Consultation</Button>`.
  - All Payload calls in `try/catch`.
  - Files: `src/app/projects/[slug]/page.tsx`
  - Verify: `npm run build` — no TypeScript errors; `generateStaticParams` runs without crash.

- [ ] 5. **Create `src/app/about/page.tsx`** — fully static RSC, no Payload.
  - Export `metadata` with `title: 'About Us | Pulse Consultant Ltd'` and SEO description.
  - No data fetching; all content hardcoded. No `'use client'`.
  - Build 7 sections in order:

    **Section 1 — Hero** (`bg-navy text-white`):
    - `section-container py-20`
    - Breadcrumb: `Home / About`
    - `font-playfair text-4xl md:text-5xl` h1: "About Pulse Consultant Ltd"
    - Tagline paragraph: "Strategic Insights. Financial Solutions. Sustainable Growth."

    **Section 2 — Our Story** (`bg-offwhite`):
    - `section-container py-20`
    - 2-col grid (stack on mobile): left col text paragraph about the firm's founding and mission; right col 2×2 grid of stat cards (white bg, gold top-border, `font-playfair` value, label below): `10+ Years`, `50+ Clients`, `9 Services`, `5 Industries`.

    **Section 3 — Vision & Mission** (`bg-white`):
    - `section-container py-20`
    - 2-col grid with a vertical gold divider (1px gold border between cols).
    - Left — **Vision**: heading "Our Vision" (gold, uppercase, small tracking), then `font-playfair text-2xl` text: "To be the most trusted financial advisory and strategic consulting firm in Africa and emerging markets."
    - Right — **Mission**: heading "Our Mission" (same style), then text: "To deliver evidence-based, results-driven consulting that creates measurable, sustainable value for every client we serve."

    **Section 4 — 8 Core Values** (`bg-offwhite`):
    - `section-container py-20`
    - `font-playfair` section heading: "Our Core Values"
    - 2×4 grid (4 cols on `md`, 2 cols on `sm`), each card: white bg, gold top-border (`border-t-2 border-gold`), rounded, `p-6`:
      1. Integrity — "We uphold the highest standards of honesty and transparency."
      2. Excellence — "We pursue exceptional quality in every engagement."
      3. Partnership — "We build long-term collaborative relationships with our clients."
      4. Evidence-Based — "Every recommendation is grounded in rigorous data and research."
      5. Confidentiality — "Client information is handled with absolute discretion."
      6. Sustainability — "We embed long-term thinking into every strategy we craft."
      7. Agility — "We adapt quickly to changing market conditions and client needs."
      8. Impact — "We measure success by the tangible outcomes we create for clients."

    **Section 5 — Our Methodology** (`bg-navy text-white`):
    - `section-container py-20`
    - `font-playfair` section heading: "Our Methodology"
    - 4-step horizontal layout (stack to vertical on mobile): steps connected by gold dashed line (`border-t-2 border-gold border-dashed` on desktop).
    - Each step: teal circle number (`w-12 h-12 rounded-full bg-teal flex items-center justify-center font-playfair text-white text-xl`), step title below (`font-semibold`), description below.
      1. Discovery — "Deep-dive assessment of your business context, challenges, and objectives."
      2. Analysis — "Rigorous data analysis, benchmarking, and stakeholder interviews."
      3. Strategy — "Tailored recommendations with clear prioritization and roadmap."
      4. Execution — "Hands-on implementation support and performance tracking."

    **Section 6 — Competitive Advantages** (`bg-offwhite`):
    - `section-container py-20`
    - `font-playfair` section heading: "Why Choose Pulse Consultant"
    - 3-col grid (stack to 1-col on mobile): 6 cards with gold left border (`border-l-4 border-gold`), white bg, `p-6`:
      1. Deep Industry Expertise — "Sector-specific knowledge across 5 priority industries."
      2. Evidence-Based Approach — "Data-driven insights, not gut-feel recommendations."
      3. Confidentiality First — "Rigorous data protection and NDA-backed engagements."
      4. End-to-End Solutions — "From diagnosis through implementation and monitoring."
      5. Local Market Mastery — "Deep knowledge of African and emerging market dynamics."
      6. Sustainable Growth Focus — "Strategies designed for long-term value creation."

    **Section 7 — CTA** (`bg-teal text-white`):
    - `section-container py-16`
    - Centered: `font-playfair text-3xl` heading "Partner with Pulse Consultant", subtitle, `<Button variant="secondary" href="/#contact">Start a Conversation</Button>`.

  - Files: `src/app/about/page.tsx`
  - Verify: `npm run build` — page compiles; no TypeScript errors; static export produces HTML.

---

## TypeScript Pitfalls to Avoid

1. **Payload `find()` returns `PaginatedDocs<T>` where `T` has generated types** — never pass `docs[0]` directly to client components. Always map through `normalizeCaseStudy` or cast to `Record<string, unknown>` first.
2. **Relationship fields at `depth: 2`** — `sector` will be a populated object `{ id: string; name: string; slug: string }`, not a string. Guard with `typeof doc.sector === 'object'`.
3. **`useSearchParams` requires `<Suspense>`** — the RSC (`projects/page.tsx`) must wrap `<ProjectsClient>` in `<Suspense>` or Next.js will throw at build time.
4. **`params` must be awaited** — `const { slug } = await params` (not destructured directly from props).
5. **`relatedService` is `hasMany: true`** — it returns an array; each item at depth:2 is `{ id: string; title: string; slug: string }`. Map defensively with `Array.isArray()` check.
6. **richText fields** — `businessChallenge`, `assignmentScope`, `consultingApproach`, `results.summary` are all Payload Lexical richText (objects, not strings). Use `renderField()` on the detail page; use `extractPlainText()` to build the card excerpt.
7. **`deliverables` is an array of `{ deliverable: string }`**, not `string[]`. Map to `.deliverable` when rendering.
8. **CaseStudyCard has NO `'use client'`** — it only uses `Link`, which is SSR-compatible. Adding `'use client'` unnecessarily forces client bundle inclusion.
9. **`normalizeCaseStudy` lives in the RSC file, not in a shared utility** — it handles Payload types and must never be imported by client components.
10. **`results.metrics` can be `null | undefined`** — always use `?.` and `?? []` before `.slice(0, 3)`.

---

## Build & Verification Commands

```bash
npm run build      # TypeScript compile + Next.js build — primary verification
npm run dev        # Local dev server for visual inspection
npm run lint       # ESLint check
```
