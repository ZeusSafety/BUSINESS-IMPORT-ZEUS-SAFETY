'use client';

import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const benefits = [
  {
    image: '/segurida-removebg-preview.png',
    title: 'Garantía de calidad',
    description:
      'Productos certificados que destacan por su confiabilidad y excelencia.',
  },
  {
    image: '/envios-nacionales-removebg-preview.png',
    title: 'Envíos nacionales',
    description:
      'Despachamos a todo el Perú con la flexibilidad de tu agencia preferida.',
  },
  {
    image: '/monitoreo-removebg-preview.png',
    title: 'Asesoría personalizada',
    description:
      'Acompañamiento de nuestro equipo experto según tu industria.',
  },
  {
    image: '/descuentos-removebg-preview.png',
    title: 'Precios mayoristas',
    description:
      'Condiciones preferenciales para compras por volumen y contratos.',
  },
];

export function HomePeruCoverage() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [progress, setProgress] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const start = performance.now();
    const duration = 1400;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(eased * 100);
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setReady(true);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView]);

  return (
    <section ref={ref} className="bg-white">
      <div className="mx-auto max-w-[1600px] px-6 py-14 lg:px-10 lg:py-16 xl:px-12">
        <div className="mb-10 text-center">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.28em] text-[#F5C400]">
            Zeus Safety
          </p>
          <h3 className="text-2xl font-black tracking-tight text-[#0b2d60] sm:text-3xl">
            Llegamos a todo el Perú
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500 sm:text-base">
            Cobertura nacional con stock, asesoría y condiciones pensadas para
            operaciones industriales.
          </p>

          <div className="mx-auto mt-6 h-1.5 w-full max-w-md overflow-hidden bg-slate-100">
            <div
              className="h-full bg-[#F5C400] transition-[width] duration-75"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {ready ? 'Listo' : `Cargando… ${Math.round(progress)}%`}
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute left-[8%] right-[14%] top-12 hidden h-0.5 bg-slate-200 lg:block" />
          <div
            className="absolute left-[8%] top-12 hidden h-0.5 bg-[#F5C400] transition-[width] duration-75 lg:block"
            style={{
              width: `${Math.max(0, (progress / 100) * 78)}%`,
            }}
          />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {benefits.map((item, index) => {
              const unlocked =
                progress >= ((index + 1) / benefits.length) * 100 || ready;

              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 24, scale: 0.96 }}
                  animate={
                    unlocked
                      ? { opacity: 1, y: 0, scale: 1 }
                      : { opacity: 0.35, y: 12, scale: 0.96 }
                  }
                  transition={{
                    duration: 0.45,
                    delay: unlocked ? index * 0.08 : 0,
                  }}
                  className="group relative z-10 text-center"
                >
                  <div className="relative mx-auto mb-5 w-fit">
                    <div className="flex h-[5.5rem] w-[5.5rem] items-center justify-center overflow-hidden rounded-full bg-white p-3 shadow-[0_10px_28px_rgba(11,45,96,0.14)] ring-2 ring-[#F5C400] transition-transform duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_14px_32px_rgba(11,45,96,0.2)] sm:h-24 sm:w-24">
                      <Image
                        src={item.image}
                        alt={item.title}
                        width={80}
                        height={80}
                        className={`h-full w-full object-contain ${
                          index === benefits.length - 1
                            ? '-translate-x-0.5'
                            : ''
                        }`}
                      />
                    </div>
                    <span className="absolute -bottom-2 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-[#0b2d60] text-xs font-black text-[#F5C400] shadow-md ring-2 ring-white">
                      {index + 1}
                    </span>
                  </div>

                  <h4 className="mt-4 text-sm font-black uppercase tracking-wide text-[#0b2d60] transition-colors group-hover:text-[#103a7b]">
                    {item.title}
                  </h4>
                  <p className="mx-auto mt-2 max-w-[200px] text-xs leading-relaxed text-slate-500 sm:text-[13px]">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
