interface ConsultingServiceJsonLdProps {
  name: string
  description?: string
  serviceType?: string
  url: string
}

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://pulseconsultant.com'

export default function ConsultingServiceJsonLd({
  name,
  description,
  serviceType,
  url,
}: ConsultingServiceJsonLdProps) {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    url: `${baseUrl}${url}`,
    provider: {
      '@type': 'Organization',
      name: 'Pulse Consultant Ltd',
      url: baseUrl,
    },
    areaServed: {
      '@type': 'Country',
      name: 'Nigeria',
    },
  }

  if (description) jsonLd.description = description
  if (serviceType) jsonLd.serviceType = serviceType

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  )
}
