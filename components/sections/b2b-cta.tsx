'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  HardHat,
  MessageCircle,
  Phone,
  Sparkles,
  Users,
} from 'lucide-react';

const industries = [
  'Minería',
  'Construcción',
  'Energía',
  'Oil & Gas',
  'Manufactura',
  'Logística',
];

const steps = [
  {
    n: '01',
    title: 'Cuéntanos tu operación',
    text: 'Riesgos, cuadrilla y plazos.',
  },
  {
    n: '02',
    title: 'Te armamos la propuesta',
    text: 'Kits EPP y condiciones claras.',
  },
  {
    n: '03',
    title: 'Despachamos y acompañamos',
    text: 'Seguimiento hasta tu obra o planta.',
  },
];

export function B2BCtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#071a3a]">
      <Image
        src="/zeus2.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover object-center opacity-25"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#071a3a] via-[#0b2d60]/95 to-[#0b2d60]/85" />
      <div className="absolute left-0 top-0 h-full w-1.5 bg-[#F5C400]" />

      <div className="relative mx-auto grid max-w-[1600px] lg:grid-cols-[1.05fr_0.95fr]">
        {/* Izquierda: mensaje de cierre */}
        <div className="px-6 py-14 sm:px-8 lg:px-10 lg:py-20 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.26em] text-[#F5C400]">
              Siguiente paso
            </p>
            <h2 className="max-w-xl text-3xl font-black uppercase leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.6rem]">
              ¿Listo para proteger
              <span className="mt-1 block text-[#F5C400]">
                a tu equipo?
              </span>
            </h2>
            <p className="mt-4 max-w-lg text-base leading-relaxed text-white/75">
              Un especialista Zeus te orienta según tu industria. Sin repetir
              catálogo: conversación directa, propuesta clara y acompañamiento.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {industries.map((item) => (
                <span
                  key={item}
                  className="border border-white/20 bg-white/5 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white/90"
                >
                  {item}
                </span>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href="/asesores"
                className="group inline-flex h-12 items-center justify-center gap-2 bg-[#F5C400] px-6 text-sm font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233]"
              >
                <Users className="h-4 w-4" />
                Hablar con un asesor
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/cotizacion"
                className="inline-flex h-12 items-center justify-center gap-2 border border-white/30 bg-transparent px-6 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:border-[#F5C400] hover:bg-[#F5C400] hover:text-[#0b2d60]"
              >
                <MessageCircle className="h-4 w-4" />
                Enviar cotización
              </Link>
            </div>

            <a
              href="tel:+51916532849"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-colors hover:text-[#F5C400]"
            >
              <Phone className="h-4 w-4 text-[#F5C400]" />
              +51 916 532 849 · Lun–Sáb 9:00–17:30
            </a>
          </motion.div>
        </div>

        {/* Derecha: proceso en 3 pasos */}
        <div className="border-t border-white/10 bg-[#0b2d60]/70 px-6 py-12 backdrop-blur-sm sm:px-8 lg:border-l lg:border-t-0 lg:px-10 lg:py-20 xl:px-12">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
          >
            <div className="mb-6 flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-[#F5C400]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
                Cómo trabajamos contigo
              </p>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={step.n}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
                  className="flex gap-4 border border-white/10 bg-white/5 p-4 transition-colors hover:border-[#F5C400]/40"
                >
                  <span className="text-2xl font-black leading-none text-[#F5C400]">
                    {step.n}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-white/65">{step.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex items-start gap-3 border-l-2 border-[#F5C400] bg-white/5 py-3 pl-4">
              <HardHat className="mt-0.5 h-5 w-5 shrink-0 text-[#F5C400]" />
              <p className="text-sm leading-relaxed text-white/80">
                Si ya tienes lista de EPP, súbela en la cotización. Si no, tu
                asesor arma el kit según matriz de riesgo.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
