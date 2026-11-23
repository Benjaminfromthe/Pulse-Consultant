const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://pulseconsultant.com'

export default function OrganizationJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Pulse Consultant Ltd',
    alternateName: 'Pulse Consultant',
    url: baseUrl,
    logo: `${baseUrl}/opengraph-image`,
    description:
      'Pulse Consultant Ltd is a leading strategic consulting and financial advisory firm delivering evidence-based solutions for sustainable business growth.',
    slogan: 'Strategic Insights. Financial Solutions. Sustainable Growth.',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '1 Broad Street, Lagos Island',
      addressLocality: 'Lagos',
      addressCountry: 'NG',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+234 800 000 0000',
      contactType: 'enquiries',
      email: 'enquiries@pulseconsultant.com',
      availableLanguage: ['English', 'French'],
    },
    sameAs: [
      'https://www.linkedin.com/company/pulse-consultant',
      'https://twitter.com/pulseconsultant',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  )
}
