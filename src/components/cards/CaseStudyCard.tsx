import Link from 'next/link'

interface CaseStudyCardProps {
  slug: string
  projectTitle: string
  authorizedClientName?: string
  sectorName?: string
  challengeExcerpt?: string
  metrics?: Array<{ metric: string; value: string; context?: string }>
}

export default function CaseStudyCard({
  slug,
  projectTitle,
  authorizedClientName,
  sectorName,
  challengeExcerpt,
  metrics = [],
}: CaseStudyCardProps) {
  return (
    <div className="group relative bg-white rounded-lg border border-[#E2E8F0] shadow-card-1 hover:shadow-card-2 transition-all duration-200 overflow-hidden flex flex-col">
      <div className="h-1 w-full bg-transparent group-hover:bg-gold transition-colors duration-200" />
      <div className="p-6 flex flex-col flex-1">
        {sectorName && (
          <span className="inline-block px-2 py-1 bg-teal/10 text-teal text-xs font-semibold rounded-full uppercase tracking-wide mb-2 self-start">
            {sectorName}
          </span>
        )}
        <h3 className="font-playfair text-xl font-semibold text-navy mt-2 mb-1">
          {projectTitle}
        </h3>
        {authorizedClientName && (
          <p className="text-sm text-slate-600 mb-3">{authorizedClientName}</p>
        )}
        {challengeExcerpt && (
          <p className="text-sm text-slate-600 leading-relaxed line-clamp-2 mb-4">
            {challengeExcerpt}
          </p>
        )}
        {metrics.length > 0 && (
          <div className="flex gap-4 mb-4">
            {metrics.map((m, i) => (
              <div key={i} className="flex flex-col">
                <span className="font-playfair text-gold font-semibold text-lg leading-tight">
                  {m.value}
                </span>
                <span className="text-xs text-slate-500 leading-tight">{m.metric}</span>
              </div>
            ))}
          </div>
        )}
        <div className="mt-auto pt-2">
          <Link
            href={`/projects/${slug}`}
            className="text-teal font-semibold text-sm hover:underline"
          >
            View Case Study →
          </Link>
        </div>
      </div>
    </div>
  )
}
