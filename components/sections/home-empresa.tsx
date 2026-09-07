'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  ArrowRight,
  Award,
  CalendarDays,
  Eye,
  Globe2,
  MapPinned,
  Shield,
  Target,
} from 'lucide-react';

const pillars = [
  {
    num: '01',
    title: 'Misión',
    description:
      'Proporcionar soluciones integrales de seguridad industrial que protejan la vida de los trabajadores con EPP certificado, asesoría técnica y logística confiable.',
    icon: Target,
  },
  {
    num: '02',
    title: 'Visión',
    description:
      'Ser el referente líder en seguridad industrial en Latinoamérica por excelencia operativa, innovación y compromiso con entornos laborales más seguros.',
    icon: Eye,
  },
  {
    num: '03',
    title: 'Seguridad',
    description:
      'Operamos bajo estándares globales y auditorías constantes para proteger a tu fuerza laboral en campo.',
    icon: Shield,
  },
  {
    num: '04',
    title: 'Calidad',
    description:
      'EPP certificados internacionalmente con trazabilidad de lotes y cumplimiento normativo en cada entrega.',
    icon: Award,
  },
];

const stats = [
  {
    value: 10,
    suffix: '+',
    label: 'Años protegiendo operaciones',
    icon: CalendarDays,
  },
  {
    value: 4,
    suffix: '',
    label: 'Países de origen en Asia',
    icon: Globe2,
  },
  {
    value: 100,
    suffix: '%',
    label: 'Cobertura nacional en Perú',
    icon: MapPinned,
  },
];

function useCountUp(target: number, active: boolean, duration = 1400) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(target * eased));
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration]);

  return value;
}

function StatCard({
  value,
  suffix,
  label,
  icon: Icon,
  active,
  delay,
}: {
  value: number;
  suffix: string;
  label: string;
  icon: typeof CalendarDays;
  active: boolean;
  delay: number;
}) {
  const count = useCountUp(value, active, 1200 + delay * 200);

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay }}
      className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-[#0b2d60] p-4 shadow-[0_10px_28px_rgba(11,45,96,0.2)] transition-all hover:-translate-y-0.5 hover:border-[#F5C400]/50 hover:shadow-[0_14px_32px_rgba(11,45,96,0.28)] sm:p-5"
    >
      <span
        aria-hidden
        className="absolute inset-0 origin-left scale-x-0 bg-[#F5C400]/15 transition-transform duration-300 ease-out group-hover:scale-x-100"
      />
      <span className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F5C400] text-[#0b2d60] sm:h-14 sm:w-14">
        <Icon className="h-6 w-6" strokeWidth={2.25} />
      </span>
      <div className="relative z-10 min-w-0">
        <p className="text-3xl font-black tabular-nums tracking-tight text-white sm:text-4xl">
          {count}
          {suffix}
        </p>
        <p className="mt-0.5 text-[11px] font-medium leading-snug text-white/70 sm:text-xs">
          {label}
        </p>
      </div>
    </motion.div>
  );
}

