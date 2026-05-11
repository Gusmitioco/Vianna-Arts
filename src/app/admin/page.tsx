import Link from 'next/link';
import { signOutAction } from '@/app/admin/actions';
import DeleteProductButton from '@/components/admin/DeleteProductButton';
import ProductAdminForm from '@/components/admin/ProductAdminForm';
import ProductImage from '@/components/ProductImage';
import { hasSupabaseConfig } from '@/lib/env';
import { requireAdmin } from '@/lib/auth';
import { getAdminProducts } from '@/lib/products';

type AdminPageProps = {
  searchParams: Promise<{ success?: string; error?: string }>;
};

export const metadata = {
  title: "Admin | Vianna Art's Metal & Design",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;

  if (!hasSupabaseConfig()) {
    return <AdminSetupNotice />;
  }

  const admin = await requireAdmin();
  const products = await getAdminProducts();
  const publishedProducts = products.filter((product) => product.isPublished).length;
  const featuredProducts = products.filter((product) => product.featured).length;
  const productsWithImages = products.filter((product) => product.imageUrl).length;

  return (
    <section className="bg-coal px-5 py-12 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-5 border-b border-white/10 pb-8 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">
              Painel administrativo
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold text-white md:text-5xl">
              Gestão do catálogo
            </h1>
            <p className="mt-4 text-sm text-white/62">
              Logado como {admin.email}. Edite produtos, preços, promoções,
              fotos e publicação.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="border border-white/15 px-4 py-3 text-sm font-semibold text-white/72 hover:border-gold hover:text-gold"
            >
              Ver site
            </Link>
            <form action={signOutAction}>
              <button
                type="submit"
                className="border border-gold bg-gold px-4 py-3 text-sm font-semibold text-coal hover:bg-transparent hover:text-gold"
              >
                Sair
              </button>
            </form>
          </div>
        </div>

        {(params.success || params.error) && (
          <p
            className={`mt-6 border p-3 text-sm ${
              params.success
                ? 'border-gold/35 bg-gold/10 text-gold'
                : 'border-red-400/35 bg-red-500/10 text-red-100'
            }`}
          >
            {getAdminFeedback(params.success, params.error)}
          </p>
        )}

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <AdminMetric label="Produtos cadastrados" value={products.length} />
          <AdminMetric label="Produtos publicados" value={publishedProducts} />
          <AdminMetric label="Produtos com foto" value={productsWithImages} />
        </div>

        <div className="mt-10 grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="border border-white/10 bg-graphite p-6 shadow-hard">
            <h2 className="font-display text-3xl font-semibold text-white">
              Novo produto
            </h2>
            <ProductAdminForm />
          </div>

          <div className="space-y-5">
            <div className="border border-white/10 bg-white/[0.025] p-5">
              <h2 className="font-display text-3xl font-semibold text-white">
                Produtos cadastrados
              </h2>
              <p className="mt-2 text-sm text-white/55">
                {featuredProducts} em destaque. Use a edição para trocar fotos,
                preços, promoções e publicação.
              </p>
            </div>

            {products.length === 0 && (
              <div className="border border-white/10 bg-graphite p-6 text-sm leading-7 text-white/62">
                Nenhum produto cadastrado ainda. Crie o primeiro produto no
                formulário ao lado.
              </div>
            )}

            {products.map((product) => (
              <article
                key={product.id}
                className="border border-white/10 bg-graphite p-5 shadow-hard"
              >
                <div className="grid gap-4 md:grid-cols-[180px_1fr]">
                  <div className="overflow-hidden border border-white/10">
                    <ProductImage
                      category={product.category}
                      imageUrl={product.imageUrl}
                      alt={product.name}
                    />
                  </div>
                  <div className="flex flex-col justify-between gap-4 md:flex-row">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                        {product.category}
                      </p>
                      <h3 className="mt-2 text-2xl font-semibold text-white">
                        {product.name}
                      </h3>
                      <p className="mt-2 text-sm leading-7 text-white/60">
                        {product.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
                        <span className="border border-white/10 bg-white/[0.035] px-2.5 py-1.5 text-white/62">
                          {product.isPublished ? 'Publicado' : 'Rascunho'}
                        </span>
                        <span className="border border-white/10 bg-white/[0.035] px-2.5 py-1.5 text-white/62">
                          {product.featured ? 'Destaque' : 'Sem destaque'}
                        </span>
                        <span className="border border-gold/35 bg-gold/10 px-2.5 py-1.5 text-gold">
                          {formatProductPrice(
                            product.price,
                            product.promotionalPrice,
                          )}
                        </span>
                      </div>
                    </div>
                    <DeleteProductButton
                      productId={product.id}
                      productName={product.name}
                    />
                  </div>
                </div>
                <details className="mt-5">
                  <summary className="cursor-pointer text-sm font-semibold text-gold">
                    Editar produto
                  </summary>
                  <div className="mt-5">
                    <ProductAdminForm product={product} />
                  </div>
                </details>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AdminSetupNotice() {
  return (
    <section className="bg-coal px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-3xl border border-gold/35 bg-graphite p-8 shadow-hard">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">
          Próxima configuração
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-white">
          O painel admin foi criado e está aguardando o Supabase.
        </h1>
        <p className="mt-5 leading-8 text-white/65">
          Depois que o projeto Supabase for criado, preencha `.env.local`, rode
          `supabase/schema.sql` e cadastre o dono da Vianna Art's como admin.
        </p>
      </div>
    </section>
  );
}

function AdminMetric({ label, value }: { label: string; value: number }) {
  return (
    <div className="border border-white/10 bg-graphite p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
        {label}
      </p>
      <strong className="mt-3 block text-3xl text-white">{value}</strong>
    </div>
  );
}

function getAdminFeedback(success?: string, error?: string) {
  if (success === 'product-saved') {
    return 'Produto salvo com sucesso. O catálogo público foi atualizado.';
  }

  if (success === 'product-deleted') {
    return 'Produto excluído com sucesso.';
  }

  const errors: Record<string, string> = {
    'invalid-product':
      'Preencha nome, categoria e descrição antes de salvar o produto.',
    'save-product':
      'Não foi possível salvar o produto. Confira os dados e tente novamente.',
    'missing-product': 'Produto não encontrado para exclusão.',
    'delete-product':
      'Não foi possível excluir o produto. Tente novamente em alguns instantes.',
    'invalid-image': 'Envie uma imagem JPG, PNG ou WebP com até 8 MB.',
    'image-upload':
      'Não foi possível enviar a imagem. Confira o arquivo e tente novamente.',
  };

  if (error && errors[error]) {
    return errors[error];
  }

  return 'Não foi possível concluir a operação.';
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
