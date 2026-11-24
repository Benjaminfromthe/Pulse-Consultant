import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

function renderField(val: unknown): string {
  return typeof val === 'string' ? val : '[Content available in CMS]'
}

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'case-studies',
      where: { isApprovedForPublic: { equals: true } },
      limit: 100,
    })
    return docs.map((c) => ({ slug: c.slug as string }))
  } catch {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'case-studies',
      where: {
        slug: { equals: slug },
        isApprovedForPublic: { equals: true },
      },
      depth: 1,
      limit: 1,
    })
    const doc = docs[0] as Record<string, unknown> | undefined
    if (!doc) return {}
    const seo = doc.seo && typeof doc.seo === 'object' ? (doc.seo as Record<string, unknown>) : {}
    const projectTitle = typeof doc.projectTitle === 'string' ? doc.projectTitle : ''
    return {
      title: typeof seo.metaTitle === 'string' && seo.metaTitle ? seo.metaTitle : projectTitle,
      description:
        typeof seo.metaDescription === 'string' && seo.metaDescription
          ? seo.metaDescription
          : `How Pulse Consultant Ltd delivered measurable results on the ${projectTitle} engagement.`,
      alternates: { canonical: `/projects/${slug}` },
    }
  } catch {
    return {}
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params

  let doc: Record<string, unknown>
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'case-studies',
      where: {
        slug: { equals: slug },
        isApprovedForPublic: { equals: true },
      },
      depth: 2,
      limit: 1,
    })
    if (!docs[0]) notFound()
    doc = docs[0] as unknown as Record<string, unknown>
  } catch {
    notFound()
  }

  const projectTitle = typeof doc.projectTitle === 'string' ? doc.projectTitle : ''
  const authorizedClientName =
    typeof doc.authorizedClientName === 'string' ? doc.authorizedClientName : ''

  const sectorObj =
    doc.sector && typeof doc.sector === 'object'
      ? (doc.sector as Record<string, unknown>)
      : null
  const sectorName = sectorObj && typeof sectorObj.name === 'string' ? sectorObj.name : null

  const engagement =
    doc.engagement && typeof doc.engagement === 'object'
      ? (doc.engagement as Record<string, unknown>)
      : {}

  const results =
    doc.results && typeof doc.results === 'object'
      ? (doc.results as Record<string, unknown>)
      : {}

  const deliverables = Array.isArray(engagement.deliverables)
    ? (engagement.deliverables as Array<Record<string, unknown>>)
    : []

  const metrics = Array.isArray(results.metrics)
    ? (results.metrics as Array<Record<string, unknown>>)
    : []

  const relatedService = Array.isArray(doc.relatedService)
    ? (doc.relatedService as Array<Record<string, unknown>>)
    : []

  const clientTestimonial =
    typeof results.clientTestimonial === 'string' && results.clientTestimonial.trim()
      ? results.clientTestimonial
      : null
  const testimonialAuthor =
    typeof results.testimonialAuthor === 'string' ? results.testimonialAuthor : ''

  return (
    <div className="flex flex-col w-full">
      {/* ── HERO ── */}
      <section className="w-full bg-[#10243D] text-white px-margin-mobile py-space-2xl md:px-margin-desktop">
        <div className="flex items-center gap-1 font-label-sm text-label-sm text-white/40 mb-4 text-xs">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link href="/projects" className="hover:text-white transition-colors">Projects</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#C5A15B] truncate">{projectTitle}</span>
        </div>
        {sectorName && (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/20 text-primary-fixed font-label-sm text-label-sm uppercase tracking-wide mb-3">
            {sectorName}
          </span>
        )}
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-white font-semibold leading-tight mb-2">{projectTitle}</h1>
        {authorizedClientName && (
          <p className="font-body-md text-body-md text-white/60">{authorizedClientName}</p>
        )}
      </section>

      {/* ── CHALLENGE + SCOPE ── */}
      <section className="w-full bg-surface px-margin-mobile py-space-xl md:px-margin-desktop">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg max-w-4xl mx-auto">
          <div className="p-space-md rounded-lg bg-surface-container-lowest shadow-sm">
            <div className="flex items-center gap-1 mb-space-sm">
              <span className="material-symbols-outlined text-[18px] text-[#C5A15B]">error_outline</span>
              <h2 className="font-headline-sm text-headline-sm text-[#10243D]">Business Challenge</h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{renderField(engagement.businessChallenge)}</p>
          </div>
          <div className="p-space-md rounded-lg bg-surface-container-lowest shadow-sm">
            <div className="flex items-center gap-1 mb-space-sm">
              <span className="material-symbols-outlined text-[18px] text-primary">assignment</span>
              <h2 className="font-headline-sm text-headline-sm text-[#10243D]">Assignment Scope</h2>
            </div>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{renderField(engagement.assignmentScope)}</p>
          </div>
        </div>
      </section>

      {/* ── APPROACH ── */}
      <section className="w-full bg-surface-container-low px-margin-mobile py-space-xl md:px-margin-desktop">
        <div className="max-w-4xl mx-auto">
          <div className="border-l-4 border-[#C5A15B] pl-space-md">
            <div className="flex items-center gap-1 mb-space-sm">
              <span className="material-symbols-outlined text-[18px] text-primary">psychology</span>
              <h2 className="font-headline-sm text-headline-sm text-[#10243D]">Our Approach</h2>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{renderField(engagement.consultingApproach)}</p>
          </div>
        </div>
      </section>

      {/* ── DELIVERABLES ── */}
      {deliverables.length > 0 && (
        <section className="w-full bg-[#10243D] text-white px-margin-mobile py-space-xl md:px-margin-desktop">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-1 mb-space-md">
              <span className="material-symbols-outlined text-[18px] text-[#C5A15B]">checklist</span>
              <h2 className="font-headline-sm text-headline-sm text-white">Deliverables</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
              {deliverables.map((d, i) => (
                <div key={i} className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-[16px] text-[#C5A15B] mt-0.5 shrink-0">check_circle</span>
                  <span className="font-body-sm text-body-sm text-white/80">{typeof d.deliverable === 'string' ? d.deliverable : ''}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── RESULTS ── */}
      <section className="w-full bg-surface px-margin-mobile py-space-xl md:px-margin-desktop">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-1 mb-space-md">
            <span className="material-symbols-outlined text-[18px] text-[#C5A15B]">verified</span>
            <h2 className="font-headline-sm text-headline-sm text-[#10243D]">Verified Results</h2>
          </div>
          {metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-sm mb-space-md">
              {metrics.map((m, i) => (
                <div key={i} className="relative p-space-md rounded-lg bg-surface-container-lowest shadow-sm text-center overflow-hidden">
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#C5A15B]" />
                  <span className="font-headline-lg-mobile text-headline-lg-mobile text-[#C5A15B] font-bold block leading-none">{typeof m.value === 'string' ? m.value : ''}</span>
                  <span className="font-label-md text-label-md text-[#10243D] font-semibold block mt-1">{typeof m.metric === 'string' ? m.metric : ''}</span>
                  {typeof m.context === 'string' && m.context && <span className="font-body-sm text-body-sm text-on-surface-variant">{m.context}</span>}
                </div>
              ))}
            </div>
          )}
          <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{renderField(results.summary)}</p>
        </div>
      </section>

      {/* ── TESTIMONIAL ── */}
      {clientTestimonial && (
        <section className="w-full bg-surface-container-low px-margin-mobile py-space-xl md:px-margin-desktop">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-[#C5A15B] text-5xl leading-none font-serif block mb-2">&ldquo;</span>
            <p className="font-body-lg text-body-lg text-[#10243D] italic leading-relaxed mb-space-md">{clientTestimonial}</p>
            {testimonialAuthor && <p className="font-label-md text-label-md text-primary font-semibold">— {testimonialAuthor}</p>}
          </div>
        </section>
      )}

      {/* ── RELATED SERVICES ── */}
      {relatedService.length > 0 && (
        <section className="w-full bg-primary-container px-margin-mobile py-space-lg md:px-margin-desktop">
          <div className="max-w-4xl mx-auto">
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-white/70 font-semibold block mb-space-sm">Related Services</span>
            <div className="flex flex-wrap gap-space-xs">
              {relatedService.map((svc, i) => {
                const svcSlug = typeof svc.slug === 'string' ? svc.slug : ''
                const svcTitle = typeof svc.title === 'string' ? svc.title : ''
                if (!svcSlug || !svcTitle) return null
                return (
                  <Link key={i} href={`/services/${svcSlug}`}
                    className="bg-white/15 border border-white/25 text-white font-label-md text-label-md px-space-sm py-1 rounded hover:bg-white/25 transition-colors">
                    {svcTitle}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="w-full bg-[#10243D] text-white px-margin-mobile py-space-2xl md:px-margin-desktop text-center">
        <h2 className="font-headline-lg-mobile text-headline-lg-mobile text-white font-semibold mb-space-sm">Ready for Similar Results?</h2>
        <p className="font-body-md text-body-md text-white/70 leading-relaxed mb-space-lg max-w-xl mx-auto">
          Let&apos;s discuss how we can help your organisation achieve measurable outcomes.
        </p>
        <Link href="/contact"
          className="inline-flex items-center justify-center gap-2 px-space-lg py-space-sm bg-primary-container text-white font-label-lg text-label-lg rounded shadow-md hover:bg-primary transition-all">
          <span className="material-symbols-outlined text-[18px]">calendar_month</span>
          Schedule a Consultation
        </Link>
      </section>
    </div>
  )
}
