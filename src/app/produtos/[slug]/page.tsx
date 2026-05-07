import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import ProductImage from '@/components/ProductImage';
import ProductMeasureForm from '@/components/ProductMeasureForm';
import SectionTitle from '@/components/SectionTitle';
import { getProductBySlug } from '@/lib/products';

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Produto não encontrado | Vianna Art's Metal & Design",
    };
  }

  return {
    title: `${product.name} | Vianna Art's Metal & Design`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: product.imageUrl ? [product.imageUrl] : ['/logo/vianna-logo.png'],
    },
  };
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-black px-5 py-16 lg:px-8">
        <div className="absolute inset-0 hero-metal opacity-70" />
        <div className="relative mx-auto max-w-7xl">
          <Link
            href="/produtos"
            className="inline-flex items-center gap-2 text-sm font-semibold text-white/62 transition hover:text-gold"
          >
            <ArrowLeft size={17} />
            Voltar ao portfólio
          </Link>
          <div className="mt-8">
            <SectionTitle
              eyebrow={product.category}
              title={product.name}
              description={product.description}
            />
          </div>
        </div>
      </section>

      <section className="bg-coal px-5 py-12 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-5">
            <div className="overflow-hidden border border-white/10 shadow-hard">
              <ProductImage
                category={product.category}
                imageUrl={product.imageUrl}
                alt={product.name}
              />
            </div>
            <div className="border border-white/10 bg-graphite p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                Informações da peça
              </p>
              <dl className="mt-5 grid gap-4 text-sm md:grid-cols-2">
                <div>
                  <dt className="text-white/45">Categoria</dt>
                  <dd className="mt-1 font-semibold text-white">{product.category}</dd>
                </div>
                <div>
                  <dt className="text-white/45">Valor</dt>
                  <dd className="mt-1 font-semibold text-white">
                    {formatProductPrice(product.price, product.promotionalPrice)}
                  </dd>
                </div>
                <div>
                  <dt className="text-white/45">Produção</dt>
                  <dd className="mt-1 font-semibold text-white">
                    Artesanal e sob orientação do projeto
                  </dd>
                </div>
                <div>
                  <dt className="text-white/45">Orçamento</dt>
                  <dd className="mt-1 font-semibold text-white">
                    Ajustado conforme medidas e acabamento
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          <ProductMeasureForm product={product} />
        </div>
      </section>
    </>
  );
}

function formatProductPrice(price?: number | null, promotionalPrice?: number | null) {
  const value = promotionalPrice ?? price;

  if (!value) {
    return 'Sob consulta';
  }

  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
