'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Minus,
  Package,
  Plus,
  ShoppingCart,
  Trash2,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { QuoteEmptyState } from '@/components/quote/quote-empty-state';
import { useQuoteStore } from '@/store/quoteStore';

const WA_NUMBER = '51999999999';

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function buildWhatsAppQuoteMessage(
  items: { name: string; quantity: number; price: number }[],
) {
  const lines = items.map(
    (item, i) =>
      `${i + 1}. ${item.name} x${item.quantity} (S/ ${item.price.toFixed(2)})`,
  );
  return [
    'Hola Zeus Safety 👋',
    'Quiero cotizar estos productos:',
    '',
    ...lines,
    '',
    '¿Me pueden ayudar con disponibilidad y entrega?',
  ].join('\n');
}

export function QuoteCartDrawer() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { items, totalItems, updateQuantity, removeItem } = useQuoteStore();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const openWhatsAppQuote = () => {
    if (items.length === 0) return;
    const text = buildWhatsAppQuoteMessage(items);
    const url = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Botón flotante encima de WhatsApp */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Abrir carrito de cotización"
        className="fixed bottom-[5.75rem] right-5 z-[86] flex h-14 w-14 items-center justify-center rounded-full bg-[#0b2d60] text-white shadow-[0_10px_28px_rgba(11,45,96,0.4)] transition-transform hover:scale-105 hover:bg-[#0a2552]"
      >
        <ShoppingCart className="h-6 w-6" strokeWidth={2.2} />
        {totalItems > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#F5C400] px-1 text-[10px] font-black text-[#0b2d60]">
            {totalItems > 99 ? '99+' : totalItems}
          </span>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Cerrar carrito"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[80] bg-[#0b2d60]/45 backdrop-blur-[2px]"
              onClick={() => setOpen(false)}
            />

            <motion.aside
              role="dialog"
              aria-modal
              aria-label="Carrito cotizador"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 320 }}
              className="fixed inset-y-0 right-0 z-[90] flex w-full max-w-md flex-col bg-white shadow-[-12px_0_40px_rgba(11,45,96,0.2)]"
            >
              <div className="relative bg-[#0b2d60] px-5 pb-4 pt-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#F5C400] text-[#0b2d60]">
                      <ShoppingCart className="h-4 w-4" strokeWidth={2.4} />
                    </span>
                    <div>
                      <h2 className="text-lg font-bold text-white">
                        Carrito cotizador
                      </h2>
                      <p className="text-xs text-white/70">
                        {totalItems}{' '}
                        {totalItems === 1 ? 'unidad' : 'unidades'}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Cerrar"
                    className="flex h-9 w-9 items-center justify-center bg-white/10 text-white transition-colors hover:bg-white/20"
                  >
                    <X className="h-4 w-4" strokeWidth={2.5} />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#F5C400]" />
              </div>

              <div className="flex-1 overflow-y-auto px-4 py-4">
                {items.length === 0 ? (
                  <QuoteEmptyState
                    variant="drawer"
                    onCatalogClick={() => setOpen(false)}
                  />
                ) : (
                  <ul className="space-y-3">
                    {items.map((item) => {
                      const imageSrc = item.image?.trim() || null;
                      return (
                        <li
                          key={item.id}
                          className="flex gap-3 border border-slate-200 bg-white p-3 shadow-sm"
                        >
                          <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-slate-100 bg-slate-50">
                            {imageSrc ? (
                              <Image
                                src={imageSrc}
                                alt={item.name}
                                fill
                                className="object-contain p-1"
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
                            <p className="line-clamp-2 text-sm font-bold leading-snug text-[#0c1427]">
                              {item.name}
                            </p>
                            <p className="mt-0.5 text-xs font-semibold text-[#0b2d60]">
                              S/ {item.price.toFixed(2)}
                            </p>

                            <div className="mt-2 flex items-center justify-between gap-2">
                              <div className="inline-flex h-8 items-center border border-slate-200">
                                <button
                                  type="button"
                                  aria-label="Menos"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="flex h-full w-8 items-center justify-center text-[#0b2d60] hover:bg-slate-50"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="min-w-7 text-center text-sm font-bold text-[#0b2d60]">
                                  {item.quantity}
                                </span>
                                <button
                                  type="button"
                                  aria-label="Más"
                                  onClick={() =>
                                    updateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="flex h-full w-8 items-center justify-center text-[#0b2d60] hover:bg-slate-50"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>

                              <button
                                type="button"
                                aria-label={`Quitar ${item.name}`}
                                onClick={() => removeItem(item.id)}
                                className="flex h-8 w-8 items-center justify-center border border-slate-200 text-slate-400 transition-colors hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>

              <div className="space-y-2 border-t border-slate-200 bg-[#f8fafc] px-4 py-4">
                <Link
                  href="/cotizacion"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-full items-center justify-center bg-[#F5C400] text-sm font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233]"
                >
                  Ver cotización
                </Link>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="flex h-11 w-full items-center justify-center border border-slate-200 bg-white text-sm font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:border-[#0b2d60]"
                >
                  Seguir cotizando
                </button>
                <button
                  type="button"
                  onClick={openWhatsAppQuote}
                  disabled={items.length === 0}
                  className="flex h-11 w-full items-center justify-center gap-2 bg-[#25D366] text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#20BA5A] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Cotizar por WhatsApp
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>,
    document.body,
  );
}
