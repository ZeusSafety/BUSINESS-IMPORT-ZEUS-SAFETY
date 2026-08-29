'use client';

import { useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useId, useRef, useState } from 'react';
import mapData from '@/data/peru-map-data.json';

const benefits = [
  {
    image: '/segurida-removebg-preview.png',
    title: 'Garantía de calidad',
    description: 'EPP certificado y confiable.',
  },
  {
    image: '/envios-nacionales-removebg-preview.png',
    title: 'Envíos nacionales',
    description: 'Despacho a todo el Perú.',
  },
  {
    image: '/monitoreo-removebg-preview.png',
    title: 'Asesoría personalizada',
    description: 'Equipo experto por industria.',
  },
  {
    image: '/descuentos-removebg-preview.png',
    title: 'Precios mayoristas',
    description: 'Condiciones por volumen.',
  },
];

type CityId = keyof typeof mapData.cityXY;

const cityMeta: { id: CityId; label: string }[] = [
  { id: 'lima', label: 'Lima' },
  { id: 'piura', label: 'Piura' },
  { id: 'trujillo', label: 'Trujillo' },
  { id: 'cajamarca', label: 'Cajamarca' },
  { id: 'huancayo', label: 'Huancayo' },
  { id: 'ica', label: 'Ica' },
  { id: 'cusco', label: 'Cusco' },
  { id: 'arequipa', label: 'Arequipa' },
  { id: 'iquitos', label: 'Iquitos' },
  { id: 'tacna', label: 'Tacna' },
];

const DESTINATIONS: CityId[] = [
  'piura',
  'trujillo',
  'cajamarca',
  'iquitos',
  'huancayo',
  'ica',
  'cusco',
  'arequipa',
  'tacna',
];

const cityNotes: Partial<Record<CityId, string>> = {
  lima: 'Hub nacional · stock y despacho central.',
  piura: 'Agroindustria y energía en el norte.',
  trujillo: 'Manufactura e industria costera.',
  cajamarca: 'Minería y operaciones de campo.',
  iquitos: 'Logística amazónica y proyectos.',
  huancayo: 'Centro andino y construcción.',
  ica: 'Agroexportación y obras civiles.',
  cusco: 'Turismo, obras e infraestructura.',
  arequipa: 'Minería e industria del sur.',
  tacna: 'Frontera y comercio del sur.',
};

const WA_NUMBER = '51999999999';
const PULSE_MS = 1800;
const OUT_MS = 1600;
const BACK_MS = 1200;
const PAUSE_MS = 350;
const VB_W = mapData.W;
const VB_H = mapData.H;
const LIMA = mapData.cityXY.lima;

function cityLabel(id: CityId) {
  return cityMeta.find((c) => c.id === id)?.label ?? id;
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function titleCase(name: string) {
  return name
    .toLowerCase()
    .replace(/(^|\s)\S/g, (c) => c.toUpperCase())
    .replace('De ', 'de ');
}

function curvePoint(
  a: { x: number; y: number },
  b: { x: number; y: number },
  t: number,
) {
  const mx = (a.x + b.x) / 2 + (b.y - a.y) * 0.12;
  const my = (a.y + b.y) / 2 - (b.x - a.x) * 0.12;
  const u = 1 - t;
  return {
    x: u * u * a.x + 2 * u * t * mx + t * t * b.x,
    y: u * u * a.y + 2 * u * t * my + t * t * b.y,
  };
}

function curveAngle(
  a: { x: number; y: number },
  b: { x: number; y: number },
  t: number,
) {
  const p = curvePoint(a, b, t);
  const q = curvePoint(a, b, Math.min(1, t + 0.02));
  return (Math.atan2(q.y - p.y, q.x - p.x) * 180) / Math.PI + 90;
}

function spokePath(dest: { x: number; y: number }) {
  const mx = (LIMA.x + dest.x) / 2 + (dest.y - LIMA.y) * 0.12;
  const my = (LIMA.y + dest.y) / 2 - (dest.x - LIMA.x) * 0.12;
  return `M${LIMA.x} ${LIMA.y} Q${mx.toFixed(1)} ${my.toFixed(1)} ${dest.x} ${dest.y}`;
}

function PlaneMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
      aria-hidden
    >
      <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
    </svg>
  );
}

