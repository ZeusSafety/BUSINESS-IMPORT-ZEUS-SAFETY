'use client';

import { Product } from '@/lib/mockData';
import { useQuoteStore } from '@/store/quoteStore';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Toast } from '@/components/ui/toast';
import { Factory, Plus, Eye, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const addItem = useQuoteStore((state) => state.addItem);
  const [showToast, setShowToast] = useState(false);

  const handleAddItem = () => {
    addItem(product);
    setShowToast(true);
  };

  return (
    <>
      <Card className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg hover:border-[#103a7b]/20">
      <CardHeader className="p-4 pb-2.5">
        {/* Header con categoría y marca */}
        <div className="mb-2 flex items-start justify-between gap-2">
          <Badge className="bg-[#103a7b] text-white border-0 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em] rounded-full">
            {product.category}
          </Badge>
          <div className="flex items-center gap-1 rounded-md bg-slate-50 px-2 py-0.5 border border-slate-200">
            <Factory className="h-3 w-3 text-[#103a7b]" />
            <span className="text-[10px] font-semibold text-slate-700">{product.brand}</span>
          </div>
        </div>
        
        {/* Título del producto */}
        <h3 className="text-base font-bold leading-tight text-slate-900 line-clamp-2 mb-1.5">
          {product.name}
        </h3>
        
        {/* Descripción */}
        <p className="text-xs leading-relaxed text-slate-600 line-clamp-2">
          {product.description}
        </p>
      </CardHeader>

      <CardContent className="flex-1 px-4 pb-2.5">
        {/* Imagen del producto - más ancha y menos alta */}
        <div className="relative mb-2.5 h-32 overflow-hidden rounded-lg bg-gradient-to-br from-slate-50 via-white to-slate-100 border border-slate-200">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-2"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#103a7b]/10 to-slate-200/50" />
            </div>
          )}
        </div>
        
        {/* Certificaciones - más compactas */}
        <div className="flex flex-wrap gap-1.5">
          {product.certification.map((cert) => (
            <span
              key={cert}
              className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-slate-700 border border-slate-200"
            >
              <ShieldCheck className="h-2.5 w-2.5 text-[#103a7b]" />
              {cert}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col gap-2 border-t border-slate-100 bg-slate-50/50 p-4">
        {/* Precio */}
        <div className="flex w-full items-baseline justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-0.5">
              Desde
            </p>
            <p className="text-2xl font-black text-[#103a7b]">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="flex w-full items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 h-9 border-slate-300 text-slate-700 hover:bg-white hover:text-[#103a7b] hover:border-[#103a7b] text-xs font-medium"
          >
            <Link href={`/productos/${product.slug}`} className="flex items-center justify-center gap-1.5">
              <Eye className="h-3.5 w-3.5" />
              <span>Ver</span>
            </Link>
          </Button>
          <Button
            size="sm"
            className="flex-1 h-9 bg-[#103a7b] text-white hover:bg-[#0b2d60] shadow-md hover:shadow-lg text-xs font-semibold"
            onClick={handleAddItem}
          >
            <Plus className="h-3.5 w-3.5 mr-1" />
            <span>Agregar</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
    <Toast
      message="Producto agregado correctamente"
      isVisible={showToast}
      onClose={() => setShowToast(false)}
    />
    </>
  );
}

