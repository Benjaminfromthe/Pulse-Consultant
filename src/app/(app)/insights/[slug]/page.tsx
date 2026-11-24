import { getPayloadClient } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'
import InsightCard from '@/components/cards/InsightCard'
import ArticleJsonLd from '@/components/seo/ArticleJsonLd'

interface Props { params: Promise<{ slug: string }> }

function renderBodyText(val: unknown): string {
  if (!val) return ''
  if (typeof val === 'string') return val
  return '[Article content available in CMS editor]'
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const payload = await getPayloadClient()
    const { docs } = await payload.find({
      collection: 'insights',
      where: { and: [{ slug: { equals: slug } }, { status: { equals: 'published' } }] },
      limit: 1,
    })
    const doc = docs[0] as Record<string, unknown> | undefined
    if (!doc) return {}
    const seo =
      doc.seo && typeof doc.seo === 'object' ? (doc.seo as Record<string, unknown>) : {}
    const title = typeof doc.title === 'string' ? doc.title : ''
    const excerpt = typeof doc.excerpt === 'string' ? doc.excerpt : ''
    return {
      title: typeof seo.metaTitle === 'string' && seo.metaTitle ? seo.metaTitle : title,
      description:
        typeof seo.metaDescription === 'string' && seo.metaDescription
          ? seo.metaDescription
          : excerpt,
      alternates: { canonical: `/insights/${slug}` },
    }
  } catch {
    return {}
  }
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
    <div className="flex flex-col w-full">
      <ArticleJsonLd
        title={String(doc.title ?? '')}
        description={String(doc.excerpt ?? '')}
        url={`/insights/${slug}`}
        datePublished={doc.publishedAt ? String(doc.publishedAt) : undefined}
        authorName={author != null && String(author.fullName || '').trim() ? String(author.fullName) : undefined}
      />

      {/* ── HERO ── */}
      <section className="w-full bg-[#10243D] text-white px-margin-mobile py-space-2xl md:px-margin-desktop">
        <div className="flex items-center gap-1 font-label-sm text-label-sm text-white/40 mb-4 text-xs">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <Link href="/insights" className="hover:text-white transition-colors">Insights</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#C5A15B] line-clamp-1">{String(doc.title ?? '')}</span>
        </div>
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-primary/20 text-primary-fixed font-label-sm text-label-sm uppercase tracking-wide mb-3">
          {String(doc.type || 'article').replace(/-/g, ' ')}
        </span>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-white font-semibold leading-tight mb-3">
          {String(doc.title ?? '')}
        </h1>
        <div className="flex items-center gap-space-sm text-white/60 font-body-sm text-body-sm">
          {author != null && <span className="text-white/85 font-semibold">{String(author.fullName || '')}</span>}
          {publishedAt !== '' && <span>{publishedAt}</span>}
        </div>
      </section>

      {/* ── FEATURED IMAGE ── */}
      {image != null && image.url != null && (
        <div className="w-full bg-surface-container-high max-h-80 overflow-hidden">
          <Image
            src={String(image.url)}
            alt={String(doc.title ?? '')}
            width={1200}
            height={500}
            className="w-full h-full object-cover"
            sizes="100vw"
          />
        </div>
      )}

      {/* ── BODY + SIDEBAR ── */}
      <section className="w-full bg-surface px-margin-mobile py-space-xl md:px-margin-desktop">
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-space-lg">
          <article className="lg:col-span-2">
            <div className="rounded-xl bg-surface-container-lowest shadow-sm p-space-lg">
              <p className="font-body-lg text-body-lg text-[#10243D] font-semibold mb-space-md pb-space-md border-b border-surface-container">
                {String(doc.excerpt ?? '')}
              </p>
              <div className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                <p>{renderBodyText(doc.body)}</p>
              </div>
            </div>
          </article>

          <aside className="flex flex-col gap-space-sm">
            {author != null && (
              <div className="rounded-xl bg-surface-container-lowest shadow-sm p-space-md">
                <div className="flex items-center gap-1 mb-space-sm">
                  <span className="material-symbols-outlined text-[16px] text-primary">person</span>
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">Author</span>
                </div>
                <p className="font-headline-sm text-headline-sm text-[#10243D]">{String(author.fullName || '')}</p>
                <p className="font-body-sm text-body-sm text-primary mb-space-xs">{String(author.title || '')}</p>
                {author.shortBio != null && (
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">{String(author.shortBio)}</p>
                )}
              </div>
            )}
            <Link href="/insights"
              className="flex items-center justify-center gap-2 bg-[#10243D] text-white font-label-md text-label-md py-space-sm px-space-md rounded hover:bg-[#10243D]/90 transition-colors">
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              Back to Insights
            </Link>
          </aside>
        </div>
      </section>

      {/* ── MORE INSIGHTS ── */}
      {recent.length > 0 && (
        <section className="w-full bg-surface-container-low px-margin-mobile py-space-xl md:px-margin-desktop">
          <div className="flex items-center gap-1 mb-space-md">
            <span className="material-symbols-outlined text-[16px] text-primary">article</span>
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold">More Insights</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-space-sm">
            {recent.map((ins, i) => {
              const a = ins.author as Record<string, unknown> | null
              const img = ins.featuredImage as Record<string, unknown> | null
              return (
                <InsightCard key={i}
                  slug={String(ins.slug)} title={String(ins.title)} type={String(ins.type)} excerpt={String(ins.excerpt)}
                  authorName={a != null ? String(a.fullName || '') : undefined}
                  publishedAt={ins.publishedAt != null ? String(ins.publishedAt) : undefined}
                  featuredImageUrl={img != null ? String(img.url || '') : undefined}
                />
              )
            })}
          </div>
        </section>
      )}
    </div>
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
