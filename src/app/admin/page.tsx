import Link from 'next/link';
import { signOutAction } from '@/app/admin/actions';
import DeleteProductButton from '@/components/admin/DeleteProductButton';
import ProductAdminForm from '@/components/admin/ProductAdminForm';
import { hasSupabaseConfig } from '@/lib/env';
import { requireAdmin } from '@/lib/auth';
import { getAdminProducts } from '@/lib/products';

type AdminPageProps = {
  searchParams: Promise<{ success?: string; error?: string }>;
};

export const metadata = {
  title: "Admin | Vianna Art's Metal & Design",
};

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const params = await searchParams;

  if (!hasSupabaseConfig()) {
    return <AdminSetupNotice />;
  }

  const admin = await requireAdmin();
  const products = await getAdminProducts();

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

        <div className="mt-10 grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="border border-white/10 bg-graphite p-6 shadow-hard">
            <h2 className="font-display text-3xl font-semibold text-white">
              Novo produto
            </h2>
            <ProductAdminForm />
          </div>

          <div className="space-y-5">
            {products.map((product) => (
              <article
                key={product.id}
                className="border border-white/10 bg-graphite p-5 shadow-hard"
              >
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
                    <p className="mt-3 text-sm text-white/48">
                      {product.isPublished ? 'Publicado' : 'Rascunho'} ·{' '}
                      {product.featured ? 'Destaque' : 'Sem destaque'}
                    </p>
                  </div>
                  <DeleteProductButton
                    productId={product.id}
                    productName={product.name}
                  />
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
    'invalid-image': 'Envie uma imagem válida com até 5 MB.',
    'image-upload':
      'Não foi possível enviar a imagem. Confira o arquivo e tente novamente.',
  };

  if (error && errors[error]) {
    return errors[error];
  }

  return 'Não foi possível concluir a operação.';
}
