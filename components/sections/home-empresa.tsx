'use client';

import { motion, useInView } from 'framer-motion';
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
      'Soluciones integrales de seguridad industrial con EPP certificado, asesoría técnica y logística confiable.',
    icon: Target,
  },
  {
    num: '02',
    title: 'Visión',
    description:
      'Ser el referente en seguridad industrial en Latinoamérica por excelencia operativa e innovación.',
    icon: Eye,
  },
  {
    num: '03',
    title: 'Seguridad',
    description:
      'Estándares globales y auditorías constantes para proteger a tu fuerza laboral en campo.',
    icon: Shield,
  },
  {
    num: '04',
    title: 'Calidad',
    description:
      'EPP con certificaciones internacionales, trazabilidad de lotes y cumplimiento en cada entrega.',
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
      className="group relative flex items-center gap-4 border border-[#0b2d60]/20 bg-[#0b2d60] p-4 transition-all hover:border-[#F5C400] hover:shadow-[0_12px_28px_rgba(11,45,96,0.25)] sm:p-5"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#F5C400] text-[#0b2d60] sm:h-14 sm:w-14">
        <Icon className="h-6 w-6" strokeWidth={2.25} />
      </span>
      <div className="min-w-0">
        <p className="text-3xl font-black tabular-nums tracking-tight text-white sm:text-4xl">
          {count}
          {suffix}
        </p>
        <p className="mt-0.5 text-[11px] font-medium leading-snug text-white/70 sm:text-xs">
          {label}
        </p>
      </div>
      <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-[#F5C400] transition-all duration-300 group-hover:w-full" />
    </motion.div>
  );
}

export function HomeEmpresa() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.4 });

  return (
    <section className="overflow-hidden bg-white">
      <div className="bg-[#F5C400]">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-10 lg:py-12 xl:px-12">
          <div className="max-w-xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#0b2d60]/70">
              Quiénes somos
            </p>
            <h2 className="text-3xl font-black uppercase leading-[1.05] tracking-tight text-[#0b2d60] sm:text-4xl lg:text-5xl">
              Nuestra empresa
            </h2>
            <p className="mt-4 max-w-lg text-sm leading-relaxed text-[#0b2d60]/85 sm:text-base">
              Combinamos distribución de EPP certificado, asesoría consultiva y
              logística para proyectos de gran escala. Nuestro compromiso:{' '}
              <span className="font-bold text-[#0b2d60]">
                que tu equipo regrese a casa seguro
              </span>
              .
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/productos"
              className="group inline-flex h-11 items-center gap-2 bg-[#0b2d60] px-6 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#103a7b]"
            >
              Ver productos
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/asesores"
              className="inline-flex h-11 items-center gap-2 border-2 border-[#0b2d60] px-5 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#0b2d60] hover:text-white"
            >
              Hablar con un asesor
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto max-w-[1400px] px-4 py-12 sm:px-6 lg:px-10 lg:py-14 xl:px-12">
          <div
            ref={statsRef}
            className="mb-10 grid gap-3 sm:mb-12 sm:grid-cols-3 sm:gap-4"
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

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {pillars.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.article
                  key={item.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="group flex flex-col border border-slate-200/80 bg-white p-5 shadow-[0_6px_20px_rgba(11,45,96,0.04)] transition-shadow hover:border-[#F5C400]/50 hover:shadow-[0_12px_32px_rgba(11,45,96,0.1)] sm:p-6"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center bg-[#F5C400] text-[#0b2d60]">
                      <Icon className="h-5 w-5" strokeWidth={2.25} />
                    </span>
                    <span className="text-[11px] font-bold tracking-widest text-slate-300">
                      {item.num}
                    </span>
                  </div>
                  <h3 className="text-sm font-black uppercase tracking-wide text-[#0b2d60]">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-[13px] leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                  <div className="mt-5 h-0.5 w-8 bg-[#F5C400] transition-all group-hover:w-14" />
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
