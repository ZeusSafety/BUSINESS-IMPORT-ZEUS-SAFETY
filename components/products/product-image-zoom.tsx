'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { Package, X, ZoomIn } from 'lucide-react';

type ProductImageZoomProps = {
  src: string;
  alt: string;
};

export function ProductImageZoom({ src, alt }: ProductImageZoomProps) {
  const [zoomOpen, setZoomOpen] = useState(false);

  const closeZoom = useCallback(() => setZoomOpen(false), []);

  useEffect(() => {
    if (!zoomOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeZoom();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [zoomOpen, closeZoom]);

  if (!src) {
    return (
      <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-[#f4f5f7] sm:min-h-[480px] lg:min-h-[560px]">
        <Package className="mb-2 h-12 w-12 text-slate-300" />
        <p className="text-sm text-slate-400">Imagen no disponible</p>
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setZoomOpen(true)}
        className="group relative block min-h-[320px] w-full cursor-zoom-in overflow-hidden rounded-2xl border border-slate-200 bg-[#f4f5f7] sm:min-h-[480px] lg:min-h-[560px]"
        aria-label="Ampliar imagen del producto"
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          unoptimized
          className="object-contain p-6 transition-transform duration-300 group-hover:scale-[1.03] sm:p-10"
          sizes="(max-width: 1024px) 100vw, 55vw"
        />
        <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full bg-[#0b2d60] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-white opacity-0 transition-all duration-200 group-hover:opacity-100">
          <ZoomIn className="h-3.5 w-3.5" />
          Ampliar
        </span>
      </button>

      {zoomOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 sm:p-8"
          onClick={closeZoom}
          role="dialog"
          aria-modal="true"
          aria-label="Vista ampliada del producto"
        >
          <button
            type="button"
            onClick={closeZoom}
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center bg-white text-[#0b2d60] transition-colors hover:bg-[#F5C400]"
            aria-label="Cerrar zoom"
          >
            <X className="h-5 w-5" />
          </button>

          <div
            className="relative h-[70vh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={src}
              alt={alt}
              fill
              unoptimized
              className="object-contain"
              sizes="100vw"
            />
          </div>
        </div>
      )}
    </>
  );
}

const TRUST_BADGES = [
  {
    src: '/tarjetas/epp-removebg-preview.png',
    alt: 'EPP certificado',
    label: 'EPP certificado',
  },
  {
    src: '/tarjetas/envio_nivel_nacional-removebg-preview.png',
    alt: 'Envío nacional',
    label: 'Envío nacional',
  },
  {
    src: '/tarjetas/stock_mayorista-removebg-preview.png',
    alt: 'Stock mayorista',
    label: 'Stock mayorista',
  },
] as const;

export function ProductTrustBadges() {
  return (
    <div className="mt-6 grid grid-cols-3 gap-2 border-t border-slate-200 pt-6 sm:gap-3">
      {TRUST_BADGES.map((badge) => (
        <div
          key={badge.label}
          className="group relative flex cursor-default flex-col items-center gap-2.5 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/60 px-2 py-4 text-center transition-all duration-300 hover:border-[#0b2d60] hover:bg-white hover:shadow-[0_8px_24px_rgba(11,45,96,0.12)] sm:px-3 sm:py-5"
        >
          <span
            aria-hidden
            className="absolute left-0 top-0 h-0.5 w-0 bg-[#F5C400] transition-all duration-300 group-hover:w-full"
          />
          <div className="relative h-14 w-14 transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16">
            <Image
              src={badge.src}
              alt={badge.alt}
              fill
              className="object-contain drop-shadow-sm transition-all duration-300 group-hover:drop-shadow-md"
              sizes="64px"
            />
          </div>
          <p className="text-[9px] font-semibold uppercase leading-tight tracking-wide text-slate-500 transition-colors duration-300 group-hover:text-[#0b2d60] sm:text-[10px]">
            {badge.label}
          </p>
        </div>
      ))}
    </div>
  );
}
