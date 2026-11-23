import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function InsightPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'insights',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
  })

  const insight = docs[0]
  if (!insight) notFound()

  return (
    <main className="min-h-screen bg-offwhite">
      <section className="section-container py-20">
        <div className="max-w-4xl mx-auto">
          <span className="inline-block text-sm font-semibold text-teal uppercase tracking-widest mb-4">
            {String(insight.type).replace(/-/g, ' ')}
          </span>
          <h1 className="font-playfair text-4xl md:text-5xl text-navy font-semibold mb-6">
            {insight.title as string}
          </h1>
          <p className="text-slate-600 text-lg mb-10">{insight.excerpt as string}</p>
        </div>
      </section>
    </main>
  )
}

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'insights',
      limit: 100,
      where: { status: { equals: 'published' } },
    })
    return docs.map((i) => ({ slug: i.slug as string }))
  } catch {
    return []
  }
}
