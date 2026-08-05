'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const brands = [
  { name: 'Zeus Safety', src: '/Logo de Zeus.png', invert: false },
  { name: 'uvex', src: '/marca-uvex-removebg-preview.png', invert: false },
  { name: 'MSA', src: '/marca-MSA-removebg-preview.png', invert: false },
  { name: 'Caterpillar', src: '/marca-caterpillar-removebg-preview.png', invert: false },
  { name: '3M', src: '/marca-3M.png', invert: true },
] as const;

const certifications = [
  { name: 'ANSI', src: '/Certificacion_ANSI-removebg-preview.png', invert: false },
  { name: 'ISO 9001', src: '/norma-9001-1-removebg-preview.png', invert: false },
  { name: 'OSHA', src: '/certificaicon-osha-removebg-preview.png', invert: false },
  { name: 'BASC', src: '/BASC-certificado-removebg-preview.png', invert: false },
  { name: 'ASTM', src: '/certificado-ASTM-removebg-preview.png', invert: false },
  { name: 'NIOSH', src: '/Niosh-Cetificado-removebg-preview.png', invert: false },
] as const;

function LogoTile({
  name,
  src,
  invert = false,
  index = 0,
}: {
  name: string;
  src: string;
  invert?: boolean;
  index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.35, delay: index * 0.04 }}
      className="group flex flex-col items-center"
    >
      <div className="flex aspect-[5/4] w-full items-center justify-center rounded-2xl bg-[#eef1f6] px-5 py-6 transition duration-300 group-hover:-translate-y-1 group-hover:bg-[#e8ecf3] group-hover:shadow-[0_14px_32px_rgba(11,45,96,0.1)] sm:px-6 sm:py-7">
        <div className="relative h-12 w-full sm:h-14 lg:h-16">
          <Image
            src={src}
            alt={name}
            fill
            className={`object-contain transition duration-300 group-hover:scale-[1.04] ${
              invert
                ? 'brightness-0 opacity-75 group-hover:opacity-90'
                : 'opacity-90 group-hover:opacity-100'
            }`}
            sizes="(max-width: 640px) 40vw, (max-width: 1024px) 20vw, 180px"
          />
        </div>
      </div>
      <p className="mt-3 text-center text-sm font-semibold text-[#0b2d60]/80 sm:mt-3.5">
        {name}
      </p>
    </motion.div>
  );
}

export function TrustSection() {
  return (
    <section className="relative mb-10 overflow-hidden bg-white py-16 sm:mb-14 sm:py-20 lg:mb-16 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#0b2d60]/15 to-transparent"
      />

      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        {/* Header centrado — estilo referencia */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
            Zeus Safety
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight text-[#0c1427] sm:text-4xl lg:text-[2.6rem] lg:leading-[1.15]">
            Certificaciones y{' '}
            <span className="text-[#0b2d60]">marcas</span> que nos respaldan
          </h2>
          <div className="mx-auto mt-4 h-1 w-14 bg-[#F5C400]" />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
            Ofrecemos lo mejor en calidad y cumplimiento, gracias a fabricantes
            y estándares internacionales de EPP.
          </p>
        </div>

        {/* Marcas */}
        <div className="mt-12 sm:mt-14">
          <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#0b2d60]/55">
            Marcas
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-10 md:grid-cols-5">
            {brands.map((brand, i) => (
              <LogoTile
                key={brand.name}
                name={brand.name}
                src={brand.src}
                invert={brand.invert}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* Certificaciones */}
        <div className="mt-14 border-t border-[#0b2d60]/8 pt-12 sm:mt-16 sm:pt-14">
          <p className="mb-6 text-center text-[11px] font-bold uppercase tracking-[0.2em] text-[#0b2d60]/55">
            Certificaciones
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-5 sm:gap-y-10 lg:grid-cols-6">
            {certifications.map((cert, i) => (
              <LogoTile
                key={cert.name}
                name={cert.name}
                src={cert.src}
                invert={cert.invert}
                index={i}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
