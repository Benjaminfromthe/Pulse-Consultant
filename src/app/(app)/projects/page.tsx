import { Suspense } from 'react'
import { getPayloadClient } from '@/lib/payload'
import Link from 'next/link'
import ProjectsClient, { type CaseStudyItem, type FilterOption } from './ProjectsClient'

export const metadata = {
  title: 'Projects & Portfolio',
  description:
    'Explore our case studies and discover how we have helped clients achieve measurable results across industries.',
  alternates: { canonical: '/projects' },
}

function extractPlainText(val: unknown): string {
  try {
    if (typeof val === 'string') return val
    if (val && typeof val === 'object') {
      const obj = val as Record<string, unknown>
      if (obj.root && typeof obj.root === 'object') {
        const root = obj.root as Record<string, unknown>
        if (Array.isArray(root.children)) {
          const texts: string[] = []
          for (const child of root.children) {
            if (child && typeof child === 'object') {
              const node = child as Record<string, unknown>
              if (node.type === 'paragraph' && Array.isArray(node.children)) {
                for (const inline of node.children as Record<string, unknown>[]) {
                  if (typeof inline.text === 'string') texts.push(inline.text)
                }
              }
            }
            if (texts.join('').length > 150) break
          }
          const joined = texts.join(' ')
          return joined.length > 150 ? joined.slice(0, 150) + '…' : joined
        }
      }
    }
  } catch {
    // ignore
  }
  return ''
}

interface NormalizedCaseStudy extends CaseStudyItem {
  relatedServiceIds: string[]
}

function normalizeCaseStudy(doc: Record<string, unknown>): NormalizedCaseStudy {
  const projectTitle = typeof doc.projectTitle === 'string' ? doc.projectTitle : ''
  const slug = typeof doc.slug === 'string' ? doc.slug : ''
  const authorizedClientName =
    typeof doc.authorizedClientName === 'string' ? doc.authorizedClientName : undefined

  let sectorName: string | undefined
  let sectorId: string | undefined
  if (doc.sector && typeof doc.sector === 'object') {
    const sector = doc.sector as Record<string, unknown>
    sectorName = typeof sector.name === 'string' ? sector.name : undefined
    sectorId = typeof sector.id === 'string' ? sector.id : String(sector.id ?? '')
  }

  const engagement =
    doc.engagement && typeof doc.engagement === 'object'
      ? (doc.engagement as Record<string, unknown>)
      : null
  const challengeExcerpt = engagement
    ? extractPlainText(engagement.businessChallenge)
    : ''

  const resultsObj =
    doc.results && typeof doc.results === 'object'
      ? (doc.results as Record<string, unknown>)
      : null
  const rawMetrics = resultsObj?.metrics
  const metrics = Array.isArray(rawMetrics)
    ? (rawMetrics as Array<Record<string, unknown>>).slice(0, 3).map((m) => ({
        metric: typeof m.metric === 'string' ? m.metric : '',
        value: typeof m.value === 'string' ? m.value : '',
        context: typeof m.context === 'string' ? m.context : undefined,
      }))
    : []

  const rawRelated = doc.relatedService
  const relatedServiceIds: string[] = Array.isArray(rawRelated)
    ? rawRelated.map((r) => {
        if (r && typeof r === 'object') {
          const rel = r as Record<string, unknown>
          return typeof rel.id === 'string' ? rel.id : String(rel.id ?? '')
        }
        return String(r)
      })
    : []

  return {
    slug,
    projectTitle,
    authorizedClientName,
    sectorName,
    sectorId,
    challengeExcerpt: challengeExcerpt || undefined,
    metrics: metrics.length > 0 ? metrics : undefined,
    relatedServiceIds,
  }
}

export default async function ProjectsPage() {
  let caseStudies: CaseStudyItem[] = []
  let industries: FilterOption[] = []
  let services: FilterOption[] = []

  try {
    const payload = await getPayloadClient()

    const [csResult, indResult, svcResult] = await Promise.all([
      payload.find({
        collection: 'case-studies',
        where: {
          isApprovedForPublic: { equals: true },
          status: { equals: 'published' },
        },
        depth: 2,
        limit: 100,
      }),
      payload.find({
        collection: 'industries',
        where: { status: { equals: 'published' } },
        limit: 50,
      }),
      payload.find({
        collection: 'services',
        where: { status: { equals: 'published' } },
        limit: 50,
      }),
    ])

    caseStudies = csResult.docs.map((doc) =>
      normalizeCaseStudy(doc as unknown as Record<string, unknown>),
    )

    industries = indResult.docs.map((ind) => ({
      id: String(ind.id),
      label: typeof ind.name === 'string' ? ind.name : String(ind.name ?? ''),
    }))

    services = svcResult.docs.map((svc) => ({
      id: String(svc.id),
      label: typeof svc.title === 'string' ? svc.title : String(svc.title ?? ''),
    }))
  } catch {
    caseStudies = []
    industries = []
    services = []
  }

  return (
    <div className="flex flex-col w-full">
      {/* Hero section */}
      <section className="w-full bg-[#10243D] text-white px-margin-mobile py-space-2xl md:px-margin-desktop">
        <div className="flex items-center gap-1 font-label-sm text-label-sm text-white/40 mb-4 text-xs">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="material-symbols-outlined text-[14px]">chevron_right</span>
          <span className="text-[#C5A15B]">Projects</span>
        </div>
        <div className="flex items-center gap-1 mb-3">
          <span className="material-symbols-outlined text-[16px] text-[#C5A15B]">workspace_premium</span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-[#C5A15B] font-semibold">Proven Track Record</span>
        </div>
        <h1 className="font-headline-lg-mobile text-headline-lg-mobile text-white font-semibold leading-tight mb-3">
          Projects &amp; Portfolio
        </h1>
        <p className="font-body-md text-body-md text-white/70 leading-relaxed max-w-2xl">
          High-stakes African corporate transactions resolved through strategic precision.
          All case studies published with explicit client authorisation.
        </p>
      </section>

      {/* Filter + Grid */}
      <Suspense
        fallback={
          <div className="px-margin-mobile py-space-2xl text-center text-on-surface-variant font-body-md text-body-md">
            Loading projects…
          </div>
        }
      >
        <ProjectsClient
          caseStudies={caseStudies}
          industries={industries}
          services={services}
        />
      </Suspense>
    </div>
  )
}
