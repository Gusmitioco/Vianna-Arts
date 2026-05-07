import {
  Clock,
  Image as ImageIcon,
  Instagram,
  MapPin,
  MessageCircle,
} from 'lucide-react';
import { COMPANY } from '../data/company';
import SectionTitle from './SectionTitle';

const mapQuery = encodeURIComponent(COMPANY.address);

export default function ContactSection() {
  return (
    <section id="contato" className="bg-graphite px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionTitle
            eyebrow="Contato"
            title="Atendimento para orçamentos, projetos e peças personalizadas."
            description="Fale pelo WhatsApp, acompanhe o Instagram ou venha conhecer a Vianna Art's em Teixeira de Freitas. O orçamento pode ser online ou presencial."
          />

          <div className="mt-9 space-y-4">
            <a className="contact-row" href={COMPANY.whatsappUrl}>
              <MessageCircle size={20} />
              <span>{COMPANY.whatsapp}</span>
            </a>
            <a className="contact-row" href={COMPANY.instagramUrl}>
              <Instagram size={20} />
              <span>{COMPANY.instagram}</span>
            </a>
            <p className="contact-row">
              <MapPin size={20} />
              <span>{COMPANY.address}</span>
            </p>
            <p className="contact-row">
              <Clock size={20} />
              <span>{COMPANY.hours}</span>
            </p>
          </div>
        </div>

        <div className="grid gap-5">
          <div className="overflow-hidden border border-white/10 bg-coal shadow-hard">
            <div className="relative aspect-[16/9] min-h-[260px] product-texture">
              <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-gold/15" />
              <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
                <div className="grid h-16 w-16 place-items-center border border-gold/45 bg-black/35 text-gold shadow-gold">
                  <ImageIcon size={30} strokeWidth={1.5} />
                </div>
                <p className="mt-5 text-sm font-semibold uppercase tracking-[0.22em] text-gold">
                  Foto da fachada
                </p>
                <p className="mt-3 max-w-md text-sm leading-7 text-white/62">
                  Espaço reservado para a imagem da frente da loja. Quando a foto
                  estiver pronta, ela entra aqui substituindo este bloco.
                </p>
              </div>
            </div>
          </div>

          <div className="overflow-hidden border border-white/10 bg-coal shadow-hard">
            <iframe
              title="Mapa da Vianna Art's"
              src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
              className="h-[320px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
