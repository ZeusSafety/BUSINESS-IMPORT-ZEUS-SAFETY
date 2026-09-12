'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import {
  ArrowRight,
  Plus,
} from 'lucide-react';
import {
  CreditCard,
  FileText,
  Headset,
  MedalMilitary,
  Package,
  SealPercent,
  Truck,
  UserCircleCheck,
} from '@phosphor-icons/react';

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
    href: '/#cobertura-envios',
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
    id: 'calidad',
    icon: MedalMilitary,
    title: 'Garantía de calidad',
    text: 'Productos certificados que destacan por su confiabilidad y excelencia.',
  },
  {
    id: 'envios',
    icon: Truck,
    title: 'Envíos nacionales',
    text: 'Despachamos a todo el Perú con la flexibilidad de tu agencia preferida.',
  },
  {
    id: 'asesoria',
    icon: Headset,
    title: 'Asesoría personalizada',
    text: 'Acompañamiento de nuestro equipo experto según tu industria.',
  },
  {
    id: 'volumen',
    icon: SealPercent,
    title: 'Precios mayoristas',
    text: 'Condiciones preferenciales para compras por volumen y contratos.',
  },
];

const creditSteps = [
  {
    id: 'cotiza',
    icon: FileText,
    title: 'Cotiza tu pedido',
    text: 'Indica productos, cantidades y frecuencia de compra.',
    accent: 'navy' as const,
  },
  {
    id: 'evaluacion',
    icon: UserCircleCheck,
    title: 'Evaluación comercial',
    text: 'Revisamos tu empresa, volumen y historial de compras.',
    accent: 'yellow' as const,
  },
  {
    id: 'linea',
    icon: CreditCard,
    title: 'Línea aprobada',
    text: 'Activamos condiciones de crédito según tu operación.',
    accent: 'navy' as const,
  },
  {
    id: 'recurrentes',
    icon: Package,
    title: 'Compras recurrentes',
    text: 'Despachos sin repetir trámites en cada pedido.',
    accent: 'yellow' as const,
  },
];

