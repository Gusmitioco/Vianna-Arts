import { MessageCircle } from 'lucide-react';
import { COMPANY } from '../data/company';

export default function WhatsAppCTA() {
  return (
    <section className="bg-black px-5 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 border border-gold/35 bg-gradient-to-br from-gold/18 via-white/[0.035] to-transparent p-7 md:grid-cols-[1fr_auto] md:items-center md:p-10">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-gold">
            Atendimento direto
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white md:text-4xl">
            Quer uma peça sob medida ou um orçamento?
          </h2>
          <p className="mt-4 max-w-2xl text-white/65">
            Envie sua ideia, medidas ou referência. A Vianna Art's analisa o
            projeto e orienta a melhor solução em metal para o seu ambiente.
          </p>
        </div>
        <a
          href={COMPANY.whatsappUrl}
          className="inline-flex items-center justify-center gap-2 border border-gold bg-gold px-6 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-coal transition hover:bg-transparent hover:text-gold"
        >
          <MessageCircle size={18} />
          Chamar no WhatsApp
        </a>
      </div>
    </section>
  );
}
