# Fotos dos produtos

O painel admin esta preparado para receber fotos reais dos produtos quando elas
estiverem prontas.

## Formatos aceitos

Use preferencialmente:

```text
JPG
PNG
WebP
```

Limite por imagem:

```text
8 MB
```

Recomendacao para melhor resultado:

```text
Proporcao: 4:3 ou imagens horizontais proximas disso
Largura ideal: 1600 px a 2400 px
Fundo: ambiente real, bancada, parede ou produto instalado
Iluminacao: natural ou bem iluminada
```

## Como cadastrar no painel

1. Acesse `/goblin`.
2. Crie ou edite um produto.
3. Selecione a foto no campo `Foto do produto`.
4. Confira a previa.
5. Salve o produto.

Ao trocar uma foto, o sistema envia a nova imagem para o Supabase Storage e tenta
remover a imagem antiga do bucket para evitar acumulo desnecessario.

## Configuracao do Supabase Storage

Para projetos novos, `supabase/schema.sql` ja configura o bucket.

Para projetos que ja estavam rodando antes dessa melhoria, execute no SQL Editor:

```text
supabase/storage-product-images.sql
```

Bucket usado:

```text
product-images
```

Politicas aplicadas:

```text
Leitura publica das imagens
Upload apenas para usuarios admin
Atualizacao apenas para usuarios admin
Exclusao apenas para usuarios admin
```
