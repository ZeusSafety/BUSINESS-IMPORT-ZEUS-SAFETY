'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  BadgeCheck,
  CreditCard,
  FileText,
  Headphones,
  Package,
  Percent,
  Truck,
  UserCheck,
} from 'lucide-react';

const pillars = [
  {
    image: '/confia-1.png',
    title: 'Amplia variedad de productos',
    description:
      'EPP certificado para cada frente de riesgo en tu operación.',
    href: '/productos',
    cta: 'Ver catálogo',
  },
  {
    image: '/confia-2.png',
    title: 'Entrega a tiempo',
    description:
      'Despachos ágiles a todo el Perú con seguimiento online.',
    href: '#cobertura-envios',
    cta: 'Ver cobertura',
  },
  {
    image: '/confia-3.png',
    title: 'Facilidades de crédito',
    description:
      'Condiciones pensadas para compras corporativas y por volumen.',
    href: '#facilidades-credito',
    cta: 'Conocer más',
  },
];

const logisticsSteps = [
  {
    step: '1',
    icon: BadgeCheck,
    title: 'Garantía de calidad',
    text: 'Productos certificados que destacan por su confiabilidad y excelencia.',
  },
  {
    step: '2',
    icon: Truck,
    title: 'Envíos nacionales',
    text: 'Despachamos a todo el Perú con la flexibilidad de tu agencia preferida.',
  },
  {
    step: '3',
    icon: Headphones,
    title: 'Asesoría personalizada',
    text: 'Acompañamiento de nuestro equipo experto según tu industria.',
  },
  {
    step: '4',
    icon: Percent,
    title: 'Precios mayoristas',
    text: 'Condiciones preferenciales para compras por volumen y contratos.',
  },
];

const creditSteps = [
  {
    icon: FileText,
    title: 'Cotiza tu pedido',
    text: 'Indica productos, cantidades y frecuencia de compra.',
  },
  {
    icon: UserCheck,
    title: 'Evaluación comercial',
    text: 'Revisamos tu empresa, volumen y historial de compras.',
  },
  {
    icon: CreditCard,
    title: 'Línea aprobada',
    text: 'Activamos condiciones de crédito según tu operación.',
  },
  {
    icon: Package,
    title: 'Compras recurrentes',
    text: 'Despachos sin repetir trámites en cada pedido.',
  },
];

