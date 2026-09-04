'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type CategoryDef = {
  label: string;
  hrefCategory: string;
  image: string;
};

/** Categorías reales del catálogo Zeus + imágenes HD */
const CATEGORIES: CategoryDef[] = [
  {
    label: 'Guantes de Seguridad',
    hrefCategory: 'Protección Manual',
    image: '/producto-imagen-home/Guante-zeus.png',
  },
  {
    label: 'Calzado de Seguridad',
    hrefCategory: 'Calzado de Seguridad',
    image: '/producto-imagen-home/calzado-seguridad-zeus.png',
  },
  {
    label: 'Protección Corporal',
    hrefCategory: 'Protección Corporal',
    image: '/producto-imagen-home/proteccion-corporal-zeus.png',
  },
  {
    label: 'Protección Respiratoria',
    hrefCategory: 'Protección Respiratoria',
    image: '/producto-imagen-home/proteccion-respiratoria-zeus.png',
  },
  {
    label: 'Protección Visual',
    hrefCategory: 'Protección Visual',
    image: '/producto-imagen-home/proteccion-visual-zeus.png',
  },
  {
    label: 'Seguridad Vial',
    hrefCategory: 'Seguridad Vial',
    image: '/producto-imagen-home/seguridad-vial-zeus.png',
  },
  {
    label: 'Equipo Laboral',
    hrefCategory: 'Equipo Laboral',
    image: '/producto-imagen-home/equipo-laboral-zeus.png',
  },
  {
    label: 'Material Eléctrico',
    hrefCategory: 'Electric',
    image: '/producto-imagen-home/material-electrico-zeus.png',
  },
  {
    label: 'Protección Auditiva',
    hrefCategory: 'Protección Auditiva',
    image: '/producto-imagen-home/proteccion-auditica-zeus.png',
  },
];

export function HomeCategoryStrip() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth + 2;
    setCanPrev(hasOverflow && el.scrollLeft > 4);
    setCanNext(hasOverflow && el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateArrows();
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);

    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);

    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
      ro.disconnect();
    };
  }, []);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const firstItem = el.querySelector<HTMLElement>('[data-category-item]');
    const step = firstItem?.offsetWidth ?? 148;
    el.scrollBy({
      left: dir * step,
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="categorias-inicio"
      className="relative z-30 scroll-mt-20 border-t-4 border-[#F5C400] bg-[#0b2d60]"
    >
      <div className="flex items-stretch">
        <div className="flex w-11 shrink-0 items-center justify-center border-r border-white/10 sm:w-14">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={!canPrev}
            aria-label="Categorías anteriores"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 disabled:cursor-default disabled:opacity-35 sm:h-10 sm:w-10"
          >
            <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2} />
          </button>
        </div>

        <div
          ref={scrollerRef}
          className="flex min-w-0 flex-1 overflow-x-auto scroll-smooth lg:overflow-x-hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.hrefCategory}
              data-category-item
              href={`/productos?categoria=${encodeURIComponent(cat.hrefCategory)}`}
              className="group relative flex w-[128px] shrink-0 flex-col items-center justify-center gap-2.5 border-r border-white/10 px-2 py-6 transition-all duration-200 hover:z-10 hover:bg-[#F5C400] hover:shadow-[0_6px_20px_rgba(0,0,0,0.18)] sm:w-[142px] sm:gap-3 sm:py-7 md:w-[150px] lg:min-w-0 lg:w-auto lg:flex-1 lg:px-3 lg:py-8"
            >
              <span className="relative flex h-16 w-16 items-center justify-center sm:h-[4.5rem] sm:w-[4.5rem] lg:h-20 lg:w-20">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(max-width: 1280px) 150px, 11vw"
                  className="object-contain transition-all duration-200 group-hover:scale-105 group-hover:[filter:brightness(0)_saturate(100%)_invert(11%)_sepia(99%)_saturate(1269%)_hue-rotate(194deg)_brightness(96%)_contrast(101%)]"
                  quality={95}
                />
              </span>
              <span className="w-full px-1 text-center text-[10px] font-bold uppercase leading-snug tracking-[0.04em] text-white transition-colors duration-200 group-hover:text-[#0b2d60] sm:text-[11px] lg:text-xs">
                {cat.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="flex w-11 shrink-0 items-center justify-center border-l border-white/10 sm:w-14">
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={!canNext}
            aria-label="Siguientes categorías"
            className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 disabled:cursor-default disabled:opacity-35 sm:h-10 sm:w-10"
          >
            <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  );
}