export function HomePeruCoverage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const uid = useId().replace(/:/g, '');
  const interruptRef = useRef<CityId | null>(null);

  const [phase, setPhase] = useState<'pulse' | 'out' | 'back'>('pulse');
  const [legIndex, setLegIndex] = useState(0);
  const [legT, setLegT] = useState(0);
  const [reached, setReached] = useState<Set<string>>(() => new Set(['lima']));
  const [hoverDept, setHoverDept] = useState<string | null>(null);
  const [activeCity, setActiveCity] = useState<CityId>('lima');
  const [quoteCity, setQuoteCity] = useState<CityId>('lima');
  const [limaBuzz, setLimaBuzz] = useState(0);
  const [benefitProgress, setBenefitProgress] = useState(0);

  const destId = DESTINATIONS[legIndex] ?? DESTINATIONS[0];
  const dest = mapData.cityXY[destId];

  const flyToCity = (cityId: CityId) => {
    setQuoteCity(cityId);
    if (cityId === 'lima') {
      setActiveCity('lima');
      return;
    }
    interruptRef.current = cityId;
  };

  const openQuoteWhatsApp = () => {
    const label = cityLabel(quoteCity);
    const text =
      quoteCity === 'lima'
        ? 'Hola, quiero cotizar un envío de EPP con Zeus Safety a todo el Perú. ¿A qué ciudades despachan?'
        : `Hola, quiero cotizar un envío de EPP a ${label} con Zeus Safety.`;
    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(text)}`,
      '_blank',
      'noopener,noreferrer',
    );
  };

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const start = performance.now();
    let localLeg = 0;
    let localPhase: 'pulse' | 'out' | 'back' | 'pause' = 'pulse';
    let phaseStart = start;
    const unlocked = new Set<string>(['lima']);

    const applyInterrupt = (now: number) => {
      const target = interruptRef.current;
      if (!target || target === 'lima') return;
      interruptRef.current = null;
      const idx = DESTINATIONS.indexOf(target);
      if (idx < 0) return;
      localLeg = idx;
      setLegIndex(idx);
      setActiveCity(target);
      setPhase('out');
      setLegT(0);
      localPhase = 'out';
      phaseStart = now;
    };

    const tick = (now: number) => {
      applyInterrupt(now);
      const elapsed = now - phaseStart;

      if (localPhase === 'pulse') {
        setPhase('pulse');
        setActiveCity('lima');
        setLegT(0);
        setLimaBuzz((elapsed / 70) % (Math.PI * 2));
        if (elapsed >= PULSE_MS) {
          localPhase = 'out';
          phaseStart = now;
        }
      } else if (localPhase === 'out') {
        setPhase('out');
        const t = Math.min(1, elapsed / OUT_MS);
        const eased = 1 - Math.pow(1 - t, 2);
        setLegT(eased);
        const current = DESTINATIONS[localLeg];
        setActiveCity(current);
        setLimaBuzz((elapsed / 160) % (Math.PI * 2));
        if (t >= 1) {
          unlocked.add(current);
          setReached(new Set(unlocked));
          localPhase = 'pause';
          phaseStart = now;
        }
      } else if (localPhase === 'pause') {
        setLegT(1);
        setActiveCity(DESTINATIONS[localLeg]);
        if (elapsed >= PAUSE_MS) {
          localPhase = 'back';
          phaseStart = now;
        }
      } else if (localPhase === 'back') {
        setPhase('back');
        const t = Math.min(1, elapsed / BACK_MS);
        const eased = 1 - Math.pow(1 - t, 2);
        setLegT(1 - eased);
        setActiveCity('lima');
        if (t >= 1) {
          localLeg = (localLeg + 1) % DESTINATIONS.length;
          setLegIndex(localLeg);
          localPhase = 'out';
          phaseStart = now;
        }
      }

      setBenefitProgress(
        Math.min(1, (unlocked.size - 1) / DESTINATIONS.length),
      );
      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  const flying =
    phase === 'out'
      ? curvePoint(LIMA, dest, legT)
      : phase === 'back'
        ? curvePoint(LIMA, dest, legT)
        : { x: LIMA.x, y: LIMA.y };

  const planeAngle =
    phase === 'out'
      ? curveAngle(LIMA, dest, legT)
      : phase === 'back'
        ? curveAngle(dest, LIMA, 1 - legT)
        : -15;

  const limaShakeX = phase === 'pulse' ? Math.sin(limaBuzz) * 2.4 : 0;
  const limaShakeY = phase === 'pulse' ? Math.cos(limaBuzz * 1.2) * 1.8 : 0;
  const currentPath = spokePath(dest);

  return (
    <section
      id="cobertura-envios"
      ref={ref}
      className="relative scroll-mt-24 overflow-hidden bg-[#f4f6f9]"
    >
      <div className="relative mx-auto w-full max-w-[1600px] px-4 py-10 sm:px-6 lg:px-10 lg:py-12 xl:px-12">
        <div className="mb-7 sm:mb-8">
          <div className="flex items-center gap-3">
            <span className="hidden h-9 w-1.5 bg-[#F5C400] sm:block" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
                Entrega a tiempo
              </p>
              <h3 className="text-lg font-black uppercase tracking-[0.04em] text-[#0b2d60] sm:text-xl">
                Cobertura nacional de envíos
              </h3>
              <p className="mt-1 max-w-2xl text-xs text-slate-500 sm:text-sm">
                Desde nuestro hub en Lima despachamos a todo el Perú. Selecciona
                una ciudad en el mapa y cotiza tu envío de EPP.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-full max-w-[1100px] flex-col items-stretch gap-5 lg:flex-row lg:gap-5">
          <div className="w-full min-w-0 flex-1 lg:max-w-[520px]">
            <div className="relative overflow-hidden border border-[#0b2d60]/15 bg-[#0b2d60] shadow-[0_16px_40px_rgba(11,45,96,0.12)]">
              <div className="pointer-events-none absolute left-3 top-3 z-10">
                <div className="border border-white/15 bg-[#071f45]/95 px-3 py-2">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#F5C400]">
                    {phase === 'pulse'
                      ? 'Hub'
                      : phase === 'out'
                        ? 'En camino'
                        : 'Regreso a Lima'}
                  </p>
                  <p className="text-sm font-bold text-white">
                    {hoverDept
                      ? titleCase(hoverDept)
                      : phase === 'pulse'
                        ? 'Lima — despegando…'
                        : phase === 'out'
                          ? `Lima → ${cityLabel(destId)}`
                          : `${cityLabel(destId)} → Lima`}
                  </p>
                </div>
              </div>

              <div className="relative mx-auto aspect-[520/780] w-full">
                <svg
                  viewBox={`0 0 ${VB_W} ${VB_H}`}
                  className="absolute inset-0 h-full w-full"
                  role="img"
                  aria-label="Mapa del Perú — despachos desde Lima"
                >
                  <defs>
                    <linearGradient
                      id={`dept-fill-${uid}`}
                      x1="0"
                      y1="0"
                      x2="1"
                      y2="1"
                    >
                      <stop stopColor="#1a4a8a" />
                      <stop offset="1" stopColor="#0e3568" />
                    </linearGradient>
                    <filter id={`glow-${uid}`}>
                      <feGaussianBlur stdDeviation="2" result="b" />
                      <feMerge>
                        <feMergeNode in="b" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {mapData.paths.map((dept) => {
                    const active = hoverDept === dept.name;
                    return (
                      <path
                        key={dept.name}
                        d={dept.d}
                        fill={active ? '#F5C400' : `url(#dept-fill-${uid})`}
                        fillOpacity={active ? 0.95 : 0.92}
                        stroke={active ? '#fff' : '#7eb0e8'}
                        strokeWidth={active ? 1.8 : 0.85}
                        strokeLinejoin="round"
                        className="cursor-pointer"
                        onMouseEnter={() => setHoverDept(dept.name)}
                        onMouseLeave={() => setHoverDept(null)}
                      >
                        <title>{titleCase(dept.name)}</title>
                      </path>
                    );
                  })}

                  {(phase === 'out' || phase === 'back') && (
                    <>
                      <path
                        d={currentPath}
                        fill="none"
                        stroke="#ffffff"
                        strokeOpacity="0.2"
                        strokeWidth="2"
                        strokeDasharray="5 7"
                      />
                      <path
                        d={currentPath}
                        fill="none"
                        stroke="#F5C400"
                        strokeWidth="3"
                        strokeLinecap="round"
                        pathLength={1}
                        strokeDasharray={1}
                        strokeDashoffset={
                          phase === 'out' ? 1 - legT : legT
                        }
                        filter={`url(#glow-${uid})`}
                      />
                    </>
                  )}

                  {cityMeta.map((city) => {
                    const { x, y } = mapData.cityXY[city.id];
                    const isLima = city.id === 'lima';
                    const isReached = reached.has(city.id);
                    const isTarget = city.id === destId && phase !== 'pulse';
                    const isActive = activeCity === city.id;
                    const tx = isLima ? x + limaShakeX : x;
                    const ty = isLima ? y + limaShakeY : y;

                    return (
                      <g
                        key={city.id}
                        transform={`translate(${tx} ${ty})`}
                        className="cursor-pointer"
                        onClick={() => flyToCity(city.id)}
                      >
                        {(isLima || isTarget) && (
                          <circle
                            r={isLima ? 16 : 12}
                            fill="#F5C400"
                            fillOpacity={
                              isLima && phase === 'pulse' ? 0.35 : 0.22
                            }
                            className={isLima ? 'animate-pulse' : undefined}
                          />
                        )}
                        {isLima && phase === 'pulse' && (
                          <circle
                            r={20 + Math.sin(limaBuzz) * 3}
                            fill="none"
                            stroke="#F5C400"
                            strokeWidth="2"
                            strokeOpacity="0.75"
                          />
                        )}
                        <circle
                          r={isLima ? 7.5 : isReached || isTarget ? 5.5 : 4}
                          fill={
                            isLima || isReached || isActive || isTarget
                              ? '#F5C400'
                              : '#fff'
                          }
                          stroke="#0b2d60"
                          strokeWidth="2"
                        />
                        <text
                          x="10"
                          y="4"
                          fill={
                            isLima || isActive || isTarget
                              ? '#F5C400'
                              : isReached
                                ? '#fff'
                                : '#ffffff88'
                          }
                          fontSize={isLima ? '12' : '10'}
                          fontWeight="700"
                          className="pointer-events-none select-none"
                          style={{ textShadow: '0 1px 3px rgba(0,0,0,.55)' }}
                        >
                          {city.label}
                        </text>
                      </g>
                    );
                  })}
                </svg>

                <div
                  className="pointer-events-none absolute left-0 top-0 h-full w-full"
                  aria-hidden
                >
                  <div
                    className="absolute"
                    style={{
                      left: `${(flying.x / VB_W) * 100}%`,
                      top: `${(flying.y / VB_H) * 100}%`,
                      transform: `translate(-50%, -50%) rotate(${planeAngle}deg)`,
                    }}
                  >
                    <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F5C400] text-[#0b2d60] shadow-[0_10px_28px_rgba(0,0,0,0.45)] ring-[3px] ring-white sm:h-12 sm:w-12">
                      <PlaneMark className="h-6 w-6 sm:h-7 sm:w-7" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {cityMeta.map((city) => {
                const active = activeCity === city.id;
                const lit = reached.has(city.id);
                const quoted = quoteCity === city.id;
                return (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => flyToCity(city.id)}
                    className={`px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide transition-colors ${
                      active || quoted
                        ? 'bg-[#F5C400] text-[#0b2d60]'
                        : lit
                          ? 'bg-[#0b2d60] text-white'
                          : 'border border-slate-200 bg-[#f8fafc] text-slate-500 hover:border-[#0b2d60]/30'
                    }`}
                  >
                    {city.label}
                  </button>
                );
              })}
            </div>
          </div>

          <aside className="flex w-full flex-col border border-[#0b2d60]/15 bg-[#0b2d60] shadow-[0_16px_40px_rgba(11,45,96,0.12)] lg:w-[440px] lg:shrink-0">
            <div className="border-b border-white/10 px-6 py-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
                Por qué Zeus
              </p>
              <h4 className="mt-1 text-lg font-black tracking-tight text-white sm:text-xl">
                Despacho con respaldo
              </h4>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                Stock en Lima y envíos a todo el país con seguimiento y
                asesoría por industria.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <div className="h-1.5 overflow-hidden bg-white/10">
                    <div
                      className="h-full bg-[#F5C400] transition-[width] duration-500"
                      style={{ width: `${Math.round(benefitProgress * 100)}%` }}
                    />
                  </div>
                </div>
                <p className="shrink-0 text-[11px] font-bold text-white/80">
                  {reached.size - 1}/{DESTINATIONS.length} rutas
                </p>
              </div>
            </div>

            <div className="border-b border-white/10 bg-[#071f45] px-6 py-4">
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#F5C400]">
                Ruta activa
              </p>
              <p className="mt-1 text-sm font-bold text-white sm:text-base">
                {phase === 'pulse'
                  ? 'Lima — hub nacional'
                  : phase === 'out'
                    ? `Lima → ${cityLabel(destId)}`
                    : `${cityLabel(destId)} → Lima`}
              </p>
              <p className="mt-1 text-xs text-white/55 sm:text-[13px]">
                {cityNotes[activeCity] ??
                  cityNotes[destId] ??
                  'Cobertura nacional desde Lima.'}
              </p>
            </div>

            <div className="flex flex-1 flex-col gap-3 px-5 py-5 sm:px-6">
              {benefits.map((item, index) => {
                const unlocked = benefitProgress >= (index + 0.35) / 4;
                return (
                  <BenefitCard
                    key={item.title}
                    item={item}
                    unlocked={unlocked}
                  />
                );
              })}
            </div>

            <div className="mt-auto border-t border-white/10 bg-[#071f45] px-5 py-5 sm:px-6">
              <p className="text-sm font-black text-white sm:text-base">
                ¿A qué ciudad envías?
              </p>
              <p className="mt-1 text-xs text-white/55 sm:text-[13px]">
                {quoteCity === 'lima'
                  ? 'Elige una ciudad en el mapa o cotiza desde Lima.'
                  : `Ciudad seleccionada: ${cityLabel(quoteCity)}`}
              </p>
              <button
                type="button"
                onClick={openQuoteWhatsApp}
                className="mt-4 inline-flex h-12 w-full items-center justify-center gap-2 bg-[#25D366] px-4 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#1ebe57]"
              >
                <WhatsAppIcon className="h-4 w-4" />
                Cotizar envío
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

