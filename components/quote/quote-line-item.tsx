'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Minus, Package, Plus, Trash2 } from 'lucide-react';
import type { QuoteItem } from '@/store/quoteStore';

type QuoteLineItemProps = {
  item: QuoteItem;
  variant?: 'page' | 'drawer';
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
};

export function QuoteLineItem({
  item,
  variant = 'page',
  onDecrease,
  onIncrease,
  onRemove,
}: QuoteLineItemProps) {
  const compact = variant === 'drawer';
  const imageSrc = item.image?.trim() || null;
  const lineTotal = item.price * item.quantity;
  const [qtyFlash, setQtyFlash] = useState<'up' | 'down' | null>(null);

  const flash = (dir: 'up' | 'down') => {
    setQtyFlash(dir);
    window.setTimeout(() => setQtyFlash(null), 420);
  };

  const handleDecrease = () => {
    flash('down');
    onDecrease();
  };

  const handleIncrease = () => {
    flash('up');
    onIncrease();
  };

  return (
    <article
      className={`relative overflow-hidden rounded-2xl border border-slate-200 bg-white ${
        compact ? 'p-3' : 'p-3.5 sm:p-4'
      }`}
    >
      <span aria-hidden className="absolute left-0 top-0 h-full w-1 bg-[#F5C400]" />

      <div className={`flex gap-3 ${compact ? '' : 'sm:gap-4'}`}>
        <div
          className={`relative shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-[#f4f7fb] ${
            compact ? 'h-16 w-16' : 'h-[72px] w-[72px] sm:h-20 sm:w-20'
          }`}
        >
          {imageSrc ? (
            <Image
              src={imageSrc}
              alt={item.name}
              fill
              className="object-contain p-1.5"
              sizes={compact ? '64px' : '80px'}
              unoptimized
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <Package className="h-6 w-6 text-slate-300" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              {!compact && (
                <Link
                  href={`/productos?categoria=${encodeURIComponent(item.category)}`}
                  className="mb-1 inline-block rounded-md bg-[#0b2d60] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#F5C400] hover:text-[#0b2d60]"
                >
                  {item.category}
                </Link>
              )}
              <Link
                href={`/productos/${item.slug}`}
                className={`block font-bold leading-snug text-[#0b2d60] transition-colors hover:text-[#0b2d60]/80 ${
                  compact
                    ? 'line-clamp-2 text-sm'
                    : 'line-clamp-2 text-sm sm:text-[15px]'
                }`}
              >
                {item.name}
              </Link>
              {compact && item.category && (
                <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                  {item.category}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onRemove}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600"
              aria-label={`Eliminar ${item.name}`}
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          </div>

          <div
            className={`flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 ${
              compact ? 'mt-2 pt-2' : 'mt-3 pt-3'
            }`}
          >
            <div
              className={`inline-flex h-9 items-center overflow-hidden rounded-full border bg-white transition-colors duration-300 ${
                qtyFlash === 'up'
                  ? 'border-emerald-400'
                  : qtyFlash === 'down'
                    ? 'border-red-400'
                    : 'border-slate-200'
              }`}
            >
              <button
                type="button"
                onClick={handleDecrease}
                className={`flex h-full w-9 items-center justify-center transition-colors duration-300 ${
                  qtyFlash === 'down'
                    ? 'bg-red-500 text-white'
                    : 'text-[#0b2d60] hover:bg-slate-50'
                }`}
                aria-label="Disminuir cantidad"
              >
                <Minus className="h-3.5 w-3.5" strokeWidth={2.5} />
              </button>
              <span
                className={`min-w-8 border-x text-center text-sm font-bold transition-colors duration-300 ${
                  qtyFlash === 'up'
                    ? 'border-emerald-200 text-emerald-700'
                    : qtyFlash === 'down'
                      ? 'border-red-200 text-red-600'
                      : 'border-slate-200 text-[#0b2d60]'
                }`}
              >
                {item.quantity}
              </span>
              <button
                type="button"
                onClick={handleIncrease}
                className={`flex h-full w-9 items-center justify-center transition-colors duration-300 ${
                  qtyFlash === 'up'
                    ? 'bg-emerald-500 text-white'
                    : 'text-[#0b2d60] hover:bg-slate-50'
                }`}
                aria-label="Aumentar cantidad"
              >
                <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />
              </button>
            </div>

            <div className="text-right">
              <p
                className={`font-black text-[#0b2d60] ${
                  compact ? 'text-sm' : 'text-base sm:text-lg'
                }`}
              >
                S/ {lineTotal.toFixed(2)}
              </p>
              {!compact && item.quantity > 1 && (
                <p className="text-[11px] text-slate-500">
                  S/ {item.price.toFixed(2)} c/u
                </p>
              )}
              {compact && (
                <p className="text-[10px] text-slate-500">
                  S/ {item.price.toFixed(2)} c/u
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
