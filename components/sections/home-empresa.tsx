'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import {
  CalendarDays,
  Globe2,
  MapPinned,
} from 'lucide-react';
import {
  Crosshair,
  Eye as PhosphorEye,
  MedalMilitary,
  ShieldCheck,
} from '@phosphor-icons/react';

const pillars = [
  {
    title: 'Misión',
    tagline: 'Protección integral',
    description:
      'Proporcionar soluciones integrales de seguridad industrial que protejan la vida de los trabajadores con EPP certificado, asesoría técnica y logística confiable.',
    icon: Crosshair,
    accent: '#F5C400',
  },
  {
    title: 'Visión',
    tagline: 'Liderazgo regional',
    description:
      'Ser el referente líder en seguridad industrial en Latinoamérica por excelencia operativa, innovación y compromiso con entornos laborales más seguros.',
    icon: PhosphorEye,
    accent: '#0b2d60',
  },
  {
    title: 'Seguridad',
    tagline: 'Estándares globales',
    description:
      'Operamos bajo estándares globales y auditorías constantes para proteger a tu fuerza laboral en campo.',
    icon: ShieldCheck,
    accent: '#F5C400',
  },
  {
    title: 'Calidad',
    tagline: 'EPP certificado',
    description:
      'EPP certificados internacionalmente con trazabilidad de lotes y cumplimiento normativo en cada entrega.',
    icon: MedalMilitary,
    accent: '#0b2d60',
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
    if (!active) {
      setValue(0);
      return;
    }
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
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay }}
      className="group relative flex items-center justify-center gap-4 overflow-hidden px-4 py-6 sm:px-6 sm:py-7 lg:px-8"
    >
      <span className="zeus-stat-ring relative z-10 flex h-14 w-14 shrink-0 items-center justify-center transition-transform duration-300 group-hover:scale-110 sm:h-16 sm:w-16">
        <span aria-hidden className="zeus-stat-ring__border" />
        <Icon
          className="relative z-10 h-6 w-6 text-[#F5C400] transition-transform duration-300 group-hover:rotate-6 sm:h-7 sm:w-7"
          strokeWidth={2}
        />
      </span>
      <div className="relative z-10 min-w-0 text-left">
        <p className="text-3xl font-black tabular-nums tracking-tight text-white transition-all duration-300 group-hover:-translate-y-0.5 group-hover:text-[#F5C400] sm:text-4xl">
          {count}
          {suffix}
        </p>
        <p className="mt-0.5 text-[11px] font-medium leading-snug text-white/70 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white sm:text-xs">
          {label}
        </p>
        <span
          aria-hidden
          className="mt-2 block h-0.5 w-0 rounded-full bg-[#F5C400] transition-all duration-300 ease-out group-hover:w-12"
        />
      </div>
    </motion.div>
  );
}

/** Stats con conteo — debajo de “Sobre la empresa”, centrado con padding */
export function AboutStatsStrip() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, amount: 0.4 });

  return (
    <section
      aria-label="Indicadores Zeus Safety"
      className="relative w-full overflow-hidden"
    >
      <Image
        src="/sobre-nosotros-ops-v2.png"
        alt=""
        fill
        className="object-cover object-center opacity-40"
        sizes="100vw"
        quality={85}
        priority={false}
      />
      <span aria-hidden className="absolute inset-0 bg-[#0b2d60]/78" />

      <div
        ref={statsRef}
        className="relative z-10 mx-auto grid w-full max-w-[1200px] divide-y divide-white/15 px-6 py-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0 sm:divide-white/15 sm:px-10 lg:px-14 xl:px-16"
      >
        {stats.map((stat, i) => (
          <StatCard
            key={stat.label}
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
            icon={stat.icon}
            active={statsInView}
            delay={i * 0.1}
          />
        ))}
      </div>
    </section>
  );
}

/** @deprecated Use AboutStatsStrip */
export function AboutEmpresaIntro() {
  return <AboutStatsStrip />;
}