function LogisticsProcess() {
  return (
    <section className="w-full overflow-hidden bg-[#f3f5f8] py-14 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="mx-auto max-w-2xl text-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
            Nuestro proceso
          </p>
          <h3 className="mt-2 text-xl font-black tracking-tight text-[#0b2d60] sm:text-2xl lg:text-[1.75rem]">
            ¿Cómo funciona nuestra logística?
          </h3>
          <p className="mt-2 text-sm text-slate-500 sm:text-[15px]">
            El camino que seguimos en cada pedido: de la calidad al despacho,
            con acompañamiento y condiciones claras.
          </p>
          <div className="mx-auto mt-4 h-1.5 w-14 rounded-full bg-[#F5C400]" />
        </motion.div>

        <div className="relative mt-12 lg:mt-14">
          <div
            aria-hidden
            className="pointer-events-none absolute left-[8%] right-[8%] top-[52px] z-0 hidden h-[3px] overflow-hidden rounded-full bg-[#0b2d60]/12 lg:block"
          >
            <motion.div
              className="h-full origin-left rounded-full bg-[#F5C400]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{
                duration: 1.4,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
              }}
            />
          </div>

          <ol className="relative z-10 grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-4">
            {logisticsSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <motion.li
                  key={step.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex flex-col"
                >
                  <div className="mb-4 flex justify-center lg:mb-5">
                    <span className="zeus-stat-ring relative flex h-[100px] w-[100px] items-center justify-center">
                      <span aria-hidden className="zeus-stat-ring__border" />
                      <span className="relative z-10 flex h-[70px] w-[70px] items-center justify-center rounded-full bg-[#0b2d60] shadow-[0_12px_28px_rgba(11,45,96,0.28)] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#F5C400] group-hover:shadow-[0_14px_32px_rgba(245,196,0,0.4)]">
                        <Icon
                          size={30}
                          weight="duotone"
                          className="text-[#F5C400] transition-colors duration-300 group-hover:text-[#0b2d60]"
                        />
                      </span>
                    </span>
                  </div>

                  <div className="relative flex min-h-[168px] flex-1 flex-col items-center overflow-hidden rounded-[1.35rem] border border-slate-200/80 bg-white px-5 py-6 text-center shadow-[0_8px_28px_rgba(11,45,96,0.06)] transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#F5C400]/55 group-hover:shadow-[0_18px_40px_rgba(11,45,96,0.12)] sm:min-h-[180px] sm:px-6 sm:py-7">
                    <span
                      aria-hidden
                      className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#0b2d60] via-[#F5C400] to-[#0b2d60]"
                    />

                    <h4 className="text-[14px] font-black uppercase leading-snug tracking-wide text-[#0b2d60] sm:text-[15px]">
                      {step.title}
                    </h4>
                    <span className="mx-auto mt-3 h-1 w-10 rounded-full bg-[#F5C400] transition-all duration-300 group-hover:w-14" />
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-500">
                      {step.text}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

export function HomeConfia() {
  return (
    <>
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
                  className="group relative block h-[380px] overflow-hidden rounded-2xl border border-slate-200 shadow-[0_10px_28px_rgba(11,45,96,0.08)] transition-all duration-500 ease-out hover:-translate-y-3 hover:shadow-[0_22px_48px_rgba(11,45,96,0.2)] sm:h-[440px] lg:h-[500px]"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b2d60]/85 via-[#0b2d60]/30 to-transparent transition-all duration-500 group-hover:from-[#0b2d60]/95 group-hover:via-[#0b2d60]/45" />

                  <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
                    <span className="mb-3 block h-1 w-10 rounded-full bg-[#F5C400] transition-all duration-300 group-hover:w-16" />

                    <div className="flex items-end justify-between gap-3">
                      <h3 className="min-w-0 flex-1 text-lg font-black leading-tight text-white transition-transform duration-300 group-hover:-translate-y-1 sm:text-xl lg:text-[1.35rem]">
                        {item.title}
                      </h3>
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-[#F5C400] bg-[#F5C400]/15 text-[#F5C400] transition-all duration-300 group-hover:rotate-45 group-hover:border-white group-hover:bg-white group-hover:text-[#0b2d60]">
                        <Plus className="h-5 w-5" strokeWidth={2.5} />
                      </span>
                    </div>

                    <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-500 ease-out group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className="mt-3 max-w-sm translate-y-3 text-sm leading-relaxed text-white/90 opacity-0 transition-all duration-500 delay-75 group-hover:translate-y-0 group-hover:opacity-100 sm:text-[15px]">
                          {item.description}
                        </p>
                        <span className="mt-3 inline-flex translate-y-3 items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide text-[#F5C400] opacity-0 transition-all duration-500 delay-100 group-hover:translate-x-1 group-hover:translate-y-0 group-hover:opacity-100">
                          {item.cta}
                          <ArrowRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <LogisticsProcess />

      <CreditFacilities />
    </>
  );
}

function CreditFacilities() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="facilidades-credito"
      className="scroll-mt-24 w-full overflow-hidden bg-white"
    >
      <div className="grid min-h-[620px] lg:min-h-[720px] lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)]">
        {/* Izquierda: imagen clara */}
        <div className="relative min-h-[380px] overflow-hidden bg-[#f3f5f8] lg:min-h-full">
          <Image
            src="/compra-segura-zeus.png"
            alt="Tu compra, más fácil y segura — Zeus Safety"
            fill
            className="object-cover object-[68%_30%]"
            sizes="(max-width: 1024px) 100vw, 45vw"
            quality={92}
            priority={false}
          />
        </div>

        {/* Derecha: columnas color sólido + icono */}
        <div className="flex min-h-[540px] flex-col lg:min-h-full lg:flex-row">
          {creditSteps.map((step, index) => {
            const Icon = step.icon;
            const isOpen = active === index;
            const isYellow = step.accent === 'yellow';
            const num = String(index + 1).padStart(2, '0');

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => setActive(index)}
                onMouseEnter={() => setActive(index)}
                aria-expanded={isOpen}
                className={`group relative flex min-h-[160px] overflow-hidden text-left transition-[flex] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] lg:min-h-0 ${
                  isOpen ? 'flex-[2.4]' : 'flex-[1]'
                } ${isYellow ? 'bg-[#F5C400]' : 'bg-[#0b2d60]'}`}
              >
                {/* Número de fondo (llena el centro) */}
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-0 flex items-center justify-center select-none font-black leading-none transition-opacity duration-300 ${
                    isYellow ? 'text-[#0b2d60]' : 'text-white'
                  } ${isOpen ? 'opacity-[0.08] text-[10rem] sm:text-[12rem]' : 'opacity-[0.12] text-[6.5rem] sm:text-[7.5rem]'}`}
                >
                  {num}
                </span>

                <div
                  className={`relative z-10 flex h-full w-full flex-col p-5 sm:p-6 lg:p-7 ${
                    isOpen
                      ? 'justify-between'
                      : 'items-center justify-center gap-4 lg:items-start lg:justify-between'
                  }`}
                >
                  <div
                    className={`flex ${
                      isOpen
                        ? 'flex-col'
                        : 'flex-col items-center lg:items-start'
                    }`}
                  >
                    <span
                      className={`zeus-stat-ring relative flex items-center justify-center transition-transform duration-300 group-hover:scale-105 ${
                        isOpen
                          ? 'h-[4.75rem] w-[4.75rem]'
                          : 'h-14 w-14'
                      }`}
                    >
                      <span
                        aria-hidden
                        className="zeus-stat-ring__border"
                        style={
                          isYellow
                            ? {
                                borderTopColor: '#0b2d60',
                                borderRightColor: 'rgba(11,45,96,0.35)',
                                borderBottomColor: 'rgba(11,45,96,0.15)',
                                borderLeftColor: 'rgba(11,45,96,0.55)',
                              }
                            : undefined
                        }
                      />
                      <Icon
                        size={isOpen ? 32 : 24}
                        weight="duotone"
                        className={`relative z-10 transition-all duration-300 ${
                          isYellow ? 'text-[#0b2d60]' : 'text-[#F5C400]'
                        }`}
                      />
                    </span>

                    <h4
                      className={`mt-4 font-black leading-tight tracking-tight ${
                        isYellow ? 'text-[#0b2d60]' : 'text-white'
                      } ${
                        isOpen
                          ? 'text-xl sm:text-2xl lg:text-[1.65rem]'
                          : 'text-center text-[13px] sm:text-sm lg:text-left lg:text-[15px]'
                      }`}
                    >
                      {step.title}
                    </h4>
                  </div>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key={`${step.id}-open`}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.3 }}
                        className="mt-auto pt-6"
                      >
                        <span
                          className={`mb-4 block h-1 w-14 rounded-full ${
                            isYellow ? 'bg-[#0b2d60]' : 'bg-[#F5C400]'
                          }`}
                        />
                        <p
                          className={`max-w-[18rem] text-sm leading-relaxed sm:text-[15px] ${
                            isYellow
                              ? 'text-[#0b2d60]/85'
                              : 'text-white/85'
                          }`}
                        >
                          {step.text}
                        </p>
                        <Link
                          href="/asesores"
                          className={`mt-6 inline-flex items-center gap-2 border-b-2 pb-0.5 text-xs font-bold uppercase tracking-wide transition-opacity hover:opacity-80 ${
                            isYellow
                              ? 'border-[#0b2d60] text-[#0b2d60]'
                              : 'border-[#F5C400] text-[#F5C400]'
                          }`}
                          onClick={(e) => e.stopPropagation()}
                        >
                          Solicitar información
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </motion.div>
                    ) : (
                      <motion.p
                        key={`${step.id}-hint`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className={`mt-auto hidden text-[10px] font-bold uppercase tracking-[0.18em] lg:block ${
                          isYellow ? 'text-[#0b2d60]/55' : 'text-white/45'
                        }`}
                      >
                        Ver detalle
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
