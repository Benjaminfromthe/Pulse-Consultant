import type { Metadata } from 'next';
import { Playfair_Display, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import WhatsAppButton from '@/components/ui/WhatsAppButton';

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

export const metadata: Metadata = {
  title: 'Pulse Consultant Ltd | Strategic Insights. Financial Solutions. Sustainable Growth.',
  description:
    'Pulse Consultant Ltd provides expert financial advisory, strategic consulting, investment management, and corporate governance services. Partner with us for sustainable business growth.',
  keywords: [
    'financial advisory',
    'strategic consulting',
    'investment management',
    'tax planning',
    'corporate governance',
    'risk assessment',
    'business consulting Nigeria',
  ],
  openGraph: {
    title: 'Pulse Consultant Ltd | Strategic Insights. Financial Solutions. Sustainable Growth.',
    description:
      'Expert financial advisory and strategic consulting services for sustainable business growth.',
    type: 'website',
    locale: 'en_NG',
    siteName: 'Pulse Consultant Ltd',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pulse Consultant Ltd',
    description: 'Strategic Insights. Financial Solutions. Sustainable Growth.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
