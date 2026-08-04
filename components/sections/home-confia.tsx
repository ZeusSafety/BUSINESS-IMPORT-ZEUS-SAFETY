'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const pillars = [
  {
    image: '/confia-1.png',
    title: 'Amplia variedad de productos',
    description: 'EPP certificado para cada frente de riesgo en tu operación.',
    href: '/productos',
  },
  {
    image: '/confia-2.png',
    title: 'Entrega a tiempo',
    description: 'Despachos ágiles a todo el Perú con seguimiento claro.',
    href: '/cotizacion',
  },
  {
    image: '/confia-3.png',
    title: 'Facilidades de crédito',
    description: 'Condiciones pensadas para compras corporativas y por volumen.',
    href: '/cotizacion',
  },
];

export function HomeConfia() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1600px] px-6 py-14 lg:px-10 lg:py-16 xl:px-12">
        <div className="mb-8 text-center lg:mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#F5C400]">
            Zeus Safety
          </p>
          <h2 className="text-2xl font-black tracking-tight text-[#0b2d60] sm:text-3xl">
            Confía en nosotros
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500 sm:text-base">
            Producto, logística y soporte para que tu equipo opere con seguridad.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {pillars.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="group relative block h-[340px] overflow-hidden sm:h-[400px] lg:h-[460px]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay Zeus — más suave */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2d60]/75 via-[#0b2d60]/30 to-[#0b2d60]/10 transition-opacity duration-300 group-hover:from-[#0b2d60]/85 group-hover:via-[#0b2d60]/40" />

                {/* Contenido */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-7">
                  <span className="mb-3 h-1 w-10 bg-[#F5C400] transition-all duration-300 group-hover:w-16" />
                  <h3 className="text-xl font-black leading-tight text-white sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/80 opacity-90 transition-opacity group-hover:opacity-100">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#F5C400] transition-transform duration-300 group-hover:translate-x-1">
                    Conocer más
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
