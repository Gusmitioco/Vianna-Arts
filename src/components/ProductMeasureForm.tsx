'use client';

import { MessageCircle, Send } from 'lucide-react';
import { useMemo, useState } from 'react';
import { COMPANY } from '@/data/company';
import type { Product } from '@/data/products';

type ProductMeasureFormProps = {
  product: Product;
};

export default function ProductMeasureForm({ product }: ProductMeasureFormProps) {
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [depth, setDepth] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [finish, setFinish] = useState('');
  const [notes, setNotes] = useState('');

  const whatsappUrl = useMemo(() => {
    const message = [
      `Olá! Tenho interesse na peça: ${product.name}.`,
      `Categoria: ${product.category}`,
      width ? `Largura: ${width}` : '',
      height ? `Altura: ${height}` : '',
      depth ? `Profundidade/avanço: ${depth}` : '',
      quantity ? `Quantidade: ${quantity}` : '',
      finish ? `Acabamento desejado: ${finish}` : '',
      notes ? `Observações: ${notes}` : '',
    ]
      .filter(Boolean)
      .join('\n');

    return `${COMPANY.whatsappUrl}?text=${encodeURIComponent(message)}`;
  }, [depth, finish, height, notes, product.category, product.name, quantity, width]);

  return (
    <div className="border border-white/10 bg-graphite p-6 shadow-hard">
      <div className="flex items-start gap-3">
        <div className="grid h-11 w-11 shrink-0 place-items-center border border-gold/45 text-gold">
          <MessageCircle size={21} />
        </div>
        <div>
          <h2 className="font-display text-3xl font-semibold text-white">
            Solicitar orçamento
          </h2>
          <p className="mt-3 text-sm leading-7 text-white/62">
            Informe medidas aproximadas e detalhes do projeto. A mensagem será
            enviada diretamente para o WhatsApp da Vianna Art's.
          </p>
        </div>
      </div>

      <div className="mt-7 grid gap-5 md:grid-cols-2">
        <label className="form-field">
          Largura
          <input
            value={width}
            onChange={(event) => setWidth(event.target.value)}
            placeholder="Ex.: 40 cm"
          />
        </label>
        <label className="form-field">
          Altura
          <input
            value={height}
            onChange={(event) => setHeight(event.target.value)}
            placeholder="Ex.: 25 cm"
          />
        </label>
        <label className="form-field">
          Profundidade/avanço
          <input
            value={depth}
            onChange={(event) => setDepth(event.target.value)}
            placeholder="Ex.: 30 cm"
          />
        </label>
        <label className="form-field">
          Quantidade
          <input
            value={quantity}
            onChange={(event) => setQuantity(event.target.value)}
            inputMode="numeric"
            placeholder="Ex.: 2"
          />
        </label>
      </div>

      <label className="form-field mt-5">
        Acabamento desejado
        <select value={finish} onChange={(event) => setFinish(event.target.value)}>
          <option value="">Selecionar depois</option>
          <option value="Preto fosco">Preto fosco</option>
          <option value="Preto brilhante">Preto brilhante</option>
          <option value="Rústico">Rústico</option>
          <option value="Natural/metal aparente">Natural/metal aparente</option>
          <option value="Sob orientação da Vianna Art's">
            Sob orientação da Vianna Art's
          </option>
        </select>
      </label>

      <label className="form-field mt-5">
        Observações
        <textarea
          value={notes}
          onChange={(event) => setNotes(event.target.value)}
          rows={5}
          placeholder="Ambiente de uso, referência, prazo, tipo de instalação ou outra informação importante"
        />
      </label>

      <a
        href={whatsappUrl}
        className="mt-6 inline-flex w-full items-center justify-center gap-2 border border-gold bg-gold px-6 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-coal transition hover:bg-transparent hover:text-gold md:w-auto"
      >
        <Send size={18} />
        Enviar medidas pelo WhatsApp
      </a>
    </div>
  );
}
