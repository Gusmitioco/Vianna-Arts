import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SmoothScrollManager from '@/components/SmoothScrollManager';
import '@/styles/index.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://vianna-arts.vercel.app'),
  title: "Vianna Art's Metal & Design",
  description:
    "Peças em metal feitas à mão, unindo resistência, rusticidade e design. Portfólio institucional da Vianna Art's Metal & Design.",
  openGraph: {
    title: "Vianna Art's Metal & Design",
    description:
      'Peças em metal feitas à mão, unindo resistência, rusticidade e design.',
    images: ['/logo/vianna-logo.png'],
  },
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
        <SmoothScrollManager />
        <Header />
        <main>{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
