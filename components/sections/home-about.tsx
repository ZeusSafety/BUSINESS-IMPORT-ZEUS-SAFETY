'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Check, Headphones, MapPin } from 'lucide-react';

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
      className="relative z-10 scroll-mt-24 bg-[#f3f5f8] py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <div className="grid items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-12 xl:gap-14">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none"
          >
            <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 shadow-[0_16px_40px_rgba(11,45,96,0.1)]">
              <span
                aria-hidden
                className="absolute left-0 top-0 z-10 h-1 w-full bg-[#F5C400]"
              />
              <div className="relative aspect-[4/5] w-full min-h-[380px] sm:min-h-[460px] lg:min-h-[520px]">
                <video
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
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
            transition={{ duration: 0.55, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-w-xl flex-col justify-center lg:max-w-none"
          >
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
              Sobre la empresa
            </p>
            <h1 className="mt-2 text-2xl font-black leading-[1.15] tracking-tight text-[#0b2d60] sm:text-3xl lg:text-[2rem]">
              Protección industrial confiable para tu operación
            </h1>
            <div className="mt-3 h-1.5 w-14 rounded-full bg-[#F5C400]" />

            <p className="mt-5 text-sm leading-relaxed text-slate-500 sm:text-[15px]">
              En Zeus Safety importamos y distribuimos EPP certificado para
              minería, energía, construcción y oil & gas. Acompañamos a tu
              equipo con stock, asesoría técnica y cotizaciones ágiles.
            </p>

            <ul className="mt-6 space-y-2.5">
              {highlights.map((item, i) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.12 + i * 0.06 }}
                  className="group/item relative flex items-center gap-3 overflow-hidden rounded-full border border-slate-200 bg-white px-3.5 py-2.5 shadow-sm transition-all hover:border-[#F5C400]/50 hover:shadow-[0_8px_22px_rgba(11,45,96,0.08)]"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 origin-left scale-x-0 bg-[#F5C400]/12 transition-transform duration-300 ease-out group-hover/item:scale-x-100"
                  />
                  <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0b2d60] text-[#F5C400]">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="relative z-10 text-sm font-semibold text-[#0b2d60]">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-7 grid gap-3 sm:grid-cols-3">
              {featureCards.map((card, i) => {
                if (card.type === 'stat') {
                  return (
                    <motion.div
                      key={card.title}
                      initial={{ opacity: 0, y: 12 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                      className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#F5C400]/50 hover:shadow-[0_12px_28px_rgba(11,45,96,0.1)]"
                    >
                      <span
                        aria-hidden
                        className="absolute inset-0 origin-left scale-x-0 bg-[#F5C400]/10 transition-transform duration-300 ease-out group-hover:scale-x-100"
                      />
                      <p className="relative z-10 text-2xl font-black leading-none text-[#F5C400]">
                        {card.value}
                      </p>
                      <p className="relative z-10 mt-2 text-[11px] font-bold uppercase tracking-wide text-[#0b2d60]">
                        {card.title}
                      </p>
                      <div className="relative z-10 mt-3 h-1 w-10 rounded-full bg-[#F5C400] transition-all group-hover:w-full" />
                    </motion.div>
                  );
                }

                const Icon = card.icon;
                return (
                  <motion.div
                    key={card.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-[#F5C400]/50 hover:shadow-[0_12px_28px_rgba(11,45,96,0.1)]"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-left scale-x-0 bg-[#F5C400]/10 transition-transform duration-300 ease-out group-hover:scale-x-100"
                    />
                    <span className="relative z-10 mb-2.5 flex h-9 w-9 items-center justify-center rounded-full bg-[#F5C400] text-[#0b2d60] transition-colors group-hover:bg-[#0b2d60] group-hover:text-[#F5C400]">
                      <Icon className="h-4 w-4" strokeWidth={2.25} />
                    </span>
                    <p className="relative z-10 text-[11px] font-bold uppercase tracking-wide text-[#0b2d60]">
                      {card.title}
                    </p>
                    <p className="relative z-10 mt-1 flex-1 text-xs leading-snug text-slate-500">
                      {card.description}
                    </p>
                    <div className="relative z-10 mt-3 h-1 w-10 rounded-full bg-[#F5C400] transition-all group-hover:w-full" />
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-8">
              <Link
                href="/productos"
                className="group/btn relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-[#0b2d60] px-7 text-sm font-bold uppercase tracking-wide text-white transition-all hover:shadow-[0_8px_24px_rgba(11,45,96,0.3)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 bg-[#F5C400] transition-transform duration-300 ease-out group-hover/btn:scale-x-100"
                />
                <span className="relative z-10 transition-colors group-hover/btn:text-[#0b2d60]">
                  Ver catálogo
                </span>
                <ArrowRight className="relative z-10 h-4 w-4 transition-all group-hover/btn:translate-x-1 group-hover/btn:text-[#0b2d60]" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
