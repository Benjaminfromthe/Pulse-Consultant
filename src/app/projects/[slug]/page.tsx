import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import RegulatoryDisclaimer from '@/components/layout/RegulatoryDisclaimer'
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
    <main className="min-h-screen bg-offwhite">
      {/* 1. Hero */}
      <section className="bg-navy text-white py-20">
        <div className="section-container">
          <nav className="text-sm text-white/60 mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/projects" className="hover:text-white transition-colors">
              Projects
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">{projectTitle}</span>
          </nav>
          {sectorName && (
            <span className="inline-block px-3 py-1 bg-teal/20 text-teal text-xs font-semibold rounded-full uppercase tracking-wide mb-4">
              {sectorName}
            </span>
          )}
          <h1 className="font-playfair text-4xl md:text-5xl font-semibold mb-4">
            {projectTitle}
          </h1>
          {authorizedClientName && (
            <p className="text-white/70 text-lg">{authorizedClientName}</p>
          )}
        </div>
      </section>

      {/* 2. Challenge + Scope */}
      <section className="bg-offwhite py-16">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h2 className="font-playfair text-2xl font-semibold text-navy mb-4">
                Business Challenge
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {renderField(engagement.businessChallenge)}
              </p>
            </div>
            <div>
              <h2 className="font-playfair text-2xl font-semibold text-navy mb-4">
                Assignment Scope
              </h2>
              <p className="text-slate-600 leading-relaxed">
                {renderField(engagement.assignmentScope)}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Consulting Approach */}
      <section className="bg-white py-16">
        <div className="section-container">
          <div className="border-l-4 border-gold pl-6">
            <h2 className="font-playfair text-2xl font-semibold text-navy mb-4">
              Our Approach
            </h2>
            <p className="text-slate-600 leading-relaxed">
              {renderField(engagement.consultingApproach)}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Deliverables */}
      <section className="bg-navy text-white py-16">
        <div className="section-container">
          <h2 className="font-playfair text-3xl font-semibold mb-8">
            What We Delivered
          </h2>
          {deliverables.length > 0 ? (
            <ul className="space-y-3">
              {deliverables.map((d, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-gold font-bold text-lg leading-tight mt-0.5">›</span>
                  <span className="text-white/85">
                    {typeof d.deliverable === 'string' ? d.deliverable : ''}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white/60">[Content available in CMS]</p>
          )}
        </div>
      </section>

      {/* 5. Verified Results */}
      <section className="bg-offwhite py-16">
        <div className="section-container">
          <h2 className="font-playfair text-3xl font-semibold text-navy mb-8">
            Verified Results
          </h2>
          {metrics.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {metrics.map((m, i) => (
                <div
                  key={i}
                  className="bg-white border-t-4 border-gold rounded-lg p-6 shadow-card-1"
                >
                  <span className="font-playfair text-3xl text-gold font-semibold block mb-1">
                    {typeof m.value === 'string' ? m.value : ''}
                  </span>
                  <span className="text-navy font-medium text-sm block mb-1">
                    {typeof m.metric === 'string' ? m.metric : ''}
                  </span>
                  {typeof m.context === 'string' && m.context && (
                    <span className="text-slate-500 text-xs">{m.context}</span>
                  )}
                </div>
              ))}
            </div>
          )}
          <p className="text-slate-600 leading-relaxed">
            {renderField(results.summary)}
          </p>
        </div>
      </section>

      {/* 6. Testimonial (conditional) */}
      {clientTestimonial && (
        <section className="bg-white py-16">
          <div className="section-container">
            <blockquote className="max-w-3xl mx-auto">
              <span className="text-gold text-5xl leading-none font-serif block mb-2">&ldquo;</span>
              <p className="text-slate-700 text-lg italic leading-relaxed mb-4">
                {clientTestimonial}
              </p>
              {testimonialAuthor && (
                <footer className="text-navy font-semibold text-sm">
                  &mdash; {testimonialAuthor}
                </footer>
              )}
            </blockquote>
          </div>
        </section>
      )}

      {/* 7. Related Services */}
      {relatedService.length > 0 && (
        <section className="bg-teal text-white py-16">
          <div className="section-container">
            <h2 className="font-playfair text-2xl font-semibold mb-6">Related Services</h2>
            <div className="flex flex-wrap gap-4">
              {relatedService.map((svc, i) => {
                const svcSlug = typeof svc.slug === 'string' ? svc.slug : ''
                const svcTitle = typeof svc.title === 'string' ? svc.title : ''
                if (!svcSlug || !svcTitle) return null
                return (
                  <Link
                    key={i}
                    href={`/services/${svcSlug}`}
                    className="bg-white/10 border border-white/20 rounded px-4 py-2 text-sm hover:bg-white/20 transition-colors"
                  >
                    {svcTitle}
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* 8. CTA */}
      <section className="bg-navy text-white py-16">
        <div className="section-container text-center">
          <h2 className="font-playfair text-3xl md:text-4xl font-semibold mb-4">
            Ready to Start Your Project?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Let&apos;s discuss how we can help you achieve similar results for your organization.
          </p>
          <Button variant="outline" href="/#contact">
            Schedule a Consultation
          </Button>
        </div>
      </section>

      <RegulatoryDisclaimer variant="compact" />
    </main>
  )
}
