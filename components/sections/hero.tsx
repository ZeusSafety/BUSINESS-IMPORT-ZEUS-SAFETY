'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, Reorder } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ProductItem = {
  id: string;
  src: string;
  alt: string;
};

type HeroSlide = {
  id: string;
  title: ReactNode;
  accent: string;
  badge: string;
  subtitle: string;
  products: ProductItem[];
};

const SLIDES: HeroSlide[] = [
  {
    id: 'guantes',
    title: (
      <>
        Guantes de
        <br />
        poliuretano
      </>
    ),
    accent: 'Pufflex',
    badge: 'Protección de alto nivel',
    subtitle: 'Ideales para construcción, automotriz y logística',
    products: [
      {
        id: 'gris',
        src: '/guante-home-hero-principal-2-removebg-preview.png',
        alt: 'Guante Zeus gris',
      },
      {
        id: 'azul',
        src: '/guante-home-hero-principal-3-removebg-preview.png',
        alt: 'Guante Zeus azul',
      },
      {
        id: 'negro',
        src: '/guante-home-hero-principal-1-removebg-preview.png',
        alt: 'Guante Zeus negro',
      },
    ],
  },
  {
    id: 'respiradores',
    title: (
      <>
        Seguridad
        <br />
        respiratoria
      </>
    ),
    accent: 'Respiradores',
    badge: 'Protección confiable, rendimiento superior',
    subtitle: 'Conoce nuestra línea de Respiradores',
    products: [
      {
        id: 'resp-3',
        src: '/respirador-3-removebg-preview.png',
        alt: 'Respirador Zeus con filtros',
      },
      {
        id: 'resp-1',
        src: '/respirador-1-removebg-preview.png',
        alt: 'Respirador Zeus frontal',
      },
      {
        id: 'resp-2',
        src: '/respirador-2-removebg-preview.png',
        alt: 'Respirador Zeus filtros rosa',
      },
    ],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
};

function InteractiveProducts({
  items,
  slideKey,
}: {
  items: ProductItem[];
  slideKey: string;
}) {
  const [products, setProducts] = useState(items);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    setProducts(items);
    setSelectedId(null);
  }, [items, slideKey]);

  const handleClick = (id: string) => {
    if (!selectedId) {
      setSelectedId(id);
      return;
    }
    if (selectedId === id) {
      setSelectedId(null);
      return;
    }
    setProducts((prev) => {
      const next = [...prev];
      const a = next.findIndex((g) => g.id === selectedId);
      const b = next.findIndex((g) => g.id === id);
      if (a === -1 || b === -1) return prev;
      [next[a], next[b]] = [next[b], next[a]];
      return next;
    });
    setSelectedId(null);
  };

  return (
    <Reorder.Group
      axis="x"
      values={products}
      onReorder={setProducts}
      className="relative flex h-[300px] shrink-0 list-none items-center gap-0 sm:h-[360px] md:h-[420px] lg:h-[480px] xl:h-[540px]"
    >
      {products.map((item, i) => {
        const selected = selectedId === item.id;
        return (
          <Reorder.Item
            key={item.id}
            value={item}
            initial={{ opacity: 0, y: 36, scale: 0.92 }}
            animate={{
              opacity: 1,
              y: selected ? -8 : 0,
              scale: selected ? 1.05 : 1,
            }}
            whileHover={{
              scale: 1.1,
              y: -10,
              transition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
            }}
            whileDrag={{
              scale: 1.12,
              zIndex: 30,
              cursor: 'grabbing',
            }}
            transition={{
              duration: 0.45,
              delay: 0.15 + i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            onClick={() => handleClick(item.id)}
            className="relative z-10 h-full w-[155px] shrink-0 cursor-grab touch-none border-0 outline-none ring-0 sm:w-[190px] md:w-[235px] lg:w-[275px] xl:w-[310px] hover:z-20 active:cursor-grabbing focus:outline-none focus:ring-0"
            style={{ marginLeft: i === 0 ? 0 : '-6%' }}
            aria-label={`${item.alt}. Arrastra o haz clic para intercambiar.`}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              priority
              quality={95}
              sizes="310px"
              draggable={false}
              className="pointer-events-none object-contain object-center drop-shadow-[0_14px_28px_rgba(11,45,96,0.18)]"
            />
          </Reorder.Item>
        );
      })}
    </Reorder.Group>
  );
}

export function HeroSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const goTo = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setIndex((next + SLIDES.length) % SLIDES.length);
  }, []);

  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);

  const slide = SLIDES[index];

  return (
    <section className="relative w-full overflow-hidden bg-white">
      <div className="relative h-[400px] w-full sm:h-[460px] md:h-[520px] lg:h-[580px] xl:h-[640px]">
        {/* Animación ambiente detrás del fondo */}
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden>
          <motion.div
            className="absolute -left-[10%] top-[10%] h-[55%] w-[45%] rounded-full bg-[#0b2d60]/10 blur-3xl"
            animate={{ x: [0, 40, 0], y: [0, 24, 0], scale: [1, 1.12, 1] }}
            transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -right-[8%] bottom-[5%] h-[50%] w-[40%] rounded-full bg-[#F5C400]/20 blur-3xl"
            animate={{ x: [0, -36, 0], y: [0, -20, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute left-1/2 top-1/2 h-[30%] w-[30%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0b2d60]/[0.06] blur-2xl"
            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.span
              key={i}
              className="absolute h-1.5 w-1.5 rounded-full bg-[#F5C400]/50"
              style={{
                left: `${12 + i * 14}%`,
                top: `${20 + (i % 3) * 22}%`,
              }}
              animate={{ y: [0, -18, 0], opacity: [0.25, 0.8, 0.25] }}
              transition={{
                duration: 4 + i * 0.6,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.4,
              }}
            />
          ))}
        </div>

        <Image
          src="/fondo-home-hero-principal.png"
          alt=""
          fill
          priority
          quality={100}
          sizes="100vw"
          className="relative z-[1] object-cover object-center"
        />

        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={slide.id}
            custom={direction}
            initial={{ opacity: 0, x: direction >= 0 ? 48 : -48 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction >= 0 ? -48 : 48 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-10 flex items-center justify-center px-4 sm:px-8 md:px-12"
          >
            <div className="flex items-center justify-center gap-5 sm:gap-7 md:gap-9 lg:gap-10">
              <div className="flex max-w-[460px] shrink-0 flex-col items-center justify-center text-center">
                <motion.div
                  {...fadeUp}
                  transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                  className="flex justify-center"
                >
                  <Image
                    src="/Logo de Zeus.png"
                    alt="Zeus Safety"
                    width={200}
                    height={62}
                    priority
                    className="h-9 w-auto object-contain sm:h-11 md:h-12 lg:h-14"
                  />
                </motion.div>

                <motion.h1
                  {...fadeUp}
                  transition={{ duration: 0.75, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-3 text-center text-[clamp(1.4rem,3.4vw,2.65rem)] font-black uppercase leading-[0.95] tracking-tight text-[#0b2d60] sm:mt-3.5"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  {...fadeUp}
                  transition={{ duration: 0.75, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-1 text-center text-[clamp(1.55rem,4.2vw,3.2rem)] font-black uppercase leading-none tracking-tight text-[#F5C400]"
                >
                  {slide.accent}
                </motion.p>

                <motion.div
                  {...fadeUp}
                  transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-2.5 inline-flex max-w-full bg-[#F5C400] px-3 py-2 sm:mt-3 sm:px-5 sm:py-2.5"
                >
                  <span className="whitespace-nowrap text-center text-[10px] font-black uppercase tracking-wide text-[#0c1427] sm:text-sm md:text-base">
                    {slide.badge}
                  </span>
                </motion.div>

                <motion.p
                  {...fadeUp}
                  transition={{ duration: 0.7, delay: 0.68, ease: [0.22, 1, 0.36, 1] }}
                  className="mt-2.5 whitespace-nowrap text-center text-[11px] font-medium text-[#0c1427] sm:mt-3 sm:text-sm md:text-base"
                >
                  {slide.subtitle}
                </motion.p>
              </div>

              <InteractiveProducts items={slide.products} slideKey={slide.id} />
            </div>
          </motion.div>
        </AnimatePresence>

        <button
          type="button"
          onClick={prev}
          aria-label="Slide anterior"
          className="zeus-arrow-btn absolute left-3 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full bg-[#0b2d60] text-white hover:bg-[#103a7b] sm:left-5 sm:h-12 sm:w-12 lg:left-8"
          style={{ '--arrow-hover-x': '-3px' } as React.CSSProperties}
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
        </button>

        <button
          type="button"
          onClick={next}
          aria-label="Siguiente slide"
          className="zeus-arrow-btn absolute right-3 top-1/2 z-20 h-10 w-10 -translate-y-1/2 rounded-full bg-[#F5C400] text-[#0b2d60] hover:bg-[#ffd233] sm:right-5 sm:h-12 sm:w-12 lg:right-8"
          style={{ '--arrow-hover-x': '3px' } as React.CSSProperties}
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.5} />
        </button>

        <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
          {SLIDES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => goTo(i, i > index ? 1 : -1)}
              aria-label={`Ir al slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index
                  ? 'w-8 bg-[#F5C400]'
                  : 'w-3 bg-[#0b2d60]/30 hover:bg-[#0b2d60]/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
