import { getPayloadClient } from '@/lib/payload'
import Link from 'next/link'
import TeamMemberCard from '@/components/cards/TeamMemberCard'

export const metadata = {
  title: 'Our Team',
  description: 'Meet the senior consultants and specialists at Pulse Consultant Ltd.',
  alternates: { canonical: '/team' },
}

function extractPhotoUrl(photo: unknown): string | undefined {
  if (!photo || typeof photo !== 'object') return undefined
  const p = photo as Record<string, unknown>
  if (typeof p.url === 'string') return p.url
  return undefined
}

function extractNames(arr: unknown[], key: string): string[] {
  if (!Array.isArray(arr)) return []
  return arr.map(item => {
    if (!item || typeof item !== 'object') return ''
    return String((item as Record<string, unknown>)[key] || '')
  }).filter(Boolean)
}

function extractSpecializations(arr: unknown[]): string[] {
  if (!Array.isArray(arr)) return []
  return arr.map(item => {
    if (!item || typeof item !== 'object') return ''
    return String((item as Record<string, unknown>).area || '')
  }).filter(Boolean)
}

export default async function TeamPage() {
  let leadership: Record<string, unknown>[] = []
  let consultants: Record<string, unknown>[] = []

  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'team-members',
      where: { isActive: { equals: true } },
      sort: 'sortOrder',
      depth: 2,
      limit: 50,
    })
    const all = result.docs as Record<string, unknown>[]
    leadership = all.filter(m => m.isLeadership === true)
    consultants = all.filter(m => m.isLeadership !== true)
  } catch {
    // DB unavailable — renders empty state
  }

  return (
    <div className="flex flex-col w-full">

      {/* ── HERO ── */}
      <section className="w-full bg-[#10243D] text-white px-margin-mobile py-space-2xl md:px-margin-desktop">
        <div className="flex items-center gap-1 font-label-sm text-label-sm text-white/40 mb-4 text-xs">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#C5A15B]">Our Team</span>
        </div>
        <div className="flex items-center gap-1 mb-3">
          <span className="material-symbols-outlined text-[16px] text-[#C5A15B]">groups</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#C5A15B] font-semibold">Leadership &amp; Expertise</span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-white font-semibold leading-tight mb-3">
          Meet Our Team
        </h1>
        <p className="font-body-md text-body-md text-white/70 leading-relaxed max-w-2xl">
          Every engagement is led by a senior partner with deep sector expertise.
          No handoffs to junior staff — you get our best people from day one.
        </p>
      </section>

      {/* ── LEADERSHIP ── */}
      <section className="w-full bg-surface px-margin-mobile py-space-2xl md:px-margin-desktop">
        <div className="mb-space-lg">
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Senior Leadership</span>
          <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-[#10243D] font-semibold mt-1">Leadership Team</h2>
          <div className="w-12 h-[2px] bg-[#C5A15B] mt-2" />
        </div>

        {leadership.length === 0 ? (
          <div className="p-space-xl rounded-xl bg-surface-container-low text-center">
            <span className="material-symbols-outlined text-[40px] text-on-surface-variant block mb-3">manage_accounts</span>
            <p className="font-headline-sm text-headline-sm text-[#10243D] mb-2">Profiles Coming Soon</p>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Leadership profiles are being updated. Check back soon or{' '}
              <Link href="/contact" className="text-primary hover:underline">get in touch</Link>.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
            {leadership.map((m, i) => (
              <TeamMemberCard
                key={i}
                size="large"
                fullName={String(m.fullName || '')}
                title={String(m.title || '')}
                shortBio={m.shortBio ? String(m.shortBio) : undefined}
                yearsExperience={typeof m.yearsExperience === 'number' ? m.yearsExperience : undefined}
                photoUrl={extractPhotoUrl(m.photo)}
                linkedIn={m.linkedIn ? String(m.linkedIn) : undefined}
                specializations={extractSpecializations(Array.isArray(m.specializations) ? m.specializations : [])}
                serviceNames={extractNames(Array.isArray(m.expertiseInServices) ? m.expertiseInServices : [], 'title')}
              />
            ))}
          </div>
        )}
      </section>

      {/* ── CONSULTANTS ── */}
      {consultants.length > 0 && (
        <section className="w-full bg-surface-container-low px-margin-mobile py-space-2xl md:px-margin-desktop">
          <div className="mb-space-lg">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">Advisory Professionals</span>
            <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-[#10243D] font-semibold mt-1">Our Consultants</h2>
            <div className="w-12 h-[2px] bg-[#C5A15B] mt-2" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-sm">
            {consultants.map((m, i) => (
              <TeamMemberCard
                key={i}
                size="small"
                fullName={String(m.fullName || '')}
                title={String(m.title || '')}
                shortBio={m.shortBio ? String(m.shortBio) : undefined}
                yearsExperience={typeof m.yearsExperience === 'number' ? m.yearsExperience : undefined}
                photoUrl={extractPhotoUrl(m.photo)}
                specializations={extractSpecializations(Array.isArray(m.specializations) ? m.specializations : [])}
              />
            ))}
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="w-full bg-[#10243D] px-margin-mobile py-space-2xl md:px-margin-desktop text-center">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-white font-semibold mb-space-sm">
          Work With Our Experts
        </h2>
        <p className="font-body-md text-body-md text-white/70 leading-relaxed mb-space-lg max-w-xl mx-auto">
          Senior-led engagements. Measurable outcomes. Schedule a confidential consultation today.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-space-lg py-space-sm bg-primary-container text-white font-label-lg text-label-lg rounded shadow-md hover:bg-primary transition-all"
        >
          <span className="material-symbols-outlined text-[18px]">calendar_month</span>
          Schedule a Consultation
        </Link>
      </section>

    </div>
  )
}
