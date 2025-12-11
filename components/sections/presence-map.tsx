'use client';

import { SectionHeading } from '@/components/ui/section-heading';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type RegionData = { REGION: string; TOTAL: number };

const apiURL =
  'https://crudventas-2946605267.us-central1.run.app?area=VENTAS_REGIONES';

const fallbackData: RegionData[] = [
  { REGION: 'LIMA', TOTAL: 4778414.63 },
  { REGION: 'ICA', TOTAL: 41675.0 },
  { REGION: 'AREQUIPA', TOTAL: 280000.0 },
  { REGION: 'CUSCO', TOTAL: 190000.0 },
  { REGION: 'PIURA', TOTAL: 230000.0 },
  { REGION: 'LA LIBERTAD', TOTAL: 310000.0 },
];

// Coordenadas relativas (en %) extraídas del SVG oficial pe.svg (viewBox 0 0 1000 1000)
const regionPositions: Record<string, { x: number; y: number }> = {
  TUMBES: { x: 22.68, y: 23.16 },
  PIURA: { x: 23.87, y: 29.27 },
  LAMBAYEQUE: { x: 26.24, y: 35.19 },
  AMAZONAS: { x: 34.55, y: 29.77 },
  CAJAMARCA: { x: 32.45, y: 38.13 },
  LA_LIBERTAD: { x: 32.75, y: 44.14 },
  ANCASH: { x: 37.01, y: 50.33 },
  LIMA: { x: 40.85, y: 63.91 }, // Lima (región)
  CALLAO: { x: 39.65, y: 63.64 },
  LIMA_PROVINCE: { x: 44.61, y: 65.98 }, // Lima Province
  PASCO: { x: 48.63, y: 55.01 },
  HUANUCO: { x: 43.8, y: 51.35 },
  UCAYALI: { x: 59.64, y: 54.43 },
  JUNIN: { x: 50.36, y: 60.32 },
  SAN_MARTIN: { x: 41, y: 39.4 },
  LORETO: { x: 50.98, y: 23.5 },
  HUANCAVELICA: { x: 50.25, y: 67.67 },
  AYACUCHO: { x: 53.96, y: 75.5 },
  APURIMAC: { x: 59.9, y: 73.57 },
  CUSCO: { x: 60.29, y: 66.01 },
  ICA: { x: 47.29, y: 75.18 },
  AREQUIPA: { x: 63.16, y: 82.64 },
  MOQUEGUA: { x: 69.97, y: 88.06 },
  TACNA: { x: 72.69, y: 92.11 },
  MADRE_DE_DIOS: { x: 71.57, y: 63.62 },
  PUNO: { x: 73.61, y: 78.97 },
};

function intensityColor(value: number) {
  const start = [199, 226, 255]; // light blue
  const end = [16, 58, 123]; // deep blue
  const clamp = Math.min(Math.max(value, 0), 1);
  const channel = start.map((s, i) =>
    Math.round(s + (end[i] - s) * clamp),
  );
  return `rgb(${channel[0]}, ${channel[1]}, ${channel[2]})`;
}

export function PresenceMapSection() {
  const [data, setData] = useState<RegionData[]>(fallbackData);

  useEffect(() => {
    let cancelled = false;
    fetch(apiURL)
      .then((res) => res.json())
      .then((incoming: RegionData[]) => {
        if (cancelled || !Array.isArray(incoming) || incoming.length === 0) {
          return;
        }
        setData(incoming);
      })
      .catch(() => {
        // no-op, mantenemos fallback
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const max = useMemo(
    () => Math.max(...data.map((d) => d.TOTAL)),
    [data],
  );

  const normalized = data
    .map((item) => {
      const regionName = item?.REGION ?? '';
      const normalizedKey = regionName.replace(/\s+/g, '_').toUpperCase();
      return {
        ...item,
        normalizedKey,
        intensity: max ? item.TOTAL / max : 0,
      };
    })
    .filter((item) => regionPositions[item.normalizedKey]);

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeading
            title="Nuestra presencia a nivel nacional"
            subtitle="Visualizamos la intensidad de operaciones por región"
          />
          <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
            <p className="font-semibold text-[#103a7b]">Mapa dinámico</p>
            <p>Gradiente según peso relativo de ventas, sin mostrar números.</p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-[#e7f2ff] via-white to-[#f4f7fb] p-6 shadow-inner">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,181,226,0.15),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(16,58,123,0.12),transparent_40%)]" />
            <div className="relative h-[420px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-white/80 backdrop-blur">
              <Image
                src="/pe.svg"
                alt="Mapa del Perú"
                fill
                className="object-contain p-6 opacity-95"
                priority
              />
              <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #dbeafe 0%, #f8fafc 55%, transparent 70%)' }} />
              <div className="relative h-full w-full">
                {normalized.map((item) => {
                  const pos = regionPositions[item.normalizedKey];
                  const size = 26 + item.intensity * 36;
                  const color = intensityColor(item.intensity);
                  return (
                    <motion.div
                      key={item.REGION}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4 }}
                      className="absolute"
                      style={{
                        left: `${pos.x}%`,
                        top: `${pos.y}%`,
                        width: size,
                        height: size,
                        marginLeft: -size / 2,
                        marginTop: -size / 2,
                        borderRadius: '999px',
                        background: `radial-gradient(circle, ${color} 0%, ${color} 45%, rgba(16,58,123,0.0) 75%)`,
                        boxShadow: `0 0 0 6px rgba(16,58,123,0.06), 0 10px 25px rgba(12,20,39,0.2)`,
                      }}
                    >
                      <div className="absolute inset-0 rounded-full bg-white/10 backdrop-blur-sm" />
                      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-[10px] font-semibold uppercase tracking-wide text-white drop-shadow">
                        {item.REGION}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#0b2d60]">
              Intensidad
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs uppercase tracking-wide text-slate-500">
                Alto
              </span>
              <div className="h-2 flex-1 rounded-full bg-gradient-to-r from-[#e7f2ff] via-[#5aa0e8] to-[#103a7b]" />
              <span className="text-xs uppercase tracking-wide text-slate-500">
                Bajo
              </span>
            </div>
            <div className="grid gap-2 text-sm text-slate-700">
              {normalized.map((item) => (
                <div
                  key={item.REGION}
                  className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2"
                >
                  <span className="font-semibold text-[#103a7b]">
                    {item.REGION}
                  </span>
                  <span
                    className="h-2 w-14 rounded-full"
                    style={{
                      backgroundColor: intensityColor(item.intensity),
                      boxShadow: '0 0 0 4px rgba(16,58,123,0.06)',
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

