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
    <div className="flex flex-col w-full">
      {/* Hero */}
      <section className="w-full bg-[#10243D] text-white px-margin-mobile py-space-2xl md:px-margin-desktop">
        <div className="flex items-center gap-1 font-label-sm text-label-sm text-white/40 mb-4 text-xs">
          <span>Home</span>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#C5A15B]">Insights</span>
        </div>
        <div className="flex items-center gap-1 mb-3">
          <span className="material-symbols-outlined text-[16px] text-[#C5A15B]">menu_book</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#C5A15B] font-semibold">Research &amp; Publications</span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-white font-semibold leading-tight mb-3">Insights &amp; Publications</h1>
        <p className="font-body-md text-body-md text-white/70 leading-relaxed max-w-2xl">Strategic perspectives, market analysis, and publications from our consulting team.</p>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <section className="w-full bg-surface px-margin-mobile py-space-xl md:px-margin-desktop">
          <div className="flex items-center gap-1 mb-space-md">
            <span className="material-symbols-outlined text-[16px] text-[#C5A15B]">star</span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#C5A15B] font-semibold">Featured</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
            {featured.map(ins => <InsightCard key={ins.slug} {...ins} />)}
          </div>
        </section>
      )}

      {/* All Insights with filter tabs */}
      <section className="w-full bg-surface-container-low px-margin-mobile py-space-xl md:px-margin-desktop">
        <div className="flex items-center gap-1 mb-space-md">
          <span className="material-symbols-outlined text-[16px] text-primary">article</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">All Insights</span>
        </div>
        <InsightsClient insights={all} />
      </section>
    </div>
  )
}
