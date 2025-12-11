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
    <Button size="lg" className="shadow-sm" onClick={() => addItem(product)}>
      <Plus className="h-4 w-4" />
      Agregar a cotización
    </Button>
  );
}

