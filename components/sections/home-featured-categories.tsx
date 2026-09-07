'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type FeaturedItem = {
  title: string;
  href: string;
  image: string;
  bg?: string;
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
    bg: 'bg-[#0b2d60]',
  },
  {
    title: 'Protección Visual',
    href: '/productos?categoria=Protecci%C3%B3n%20Visual',
    image: '/producto-imagen-home/proteccion-visual-zeus.png',
    bg: 'bg-[#0b2d60]',
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: -48 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function HomeFeaturedCategories() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(false);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const overflow = el.scrollWidth > el.clientWidth + 2;
    setHasOverflow(overflow);
    setCanPrev(overflow && el.scrollLeft > 4);
    setCanNext(
      overflow && el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
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
    const step = (card?.offsetWidth ?? 420) + 16;
    el.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section className="bg-[#f3f5f8] py-10 sm:py-12 lg:pb-8 lg:pt-16">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-10 xl:px-14">
        <div className="mb-8 text-center sm:mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-slate-400">
            Variedad de productos
          </p>
          <h2 className="mx-auto mt-2 max-w-3xl text-xl font-black uppercase tracking-[0.03em] text-[#0b2d60] sm:text-2xl lg:text-3xl">
            Explora nuestras{' '}
            <span className="text-[#F5C400]">categorías</span> de seguridad
            industrial
          </h2>
          <div className="mx-auto mt-3 h-1 w-14 bg-[#F5C400]" />
        </div>

        <div className="relative px-6 sm:px-8">
          <motion.div
            ref={scrollerRef}
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            className="flex items-start gap-3 overflow-x-auto scroll-smooth pb-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-4 [&::-webkit-scrollbar]:hidden"
          >
            {featured.map((item) => (
              <motion.div
                key={item.href}
                variants={cardVariants}
                data-home-feat-cat
                className="w-[min(92vw,460px)] shrink-0 sm:w-[420px] lg:w-[calc((100%-1.5rem)/2)] xl:w-[calc((100%-2.5rem)/3)]"
              >
                <Link
                  href={item.href}
                  aria-label={item.title}
                  className={`group relative block w-full overflow-hidden border border-slate-300 shadow-[0_10px_28px_rgba(11,45,96,0.1)] transition-shadow duration-300 hover:border-[#F5C400] hover:shadow-[0_18px_40px_rgba(11,45,96,0.18)] ${
                    item.bg ?? 'bg-white'
                  }`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={800}
                    height={1000}
                    sizes="(max-width: 640px) 88vw, (max-width: 1280px) 360px, 25vw"
                    className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                    quality={95}
                    onLoadingComplete={updateArrows}
                  />

                  {/* Barrido L→R */}
                  <span
                    aria-hidden
                    className="absolute inset-0 z-10 origin-left scale-x-0 bg-[#F5C400]/12 transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </Link>
              </motion.div>
            ))}
          </motion.div>

          {hasOverflow && (
            <>
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                disabled={!canPrev}
                aria-label="Categorías anteriores"
                className="zeus-arrow-btn absolute left-0 top-1/2 z-30 h-11 w-11 -translate-y-1/2 rounded-full bg-[#0b2d60] text-white hover:bg-[#103a7b] disabled:pointer-events-none disabled:opacity-35 sm:h-12 sm:w-12"
                style={{ '--arrow-hover-x': '-3px' } as CSSProperties}
              >
                <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
              </button>
              <button
                type="button"
                onClick={() => scrollBy(1)}
                disabled={!canNext}
                aria-label="Siguientes categorías"
                className="zeus-arrow-btn absolute right-0 top-1/2 z-30 h-11 w-11 -translate-y-1/2 rounded-full bg-[#F5C400] text-[#0b2d60] hover:bg-[#ffd233] disabled:pointer-events-none disabled:opacity-35 sm:h-12 sm:w-12"
                style={{ '--arrow-hover-x': '3px' } as CSSProperties}
              >
                <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
