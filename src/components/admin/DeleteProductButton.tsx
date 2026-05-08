'use client';

import { useFormStatus } from 'react-dom';
import { deleteProductAction } from '@/app/admin/actions';

type DeleteProductButtonProps = {
  productId: string;
  productName: string;
};

export default function DeleteProductButton({
  productId,
  productName,
}: DeleteProductButtonProps) {
  return (
    <form action={deleteProductAction}>
      <input type="hidden" name="id" value={productId} />
      <SubmitButton productName={productName} />
    </form>
  );
}

function SubmitButton({ productName }: { productName: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      onClick={(event) => {
        const confirmed = window.confirm(
          `Excluir "${productName}"? Essa ação não pode ser desfeita.`,
        );

        if (!confirmed) {
          event.preventDefault();
        }
      }}
      className="border border-red-400/45 px-4 py-2 text-sm font-semibold text-red-100 transition hover:bg-red-500/15 disabled:cursor-not-allowed disabled:opacity-55"
    >
      {pending ? 'Excluindo...' : 'Excluir'}
    </button>
  );
}
