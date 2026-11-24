import { s3Storage } from '@payloadcms/storage-s3'
import type { GenerateFileURL } from '@payloadcms/plugin-cloud-storage/types'

/**
 * Supabase public object URLs look like:
 *   https://<ref>.supabase.co/storage/v1/object/public/<bucket>/<objectKey>
 *
 * The S3 adapter's default URL (https://<ref>.supabase.co/storage/v1/s3/<bucket>/<key>) is the
 * private S3 API endpoint and is NOT publicly readable. We override via the collection-level
 * `generateFileURL` so every Media `url` resolves to the Supabase public CDN form.
 *
 * `prefix` here is the object's folder (the document `prefix` field, folded with `_objectKey`),
 * and `filename` is already size-aware. The plugin guarantees this `prefix` matches the path the
 * file was actually uploaded to, so the URL always points at the real object.
 */
const mediaFileURL: GenerateFileURL = ({ filename, prefix }) => {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL
  const bucket = process.env.S3_BUCKET
  if (!base || !bucket || !filename) return ''
  const folder = prefix ? `${prefix}/` : ''
  return `${base}/storage/v1/object/public/${bucket}/${folder}${filename}`
}

/**
 * S3 storage plugin for the Media collection, backed by Supabase Storage's S3-compatible API.
 *
 * Gated by env so the build passes WITHOUT Supabase credentials: when the S3 access key and
 * bucket are present the plugin enables cloud storage, otherwise Media falls back to local
 * storage. `alwaysInsertFields` keeps the `prefix`/`_objectKey` fields in the schema even when
 * the plugin is disabled, so `payload-types.ts` stays stable across build and runtime.
 */
export const s3MediaStorage = s3Storage({
  enabled: Boolean(process.env.S3_ACCESS_KEY_ID && process.env.S3_BUCKET),
  alwaysInsertFields: true,
  config: {
    endpoint: process.env.S3_ENDPOINT,
    region: process.env.S3_REGION,
    credentials: {
      accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
      secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
    },
    forcePathStyle: process.env.S3_FORCE_PATH_STYLE !== 'false',
  },
  bucket: process.env.S3_BUCKET || 'media',
  collections: {
    media: {
      // No collection-level folder: the bucket name is the namespace. Per-document folders are
      // set by the Media `beforeChange` hook (prefix = category).
      prefix: '',
      generateFileURL: mediaFileURL,
      // Serve files directly from the public CDN URL instead of proxying through Payload.
      disablePayloadAccessControl: true,
    },
  },
})
