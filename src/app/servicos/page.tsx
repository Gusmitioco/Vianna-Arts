import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import SectionTitle from '@/components/SectionTitle';
import WhatsAppCTA from '@/components/WhatsAppCTA';
import { SERVICES } from '@/data/services';
import { LOCAL_SEO, SITE_URL } from '@/data/seo';

export const metadata = {
  title: 'Serviços de serralheria em Teixeira de Freitas',
  description:
    "Conheça os serviços da Vianna Art's: serralheria, mãos francesas, suportes metálicos, metal com madeira e peças sob medida em Teixeira de Freitas - BA.",
  alternates: {
    canonical: '/servicos',
  },
  openGraph: {
    title: "Serviços | Vianna Art's Metal & Design",
    description:
      'Serralheria, peças em metal sob medida, suportes e metal com madeira em Teixeira de Freitas - BA.',
    url: `${SITE_URL}/servicos`,
    images: ['/logo/vianna-logo.png'],
  },
};

export default function ServicesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Início', url: SITE_URL },
          { name: 'Serviços', url: `${SITE_URL}/servicos` },
        ]}
      />

      <section className="relative overflow-hidden border-b border-white/10 bg-black px-5 py-20 lg:px-8">
        <div className="absolute inset-0 hero-metal opacity-70" />
        <div className="relative mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Serviços"
            title="Serralheria, metal com madeira e peças sob medida em Teixeira de Freitas."
            description={`A Vianna Art's atende ${LOCAL_SEO.region} com produção artesanal em metal, solda de qualidade, instalação gratuita conforme projeto e orçamento por WhatsApp ou presencial.`}
          />
        </div>
      </section>

      <section className="bg-coal px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {SERVICES.map((service) => (
            <Link
              key={service.slug}
              href={`/servicos/${service.slug}`}
              className="group flex min-h-[320px] flex-col justify-between border border-white/10 bg-graphite p-6 shadow-hard transition duration-300 hover:-translate-y-1 hover:border-gold/45"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">
                  {service.eyebrow}
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight text-white">
                  {service.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-white/62">
                  {service.description}
                </p>
              </div>
              <span className="mt-8 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.12em] text-gold">
                Ver serviço
                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </span>
            </Link>
          ))}
        </div>
      </section>

      <WhatsAppCTA />
    </>
  );
}