/** Cabecera amarilla + stats — va arriba de “Protección industrial…” */
export function AboutEmpresaIntro() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.35 });

  return (
    <section className="overflow-hidden bg-[#f3f5f8]">
      <div className="bg-[#F5C400]">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-6 py-8 sm:px-8 sm:py-10 lg:flex-row lg:items-end lg:justify-between lg:px-12 xl:px-16">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="max-w-xl"
          >
            <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0b2d60]/70">
              Quiénes somos
            </p>
            <h2 className="text-2xl font-black uppercase leading-[1.05] tracking-tight text-[#0b2d60] sm:text-3xl">
              Nuestra empresa
            </h2>
            <div className="mt-2 h-1 w-14 rounded-full bg-[#0b2d60]/35" />
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-[#0b2d60]/85">
              Combinamos distribución de EPP certificado, asesoría consultiva y
              logística para proyectos de gran escala. Nuestro compromiso:{' '}
              <span className="font-bold text-[#0b2d60]">
                que tu equipo regrese a casa seguro
              </span>
              .
            </p>
          </motion.div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/productos"
              className="group/btn relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full bg-[#0b2d60] px-6 text-xs font-bold uppercase tracking-wide text-white transition-all hover:shadow-[0_8px_22px_rgba(11,45,96,0.35)]"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-white/20 transition-transform duration-300 ease-out group-hover/btn:scale-x-100"
              />
              <span className="relative z-10">Ver productos</span>
              <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
            </Link>
            <Link
              href="/asesores"
              className="group/btn relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-full border-2 border-[#0b2d60] bg-transparent px-5 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-all hover:shadow-sm"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-[#0b2d60] transition-transform duration-300 ease-out group-hover/btn:scale-x-100"
              />
              <span className="relative z-10 transition-colors group-hover/btn:text-white">
                Hablar con un asesor
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 py-6 sm:px-8 lg:px-12 xl:px-16">
        <div
          ref={statsRef}
          className="grid gap-3 sm:grid-cols-3 sm:gap-4"
        >
          {stats.map((stat, i) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              icon={stat.icon}
              active={statsInView}
              delay={i * 0.08}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/** Misión, visión y valores — panel amarillo + grid sobre imagen */
export function HomeEmpresa() {
  return (
    <section id="empresa" className="scroll-mt-28 overflow-hidden bg-[#f3f5f8] py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1600px] px-6 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="overflow-hidden rounded-2xl border border-slate-200 shadow-[0_16px_44px_rgba(11,45,96,0.1)] lg:grid lg:grid-cols-[minmax(260px,0.38fr)_minmax(0,1fr)]"
        >
          {/* Panel izquierdo amarillo */}
          <div className="relative flex flex-col justify-center bg-[#F5C400] px-6 py-10 sm:px-8 sm:py-12 lg:px-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#0b2d60]/70">
              Propósito Zeus
            </p>
            <h2 className="mt-2 text-2xl font-black uppercase leading-tight tracking-tight text-[#0b2d60] sm:text-3xl">
              Nuestra empresa
            </h2>
            <div className="mt-3 h-1 w-14 rounded-full bg-[#0b2d60]/40" />
            <p className="mt-4 text-sm leading-relaxed text-[#0b2d60]/90">
              Combinamos distribución de EPP certificado, asesoría consultiva y
              logística para proyectos de gran escala. Nuestro compromiso es
              claro: que tu equipo regrese a casa seguro.
            </p>
            <Link
              href="/asesores"
              className="group/btn relative mt-7 inline-flex h-11 w-fit items-center gap-2 overflow-hidden rounded-full bg-[#0b2d60] px-5 text-xs font-bold uppercase tracking-wide text-white transition-all hover:shadow-[0_8px_22px_rgba(11,45,96,0.35)]"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-white/20 transition-transform duration-300 ease-out group-hover/btn:scale-x-100"
              />
              <span className="relative z-10">Leer más</span>
              <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5" />
            </Link>
          </div>

          {/* Panel derecho con imagen + pilares */}
          <div className="relative min-h-[420px] bg-[#0b2d60] p-5 sm:p-7 lg:p-8">
            <Image
              src="/zeus2.jpg"
              alt=""
              fill
              className="object-cover object-center opacity-35"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <span
              aria-hidden
              className="absolute inset-0 bg-[#0b2d60]/55"
            />

            <div className="relative z-10 grid gap-4 sm:grid-cols-2 sm:gap-5">
              {pillars.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.article
                    key={item.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.07 }}
                    className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm transition-all hover:-translate-y-0.5 hover:border-[#F5C400]/50 hover:bg-white/15"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 origin-left scale-x-0 bg-[#F5C400]/15 transition-transform duration-300 ease-out group-hover:scale-x-100"
                    />
                    <div className="relative z-10 mb-3 flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F5C400] text-[#0b2d60]">
                        <Icon className="h-5 w-5" strokeWidth={2.25} />
                      </span>
                      <span className="text-[11px] font-bold tracking-widest text-white/35">
                        {item.num}
                      </span>
                    </div>
                    <h3 className="relative z-10 text-sm font-black uppercase tracking-wide text-white">
                      {item.title}
                    </h3>
                    <p className="relative z-10 mt-2 text-[13px] leading-relaxed text-white/75">
                      {item.description}
                    </p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
