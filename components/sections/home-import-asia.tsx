'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import type { Icon } from '@phosphor-icons/react';
import {
  Boat,
  Certificate,
  Clock,
  Cube,
  CurrencyDollar,
  GearSix,
  GlobeHemisphereWest,
  Handshake,
  Lightbulb,
  Package,
  SealCheck,
  ShieldCheck,
} from '@phosphor-icons/react';

type Feature = {
  icon: Icon;
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
      { icon: Boat, label: 'Importación directa' },
      { icon: Package, label: 'Gran disponibilidad' },
      { icon: Certificate, label: 'Certificaciones' },
    ],
  },
  {
    title: 'Japón',
    flag: '/japon-removebg-preview.png',
    description:
      'Tecnología de alta precisión y equipos de seguridad diseñados para los entornos industriales más exigentes.',
    features: [
      { icon: Boat, label: 'Importación directa' },
      { icon: GearSix, label: 'Tecnología avanzada' },
      { icon: ShieldCheck, label: 'Calidad certificada' },
    ],
  },
  {
    title: 'Corea del Sur',
    flag: '/corea-removebg-preview.png',
    description:
      'Innovación, calidad y soluciones certificadas para minería, construcción e industria de alto rendimiento.',
    features: [
      { icon: Boat, label: 'Importación directa' },
      { icon: Lightbulb, label: 'Innovación continua' },
      { icon: SealCheck, label: 'Equipos certificados' },
    ],
  },
  {
    title: 'India',
    flag: '/india-removebg-preview.png',
    description:
      'Fabricación especializada en protección personal, guantes, calzado y equipos industriales con excelente costo-beneficio.',
    features: [
      { icon: Boat, label: 'Importación directa' },
      { icon: Cube, label: 'Variedad de productos' },
      { icon: CurrencyDollar, label: 'Costo-beneficio' },
    ],
  },
];

const headerItems = [
  { icon: GlobeHemisphereWest, label: 'Alcance internacional' },
  { icon: ShieldCheck, label: 'Productos certificados' },
  { icon: Handshake, label: 'Relaciones sólidas' },
  { icon: Clock, label: 'Entregas confiables' },
  { icon: Package, label: 'Soluciones por industria' },
];

const FEATURE_MS = 1100;

