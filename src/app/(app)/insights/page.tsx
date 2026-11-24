import { getPayloadClient } from '@/lib/payload'
import InsightCard from '@/components/cards/InsightCard'
import InsightsClient from './InsightsClient'

export const metadata = {
  title: 'Insights & Publications',
  description: 'Articles, market analysis, and publications from Pulse Consultant Ltd.',
  alternates: { canonical: '/insights' },
}

function normalizeInsight(doc: Record<string, unknown>) {
  const author = doc.author as Record<string, unknown> | null
  const image = doc.featuredImage as Record<string, unknown> | null
  return {
    slug: String(doc.slug || ''),
    title: String(doc.title || ''),
    type: String(doc.type || 'article'),
    excerpt: String(doc.excerpt || ''),
    authorName: author && typeof author === 'object' ? String(author.fullName || '') || undefined : undefined,
    publishedAt: doc.publishedAt ? String(doc.publishedAt) : undefined,
    featuredImageUrl: image && typeof image === 'object' && image.url ? String(image.url) : undefined,
  }
}

export default async function InsightsPage() {
  let featured: ReturnType<typeof normalizeInsight>[] = []
  let all: ReturnType<typeof normalizeInsight>[] = []

  try {
    const payload = await getPayloadClient()
    const [featuredResult, allResult] = await Promise.all([
      payload.find({ collection: 'insights', where: { and: [{ isFeatured: { equals: true } }, { status: { equals: 'published' } }] }, limit: 3, sort: '-publishedAt', depth: 2 }),
      payload.find({ collection: 'insights', where: { status: { equals: 'published' } }, limit: 24, sort: '-publishedAt', depth: 2 }),
    ])
    featured = featuredResult.docs.map(d => normalizeInsight(d as Record<string, unknown>))
    all = allResult.docs.map(d => normalizeInsight(d as Record<string, unknown>))
  } catch {
    // DB unavailable
  }

  return (
    <main className="min-h-screen bg-offwhite">
      {/* Hero */}
      <section className="bg-navy text-white py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <nav className="text-sm text-white/60 mb-6"><span>Home</span> <span className="mx-2">/</span> <span className="text-gold">Insights</span></nav>
          <h1 className="font-playfair text-4xl md:text-5xl font-semibold mb-4">Insights & Publications</h1>
          <p className="text-white/80 text-lg max-w-2xl">Strategic perspectives, market analysis, and publications from our consulting team.</p>
        </div>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="font-playfair text-2xl font-semibold text-navy mb-8">Featured</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featured.map(ins => <InsightCard key={ins.slug} {...ins} />)}
            </div>
          </div>
        </section>
      )}

      {/* All Insights with filter tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="font-playfair text-2xl font-semibold text-navy mb-8">All Insights</h2>
          <InsightsClient insights={all} />
        </div>
      </section>
    </main>
  )
}
