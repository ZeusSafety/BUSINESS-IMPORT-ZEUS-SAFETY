'use client';

import Image from 'next/image';
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

const certifications = [
  { name: 'ANSI', src: '/Certificacion_ANSI-removebg-preview.png' },
  { name: 'ISO 9001', src: '/norma-9001-1-removebg-preview.png' },
  { name: 'OSHA', src: '/certificaicon-osha-removebg-preview.png' },
  { name: 'BASC', src: '/BASC-certificado-removebg-preview.png' },
  { name: 'ASTM International', src: '/certificado-ASTM-removebg-preview.png' },
  { name: 'NIOSH', src: '/Niosh-Cetificado-removebg-preview.png' },
] as const;

const brands = [
  { name: 'Zeus Safety', src: '/Logo de Zeus.png', invert: false },
  { name: 'uvex', src: '/marca-uvex-removebg-preview.png', invert: false },
  { name: 'MSA', src: '/marca-MSA-removebg-preview.png', invert: false },
  { name: 'Caterpillar', src: '/marca-caterpillar-removebg-preview.png', invert: false },
  // 3M viene oscuro: se aclara sobre fondo claro sin tile navy
  { name: '3M', src: '/marca-3M.png', invert: true },
] as const;

function buildSeamlessLoop<T>(items: readonly T[], minHalf = 16): T[] {
  const half: T[] = [];
  while (half.length < minHalf) {
    half.push(...items);
  }
  return [...half, ...half];
}

function LogoSlide({
  name,
  src,
  invert = false,
}: {
  name: string;
  src: string;
  invert?: boolean;
}) {
  return (
    <div className="group flex h-[96px] w-[200px] shrink-0 items-center justify-center px-6 sm:h-[108px] sm:w-[220px]">
      <div className="relative h-14 w-full transition duration-300 group-hover:scale-[1.04] sm:h-16">
        <Image
          src={src}
          alt={name}
          fill
          className={`object-contain ${
            invert
              ? 'brightness-0 opacity-80'
              : 'opacity-80 group-hover:opacity-100'
          }`}
          sizes="220px"
          draggable={false}
        />
      </div>
    </div>
  );
}

function InfiniteMarquee({
  children,
  reverse = false,
  speed = 48,
}: {
  children: ReactNode;
  reverse?: boolean;
  speed?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const pausedRef = useRef(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let raf = 0;
    let last = performance.now();
    let half = 0;

    const measure = () => {
      half = track.scrollWidth / 2;
      if (reverse && offsetRef.current === 0 && half > 0) {
        offsetRef.current = -half;
      }
      setReady(true);
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);

    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;

      if (!pausedRef.current && half > 0) {
        offsetRef.current += speed * dt * (reverse ? 1 : -1);

        if (!reverse) {
          if (offsetRef.current <= -half) offsetRef.current += half;
        } else if (offsetRef.current >= 0) {
          offsetRef.current -= half;
        }

        track.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reverse, speed]);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f4f6f9] to-transparent sm:w-28" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#f4f6f9] to-transparent sm:w-28" />

      <div
        ref={trackRef}
        className={`flex w-max items-center will-change-transform ${
          ready ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  );
}

function MarqueeBlock({
  label,
  description,
  reverse = false,
  speed,
  children,
}: {
  label: string;
  description: string;
  reverse?: boolean;
  speed: number;
  children: ReactNode;
}) {
  return (
    <div className="space-y-7">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-1 px-6 sm:flex-row sm:items-end sm:justify-between lg:px-10 xl:px-12">
        <div>
          <div className="mb-2 flex items-center gap-3">
            <span className="h-px w-8 bg-[#F5C400]" />
            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#0b2d60]">
              {label}
            </p>
          </div>
          <p className="text-sm text-slate-500 sm:text-[15px]">{description}</p>
        </div>
      </div>

      <div className="rounded-none border-y border-[#0b2d60]/[0.07] bg-white/70 py-5 backdrop-blur-[1px] sm:py-6">
        <InfiniteMarquee reverse={reverse} speed={speed}>
          {children}
        </InfiniteMarquee>
      </div>
    </div>
  );
}

export function TrustSection() {
  const brandLoop = buildSeamlessLoop(brands, 16);
  const certLoop = buildSeamlessLoop(certifications, 16);

  return (
    <section className="relative mb-10 overflow-hidden bg-[#f4f6f9] pb-20 pt-16 sm:mb-14 sm:pb-24 sm:pt-20 lg:mb-16 lg:pb-28 lg:pt-24">
      {/* Atmosphere */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(245,196,0,0.08),_transparent_45%),radial-gradient(ellipse_at_bottom_right,_rgba(11,45,96,0.06),_transparent_50%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0b2d60]/20 to-transparent"
      />

      <div className="relative mx-auto max-w-[1600px] px-6 lg:px-10 xl:px-12">
        <div className="max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#F5C400]">
            Zeus Safety
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0b2d60] sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
            Certificaciones y marcas que nos respaldan
          </h2>
          <div className="mt-4 h-1 w-16 bg-[#F5C400]" />
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
            Trabajamos solo con fabricantes y estándares internacionales.
          </p>
        </div>
      </div>

      <div className="relative mt-14 space-y-14 sm:mt-16 sm:space-y-16 lg:mt-20 lg:space-y-20">
        <MarqueeBlock
          label="Certificaciones"
          description="Normas y sellos que respaldan cada entrega."
          reverse
          speed={46}
        >
          {certLoop.map((cert, i) => (
            <LogoSlide
              key={`cert-${cert.name}-${i}`}
              name={cert.name}
              src={cert.src}
            />
          ))}
        </MarqueeBlock>

        <MarqueeBlock
          label="Marcas"
          description="Aliados internacionales en protección industrial."
          speed={52}
        >
          {brandLoop.map((brand, i) => (
            <LogoSlide
              key={`brand-${brand.name}-${i}`}
              name={brand.name}
              src={brand.src}
              invert={brand.invert}
            />
          ))}
        </MarqueeBlock>
      </div>
    </section>
  );
}
