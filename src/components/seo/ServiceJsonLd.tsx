import { COMPANY } from '@/data/company';
import type { Service } from '@/data/services';
import { LOCAL_SEO, SITE_URL } from '@/data/seo';

type ServiceJsonLdProps = {
  service: Service;
};

export default function ServiceJsonLd({ service }: ServiceJsonLdProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.description,
    serviceType: service.shortTitle,
    areaServed: {
      '@type': 'City',
      name: `${LOCAL_SEO.city} - ${LOCAL_SEO.state}`,
    },
    provider: {
      '@type': 'LocalBusiness',
      name: COMPANY.name,
      url: SITE_URL,
      telephone: COMPANY.whatsapp,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Av. Presidente Getúlio Vargas, 3040, Centro',
        addressLocality: LOCAL_SEO.city,
        addressRegion: LOCAL_SEO.state,
        addressCountry: 'BR',
      },
    },
    url: `${SITE_URL}/servicos/${service.slug}`,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'BRL',
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
