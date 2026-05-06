import {
  Hammer,
  PanelTop,
  Shield,
  Sparkles,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { ProductCategory } from '../data/products';

type ProductImageProps = {
  category: ProductCategory;
  imageUrl?: string | null;
  alt?: string;
};

const categoryIcons: Record<ProductCategory, LucideIcon> = {
  'Mãos francesas': PanelTop,
  'Suportes metálicos': Shield,
  'Decoração em metal': Sparkles,
  'Peças sob medida': Hammer,
  'Serviços de serralheria': Wrench,
};

export default function ProductImage({ category, imageUrl, alt }: ProductImageProps) {
  const Icon = categoryIcons[category];

  return (
    <div className="relative aspect-[4/3] overflow-hidden bg-graphite">
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={alt ?? category}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      ) : (
        <>
          <div className="absolute inset-0 product-texture" />
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-gold/15" />
          <div className="absolute left-5 top-5 border border-gold/40 bg-black/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-gold backdrop-blur">
            Foto em breve
          </div>
          <div className="relative z-10 flex h-full items-center justify-center">
            <div className="grid h-24 w-24 place-items-center border border-gold/35 bg-black/35 text-gold shadow-gold backdrop-blur">
              <Icon size={42} strokeWidth={1.4} />
            </div>
          </div>
        </>
      )}
      {imageUrl && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
      )}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
    </div>
  );
}
