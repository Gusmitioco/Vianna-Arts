import ProductsCatalog from '@/components/ProductsCatalog';
import SectionTitle from '@/components/SectionTitle';
import { getPublicProducts } from '@/lib/products';

export const metadata = {
  title: "Produtos | Vianna Art's Metal & Design",
};

export default async function ProductsPage() {
  const products = await getPublicProducts();

  return (
    <>
      <section className="relative overflow-hidden border-b border-white/10 bg-black px-5 py-20 lg:px-8">
        <div className="absolute inset-0 hero-metal opacity-70" />
        <div className="relative mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Portfólio de produtos"
            title="Peças em metal para projetos rústicos, modernos e personalizados."
            description="Explore categorias de produtos e serviços. O catálogo pode ser administrado pelo painel interno quando o Supabase estiver configurado."
          />
        </div>
      </section>

      <ProductsCatalog products={products} />
    </>
  );
}
