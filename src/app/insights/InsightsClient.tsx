'use client'
import { useState } from 'react'
import InsightCard from '@/components/cards/InsightCard'

const TYPES = [
  { value: '', label: 'All' },
  { value: 'article', label: 'Articles' },
  { value: 'market-analysis', label: 'Market Analysis' },
  { value: 'publication', label: 'Publications' },
  { value: 'white-paper', label: 'White Papers' },
]

interface Insight { slug: string; title: string; type: string; excerpt: string; authorName?: string; publishedAt?: string; featuredImageUrl?: string }

export default function InsightsClient({ insights }: { insights: Insight[] }) {
  const [activeType, setActiveType] = useState('')
  const filtered = activeType ? insights.filter(i => i.type === activeType) : insights

  return (
    <div>
      {/* Type tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {TYPES.map(t => (
          <button key={t.value} onClick={() => setActiveType(t.value)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-colors ${activeType === t.value ? 'bg-teal text-white border-teal' : 'bg-white text-slate-600 border-[#E2E8F0] hover:border-teal'}`}>
            {t.label}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="text-slate-500 py-12 text-center">No {activeType || 'insights'} published yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(ins => <InsightCard key={ins.slug} {...ins} />)}
        </div>
      )}
    </div>
  )
}
