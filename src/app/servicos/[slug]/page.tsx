import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import BreadcrumbJsonLd from '@/components/seo/BreadcrumbJsonLd';
import ServiceJsonLd from '@/components/seo/ServiceJsonLd';
import SectionTitle from '@/components/SectionTitle';
import { COMPANY } from '@/data/company';
import { getServiceBySlug, SERVICES } from '@/data/services';
import { LOCAL_SEO, SITE_URL } from '@/data/seo';
import { getPublicProducts } from '@/lib/products';

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return SERVICES.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Serviço não encontrado | Vianna Art's Metal & Design",
    };
  }

  return {
    title: service.title,
    description: service.metaDescription,
    alternates: {
      canonical: `/servicos/${service.slug}`,
    },
    openGraph: {
      title: `${service.title} | Vianna Art's`,
      description: service.metaDescription,
      url: `${SITE_URL}/servicos/${service.slug}`,
      images: ['/logo/vianna-logo.png'],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const products = await getPublicProducts();
  const relatedProducts = service.category
    ? products.filter((product) => product.category === service.category).slice(0, 3)
    : [];
  const message = encodeURIComponent(
    `Olá! Quero fazer um orçamento sobre ${service.title}.`,
  );

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Início', url: SITE_URL },
          { name: 'Serviços', url: `${SITE_URL}/servicos` },
          { name: service.title, url: `${SITE_URL}/servicos/${service.slug}` },
        ]}
      />
      <ServiceJsonLd service={service} />

      <section className="relative overflow-hidden border-b border-white/10 bg-black px-5 py-20 lg:px-8">
        <div className="absolute inset-0 hero-metal opacity-70" />
        <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_360px] lg:items-end">
          <SectionTitle
            eyebrow={service.eyebrow}
            title={service.title}
            description={`${service.description} Atendimento em ${LOCAL_SEO.city} - ${LOCAL_SEO.state}.`}
          />
          <div className="border border-gold/35 bg-gold/10 p-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-gold">
              Orçamento
            </p>
            <p className="mt-3 text-sm leading-7 text-white/68">
              Envie medidas, fotos do local ou referência da peça. O orçamento
              pode ser feito pelo WhatsApp ou presencialmente.
            </p>
            <a
              href={`${COMPANY.whatsappUrl}?text=${message}`}
              className="mt-5 inline-flex w-full items-center justify-center gap-2 border border-gold bg-gold px-5 py-3 text-sm font-bold uppercase tracking-[0.12em] text-coal transition hover:bg-transparent hover:text-gold"
            >
              <MessageCircle size={17} />
              Solicitar orçamento
            </a>
          </div>
        </div>
      </section>

      <section className="bg-coal px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionTitle
              eyebrow="Diferenciais"
              title="Produção artesanal com foco em resistência, acabamento e uso real."
              description="Cada serviço é alinhado conforme ambiente, medidas, acabamento desejado e necessidade do cliente."
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {service.highlights.map((highlight, index) => (
              <div key={highlight} className="metric-card">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{highlight}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-graphite px-5 py-16 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <InfoPanel title="Aplicações" items={service.applications} />
          <InfoPanel title="Como funciona" items={service.process} ordered />
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="bg-black px-5 py-16 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <SectionTitle
                eyebrow="Produtos relacionados"
                title="Peças que combinam com este serviço."
                description="Alguns exemplos do catálogo para ajudar a visualizar possibilidades de orçamento."
              />
              <Link
                href="/produtos"
                className="inline-flex items-center justify-center border border-white/15 px-5 py-3 text-sm font-semibold text-white/72 transition hover:border-gold hover:text-gold"
              >
                Ver catálogo
              </Link>
            </div>
            <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="bg-coal px-5 py-16 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <SectionTitle
            eyebrow="Dúvidas comuns"
            title="Informações úteis antes de pedir orçamento."
          />
          <div className="mt-8 space-y-3">
            {service.faq.map((item) => (
              <details
                key={item.question}
                className="border border-white/10 bg-graphite p-5"
              >
                <summary className="cursor-pointer text-base font-semibold text-white">
                  {item.question}
                </summary>
                <p className="mt-4 text-sm leading-7 text-white/62">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function InfoPanel({
  title,
  items,
  ordered = false,
}: {
  title: string;
  items: string[];
  ordered?: boolean;
}) {
  const ListTag = ordered ? 'ol' : 'ul';

  return (
    <div className="border border-white/10 bg-coal p-6 shadow-hard">
      <h2 className="font-display text-3xl font-semibold text-white">{title}</h2>
      <ListTag className="mt-6 grid gap-3">
        {items.map((item, index) => (
          <li
            key={item}
            className="flex gap-3 border border-white/10 bg-white/[0.035] p-4 text-sm leading-7 text-white/68"
          >
            <span className="font-bold text-gold">
              {ordered ? String(index + 1).padStart(2, '0') : '•'}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ListTag>
    </div>
  );
}
