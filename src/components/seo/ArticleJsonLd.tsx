interface ArticleJsonLdProps {
  title: string
  description?: string
  url: string
  datePublished?: string
  authorName?: string
}

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://pulseconsultant.com'

export default function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  authorName,
}: ArticleJsonLdProps) {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    url: `${baseUrl}${url}`,
    publisher: {
      '@type': 'Organization',
      name: 'Pulse Consultant Ltd',
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/opengraph-image`,
      },
    },
  }

  if (description) jsonLd.description = description
  if (datePublished) jsonLd.datePublished = datePublished
  if (authorName) {
    jsonLd.author = {
      '@type': 'Person',
      name: authorName,
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  )
}
