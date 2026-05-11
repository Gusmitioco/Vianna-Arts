import type { ProductCategory } from '@/data/products';

export type Service = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  description: string;
  metaDescription: string;
  category?: ProductCategory;
  highlights: string[];
  applications: string[];
  process: string[];
  faq: Array<{
    question: string;
    answer: string;
  }>;
};

export const SERVICES: Service[] = [
  {
    slug: 'serralheria-em-teixeira-de-freitas',
    title: 'Serralheria em Teixeira de Freitas',
    shortTitle: 'Serralheria',
    eyebrow: 'Serviço local',
    description:
      "Serviços de serralheria para casas, lojas e empresas em Teixeira de Freitas - BA, com peças em metal sob medida, instalação e orçamento presencial ou por WhatsApp.",
    metaDescription:
      "Serralheria em Teixeira de Freitas - BA. Peças em metal sob medida, suportes, mãos francesas, metal com madeira e instalação gratuita.",
    category: 'Serviços de serralheria',
    highlights: [
      'Atendimento para residências, lojas e empresas',
      'Orçamento por WhatsApp ou presencial',
      'Solda de qualidade e acabamento artesanal',
      'Instalação gratuita conforme alinhamento do projeto',
    ],
    applications: [
      'Reparos e ajustes em peças metálicas',
      'Estruturas para ambientes internos e comerciais',
      'Suportes, mãos francesas e peças decorativas',
      'Projetos personalizados com metal e madeira',
    ],
    process: [
      'Entendimento da necessidade, ambiente e medidas',
      'Definição do material, acabamento e prazo',
      'Produção artesanal da peça em metal',
      'Entrega e instalação conforme combinado',
    ],
    faq: [
      {
        question: 'O orçamento pode ser feito pelo WhatsApp?',
        answer:
          'Sim. O cliente pode enviar fotos, medidas e referências pelo WhatsApp para uma primeira avaliação.',
      },
      {
        question: 'A Vianna Art’s atende empresas?',
        answer:
          'Sim. A empresa atende pessoas físicas, casas, lojas, empresas e projetos comerciais.',
      },
    ],
  },
  {
    slug: 'maos-francesas',
    title: 'Mãos francesas em metal',
    shortTitle: 'Mãos francesas',
    eyebrow: 'Prateleiras e suportes',
    description:
      'Mãos francesas artesanais em metal para prateleiras, bancadas e composições rústicas, com foco em resistência, acabamento e encaixe no projeto do cliente.',
    metaDescription:
      'Mãos francesas em metal feitas à mão em Teixeira de Freitas. Modelos rústicos, reforçados e sob medida para prateleiras e bancadas.',
    category: 'Mãos francesas',
    highlights: [
      'Peças reforçadas para uso real',
      'Visual rústico, industrial ou discreto',
      'Produção sob medida conforme carga e espaço',
      'Opção com madeira tratada e envernizada',
    ],
    applications: [
      'Prateleiras para cozinhas e salas',
      'Bancadas de apoio',
      'Lojas, vitrines e ambientes comerciais',
      'Decoração rústica ou industrial',
    ],
    process: [
      'Escolha do modelo e tamanho da mão francesa',
      'Definição da quantidade e tipo de instalação',
      'Produção com solda e acabamento adequados',
      'Instalação no local quando combinada',
    ],
    faq: [
      {
        question: 'As mãos francesas podem ser feitas sob medida?',
        answer:
          'Sim. As medidas podem ser ajustadas conforme a prateleira, parede, carga e estilo desejado.',
      },
      {
        question: 'A peça pode ir com madeira?',
        answer:
          'Sim. A Vianna Art’s também trabalha com metal combinado com madeira tratada e envernizada.',
      },
    ],
  },
  {
    slug: 'suportes-metalicos',
    title: 'Suportes metálicos sob medida',
    shortTitle: 'Suportes metálicos',
    eyebrow: 'Resistência e acabamento',
    description:
      'Suportes metálicos para prateleiras, vasos, bancadas, estruturas e necessidades específicas, feitos conforme medida, uso e acabamento desejado.',
    metaDescription:
      'Suportes metálicos sob medida em Teixeira de Freitas. Peças reforçadas para casas, lojas, bancadas, vasos e prateleiras.',
    category: 'Suportes metálicos',
    highlights: [
      'Suportes para diferentes cargas e ambientes',
      'Produção artesanal conforme medida',
      'Acabamento pensado para combinar com o espaço',
      'Projetos para casas, lojas e empresas',
    ],
    applications: [
      'Suporte para prateleiras',
      'Suporte para vasos e decoração',
      'Apoio para bancadas',
      'Estruturas metálicas para lojas',
    ],
    process: [
      'Avaliação da carga e local de uso',
      'Definição do desenho e medidas',
      'Produção da peça com solda de qualidade',
      'Entrega e instalação quando aplicável',
    ],
    faq: [
      {
        question: 'O suporte aguenta peso?',
        answer:
          'O suporte é projetado conforme o uso informado. Por isso, medidas, carga e local de instalação são avaliados antes do orçamento.',
      },
      {
        question: 'É possível pedir um modelo personalizado?',
        answer:
          'Sim. O cliente pode enviar referência ou explicar a necessidade para desenvolvimento sob medida.',
      },
    ],
  },
  {
    slug: 'metal-com-madeira',
    title: 'Peças em metal com madeira',
    shortTitle: 'Metal com madeira',
    eyebrow: 'Rusticidade e design',
    description:
      'Projetos que combinam estrutura metálica com madeira tratada e envernizada, ideais para estantes, prateleiras, móveis auxiliares e ambientes personalizados.',
    metaDescription:
      'Peças em metal com madeira tratada e envernizada em Teixeira de Freitas. Estantes, prateleiras e projetos personalizados.',
    category: 'Peças sob medida',
    highlights: [
      'Madeira tratada e envernizada',
      'Estrutura metálica resistente',
      'Visual rústico, artesanal e premium',
      'Projeto ajustado ao ambiente do cliente',
    ],
    applications: [
      'Estantes em metal e madeira',
      'Prateleiras decorativas',
      'Móveis auxiliares para casas',
      'Soluções para lojas e empresas',
    ],
    process: [
      'Definição do ambiente e medidas',
      'Escolha da composição entre metal e madeira',
      'Produção da estrutura e acabamento da madeira',
      'Entrega da peça pronta para uso',
    ],
    faq: [
      {
        question: 'A madeira já vai tratada?',
        answer:
          'Sim. A proposta é entregar peças com madeira tratada e envernizada, prontas para compor o ambiente.',
      },
      {
        question: 'Dá para fazer estantes e prateleiras personalizadas?',
        answer:
          'Sim. O projeto pode ser ajustado para casas, lojas, empresas e medidas específicas.',
      },
    ],
  },
  {
    slug: 'pecas-sob-medida',
    title: 'Peças em metal sob medida',
    shortTitle: 'Peças sob medida',
    eyebrow: 'Projetos personalizados',
    description:
      'Peças em metal feitas conforme a ideia do cliente, unindo resistência, rusticidade e design para ambientes residenciais, comerciais e projetos especiais.',
    metaDescription:
      'Peças em metal sob medida em Teixeira de Freitas. Projetos personalizados para casas, lojas, empresas e decoração.',
    category: 'Peças sob medida',
    highlights: [
      'Projetos do jeito que o cliente imagina',
      'Atendimento por WhatsApp ou presencial',
      'Acabamento artesanal e resistente',
      'Soluções para ambientes residenciais e comerciais',
    ],
    applications: [
      'Peças decorativas em metal',
      'Estruturas personalizadas',
      'Soluções para lojas e fachadas',
      'Composições com madeira',
    ],
    process: [
      'Envio da ideia, referência ou necessidade',
      'Análise de viabilidade, medidas e acabamento',
      'Orçamento conforme complexidade do projeto',
      'Produção artesanal e entrega combinada',
    ],
    faq: [
      {
        question: 'Preciso ter o desenho pronto?',
        answer:
          'Não. Uma referência, foto ou explicação da ideia já ajuda a iniciar o orçamento.',
      },
      {
        question: 'O prazo é sempre o mesmo?',
        answer:
          'Não. O prazo varia conforme tamanho, acabamento, materiais e complexidade da peça.',
      },
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return SERVICES.find((service) => service.slug === slug) ?? null;
}
