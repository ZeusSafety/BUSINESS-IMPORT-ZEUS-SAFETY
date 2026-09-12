'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, ChevronRight } from 'lucide-react';
import {
  ClipboardText,
  Package,
  ShieldCheck,
} from '@phosphor-icons/react';

const features = [
  {
    icon: ShieldCheck,
    title: 'EPP certificado y trazable',
    description:
      'Normas internacionales y lotes auditables para minería, energía, construcción y oil & gas.',
  },
  {
    icon: ClipboardText,
    title: 'Selección por matriz de riesgo',
    description:
      'Te ayudamos a elegir el equipo correcto según exposición, norma y uso real en campo.',
  },
  {
    icon: Package,
    title: 'Cotización y despacho ágil',
    description:
      'Respuesta rápida, stock disponible y entrega coordinada para no frenar tu operación.',
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
            <div className="group relative overflow-hidden rounded-[1.35rem] border border-slate-200 bg-slate-100 shadow-[0_16px_40px_rgba(11,45,96,0.1)]">
              <span
                aria-hidden
                className="absolute left-0 top-0 z-10 h-1.5 w-full bg-gradient-to-r from-[#0b2d60] via-[#F5C400] to-[#0b2d60]"
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
            transition={{
              duration: 0.55,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex max-w-xl flex-col justify-center lg:max-w-none"
          >
            <p className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={3} />
              Nuestra empresa
            </p>

            <h1 className="mt-3 text-3xl font-black leading-[1.12] tracking-tight text-[#0b2d60] sm:text-4xl lg:text-[2.35rem]">
              Protección industrial{' '}
              <span className="text-[#F5C400]">confiable para tu operación</span>
            </h1>

            <p className="mt-5 max-w-lg text-sm leading-relaxed text-slate-500 sm:text-[15px]">
              En Zeus Safety importamos y distribuimos EPP certificado. No solo
              vendemos productos: acompañamos tu compra con criterio técnico,
              stock real y logística pensada para proyectos exigentes.
            </p>
            <div className="mt-4 h-1.5 w-14 rounded-full bg-[#F5C400]" />

            <ul className="mt-8 space-y-3">
              {features.map((item, i) => {
                const Icon = item.icon;
                return (
                  <motion.li
                    key={item.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.12 + i * 0.07 }}
                    className="group/feat flex items-start gap-4 rounded-2xl border border-transparent bg-white/70 px-4 py-3.5 shadow-[0_6px_18px_rgba(11,45,96,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F5C400]/45 hover:bg-white hover:shadow-[0_12px_28px_rgba(11,45,96,0.1)]"
                  >
                    <span className="zeus-stat-ring relative mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center transition-transform duration-300 group-hover/feat:scale-105">
                      <span aria-hidden className="zeus-stat-ring__border" />
                      <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#0b2d60] text-[#F5C400] transition-colors duration-300 group-hover/feat:bg-[#F5C400] group-hover/feat:text-[#0b2d60]">
                        <Icon size={18} weight="duotone" />
                      </span>
                    </span>
                    <span className="min-w-0 pt-0.5">
                      <span className="block text-[15px] font-bold text-[#0b2d60] sm:text-base">
                        {item.title}
                      </span>
                      <span className="mt-1 block text-sm leading-relaxed text-slate-500">
                        {item.description}
                      </span>
                    </span>
                  </motion.li>
                );
              })}
            </ul>

            <div className="mt-9">
              <Link
                href="/productos"
                className="group/btn relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full bg-[#0b2d60] py-1 pl-6 pr-1.5 text-sm font-bold uppercase tracking-wide text-white transition-all hover:shadow-[0_8px_24px_rgba(11,45,96,0.3)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 bg-[#F5C400] transition-transform duration-300 ease-out group-hover/btn:scale-x-100"
                />
                <span className="relative z-10 transition-colors group-hover/btn:text-[#0b2d60]">
                  Ver catálogo
                </span>
                <span className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white text-[#0b2d60] transition-colors group-hover/btn:bg-[#0b2d60] group-hover/btn:text-[#F5C400]">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-0.5" />
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