function BenefitCard({
  item,
  unlocked,
}: {
  item: (typeof benefits)[number];
  unlocked: boolean;
}) {
  return (
    <article
      className={`flex items-center gap-4 border px-4 py-4 transition-all duration-300 sm:gap-4 sm:px-5 sm:py-4 ${
        unlocked
          ? 'border-[#F5C400] bg-white opacity-100 shadow-[0_6px_18px_rgba(0,0,0,0.18)]'
          : 'border-white/15 bg-white/[0.07] opacity-80'
      }`}
    >
      <div
        className={`flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full p-2 ring-2 sm:h-16 sm:w-16 ${
          unlocked
            ? 'bg-[#f8fafc] ring-[#F5C400]'
            : 'bg-white/10 ring-white/25'
        }`}
      >
        <Image
          src={item.image}
          alt=""
          width={64}
          height={64}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="min-w-0 flex-1 pr-1">
        <h4
          className={`text-xs font-black uppercase leading-snug tracking-wide sm:text-sm ${
            unlocked ? 'text-[#0b2d60]' : 'text-white/85'
          }`}
        >
          {item.title}
        </h4>
        <p
          className={`mt-1 text-xs leading-relaxed sm:text-[13px] ${
            unlocked ? 'text-slate-500' : 'text-white/50'
          }`}
        >
          {item.description}
        </p>
      </div>
    </article>
  );
}
