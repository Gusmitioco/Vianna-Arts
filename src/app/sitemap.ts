import type { MetadataRoute } from 'next';
import { SERVICES } from '@/data/services';
import { getPublicProducts } from '@/lib/products';
import { SITE_URL } from '@/data/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getPublicProducts();
  const now = new Date();

  return [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/produtos`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/servicos`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...SERVICES.map((service) => ({
      url: `${SITE_URL}/servicos/${service.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: `${SITE_URL}/produtos/${product.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
