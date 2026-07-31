'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[calc(100vh-130px)] overflow-hidden lg:min-h-[calc(100vh-122px)]">
      {/* HD background — visible, light brand filter */}
      <Image
        src="/zeus2.jpg"
        alt="Operaciones industriales con EPP Zeus Safety"
        fill
        priority
        quality={92}
        sizes="100vw"
        className="object-cover object-[72%_center]"
      />

      {/* Soft filters so the photo stays clear */}
      <div className="absolute inset-0 bg-[#0b2d60]/20" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0b2d60]/55 via-[#0b2d60]/25 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-130px)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:min-h-[calc(100vh-122px)] lg:px-8 lg:py-24">
        <div className="relative max-w-2xl">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-1 -top-10 select-none text-[4.25rem] font-black uppercase leading-none tracking-tight text-white/15 sm:-top-14 sm:text-[6.25rem] lg:text-[7.5rem]"
          >
            Seguridad
          </span>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="relative space-y-7"
          >
            <motion.div
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <span className="h-[2px] w-10 bg-[#F5C400]" />
              <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F5C400]">
                Zeus Safety
              </p>
            </motion.div>

            <h1 className="text-4xl font-black uppercase leading-[1.02] tracking-tight text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-[3.75rem]">
              Protege a tu
              <span className="mt-1 block text-[#F5C400]">equipo en campo</span>
            </h1>

            <p className="max-w-lg text-base leading-relaxed text-white drop-shadow-[0_1px_4px_rgba(0,0,0,0.4)] sm:text-lg">
              EPP certificado y asesoría especializada para minería, energía,
              construcción y operaciones industriales en todo el Perú.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/productos"
                className="group inline-flex h-12 items-center gap-2 bg-[#F5C400] px-7 text-sm font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233]"
              >
                Ver catálogo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/cotizacion"
                className="inline-flex h-12 items-center border-2 border-white bg-[#0b2d60]/85 px-7 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:border-[#F5C400] hover:text-[#F5C400]"
              >
                Hablar con un asesor
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
