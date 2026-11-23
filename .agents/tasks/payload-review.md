# Payload CMS 3.x Integration for Pulse Consultant Ltd

The change wires Payload CMS 3.x into the existing Next.js 15 App Router project, adding a PostgreSQL-backed content layer with seven collections covering the full site content model, an admin panel under the `(payload)` route group, REST API routes, and four dynamic public-facing pages (`/services/[slug]`, `/industries/[slug]`, `/case-studies/[slug]`, `/insights/[slug]`). The build passes cleanly (TypeScript and compilation) with the database offline, degrading all slug pages to on-demand SSR. The package version pinning needed to unblock the build is a maintenance liability but does not affect correctness today.

Watch for: (1) **confirmed** — `case-studies/[slug]/page.tsx` applies an `isApprovedForPublic` query filter that duplicates the collection-level access control; the double gate is harmless but will mislead future developers. (2) **likely** — `getPayloadClient()` caches the Payload instance in a module-level variable, which may misfire in serverless environments where module scope does not persist across invocations. (3) **confirmed** — `PAYLOAD_SECRET` has a hardcoded fallback; a production deployment that omits the env var uses a predictable JWT signing key.

**Verdict**: APPROVED

---

## High-level view

All seven collections are present — Users, Media, Services, Industries, CaseStudies, TeamMembers, Insights — registered in `payload.config.ts`. Cross-collection relationship slugs are consistent: every `relationTo` value matches the declared `slug` of its target collection. All required fields from the original spec are present across all collections.

The `(payload)` route group contains the five required files. Both admin page files correctly type `params` and `searchParams` as `Promise<…>`, matching Next.js 15's async params contract. `next.config.ts` uses `withPayload` and has no `turbopack.rules` block. `tsconfig.json` carries the `@payload-config` path alias.

The CaseStudies access policy is fail-closed: unauthenticated reads receive a `where` constraint `{ isApprovedForPublic: { equals: true } }` and authenticated users get unrestricted access. The `case-studies/[slug]` page duplicates this filter in its own `payload.find()` call, creating a double gate that is redundant with the collection-level policy.

The `PAYLOAD_SECRET` config field falls back to a hardcoded string when the env var is unset, which produces a predictable JWT signing key in any environment that runs without `.env.local`.

<details>
<summary>Issues (4)</summary>

1. **Redundant isApprovedForPublic filter in page query** — `case-studies/[slug]/page.tsx` applies `where: { isApprovedForPublic: { equals: true } }` on top of the collection-level access control. A future developer seeing the page filter may assume the collection has no access control and replicate the pattern on other pages. Remove the page-level filter and rely solely on the collection access policy, or add a comment explaining the intent.

2. **Hardcoded PAYLOAD_SECRET fallback** — `payload.config.ts` falls back to `'fallback-secret-change-me'` when `PAYLOAD_SECRET` is unset. Any deployment that runs without the env var uses a known JWT signing key, making admin session tokens forgeable. Remove the fallback or throw at startup if the secret is missing in non-development environments.

3. **Module-level singleton may misfire in serverless runtimes** — `src/lib/payload.ts` caches the Payload client in a module-level variable. In serverless environments (Vercel, AWS Lambda) module scope does not persist across cold starts, so the cache provides no benefit and the connection setup cost runs on every request. Verify that all routes calling `getPayloadClient()` run under the `nodejs` runtime, or switch to Payload's `getCachedPayload` pattern if available in 3.x.

4. **Insights author not required** — `Insights.author` (relationship to `team-members`) has no `required: true`. Articles and market analyses typically need a named author; press releases and newsletters may not. Consider a conditional validation on `type`, or document the convention so editors know when to leave it blank.

</details>

<details>
<summary>Details</summary>

### Collection field completeness

Services carries all nine category options (`financial-advisory` through `esg-sustainability`), plus `areasOfExpertise`, `methodology`, `keyBenefits`, SEO group, `status`, `featuredOnHomepage`, and `sortOrder`.

Industries has `challenges` (array), `ourApproach` (richText), `stats` (array with `label`/`value`), SEO group, `status`, and `sortOrder`.

CaseStudies has the `engagement` group containing `businessChallenge`, `assignmentScope`, `consultingApproach`, and `deliverables` (array), and the `results` group with `summary`, `metrics` (array), `clientTestimonial`, and `testimonialAuthor`. `isApprovedForPublic` is a sidebar checkbox with a consent warning in its admin description.

