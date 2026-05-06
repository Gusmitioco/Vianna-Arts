import Link from 'next/link';
import type { Product } from '../data/products';
import ProductCard from './ProductCard';
import SectionTitle from './SectionTitle';

type FeaturedProductsProps = {
  products: Product[];
};

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section className="bg-coal px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionTitle
            eyebrow="Produtos em destaque"
            title="Peças para compor projetos com presença e durabilidade."
            description="Uma seleção inicial do portfólio, com modelos que representam a força estética e funcional do trabalho em metal."
          />
          <Link
            href="/produtos"
            className="w-fit border border-gold px-5 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-gold transition hover:bg-gold hover:text-coal"
          >
            Ver portfólio
          </Link>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
