'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export function HomeDistributorBanner() {
  return (
    <section className="relative z-10 mt-6 w-full sm:mt-8 lg:mt-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative w-full overflow-hidden"
      >
        <Image
          src="/home-seccion2.png"
          alt="¿Quieres surtir tu negocio o ser nuestro distribuidor? Stock amplio, precios de mercado y atención especializada. Precios especiales por compras de volumen."
          width={1920}
          height={560}
          sizes="100vw"
          className="h-auto w-full object-cover"
          priority={false}
        />

        {/* Botón Contactar — zona inferior izquierda bajo las ventajas */}
        <div className="pointer-events-none absolute inset-0 flex items-end">
          <div className="pointer-events-auto w-full max-w-[58%] px-5 pb-5 sm:px-8 sm:pb-7 md:px-12 md:pb-9 lg:px-16 lg:pb-10 xl:pb-12">
            <Link
              href="/cotizacion"
              className="group inline-flex h-10 items-center gap-2 bg-[#F5C400] px-5 text-xs font-bold uppercase tracking-wide text-[#0b2d60] shadow-[0_8px_24px_rgba(0,0,0,0.35)] transition-colors hover:bg-[#ffd233] sm:h-11 sm:px-6 sm:text-sm md:h-12 md:px-7"
            >
              Contactar
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
