'use client';

import { categories } from '@/lib/mockData';
import { SectionHeading } from '@/components/ui/section-heading';
import type { ElementType } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Hand,
  Glasses,
  Wind,
  HardHat,
  Ear,
  Footprints,
  ArrowRight,
} from 'lucide-react';

const iconsMap: Record<string, ElementType> = {
  'Protección Manual': Hand,
  'Protección Visual': Glasses,
  'Protección Respiratoria': Wind,
  'Protección de Cabeza': HardHat,
  'Protección Auditiva': Ear,
  'Calzado de Seguridad': Footprints,
};

const blurbs: Record<string, string> = {
  'Protección Manual': 'Guantes para corte, químicos y impacto.',
  'Protección Visual': 'Lentes y caretas para soldadura y polvo.',
  'Protección Respiratoria': 'Mascarillas y respiradores filtrantes.',
  'Protección de Cabeza': 'Cascos y accesorios para obra y mina.',
  'Protección Auditiva': 'Tapones y orejeras de alto atenuamiento.',
  'Calzado de Seguridad': 'Botas dieléctricas y antipunzantes.',
};

export function CategoriesSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1600px] px-6 py-16 lg:px-10 lg:py-20 xl:px-12">
        <SectionHeading
          title="Categorías críticas de protección"
          subtitle="Selecciona el frente de riesgo y explora los EPP más robustos para tu operación."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, index) => {
            const Icon = iconsMap[cat] ?? Hand;
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
              >
                <Link
                  href={`/productos?categoria=${encodeURIComponent(cat)}`}
                  className="group flex h-full flex-col border border-slate-200 bg-white p-6 transition-all hover:border-[#0b2d60] hover:shadow-[0_12px_32px_rgba(11,45,96,0.12)]"
                >
                  <div className="mb-5 flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-[#0b2d60] text-[#F5C400] transition-colors group-hover:bg-[#F5C400] group-hover:text-[#0b2d60]">
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </span>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#F5C400]">
                        Línea EPP
                      </p>
                      <h3 className="text-lg font-bold text-[#0c1427]">
                        {cat}
                      </h3>
                    </div>
                  </div>

                  <p className="mb-5 flex-1 text-sm leading-relaxed text-slate-500">
                    {blurbs[cat] ??
                      'Productos certificados listos para cotizar por volumen.'}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-colors group-hover:text-[#F5C400]">
                    Ver productos
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
