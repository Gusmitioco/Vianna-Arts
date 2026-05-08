import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScrollManager from '@/components/SmoothScrollManager';
import LocalBusinessJsonLd from '@/components/seo/LocalBusinessJsonLd';
import { LOCAL_SEO, SITE_URL } from '@/data/seo';
import '@/styles/index.css';

const googleSiteVerification =
  process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Vianna Art's Metal & Design | Serralheria em Teixeira de Freitas",
    template: "%s | Vianna Art's Metal & Design",
  },
  description:
    "Serralheria em Teixeira de Freitas - BA. Peças em metal sob medida, mãos francesas, suportes metálicos, metal com madeira e instalação gratuita.",
  keywords: LOCAL_SEO.serviceKeywords,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Vianna Art's Metal & Design | Serralheria em Teixeira de Freitas",
    description:
      'Peças em metal sob medida, metal com madeira, suportes e serviços de serralheria em Teixeira de Freitas - BA.',
    url: SITE_URL,
    siteName: "Vianna Art's Metal & Design",
    locale: 'pt_BR',
    type: 'website',
    images: ['/logo/vianna-logo.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Vianna Art's Metal & Design",
    description:
      'Serralheria em Teixeira de Freitas com peças em metal sob medida.',
    images: ['/logo/vianna-logo.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: googleSiteVerification
    ? {
        google: googleSiteVerification,
      }
    : undefined,
  icons: {
    icon: '/logo/va-logo.png',
    shortcut: '/logo/va-logo.png',
    apple: '/logo/va-logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-coal text-ivory">
        <LocalBusinessJsonLd />
        <SmoothScrollManager />
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
