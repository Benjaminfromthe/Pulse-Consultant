import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'
import { Services } from './collections/Services'
import { Industries } from './collections/Industries'
import { CaseStudies } from './collections/CaseStudies'
import { TeamMembers } from './collections/TeamMembers'
import { Insights } from './collections/Insights'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { Inquiries } from './collections/Inquiries'
import { s3MediaStorage } from './lib/storage'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Pulse Consultant CMS',
    },
  },
  collections: [Users, Media, Services, Industries, CaseStudies, TeamMembers, Insights, Inquiries],
  editor: lexicalEditor(),
  // Keep the fallback so `next build` (which runs NODE_ENV=production without .env.local) succeeds
  // without Supabase credentials. Override PAYLOAD_SECRET in .env.local and on Vercel.
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-change-me',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    // Supabase pooler (port 6543) for runtime serverless queries; falls back to the legacy
    // DATABASE_URI for local non-Supabase dev. SSL is DSN-driven via ?sslmode=require (Supabase)
    // or omitted (local) — do NOT set pool.ssl here, it would break no-SSL local dev.
    // Migrations/seeds use the direct DSN: the user temporarily points DATABASE_URL at DIRECT_URL
    // (port 5432) when running `npx payload migrate` / `npm run seed` — see verification-commands.md.
    pool: {
      connectionString: process.env.DATABASE_URL || process.env.DATABASE_URI || '',
    },
    // Opt-in schema sync (drizzle `push`). Default OFF — production should use migrations.
    // Set PAYLOAD_DB_PUSH=true only to bootstrap/sync the schema when the Payload migration
    // CLI is unavailable (e.g. Node 24 + tsx/undici incompatibility). See SUPABASE-SETUP.md.
    push: process.env.PAYLOAD_DB_PUSH === 'true',
  }),
  plugins: [s3MediaStorage],
  sharp,
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
})
