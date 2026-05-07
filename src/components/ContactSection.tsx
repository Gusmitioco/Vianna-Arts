'use client';

import { Clock, Instagram, MapPin, MessageCircle, Send } from 'lucide-react';
import type { FormEvent } from 'react';
import { COMPANY } from '../data/company';
import SectionTitle from './SectionTitle';

export default function ContactSection() {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);
    const name = form.get('name')?.toString().trim();
    const phone = form.get('phone')?.toString().trim();
    const interest = form.get('interest')?.toString().trim();
    const message = form.get('message')?.toString().trim();

    const whatsappMessage = encodeURIComponent(
      [
        'Olá! Gostaria de solicitar um orçamento.',
        name ? `Nome: ${name}` : '',
        phone ? `Telefone: ${phone}` : '',
        interest ? `Interesse: ${interest}` : '',
        message ? `Mensagem: ${message}` : '',
      ]
        .filter(Boolean)
        .join('\n'),
    );

    window.open(`${COMPANY.whatsappUrl}?text=${whatsappMessage}`, '_blank');
  };

  return (
    <section id="contato" className="bg-graphite px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <SectionTitle
            eyebrow="Contato"
            title="Atendimento para orçamentos, projetos e peças personalizadas."
            description="Fale pelo WhatsApp, acompanhe o Instagram ou envie uma mensagem com as informações principais do seu projeto. O orçamento pode ser online ou presencial."
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

        <form
          className="border border-white/10 bg-coal p-6 shadow-hard md:p-8"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <label className="form-field">
              Nome
              <input name="name" type="text" placeholder="Seu nome" />
            </label>
            <label className="form-field">
              Telefone
              <input
                name="phone"
                type="tel"
                placeholder="+55 73 99156-0123"
              />
            </label>
          </div>
          <label className="form-field mt-5">
            Interesse
            <input
              name="interest"
              type="text"
              placeholder="Produto, serviço ou peça sob medida"
            />
          </label>
          <label className="form-field mt-5">
            Mensagem
            <textarea
              name="message"
              rows={5}
              placeholder="Descreva sua ideia, medidas ou referência"
            />
          </label>
          <button
            type="submit"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 border border-gold bg-gold px-6 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-coal transition hover:bg-transparent hover:text-gold md:w-auto"
          >
            <Send size={18} />
            Enviar mensagem
          </button>
        </form>
      </div>
    </section>
  );
}
