import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payload'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://pulseconsultant.com'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/projects`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/team`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/insights`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'yearly', priority: 0.6 },
  ]

  try {
    const payload = await getPayloadClient()

    const [services, industries, caseStudies, insights] = await Promise.all([
      payload.find({
        collection: 'services',
        where: { status: { equals: 'published' } },
        limit: 1000,
      }),
      payload.find({
        collection: 'industries',
        where: { status: { equals: 'published' } },
        limit: 1000,
      }),
      payload.find({
        collection: 'case-studies',
        where: {
          and: [
            { isApprovedForPublic: { equals: true } },
            { status: { equals: 'published' } },
          ],
        },
        limit: 1000,
      }),
      payload.find({
        collection: 'insights',
        where: { status: { equals: 'published' } },
        limit: 1000,
      }),
    ])

    const toEntry = (
      pathPrefix: string,
      doc: Record<string, unknown>,
      changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
      priority: number,
    ): MetadataRoute.Sitemap[number] => {
      const slug = typeof doc.slug === 'string' ? doc.slug : ''
      const lastModified =
        typeof doc.updatedAt === 'string' && doc.updatedAt
          ? new Date(doc.updatedAt)
          : now
      return {
        url: `${baseUrl}${pathPrefix}/${slug}`,
        lastModified,
        changeFrequency,
        priority,
      }
    }

    return [
      ...staticRoutes,
      ...services.docs.map((d) =>
        toEntry('/services', d as Record<string, unknown>, 'monthly', 0.8),
      ),
      ...industries.docs.map((d) =>
        toEntry('/industries', d as Record<string, unknown>, 'monthly', 0.7),
      ),
      ...caseStudies.docs.map((d) =>
        toEntry('/projects', d as Record<string, unknown>, 'monthly', 0.8),
      ),
      ...insights.docs.map((d) =>
        toEntry('/insights', d as Record<string, unknown>, 'monthly', 0.7),
      ),
    ]
  } catch {
    // Payload unavailable — return only the static routes
    return staticRoutes
  }
}
