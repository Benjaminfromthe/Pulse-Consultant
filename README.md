This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Database & Storage (Supabase)

This project uses Supabase Postgres as the Payload database host and Supabase Storage (S3-compatible) for media. Payload remains the CMS — no Supabase Auth or RLS is used (Path A / hybrid).

1. Create a Supabase project; note the project-ref and region.
2. In Supabase Dashboard → Storage, create a **public** `media` bucket and a **public** `company-profile` bucket.
3. Dashboard → Settings → Storage → S3 Connection → generate S3 access keys.
4. Copy `.env.example` to `.env.local` and fill `DATABASE_URL` (pooler, port 6543), `DIRECT_URL` (direct, port 5432), the `S3_*` vars, `NEXT_PUBLIC_SUPABASE_URL`, and `PAYLOAD_SECRET`.
5. Apply the schema and seed: see `.agents/tasks/supabase-wiring/verification-commands.md` for the exact PowerShell commands.

See `ADMIN_MANUAL.md` for content-management guidance.
