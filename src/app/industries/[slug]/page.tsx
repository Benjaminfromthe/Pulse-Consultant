import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function IndustryPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'industries',
    where: { slug: { equals: slug }, status: { equals: 'published' } },
    limit: 1,
  })

  const industry = docs[0]
  if (!industry) notFound()

  return (
    <main className="min-h-screen bg-offwhite">
      <section className="section-container py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-playfair text-4xl md:text-5xl text-navy font-semibold mb-6">
            {industry.name as string}
          </h1>
          {industry.tagline && (
            <p className="text-teal text-xl mb-10">{industry.tagline as string}</p>
          )}
        </div>
      </section>
    </main>
  )
}

export async function generateStaticParams() {
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'industries',
      limit: 100,
      where: { status: { equals: 'published' } },
    })
    return docs.map((i) => ({ slug: i.slug as string }))
  } catch {
    return []
  }
}
