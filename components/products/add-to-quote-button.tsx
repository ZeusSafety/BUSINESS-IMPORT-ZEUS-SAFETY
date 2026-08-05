'use client';

import { Button } from '@/components/ui/button';
import { Product } from '@/lib/mockData';
import { useQuoteStore } from '@/store/quoteStore';
import { Plus } from 'lucide-react';

type Props = {
  product: Product;
};

export function AddToQuoteButton({ product }: Props) {
  const addItem = useQuoteStore((state) => state.addItem);

  return (
    <Button
      size="lg"
      className="h-12 w-full rounded-none bg-[#F5C400] text-sm font-bold uppercase tracking-wide text-[#0b2d60] shadow-none transition-colors hover:bg-[#ffd233]"
      onClick={() => addItem(product)}
    >
      <Plus className="mr-2 h-5 w-5" strokeWidth={2.5} />
      Agregar a cotización
    </Button>
  );
}
