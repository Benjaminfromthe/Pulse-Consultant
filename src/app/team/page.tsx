import { getPayloadClient } from '@/lib/payload'
import Link from 'next/link'
import TeamMemberCard from '@/components/cards/TeamMemberCard'

export const metadata = {
  title: 'Our Team | Pulse Consultant Ltd',
  description: 'Meet the senior consultants and specialists at Pulse Consultant Ltd.',
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
    <main className="min-h-screen bg-offwhite">
      {/* Hero */}
      <section className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <nav className="text-sm text-white/60 mb-6"><span>Home</span> <span className="mx-2">/</span> <span className="text-gold">Our Team</span></nav>
          <h1 className="font-playfair text-4xl md:text-5xl font-semibold mb-4">Meet Our Team</h1>
          <p className="text-white/80 text-lg max-w-2xl">
            Every engagement is led by a senior consultant with deep sector expertise. No handoffs to junior staff.
          </p>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-playfair text-3xl font-semibold text-navy mb-2">Leadership Team</h2>
          <div className="w-16 h-0.5 bg-gold mb-10" />
          {leadership.length === 0 ? (
            <p className="text-slate-500">Leadership profiles are being updated. Check back soon.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
        </div>
      </section>

      {/* Consulting Team */}
      {consultants.length > 0 && (
        <section className="py-20 bg-offwhite">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="font-playfair text-3xl font-semibold text-navy mb-2">Our Consultants</h2>
            <div className="w-16 h-0.5 bg-gold mb-10" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          </div>
        </section>
      )}

      {/* Join CTA */}
      <section className="bg-navy py-16 text-center text-white">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="font-playfair text-3xl font-semibold mb-4">Work With Our Experts</h2>
          <p className="text-white/70 mb-8">Senior-led engagements. Measurable outcomes. Schedule a consultation today.</p>
          <Link href="/#contact" className="inline-block bg-teal text-white px-8 py-4 rounded font-semibold hover:bg-teal/90 transition-colors">
            Schedule a Consultation
          </Link>
        </div>
      </section>
    </main>
  )
}
