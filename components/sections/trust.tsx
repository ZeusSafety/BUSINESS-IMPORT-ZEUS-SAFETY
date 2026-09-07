'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

const brands = [
  { name: 'Zeus Safety', src: '/Logo de Zeus.png' },
  { name: '3M', src: '/marca-3M.png' },
  { name: 'uvex', src: '/marca-uvex-removebg-preview.png' },
  { name: 'MSA', src: '/marca-MSA-removebg-preview.png' },
  { name: 'Caterpillar', src: '/marca-caterpillar-removebg-preview.png' },
] as const;

const certifications = [
  { name: 'ANSI', src: '/Certificacion_ANSI-removebg-preview.png' },
  { name: 'ISO 9001', src: '/norma-9001-1-removebg-preview.png' },
  { name: 'OSHA', src: '/certificaicon-osha-removebg-preview.png' },
  { name: 'BASC', src: '/BASC-certificado-removebg-preview.png' },
  { name: 'ASTM', src: '/certificado-ASTM-removebg-preview.png' },
  { name: 'NIOSH', src: '/Niosh-Cetificado-removebg-preview.png' },
] as const;

const VISIBLE = 4;
const INTERVAL_MS = 2800;

function useStepCarousel(length: number, paused: boolean) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (length <= VISIBLE || paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [length, paused]);

  return index;
}

function LogoItem({
  name,
  src,
  dimmed,
  onHoverChange,
}: {
  name: string;
  src: string;
  dimmed: boolean;
  onHoverChange: (hovering: boolean) => void;
}) {
  return (
    <div
      className={`group/logo relative flex h-14 w-[100px] cursor-pointer items-center justify-center transition-all duration-300 sm:h-16 sm:w-[110px] lg:h-[4.5rem] lg:w-[120px] ${
        dimmed ? 'scale-95 opacity-30' : 'scale-100 opacity-100'
      }`}
      title={name}
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      <Image
        src={src}
        alt={name}
        fill
        className="object-contain brightness-0 invert transition-[filter,transform] duration-300 group-hover/logo:scale-110 group-hover/logo:brightness-100 group-hover/logo:invert-0"
        sizes="120px"
      />
    </div>
  );
}

function OneByOneCarousel({
  items,
  label,
}: {
  items: readonly { name: string; src: string }[];
  label: string;
}) {
  const [hovered, setHovered] = useState<string | null>(null);
  const index = useStepCarousel(items.length, hovered !== null);
  const visible = Array.from(
    { length: Math.min(VISIBLE, items.length) },
    (_, i) => items[(index + i) % items.length],
  );

  return (
    <div className="w-full">
      <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-white/45">
        {label}
      </p>
      <div className="relative flex min-h-[80px] items-center justify-center gap-4 sm:gap-6 lg:gap-8">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item, i) => (
            <motion.div
              key={`${item.name}-${index}-${i}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <LogoItem
                name={item.name}
                src={item.src}
                dimmed={hovered !== null && hovered !== item.name}
                onHoverChange={(isHover) =>
                  setHovered(isHover ? item.name : null)
                }
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export function TrustSection() {
  return (
    <section className="relative w-full bg-[#f3f5f8]">
      <div className="grid w-full lg:grid-cols-2">
        {/* Imagen izquierda — full bleed */}
        <div className="relative min-h-[280px] w-full sm:min-h-[360px] lg:min-h-[520px]">
          <Image
            src="/import-asia-port.jpg"
            alt="Imagen de prueba — próximamente cambiar"
            fill
            className="object-cover object-center"
            sizes="(max-width: 1024px) 100vw, 50vw"
            quality={90}
            priority={false}
          />
          <span
            aria-hidden
            className="absolute inset-0 bg-[#0b2d60]/40"
          />
          <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
            <p className="rounded-lg border border-white/25 bg-[#0b2d60]/55 px-5 py-3 text-center text-xs font-bold uppercase tracking-[0.18em] text-white backdrop-blur-sm sm:text-sm">
              Próximamente cambiar imagen
            </p>
          </div>
          <span
            aria-hidden
            className="absolute inset-y-0 right-0 z-10 hidden w-1 bg-[#F5C400] lg:block"
          />
          <span
            aria-hidden
            className="absolute inset-x-0 bottom-0 z-10 h-1 bg-[#F5C400] lg:hidden"
          />
        </div>

        {/* Contenido — derecha azul */}
        <div className="relative flex w-full flex-col justify-center bg-[#0b2d60] px-6 py-12 sm:px-10 sm:py-14 lg:px-14 lg:py-16 xl:px-16">
          <div className="mx-auto w-full max-w-lg text-center">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#F5C400]">
              Respaldo Zeus
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl lg:text-[2rem] lg:leading-tight">
              Contamos con <span className="text-[#F5C400]">Marcas</span>{' '}
              Reconocidas
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-white/65 sm:text-[15px]">
              Trabajamos con marcas líderes en innovación para brindarte
              productos que cumplen con los más altos estándares de seguridad y
              rendimiento.
            </p>

            <div className="mt-8 space-y-8 border-t border-white/15 pt-8">
              <OneByOneCarousel items={brands} label="Marcas aliadas" />
              <OneByOneCarousel
                items={certifications}
                label="Certificaciones"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
