import { MessageCircle } from 'lucide-react';
import { COMPANY } from '../data/company';
import type { Product } from '../data/products';
import ProductImage from './ProductImage';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const message = encodeURIComponent(
    `Olá! Tenho interesse em saber mais sobre: ${product.name}.`,
  );

  return (
    <article className="group overflow-hidden border border-white/10 bg-iron/80 shadow-hard transition duration-300 hover:-translate-y-1 hover:border-gold/45">
      <ProductImage
        category={product.category}
        imageUrl={product.imageUrl}
        alt={product.name}
      />
      <div className="p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
          {product.category}
        </p>
        <h3 className="mt-3 text-xl font-semibold text-white">{product.name}</h3>
        <Price product={product} />
        <p className="mt-3 min-h-20 text-sm leading-7 text-white/62">
          {product.description}
        </p>
        <a
          href={`${COMPANY.whatsappUrl}?text=${message}`}
          className="mt-5 inline-flex items-center gap-2 border border-gold/70 px-4 py-2.5 text-sm font-semibold text-gold transition hover:bg-gold hover:text-coal"
        >
          <MessageCircle size={16} />
          Tenho interesse
        </a>
      </div>
    </article>
  );
}

function Price({ product }: { product: Product }) {
  if (!product.price && !product.promotionalPrice) {
    return (
      <p className="mt-3 text-sm font-semibold text-white/58">Preço sob consulta</p>
    );
  }

  const value = product.promotionalPrice ?? product.price;

  return (
    <div className="mt-3 flex flex-wrap items-center gap-3">
      {product.promotionalPrice && product.price && (
        <span className="text-sm text-white/42 line-through">
          {formatCurrency(product.price)}
        </span>
      )}
      {value && (
        <span className="text-lg font-bold text-white">{formatCurrency(value)}</span>
      )}
      {product.promotionalPrice && (
        <span className="border border-gold/45 px-2 py-1 text-xs font-bold uppercase tracking-[0.14em] text-gold">
          Promoção
        </span>
      )}
    </div>
  );
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}
