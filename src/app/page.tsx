import { Compass, Drill, Hammer, Sparkles, Wrench } from 'lucide-react';
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
    title: 'Mãos francesas e suportes',
    description:
      'Peças metálicas para prateleiras, bancadas, vasos e composições sob medida.',
  },
  {
    icon: Drill,
    title: 'Metal com madeira',
    description:
      'Estantes, prateleiras e peças com madeira tratada e envernizada.',
  },
  {
    icon: Sparkles,
    title: 'Decoração em metal',
    description:
      'Peças decorativas, letreiros e detalhes artesanais para valorizar ambientes.',
  },
  {
    icon: Wrench,
    title: 'Serviços de serralheria',
    description:
      'Projetos personalizados para casas, lojas, empresas e necessidades específicas.',
  },
];

const differentials = [
  'Solda de qualidade',
  'Madeira tratada e envernizada',
  'Instalação gratuita conforme projeto',
  'Pagamento em Pix, dinheiro, débito e crédito',
  'Garantia inicial de 7 dias',
];

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <>
      <Hero />

      <section className="bg-coal px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <SectionTitle
            eyebrow="Vianna Art's"
            title="Serralheria artesanal para peças fortes, funcionais e bem acabadas."
            description="A Vianna Art's, conduzida por Kauan Vianna, desenvolve peças em metal e composições com madeira para residências, lojas e empresas em Teixeira de Freitas - BA."
          />

          <div className="border border-white/10 bg-graphite p-6 shadow-hard">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center border border-gold/45 text-gold">
                <Compass size={23} strokeWidth={1.6} />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  Diferenciais
                </p>
                <h2 className="mt-1 text-xl font-semibold text-white">
                  Acabamento, resistência e atendimento local.
                </h2>
              </div>
            </div>

            <ul className="mt-6 grid gap-3">
              {differentials.map((item) => (
                <li
                  key={item}
                  className="border border-white/10 bg-white/[0.035] px-4 py-3 text-sm font-semibold text-white/72"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-black px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Serviços"
            title="O que a empresa faz."
            description="Produtos rústicos, funcionais e personalizados, feitos em metal, madeira ou na combinação dos dois materiais."
            align="center"
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
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
