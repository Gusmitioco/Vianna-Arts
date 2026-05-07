import { Instagram, MapPin, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { COMPANY } from '../data/company';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <p className="font-display text-2xl font-semibold text-white">
            {COMPANY.name}
          </p>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/62">
            Peças artesanais em metal para projetos residenciais, comerciais e
            personalizados. Força, acabamento e identidade em cada detalhe.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Navegação
          </p>
          <div className="mt-4 flex flex-col items-start gap-3 text-sm text-white/68">
            <Link href="/" data-smooth-scroll>
              Início
            </Link>
            <Link href="/produtos">Produtos</Link>
            <Link href="/#contato" data-smooth-scroll>
              Contato
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Contato
          </p>
          <div className="mt-4 space-y-3 text-sm text-white/68">
            <a className="flex items-center gap-3" href={COMPANY.whatsappUrl}>
              <MessageCircle size={17} className="text-gold" />
              WhatsApp
            </a>
            <a className="flex items-center gap-3" href={COMPANY.instagramUrl}>
              <Instagram size={17} className="text-gold" />
              {COMPANY.instagram}
            </a>
            <p className="flex items-center gap-3">
              <MapPin size={17} className="text-gold" />
              {COMPANY.address}
            </p>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-white/45">
        © {new Date().getFullYear()} {COMPANY.name}. Todos os direitos reservados.
      </div>
    </footer>
  );
}
