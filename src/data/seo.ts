const DEFAULT_SITE_URL = 'https://vianna-arts.vercel.app';

function normalizeSiteUrl(url?: string) {
  const rawUrl = url?.trim();

  if (!rawUrl) {
    return DEFAULT_SITE_URL;
  }

  const urlWithProtocol = /^https?:\/\//i.test(rawUrl)
    ? rawUrl
    : `https://${rawUrl}`;

  return urlWithProtocol.replace(/\/+$/, '');
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);

export const LOCAL_SEO = {
  city: 'Teixeira de Freitas',
  state: 'BA',
  region: 'Teixeira de Freitas e região',
  primaryKeyword: 'serralheria em Teixeira de Freitas',
  serviceKeywords: [
    'serralheria em Teixeira de Freitas',
    'peças em metal sob medida',
    'mãos francesas em metal',
    'suportes metálicos',
    'metal com madeira',
    'prateleiras de metal e madeira',
    'serralheria para casas e lojas',
  ],
};
