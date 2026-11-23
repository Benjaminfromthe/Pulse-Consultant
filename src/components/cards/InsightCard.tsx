import Link from 'next/link'
import Image from 'next/image'

interface InsightCardProps {
  slug: string
  title: string
  type: string
  excerpt: string
  authorName?: string
  publishedAt?: string
  featuredImageUrl?: string
}

const typeLabels: Record<string, string> = {
  article: 'Article',
  'market-analysis': 'Market Analysis',
  publication: 'Publication',
  'white-paper': 'White Paper',
  'press-release': 'Press Release',
  newsletter: 'Newsletter',
}

export default function InsightCard({ slug, title, type, excerpt, authorName, publishedAt, featuredImageUrl }: InsightCardProps) {
  const label = typeLabels[type] || type
  const date = publishedAt ? new Date(publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''

  return (
    <div className="bg-white rounded-lg border border-[#E2E8F0] shadow-card-1 hover:shadow-card-2 hover:border-t-2 hover:border-t-gold transition-all duration-200 flex flex-col overflow-hidden">
      {/* Image placeholder */}
      <div className="relative w-full h-44 bg-offwhite flex-shrink-0">
        {featuredImageUrl ? (
          <Image src={featuredImageUrl} alt={title} fill className="object-cover" sizes="(max-width: 768px) 100vw, 400px" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-navy/10 to-teal/10 flex items-center justify-center">
            <span className="text-4xl opacity-30">📄</span>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <span className="inline-block text-xs font-semibold text-teal bg-teal/10 border border-teal/20 rounded-full px-3 py-0.5 mb-3 self-start">{label}</span>
        <h3 className="font-playfair text-lg font-semibold text-navy mb-2 leading-snug line-clamp-2">{title}</h3>
        <p className="text-sm text-slate-600 line-clamp-3 mb-4 flex-1">{excerpt}</p>
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-[#E2E8F0]">
          <div className="text-xs text-slate-400">
            {authorName && <span className="font-medium text-slate-600">{authorName}</span>}
            {authorName && date && <span className="mx-1">·</span>}
            {date && <span>{date}</span>}
          </div>
          <Link href={`/insights/${slug}`} className="text-sm font-semibold text-teal hover:text-navy transition-colors flex-shrink-0">
            Read →
          </Link>
        </div>
      </div>
    </div>
  )
}
