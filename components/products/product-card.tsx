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

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useQuoteStore((state) => state.addItem);
  const [qty, setQty] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [qtyFlash, setQtyFlash] = useState<'up' | 'down' | null>(null);
  const imageSrc = product.image?.trim() || null;

  const handleCloseToast = useCallback(() => {
    setShowToast(false);
  }, []);

  const handleAddToQuote = () => {
    try {
      addItem(product, qty);
      setIsAdding(true);
      setShowToast(true);
      window.setTimeout(() => setIsAdding(false), 1200);
    } catch (error) {
      console.error('Error al agregar a cotización', error);
    }
  };

  return (
    <>
      <article className="zeus-card group relative flex h-full flex-col overflow-hidden rounded-xl transition hover:border-[#0b2d60]/25 hover:shadow-[0_12px_32px_rgba(11,45,96,0.1)]">
        <div className="pointer-events-none absolute inset-0 z-30 overflow-hidden opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <div className="absolute -left-full top-0 h-full w-1/2 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-[300%]" />
        </div>

        <div className="relative aspect-[4/3] bg-slate-50">
          <Link
            href={`/productos?categoria=${encodeURIComponent(product.category)}`}
            onClick={(e) => e.stopPropagation()}
            className="absolute left-0 top-0 z-20 rounded-br-lg bg-[#0b2d60] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#F5C400] hover:text-[#0b2d60]"
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
            <div className="absolute inset-0 z-30 flex items-center justify-center rounded-t-xl bg-[#0b2d60]/90">
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
            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-emerald-800">
              <Truck className="h-3 w-3 shrink-0" strokeWidth={2.5} />
              Delivery 24h
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-sky-800">
              <Store className="h-3 w-3 shrink-0" strokeWidth={2.5} />
              Recojo tienda
            </span>
          </div>

          <div className="mt-auto space-y-2 pt-3">
            <div
              className={`mx-auto flex h-9 w-full max-w-[140px] items-center overflow-hidden rounded-full border transition-all duration-300 ${
                qtyFlash === 'up'
                  ? 'scale-105 border-emerald-400 bg-emerald-50 shadow-[0_0_0_3px_rgba(16,185,129,0.25)]'
                  : qtyFlash === 'down'
                    ? 'scale-105 border-red-400 bg-red-50 shadow-[0_0_0_3px_rgba(239,68,68,0.22)]'
                    : 'border-slate-200 bg-white'
              }`}
            >
              <button
                type="button"
                aria-label="Menos"
                onClick={() => {
                  setQty((q) => {
                    if (q <= 1) return 1;
                    setQtyFlash('down');
                    window.setTimeout(() => setQtyFlash(null), 420);
                    return q - 1;
                  });
                }}
                className={`flex h-full w-9 items-center justify-center transition-colors ${
                  qtyFlash === 'down'
                    ? 'bg-red-500 text-white'
                    : 'text-[#0b2d60] hover:bg-slate-50'
                }`}
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span
                className={`flex-1 text-center text-sm font-bold transition-colors duration-300 ${
                  qtyFlash === 'up'
                    ? 'text-emerald-700'
                    : qtyFlash === 'down'
                      ? 'text-red-600'
                      : 'text-[#0b2d60]'
                }`}
              >
                {qty}
              </span>
              <button
                type="button"
                aria-label="Más"
                onClick={() => {
                  setQty((q) => q + 1);
                  setQtyFlash('up');
                  window.setTimeout(() => setQtyFlash(null), 420);
                }}
                className={`flex h-full w-9 items-center justify-center transition-colors ${
                  qtyFlash === 'up'
                    ? 'bg-emerald-500 text-white'
                    : 'text-[#0b2d60] hover:bg-slate-50'
                }`}
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
            <button
              type="button"
              onClick={handleAddToQuote}
              className="group/btn relative flex h-10 w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-slate-200 bg-white text-xs font-bold uppercase tracking-wide text-[#0b2d60] shadow-sm transition-all duration-300 hover:border-[#F5C400] hover:shadow-[0_6px_18px_rgba(245,196,0,0.35)] hover:-translate-y-0.5"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-[#F5C400] transition-transform duration-300 ease-out group-hover/btn:scale-x-100"
              />
              <ShoppingCart
                className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:scale-110"
                strokeWidth={2.5}
              />
              <span className="relative z-10">Cotizar</span>
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