export function HomeConfia() {
  return (
    <section id="confia" className="scroll-mt-28 bg-[#f3f5f8]">
      <div className="mx-auto max-w-[1600px] px-6 py-10 sm:px-8 lg:px-12 lg:py-12 xl:px-16">
        <div className="mb-8 text-center">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
            Confianza
          </p>
          <h2 className="text-lg font-black uppercase tracking-[0.04em] text-[#0b2d60] sm:text-xl">
            Confía en nosotros
          </h2>
          <div className="mx-auto mt-2 h-1.5 w-14 rounded-full bg-[#F5C400]" />
          <p className="mx-auto mt-2 max-w-xl text-xs text-slate-500 sm:text-sm">
            Producto, logística y soporte para que tu equipo opere con
            seguridad.
          </p>
        </div>

        {/* 3 pilares */}
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
                className="group relative block h-[300px] overflow-hidden rounded-2xl border border-slate-200 shadow-[0_10px_28px_rgba(11,45,96,0.08)] sm:h-[360px] lg:h-[400px]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2d60]/80 via-[#0b2d60]/35 to-[#0b2d60]/10 transition-opacity duration-300 group-hover:from-[#0b2d60]/90" />
                <div className="absolute inset-0 flex flex-col justify-end p-5 sm:p-6">
                  <span className="mb-2.5 h-1 w-10 rounded-full bg-[#F5C400] transition-all duration-300 group-hover:w-14" />
                  <h3 className="text-lg font-black leading-tight text-white sm:text-xl">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/85">
                    {item.description}
                  </p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-[#F5C400] transition-transform duration-300 group-hover:translate-x-1">
                    {item.cta}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Logística — estilo proceso horizontal */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-12 rounded-2xl border border-slate-200 bg-white px-5 py-10 shadow-[0_12px_40px_rgba(11,45,96,0.06)] sm:mt-14 sm:px-8 sm:py-12 lg:px-12"
        >
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
              Zeus Safety
            </p>
            <h3 className="mt-2 text-xl font-black tracking-tight text-[#0b2d60] sm:text-2xl">
              ¿Cómo funciona nuestra logística?
            </h3>
            <p className="mt-2 text-sm text-slate-500">
              Cobertura nacional con stock, asesoría y condiciones pensadas para
              operaciones industriales.
            </p>
            <div className="mx-auto mt-4 h-1.5 w-14 rounded-full bg-[#F5C400]" />
          </div>

          <div className="relative mt-10 grid gap-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4 lg:gap-4">
            <span
              aria-hidden
              className="pointer-events-none absolute left-[12%] right-[12%] top-10 hidden h-0.5 bg-[#F5C400]/70 lg:block"
            />

            {logisticsSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className="group relative z-10 flex flex-col items-center text-center"
                >
                  <div className="relative mb-4">
                    <span className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#F5C400] bg-white text-[#0b2d60] shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#0b2d60] group-hover:bg-[#0b2d60] group-hover:text-[#F5C400] group-hover:shadow-[0_10px_24px_rgba(11,45,96,0.18)]">
                      <Icon className="h-8 w-8" strokeWidth={1.75} />
                    </span>
                    <span className="absolute -bottom-1 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-[#0b2d60] text-xs font-black text-white ring-2 ring-white">
                      {step.step}
                    </span>
                  </div>
                  <p className="mt-2 text-xs font-black uppercase tracking-wide text-[#0b2d60]">
                    {step.title}
                  </p>
                  <p className="mt-2 max-w-[200px] text-[12px] leading-relaxed text-slate-500">
                    {step.text}
                  </p>
                </motion.div>
              );
            })}
          </div>

          <div className="mt-10 flex justify-center">
            <Link
              href="#cobertura-envios"
              className="group/btn relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full border border-slate-200 bg-[#f8fafc] px-5 text-[11px] font-bold uppercase tracking-wide text-[#0b2d60] transition-all hover:border-[#F5C400]"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-[#F5C400] transition-transform duration-300 ease-out group-hover/btn:scale-x-100"
              />
              <span className="relative z-10">Ver mapa de cobertura</span>
              <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
            </Link>
          </div>
        </motion.div>

        {/* Facilidades de crédito — banner split */}
        <motion.div
          id="facilidades-credito"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="mt-8 scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_14px_40px_rgba(11,45,96,0.08)] sm:mt-10 lg:grid lg:grid-cols-[1.1fr_0.9fr]"
        >
          <div className="flex flex-col justify-center px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
              Financiamiento B2B
            </p>
            <h3 className="mt-2 text-2xl font-black leading-tight tracking-tight text-[#0b2d60] sm:text-3xl">
              Facilidades de crédito para tu operación
            </h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-500">
              Accede a condiciones comerciales pensadas para empresas que
              compran EPP de forma recurrente. Proceso simple, sin burocracia
              innecesaria.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {creditSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.05 }}
                    className="group flex items-start gap-3 rounded-2xl border border-slate-100 bg-[#f7f8fa] p-3.5 transition-all hover:border-[#F5C400]/40 hover:bg-white"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0b2d60] text-[#F5C400] transition-colors group-hover:bg-[#F5C400] group-hover:text-[#0b2d60]">
                      <Icon className="h-4 w-4" strokeWidth={2.25} />
                    </span>
                    <div>
                      <p className="text-[11px] font-black uppercase tracking-wide text-[#0b2d60]">
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-[11px] leading-snug text-slate-500">
                        {step.text}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="mt-7">
              <Link
                href="/asesores"
                className="group/btn relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-[#0b2d60] px-7 text-xs font-bold uppercase tracking-wide text-white transition-all hover:shadow-[0_8px_24px_rgba(11,45,96,0.3)]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 bg-[#F5C400] transition-transform duration-300 ease-out group-hover/btn:scale-x-100"
                />
                <span className="relative z-10 transition-colors group-hover/btn:text-[#0b2d60]">
                  Solicitar más información
                </span>
                <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-all group-hover/btn:translate-x-0.5 group-hover/btn:text-[#0b2d60]" />
              </Link>
            </div>
          </div>

          <div className="relative min-h-[260px] bg-[#0b2d60] lg:min-h-full">
            <Image
              src="/confia-3.png"
              alt="Facilidades de crédito Zeus Safety"
              fill
              className="object-cover object-center opacity-90"
              sizes="(max-width: 1024px) 100vw, 45vw"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-[#0b2d60]/70 via-[#0b2d60]/20 to-transparent"
            />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/20 bg-[#0b2d60]/70 p-4 backdrop-blur-sm sm:bottom-6 sm:left-6 sm:right-6">
              <p className="text-[10px] font-bold uppercase tracking-wide text-[#F5C400]">
                Ejemplo
              </p>
              <p className="mt-1 text-sm font-semibold leading-snug text-white">
                Empresa minera con línea de crédito — compras mensuales de
                guantes, calzado y EPP respiratorio sin repetir trámites.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
