# Supabase Setup (Path A — Payload CMS + Supabase Postgres & Storage)

This project keeps **Payload CMS** as the content layer (admin UI at `/admin`, built-in auth, access control) and uses **Supabase** for two things only:

1. **PostgreSQL** — the database Payload writes to (pooler `6543` for runtime, direct `5432` for migrations/seed).
2. **Storage (S3-compatible)** — where uploaded media (team photos, case-study visuals, insight covers) and the Company Profile PDF are served from.

No Supabase Auth, no Supabase RLS, no `@supabase/supabase-js` client. Payload owns data and auth.

---

## 1. Create the Supabase project + buckets

1. Create a project at [supabase.com](https://supabase.com). Note the **project-ref** and **region**.
2. **Storage → New bucket:**
   - `media` — set **Public** (this holds all Payload Media uploads, organized by a `category` field).
   - `company-profile` — set **Public** (holds the downloadable Company Profile PDF).
3. **Settings → Storage → S3 Connection → Generate new S3 credentials.** Copy the **Access Key ID** and **Secret Access Key** (these are different from your DB password).
4. **Project Settings → Database → Connection string** — copy both:
   - **Transaction pooler** (port `6543`) → use for `DATABASE_URL`.
   - **Session/Direct** (port `5432`) → use for `DIRECT_URL`.

Append `?sslmode=require` to both connection strings (Supabase requires SSL).

---

## 2. Fill `.env.local` (gitignored — never commit this)

Copy from `.env.example` and replace the placeholders:

```env
PAYLOAD_SECRET=<generate a 32+ char random string>

# Supabase Postgres
DATABASE_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?sslmode=require
DIRECT_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres?sslmode=require

# Supabase project URL
NEXT_PUBLIC_SUPABASE_URL=https://[ref].supabase.co

# Supabase Storage (S3)
S3_ENDPOINT=https://[ref].supabase.co/storage/v1/s3
S3_REGION=ap-southeast-1
S3_ACCESS_KEY_ID=<your-s3-access-key>
S3_SECRET_ACCESS_KEY=<your-s3-secret-key>
S3_BUCKET=media
S3_FORCE_PATH_STYLE=true

# (Optional, only for schema bootstrap on Node 24 — see below)
# PAYLOAD_DB_PUSH=true
```

Keep the existing Resend / Turnstile / Cal.com / WhatsApp values. Turnstile ships with Cloudflare's always-pass test keys so it works without setup.

---

## 3. Create the database schema + seed — choose your Node path

> **Important Node version note.** Payload `3.94.1` declares a peer requirement of Node `>=26.13.1`. On **Node 24.x**, the standalone Payload CLI (`npx payload migrate`, `npx payload generate:types`) and `npx tsx` scripts fail with `TypeError: Illegal constructor` from `undici`'s `CacheStorage` (a tsx symbol-deduplication bug). The **app itself** builds and runs fine on Node 24 — only those CLI/tsx commands are affected, because they load the config via tsx rather than Next's Turbopack runtime.

### Path A (recommended) — Node 20 LTS or Node 26+

Install a compatible Node, then the Payload CLI works normally:

```powershell
# Install Node 20 LTS (one-time):
winget install OpenJS.NodeJS.LTS
# (reopen your terminal after install, or use the Node 20 binary directly)
node -v   # should print v20.x or v26.x
```

Then generate + apply the migration and seed:

```powershell
# 1. Generate the initial Drizzle migration (offline; no DB needed)
npx payload migrate:create init
#    -> creates src/migrations/<timestamp>_init.ts  (commit this file)

# 2. Apply the migration to Supabase (uses the DIRECT connection — port 5432)
$env:DATABASE_URL = $env:DIRECT_URL   # point the adapter at the direct DSN for DDL
# (or just temporarily set DATABASE_URL in .env.local to the port-5432 string)
npx payload migrate
#    -> creates all tables: users, media, services, industries, case_studies,
#       team_members, insights, inquiries  (with is_approved_for_public on case_studies)

# 3. Generate Payload TypeScript types (optional — nothing in the app imports them yet)
npx payload generate:types

# 4. Seed realistic sample data (idempotent — safe to re-run)
$env:DATABASE_URL = "<port 6543 pooler string>?sslmode=require"   # back to pooler for runtime inserts
npm run seed
```

### Path B (fallback) — stay on Node 24, bootstrap via the app runtime

If you cannot install another Node version, use Payload's schema-sync (`push`) which runs through the Next runtime (not the broken CLI):

```powershell
# 1. In .env.local, set PAYLOAD_DB_PUSH=true and DATABASE_URL to the Supabase POOLER (6543).
# 2. Start the dev server — Payload auto-creates all tables on first connect:
npm run dev
#    -> wait for "Ready", then open http://localhost:3000/admin
#    -> Payload prompts you to create the first admin user (do this now)
# 3. Stop the server (Ctrl+C), then UNSET PAYLOAD_DB_PUSH (remove the line / set to blank)
#    so push is off for normal operation and production.
```

**Seeding on Node 24:** `npm run seed` (which runs `tsx src/scripts/seed.ts`) is also blocked by the same tsx/undici bug. To seed on Node 24, either:
- temporarily run the seed through the app runtime, or
- switch to Node 20 LTS (Path A) and run `npm run seed`.

> The cleanest, least-surprising long-term setup is **Path A (Node 20 LTS)**: migrations become committed artefacts, types generate, and `npm run seed` works. Use Path B only to unblock quickly on Node 24.

---

## 4. Verify locally

```powershell
# Build passes without a database (all Payload calls are wrapped in try/catch):
npm run build

# Start the app:
npm run dev
# -> http://localhost:3000          (public site renders; dynamic pages show seeded content)
# -> http://localhost:3000/admin    (log in with the admin user you created)
```

**Verify reads (admin):** In `/admin`, confirm the seeded collections show records — Services (9), Industries (5), Case Studies (3), Team Members (6), Insights (3). Only case studies with `isApprovedForPublic = true` appear on the public `/projects` page.

**Verify writes:** Submit the form at `http://localhost:3000/contact`. A new **Inquiries** record should appear in `/admin → Submissions → Inquiries` (Resend email also sends if `RESEND_API_KEY` is a real key; the test placeholder key silently skips email). The DB write is in its own try/catch — if it fails, the user still sees a success message, so check the server console for errors and check `/admin`.

**Verify Storage URLs:** In `/admin → Media`, upload a test image. Confirm the returned URL is the Supabase public CDN form:
`https://[ref].supabase.co/storage/v1/object/public/media/<category>/<key>`
(not the `…/storage/v1/s3/…` S3 form). If it shows the S3 form, the `generateFileURL` rewrite in `src/lib/storage.ts` needs checking.

**Verify the Company Profile PDF:** Upload `pulse-consultant-company-profile.pdf` to the `company-profile` bucket in Supabase Storage. The Hero / CTA / Footer download buttons resolve to the Supabase URL when `NEXT_PUBLIC_SUPABASE_URL` is set, else fall back to the local `/pulse-consultant-company-profile.pdf` copy.

---

## 5. Deploy to Vercel

1. Push to GitHub (the orchestrator pushes after each task).
2. In Vercel → Project → Settings → Environment Variables, add (Production + Preview + Development as needed):
   - `PAYLOAD_SECRET`, `DATABASE_URL` (pooler `6543`), `DIRECT_URL` (direct `5432`)
   - `NEXT_PUBLIC_SUPABASE_URL`, `S3_ENDPOINT`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`, `S3_BUCKET`, `S3_FORCE_PATH_STYLE`
   - `NEXT_PUBLIC_SERVER_URL` = your Vercel URL (e.g. `https://pulse-consultant.vercel.app`)
   - `RESEND_*`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `NEXT_PUBLIC_CAL_LINK`, `NEXT_PUBLIC_WHATSAPP_NUMBER`
   - Do **not** set `PAYLOAD_DB_PUSH` in production — apply migrations via Path A instead.
3. Deploy. On Vercel (Node 20/22 by default) `next build` runs the same way it does locally.
4. Ensure the Supabase schema exists before the first production request: apply migrations via `npx payload migrate` from a Node 20/26 shell against `DIRECT_URL`, OR do a one-time `PAYLOAD_DB_PUSH=true` Preview deploy, then remove it.
