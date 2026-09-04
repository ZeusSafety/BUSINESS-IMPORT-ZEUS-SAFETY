'use client';

import { CheckCircle2, Package, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

type ToastProps = {
  message: string;
  title?: string;
  imageSrc?: string | null;
  imageAlt?: string;
  isVisible: boolean;
  onClose: () => void;
};

export function Toast({
  message,
  title = '¡Bien hecho!',
  imageSrc,
  imageAlt = 'Producto',
  isVisible,
  onClose,
}: ToastProps) {
  const [mounted, setMounted] = useState(false);
  const resolvedImage = imageSrc?.trim() || null;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    const timer = window.setTimeout(() => onClose(), 3500);
    return () => window.clearTimeout(timer);
  }, [isVisible, onClose]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          key="quote-toast"
          initial={{ opacity: 0, y: -40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.96 }}
          transition={{ duration: 0.28 }}
          className="fixed top-28 right-4 z-[10000] flex max-w-sm items-start gap-3 rounded-2xl border border-emerald-200 bg-white px-4 py-3.5 shadow-xl shadow-black/20 sm:top-32"
          role="status"
          aria-live="polite"
        >
          <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl border border-slate-100 bg-slate-50">
            {resolvedImage ? (
              <Image
                src={resolvedImage}
                alt={imageAlt}
                fill
                className="object-contain p-1"
                sizes="56px"
                unoptimized
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center">
                <Package className="h-6 w-6 text-slate-300" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 pt-0.5">
            <div className="flex items-center gap-1.5">
              <motion.span
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 420, damping: 18 }}
                className="flex h-5 w-5 shrink-0 items-center justify-center"
              >
                <CheckCircle2 className="h-4 w-4 text-emerald-600" strokeWidth={2.4} />
              </motion.span>
              <p className="text-sm font-bold text-[#0b2d60]">{title}</p>
            </div>
            <p className="mt-0.5 text-sm leading-snug text-slate-600">{message}</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            aria-label="Cerrar"
          >
            <X className="h-4 w-4" />
          </button>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
