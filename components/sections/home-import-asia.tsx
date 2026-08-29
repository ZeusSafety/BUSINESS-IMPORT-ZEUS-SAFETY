'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { LucideIcon } from 'lucide-react';
import {
  Award,
  Box,
  Clock,
  Cog,
  DollarSign,
  Globe2,
  Handshake,
  Lightbulb,
  Package,
  ShieldCheck,
  Ship,
} from 'lucide-react';

type Feature = {
  icon: LucideIcon;
  label: string;
};

type Country = {
  title: string;
  flag: string;
  description: string;
  features: Feature[];
};

const countries: Country[] = [
  {
    title: 'China',
    flag: '/china-removebg-preview.png',
    description:
      'Producción a gran escala y amplia variedad de EPP industrial, herramientas y suministros con certificaciones internacionales.',
    features: [
      { icon: Ship, label: 'Importación directa' },
      { icon: Package, label: 'Gran disponibilidad' },
      { icon: Award, label: 'Certificaciones' },
    ],
  },
  {
    title: 'Japón',
    flag: '/japon-removebg-preview.png',
    description:
      'Tecnología de alta precisión y equipos de seguridad diseñados para los entornos industriales más exigentes.',
    features: [
      { icon: Ship, label: 'Importación directa' },
      { icon: Cog, label: 'Tecnología avanzada' },
      { icon: ShieldCheck, label: 'Calidad certificada' },
    ],
  },
  {
    title: 'Corea del Sur',
    flag: '/corea-removebg-preview.png',
    description:
      'Innovación, calidad y soluciones certificadas para minería, construcción e industria de alto rendimiento.',
    features: [
      { icon: Ship, label: 'Importación directa' },
      { icon: Lightbulb, label: 'Innovación continua' },
      { icon: ShieldCheck, label: 'Equipos certificados' },
    ],
  },
  {
    title: 'India',
    flag: '/india-removebg-preview.png',
    description:
      'Fabricación especializada en protección personal, guantes, calzado y equipos industriales con excelente costo-beneficio.',
    features: [
      { icon: Ship, label: 'Importación directa' },
      { icon: Box, label: 'Variedad de productos' },
      { icon: DollarSign, label: 'Costo-beneficio' },
    ],
  },
];

const headerItems = [
  { icon: Globe2, label: 'Alcance internacional' },
  { icon: ShieldCheck, label: 'Productos certificados' },
  { icon: Handshake, label: 'Relaciones sólidas' },
  { icon: Clock, label: 'Entregas confiables' },
  { icon: Package, label: 'Soluciones por industria' },
];

export function HomeImportAsia() {
  return (
    <section id="import-asia" className="scroll-mt-28 relative overflow-hidden bg-[#f4f6f9]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-[#f4f7fb] to-white"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-20 h-72 w-72 rounded-full bg-[#F5C400]/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-40 h-64 w-64 rounded-full bg-[#0b2d60]/5 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-10 lg:py-12 xl:px-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mb-8 lg:mb-10"
        >
          <div className="flex max-w-2xl gap-4">
            <span className="mt-1 hidden w-[5px] shrink-0 bg-[#F5C400] sm:block sm:self-stretch" />
            <div>
              <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
                Cadena de suministro
              </p>
              <h2 className="text-lg font-black uppercase tracking-[0.04em] text-[#0b2d60] sm:text-xl">
                Importamos directamente{' '}
                <span className="text-[#F5C400]">desde Asia</span>
              </h2>
              <p className="mt-2 max-w-xl text-xs text-slate-500 sm:text-sm">
                Trabajamos con fabricantes internacionales para ofrecer EPP y
                soluciones industriales con estándares de calidad mundial.
              </p>
            </div>
          </div>

          {/* Values in header — not footer */}
          <div className="mt-6 flex flex-wrap gap-2 sm:gap-2.5">
            {headerItems.map((item) => {
              const Icon = item.icon;
              return (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-2 border border-slate-200 bg-[#f8fafc] px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-[#0b2d60] sm:text-[11px]"
                >
                  <Icon
                    className="h-3.5 w-3.5 shrink-0 text-[#F5C400]"
                    strokeWidth={2.25}
                  />
                  {item.label}
                </span>
              );
            })}
          </div>
        </motion.div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {countries.map((country, index) => (
            <motion.article
              key={country.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.07 }}
              className="group relative flex flex-col border border-slate-200 bg-white p-6 shadow-[0_10px_30px_rgba(11,45,96,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#F5C400]/60 hover:shadow-[0_18px_40px_rgba(11,45,96,0.12)]"
            >
              <span className="absolute left-0 top-0 h-1 w-0 bg-[#F5C400] transition-all duration-300 group-hover:w-full" />

              <div className="mx-auto mb-5 flex h-[76px] w-[76px] items-center justify-center overflow-hidden rounded-full bg-[#f4f7fb] ring-4 ring-[#0b2d60]/6 transition-transform duration-300 group-hover:scale-105">
                <Image
                  src={country.flag}
                  alt={`Bandera de ${country.title}`}
                  width={76}
                  height={76}
                  className="h-full w-full object-contain p-1.5"
                />
              </div>

              <h3 className="text-center text-lg font-black uppercase tracking-wide text-[#0b2d60]">
                {country.title}
              </h3>
              <p className="mt-2.5 flex-1 text-center text-[13px] leading-relaxed text-slate-500">
                {country.description}
              </p>

              <div className="mt-6 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
                {country.features.map((f) => {
                  const Icon = f.icon;
                  return (
                    <div
                      key={f.label}
                      className="flex flex-col items-center gap-1.5 text-center"
                    >
                      <span className="flex h-8 w-8 items-center justify-center bg-[#0b2d60]/5 text-[#0b2d60] transition-colors group-hover:bg-[#F5C400]/20">
                        <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
                      </span>
                      <span className="text-[9px] font-bold uppercase leading-tight tracking-wide text-slate-500">
                        {f.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
