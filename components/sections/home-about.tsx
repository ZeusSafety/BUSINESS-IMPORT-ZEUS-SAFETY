'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, Headphones, MapPin } from 'lucide-react';

const highlights = [
  'EPP certificado con normas internacionales',
  'Asesoría técnica por industria y matriz de riesgo',
  'Stock inmediato y despacho a todo el Perú',
];

const featureCards = [
  {
    type: 'stat' as const,
    value: '10+',
    title: 'Años de experiencia',
  },
  {
    type: 'icon' as const,
    icon: MapPin,
    title: 'Cobertura nacional',
    description: 'Servicio en todo el Perú',
  },
  {
    type: 'icon' as const,
    icon: Headphones,
    title: 'Asesoría técnica',
    description: 'Especialistas por industria',
  },
];

export function HomeAbout() {
  return (
    <section
      id="nosotros"
      className="relative z-10 scroll-mt-24 bg-white pt-10 sm:pt-12 lg:pt-14"
    >
      <div className="mx-auto max-w-[1600px] px-4 pb-16 sm:px-6 lg:px-10 lg:pb-20 xl:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none"
          >
            <div className="relative overflow-hidden border border-slate-200 bg-slate-100 shadow-[0_20px_50px_rgba(11,45,96,0.12)]">
              <div className="relative aspect-[4/5] w-full min-h-[420px] sm:min-h-[480px] lg:min-h-[560px]">
                <video
                  className="h-full w-full object-cover"
                  src="/video-zeus.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  controls
                  poster="/zeus2.jpg"
                >
                  Tu navegador no soporta video HTML5.
                </video>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex max-w-xl flex-col justify-center pt-6 lg:max-w-none lg:pt-0"
          >
            <div className="mb-3 inline-flex items-center gap-2.5">
              <span className="h-4 w-1.5 bg-[#F5C400]" />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#F5C400]">
                Nosotros
              </p>
            </div>

            <h2 className="mb-4 text-2xl font-black leading-[1.15] tracking-tight text-[#0b2d60] sm:text-3xl">
              Protección industrial confiable para tu operación
            </h2>

            <p className="mb-6 border-l-2 border-[#F5C400] pl-4 text-sm leading-relaxed text-slate-500 sm:text-base">
              En Zeus Safety importamos y distribuimos EPP certificado para
              minería, energía, construcción y oil & gas. Acompañamos a tu
              equipo con stock, asesoría técnica y cotizaciones ágiles.
            </p>

            <ul className="mb-7 space-y-2.5">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border border-slate-100 bg-white px-3 py-2.5 shadow-[0_4px_14px_rgba(11,45,96,0.05)]"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#0b2d60] text-[#F5C400]">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-semibold text-[#0c1427]">
                    {item}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mb-8 grid gap-3 sm:grid-cols-3">
              {featureCards.map((card) => {
                if (card.type === 'stat') {
                  return (
                    <div
                      key={card.title}
                      className="group flex flex-col border border-slate-200 bg-white p-3.5 transition-all hover:border-[#0b2d60] hover:shadow-[0_12px_28px_rgba(11,45,96,0.1)]"
                    >
                      <p className="text-2xl font-black leading-none text-[#F5C400]">
                        {card.value}
                      </p>
                      <p className="mt-2 text-[11px] font-bold uppercase tracking-wide text-[#0b2d60]">
                        {card.title}
                      </p>
                      <div className="mt-3 h-1 w-10 bg-[#F5C400] transition-all group-hover:w-full" />
                    </div>
                  );
                }

                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="group flex flex-col border border-slate-200 bg-white p-3.5 transition-all hover:border-[#0b2d60] hover:shadow-[0_12px_28px_rgba(11,45,96,0.1)]"
                  >
                    <span className="mb-2.5 flex h-9 w-9 items-center justify-center bg-[#F5C400] text-[#0b2d60] transition-colors group-hover:bg-[#0b2d60] group-hover:text-[#F5C400]">
                      <Icon className="h-4 w-4" strokeWidth={2.25} />
                    </span>
                    <p className="text-[11px] font-bold uppercase tracking-wide text-[#0b2d60]">
                      {card.title}
                    </p>
                    <p className="mt-1 flex-1 text-xs leading-snug text-slate-500">
                      {card.description}
                    </p>
                    <div className="mt-3 h-1 w-10 bg-[#F5C400] transition-all group-hover:w-full" />
                  </div>
                );
              })}
            </div>

            <div>
              <Link
                href="/productos"
                className="group inline-flex h-12 items-center gap-2 bg-[#0b2d60] px-7 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#F5C400] hover:text-[#0b2d60]"
              >
                Ver catálogo
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
