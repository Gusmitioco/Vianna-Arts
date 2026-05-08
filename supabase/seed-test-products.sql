-- Produtos de teste para popular o catálogo na fase de revisão.
-- Execute no SQL Editor do Supabase depois de rodar supabase/schema.sql.

insert into public.products (
  slug,
  name,
  category,
  description,
  price,
  promotional_price,
  image_url,
  is_featured,
  is_published
) values
(
  'mao-francesa-colonial',
  'Mão Francesa Colonial',
  'Mãos francesas',
  'Modelo reforçado para prateleiras rústicas, com acabamento artesanal e boa presença visual.',
  129.00,
  null,
  null,
  true,
  true
),
(
  'mao-francesa-industrial-promocao',
  'Mão Francesa Industrial',
  'Mãos francesas',
  'Peça com visual industrial para bancadas e prateleiras, em condição promocional para teste.',
  159.00,
  139.00,
  null,
  false,
  true
),
(
  'mao-francesa-sob-medida',
  'Mão Francesa Sob Medida',
  'Mãos francesas',
  'Produção sob encomenda conforme medidas, carga desejada e acabamento escolhido pelo cliente.',
  null,
  null,
  null,
  false,
  true
),
(
  'suporte-industrial-reforcado',
  'Suporte Industrial Reforçado',
  'Suportes metálicos',
  'Suporte metálico para bancadas, prateleiras pesadas e ambientes comerciais.',
  189.00,
  null,
  null,
  true,
  true
),
(
  'suporte-para-vasos-promocao',
  'Suporte para Vasos',
  'Suportes metálicos',
  'Peça funcional e decorativa para jardins, varandas e composições internas com plantas.',
  149.00,
  119.00,
  null,
  false,
  true
),
(
  'suporte-metalico-sob-encomenda',
  'Suporte Metálico Sob Encomenda',
  'Suportes metálicos',
  'Suporte produzido sob medida para necessidades específicas de carga, tamanho e instalação.',
  null,
  null,
  null,
  false,
  true
),
(
  'painel-decorativo-em-metal',
  'Painel Decorativo em Metal',
  'Decoração em metal',
  'Elemento decorativo com presença visual marcante, pensado para interiores, fachadas e lojas.',
  280.00,
  null,
  null,
  true,
  true
),
(
  'letreiro-metalico-promocao',
  'Letreiro Metálico',
  'Decoração em metal',
  'Letreiro em metal para decoração, fachada ou identificação visual de ambientes comerciais.',
  320.00,
  289.00,
  null,
  false,
  true
),
(
  'decoracao-metalica-sob-encomenda',
  'Decoração Metálica Sob Encomenda',
  'Decoração em metal',
  'Peça decorativa personalizada conforme referência, tamanho, ambiente e acabamento desejado.',
  null,
  null,
  null,
  false,
  true
),
(
  'estante-metal-madeira',
  'Estante Metal e Madeira',
  'Peças sob medida',
  'Estrutura em metal com madeira tratada e envernizada para casas, lojas e escritórios.',
  490.00,
  null,
  null,
  false,
  true
),
(
  'prateleira-metal-madeira-promocao',
  'Prateleira Metal e Madeira',
  'Peças sob medida',
  'Prateleira com estrutura metálica e madeira envernizada, em oferta para composições menores.',
  260.00,
  229.00,
  null,
  false,
  true
),
(
  'estrutura-personalizada-sob-consulta',
  'Estrutura Personalizada',
  'Peças sob medida',
  'Desenvolvimento de peça exclusiva conforme medidas, estilo, ambiente e necessidade de uso.',
  null,
  null,
  null,
  false,
  true
),
(
  'servico-instalacao-suportes',
  'Instalação de Suportes',
  'Serviços de serralheria',
  'Serviço de instalação e alinhamento de suportes metálicos em residências e ambientes comerciais.',
  120.00,
  null,
  null,
  false,
  true
),
(
  'servico-reparo-metalico-promocao',
  'Reparo Metálico',
  'Serviços de serralheria',
  'Reparo em peças metálicas simples, com avaliação prévia por WhatsApp ou presencialmente.',
  180.00,
  150.00,
  null,
  false,
  true
),
(
  'servico-serralheria-sob-consulta',
  'Serralheria Sob Consulta',
  'Serviços de serralheria',
  'Serviços personalizados de serralheria para casas, lojas, empresas e projetos especiais.',
  null,
  null,
  null,
  false,
  true
)
on conflict (slug) do update set
  name = excluded.name,
  category = excluded.category,
  description = excluded.description,
  price = excluded.price,
  promotional_price = excluded.promotional_price,
  image_url = excluded.image_url,
  is_featured = excluded.is_featured,
  is_published = excluded.is_published,
  updated_at = now();
