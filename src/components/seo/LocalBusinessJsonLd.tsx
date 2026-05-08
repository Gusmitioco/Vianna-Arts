import { COMPANY } from '@/data/company';
import { LOCAL_SEO, SITE_URL } from '@/data/seo';

export default function LocalBusinessJsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: COMPANY.name,
    image: `${SITE_URL}/logo/vianna-logo.png`,
    url: SITE_URL,
    telephone: COMPANY.whatsapp,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. Presidente Getúlio Vargas, 3040, Centro',
      addressLocality: LOCAL_SEO.city,
      addressRegion: LOCAL_SEO.state,
      addressCountry: 'BR',
    },
    areaServed: {
      '@type': 'City',
      name: `${LOCAL_SEO.city} - ${LOCAL_SEO.state}`,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '16:00',
      },
    ],
    sameAs: [COMPANY.instagramUrl],
    founder: {
      '@type': 'Person',
      name: COMPANY.owner,
    },
    makesOffer: LOCAL_SEO.serviceKeywords.map((keyword) => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: keyword,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
