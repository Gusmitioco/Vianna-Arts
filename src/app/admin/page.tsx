import Link from 'next/link';
import {
  deletePostAction,
  deleteProductAction,
  savePostAction,
  saveProductAction,
  signOutAction,
} from '@/app/admin/actions';
import { CATEGORIES } from '@/data/products';
import type { Post } from '@/data/posts';
import { hasSupabaseConfig } from '@/lib/env';
import { requireAdmin } from '@/lib/auth';
import { getAdminProducts } from '@/lib/products';
import { getAdminPosts } from '@/lib/posts';

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
  const [products, posts] = await Promise.all([getAdminProducts(), getAdminPosts()]);

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
            {params.success
              ? 'Alteração salva com sucesso.'
              : 'Não foi possível concluir a operação.'}
          </p>
        )}

        <div className="mt-10 grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="border border-white/10 bg-graphite p-6 shadow-hard">
            <h2 className="font-display text-3xl font-semibold text-white">
              Novo produto
            </h2>
            <ProductForm />
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
                  <form action={deleteProductAction}>
                    <input type="hidden" name="id" value={product.id} />
                    <button
                      type="submit"
                      className="border border-red-400/45 px-4 py-2 text-sm font-semibold text-red-100 hover:bg-red-500/15"
                    >
                      Excluir
                    </button>
                  </form>
                </div>
                <details className="mt-5">
                  <summary className="cursor-pointer text-sm font-semibold text-gold">
                    Editar produto
                  </summary>
                  <div className="mt-5">
                    <ProductForm product={product} />
                  </div>
                </details>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
          <div className="border border-white/10 bg-graphite p-6 shadow-hard">
            <h2 className="font-display text-3xl font-semibold text-white">
              Nova postagem
            </h2>
            <PostForm />
          </div>

          <div className="space-y-5">
            {posts.map((post) => (
              <article
                key={post.id}
                className="border border-white/10 bg-graphite p-5 shadow-hard"
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                      {post.isPublished ? 'Publicado' : 'Rascunho'}
                    </p>
                    <h3 className="mt-2 text-2xl font-semibold text-white">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-white/60">
                      {post.excerpt}
                    </p>
                  </div>
                  <form action={deletePostAction}>
                    <input type="hidden" name="id" value={post.id} />
                    <button
                      type="submit"
                      className="border border-red-400/45 px-4 py-2 text-sm font-semibold text-red-100 hover:bg-red-500/15"
                    >
                      Excluir
                    </button>
                  </form>
                </div>
                <details className="mt-5">
                  <summary className="cursor-pointer text-sm font-semibold text-gold">
                    Editar postagem
                  </summary>
                  <div className="mt-5">
                    <PostForm post={post} />
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

function ProductForm({
  product,
}: {
  product?: Awaited<ReturnType<typeof getAdminProducts>>[number];
}) {
  return (
    <form action={saveProductAction} className="mt-6 grid gap-5">
      {product && <input type="hidden" name="id" value={product.id} />}
      <input
        type="hidden"
        name="currentImageUrl"
        value={product?.imageUrl ?? ''}
      />
      <label className="form-field">
        Nome do produto
        <input name="name" required defaultValue={product?.name} />
      </label>
      <label className="form-field">
        Categoria
        <select name="category" required defaultValue={product?.category ?? CATEGORIES[0]}>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>
      <label className="form-field">
        Descrição
        <textarea name="description" required rows={4} defaultValue={product?.description} />
      </label>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="form-field">
          Valor
          <input
            name="price"
            inputMode="decimal"
            placeholder="Ex.: 149,90"
            defaultValue={product?.price ?? ''}
          />
        </label>
        <label className="form-field">
          Valor promocional
          <input
            name="promotionalPrice"
            inputMode="decimal"
            placeholder="Ex.: 129,90"
            defaultValue={product?.promotionalPrice ?? ''}
          />
        </label>
      </div>
      <label className="form-field">
        Foto do produto
        <input name="image" type="file" accept="image/*" />
      </label>
      <div className="grid gap-3 text-sm text-white/70 md:grid-cols-2">
        <label className="flex items-center gap-3 border border-white/10 bg-white/[0.035] p-3">
          <input
            name="isFeatured"
            type="checkbox"
            defaultChecked={product?.featured ?? false}
          />
          Exibir em destaque
        </label>
        <label className="flex items-center gap-3 border border-white/10 bg-white/[0.035] p-3">
          <input
            name="isPublished"
            type="checkbox"
            defaultChecked={product?.isPublished ?? true}
          />
          Produto publicado
        </label>
      </div>
      <button
        type="submit"
        className="border border-gold bg-gold px-6 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-coal transition hover:bg-transparent hover:text-gold"
      >
        Salvar produto
      </button>
    </form>
  );
}

function PostForm({ post }: { post?: Post }) {
  return (
    <form action={savePostAction} className="mt-6 grid gap-5">
      {post && <input type="hidden" name="id" value={post.id} />}
      <input type="hidden" name="currentImageUrl" value={post?.imageUrl ?? ''} />
      <label className="form-field">
        Título
        <input name="title" required defaultValue={post?.title} />
      </label>
      <label className="form-field">
        Resumo
        <textarea name="excerpt" required rows={3} defaultValue={post?.excerpt} />
      </label>
      <label className="form-field">
        Conteúdo
        <textarea name="content" required rows={6} defaultValue={post?.content} />
      </label>
      <label className="form-field">
        Foto da postagem
        <input name="image" type="file" accept="image/*" />
      </label>
      <label className="flex items-center gap-3 border border-white/10 bg-white/[0.035] p-3 text-sm text-white/70">
        <input
          name="isPublished"
          type="checkbox"
          defaultChecked={post?.isPublished ?? true}
        />
        Publicar postagem
      </label>
      <button
        type="submit"
        className="border border-gold bg-gold px-6 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-coal transition hover:bg-transparent hover:text-gold"
      >
        Salvar postagem
      </button>
    </form>
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
