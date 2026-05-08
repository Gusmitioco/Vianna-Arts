import ProductsCatalog from '@/components/ProductsCatalog';
import SectionTitle from '@/components/SectionTitle';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import { LOCAL_SEO, SITE_URL } from '@/data/seo';
import { getPublicProducts } from '@/lib/products';

export const metadata = {
  title: 'Produtos e serviços de serralheria em Teixeira de Freitas',
  description:
    "Portfólio da Vianna Art's com mãos francesas, suportes metálicos, peças em metal com madeira e projetos sob medida em Teixeira de Freitas - BA.",
  alternates: {
    canonical: '/produtos',
  },
  openGraph: {
    title: "Produtos | Vianna Art's Metal & Design",
    description:
      'Peças em metal sob medida, suportes, mãos francesas e serviços de serralheria em Teixeira de Freitas.',
    url: `${SITE_URL}/produtos`,
    images: ['/logo/vianna-logo.png'],
  },
};

export default async function ProductsPage() {
  const products = await getPublicProducts();

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Início', url: SITE_URL },
          { name: 'Produtos', url: `${SITE_URL}/produtos` },
        ]}
      />

      <section className="relative overflow-hidden border-b border-white/10 bg-black px-5 py-20 lg:px-8">
        <div className="absolute inset-0 hero-metal opacity-70" />
        <div className="relative mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Portfólio de produtos"
            title="Peças em metal, suportes e projetos sob medida em Teixeira de Freitas."
            description={`Explore produtos e serviços da Vianna Art's para ${LOCAL_SEO.region}: mãos francesas, suportes metálicos, decoração em metal, peças com madeira e serralheria sob medida.`}
          />
        </div>
      </section>

      <ProductsCatalog products={products} />
    </>
  );
}
