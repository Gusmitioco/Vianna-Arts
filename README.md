# Vianna Art's Metal & Design

Site institucional e catálogo administrável para a Vianna Art's Metal & Design.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase Auth, Database e Storage

## Desenvolvimento

```bash
npm install
npm run dev
```

O site roda em `http://localhost:3000` por padrão. Para usar outra porta:

```bash
npm run dev -- -p 5173
```

## Painel admin

O painel nao aparece na navegacao publica do site. Para acessar, digite:

```text
/goblin
```

## Supabase

1. Crie um projeto no Supabase.
2. Copie `.env.example` para `.env.local`.
3. Preencha `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL` e `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
4. Execute `supabase/schema.sql` no SQL Editor do Supabase.
5. Crie o usuario do dono em Authentication.
6. Defina a senha diretamente no Supabase Auth.
7. Copie o `user_id` criado e execute `supabase/admin-setup.sql`, trocando `UUID_DO_USUARIO_AUTH` pelo id real.

Sem `.env.local`, o site usa dados mockados e o painel exibe aviso de configuração.

Por seguranca, senha de administrador nao deve ficar em `.env.local`, SQL,
README ou codigo-fonte.

## URL publica e dominio

Enquanto o dominio oficial nao estiver comprado, use:

```text
NEXT_PUBLIC_SITE_URL=https://vianna-arts.vercel.app
```

Quando `www.viannaarts.com` estiver configurado na Vercel, altere essa variavel
para:

```text
NEXT_PUBLIC_SITE_URL=https://www.viannaarts.com
```

Essa URL alimenta canonical tags, Open Graph, `robots.txt`, `sitemap.xml` e dados
estruturados de SEO.

## Google Search Console e Perfil da Empresa

As etapas externas de SEO local estao documentadas em:

```text
docs/google-seo-local.md
```

Para verificar o site no Google Search Console por tag HTML, preencha na Vercel:

```text
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=CODIGO_COPIADO_DO_GOOGLE
```
