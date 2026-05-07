import {
  Banknote,
  Compass,
  Drill,
  Hammer,
  Home,
  Ruler,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import ContactSection from '@/components/ContactSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import Hero from '@/components/Hero';
import SectionTitle from '@/components/SectionTitle';
import ServiceCard from '@/components/ServiceCard';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { getFeaturedProducts } from '@/lib/products';

const services = [
  {
    icon: Hammer,
    title: 'Peças em metal',
    description:
      'Mãos francesas, suportes, estruturas, peças decorativas e soluções metálicas sob medida.',
  },
  {
    icon: Drill,
    title: 'Metal com madeira',
    description:
      'Estantes, prateleiras e composições com madeira tratada e envernizada para um acabamento completo.',
  },
  {
    icon: Compass,
    title: 'Projetos personalizados',
    description:
      'Projetos criados a partir da ideia do cliente, para casas, lojas, empresas e ambientes comerciais.',
  },
  {
    icon: Home,
    title: 'Instalação gratuita',
    description:
      'Instalação sem custo adicional na residência do cliente, conforme disponibilidade e alinhamento do projeto.',
  },
  {
    icon: Wrench,
    title: 'Orçamento flexível',
    description:
      'Atendimento por WhatsApp ou presencial para entender medidas, acabamento e melhor solução.',
  },
  {
    icon: Banknote,
    title: 'Pagamento facilitado',
    description:
      'Pagamentos em Pix, dinheiro, débito e crédito, com opções pensadas para caber no orçamento.',
  },
];

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <Hero />

      <section className="bg-coal px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <SectionTitle
            eyebrow="Sobre a empresa"
            title="Peças em metal feitas para combinar com o seu projeto."
            description="A Vianna Art's, conduzida por Kauan Vianna, desenvolve peças em metal e composições com madeira tratada para residências, lojas, empresas e projetos personalizados em Teixeira de Freitas."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="metric-card">
              <span>01</span>
              <strong>Solda de qualidade</strong>
              <p>Peças produzidas com foco em resistência, firmeza e acabamento bem executado.</p>
            </div>
            <div className="metric-card">
              <span>02</span>
              <strong>Metal com madeira</strong>
              <p>Opções com madeira tratada e envernizada para entregar a peça pronta para uso.</p>
            </div>
            <div className="metric-card">
              <span>03</span>
              <strong>Instalação gratuita</strong>
              <p>Instalamos na residência do cliente sem custo adicional, conforme o projeto combinado.</p>
            </div>
            <div className="metric-card">
              <span>04</span>
              <strong>Preço acessível</strong>
              <p>Projetos personalizados com opções de pagamento em Pix, dinheiro, débito e crédito.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-graphite px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <SectionTitle
              eyebrow="Trabalho artesanal"
              title="Do jeito que você imagina, com orientação para ficar funcional."
              description="Cada projeto é alinhado por WhatsApp ou presencialmente, considerando medidas, local de instalação, acabamento desejado e combinação com madeira quando fizer sentido."
            />
            <div className="relative min-h-[360px] overflow-hidden border border-gold/25 bg-metal p-8 shadow-hard">
              <div className="absolute inset-0 product-texture" />
              <div className="relative z-10 grid h-full content-between gap-10">
                <p className="max-w-xl text-2xl font-semibold leading-snug text-white md:text-3xl">
                  Do suporte discreto à estante com madeira, cada peça é pensada
                  para atender ao uso real e valorizar o ambiente.
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="craft-step">Medida</div>
                  <div className="craft-step">Solda</div>
                  <div className="craft-step">Instalação</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-black px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Serviços"
            title="Soluções para casas, lojas, empresas e projetos personalizados."
            description="A Vianna Art's trabalha com peças em metal, peças com madeira, instalação e orçamentos presenciais ou por WhatsApp."
            align="center"
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </div>
      </section>

      <FeaturedProducts products={featuredProducts} />
      <WhatsAppCTA />
      <ContactSection />
    </>
  );
}
