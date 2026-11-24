'use client'

import { useMemo } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import CaseStudyCard from '@/components/cards/CaseStudyCard'

export interface FilterOption {
  id: string
  label: string
}

export interface CaseStudyItem {
  slug: string
  projectTitle: string
  authorizedClientName?: string
  sectorName?: string
  sectorId?: string
  challengeExcerpt?: string
  metrics?: Array<{ metric: string; value: string; context?: string }>
  relatedServiceIds?: string[]
}

interface ProjectsClientProps {
  caseStudies: CaseStudyItem[]
  industries: FilterOption[]
  services: FilterOption[]
}

export default function ProjectsClient({
  caseStudies,
  industries,
  services,
}: ProjectsClientProps) {
  const searchParams = useSearchParams()
  const router = useRouter()

  const selectedSector = searchParams.get('sector') ?? ''
  const selectedService = searchParams.get('service') ?? ''

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    router.push(`?${params.toString()}`)
  }

  function clearFilters() {
    router.push('?')
  }

  const filtered = useMemo(() => {
    return caseStudies.filter((cs) => {
      const sectorMatch = !selectedSector || cs.sectorId === selectedSector
      const serviceMatch =
        !selectedService ||
        (Array.isArray(cs.relatedServiceIds) && cs.relatedServiceIds.includes(selectedService))
      return sectorMatch && serviceMatch
    })
  }, [caseStudies, selectedSector, selectedService])

  const activeFilterCount =
    (selectedSector ? 1 : 0) + (selectedService ? 1 : 0)
  const hasFilters = activeFilterCount > 0

  return (
    <div>
      {/* Sticky filter bar */}
      <div className="sticky top-[72px] z-30 bg-white border-b border-[#E2E8F0] py-4 shadow-card-1">
        <div className="section-container">
          <div className="flex flex-wrap items-center gap-3">
            {/* Sector select */}
            <div className="flex items-center gap-2">
              <label htmlFor="sector-filter" className="text-sm font-medium text-navy sr-only">
                Sector
              </label>
              <select
                id="sector-filter"
                value={selectedSector}
                onChange={(e) => updateParam('sector', e.target.value)}
                className="border border-[#E2E8F0] rounded px-3 py-2 text-sm text-navy bg-white focus:outline-none focus:ring-2 focus:ring-teal"
              >
                <option value="">All Sectors</option>
                {industries.map((ind) => (
                  <option key={ind.id} value={ind.id}>
                    {ind.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Service select */}
            <div className="flex items-center gap-2">
              <label htmlFor="service-filter" className="text-sm font-medium text-navy sr-only">
                Service
              </label>
              <select
                id="service-filter"
                value={selectedService}
                onChange={(e) => updateParam('service', e.target.value)}
                className="border border-[#E2E8F0] rounded px-3 py-2 text-sm text-navy bg-white focus:outline-none focus:ring-2 focus:ring-teal"
              >
                <option value="">All Services</option>
                {services.map((svc) => (
                  <option key={svc.id} value={svc.id}>
                    {svc.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Active filter count badge */}
            {activeFilterCount > 0 && (
              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gold text-white text-xs font-semibold">
                {activeFilterCount}
              </span>
            )}

            {/* Clear filters */}
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-sm text-teal font-medium hover:underline"
              >
                Clear Filters
              </button>
            )}

            {/* Result count */}
            <span className="ml-auto text-sm text-slate-600">
              {filtered.length} project{filtered.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="section-container">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-12">
            {filtered.map((cs) => (
              <CaseStudyCard
                key={cs.slug}
                slug={cs.slug}
                projectTitle={cs.projectTitle}
                authorizedClientName={cs.authorizedClientName}
                sectorName={cs.sectorName}
                challengeExcerpt={cs.challengeExcerpt}
                metrics={cs.metrics}
              />
            ))}
          </div>
        ) : (
          <div className="py-24 text-center">
            <p className="text-slate-600 text-lg mb-6">No projects match your filters.</p>
            {hasFilters && (
              <button
                onClick={clearFilters}
                className="text-teal font-semibold text-sm hover:underline"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
