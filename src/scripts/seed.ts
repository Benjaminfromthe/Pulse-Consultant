/**
 * Idempotent seed script for Pulse Consultant Ltd.
 *
 * Uses the Payload Local API. For every record it first looks up by a unique key (slug)
 * and skips creation if the record already exists, so re-running never duplicates.
 * Relationships are wired from the IDs of created/existing records.
 *
 * Run against the DIRECT Supabase DSN (port 5432) for bulk inserts:
 *   $env:DATABASE_URL=$env:DIRECT_URL ; npm run seed ; Remove-Item Env:DATABASE_URL
 *
 * Wrapped in an async main() so it runs under tsx in CJS mode (no top-level await).
 */
import { getPayload } from 'payload'
import type { Where } from 'payload'
import config from '../payload.config'

type Doc = { id: number | string; [key: string]: unknown }

/** A minimal Lexical document containing a single paragraph. */
function lexicalParagraph(text: string): unknown {
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: null,
      children: [
        {
          type: 'paragraph',
          format: '',
          indent: 0,
          version: 1,
          direction: 'ltr',
          textFormat: 0,
          children: [
            { type: 'text', version: 1, detail: 0, format: 0, mode: 'normal', style: '', text },
          ],
        },
      ],
    },
  }
}

function id(doc: Doc): number | string {
  return doc.id
}

const counts: Record<string, { created: number; skipped: number }> = {
  services: { created: 0, skipped: 0 },
  industries: { created: 0, skipped: 0 },
  'case-studies': { created: 0, skipped: 0 },
  'team-members': { created: 0, skipped: 0 },
  insights: { created: 0, skipped: 0 },
}

