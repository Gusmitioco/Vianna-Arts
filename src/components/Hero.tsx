import { ArrowRight, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { COMPANY } from '../data/company';

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-white/10">
      <div className="absolute inset-0 hero-metal" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-coal/82 to-coal" />
      <div className="relative mx-auto grid min-h-[calc(100vh-76px)] max-w-7xl items-center gap-12 px-5 py-16 md:min-h-[760px] lg:grid-cols-[1.08fr_0.92fr] lg:px-8">
        <div className="max-w-4xl">
          <p className="inline-flex border border-gold/40 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-gold backdrop-blur">
            Metal, madeira e projetos sob medida
          </p>
          <h1 className="mt-7 font-display text-5xl font-semibold leading-[1.02] text-white md:text-7xl xl:text-8xl">
            {COMPANY.name}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/74 md:text-xl">
            {COMPANY.tagline}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/produtos"
              className="inline-flex items-center justify-center gap-2 border border-gold bg-gold px-6 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-coal transition hover:bg-transparent hover:text-gold"
            >
              Ver produtos
              <ArrowRight size={18} />
            </Link>
            <a
              href={COMPANY.whatsappUrl}
              className="inline-flex items-center justify-center gap-2 border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-white transition hover:border-gold hover:text-gold"
            >
              <MessageCircle size={18} />
              Entrar em contato
            </a>
          </div>
        </div>

        <div className="relative hidden min-h-[520px] lg:block">
          <div className="absolute inset-y-8 left-10 right-0 border border-white/10 bg-metal shadow-hard" />
          <div className="absolute inset-y-0 left-0 right-12 overflow-hidden border border-gold/28 bg-graphite">
            <div className="absolute inset-0 product-texture opacity-90" />
            <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-gold/20" />
            <div className="absolute bottom-8 left-8 right-8 border border-white/12 bg-black/55 p-6 backdrop-blur-md">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                Metal, acabamento e design
              </p>
              <p className="mt-3 text-2xl font-semibold leading-snug text-white">
                Peças com solda de qualidade, preço acessível e instalação gratuita.
              </p>
            </div>
          </div>
          <div className="absolute -right-4 top-16 h-28 w-28 border border-gold/50 bg-gold/10" />
          <div className="absolute -left-4 bottom-20 h-20 w-20 border border-white/20 bg-white/5" />
        </div>
      </div>
    </section>
  );
}
