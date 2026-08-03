'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
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

const stats = [
  { value: '10+', label: 'Años de experiencia' },
  { value: '500+', label: 'Clientes atendidos' },
  { value: '1.2k+', label: 'Proyectos abastecidos' },
  { value: '24h', label: 'Respuesta comercial' },
];

export function HomeAbout() {
  return (
    <section
      id="nosotros"
      className="relative z-20 -mt-24 scroll-mt-24 bg-white pt-6 sm:-mt-32 sm:pt-8 lg:-mt-40 lg:pt-10"
    >
      <div className="mx-auto max-w-[1600px] px-6 pb-16 lg:px-10 lg:pb-20 xl:px-12">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,640px)_minmax(0,1fr)] lg:gap-10 xl:gap-12">
          {/* Media */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="relative mx-auto w-full max-w-xl overflow-visible pl-6 sm:pl-10 lg:mx-0 lg:max-w-[640px] lg:pl-12"
          >
            <div className="relative overflow-hidden border border-slate-200 bg-slate-100 shadow-[0_20px_50px_rgba(11,45,96,0.12)]">
              <div className="relative aspect-[3/4] w-full min-h-[520px] sm:min-h-[600px] lg:min-h-[720px]">
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

            <div className="absolute -bottom-8 -left-6 z-10 w-[48%] max-w-[240px] sm:-bottom-10 sm:-left-10 sm:max-w-[260px] lg:-left-12">
              <div className="overflow-hidden border-[5px] border-white bg-[#0b2d60] shadow-[0_18px_40px_rgba(11,45,96,0.28)]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/zeus2.jpg"
                    alt="Operaciones Zeus Safety"
                    fill
                    sizes="240px"
                    className="object-cover"
                  />
                </div>
                <div className="bg-[#0b2d60] px-4 py-3">
                  <p className="text-2xl font-black leading-none text-white sm:text-3xl">
                    20+
                  </p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.14em] text-white/85 sm:text-[11px]">
                    Proyectos de éxito empresarial
                  </p>
                </div>
                <div className="h-1.5 w-full bg-[#F5C400]" />
              </div>
            </div>
          </motion.div>

          {/* Contenido derecho mejorado */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="flex max-w-xl flex-col justify-center pt-12 lg:max-w-none lg:pt-0 xl:pr-4"
          >
            <div className="mb-3 inline-flex items-center gap-2.5">
              <span className="h-4 w-1.5 bg-[#F5C400]" />
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#F5C400]">
                Nosotros
              </p>
            </div>

            <h2 className="mb-5 text-3xl font-black leading-[1.12] tracking-tight text-[#0b2d60] sm:text-4xl lg:text-[2.35rem] xl:text-[2.55rem]">
              Protección industrial confiable para tu operación
            </h2>

            <p className="mb-7 border-l-2 border-[#F5C400] pl-4 text-base leading-relaxed text-slate-500 sm:text-[17px]">
              En Zeus Safety importamos y distribuimos EPP certificado para
              minería, energía, construcción y oil & gas. Acompañamos a tu
              equipo con stock, asesoría técnica y cotizaciones ágiles.
            </p>

            <ul className="mb-8 space-y-2.5">
              {highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border border-slate-100 bg-white px-3 py-2.5 shadow-[0_4px_14px_rgba(11,45,96,0.05)]"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center bg-[#0b2d60] text-[#F5C400]">
                    <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  </span>
                  <span className="text-sm font-semibold text-[#0c1427] sm:text-[15px]">
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
                      className="group flex flex-col border border-slate-200 bg-white p-4 transition-all hover:border-[#0b2d60] hover:shadow-[0_12px_28px_rgba(11,45,96,0.1)]"
                    >
                      <p className="text-3xl font-black leading-none text-[#F5C400]">
                        {card.value}
                      </p>
                      <p className="mt-2 text-xs font-bold uppercase tracking-wide text-[#0b2d60]">
                        {card.title}
                      </p>
                      <div className="mt-4 h-1 w-10 bg-[#F5C400] transition-all group-hover:w-full" />
                    </div>
                  );
                }

                const Icon = card.icon;
                return (
                  <div
                    key={card.title}
                    className="group flex flex-col border border-slate-200 bg-white p-4 transition-all hover:border-[#0b2d60] hover:shadow-[0_12px_28px_rgba(11,45,96,0.1)]"
                  >
                    <span className="mb-3 flex h-10 w-10 items-center justify-center bg-[#F5C400] text-[#0b2d60] transition-colors group-hover:bg-[#0b2d60] group-hover:text-[#F5C400]">
                      <Icon className="h-5 w-5" strokeWidth={2.25} />
                    </span>
                    <p className="text-xs font-bold uppercase tracking-wide text-[#0b2d60]">
                      {card.title}
                    </p>
                    <p className="mt-1.5 flex-1 text-xs leading-snug text-slate-500">
                      {card.description}
                    </p>
                    <div className="mt-4 h-1 w-10 bg-[#F5C400] transition-all group-hover:w-full" />
                  </div>
                );
              })}
            </div>

            <div>
              <Link
                href="/sobre-nosotros"
                className="group inline-flex h-12 items-center gap-2 bg-[#0b2d60] px-7 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#F5C400] hover:text-[#0b2d60]"
              >
                Conocer más
                <span className="transition-transform group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </div>
          </motion.div>
        </div>

        <div className="mt-20 grid grid-cols-2 gap-8 border-t border-slate-200 pt-12 sm:grid-cols-4 lg:mt-24 lg:gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              className="relative text-center"
            >
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F5C400]/10" />
              <p className="relative text-3xl font-black text-[#0b2d60] sm:text-4xl">
                {stat.value}
              </p>
              <p className="relative mt-2 text-[11px] font-bold uppercase tracking-[0.16em] text-slate-500">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
