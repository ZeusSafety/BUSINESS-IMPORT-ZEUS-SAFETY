'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ClipboardCheck, Headphones, ShieldCheck } from 'lucide-react';

const pillars = [
  {
    icon: ShieldCheck,
    title: 'Seguridad que respalda',
    text: 'EPP certificado y de alta calidad.',
  },
  {
    icon: Headphones,
    title: 'Soporte técnico',
    text: 'Asesoría cuando más lo necesitas.',
  },
  {
    icon: ClipboardCheck,
    title: 'Cumplimiento normativo',
    text: 'Alineados a las normas más exigentes.',
  },
];

const brands = [
  { src: '/marca-3M.png', alt: '3M' },
  { src: '/marca-MSA-removebg-preview.png', alt: 'MSA' },
  { src: '/marca-uvex-removebg-preview.png', alt: 'uvex' },
  { src: '/marca-caterpillar-removebg-preview.png', alt: 'Caterpillar' },
];

export function HomeDecadeOps() {
  const brandLoop = [...brands, ...brands];

  return (
    <section className="relative overflow-hidden bg-[#0b2d60]">
      <div className="absolute inset-0">
        <Image
          src="/sobre-nosotros-ops-v2.png"
          alt=""
          fill
          priority={false}
          className="object-cover object-[62%_center] sm:object-[58%_center] lg:object-center"
          sizes="100vw"
          quality={100}
        />
      </div>

      <div className="relative mx-auto flex min-h-[640px] max-w-[1600px] flex-col px-4 py-12 sm:min-h-[720px] sm:px-6 sm:py-14 lg:min-h-[780px] lg:px-10 lg:py-16 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-lg lg:max-w-xl"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.28em] text-[#F5C400]">
            Zeus Safety
          </p>
          <h2 className="text-3xl font-black leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]">
            Más de{' '}
            <span className="italic text-[#F5C400]">una década</span>
            <span className="mt-1 block">protegiendo operaciones</span>
            <span className="mt-1 block">en todo el Perú</span>
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/85 sm:text-[15px]">
            EPP certificado y soporte técnico para{' '}
            <span className="font-semibold text-[#F5C400]">
              minería, energía, construcción y oil &amp; gas
            </span>
            .
          </p>
        </motion.div>

        <div className="mt-7 max-w-[640px] space-y-5 lg:max-w-[680px]">
          {/* 3 cards — left side only, no transparent overlay */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-3">
            {pillars.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.08 * index }}
                  className="border border-white/25 bg-[#0b2d60] p-3.5 sm:p-3.5"
                >
                  <Icon
                    className="mb-2 h-5 w-5 text-[#F5C400]"
                    strokeWidth={2.25}
                  />
                  <h3 className="text-[11px] font-black uppercase leading-snug tracking-wide text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-[10px] leading-snug text-white/70 sm:text-[11px]">
                    {item.text}
                  </p>
                </motion.div>
              );
            })}
          </div>

          {/* Brands carousel — corto, un poco más ancho */}
          <div className="w-full max-w-[520px] overflow-hidden border-t border-white/15 pt-4 sm:max-w-[560px]">
            <div
              className="zeus-marquee flex w-max items-center gap-10"
              style={{ animationDuration: '22s' }}
            >
              {brandLoop.map((brand, i) => (
                <div
                  key={`${brand.alt}-${i}`}
                  className="relative h-8 w-[88px] shrink-0 sm:h-9 sm:w-[96px]"
                >
                  <Image
                    src={brand.src}
                    alt={brand.alt}
                    fill
                    className="object-contain brightness-0 invert"
                    sizes="96px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
