export type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl?: string | null;
  isPublished: boolean;
  publishedAt?: string | null;
};

export const POSTS: Post[] = [
  {
    id: '1',
    slug: 'pecas-sob-medida-em-metal',
    title: 'Peças sob medida em metal para projetos com personalidade',
    excerpt:
      'Entenda como uma peça artesanal pode transformar a função e o visual de um ambiente.',
    content:
      "Projetos sob medida permitem adaptar medidas, acabamento e estética ao ambiente. A Vianna Art's Metal & Design desenvolve peças em metal com foco em resistência, proporção e identidade visual.",
    imageUrl: null,
    isPublished: true,
    publishedAt: '2026-05-06',
  },
];
