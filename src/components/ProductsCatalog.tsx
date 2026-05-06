'use client';

import { useMemo, useState } from 'react';
import { CATEGORIES, type Product, type ProductCategory } from '@/data/products';
import ProductCard from './ProductCard';

type ProductsCatalogProps = {
  products: Product[];
};

type Filter = 'Todos' | ProductCategory;

export default function ProductsCatalog({ products }: ProductsCatalogProps) {
  const [activeFilter, setActiveFilter] = useState<Filter>('Todos');

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'Todos') {
      return products;
    }

    return products.filter((product) => product.category === activeFilter);
  }, [activeFilter, products]);

  const filters: Filter[] = ['Todos', ...CATEGORIES];

  return (
    <section className="bg-coal px-5 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex gap-3 overflow-x-auto pb-4">
          {filters.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={`shrink-0 border px-4 py-2.5 text-sm font-semibold transition ${
                activeFilter === filter
                  ? 'border-gold bg-gold text-coal'
                  : 'border-white/12 bg-white/[0.035] text-white/72 hover:border-gold/45 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