TeamMembers has `qualifications` (array: degree/institution/year), `certifications` (array: name/issuingBody/year/expiryYear), `specializations` (array), and `yearsExperience` (number, required, min: 0).

Insights has the `type` select with six options (article, market-analysis, publication, white-paper, press-release, newsletter), `author` relationship to `team-members`, and `tags` (array). The `author` field is not required — see Issues item 4.

### CaseStudies access control

The access function uses `({ req: { user } }) => user ? true : { isApprovedForPublic: { equals: true } }`. Payload 3.x evaluates a returned `where` clause as an additional query filter, so unauthenticated reads are always scoped to approved documents — fail-closed. A document with `isApprovedForPublic: false` is invisible to public REST API calls and to `generateStaticParams`.

The `case-studies/[slug]` page passes the same filter in its own `payload.find()` call. With the collection-level access policy in place, that page-level filter is dead weight: if the access policy is ever loosened, the page filter creates the illusion that the collection is still gated when it isn't. The `generateStaticParams` in the same file also applies the `isApprovedForPublic` filter, which is load-bearing because `generateStaticParams` runs with no request context — Payload may treat it as unauthenticated and the access policy applies, but the explicit filter is a safe belt-and-suspenders here.

### PAYLOAD_SECRET fallback

```ts
secret: process.env.PAYLOAD_SECRET || 'fallback-secret-change-me',
```

Any deployment without `PAYLOAD_SECRET` set signs JWTs with `'fallback-secret-change-me'`. An attacker who knows or guesses this string can forge admin tokens. The correct fix is to throw at startup when the env var is missing in non-development environments, or at minimum to remove the fallback string so the config fails loudly rather than silently insecurely.

### Route group structure and async params

The admin `page.tsx` and `not-found.tsx` both declare `params` and `searchParams` as `Promise<…>` types and pass them directly to `RootPage` and `NotFoundPage` without awaiting — Payload's view components handle the resolution internally, which is the correct pattern. The REST API route exports all six handlers from `@payloadcms/next/routes`. The `layout.tsx` passthrough correctly prevents the site's root Header/Footer from rendering inside the admin panel.

All four public dynamic pages use `params: Promise<{ slug: string }>` and `await params` before querying. All four `generateStaticParams` functions wrap the Payload call in `try/catch` returning `[]`, so a build against an offline database produces 0 pre-rendered paths without failing — pages render on-demand once the database is live.

</details>

---

<details>
<summary>File map</summary>

| File | What changed |
|---|---|
| `src/payload.config.ts` | New — Payload root config with postgresAdapter, all 7 collections |
| `src/collections/Users.ts` | New — auth collection with name and role fields |
| `src/collections/Media.ts` | New — upload collection with alt and caption |
| `src/collections/Services.ts` | New — 9-category service collection with expertise, methodology, SEO |
| `src/collections/Industries.ts` | New — industry collection with challenges, stats, SEO |
| `src/collections/CaseStudies.ts` | New — case study collection with engagement/results groups and access control |
| `src/collections/TeamMembers.ts` | New — team member collection with qualifications, certifications, specializations |
| `src/collections/Insights.ts` | New — insights collection with 6-option type select and author relationship |
| `next.config.ts` | Modified — added withPayload wrapper, removed turbopack block and experimental flags |
| `tsconfig.json` | Modified — added @payload-config path alias |
| `src/app/(payload)/layout.tsx` | New — passthrough layout isolating admin from site chrome |
| `src/app/(payload)/importMap.ts` | New — empty import map for Payload tree-shaking |
| `src/app/(payload)/admin/[[...segments]]/page.tsx` | New — admin panel root with async params |
| `src/app/(payload)/admin/[[...segments]]/not-found.tsx` | New — admin 404 page with async params |
| `src/app/(payload)/api/[...slug]/route.ts` | New — REST API route handlers for all 6 HTTP methods |
| `src/lib/payload.ts` | New — singleton getPayloadClient helper |
| `src/app/services/[slug]/page.tsx` | New — service detail page with SSG fallback |
| `src/app/industries/[slug]/page.tsx` | New — industry detail page with SSG fallback |
| `src/app/case-studies/[slug]/page.tsx` | New — case study detail page with approval filter |
| `src/app/insights/[slug]/page.tsx` | New — insight detail page with status filter |

Full diff: `git diff main -- src/collections src/app/\(payload\) src/lib src/app/services src/app/industries src/app/case-studies src/app/insights src/payload.config.ts next.config.ts tsconfig.json`

</details>
