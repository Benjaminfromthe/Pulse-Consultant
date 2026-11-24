/**
 * Returns the Company Profile PDF download URL.
 *
 * When the Supabase project URL is configured, points at the public object in the
 * `company-profile` bucket on Supabase Storage. Otherwise falls back to the static copy
 * shipped in `/public` so the site always has a working download link (including the
 * credential-free build).
 */
export function companyProfileUrl(): string {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  if (supabaseUrl) {
    return `${supabaseUrl}/storage/v1/object/public/company-profile/pulse-consultant-company-profile.pdf`
  }
  return '/pulse-consultant-company-profile.pdf'
}
