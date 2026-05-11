'use client';

import { ImagePlus, RotateCcw, Trash2 } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { saveProductAction } from '@/app/admin/actions';
import { CATEGORIES, type Product } from '@/data/products';

type ProductAdminFormProps = {
  product?: Product;
};

export default function ProductAdminForm({ product }: ProductAdminFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState(product?.imageUrl ?? '');
  const [selectedPreviewUrl, setSelectedPreviewUrl] = useState<string | null>(null);
  const [removeImage, setRemoveImage] = useState(false);
  const hasCurrentImage = Boolean(product?.imageUrl);

  useEffect(() => {
    setPreviewUrl(product?.imageUrl ?? '');
    setRemoveImage(false);
  }, [product?.imageUrl]);

  useEffect(() => {
    return () => {
      if (selectedPreviewUrl) {
        URL.revokeObjectURL(selectedPreviewUrl);
      }
    };
  }, [selectedPreviewUrl]);

  const helperText = useMemo(() => {
    if (previewUrl) {
      return 'Prévia da imagem selecionada. Ao salvar, a foto será publicada no catálogo.';
    }

    return 'Envie uma imagem em JPG, PNG ou WebP com até 8 MB.';
  }, [previewUrl]);

  return (
    <form action={saveProductAction} className="mt-6 grid gap-5">
      {product && <input type="hidden" name="id" value={product.id} />}
      <input
        type="hidden"
        name="currentImageUrl"
        value={product?.imageUrl ?? ''}
      />
      <input type="hidden" name="removeImage" value={removeImage ? '1' : '0'} />

      <label className="form-field">
        Nome do produto
        <input name="name" required defaultValue={product?.name} />
      </label>

      <label className="form-field">
        Categoria
        <select name="category" required defaultValue={product?.category ?? CATEGORIES[0]}>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label className="form-field">
        Descrição
        <textarea name="description" required rows={4} defaultValue={product?.description} />
      </label>

      <div className="grid gap-5 md:grid-cols-2">
        <label className="form-field">
          Valor
          <input
            name="price"
            inputMode="decimal"
            placeholder="Ex.: 149,90"
            defaultValue={product?.price ?? ''}
          />
        </label>
        <label className="form-field">
          Valor promocional
          <input
            name="promotionalPrice"
            inputMode="decimal"
            placeholder="Ex.: 129,90"
            defaultValue={product?.promotionalPrice ?? ''}
          />
        </label>
      </div>

      <div className="grid gap-4">
        <label className="form-field">
          Foto do produto
          <input
            name="image"
            type="file"
            ref={fileInputRef}
            accept="image/jpeg,image/png,image/webp"
            onChange={(event) => {
              const file = event.target.files?.[0];

              if (!file) {
                setPreviewUrl(removeImage ? '' : product?.imageUrl ?? '');
                return;
              }

              if (selectedPreviewUrl) {
                URL.revokeObjectURL(selectedPreviewUrl);
              }

              const objectUrl = URL.createObjectURL(file);
              setSelectedPreviewUrl(objectUrl);
              setPreviewUrl(objectUrl);
              setRemoveImage(false);
            }}
          />
        </label>

        <div className="overflow-hidden border border-white/10 bg-coal">
          <div className="relative aspect-[4/3]">
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="Prévia do produto"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-3 product-texture text-center">
                <div className="grid h-14 w-14 place-items-center border border-gold/45 bg-black/35 text-gold">
                  <ImagePlus size={25} />
                </div>
                <span className="text-sm font-semibold text-white/62">
                  Nenhuma imagem selecionada
                </span>
              </div>
            )}
          </div>
        </div>
        <p className="text-xs leading-6 text-white/45">{helperText}</p>

        {hasCurrentImage && (
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                if (fileInputRef.current) {
                  fileInputRef.current.value = '';
                }
                if (selectedPreviewUrl) {
                  URL.revokeObjectURL(selectedPreviewUrl);
                  setSelectedPreviewUrl(null);
                }
                setRemoveImage(true);
                setPreviewUrl('');
              }}
              className="inline-flex items-center gap-2 border border-red-400/40 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-red-100 transition hover:bg-red-500/15"
            >
              <Trash2 size={14} />
              Remover foto
            </button>
            {removeImage && (
              <button
                type="button"
                onClick={() => {
                  setRemoveImage(false);
                  setPreviewUrl(product?.imageUrl ?? '');
                }}
                className="inline-flex items-center gap-2 border border-white/15 px-3 py-2 text-xs font-bold uppercase tracking-[0.12em] text-white/70 transition hover:border-gold hover:text-gold"
              >
                <RotateCcw size={14} />
                Restaurar foto
              </button>
            )}
          </div>
        )}
      </div>

      <div className="grid gap-3 text-sm text-white/70 md:grid-cols-2">
        <label className="flex items-center gap-3 border border-white/10 bg-white/[0.035] p-3">
          <input
            name="isFeatured"
            type="checkbox"
            defaultChecked={product?.featured ?? false}
          />
          Exibir em destaque
        </label>
        <label className="flex items-center gap-3 border border-white/10 bg-white/[0.035] p-3">
          <input
            name="isPublished"
            type="checkbox"
            defaultChecked={product?.isPublished ?? true}
          />
          Produto publicado
        </label>
      </div>

      <SubmitButton isEditing={Boolean(product)} />
    </form>
  );
}

function SubmitButton({ isEditing }: { isEditing: boolean }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="border border-gold bg-gold px-6 py-3.5 text-sm font-bold uppercase tracking-[0.12em] text-coal transition hover:bg-transparent hover:text-gold disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending
        ? isEditing
          ? 'Salvando alterações...'
          : 'Criando produto...'
        : isEditing
          ? 'Salvar alterações'
          : 'Salvar produto'}
    </button>
  );
}
