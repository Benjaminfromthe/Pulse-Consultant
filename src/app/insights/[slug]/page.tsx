import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import InsightCard from '@/components/cards/InsightCard'

interface Props { params: Promise<{ slug: string }> }

function renderBodyText(val: unknown): string {
  if (!val) return ''
  if (typeof val === 'string') return val
  return '[Article content available in CMS editor]'
}

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params

  let doc: Record<string, unknown> = {}
  let recent: Record<string, unknown>[] = []

  try {
    const payload = await getPayloadClient()
    const [result, recentResult] = await Promise.all([
      payload.find({
        collection: 'insights',
        where: { and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }] },
        depth: 2,
        limit: 1,
      }),
      payload.find({
        collection: 'insights',
        where: { and: [{ slug: { not_equals: slug } }, { status: { equals: 'published' } }] },
        limit: 3,
        sort: '-publishedAt',
        depth: 2,
      }),
    ])
    const found = result.docs[0] as Record<string, unknown> | undefined
    if (!found) notFound()
    doc = found
    recent = recentResult.docs as Record<string, unknown>[]
  } catch {
    notFound()
  }

  const author = doc.author as Record<string, unknown> | null
  const image = doc.featuredImage as Record<string, unknown> | null
  const publishedAt = doc.publishedAt
    ? new Date(String(doc.publishedAt)).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : ''

  return (
    <main className="min-h-screen bg-offwhite">
      <section className="bg-navy text-white py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <nav className="text-sm text-white/60 mb-6 flex gap-2">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <Link href="/insights" className="hover:text-white">Insights</Link>
            <span>/</span>
            <span className="text-gold line-clamp-1">{String(doc.title ?? '')}</span>
          </nav>
          <span className="inline-block text-xs font-semibold text-teal bg-teal/20 border border-teal/30 rounded-full px-3 py-1 mb-4 uppercase tracking-wider">
            {String(doc.type || 'article').replace(/-/g, ' ')}
          </span>
          <h1 className="font-playfair text-3xl md:text-5xl font-semibold mb-4 leading-tight">
            {String(doc.title ?? '')}
          </h1>
          <div className="flex items-center gap-4 text-white/60 text-sm">
            {author != null && (
              <span className="font-medium" style={{ color: 'rgba(255,255,255,0.85)' }}>
                {String(author.fullName || '')}
              </span>
            )}
            {publishedAt !== '' && <span>{publishedAt}</span>}
          </div>
        </div>
      </section>

      {image != null && image.url != null && (
        <div className="max-w-4xl mx-auto px-6 md:px-12 -mt-8 mb-0 relative z-10">
          <div className="relative w-full h-72 rounded-lg overflow-hidden shadow-card-2">
            <Image
              src={String(image.url)}
              alt={String(doc.title ?? '')}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </div>
        </div>
      )}

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-12 grid lg:grid-cols-3 gap-12">
          <article className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-[#E2E8F0] p-8 shadow-card-1">
              <p className="text-slate-700 font-semibold text-lg mb-6 pb-6 border-b border-[#E2E8F0]">
                {String(doc.excerpt ?? '')}
              </p>
              <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed">
                <p>{renderBodyText(doc.body)}</p>
              </div>
            </div>
          </article>

          <aside className="space-y-6">
            {author != null && (
              <div className="bg-white rounded-lg border border-[#E2E8F0] p-5 shadow-card-1">
                <h3 className="font-playfair text-base font-semibold text-navy mb-3">About the Author</h3>
                <p className="font-semibold text-sm text-navy">{String(author.fullName || '')}</p>
                <p className="text-sm text-teal mb-2">{String(author.title || '')}</p>
                {author.shortBio != null && (
                  <p className="text-xs text-slate-500 leading-relaxed">{String(author.shortBio)}</p>
                )}
              </div>
            )}
            <Link
              href="/insights"
              className="block bg-navy text-white text-sm font-semibold text-center py-3 px-5 rounded hover:bg-navy/90 transition-colors"
            >
              ← Back to Insights
            </Link>
          </aside>
        </div>
      </section>

      {recent.length > 0 && (
        <section className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <h2 className="font-playfair text-2xl font-semibold text-navy mb-8">More Insights</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recent.map((ins, i) => {
                const a = ins.author as Record<string, unknown> | null
                const img = ins.featuredImage as Record<string, unknown> | null
                return (
                  <InsightCard
                    key={i}
                    slug={String(ins.slug)}
                    title={String(ins.title)}
                    type={String(ins.type)}
                    excerpt={String(ins.excerpt)}
                    authorName={a != null ? String(a.fullName || '') : undefined}
                    publishedAt={ins.publishedAt != null ? String(ins.publishedAt) : undefined}
                    featuredImageUrl={img != null ? String(img.url || '') : undefined}
                  />
                )
              })}
            </div>
          </div>
        </section>
      )}
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
    return docs.map((d) => ({ slug: String((d as Record<string, unknown>).slug) }))
  } catch {
    return []
  }
}
