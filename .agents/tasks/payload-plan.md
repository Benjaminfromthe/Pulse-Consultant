# Implementation Plan — Payload CMS 3.x Integration

## Findings from codebase exploration

- **Next.js 16.4.6** — within Payload's supported range (16.4.5+).
- **globals.css** uses the v3 `@tailwind base/components/utilities` directives, not the Tailwind 4 `@import "tailwindcss"` syntax stated in the brief. The file must be fixed in step 2 to avoid a broken dev build after Payload is installed (Payload's withPayload disables the turbopack CSS loader, so Tailwind 4 must work via `@import`).
- **next.config.ts** has `turbopack.rules` for `@tailwindcss/turbopack` that must be removed — `withPayload` wraps the config and that block conflicts with Payload's webpack overrides.
- **tsconfig.json** already has `"@/*": ["./src/*"]`; it needs `"@payload-config": ["./src/payload.config.ts"]` added.
- **No existing database packages** — `@payloadcms/db-postgres`, `pg`, and `@types/pg` must all be installed fresh.
- **package.json** has no `"type": "module"` and `next.config.ts` is TypeScript. `withPayload` from `@payloadcms/next` supports a `.ts` config directly in Next.js 15+/16, so no `.mjs` rename or `"type": "module"` change is needed.
- Existing routes: only `src/app/layout.tsx` and `src/app/page.tsx`. No conflict with `(payload)` route group.

---

## Implementation Plan

- [ ] 1. Install Payload and all required packages.
      Run `npm install payload @payloadcms/next @payloadcms/richtext-lexical @payloadcms/db-postgres sharp pg` and `npm install --save-dev @types/pg`. Do NOT include `@payloadcms/payload-cloud`. These are the only package changes needed.
      Files: `package.json`, `package-lock.json` (auto-updated)
      Verify: `npm ls payload @payloadcms/next @payloadcms/richtext-lexical @payloadcms/db-postgres sharp pg` — all five appear with no peer-dep errors.

- [ ] 2. Fix globals.css Tailwind 4 syntax and update next.config.ts.
      Two changes in one step because they are both needed before `npm run build` can pass:
      (a) Replace the three `@tailwind` directives at the top of `src/app/globals.css` with a single `@import "tailwindcss";` line. Leave all custom CSS below unchanged.
      (b) Rewrite `next.config.ts`: import `withPayload` from `@payloadcms/next/withPayload`, remove the entire `turbopack` block, keep `cacheComponents: true` and `partialPrefetching: true`, and wrap the export with `withPayload(nextConfig)`.
      The resulting `next.config.ts` must look like:
      ```ts
      import type { NextConfig } from "next";
      import { withPayload } from "@payloadcms/next/withPayload";

      const nextConfig: NextConfig = {
        cacheComponents: true,
        partialPrefetching: true,
      };

      export default withPayload(nextConfig);
      ```
      Files: `src/app/globals.css`, `next.config.ts`
      Verify: `npm run build` does not throw a Tailwind CSS parse error or a turbopack conflict error. (Full build will fail until the DB is reachable, but the CSS/config error must be gone.)

- [ ] 3. Create environment variable files.
      Create `.env.example` listing the required variables with placeholder values. Create `.env.local` with the same keys but real (or local-dev) values. `PAYLOAD_SECRET` must be a long random string (generate 32+ chars). `DATABASE_URL` must be a valid `postgres://` connection string pointing to a local or hosted PostgreSQL instance.
      `.env.example`:
      ```
      DATABASE_URL=postgres://user:password@localhost:5432/pulse_consultant
      PAYLOAD_SECRET=replace-with-a-long-random-secret
      NEXT_PUBLIC_SERVER_URL=http://localhost:3000
      ```
      `.env.local`:
      ```
      DATABASE_URL=postgres://postgres:postgres@localhost:5432/pulse_consultant
      PAYLOAD_SECRET=<32-char-random-string>
      NEXT_PUBLIC_SERVER_URL=http://localhost:3000
      ```
      Ensure `.env.local` is in `.gitignore` (Next.js adds it by default). Add `.env.local` to `.gitignore` manually if it is not present.
      Files: `.env.example`, `.env.local`, `.gitignore` (verify/add entry)
      Verify: `cat .env.example` shows all three keys; `.env.local` exists and is git-ignored (`git status` does not list it as a tracked file).

- [ ] 4. Add `@payload-config` path alias to tsconfig.json.
      In `tsconfig.json`, add `"@payload-config": ["./src/payload.config.ts"]` inside `compilerOptions.paths` alongside the existing `"@/*"` entry. This is required by Payload's internal imports.
      Files: `tsconfig.json`
      Verify: `npx tsc --noEmit` after the config files in steps 5–6 exist — no "Cannot find module '@payload-config'" error.

- [ ] 5. Create the seven collection files in `src/collections/`.
      Create `src/collections/` directory and add one file per collection. Each collection exports a `CollectionConfig` object. Field types: `text`, `textarea`, `richText` (using `lexicalEditor()`), `upload` (relation to `media`), `relationship`, `select`, `checkbox`, `date`, `array`, `number`.

      **`src/collections/Users.ts`** — Payload's required auth collection. Fields: `name` (text). `auth: true`. Admin `useAsTitle: 'email'`.

      **`src/collections/Media.ts`** — Upload collection. `upload: { staticDir: 'public/media' }`. Fields: `alt` (text, required). Admin `useAsTitle: 'alt'`.

      **`src/collections/Services.ts`** — Fields: `title` (text, required), `slug` (text, required, unique), `shortDescription` (textarea), `fullDescription` (richText with lexicalEditor), `areasOfExpertise` (array of `{area: text}`), `methodology` (richText), `order` (number), `isActive` (checkbox, defaultValue: true). Admin `useAsTitle: 'title'`. 9 entries expected.

      **`src/collections/Industries.ts`** — Fields: `title` (text, required), `slug` (text, required, unique), `description` (richText), `keyStats` (array of `{label: text, value: text}`), `featuredImage` (upload relation to `media`), `isActive` (checkbox, defaultValue: true). Admin `useAsTitle: 'title'`. 5 entries expected.

      **`src/collections/CaseStudies.ts`** — Fields: `projectTitle` (text, required), `slug` (text, required, unique), `sector` (relationship to Industries, required), `authorizedClientName` (text), `businessChallenge` (richText), `assignmentScope` (richText), `consultingApproach` (richText), `deliverables` (array of `{deliverable: text}`), `verifiedResults` (richText), `featuredImage` (upload relation to `media`), `isApprovedForPublic` (checkbox, defaultValue: false, required). Admin `useAsTitle: 'projectTitle'`. Access: restrict `read` on `isApprovedForPublic: false` to authenticated users only (use an `access.read` function checking `req.user`).

      **`src/collections/TeamMembers.ts`** — Fields: `name` (text, required), `slug` (text, required, unique), `title` (text — job title), `bio` (richText), `qualifications` (array of `{qualification: text}`), `certifications` (array of `{certification: text}`), `specializations` (array of `{specialization: text}`), `yearsOfExperience` (number, min: 3), `photo` (upload relation to `media`), `linkedIn` (text), `order` (number), `isActive` (checkbox, defaultValue: true). Admin `useAsTitle: 'name'`.

      **`src/collections/Insights.ts`** — Fields: `title` (text, required), `slug` (text, required, unique), `type` (select: `article | publication | market-analysis`), `excerpt` (textarea), `content` (richText with lexicalEditor), `author` (relationship to TeamMembers), `publishedAt` (date), `featuredImage` (upload relation to `media`), `tags` (array of `{tag: text}`), `isPublished` (checkbox, defaultValue: false). Admin `useAsTitle: 'title'`.

      Files: `src/collections/Users.ts`, `src/collections/Media.ts`, `src/collections/Services.ts`, `src/collections/Industries.ts`, `src/collections/CaseStudies.ts`, `src/collections/TeamMembers.ts`, `src/collections/Insights.ts`
      Verify: `npx tsc --noEmit` — all seven files compile without type errors (requires step 6's `payload.config.ts` for `@payload-config` to resolve).

- [ ] 6. Create `src/payload.config.ts`.
      This is the central Payload configuration. Import `buildConfig` from `payload`, `postgresAdapter` from `@payloadcms/db-postgres`, `lexicalEditor` from `@payloadcms/richtext-lexical`, `sharp` from `sharp`, and all seven collections. Configure:
      - `editor: lexicalEditor({})`
      - `collections`: all seven collections in order: `[Users, Media, Services, Industries, CaseStudies, TeamMembers, Insights]`
      - `secret: process.env.PAYLOAD_SECRET || ''`
      - `db: postgresAdapter({ pool: { connectionString: process.env.DATABASE_URL || '' } })`
      - `sharp`
      - `admin: { user: Users.slug }` — points admin auth to the Users collection
      - `serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'`
      - `upload: { limits: { fileSize: 5000000 } }` — 5MB upload limit

      File: `src/payload.config.ts`
      Verify: `npx tsc --noEmit` — file resolves without errors.

- [ ] 7. Create Payload route group files under `src/app/(payload)/`.
      These files are fixed infrastructure that Payload requires. Copy them verbatim from the Payload blank template pattern. Do not modify them after creation.

      **`src/app/(payload)/layout.tsx`**:
      ```tsx
      import React from 'react'
      export default function PayloadLayout({ children }: { children: React.ReactNode }) {
        return children
      }
      ```
      This overrides the root layout (which renders Header/Footer) so the admin panel gets a clean shell.

      **`src/app/(payload)/admin/[[...segments]]/page.tsx`**:
      ```tsx
      import type { Metadata } from 'next'
      import { RootPage, generatePageMetadata } from '@payloadcms/next/views'
      import config from '@payload-config'

      export const generateMetadata = ({ params }: { params: Promise<{ segments: string[] }> }): Promise<Metadata> =>
        generatePageMetadata({ config, params })

      export default function Page({ params }: { params: Promise<{ segments: string[] }> }) {
        return RootPage({ config, params })
      }
      ```

      **`src/app/(payload)/admin/[[...segments]]/not-found.tsx`**:
      ```tsx
      import { NotFoundPage } from '@payloadcms/next/views'
      import config from '@payload-config'

      export default function NotFound() {
        return NotFoundPage({ config })
      }
      ```

      **`src/app/(payload)/api/[...slug]/route.ts`**:
      ```ts
      import { REST_DELETE, REST_GET, REST_OPTIONS, REST_PATCH, REST_POST, REST_PUT } from '@payloadcms/next/routes'
      import config from '@payload-config'

      export const GET    = (req: Request) => REST_GET(req, config)
      export const POST   = (req: Request) => REST_POST(req, config)
      export const DELETE = (req: Request) => REST_DELETE(req, config)
      export const PATCH  = (req: Request) => REST_PATCH(req, config)
      export const PUT    = (req: Request) => REST_PUT(req, config)
      export const OPTIONS = (req: Request) => REST_OPTIONS(req, config)
      ```

      **`src/app/(payload)/importMap.ts`** (required for Payload's custom components tree-shaking):
      ```ts
      export const importMap = {}
      ```

      Files: `src/app/(payload)/layout.tsx`, `src/app/(payload)/admin/[[...segments]]/page.tsx`, `src/app/(payload)/admin/[[...segments]]/not-found.tsx`, `src/app/(payload)/api/[...slug]/route.ts`, `src/app/(payload)/importMap.ts`
      Verify: `npx tsc --noEmit` — no errors in these files. Existing `src/app/layout.tsx` and `src/app/page.tsx` are untouched.

- [ ] 8. Create the server-side Payload client helper at `src/lib/payload.ts`.
      This helper initialises a singleton Payload instance for use in Server Components and Route Handlers. Use Payload's `getPayload` function pattern:
      ```ts
      import { getPayload } from 'payload'
      import config from '@payload-config'

      export const getPayloadClient = async () => {
        return getPayload({ config })
      }
      ```
      This avoids creating multiple DB connections in development with hot-reload.
      File: `src/lib/payload.ts`
      Verify: `npx tsc --noEmit` — no errors.

- [ ] 9. Create dynamic route pages for Services, Industries, Case Studies, and Insights.
      All four pages follow the Next.js 15+ async params pattern: `params: Promise<{ slug: string }>`. Each page uses `getPayloadClient()` to fetch the matching document, calls `notFound()` from `next/navigation` if no document is returned, and renders a minimal server component. Do NOT import or modify any existing section components.

      **`src/app/services/[slug]/page.tsx`**:
      - Fetch: `payload.find({ collection: 'services', where: { slug: { equals: slug }, isActive: { equals: true } }, limit: 1 })`
      - Render: `<main>` with `title`, `shortDescription`, `areasOfExpertise` list, and `methodology` rich text (render as raw JSON for now — a RichText renderer is a future enhancement).
      - Export `generateStaticParams`: query all services with `isActive: true`, return `{ slug }` array.
      - Export `generateMetadata`: return `{ title: service.title }`.

      **`src/app/industries/[slug]/page.tsx`**:
      - Fetch: `payload.find({ collection: 'industries', where: { slug: { equals: slug }, isActive: { equals: true } }, limit: 1 })`
      - Render: `<main>` with `title`, `description`, and `keyStats`.
      - Export `generateStaticParams` and `generateMetadata`.

      **`src/app/case-studies/[slug]/page.tsx`**:
      - Fetch: `payload.find({ collection: 'case-studies', where: { slug: { equals: slug }, isApprovedForPublic: { equals: true } }, limit: 1 })`
      - Render: `<main>` with `projectTitle`, `sector`, `businessChallenge`, `deliverables`, and `verifiedResults`.
      - Export `generateStaticParams` (only `isApprovedForPublic: true` entries) and `generateMetadata`.

      **`src/app/insights/[slug]/page.tsx`**:
      - Fetch: `payload.find({ collection: 'insights', where: { slug: { equals: slug }, isPublished: { equals: true } }, limit: 1 })`
      - Render: `<main>` with `title`, `type`, `excerpt`, `publishedAt`, and `content`.
      - Export `generateStaticParams` (only `isPublished: true`) and `generateMetadata`.

      Files: `src/app/services/[slug]/page.tsx`, `src/app/industries/[slug]/page.tsx`, `src/app/case-studies/[slug]/page.tsx`, `src/app/insights/[slug]/page.tsx`
      Verify: `npx tsc --noEmit` — all four files compile. The slug param is typed as `Promise<{ slug: string }>` and awaited inside the component.

- [ ] 10. Run the full build and confirm zero TypeScript errors and a successful Next.js compilation.
      With a running PostgreSQL database reachable at `DATABASE_URL`, Payload will migrate the schema on first start. If a database is not available during CI/plan verification, `npx tsc --noEmit` is the minimum gate; `npm run build` is the full gate.
      Verify:
      1. `npx tsc --noEmit` — zero errors across all new and existing files.
      2. `npm run build` — build completes. Payload logs "Connected to Postgres" and migrates. Next.js generates static routes for `/services/[slug]`, `/industries/[slug]`, `/case-studies/[slug]`, `/insights/[slug]`.
      3. `npm run dev` — navigate to `http://localhost:3000/admin` and confirm the Payload admin panel loads with the user-creation prompt. Navigate to `http://localhost:3000` and confirm the existing homepage still renders with Header, Footer, and WhatsApp button intact.

---

## Dependency order

Steps must be executed in order: 1 → 2 → 3 → 4 → 5 → 6 → 7 → 8 → 9 → 10.

- Step 1 (install) must precede all others — imports won't resolve without the packages.
- Step 2 (CSS + next.config) must precede step 10's build check.
- Steps 3 and 4 (env + tsconfig) must precede step 6 (`payload.config.ts` reads env vars; tsconfig alias is needed for `@payload-config` imports).
- Step 5 (collections) must precede step 6 (`payload.config.ts` imports all collections).
- Step 6 (`payload.config.ts`) must precede steps 7 and 8 (both import `@payload-config`).
- Step 7 (route group) and step 8 (lib helper) can be done in either order — no cross-dependency.
- Step 9 (dynamic pages) depends on step 8 (imports `getPayloadClient`).
- Step 10 (build) depends on all previous steps.

## Notes and assumptions

- **PostgreSQL**: The plan assumes a local or hosted PostgreSQL 14+ instance. Payload's postgres adapter uses Drizzle under the hood and will auto-migrate on first run with `push: true` in development (default). No manual migration command is needed for initial setup.
- **`@payloadcms/payload-cloud`**: Explicitly omitted per the task constraints. Do not add it at any point.
- **`@tailwindcss/turbopack`** in `devDependencies`: the package remains in `package.json` but is no longer referenced in `next.config.ts` after step 2. It is harmless as an installed-but-unused devDependency; removing it from `package.json` is optional cleanup outside this plan's scope.
- **Rich text rendering**: The dynamic pages render raw Lexical JSON for now. A `RichText` renderer component (using `@payloadcms/richtext-lexical`'s `RichText` export) is a logical next step but is outside this plan's scope and must not be added during implementation unless explicitly requested.
- **`src/app/page.tsx`**: Not modified. The existing homepage continues to use static section components.
- **`next.config.ts` file extension**: Payload's docs show `.js` or `.mjs`, but Next.js 15/16 supports `next.config.ts` natively. `withPayload` from `@payloadcms/next/withPayload` is compatible with the TypeScript config file — no rename needed.
