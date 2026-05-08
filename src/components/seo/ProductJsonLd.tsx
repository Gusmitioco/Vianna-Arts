import type { Product } from '@/data/products';
import { COMPANY } from '@/data/company';
import { SITE_URL } from '@/data/seo';

type ProductJsonLdProps = {
  product: Product;
};

export default function ProductJsonLd({ product }: ProductJsonLdProps) {
  const productUrl = `${SITE_URL}/produtos/${product.slug}`;
  const price = product.promotionalPrice ?? product.price;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.imageUrl || `${SITE_URL}/logo/vianna-logo.png`,
    category: product.category,
    brand: {
      '@type': 'Brand',
      name: COMPANY.name,
    },
    manufacturer: {
      '@type': 'LocalBusiness',
      name: COMPANY.name,
      url: SITE_URL,
      telephone: COMPANY.whatsapp,
    },
    ...(price
      ? {
          offers: {
            '@type': 'Offer',
            url: productUrl,
            priceCurrency: 'BRL',
            price,
            availability: 'https://schema.org/InStock',
            seller: {
              '@type': 'LocalBusiness',
              name: COMPANY.name,
            },
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
