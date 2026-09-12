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

  const qtyControl = (
    <div
      className={`inline-flex h-9 items-center overflow-hidden rounded-xl border bg-white transition-colors duration-300 ${
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
  );

  if (compact) {
    return (
      <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 transition-all duration-300 hover:border-[#F5C400]/50 hover:shadow-[0_10px_28px_rgba(11,45,96,0.1)]">
        <span
          aria-hidden
          className="absolute left-0 top-0 h-full w-1 bg-[#F5C400] opacity-70 transition-opacity group-hover:opacity-100"
        />

        <div className="flex gap-3">
          <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-[#f4f7fb]">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={item.name}
                fill
                className="object-contain p-1.5"
                sizes="64px"
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
                <Link
                  href={`/productos/${item.slug}`}
                  className="line-clamp-2 block text-sm font-bold leading-snug text-[#0b2d60]"
                >
                  {item.name}
                </Link>
                {item.category && (
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

            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-2">
              {qtyControl}
              <div className="text-right">
                <p
                  className={`text-sm font-black transition-colors duration-300 ${
                    qtyFlash === 'up'
                      ? 'text-emerald-600'
                      : qtyFlash === 'down'
                        ? 'text-red-600'
                        : 'text-[#0b2d60]'
                  }`}
                >
                  S/ {lineTotal.toFixed(2)}
                </p>
                <p className="text-[10px] text-slate-500">
                  S/ {item.price.toFixed(2)} c/u
                </p>
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white px-4 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F5C400]/50 hover:shadow-[0_14px_36px_rgba(11,45,96,0.12)] sm:px-5">
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-1 bg-[#F5C400] opacity-70 transition-opacity group-hover:opacity-100"
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
        <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center sm:gap-4">
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-[#f4f7fb] transition-transform duration-300 group-hover:scale-[1.02] sm:h-24 sm:w-24">
            {imageSrc ? (
              <Image
                src={imageSrc}
                alt={item.name}
                fill
                className="object-contain p-1.5"
                sizes="96px"
                unoptimized
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Package className="h-7 w-7 text-slate-300" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2 sm:block">
              <div className="min-w-0">
                <Link
                  href={`/productos?categoria=${encodeURIComponent(item.category)}`}
                  className="mb-1 inline-block rounded-md bg-[#0b2d60] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-[#F5C400] hover:text-[#0b2d60]"
                >
                  {item.category}
                </Link>
                <Link
                  href={`/productos/${item.slug}`}
                  className="line-clamp-2 block text-sm font-bold leading-snug text-[#0b2d60] transition-colors group-hover:text-[#0a2552] sm:text-[15px]"
                >
                  {item.name}
                </Link>
              </div>
              <button
                type="button"
                onClick={onRemove}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600 sm:hidden"
                aria-label={`Eliminar ${item.name}`}
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="grid min-w-0 flex-1 grid-cols-3 divide-x divide-slate-200 overflow-hidden rounded-xl border border-slate-100 bg-[#f8fafc] sm:flex-none sm:min-w-[320px] lg:min-w-[360px]">
            <div className="flex flex-col items-center justify-center gap-1.5 px-2 py-2.5 sm:px-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Cantidad
              </p>
              {qtyControl}
            </div>
            <div className="flex flex-col items-center justify-center gap-1 px-2 py-2.5 sm:px-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Precio u.
              </p>
              <p className="text-sm font-bold text-[#0b2d60]">
                S/ {item.price.toFixed(2)}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 px-2 py-2.5 sm:px-3">
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                Subtotal
              </p>
              <p
                className={`text-base font-black transition-all duration-300 ${
                  qtyFlash === 'up'
                    ? 'scale-110 text-emerald-600'
                    : qtyFlash === 'down'
                      ? 'scale-110 text-red-600'
                      : 'scale-100 text-[#0b2d60]'
                }`}
              >
                S/ {lineTotal.toFixed(2)}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onRemove}
            className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-400 transition-colors hover:border-red-300 hover:bg-red-50 hover:text-red-600 sm:flex"
            aria-label={`Eliminar ${item.name}`}
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
