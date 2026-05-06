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
      'Peça robusta com acabamento artesanal, ideal para prateleiras rústicas e projetos decorativos.',
    price: 129,
    promotionalPrice: null,
    imageUrl: null,
    isPublished: true,
    featured: true,
  },
  {
    id: '2',
    slug: 'suporte-industrial-reforcado',
    name: 'Suporte Industrial Reforçado',
    category: 'Suportes metálicos',
    description:
      'Suporte metálico sob medida para bancadas, prateleiras pesadas e ambientes comerciais.',
    price: 189,
    promotionalPrice: 169,
    imageUrl: null,
    isPublished: true,
    featured: true,
  },
  {
    id: '3',
    slug: 'painel-decorativo-em-metal',
    name: 'Painel Decorativo em Metal',
    category: 'Decoração em metal',
    description:
      'Elemento decorativo com presença visual marcante, pensado para interiores e fachadas.',
    price: null,
    promotionalPrice: null,
    imageUrl: null,
    isPublished: true,
    featured: true,
  },
  {
    id: '4',
    slug: 'estrutura-personalizada',
    name: 'Estrutura Personalizada',
    category: 'Peças sob medida',
    description:
      'Desenvolvimento de peças exclusivas conforme necessidade, estilo e medidas do projeto.',
    price: null,
    promotionalPrice: null,
    imageUrl: null,
    isPublished: true,
  },
  {
    id: '5',
    slug: 'portao-e-grade-artesanal',
    name: 'Portão e Grade Artesanal',
    category: 'Serviços de serralheria',
    description:
      'Serviço de serralheria com acabamento cuidadoso para portões, grades e estruturas metálicas.',
    price: null,
    promotionalPrice: null,
    imageUrl: null,
    isPublished: true,
  },
  {
    id: '6',
    slug: 'suporte-para-vasos',
    name: 'Suporte para Vasos',
    category: 'Suportes metálicos',
    description:
      'Peça funcional e decorativa para jardins, varandas e composições internas com plantas.',
    price: 149,
    promotionalPrice: null,
    imageUrl: null,
    isPublished: true,
  },
  {
    id: '7',
    slug: 'mao-francesa-minimalista',
    name: 'Mão Francesa Minimalista',
    category: 'Mãos francesas',
    description:
      'Design limpo com acabamento premium para projetos modernos que pedem discrição e força.',
    price: 119,
    promotionalPrice: null,
    imageUrl: null,
    isPublished: true,
  },
  {
    id: '8',
    slug: 'letreiro-metalico',
    name: 'Letreiro Metálico',
    category: 'Decoração em metal',
    description:
      'Letreiros e elementos de marca em metal para ambientes comerciais, fachadas e decoração.',
    price: null,
    promotionalPrice: null,
    imageUrl: null,
    isPublished: true,
  },
];
