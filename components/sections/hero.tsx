'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="grid min-h-[560px] lg:min-h-[620px] lg:grid-cols-2">
        {/* Left — copy */}
        <div className="relative z-10 flex items-center bg-white px-4 py-16 sm:px-6 lg:px-10 xl:px-16 lg:py-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="mx-auto w-full max-w-xl space-y-6 lg:mx-0"
          >
            <p className="text-sm font-bold uppercase tracking-[0.22em] text-[#F5C400]">
              # Protección industrial
            </p>

            <h1 className="text-4xl font-black leading-[1.08] tracking-tight text-[#0c1427] sm:text-5xl lg:text-[3.35rem]">
              Protegemos a tu equipo
              <span className="block text-[#0b2d60]">en campo y en planta</span>
            </h1>

            <p className="max-w-md text-base leading-relaxed text-slate-500 sm:text-lg">
              EPP certificado y asesoría especializada para minería, energía,
              construcción y oil & gas en todo el Perú.
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
                className="inline-flex h-12 items-center bg-[#0b2d60] px-7 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#103a7b]"
              >
                Contáctanos
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Right — photo (sin neblina blanca) */}
        <div className="relative min-h-[320px] sm:min-h-[400px] lg:min-h-full">
          <Image
            src="/zeus2.jpg"
            alt="Operaciones industriales con EPP Zeus Safety"
            fill
            priority
            quality={92}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover object-center"
          />
        </div>
      </div>
    </section>
  );
}
