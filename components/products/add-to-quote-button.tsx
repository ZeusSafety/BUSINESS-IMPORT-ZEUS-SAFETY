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
      className="w-full h-12 bg-gradient-to-r from-[#103a7b] to-[#00b5e2] text-white hover:from-[#0b2d60] hover:to-[#0099cc] shadow-lg hover:shadow-xl font-bold transition-all"
      onClick={() => addItem(product)}
    >
      <Plus className="h-5 w-5 mr-2" />
      Agregar a cotización
    </Button>
  );
}

