import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import ConsultingServiceJsonLd from '@/components/seo/ConsultingServiceJsonLd'
import RegulatoryDisclaimer from '@/components/layout/RegulatoryDisclaimer'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'services',
      where: { slug: { equals: slug }, status: { equals: 'published' } },
      limit: 1,
    })
    const doc = docs[0] as Record<string, unknown> | undefined
    if (!doc) return {}
    const seo =
      doc.seo && typeof doc.seo === 'object' ? (doc.seo as Record<string, unknown>) : {}
    const title = typeof doc.title === 'string' ? doc.title : ''
    const shortDescription =
      typeof doc.shortDescription === 'string' ? doc.shortDescription : ''
    return {
      title: typeof seo.metaTitle === 'string' && seo.metaTitle ? seo.metaTitle : title,
      description:
        typeof seo.metaDescription === 'string' && seo.metaDescription
          ? seo.metaDescription
          : shortDescription,
      alternates: { canonical: `/services/${slug}` },
    }
  } catch {
    return {}
  }
}

export default async function ServicePage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
  })

  const service = docs[0]
  if (!service) notFound()

  return (
    <main className="min-h-screen bg-offwhite">
      <section className="section-container py-20">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-sm font-semibold text-teal uppercase tracking-widest mb-4">
            {String(service.category).replace(/-/g, ' ')}
          </span>
          <h1 className="font-playfair text-4xl md:text-5xl text-navy font-semibold mb-6">
            {service.title as string}
          </h1>
          <p className="text-slate-600 text-lg mb-10">{service.shortDescription as string}</p>
        </div>
      </section>
      <ConsultingServiceJsonLd
        name={service.title as string}
        description={service.shortDescription as string}
        serviceType={String(service.category).replace(/-/g, ' ')}
        url={`/services/${slug}`}
      />
      <RegulatoryDisclaimer />
    </main>
  )
}

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'services',
      limit: 100,
      where: { status: { equals: 'published' } },
    })
    return docs.map((s) => ({ slug: s.slug as string }))
  } catch {
    return []
  }
}
