'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, ShieldCheck } from 'lucide-react';

const brands = [
  { name: 'Zeus Safety', src: '/Logo de Zeus.png', invert: false },
  { name: 'uvex', src: '/marca-uvex-removebg-preview.png', invert: false },
  { name: 'MSA', src: '/marca-MSA-removebg-preview.png', invert: false },
  {
    name: 'Caterpillar',
    src: '/marca-caterpillar-removebg-preview.png',
    invert: false,
  },
  { name: '3M', src: '/marca-3M.png', invert: true },
] as const;

const certifications = [
  {
    name: 'ANSI',
    src: '/Certificacion_ANSI-removebg-preview.png',
    invert: false,
  },
  {
    name: 'ISO 9001',
    src: '/norma-9001-1-removebg-preview.png',
    invert: false,
  },
  {
    name: 'OSHA',
    src: '/certificaicon-osha-removebg-preview.png',
    invert: false,
  },
  { name: 'BASC', src: '/BASC-certificado-removebg-preview.png', invert: false },
  {
    name: 'ASTM',
    src: '/certificado-ASTM-removebg-preview.png',
    invert: false,
  },
  {
    name: 'NIOSH',
    src: '/Niosh-Cetificado-removebg-preview.png',
    invert: false,
  },
] as const;

type LogoItem = {
  name: string;
  src: string;
  invert?: boolean;
};

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
    <div
      className="group/slide flex w-[140px] shrink-0 flex-col sm:w-[156px]"
      title={name}
    >
      <div className="relative flex aspect-[5/3.2] items-center justify-center overflow-hidden rounded-xl border border-[#0b2d60]/10 bg-[#f4f7fb] px-4 py-4 transition duration-300 group-hover/slide:border-[#F5C400] group-hover/slide:bg-white group-hover/slide:shadow-[0_10px_28px_rgba(11,45,96,0.1)] sm:py-5">
        <span
          aria-hidden
          className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-[#F5C400] transition-transform duration-300 group-hover/slide:scale-x-100"
        />
        <div className="relative h-10 w-full sm:h-11">
          <Image
            src={src}
            alt={name}
            fill
            className={`object-contain transition duration-300 group-hover/slide:scale-105 ${
              invert
                ? 'brightness-0 opacity-80 group-hover/slide:opacity-100'
                : 'opacity-90 group-hover/slide:opacity-100'
            }`}
            sizes="156px"
          />
        </div>
      </div>
      <p className="mt-2 truncate text-center text-[9px] font-bold uppercase tracking-[0.12em] text-[#0b2d60]/70 transition-colors group-hover/slide:text-[#0b2d60] sm:text-[10px]">
        {name}
      </p>
    </div>
  );
}

function LogoMarquee({
  items,
  reverse = false,
  duration,
}: {
  items: readonly LogoItem[];
  reverse?: boolean;
  duration: string;
}) {
  const loop = [...items, ...items];

  return (
    <div className="group/marquee relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-10 bg-gradient-to-r from-white to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-10 bg-gradient-to-l from-white to-transparent"
      />

      <div
        className={`flex w-max items-stretch gap-3 py-1 sm:gap-4 ${
          reverse ? 'zeus-marquee-reverse' : 'zeus-marquee'
        } group-hover/marquee:[animation-play-state:paused]`}
        style={{ animationDuration: duration }}
      >
        {loop.map((item, index) => (
          <LogoSlide
            key={`${item.name}-${index}`}
            name={item.name}
            src={item.src}
            invert={item.invert}
          />
        ))}
      </div>
    </div>
  );
}

export function TrustSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="relative mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-10 lg:py-16 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#F5C400]">
            Respaldo
          </p>
          <h2 className="mt-2 text-2xl font-black tracking-tight text-[#0b2d60] sm:text-3xl lg:text-4xl">
            Marcas y certificaciones
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-500">
            EPP de fabricantes líderes, respaldado por normas internacionales de
            seguridad industrial.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="mt-8 overflow-hidden rounded-xl border border-[#0b2d60]/12 bg-[#0b2d60] shadow-[0_20px_50px_rgba(11,45,96,0.12)] sm:mt-10 lg:grid lg:grid-cols-[minmax(0,280px)_minmax(0,1fr)]"
        >
          {/* Panel lateral único */}
          <div className="relative bg-[#071f45] px-6 py-8 sm:px-8 lg:flex lg:flex-col lg:justify-center lg:py-10">
            <span
              aria-hidden
              className="absolute left-0 top-0 h-full w-1 bg-[#F5C400]"
            />

            <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#F5C400]">
              Zeus Safety
            </p>
            <h3 className="mt-2 text-xl font-black leading-snug text-white sm:text-2xl">
              Calidad comprobada para tu operación
            </h3>

            <div className="mt-6 space-y-5 border-t border-white/10 pt-6">
              <div className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#F5C400]/15 text-[#F5C400]">
                  <Award className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-white">
                    Marcas
                  </p>
                  <p className="mt-0.5 text-[13px] leading-snug text-white/65">
                    Partners reconocidos en minería, construcción y energía.
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#F5C400]/15 text-[#F5C400]">
                  <ShieldCheck className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-white">
                    Certificaciones
                  </p>
                  <p className="mt-0.5 text-[13px] leading-snug text-white/65">
                    Normas ANSI, ISO, OSHA y más que avalan cada producto.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Carruseles */}
          <div className="flex flex-col divide-y divide-[#0b2d60]/10">
            <div className="bg-white px-4 py-5 sm:px-6 sm:py-6">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0b2d60]/50">
                Marcas aliadas
              </p>
              <LogoMarquee items={brands} duration="32s" />
            </div>
            <div className="bg-[#f8fafc] px-4 py-5 sm:px-6 sm:py-6">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.2em] text-[#0b2d60]/50">
                Sellos y normas
              </p>
              <LogoMarquee items={certifications} reverse duration="38s" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
