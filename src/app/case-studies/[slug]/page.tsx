import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'

interface Props {
  params: Promise<{ slug: string }>
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params
  const payload = await getPayloadClient()

  const { docs } = await payload.find({
    collection: 'case-studies',
    where: {
      slug: { equals: slug },
      isApprovedForPublic: { equals: true },
    },
    limit: 1,
  })

  const caseStudy = docs[0]
  if (!caseStudy) notFound()

  return (
    <main className="min-h-screen bg-offwhite">
      <section className="section-container py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="font-playfair text-4xl md:text-5xl text-navy font-semibold mb-6">
            {caseStudy.projectTitle as string}
          </h1>
          {caseStudy.authorizedClientName && (
            <p className="text-slate-600 text-lg mb-10">{caseStudy.authorizedClientName as string}</p>
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
      collection: 'case-studies',
      limit: 100,
      where: { isApprovedForPublic: { equals: true } },
    })
    return docs.map((c) => ({ slug: c.slug as string }))
  } catch {
    return []
  }
}