/** Misión, visión, seguridad y calidad — highlight sin tapar vecinos */
export function HomeEmpresa() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="empresa"
      className="scroll-mt-28 overflow-hidden bg-[#f3f5f8] py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="relative grid gap-4 sm:grid-cols-2 sm:gap-5 xl:flex xl:gap-4">
          {pillars.map((item, index) => {
            const Icon = item.icon;
            const isActive = active === index;
            const dimmed = active !== null && !isActive;

            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                onMouseEnter={() => setActive(index)}
                onMouseLeave={() => setActive(null)}
                animate={{
                  flexGrow: isActive ? 1.35 : dimmed ? 0.85 : 1,
                  y: isActive ? -10 : 0,
                  opacity: dimmed ? 0.55 : 1,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 280,
                  damping: 26,
                  delay: index * 0.02,
                }}
                className="group relative flex min-h-[360px] flex-col overflow-hidden rounded-[1.35rem] border border-slate-200/80 bg-white shadow-[0_12px_32px_rgba(11,45,96,0.09)] sm:min-h-[380px] lg:min-h-[400px] xl:min-w-0 xl:flex-1"
                style={{
                  boxShadow: isActive
                    ? `0 22px 44px rgba(11,45,96,0.18), 0 0 0 2px ${item.accent}66`
                    : undefined,
                  zIndex: isActive ? 2 : 1,
                }}
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-1.5"
                  style={{
                    background: `linear-gradient(90deg, ${item.accent}, transparent 85%)`,
                  }}
                />
                <span
                  aria-hidden
                  className="absolute left-0 top-0 h-0 w-0 border-b-[56px] border-l-[56px] border-b-transparent"
                  style={{ borderLeftColor: item.accent }}
                />

                <div className="relative z-10 flex flex-1 flex-col items-center px-6 pb-5 pt-9 text-center sm:px-7 sm:pt-10">
                  <span className="zeus-stat-ring mb-5 flex h-[4.75rem] w-[4.75rem] items-center justify-center transition-transform duration-300 sm:mb-6 sm:h-[5.25rem] sm:w-[5.25rem]">
                    <span
                      aria-hidden
                      className="zeus-stat-ring__border"
                      style={
                        {
                          borderTopColor: item.accent,
                          borderRightColor: `${item.accent}55`,
                          borderBottomColor: `${item.accent}22`,
                          borderLeftColor: `${item.accent}99`,
                        } as CSSProperties
                      }
                    />
                    <span
                      className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full sm:h-16 sm:w-16"
                      style={{ backgroundColor: `${item.accent}14` }}
                    >
                      <Icon
                        size={32}
                        weight="duotone"
                        className="transition-transform duration-300 group-hover:rotate-6"
                        style={{ color: item.accent }}
                      />
                    </span>
                  </span>

                  <p
                    className="text-[10px] font-bold uppercase tracking-[0.2em]"
                    style={{ color: item.accent }}
                  >
                    {item.tagline}
                  </p>
                  <h3
                    className="mt-1.5 text-xl font-black uppercase tracking-[0.1em] sm:text-[1.35rem]"
                    style={{ color: item.accent }}
                  >
                    {item.title}
                  </h3>
                  <span
                    className="mx-auto mt-3 h-1 w-10 rounded-full transition-all duration-300 group-hover:w-16"
                    style={{ backgroundColor: item.accent }}
                  />

                  <p className="mt-4 flex-1 text-[15px] leading-relaxed text-slate-500 group-hover:text-slate-700 sm:text-base">
                    {item.description}
                  </p>
                </div>

                {/* Pie de card */}
                <div
                  className="relative mt-auto flex items-center justify-center gap-2 border-t px-5 py-3.5 sm:px-6"
                  style={{
                    borderColor: `${item.accent}33`,
                    background: isActive
                      ? `${item.accent}12`
                      : 'rgba(243,245,248,0.85)',
                  }}
                >
                  <span
                    className="h-1 w-8 rounded-full"
                    style={{ backgroundColor: item.accent }}
                  />
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: item.accent,
                      color:
                        item.accent === '#F5C400' ? '#0b2d60' : '#F5C400',
                    }}
                  >
                    <Icon size={15} weight="bold" />
                  </span>
                  <span
                    className="h-1 w-8 rounded-full"
                    style={{ backgroundColor: item.accent }}
                  />
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
