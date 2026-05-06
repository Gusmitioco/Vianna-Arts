import Link from 'next/link';
import { signInAction } from '@/app/admin/actions';
import { hasSupabaseConfig } from '@/lib/env';

type LoginPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export const metadata = {
  title: "Admin Login | Vianna Art's Metal & Design",
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  if (!hasSupabaseConfig()) {
    return <AdminSetupNotice />;
  }

  return (
    <section className="bg-coal px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-md gap-8 border border-white/10 bg-graphite p-7 shadow-hard">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">
            Painel administrativo
          </p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-white">
            Acesso interno
          </h1>
          <p className="mt-4 text-sm leading-7 text-white/62">
            Entre com o e-mail e senha cadastrados para administrar produtos,
            preços, promoções e imagens.
          </p>
        </div>

        {params.error && (
          <p className="border border-red-400/35 bg-red-500/10 p-3 text-sm text-red-100">
            Não foi possível entrar. Verifique os dados e tente novamente.
          </p>
        )}

        <form action={signInAction} className="grid gap-5">
          <label className="form-field">
            E-mail
            <input name="email" type="email" required placeholder="admin@email.com" />
          </label>
          <label className="form-field">
            Senha
            <input name="password" type="password" required placeholder="Sua senha" />
          </label>
          <button
            type="submit"
            className="border border-gold bg-gold px-6 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-coal transition hover:bg-transparent hover:text-gold"
          >
            Entrar
          </button>
        </form>

        <Link className="text-sm text-white/58 hover:text-gold" href="/">
          Voltar para o site
        </Link>
      </div>
    </section>
  );
}

function AdminSetupNotice() {
  return (
    <section className="bg-coal px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-3xl border border-gold/35 bg-graphite p-8 shadow-hard">
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">
          Configuração necessária
        </p>
        <h1 className="mt-3 font-display text-4xl font-semibold text-white">
          O painel admin está pronto, mas ainda precisa do Supabase.
        </h1>
        <p className="mt-5 leading-8 text-white/65">
          Configure `NEXT_PUBLIC_SUPABASE_URL` e
          `NEXT_PUBLIC_SUPABASE_ANON_KEY` no arquivo `.env.local`, execute o SQL
          em `supabase/schema.sql` e cadastre o usuário administrador.
        </p>
      </div>
    </section>
  );
}
