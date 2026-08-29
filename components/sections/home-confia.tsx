'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  ClipboardCheck,
  CreditCard,
  FileText,
  Package,
  Truck,
  UserCheck,
} from 'lucide-react';
import { IconBox } from '@/components/ui/icon-box';

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
    step: '01',
    icon: FileText,
    accent: 'brand' as const,
    title: 'Cotización',
    text: 'Recibes propuesta con stock, plazos y condiciones de envío.',
  },
  {
    step: '02',
    icon: Package,
    accent: 'yellow' as const,
    title: 'Preparación',
    text: 'Almacén arma tu pedido, verifica EPP y empaqueta por destino.',
  },
  {
    step: '03',
    icon: Truck,
    accent: 'sky' as const,
    title: 'Despacho',
    text: 'Salida desde Lima con courier o transporte según volumen.',
  },
  {
    step: '04',
    icon: ClipboardCheck,
    accent: 'emerald' as const,
    title: 'Entrega',
    text: 'Llegada a obra, mina o planta con confirmación de recepción.',
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
    <section id="confia" className="scroll-mt-28 bg-[#f4f6f9]">
      <div className="mx-auto max-w-[1600px] px-4 py-10 sm:px-6 lg:px-10 lg:py-12 xl:px-12">
        <div className="mb-8 text-center">
          <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
            Confianza
          </p>
          <h2 className="text-lg font-black uppercase tracking-[0.04em] text-[#0b2d60] sm:text-xl">
            Confía en nosotros
          </h2>
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
                className="group relative block h-[300px] overflow-hidden sm:h-[360px] lg:h-[400px]"
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
                  <span className="mb-2.5 h-1 w-10 bg-[#F5C400] transition-all duration-300 group-hover:w-14" />
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

        {/* Logística — cómo funciona */}
        <div className="mt-10 overflow-hidden bg-white shadow-[0_12px_40px_rgba(11,45,96,0.08)] ring-1 ring-slate-200/80 sm:mt-12">
          <div className="border-b border-slate-100 bg-gradient-to-r from-[#0b2d60]/[0.03] to-transparent px-5 py-4 sm:px-8">
            <div className="flex items-center gap-3">
              <span className="hidden h-8 w-1.5 bg-[#F5C400] sm:block" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
                  Entrega a tiempo
                </p>
                <h3 className="text-base font-black uppercase tracking-wide text-[#0b2d60] sm:text-lg">
                  ¿Cómo funciona nuestra logística?
                </h3>
              </div>
            </div>
          </div>

          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {logisticsSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="border-b border-slate-100 p-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 lg:p-6"
              >
                <div className="mb-3 flex items-center justify-between">
                  <IconBox icon={step.icon} accent={step.accent} size="md" />
                  <span className="text-[10px] font-bold tracking-widest text-slate-300">
                    {step.step}
                  </span>
                </div>
                <p className="text-xs font-black uppercase tracking-wide text-[#0b2d60]">
                  {step.title}
                </p>
                <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
                  {step.text}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-[#f8fafc] px-5 py-4 sm:px-8">
            <p className="text-xs text-slate-500">
              Explora en el mapa a dónde hemos despachado y cotiza tu envío.
            </p>
            <Link
              href="#cobertura-envios"
              className="group inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:text-[#F5C400]"
            >
              Ver mapa de cobertura
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Facilidades de crédito */}
        <div
          id="facilidades-credito"
          className="mt-6 scroll-mt-24 overflow-hidden bg-white shadow-[0_12px_40px_rgba(11,45,96,0.08)] ring-1 ring-slate-200/80 sm:mt-8"
        >
          <div className="border-b border-slate-100 bg-gradient-to-r from-[#0b2d60]/[0.03] to-transparent px-5 py-4 sm:px-8">
            <div className="flex items-center gap-3">
              <span className="hidden h-8 w-1.5 bg-[#F5C400] sm:block" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
                  Financiamiento B2B
                </p>
                <h3 className="text-base font-black uppercase tracking-wide text-[#0b2d60] sm:text-lg">
                  Facilidades de crédito
                </h3>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-8">
            <p className="mb-6 max-w-2xl text-sm leading-relaxed text-slate-600">
              Accede a condiciones comerciales pensadas para empresas que
              compran EPP de forma recurrente. Proceso simple, sin burocracia
              innecesaria.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {creditSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="flex items-start gap-3 border border-slate-100 bg-[#f8fafc] p-4"
                >
                  <IconBox icon={step.icon} accent="brand" size="sm" rounded="lg" />
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-wide text-[#0b2d60]">
                      {step.title}
                    </p>
                    <p className="mt-1 text-[11px] leading-snug text-slate-500">
                      {step.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-4 border border-[#F5C400]/40 bg-[#F5C400]/10 p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-[#0b2d60]/70">
                  Ejemplo
                </p>
                <p className="mt-1 text-sm font-semibold text-[#0b2d60]">
                  Empresa minera con línea de crédito — compras mensuales de
                  guantes, calzado y EPP respiratorio sin repetir trámites.
                </p>
              </div>
              <Link
                href="/asesores"
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 bg-[#0b2d60] px-6 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#103a7b]"
              >
                Solicitar más información
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
