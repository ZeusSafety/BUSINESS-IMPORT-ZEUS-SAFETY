'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type FeaturedItem = {
  title: string;
  href: string;
  image: string;
  imageFit?: 'cover' | 'contain';
};

const featured: FeaturedItem[] = [
  {
    title: 'Protección Manual',
    href: '/productos?categoria=Protecci%C3%B3n%20Manual',
    image: '/Guantes-1.jpg',
  },
  {
    title: 'Protección Respiratoria',
    href: '/productos?categoria=Protecci%C3%B3n%20Respiratoria',
    image: '/Seguridad Respiradora-1.jpg',
  },
  {
    title: 'Calzado de Seguridad',
    href: '/productos?categoria=Calzado%20de%20Seguridad',
    image: '/zapatos-1.jpg',
  },
  {
    title: 'Seguridad Vial',
    href: '/productos?categoria=Seguridad%20Vial',
    image: '/Seguridad Vial-1.jpg',
  },
  {
    title: 'Protección Corporal',
    href: '/productos?categoria=Protecci%C3%B3n%20Corporal',
    image: '/producto-imagen-home/proteccion-corporal-zeus.png',
    imageFit: 'contain',
  },
  {
    title: 'Protección Visual',
    href: '/productos?categoria=Protecci%C3%B3n%20Visual',
    image: '/producto-imagen-home/proteccion-visual-zeus.png',
    imageFit: 'contain',
  },
];

export function HomeFeaturedCategories() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const hasOverflow = el.scrollWidth > el.clientWidth + 2;
    setCanPrev(hasOverflow && el.scrollLeft > 4);
    setCanNext(
      hasOverflow && el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    );
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
    const card = el.querySelector<HTMLElement>('[data-home-feat-cat]');
    const step = (card?.offsetWidth ?? 320) + 20;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section className="bg-[#f3f5f8] py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
            Variedad de productos
          </p>
          <h2 className="mx-auto mt-2 max-w-3xl text-xl font-black uppercase tracking-[0.03em] text-[#0b2d60] sm:text-2xl lg:text-3xl">
            Explora nuestras{' '}
            <span className="text-[#F5C400]">categorías</span> de seguridad
            industrial
          </h2>
          <div className="mx-auto mt-3 h-1 w-14 rounded-sm bg-[#F5C400]" />
        </div>

        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex gap-5 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-6 [&::-webkit-scrollbar]:hidden"
          >
            {featured.map((item) => (
              <Link
                key={item.href}
                data-home-feat-cat
                href={item.href}
                aria-label={item.title}
                className="group relative w-[min(85vw,340px)] shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-[0_8px_24px_rgba(11,45,96,0.07)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F5C400]/60 hover:shadow-[0_18px_40px_rgba(11,45,96,0.16)] sm:w-[320px] lg:w-[calc((100%-3.75rem)/3)] xl:w-[calc((100%-5rem)/4)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 z-20 origin-left scale-x-0 bg-[#F5C400]/12 transition-transform duration-300 ease-out group-hover:scale-x-100"
                />

                <div
                  className={`relative aspect-[4/5] overflow-hidden sm:aspect-[3/4] ${
                    item.imageFit === 'contain' ? 'bg-[#0b2d60]' : 'bg-slate-50'
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 85vw, (max-width: 1280px) 320px, 25vw"
                    className={`transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
                      item.imageFit === 'contain'
                        ? 'object-contain p-6 sm:p-8'
                        : 'object-contain object-center p-2 sm:p-3'
                    }`}
                    quality={95}
                  />
                </div>
              </Link>
            ))}
          </div>

          <button
            type="button"
            onClick={() => scrollBy(-1)}
            disabled={!canPrev}
            aria-label="Categorías anteriores"
            className="absolute left-0 top-1/2 z-30 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0b2d60] shadow-md transition-all hover:border-[#F5C400] hover:bg-[#F5C400] disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronLeft className="h-5 w-5" strokeWidth={2.25} />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            disabled={!canNext}
            aria-label="Siguientes categorías"
            className="absolute right-0 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-lg border border-slate-200 bg-white text-[#0b2d60] shadow-md transition-all hover:border-[#F5C400] hover:bg-[#F5C400] disabled:pointer-events-none disabled:opacity-0"
          >
            <ChevronRight className="h-5 w-5" strokeWidth={2.25} />
          </button>
        </div>
      </div>
    </section>
  );
}
