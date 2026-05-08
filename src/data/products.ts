export type ProductCategory =
  | 'Mãos francesas'
  | 'Suportes metálicos'
  | 'Decoração em metal'
  | 'Peças sob medida'
  | 'Serviços de serralheria';

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  description: string;
  price?: number | null;
  promotionalPrice?: number | null;
  imageUrl?: string | null;
  isPublished: boolean;
  featured?: boolean;
};

export const CATEGORIES: ProductCategory[] = [
  'Mãos francesas',
  'Suportes metálicos',
  'Decoração em metal',
  'Peças sob medida',
  'Serviços de serralheria',
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    slug: 'mao-francesa-colonial',
    name: 'Mão Francesa Colonial',
    category: 'Mãos francesas',
    description:
      'Modelo reforçado para prateleiras rústicas, com acabamento artesanal e boa presença visual.',
    price: 129,
    promotionalPrice: null,
    imageUrl: null,
    isPublished: true,
    featured: true,
  },
  {
    id: '2',
    slug: 'mao-francesa-industrial-promocao',
    name: 'Mão Francesa Industrial',
    category: 'Mãos francesas',
    description:
      'Peça com visual industrial para bancadas e prateleiras, em condição promocional para teste.',
    price: 159,
    promotionalPrice: 139,
    imageUrl: null,
    isPublished: true,
  },
  {
    id: '3',
    slug: 'mao-francesa-sob-medida',
    name: 'Mão Francesa Sob Medida',
    category: 'Mãos francesas',
    description:
      'Produção sob encomenda conforme medidas, carga desejada e acabamento escolhido pelo cliente.',
    price: null,
    promotionalPrice: null,
    imageUrl: null,
    isPublished: true,
  },
  {
    id: '4',
    slug: 'suporte-industrial-reforcado',
    name: 'Suporte Industrial Reforçado',
    category: 'Suportes metálicos',
    description:
      'Suporte metálico para bancadas, prateleiras pesadas e ambientes comerciais.',
    price: 189,
    promotionalPrice: null,
    imageUrl: null,
    isPublished: true,
    featured: true,
  },
  {
    id: '5',
    slug: 'suporte-para-vasos-promocao',
    name: 'Suporte para Vasos',
    category: 'Suportes metálicos',
    description:
      'Peça funcional e decorativa para jardins, varandas e composições internas com plantas.',
    price: 149,
    promotionalPrice: 119,
    imageUrl: null,
    isPublished: true,
  },
  {
    id: '6',
    slug: 'suporte-metalico-sob-encomenda',
    name: 'Suporte Metálico Sob Encomenda',
    category: 'Suportes metálicos',
    description:
      'Suporte produzido sob medida para necessidades específicas de carga, tamanho e instalação.',
    price: null,
    promotionalPrice: null,
    imageUrl: null,
    isPublished: true,
  },
  {
    id: '7',
    slug: 'painel-decorativo-em-metal',
    name: 'Painel Decorativo em Metal',
    category: 'Decoração em metal',
    description:
      'Elemento decorativo com presença visual marcante, pensado para interiores, fachadas e lojas.',
    price: 280,
    promotionalPrice: null,
    imageUrl: null,
    isPublished: true,
    featured: true,
  },
  {
    id: '8',
    slug: 'letreiro-metalico-promocao',
    name: 'Letreiro Metálico',
    category: 'Decoração em metal',
    description:
      'Letreiro em metal para decoração, fachada ou identificação visual de ambientes comerciais.',
    price: 320,
    promotionalPrice: 289,
    imageUrl: null,
    isPublished: true,
  },
  {
    id: '9',
    slug: 'decoracao-metalica-sob-encomenda',
    name: 'Decoração Metálica Sob Encomenda',
    category: 'Decoração em metal',
    description:
      'Peça decorativa personalizada conforme referência, tamanho, ambiente e acabamento desejado.',
    price: null,
    promotionalPrice: null,
    imageUrl: null,
    isPublished: true,
  },
  {
    id: '10',
    slug: 'estante-metal-madeira',
    name: 'Estante Metal e Madeira',
    category: 'Peças sob medida',
    description:
      'Estrutura em metal com madeira tratada e envernizada para casas, lojas e escritórios.',
    price: 490,
    promotionalPrice: null,
    imageUrl: null,
    isPublished: true,
  },
  {
    id: '11',
    slug: 'prateleira-metal-madeira-promocao',
    name: 'Prateleira Metal e Madeira',
    category: 'Peças sob medida',
    description:
      'Prateleira com estrutura metálica e madeira envernizada, em oferta para composições menores.',
    price: 260,
    promotionalPrice: 229,
    imageUrl: null,
    isPublished: true,
  },
  {
    id: '12',
    slug: 'estrutura-personalizada-sob-consulta',
    name: 'Estrutura Personalizada',
    category: 'Peças sob medida',
    description:
      'Desenvolvimento de peça exclusiva conforme medidas, estilo, ambiente e necessidade de uso.',
    price: null,
    promotionalPrice: null,
    imageUrl: null,
    isPublished: true,
  },
  {
    id: '13',
    slug: 'servico-instalacao-suportes',
    name: 'Instalação de Suportes',
    category: 'Serviços de serralheria',
    description:
      'Serviço de instalação e alinhamento de suportes metálicos em residências e ambientes comerciais.',
    price: 120,
    promotionalPrice: null,
    imageUrl: null,
    isPublished: true,
  },
  {
    id: '14',
    slug: 'servico-reparo-metalico-promocao',
    name: 'Reparo Metálico',
    category: 'Serviços de serralheria',
    description:
      'Reparo em peças metálicas simples, com avaliação prévia por WhatsApp ou presencialmente.',
    price: 180,
    promotionalPrice: 150,
    imageUrl: null,
    isPublished: true,
  },
  {
    id: '15',
    slug: 'servico-serralheria-sob-consulta',
    name: 'Serralheria Sob Consulta',
    category: 'Serviços de serralheria',
    description:
      'Serviços personalizados de serralheria para casas, lojas, empresas e projetos especiais.',
    price: null,
    promotionalPrice: null,
    imageUrl: null,
    isPublished: true,
  },
];