async function main(): Promise<void> {
  const payload = await getPayload({ config })

  /** Find an existing doc by a unique field, or create it. Returns the doc + whether it was created. */
  async function seedOne(
    collection: string,
    matchField: string,
    data: Record<string, unknown>,
  ): Promise<{ doc: Doc; created: boolean }> {
    const where: Where = { [matchField]: { equals: data[matchField] as string } }
    const found = await payload.find({
      collection: collection as never,
      where,
      limit: 1,
      overrideAccess: true,
    })
    const existing = (found as unknown as { docs: Doc[] }).docs[0]
    if (existing) return { doc: existing, created: false }
    const created = await payload.create({
      collection: collection as never,
      data: data as never,
      overrideAccess: true,
    })
    return { doc: created as unknown as Doc, created: true }
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 1. Services (9)
  // ──────────────────────────────────────────────────────────────────────────
  const serviceData: Array<Record<string, unknown>> = [
    {
      slug: 'financial-advisory',
      title: 'Financial Advisory',
      category: 'financial-advisory',
      shortDescription:
        'Strategic financial planning, capital structuring, and treasury advisory that strengthen decision-making and long-term solvency.',
      overview: lexicalParagraph(
        'Our Financial Advisory practice helps boards and executive teams make confident, evidence-based decisions about capital allocation, liquidity, and growth. We combine financial modelling, scenario analysis, and deep sector knowledge to deliver recommendations that hold up under scrutiny.',
      ),
      areasOfExpertise: [
        { area: 'Capital Structuring', description: 'Optimising debt-to-equity mix and refinancing strategies.' },
        { area: 'Treasury & Liquidity Management', description: 'Cash-flow forecasting, working-capital optimisation, and liquidity buffers.' },
        { area: 'Financial Planning & Analysis', description: 'Driver-based budgeting, forecasting, and variance analysis.' },
        { area: 'Valuation & Fairness Opinions', description: 'Independent valuations for transactions and regulatory filings.' },
      ],
      methodology: [
        { step: 1, title: 'Diagnose', description: 'Review financial statements, controls, and capital structure.' },
        { step: 2, title: 'Model', description: 'Build driver-based financial models and scenarios.' },
        { step: 3, title: 'Recommend', description: 'Present prioritised, quantified recommendations.' },
        { step: 4, title: 'Implement', description: 'Support execution and track outcomes against KPIs.' },
      ],
      keyBenefits: [
        { benefit: 'Clearer visibility into cash flow and capital position' },
        { benefit: 'Quantified, board-ready recommendations' },
        { benefit: 'Reduced cost of capital through better structuring' },
        { benefit: 'Stronger financial governance and controls' },
      ],
      status: 'published',
      featuredOnHomepage: true,
      sortOrder: 1,
    },
    {
      slug: 'strategic-consulting',
      title: 'Strategic Consulting',
      category: 'strategic-consulting',
      shortDescription:
        'Corporate strategy, market entry, and growth planning that translate ambition into a focused, executable roadmap.',
      overview: lexicalParagraph(
        'We help organisations define where to play and how to win. Our Strategic Consulting engagements stress-test business models, sharpen competitive positioning, and produce roadmaps with clear owners, milestones, and metrics.',
      ),
      areasOfExpertise: [
        { area: 'Corporate Strategy', description: 'Portfolio choices, competitive positioning, and growth platforms.' },
        { area: 'Market Entry', description: 'Opportunity sizing, entry mode, and go-to-market design.' },
        { area: 'Operating Models', description: 'Aligning structure, processes, and incentives with strategy.' },
        { area: 'Strategic Planning', description: 'Multi-year planning cycles with scenario planning built in.' },
      ],
      methodology: [
        { step: 1, title: 'Frame', description: 'Define the strategic question and success measures.' },
        { step: 2, title: 'Analyse', description: 'Assess market, competitors, and internal capabilities.' },
        { step: 3, title: 'Choose', description: 'Develop and pressure-test strategic options.' },
        { step: 4, title: 'Mobilise', description: 'Convert strategy into a roadmap with owners and KPIs.' },
      ],
      keyBenefits: [
        { benefit: 'A sharper, more defensible competitive position' },
        { benefit: 'A roadmap the organisation can actually execute' },
        { benefit: 'Better resource allocation across initiatives' },
        { benefit: 'A shared language for strategy across leadership' },
      ],
      status: 'published',
      featuredOnHomepage: true,
      sortOrder: 2,
    },
    {
      slug: 'investment-management',
      title: 'Investment Management',
      category: 'investment-management',
      shortDescription:
        'Portfolio strategy, asset allocation, and investment oversight for institutions and high-net-worth principals.',
      overview: lexicalParagraph(
        'Our Investment Management advisory designs portfolio strategies aligned to objectives, risk tolerance, and liquidity needs. We bring rigorous governance and reporting so investment decisions remain disciplined through market cycles.',
      ),
      areasOfExpertise: [
        { area: 'Asset Allocation', description: 'Strategic and tactical allocation across asset classes.' },
        { area: 'Manager Selection', description: 'Due diligence and performance attribution.' },
        { area: 'Risk Budgeting', description: 'Setting and monitoring risk limits at portfolio level.' },
        { area: 'Performance Reporting', description: 'Transparent reporting against benchmarks and mandates.' },
      ],
      methodology: [
        { step: 1, title: 'Define Objectives', description: 'Clarify return targets, constraints, and risk capacity.' },
        { step: 2, title: 'Design Strategy', description: 'Set strategic allocation and manager structure.' },
        { step: 3, title: 'Govern', description: 'Establish oversight, policies, and reporting cadence.' },
        { step: 4, title: 'Review', description: 'Periodic rebalancing and performance review.' },
      ],
      keyBenefits: [
        { benefit: 'Portfolios aligned to real objectives and constraints' },
        { benefit: 'Disciplined, governance-led decision-making' },
        { benefit: 'Transparent performance and risk reporting' },
        { benefit: 'Lower behavioural drag through cycles' },
      ],
      status: 'published',
      featuredOnHomepage: true,
      sortOrder: 3,
    },
    {
      slug: 'tax-compliance',
      title: 'Tax & Compliance',
      category: 'tax-compliance',
      shortDescription:
        'Tax planning, transfer pricing, and regulatory compliance that reduce risk and protect the bottom line.',
      overview: lexicalParagraph(
        'We help organisations navigate an evolving tax and regulatory landscape. From transfer pricing to statutory compliance, our advisors identify savings, manage risk, and keep filings accurate and on time.',
      ),
      areasOfExpertise: [
        { area: 'Corporate Tax Planning', description: 'Structuring and planning to optimise effective tax rate.' },
        { area: 'Transfer Pricing', description: 'Documentation and benchmarking for related-party transactions.' },
        { area: 'Indirect Taxes', description: 'VAT, customs, and withholding tax management.' },
        { area: 'Statutory Compliance', description: 'Filing accuracy, deadlines, and audit defence.' },
      ],
      methodology: [
        { step: 1, title: 'Assess', description: 'Review current tax position and exposure.' },
        { step: 2, title: 'Plan', description: 'Identify savings and mitigation actions.' },
        { step: 3, title: 'Implement', description: 'Execute planning and documentation.' },
        { step: 4, title: 'Maintain', description: 'Ongoing compliance and monitoring.' },
      ],
      keyBenefits: [
        { benefit: 'Reduced effective tax rate within the rules' },
        { benefit: 'Lower exposure to penalties and audits' },
        { benefit: 'Robust transfer-pricing documentation' },
        { benefit: 'Reliable, on-time statutory filings' },
      ],
      status: 'published',
      featuredOnHomepage: false,
      sortOrder: 4,
    },
    {
      slug: 'risk-assessment',
      title: 'Risk Assessment',
      category: 'risk-assessment',
      shortDescription:
        'Enterprise risk identification, quantification, and mitigation that protect value before it is lost.',
      overview: lexicalParagraph(
        'Our Risk Assessment practice gives leadership a clear view of the threats that matter. We identify, quantify, and prioritise risks, then design practical controls and monitoring to keep exposure within appetite.',
      ),
      areasOfExpertise: [
        { area: 'Enterprise Risk', description: 'A consolidated view of strategic, financial, and operational risk.' },
        { area: 'Operational Risk', description: 'Process, people, and system risk mapping.' },
        { area: 'Financial Risk', description: 'Credit, market, and liquidity risk assessment.' },
        { area: 'Risk Quantification', description: 'Loss-event modelling and risk appetite setting.' },
      ],
      methodology: [
        { step: 1, title: 'Identify', description: 'Catalogue risks across the organisation.' },
        { step: 2, title: 'Assess', description: 'Score likelihood and impact; set appetite.' },
        { step: 3, title: 'Mitigate', description: 'Design controls and action plans.' },
        { step: 4, title: 'Monitor', description: 'Track KRIs and report to leadership.' },
      ],
      keyBenefits: [
        { benefit: 'A single, prioritised view of enterprise risk' },
        { benefit: 'Clear risk appetite and tolerances' },
        { benefit: 'Practical, owner-allocated mitigations' },
        { benefit: 'Earlier warning through KRI monitoring' },
      ],
      status: 'published',
      featuredOnHomepage: false,
      sortOrder: 5,
    },
    {
      slug: 'corporate-governance',
      title: 'Corporate Governance',
      category: 'corporate-governance',
      shortDescription:
        'Board effectiveness, governance frameworks, and policy design that build trust and resilience.',
      overview: lexicalParagraph(
        'Strong governance is the foundation of sustainable performance. We help boards and management design governance frameworks, sharpen oversight, and embed the policies and practices that investors and regulators expect.',
      ),
      areasOfExpertise: [
        { area: 'Board Effectiveness', description: 'Composition, evaluation, and succession.' },
        { area: 'Governance Frameworks', description: 'Charters, policies, and delegated authorities.' },
        { area: 'Committee Design', description: 'Audit, risk, and remuneration committee mandates.' },
        { area: 'Disclosure & Reporting', description: 'Governance reporting and stakeholder transparency.' },
      ],
      methodology: [
        { step: 1, title: 'Review', description: 'Benchmark current governance against good practice.' },
        { step: 2, title: 'Design', description: 'Define frameworks, charters, and policies.' },
        { step: 3, title: 'Embed', description: 'Roll out training and operating routines.' },
        { step: 4, title: 'Assure', description: 'Periodic board and governance reviews.' },
      ],
      keyBenefits: [
        { benefit: 'Clearer roles and stronger oversight' },
        { benefit: 'Policies that investors and regulators trust' },
        { benefit: 'More effective, better-composed boards' },
        { benefit: 'Transparent governance reporting' },
      ],
      status: 'published',
      featuredOnHomepage: false,
      sortOrder: 6,
    },
    {
      slug: 'business-restructuring',
      title: 'Business Restructuring',
      category: 'business-restructuring',
      shortDescription:
        'Turnaround, cost transformation, and organisational redesign that restore performance and resilience.',
      overview: lexicalParagraph(
        'When performance stalls or markets shift, we help organisations restructure with confidence. Our turnaround and cost-transformation work protects value, stabilises the business, and rebuilds a sustainable cost and operating base.',
      ),
      areasOfExpertise: [
        { area: 'Turnaround Strategy', description: 'Stabilisation plans and cash conservation.' },
        { area: 'Cost Transformation', description: 'Zero-based and structural cost reduction.' },
        { area: 'Organisational Redesign', description: 'Structure and span-of-control optimisation.' },
        { area: 'Performance Recovery', description: 'Cash, margin, and working-capital improvement.' },
      ],
      methodology: [
        { step: 1, title: 'Stabilise', description: 'Secure cash and stop the bleeding.' },
        { step: 2, title: 'Diagnose', description: 'Identify the root causes of underperformance.' },
        { step: 3, title: 'Reconfigure', description: 'Redesign cost base and operating model.' },
        { step: 4, title: 'Rebuild', description: 'Restore growth and embed a performance culture.' },
      ],
      keyBenefits: [
        { benefit: 'Rapid stabilisation of cash and operations' },
        { benefit: 'A leaner, more sustainable cost base' },
        { benefit: 'An operating model fit for the strategy' },
        { benefit: 'Renewed performance momentum' },
      ],
      status: 'published',
      featuredOnHomepage: false,
      sortOrder: 7,
    },
    {
      slug: 'capital-markets',
      title: 'Capital Markets',
      category: 'capital-markets',
      shortDescription:
        'Capital raising, transaction support, and market access advisory for issuers and investors.',
      overview: lexicalParagraph(
        'We advise issuers and investors on raising and deploying capital in African markets. From debt and equity raises to listing readiness and transaction support, we help clients move through capital markets with clarity.',
      ),
      areasOfExpertise: [
        { area: 'Capital Raising', description: 'Debt and equity issuance strategy and execution support.' },
        { area: 'Listing Readiness', description: 'Pre-listing preparation and governance for issuers.' },
        { area: 'Transaction Support', description: 'Deal structuring and execution advisory.' },
        { area: 'Market Access', description: 'Investor targeting and market-entry planning.' },
      ],
      methodology: [
        { step: 1, title: 'Position', description: 'Assess capital needs and market windows.' },
        { step: 2, title: 'Prepare', description: 'Get the business and disclosure ready.' },
        { step: 3, title: 'Execute', description: 'Support the raise through to close.' },
        { step: 4, title: 'Optimise', description: 'Manage proceeds and post-deal capital structure.' },
      ],
      keyBenefits: [
        { benefit: 'Capital raised on better terms and timing' },
        { benefit: 'Listing-ready governance and disclosure' },
        { benefit: 'Smoother transaction execution' },
        { benefit: 'Stronger investor relationships' },
      ],
      status: 'published',
      featuredOnHomepage: false,
      sortOrder: 8,
    },
    {
      slug: 'esg-sustainability',
      title: 'ESG & Sustainability',
      category: 'esg-sustainability',
      shortDescription:
        'ESG strategy, reporting, and sustainable-finance advisory that turn responsibility into advantage.',
      overview: lexicalParagraph(
        'Sustainability is now a strategic and financial imperative. We help organisations build ESG strategies, measure what matters, and report credibly to investors, regulators, and the communities they serve.',
      ),
      areasOfExpertise: [
        { area: 'ESG Strategy', description: 'Materiality, targets, and roadmap design.' },
        { area: 'ESG Reporting', description: 'Disclosure aligned to recognised frameworks.' },
        { area: 'Sustainable Finance', description: 'Green and sustainability-linked instrument support.' },
        { area: 'Climate Risk', description: 'Scenario analysis and transition planning.' },
      ],
      methodology: [
        { step: 1, title: 'Assess', description: 'Run materiality and baseline assessment.' },
        { step: 2, title: 'Strategise', description: 'Set targets and a sustainability roadmap.' },
        { step: 3, title: 'Report', description: 'Build credible, decision-useful disclosure.' },
        { step: 4, title: 'Improve', description: 'Track performance and raise ambition over time.' },
      ],
      keyBenefits: [
        { benefit: 'A focused, material ESG agenda' },
        { benefit: 'Credible reporting that builds trust' },
        { benefit: 'Access to sustainable finance' },
        { benefit: 'Resilience to climate and regulatory change' },
      ],
      status: 'published',
      featuredOnHomepage: false,
      sortOrder: 9,
    },
  ]

  const servicesBySlug = new Map<string, Doc>()
  for (const data of serviceData) {
    const { doc, created } = await seedOne('services', 'slug', data)
    servicesBySlug.set(data.slug as string, doc)
    if (created) counts.services.created += 1
    else counts.services.skipped += 1
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 2. Industries (5)
  // ──────────────────────────────────────────────────────────────────────────
  const industryData: Array<Record<string, unknown>> = [
    {
      slug: 'financial-services',
      name: 'Financial Services',
      tagline: 'Banking, insurance, and capital markets built for resilience.',
      overview: lexicalParagraph(
        'Financial services firms operate under intense scrutiny and thinning margins. We help banks, insurers, and capital-markets participants strengthen capital, manage risk, and meet rising regulatory and digital expectations.',
      ),
      challenges: [
        { challenge: 'Regulatory pressure', description: 'Evolving prudential and conduct requirements.' },
        { challenge: 'Digital disruption', description: 'Fintech competition and legacy modernisation.' },
        { challenge: 'Credit cycles', description: 'Managing asset quality through downturns.' },
      ],
      ourApproach: lexicalParagraph(
        'We pair financial-services expertise with practical delivery. Our teams embed alongside risk, finance, and strategy functions to move from diagnosis to measurable improvement.',
      ),
      stats: [
        { label: 'Institutions advised', value: '40+' },
        { label: 'Capital supported', value: '$1.2B+' },
      ],
      status: 'published',
      sortOrder: 1,
    },
    {
      slug: 'real-estate',
      name: 'Real Estate & Construction',
      tagline: 'Building durable value across the property lifecycle.',
      overview: lexicalParagraph(
        'Real estate and construction face shifting demand, financing, and ESG expectations. We advise developers, investors, and contractors on capital, project viability, and operational performance.',
      ),
      challenges: [
        { challenge: 'Capital scarcity', description: 'Tighter financing for development projects.' },
        { challenge: 'Cost volatility', description: 'Material and labour price swings.' },
        { challenge: 'ESG standards', description: 'Rising green-building and disclosure requirements.' },
      ],
      ourApproach: lexicalParagraph(
        'We bring financial rigour to project and portfolio decisions, helping clients prioritise viable schemes, structure capital, and improve delivery performance.',
      ),
      stats: [
        { label: 'Projects reviewed', value: '120+' },
        { label: 'Portfolio value', value: '$800M+' },
      ],
      status: 'published',
      sortOrder: 2,
    },
    {
      slug: 'energy',
      name: 'Energy & Natural Resources',
      tagline: 'Powering the transition with disciplined capital and risk management.',
      overview: lexicalParagraph(
        'Energy and resources companies balance transition, profitability, and stakeholder pressure. We advise on capital allocation, risk, and ESG across upstream, midstream, power, and renewables.',
      ),
      challenges: [
        { challenge: 'Energy transition', description: 'Shifting asset mix toward lower-carbon sources.' },
        { challenge: 'Price volatility', description: 'Managing exposure across commodity cycles.' },
        { challenge: 'Stakeholder pressure', description: 'Community, regulatory, and ESG demands.' },
      ],
      ourApproach: lexicalParagraph(
        'We help energy clients make capital and risk decisions that stand up to cycles and scrutiny, supporting transition planning and disciplined investment.',
      ),
      stats: [
        { label: 'Mandates delivered', value: '60+' },
        { label: 'Capital optimised', value: '$950M+' },
      ],
      status: 'published',
      sortOrder: 3,
    },
    {
      slug: 'manufacturing',
      name: 'Manufacturing & Industry',
      tagline: 'Restoring competitiveness through cost, quality, and operating model.',
      overview: lexicalParagraph(
        'Manufacturers face cost pressure, supply-chain shocks, and skills gaps. We help industrial firms restructure cost, modernise operations, and rebuild resilient supply chains.',
      ),
      challenges: [
        { challenge: 'Cost pressure', description: 'Import dependence and input inflation.' },
        { challenge: 'Supply-chain shocks', description: 'Disruption and inventory resilience.' },
        { challenge: 'Operational efficiency', description: 'Productivity and quality gaps.' },
      ],
      ourApproach: lexicalParagraph(
        'We combine operational and financial expertise to lift productivity, cut structural cost, and make operations more responsive to demand.',
      ),
      stats: [
        { label: 'Plants improved', value: '30+' },
        { label: 'Cost reduction', value: '15–30%' },
      ],
      status: 'published',
      sortOrder: 4,
    },
    {
      slug: 'healthcare',
      name: 'Healthcare & Life Sciences',
      tagline: 'Sustainable care delivery and disciplined growth.',
      overview: lexicalParagraph(
        'Healthcare providers and life-sciences firms balance access, quality, and affordability. We advise on strategy, financial sustainability, and operational performance across the sector.',
      ),
      challenges: [
        { challenge: 'Funding constraints', description: 'Pressures on reimbursement and budgets.' },
        { challenge: 'Access and capacity', description: 'Meeting demand with limited resources.' },
        { challenge: 'Regulatory complexity', description: 'Compliance and quality standards.' },
      ],
      ourApproach: lexicalParagraph(
        'We help healthcare organisations strengthen financial and operating performance while keeping patient outcomes at the centre of every decision.',
      ),
      stats: [
        { label: 'Providers advised', value: '25+' },
        { label: 'Margin improvement', value: 'Up to 8 pts' },
      ],
      status: 'published',
      sortOrder: 5,
    },
  ]

  const industriesBySlug = new Map<string, Doc>()
  for (const data of industryData) {
    const { doc, created } = await seedOne('industries', 'slug', data)
    industriesBySlug.set(data.slug as string, doc)
    if (created) counts.industries.created += 1
    else counts.industries.skipped += 1
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 3. Case studies (3, all approved for public display)
  // ──────────────────────────────────────────────────────────────────────────
  const caseStudyData: Array<Record<string, unknown>> = [
    {
      projectTitle: 'Capital Restructuring for a Tier-1 Commercial Bank',
      slug: 'capital-restructuring-tier1-bank',
      sector: id(industriesBySlug.get('financial-services')!),
      authorizedClientName: 'A Tier-1 Nigerian Commercial Bank',
      engagement: {
        businessChallenge: lexicalParagraph(
          'The bank faced a thinning capital buffer and rising non-performing loans amid a deteriorating macro environment. Leadership needed a credible plan to restore capital adequacy without curtailing lending to core clients.',
        ),
        assignmentScope: lexicalParagraph(
          'A 16-week engagement to assess the loan book, model capital trajectories under stress, and recommend a restructuring and recapitalisation roadmap.',
        ),
        consultingApproach: lexicalParagraph(
          'We combined portfolio diagnostics with scenario-based capital modelling, then worked alongside the CFO and risk committee to prioritise actions and build a board-ready plan.',
        ),
        deliverables: [
          { deliverable: 'Capital adequacy stress model and trajectory' },
          { deliverable: 'Prioritised NPL workout and provisioning plan' },
          { deliverable: 'Recapitalisation roadmap with funding options' },
        ],
      },
      results: {
        summary: lexicalParagraph(
          'The plan restored the capital buffer ahead of the regulatory deadline and reduced risk-weighted assets through targeted portfolio action.',
        ),
        metrics: [
          { metric: 'Capital adequacy', value: '+320 bps', context: 'Restored above regulatory minimum within 9 months.' },
          { metric: 'Non-performing loans', value: '-28%', context: 'Targeted workout of the legacy book.' },
          { metric: 'Operational costs', value: '-18%', context: 'Branch and process rationalisation.' },
        ],
      },
      isApprovedForPublic: true,
      featuredOnHomepage: true,
      status: 'published',
    },
    {
      projectTitle: 'Cost Transformation for a West African Energy Conglomerate',
      slug: 'cost-transformation-energy-conglomerate',
      sector: id(industriesBySlug.get('energy')!),
      authorizedClientName: 'A Leading West African Energy Conglomerate',
      engagement: {
        businessChallenge: lexicalParagraph(
          'A diversified energy group saw margins compress across volatile commodity cycles and a heavy fixed-cost base. The board needed a structural cost reset, not another round of incremental cuts.',
        ),
        assignmentScope: lexicalParagraph(
          'A group-wide cost and operating-model review across upstream, trading, and corporate functions, with a quantified, sequenced transformation plan.',
        ),
        consultingApproach: lexicalParagraph(
          'We applied zero-based costing to the cost base, benchmarked each function, and rebuilt the operating model around value-adding activities, securing leadership buy-in through a phased business case.',
        ),
        deliverables: [
          { deliverable: 'Zero-based cost baseline and benchmarks' },
          { deliverable: 'Operating-model and span-of-control redesign' },
          { deliverable: 'Sequenced transformation plan with savings tracking' },
        ],
      },
      results: {
        summary: lexicalParagraph(
          'The programme delivered a structural reduction in the cost base while protecting frontline operational capacity, improving resilience to commodity swings.',
        ),
        metrics: [
          { metric: 'Run-rate cost reduction', value: '-22%', context: 'Sustained into year two.' },
          { metric: 'Fixed-cost ratio', value: '-9 pts', context: 'Greater operating leverage.' },
          { metric: 'Cycle-time', value: '-35%', context: 'Faster decision-making in corporate functions.' },
        ],
      },
      isApprovedForPublic: true,
      featuredOnHomepage: false,
      status: 'published',
    },
    {
      projectTitle: 'Supply-Chain Resilience for a Pan-African Manufacturer',
      slug: 'supply-chain-resilience-manufacturer',
      sector: id(industriesBySlug.get('manufacturing')!),
      authorizedClientName: 'A Pan-African Manufacturing Group',
      engagement: {
        businessChallenge: lexicalParagraph(
          'Concentrated sourcing and limited inventory visibility left the manufacturer exposed to import disruption and input inflation, eroding margins and service levels.',
        ),
        assignmentScope: lexicalParagraph(
          'A diagnostic of the end-to-end supply chain followed by a resilience and cost redesign, including sourcing, inventory, and planning improvements.',
        ),
        consultingApproach: lexicalParagraph(
          'We mapped supplier risk and inventory positions, modelled exposure to disruption, and rebuilt planning parameters and dual-sourcing where it mattered most.',
        ),
        deliverables: [
          { deliverable: 'Supply-chain risk and exposure map' },
          { deliverable: 'Sourcing and inventory policy redesign' },
          { deliverable: 'Planning and S&OP capability uplift' },
        ],
      },
      results: {
        summary: lexicalParagraph(
          'The redesign improved service levels while lowering inventory and input costs, giving the group a more resilient and responsive supply chain.',
        ),
        metrics: [
          { metric: 'Inventory holding', value: '-24%', context: 'Lower working capital without service loss.' },
          { metric: 'Service level', value: '+12 pts', context: 'Improved on-time-in-full.' },
          { metric: 'Input cost', value: '-15%', context: 'Dual-sourcing and renegotiation.' },
        ],
      },
      isApprovedForPublic: true,
      featuredOnHomepage: false,
      status: 'published',
    },
  ]

  for (const data of caseStudyData) {
    const { created } = await seedOne('case-studies', 'slug', data)
    if (created) counts['case-studies'].created += 1
    else counts['case-studies'].skipped += 1
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 4. Team members (6)
  // ──────────────────────────────────────────────────────────────────────────
  const teamMemberData: Array<Record<string, unknown>> = [
    {
      fullName: 'Dr. Adaeze Okonkwo',
      slug: 'adaeze-okonkwo',
      title: 'Managing Partner — Financial Advisory',
      shortBio: 'Eighteen years advising banks and institutions on capital, risk, and governance.',
      bio: lexicalParagraph(
        'Dr. Adaeze Okonkwo leads the Financial Advisory practice. She has advised banks, insurers, and regulators across West Africa on capital adequacy, risk, and governance, and is a trusted advisor to boards navigating transformation.',
      ),
      yearsExperience: 18,
      qualifications: [
        { degree: 'PhD, Finance', institution: 'London School of Economics', year: 2012 },
        { degree: 'BSc, Economics', institution: 'University of Lagos', year: 2006 },
      ],
      certifications: [
        { name: 'CFA Charterholder', issuingBody: 'CFA Institute', year: 2011 },
        { name: 'Financial Risk Manager (FRM)', issuingBody: 'GARP', year: 2014 },
      ],
      specializations: [
        { area: 'Capital structuring' },
        { area: 'Bank risk management' },
        { area: 'Board advisory' },
      ],
      expertiseInServices: [
        id(servicesBySlug.get('financial-advisory')!),
        id(servicesBySlug.get('risk-assessment')!),
        id(servicesBySlug.get('investment-management')!),
      ],
      expertiseInIndustries: [id(industriesBySlug.get('financial-services')!)],
      isLeadership: true,
      isActive: true,
      sortOrder: 1,
    },
    {
      fullName: 'Babatunde Adeyemi',
      slug: 'babatunde-adeyemi',
      title: 'Senior Partner — Strategic Consulting',
      shortBio: 'Strategy and operating-model advisor to boards across the region.',
      bio: lexicalParagraph(
        'Babatunde Adeyemi leads Strategic Consulting. He has helped boards sharpen competitive positioning and redesign operating models across financial services, energy, and manufacturing.',
      ),
      yearsExperience: 15,
      qualifications: [
        { degree: 'MBA', institution: 'INSEAD', year: 2014 },
        { degree: 'BEng, Mechanical Engineering', institution: 'University of Ibadan', year: 2008 },
      ],
      certifications: [
        { name: 'Project Management Professional (PMP)', issuingBody: 'PMI', year: 2016 },
        { name: 'Lean Six Sigma Black Belt', issuingBody: 'IASSC', year: 2018 },
      ],
      specializations: [
        { area: 'Corporate strategy' },
        { area: 'Operating-model design' },
        { area: 'Growth and market entry' },
      ],
      expertiseInServices: [
        id(servicesBySlug.get('strategic-consulting')!),
        id(servicesBySlug.get('business-restructuring')!),
      ],
      expertiseInIndustries: [
        id(industriesBySlug.get('manufacturing')!),
        id(industriesBySlug.get('energy')!),
      ],
      isLeadership: true,
      isActive: true,
      sortOrder: 2,
    },
    {
      fullName: 'Chioma Eze',
      slug: 'chioma-eze',
      title: 'Director — Investment Management',
      shortBio: 'Portfolio strategy and governance for institutions and principals.',
      bio: lexicalParagraph(
        'Chioma Eze directs the Investment Management practice, advising institutions and high-net-worth principals on asset allocation, manager selection, and portfolio governance.',
      ),
      yearsExperience: 12,
      qualifications: [
        { degree: 'MSc, Quantitative Finance', institution: 'University of Cape Town', year: 2015 },
        { degree: 'BSc, Mathematics', institution: 'University of Nigeria, Nsukka', year: 2012 },
      ],
      certifications: [
        { name: 'CFA Charterholder', issuingBody: 'CFA Institute', year: 2017 },
        { name: 'Chartered Alternative Investment Analyst (CAIA)', issuingBody: 'CAIA Association', year: 2019 },
      ],
      specializations: [
        { area: 'Asset allocation' },
        { area: 'Manager due diligence' },
        { area: 'Portfolio governance' },
      ],
      expertiseInServices: [
        id(servicesBySlug.get('investment-management')!),
        id(servicesBySlug.get('capital-markets')!),
      ],
      expertiseInIndustries: [id(industriesBySlug.get('financial-services')!)],
      isLeadership: false,
      isActive: true,
      sortOrder: 3,
    },
    {
      fullName: 'Ibrahim Musa',
      slug: 'ibrahim-musa',
      title: 'Senior Consultant — Risk Assessment',
      shortBio: 'Enterprise and operational risk specialist for regulated firms.',
      bio: lexicalParagraph(
        'Ibrahim Musa is a Senior Consultant in the Risk Assessment practice, helping firms quantify enterprise and operational risk and embed practical controls.',
      ),
      yearsExperience: 9,
      qualifications: [
        { degree: 'MBA', institution: 'Lagos Business School', year: 2019 },
        { degree: 'BSc, Accounting', institution: 'Ahmadu Bello University', year: 2015 },
      ],
      certifications: [
        { name: 'Financial Risk Manager (FRM)', issuingBody: 'GARP', year: 2020 },
        { name: 'Certified Information Systems Auditor (CISA)', issuingBody: 'ISACA', year: 2021 },
      ],
      specializations: [
        { area: 'Enterprise risk management' },
        { area: 'Operational risk' },
        { area: 'Risk quantification' },
      ],
      expertiseInServices: [id(servicesBySlug.get('risk-assessment')!)],
      expertiseInIndustries: [
        id(industriesBySlug.get('financial-services')!),
        id(industriesBySlug.get('energy')!),
      ],
      isLeadership: false,
      isActive: true,
      sortOrder: 4,
    },
    {
      fullName: 'Funke Williams',
      slug: 'funke-williams',
      title: 'Senior Consultant — Tax & Compliance',
      shortBio: 'Tax planning and transfer-pricing advisor to multinational groups.',
      bio: lexicalParagraph(
        'Funke Williams is a Senior Consultant in the Tax & Compliance practice, advising groups on tax planning, transfer pricing, and statutory compliance.',
      ),
      yearsExperience: 11,
      qualifications: [
        { degree: 'MSc, Taxation', institution: 'University of Lagos', year: 2017 },
        { degree: 'LLB, Law', institution: 'University of Ibadan', year: 2013 },
      ],
      certifications: [
        { name: 'Chartered Tax Administrator', issuingBody: 'CITN', year: 2018 },
        { name: 'Association of Chartered Certified Accountants (ACCA)', issuingBody: 'ACCA', year: 2020 },
      ],
      specializations: [
        { area: 'Corporate tax planning' },
        { area: 'Transfer pricing' },
        { area: 'Statutory compliance' },
      ],
      expertiseInServices: [id(servicesBySlug.get('tax-compliance')!)],
      expertiseInIndustries: [
        id(industriesBySlug.get('manufacturing')!),
        id(industriesBySlug.get('real-estate')!),
      ],
      isLeadership: false,
      isActive: true,
      sortOrder: 5,
    },
    {
      fullName: 'Kwame Mensah',
      slug: 'kwame-mensah',
      title: 'Consultant — ESG & Sustainability',
      shortBio: 'ESG strategy and reporting for African enterprises.',
      bio: lexicalParagraph(
        'Kwame Mensah is a Consultant in the ESG & Sustainability practice, helping organisations build material ESG strategies and report credibly to stakeholders.',
      ),
      yearsExperience: 7,
      qualifications: [
        { degree: 'MSc, Sustainability', institution: 'University of Edinburgh', year: 2020 },
        { degree: 'BSc, Environmental Science', institution: 'Kwame Nkrumah University of Science and Technology', year: 2017 },
      ],
      certifications: [
        { name: 'GRI Sustainability Reporting Certificate', issuingBody: 'GRI', year: 2021 },
        { name: 'SASB Fundamentals Credential', issuingBody: 'SASB', year: 2022 },
      ],
      specializations: [
        { area: 'ESG strategy' },
        { area: 'ESG reporting' },
        { area: 'Climate risk' },
      ],
      expertiseInServices: [id(servicesBySlug.get('esg-sustainability')!)],
      expertiseInIndustries: [
        id(industriesBySlug.get('energy')!),
        id(industriesBySlug.get('manufacturing')!),
      ],
      isLeadership: false,
      isActive: true,
      sortOrder: 6,
    },
  ]

  const teamBySlug = new Map<string, Doc>()
  for (const data of teamMemberData) {
    const { doc, created } = await seedOne('team-members', 'slug', data)
    teamBySlug.set(data.slug as string, doc)
    if (created) counts['team-members'].created += 1
    else counts['team-members'].skipped += 1
  }

  // ──────────────────────────────────────────────────────────────────────────
  // 5. Insights (3)
  // ──────────────────────────────────────────────────────────────────────────
  const insightData: Array<Record<string, unknown>> = [
    {
      title: 'Navigating Nigeria Capital Markets in 2026',
      slug: 'navigating-nigeria-capital-markets-2026',
      type: 'market-analysis',
      excerpt:
        'A look at the issuance windows, listing readiness, and investor dynamics shaping Nigerian capital markets in the year ahead.',
      body: lexicalParagraph(
        'Capital markets in Nigeria are entering a year of renewed activity. For issuers, the window to raise capital at attractive terms depends on listing readiness, credible governance, and a clear equity story. We outline the conditions shaping 2026 and what preparatory work pays off now.',
      ),
      author: id(teamBySlug.get('adaeze-okonkwo')!),
      relatedServices: [
        id(servicesBySlug.get('capital-markets')!),
        id(servicesBySlug.get('financial-advisory')!),
      ],
      relatedIndustries: [id(industriesBySlug.get('financial-services')!)],
      tags: [{ tag: 'Capital Markets' }, { tag: 'Nigeria' }, { tag: 'Listing Readiness' }],
      publishedAt: '2026-01-20T00:00:00.000Z',
      isFeatured: true,
      status: 'published',
    },
    {
      title: 'Corporate Governance Best Practices for Growing Firms',
      slug: 'corporate-governance-best-practices-growing-firms',
      type: 'white-paper',
      excerpt:
        'How growing firms can build governance that scales with ambition, earns investor trust, and withstands scrutiny.',
      body: lexicalParagraph(
        'As firms grow, governance that once depended on founders needs to mature. This white paper sets out practical governance practices, board structures, and policies that help growing firms scale responsibly and attract patient capital.',
      ),
      author: id(teamBySlug.get('babatunde-adeyemi')!),
      relatedServices: [id(servicesBySlug.get('corporate-governance')!)],
      relatedIndustries: [
        id(industriesBySlug.get('financial-services')!),
        id(industriesBySlug.get('manufacturing')!),
      ],
      tags: [{ tag: 'Governance' }, { tag: 'Boards' }, { tag: 'Growth' }],
      publishedAt: '2025-11-08T00:00:00.000Z',
      isFeatured: false,
      status: 'published',
    },
    {
      title: 'Why ESG Reporting Matters for African Enterprises',
      slug: 'why-esg-reporting-matters-african-enterprises',
      type: 'article',
      excerpt:
        'Credible ESG reporting is becoming a condition of access to capital, markets, and talent across the continent.',
      body: lexicalParagraph(
        'ESG reporting has moved from a nice-to-have to a business necessity. For African enterprises, credible disclosure increasingly determines access to capital, supplier relationships, and talent. We explain what to report, why materiality matters, and how to start.',
      ),
      author: id(teamBySlug.get('kwame-mensah')!),
      relatedServices: [id(servicesBySlug.get('esg-sustainability')!)],
      relatedIndustries: [
        id(industriesBySlug.get('energy')!),
        id(industriesBySlug.get('manufacturing')!),
      ],
      tags: [{ tag: 'ESG' }, { tag: 'Sustainability Reporting' }, { tag: 'Africa' }],
      publishedAt: '2025-09-15T00:00:00.000Z',
      isFeatured: false,
      status: 'published',
    },
  ]

  for (const data of insightData) {
    const { created } = await seedOne('insights', 'slug', data)
    if (created) counts.insights.created += 1
    else counts.insights.skipped += 1
  }

  // ──────────────────────────────────────────────────────────────────────────
  // Summary
  // ──────────────────────────────────────────────────────────────────────────
  const totalCreated =
    counts.services.created +
    counts.industries.created +
    counts['case-studies'].created +
    counts['team-members'].created +
    counts.insights.created
  const totalSkipped =
    counts.services.skipped +
    counts.industries.skipped +
    counts['case-studies'].skipped +
    counts['team-members'].skipped +
    counts.insights.skipped

  console.log('--- Pulse Consultant seed complete ---')
  console.log(`Services:      ${counts.services.created} created, ${counts.services.skipped} skipped`)
  console.log(`Industries:    ${counts.industries.created} created, ${counts.industries.skipped} skipped`)
  console.log(`Case studies:  ${counts['case-studies'].created} created, ${counts['case-studies'].skipped} skipped`)
  console.log(`Team members:  ${counts['team-members'].created} created, ${counts['team-members'].skipped} skipped`)
  console.log(`Insights:      ${counts.insights.created} created, ${counts.insights.skipped} skipped`)
  console.log(`Total:         ${totalCreated} created, ${totalSkipped} skipped`)

  await payload.destroy()
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
