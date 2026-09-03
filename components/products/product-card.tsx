'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/mockData';
import type { CatalogProduct } from '@/lib/product-catalog';
import { Minus, Package, Plus, ShoppingCart, Truck, Store } from 'lucide-react';
import { useQuoteStore } from '@/store/quoteStore';
import { useCallback, useState } from 'react';
import { Toast } from '@/components/ui/toast';

interface ProductCardProps {
  product: Product | CatalogProduct;
}

const categoryColors: Record<string, string> = {
  'Protección Manual': 'bg-[#0b2d60] text-white hover:bg-[#F5C400] hover:text-[#0b2d60]',
  'Protección Visual': 'bg-[#1a6b3c] text-white hover:bg-[#22c55e] hover:text-white',
  'Protección Respiratoria': 'bg-[#9f1239] text-white hover:bg-[#f43f5e] hover:text-white',
  'Protección de Cabeza': 'bg-[#b45309] text-white hover:bg-[#f59e0b] hover:text-[#0b2d60]',
  'Protección Auditiva': 'bg-[#6d28d9] text-white hover:bg-[#a78bfa] hover:text-white',
  'Calzado de Seguridad': 'bg-[#0e7490] text-white hover:bg-[#22d3ee] hover:text-[#0b2d60]',
  'Protección Corporal': 'bg-[#c2410c] text-white hover:bg-[#fb923c] hover:text-[#0b2d60]',
};

function getCategoryColor(category: string) {
  return categoryColors[category] || 'bg-[#0b2d60] text-white hover:bg-[#F5C400] hover:text-[#0b2d60]';
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useQuoteStore((state) => state.addItem);
  const [qty, setQty] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const imageSrc = product.image?.trim() || null;

  const handleCloseToast = useCallback(() => {
    setShowToast(false);
  }, []);

  const handleAddToQuote = () => {
    addItem(product, qty);
    setIsAdding(true);
    setShowToast(true);
    setTimeout(() => setIsAdding(false), 1200);
  };

  return (
    <>
      <article className="zeus-card group relative flex h-full flex-col overflow-hidden transition hover:border-[#0b2d60]/25 hover:shadow-[0_12px_32px_rgba(11,45,96,0.1)]">
        {/* Shine animation on hover */}
        <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute -left-full top-0 h-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[300%]" />
        </div>

        {/* Category header bar */}
        <div className={`flex items-center justify-center px-3 py-2 text-[10px] font-bold uppercase tracking-wide ${getCategoryColor(product.category).split(' hover:')[0]}`}>
          {product.category}
        </div>

        <div className="relative aspect-[4/3] bg-slate-50">
          <Link
            href={`/productos/${product.slug}`}
            className="absolute inset-0 block"
          >
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={product.name}
                fill
                className="object-contain p-4 transition duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <Package className="h-10 w-10 text-slate-300" />
              </div>
            )}
          </Link>

          {isAdding && (
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#0b2d60]/90">
              <span className="text-sm font-bold text-white">¡Agregado!</span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col px-3 py-3 text-center">
          <Link
            href={`/productos/${product.slug}`}
            className="line-clamp-2 text-sm font-bold text-[#0c1427] transition-colors hover:text-[#0b2d60]"
          >
            {product.name}
          </Link>
          {'variantCount' in product && product.variantCount > 1 && (
            <p className="mt-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
              Varias tallas y colores
            </p>
          )}

          <div className="mt-2.5 flex items-center justify-center gap-1.5">
            <span className="inline-flex items-center gap-1 border border-emerald-200 bg-emerald-50 px-1.5 py-1 text-[9px] font-bold uppercase tracking-wide text-emerald-800">
              <Truck className="h-3 w-3 shrink-0" strokeWidth={2.5} />
              Delivery 24h
            </span>
            <span className="inline-flex items-center gap-1 border border-sky-200 bg-sky-50 px-1.5 py-1 text-[9px] font-bold uppercase tracking-wide text-sky-800">
              <Store className="h-3 w-3 shrink-0" strokeWidth={2.5} />
              Recojo tienda
            </span>
          </div>

          <div className="mt-auto space-y-2 pt-3">
            <div className="mx-auto flex h-9 w-full max-w-[140px] items-center overflow-hidden border border-slate-200">
              <button
                type="button"
                aria-label="Menos"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-full w-9 items-center justify-center text-[#0b2d60] hover:bg-slate-50"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="flex-1 text-sm font-bold text-[#0b2d60]">{qty}</span>
              <button
                type="button"
                aria-label="Más"
                onClick={() => setQty((q) => q + 1)}
                className="flex h-full w-9 items-center justify-center text-[#0b2d60] hover:bg-slate-50"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAddToQuote}
              className="flex h-10 w-full items-center justify-center gap-2 bg-[#0b2d60] text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#F5C400] hover:text-[#0b2d60]"
            >
              <ShoppingCart className="h-3.5 w-3.5" strokeWidth={2.5} />
              Cotizar
            </button>
          </div>
        </div>
      </article>

      <Toast
        title="¡Bien hecho!"
        message="Producto agregado correctamente a tu cotización."
        imageSrc={imageSrc}
        imageAlt={product.name}
        isVisible={showToast}
        onClose={handleCloseToast}
      />
    </>
  );
}
