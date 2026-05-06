import { Compass, Flame, Hammer, Ruler, ShieldCheck, Wrench } from 'lucide-react';
import ContactSection from '@/components/ContactSection';
import FeaturedProducts from '@/components/FeaturedProducts';
import Hero from '@/components/Hero';
import LatestPosts from '@/components/LatestPosts';
import SectionTitle from '@/components/SectionTitle';
import ServiceCard from '@/components/ServiceCard';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { getFeaturedProducts } from '@/lib/products';
import { getPublicPosts } from '@/lib/posts';

const services = [
  {
    icon: Hammer,
    title: 'Mãos francesas artesanais',
    description:
      'Modelos rústicos, coloniais e modernos para prateleiras, bancadas e composições decorativas.',
  },
  {
    icon: ShieldCheck,
    title: 'Suportes metálicos',
    description:
      'Peças reforçadas para uso residencial ou comercial, produzidas conforme necessidade de carga e acabamento.',
  },
  {
    icon: Compass,
    title: 'Decoração em metal',
    description:
      'Itens decorativos com personalidade, ideais para ambientes que pedem presença, textura e autenticidade.',
  },
  {
    icon: Ruler,
    title: 'Peças sob medida',
    description:
      'Projetos personalizados a partir de referências, medidas e estilo desejado para cada aplicação.',
  },
  {
    icon: Wrench,
    title: 'Serviços de serralheria',
    description:
      'Soluções em metal com foco em resistência, acabamento e execução cuidadosa.',
  },
  {
    icon: Flame,
    title: 'Acabamentos rústicos',
    description:
      'Detalhes visuais inspirados no trabalho manual, combinando metal, textura e um visual premium.',
  },
];

export default async function HomePage() {
  const [featuredProducts, posts] = await Promise.all([
    getFeaturedProducts(),
    getPublicPosts(),
  ]);

  return (
    <>
      <Hero />

      <section className="bg-coal px-5 py-20 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <SectionTitle
            eyebrow="Sobre a empresa"
            title="Serralheria com presença artesanal e acabamento de alto padrão."
            description="A Vianna Art's Metal & Design desenvolve peças em metal que unem função, estética e durabilidade. Cada produto nasce do cuidado com medidas, proporção, resistência e identidade visual."
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="metric-card">
              <span>01</span>
              <strong>Produção artesanal</strong>
              <p>Peças feitas com atenção ao detalhe e acabamento individual.</p>
            </div>
            <div className="metric-card">
              <span>02</span>
              <strong>Projetos sob medida</strong>
              <p>Soluções criadas para o tamanho, uso e estilo do cliente.</p>
            </div>
            <div className="metric-card">
              <span>03</span>
              <strong>Visual rústico premium</strong>
              <p>Metal com textura, contraste e presença para ambientes marcantes.</p>
            </div>
            <div className="metric-card">
              <span>04</span>
              <strong>Uso residencial e comercial</strong>
              <p>Produtos para casas, lojas, escritórios, fachadas e decoração.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-graphite px-5 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            <SectionTitle
              eyebrow="Trabalho artesanal"
              title="Metal trabalhado à mão para entregar peças únicas."
              description="A produção valoriza o traço manual, o acabamento firme e o equilíbrio entre rusticidade e design. O resultado são peças fortes, funcionais e com personalidade própria."
            />
            <div className="relative min-h-[360px] overflow-hidden border border-gold/25 bg-metal p-8 shadow-hard">
              <div className="absolute inset-0 product-texture" />
              <div className="relative z-10 grid h-full content-between gap-10">
                <p className="max-w-xl text-2xl font-semibold leading-snug text-white md:text-3xl">
                  Do suporte discreto à peça decorativa, cada detalhe é pensado
                  para servir ao projeto e valorizar o ambiente.
                </p>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="craft-step">Medida</div>
                  <div className="craft-step">Corte</div>
                  <div className="craft-step">Acabamento</div>
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
            title="Soluções em metal para ambientes com identidade."
            description="Produtos artesanais, serviços de serralheria e desenvolvimento sob medida para quem busca resistência sem abrir mão de design."
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
      <LatestPosts posts={posts} />
      <WhatsAppCTA />
      <ContactSection />
    </>
  );
}
