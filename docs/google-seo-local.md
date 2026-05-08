# Configuracao de SEO local

Este guia centraliza as etapas externas do Google para a Vianna Art's Metal & Design.

## Google Search Console

URL atual do site:

```text
https://vianna-arts.vercel.app
```

Sitemap:

```text
https://vianna-arts.vercel.app/sitemap.xml
```

### Como configurar agora

1. Acesse o Google Search Console com a conta Google do responsavel pela empresa.
2. Adicione uma propriedade do tipo `Prefixo do URL`.
3. Informe `https://vianna-arts.vercel.app`.
4. Escolha o metodo de verificacao por `Tag HTML`.
5. Copie apenas o conteudo do atributo `content`.
6. Na Vercel, adicione a variavel:

```text
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=CODIGO_COPIADO_DO_GOOGLE
```

7. Faca um novo deploy.
8. Volte ao Search Console e clique em `Verificar`.
9. Depois de verificado, envie o sitemap:

```text
https://vianna-arts.vercel.app/sitemap.xml
```

### Quando o dominio oficial estiver ativo

Quando `www.viannaarts.com` estiver comprado e configurado na Vercel, faca uma nova
propriedade no Search Console para o dominio oficial e atualize:

```text
NEXT_PUBLIC_SITE_URL=https://www.viannaarts.com
```

Depois envie o novo sitemap:

```text
https://www.viannaarts.com/sitemap.xml
```

## Perfil da Empresa no Google

Dados recomendados para cadastro:

```text
Nome da empresa: Vianna Art's Metal & Design
Categoria principal: Serralheria
Categorias secundarias: Loja de artigos para casa, Fabricante de metal, Servico de instalacao
Telefone: +55 73 99156-0123
WhatsApp: +55 73 99156-0123
Site: https://vianna-arts.vercel.app
Endereco: Av. Presidente Getulio Vargas, Centro, 3040, Teixeira de Freitas - BA
Horario: Segunda a sexta, das 8h as 16h
Instagram: https://www.instagram.com/viannaartsss
```

Descricao sugerida:

```text
A Vianna Art's Metal & Design e uma serralheria em Teixeira de Freitas - BA especializada em pecas em metal feitas a mao, maos francesas, suportes metalicos, decoracao em metal, pecas sob medida e projetos em metal com madeira tratada e envernizada. Atendemos residencias, lojas, empresas e projetos personalizados, com orcamento por WhatsApp ou presencialmente.
```

Servicos para cadastrar:

```text
Maos francesas em metal
Suportes metalicos
Pecas em metal sob medida
Metal com madeira
Estantes e prateleiras em metal e madeira
Decoracao em metal
Servicos de serralheria
Instalacao residencial
Projetos para lojas e empresas
```

Fotos prioritarias:

```text
Fachada da loja
Logo
Kauan Vianna ou equipe em ambiente de trabalho
Detalhes de solda e acabamento
Pecas com madeira tratada e envernizada
Maos francesas instaladas
Suportes metalicos instalados
Projetos em casas, lojas ou empresas
```

Observacao: a verificacao do Perfil da Empresa depende da conta Google do dono e
pode exigir telefone, video, documento ou outro metodo definido pelo Google.
