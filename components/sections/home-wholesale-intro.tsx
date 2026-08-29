'use client';

import { motion } from 'framer-motion';
import { Medal, Package, Truck } from '@phosphor-icons/react';

const highlights = [
  {
    icon: Package,
    label: 'Stock mayorista',
    text: 'Inventario listo para obra, planta y distribución.',
  },
  {
    icon: Medal,
    label: 'Marcas certificadas',
    text: 'EPP con respaldo internacional y trazabilidad.',
  },
  {
    icon: Truck,
    label: 'Cobertura nacional',
    text: 'Despachos desde Lima a todo el Perú.',
  },
] as const;

export function HomeWholesaleIntro() {
  return (
    <section className="relative border-b border-slate-200/80 bg-white">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0b2d60] via-[#F5C400] to-[#0b2d60]"
      />

      <div className="mx-auto max-w-[1600px] px-6 py-10 sm:py-12 lg:px-10 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#F5C400]">
            Distribución B2B
          </p>
          <h2 className="mt-2 text-xl font-black uppercase leading-tight tracking-tight text-[#0b2d60] sm:text-2xl lg:text-[1.75rem]">
            Mayorista de equipos de protección personal
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-[15px]">
            Trabajamos con empresas, contratistas y distribuidores que necesitan
            EPP confiable: marcas reconocidas, precios por volumen y asesoría
            para elegir el equipo correcto en cada frente de riesgo.
          </p>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3 sm:gap-5 lg:mt-10">
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="flex flex-col items-center border border-slate-100 bg-[#f8fafc] px-4 py-5 text-center sm:px-5"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#0b2d60] shadow-[0_4px_14px_rgba(11,45,96,0.22)]">
                  <Icon
                    size={26}
                    weight="duotone"
                    className="text-[#F5C400]"
                    aria-hidden
                  />
                </span>
                <p className="mt-3 text-xs font-bold uppercase tracking-wide text-[#0b2d60]">
                  {item.label}
                </p>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                  {item.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
