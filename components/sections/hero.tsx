'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ChevronDown, ChevronRight } from 'lucide-react';

export function HeroSection() {
  const scrollToAbout = () => {
    document.getElementById('nosotros')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative h-[760px] overflow-hidden bg-white sm:h-[860px] lg:h-[980px]">
      <Image
        src="/hero.png"
        alt="Zeus Safety — EPP industrial certificado"
        fill
        priority
        quality={95}
        sizes="100vw"
        className="object-cover object-[center_35%]"
      />

      <div className="absolute inset-0 z-10 flex items-start pt-16 sm:pt-20 lg:pt-24">
        <div className="mx-auto w-full max-w-[1600px] px-6 lg:px-10 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: 'easeOut' }}
            className="max-w-xl space-y-5 lg:max-w-2xl"
          >
            <p className="text-sm font-bold uppercase tracking-[0.28em] text-[#F5C400] drop-shadow-sm">
              Zeus Safety
            </p>

            <h1 className="text-3xl font-black leading-[1.05] tracking-tight text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.45)] sm:text-4xl lg:text-[2.75rem]">
              Protegemos a tu equipo
              <span className="mt-1 block text-[#F5C400]">
                en campo y en planta
              </span>
            </h1>

            <p className="max-w-md text-sm leading-relaxed text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)] sm:text-base">
              EPP certificado y asesoría especializada para minería, energía,
              construcción y oil & gas en todo el Perú.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/productos"
                className="group inline-flex h-11 items-center gap-2 bg-[#F5C400] px-6 text-sm font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233]"
              >
                Ver catálogo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/cotizacion"
                className="inline-flex h-11 items-center border-2 border-white bg-white/10 px-6 text-sm font-bold uppercase tracking-wide text-white backdrop-blur-sm transition-colors hover:border-[#F5C400] hover:bg-[#F5C400] hover:text-[#0b2d60]"
              >
                Contáctanos
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Acciones (ya no carrusel): bajar / catálogo */}
      <div className="absolute bottom-24 right-6 z-20 flex sm:bottom-32 sm:right-10 lg:bottom-40 lg:right-12">
        <button
          type="button"
          onClick={scrollToAbout}
          aria-label="Ver más sobre nosotros"
          className="flex h-12 w-12 items-center justify-center bg-[#0b2d60] text-white transition-colors hover:bg-[#103a7b] sm:h-14 sm:w-14"
        >
          <ChevronDown className="h-6 w-6" strokeWidth={2.5} />
        </button>
        <Link
          href="/productos"
          aria-label="Ir al catálogo"
          className="flex h-12 w-12 items-center justify-center bg-[#F5C400] text-[#0b2d60] transition-colors hover:bg-[#ffd233] sm:h-14 sm:w-14"
        >
          <ChevronRight className="h-6 w-6" strokeWidth={2.5} />
        </Link>
      </div>
    </section>
  );
}
