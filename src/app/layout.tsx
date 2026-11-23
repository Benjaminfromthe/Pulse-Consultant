import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import OrganizationJsonLd from '@/components/seo/OrganizationJsonLd';
import Analytics from '@/components/analytics/Analytics';

const baseUrl = process.env.NEXT_PUBLIC_SERVER_URL || 'https://pulseconsultant.com';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const siteTitle =
  'Pulse Consultant Ltd | Strategic Insights. Financial Solutions. Sustainable Growth.';
const siteDescription =
  'Pulse Consultant Ltd is a leading strategic consulting and financial advisory firm delivering evidence-based solutions for sustainable business growth.';

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteTitle,
    template: '%s | Pulse Consultant Ltd',
  },
  description: siteDescription,
  keywords: [
    'financial advisory',
    'strategic consulting',
    'investment management',
    'tax planning',
    'corporate governance',
    'risk assessment',
    'business consulting Nigeria',
  ],
  authors: [{ name: 'Pulse Consultant Ltd' }],
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['fr_FR'],
    url: baseUrl,
    siteName: 'Pulse Consultant Ltd',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
    languages: {
      en: '/',
      fr: '/',
    },
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Header />
          <main>{children}</main>
          <Footer />
          <WhatsAppButton />
        </NextIntlClientProvider>
        <OrganizationJsonLd />
        <Analytics />
      </body>
    </html>
  );
}
