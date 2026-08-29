'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/mockData';
import type { CatalogProduct } from '@/lib/product-catalog';
import { Minus, Package, Plus } from 'lucide-react';
import { useQuoteStore } from '@/store/quoteStore';
import { useCallback, useState } from 'react';
import { Toast } from '@/components/ui/toast';

interface ProductCardProps {
  product: Product | CatalogProduct;
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
      <article className="group flex h-full flex-col overflow-hidden border border-slate-200 bg-white transition hover:border-[#0b2d60]/25 hover:shadow-[0_12px_32px_rgba(11,45,96,0.1)]">
        <div className="relative aspect-[4/3] bg-slate-50">
          <Link
            href={`/productos?categoria=${encodeURIComponent(product.category)}`}
            onClick={(e) => e.stopPropagation()}
            className="absolute left-0 top-0 z-20 bg-[#0b2d60] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#F5C400] hover:text-[#0b2d60]"
          >
            {product.category}
          </Link>

          <span
            aria-hidden
            className="absolute right-0 top-0 z-10 h-8 w-10 bg-[#0b2d60]"
            style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }}
          />
          <span
            aria-hidden
            className="absolute right-0 top-0 z-10 h-5 w-7 bg-[#F5C400]"
            style={{ clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 0 100%)' }}
          />

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

          <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5">
            <span className="inline-flex items-center rounded-full border border-emerald-300/80 bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-800 sm:text-[10px]">
              Delivery en 24 horas
            </span>
            <span className="inline-flex items-center rounded-full border border-slate-300 bg-slate-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-700 sm:text-[10px]">
              Recojo en tienda
            </span>
          </div>

          <div className="mt-auto space-y-2 pt-3">
            <div className="mx-auto flex h-9 w-full max-w-[140px] items-center border border-slate-200">
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
              className="h-10 w-full bg-slate-100 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#F5C400]"
            >
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