function CountryCard({
  country,
  index,
}: {
  country: Country;
  index: number;
}) {
  const [hovering, setHovering] = useState(false);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (!hovering) {
      setActive(null);
      return;
    }

    let step = 0;
    setActive(0);

    const id = window.setInterval(() => {
      step += 1;
      if (step >= country.features.length) {
        setActive(null);
        window.clearInterval(id);
        return;
      }
      setActive(step);
    }, FEATURE_MS);

    return () => window.clearInterval(id);
  }, [hovering, country.features.length]);

  const spotlight =
    active !== null ? country.features[active] : null;
  const SpotlightIcon = spotlight?.icon;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="group relative flex flex-col overflow-hidden rounded-[1.35rem] border border-slate-200/80 bg-white px-5 pb-5 pt-7 shadow-[0_8px_28px_rgba(11,45,96,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#F5C400]/55 hover:shadow-[0_18px_40px_rgba(11,45,96,0.12)] sm:px-6 sm:pb-6 sm:pt-8"
    >
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0b2d60] via-[#F5C400] to-[#0b2d60]"
      />

      <div className="mx-auto mb-5">
        <span className="zeus-stat-ring relative flex h-[88px] w-[88px] items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <span aria-hidden className="zeus-stat-ring__border" />
          <span className="relative z-10 flex h-[68px] w-[68px] items-center justify-center overflow-hidden rounded-full bg-[#0b2d60]/5">
            <Image
              src={country.flag}
              alt={`Bandera de ${country.title}`}
              width={68}
              height={68}
              className="h-full w-full object-contain p-1.5"
            />
          </span>
        </span>
      </div>

      <h3 className="text-center text-lg font-black uppercase tracking-wide text-[#0b2d60]">
        {country.title}
      </h3>
      <span className="mx-auto mt-3 h-1 w-10 rounded-full bg-[#F5C400] transition-all duration-300 group-hover:w-14" />

      <div className="relative mt-3 min-h-[5.5rem] flex-1 sm:min-h-[6rem]">
        <p
          className={`text-center text-[13px] leading-relaxed text-slate-500 transition-all duration-300 sm:text-sm ${
            spotlight
              ? 'pointer-events-none scale-[0.98] opacity-20 blur-[1px]'
              : 'opacity-100'
          }`}
        >
          {country.description}
        </p>

        <AnimatePresence mode="wait">
          {spotlight && SpotlightIcon && (
            <motion.div
              key={spotlight.label}
              initial={{ opacity: 0, scale: 0.72, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col items-center justify-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0b2d60] text-[#F5C400] shadow-[0_12px_28px_rgba(11,45,96,0.28)] ring-4 ring-[#F5C400]/35">
                <SpotlightIcon size={28} weight="duotone" />
              </span>
              <p className="mt-3 max-w-[11rem] text-center text-[11px] font-black uppercase leading-snug tracking-wide text-[#0b2d60]">
                {spotlight.label}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-[#f3f5f8] px-2 py-3.5">
        {country.features.map((f, i) => {
          const Icon = f.icon;
          const isActive = active === i;
          const dimmed = active !== null && !isActive;

          return (
            <div
              key={f.label}
              className={`flex flex-col items-center gap-1.5 text-center transition-all duration-300 ${
                dimmed ? 'opacity-35' : 'opacity-100'
              } ${isActive ? 'scale-110' : 'scale-100'}`}
            >
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-300 ${
                  isActive
                    ? 'bg-[#F5C400] text-[#0b2d60] shadow-[0_6px_16px_rgba(245,196,0,0.45)]'
                    : 'bg-[#0b2d60] text-[#F5C400]'
                }`}
              >
                <Icon size={16} weight="duotone" />
              </span>
              <span
                className={`text-[9px] font-bold uppercase leading-tight tracking-wide ${
                  isActive ? 'text-[#0b2d60]' : 'text-slate-500'
                }`}
              >
                {f.label}
              </span>
            </div>
          );
        })}
      </div>
    </motion.article>
  );
}

export function HomeImportAsia() {
  return (
    <section
      id="import-asia"
      className="scroll-mt-28 relative overflow-hidden bg-[#f3f5f8]"
    >
      <div className="relative mx-auto max-w-[1600px] px-4 py-12 sm:px-6 lg:px-8 lg:py-16 xl:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto mb-10 max-w-2xl text-center lg:mb-12"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
            Cadena de suministro
          </p>
          <h2 className="mt-2 text-xl font-black tracking-tight text-[#0b2d60] sm:text-2xl lg:text-[1.75rem]">
            Importamos directamente{' '}
            <span className="text-[#F5C400]">desde Asia</span>
          </h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-500 sm:text-[15px]">
            Trabajamos con fabricantes internacionales para ofrecer EPP y
            soluciones industriales con estándares de calidad mundial.
          </p>
          <div className="mx-auto mt-4 h-1.5 w-14 rounded-full bg-[#F5C400]" />

          <div className="mt-7 flex flex-wrap justify-center gap-2.5">
            {headerItems.map((item) => {
              const Icon = item.icon;
              return (
                <span
                  key={item.label}
                  className="group/pill inline-flex cursor-default items-center gap-2 rounded-full border border-[#0b2d60]/10 bg-white px-3.5 py-2 text-[10px] font-bold uppercase tracking-wide text-[#0b2d60] shadow-[0_4px_14px_rgba(11,45,96,0.05)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F5C400] hover:bg-[#0b2d60] hover:text-[#F5C400] hover:shadow-[0_10px_24px_rgba(11,45,96,0.18)] sm:text-[11px]"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#0b2d60]/8 text-[#F5C400] transition-colors duration-300 group-hover/pill:bg-[#F5C400] group-hover/pill:text-[#0b2d60]">
                    <Icon size={13} weight="duotone" className="shrink-0" />
                  </span>
                  {item.label}
                </span>
              );
            })}
          </div>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-4 xl:grid-cols-4 xl:gap-5">
          {countries.map((country, index) => (
            <CountryCard
              key={country.title}
              country={country}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
