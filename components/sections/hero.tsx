'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const SLIDES = [
  {
    src: '/home-hero-guantes.png',
    alt: 'Guantes de poliuretano Pufflex — Zeus Safety. Protección de alto nivel.',
    href: '/productos?categoria=Protecci%C3%B3n%20Manual',
  },
  {
    src: '/home-hero-ponchos.png',
    alt: 'Ponchos enjebados y capotín impermeables — Zeus Safety. Seguridad corporal.',
    href: '/productos?categoria=Protecci%C3%B3n%20Corporal',
  },
  {
    src: '/home-hero-buffalo.png',
    alt: 'Botas Buffalo de cuero con puntas de acero — Zeus Safety.',
    href: '/productos?categoria=Calzado%20de%20Seguridad',
  },
] as const;

const AUTO_MS = 6000;
/** Misma proporción que el banner de guantes (1935×813) */
const HERO_ASPECT = '1935 / 813';

export function HeroSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const goTo = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % SLIDES.length);
    }, AUTO_MS);
    return () => window.clearInterval(timer);
  }, []);

  const slide = SLIDES[index];

  return (
    <section className="relative w-full overflow-hidden bg-[#ececec]">
      <div
        className="relative w-full"
        style={{ aspectRatio: HERO_ASPECT }}
      >
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.src}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 48 : -48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -48 : 48 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Link href={slide.href} className="block h-full w-full">
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                priority={index === 0}
                quality={100}
                sizes="100vw"
                className="object-cover object-center"
              />
            </Link>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={prev}
          aria-label="Banner anterior"
          className="zeus-arrow-btn absolute left-3 top-1/2 z-20 h-11 w-11 -translate-y-1/2 bg-[#0b2d60] text-white hover:bg-[#103a7b] sm:left-5 sm:h-12 sm:w-12 lg:left-8"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={2.5} />
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Siguiente banner"
          className="zeus-arrow-btn absolute right-3 top-1/2 z-20 h-11 w-11 -translate-y-1/2 bg-[#F5C400] text-[#0b2d60] hover:bg-[#ffd233] sm:right-5 sm:h-12 sm:w-12 lg:right-8"
        >
          <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
        </button>

        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2 sm:bottom-5">
          {SLIDES.map((s, i) => (
            <button
              key={s.src}
              type="button"
              onClick={() => goTo(i, i > index ? 1 : -1)}
              aria-label={`Ir al banner ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-8 bg-[#F5C400]'
                  : 'w-3 bg-[#0b2d60]/35 hover:bg-[#0b2d60]/55'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
