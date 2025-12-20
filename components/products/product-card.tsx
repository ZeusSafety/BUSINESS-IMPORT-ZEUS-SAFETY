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
      <Card className="group relative flex h-full flex-col overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-md transition-all duration-300 hover:shadow-2xl hover:border-[#00b5e2]/40 hover:-translate-y-1">
      <CardHeader className="p-5 pb-3">
        {/* Header con categoría y marca */}
        <div className="mb-3 flex items-start justify-between gap-2">
          <Badge className="bg-gradient-to-r from-[#00b5e2] to-[#103a7b] text-white border-0 px-3.5 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] rounded-lg shadow-md">
            {product.category}
          </Badge>
          <div className="flex items-center gap-1.5 rounded-lg bg-gradient-to-br from-slate-50 to-white px-2.5 py-1 border-2 border-slate-200 shadow-sm">
            <Factory className="h-3.5 w-3.5 text-[#103a7b]" />
            <span className="text-[10px] font-bold text-slate-800">{product.brand}</span>
          </div>
        </div>
        
        {/* Título del producto */}
        <h3 className="text-base font-black leading-tight text-slate-900 line-clamp-2 mb-2">
          {product.name}
        </h3>
        
        {/* Descripción */}
        <p className="text-xs leading-relaxed text-slate-600 line-clamp-2">
          {product.description}
        </p>
      </CardHeader>

      <CardContent className="flex-1 px-5 pb-3">
        {/* Imagen del producto - más ancha y menos alta */}
        <div className="relative mb-3 h-36 overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 via-white to-slate-100 border-2 border-slate-200 shadow-inner">
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
        {product.certification && product.certification.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {product.certification.map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-1 rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wide text-amber-800 border border-amber-200 shadow-sm"
              >
                <ShieldCheck className="h-2.5 w-2.5 text-amber-600" />
                {cert}
              </span>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter className="flex flex-col gap-3 border-t-2 border-slate-200 bg-gradient-to-br from-slate-50 to-white p-5">
        {/* Precio */}
        <div className="flex w-full items-baseline justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Desde
            </p>
            <p className="text-3xl font-black bg-gradient-to-r from-[#103a7b] to-[#00b5e2] bg-clip-text text-transparent">
              ${product.price.toFixed(2)}
            </p>
          </div>
        </div>
        
        {/* Botones de acción */}
        <div className="flex w-full items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="flex-1 h-10 border-2 border-slate-300 text-slate-700 hover:bg-white hover:text-[#103a7b] hover:border-[#103a7b] hover:shadow-md text-xs font-semibold transition-all"
          >
            <Link href={`/productos/${encodeURIComponent(product.slug)}`} className="flex items-center justify-center gap-1.5">
              <Eye className="h-4 w-4" />
              <span>Ver</span>
            </Link>
          </Button>
          <Button
            size="sm"
            className="flex-1 h-10 bg-gradient-to-r from-[#103a7b] to-[#00b5e2] text-white hover:from-[#0b2d60] hover:to-[#0099cc] shadow-lg hover:shadow-xl text-xs font-bold transition-all"
            onClick={handleAddItem}
          >
            <Plus className="h-4 w-4 mr-1" />
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

