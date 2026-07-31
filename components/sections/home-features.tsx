'use client';

import { motion } from 'framer-motion';
import { ClipboardCheck, Headphones, PackageCheck } from 'lucide-react';

const features = [
  {
    number: '01',
    title: 'Stock inmediato',
    description:
      'Inventario listo para proyectos de gran escala y reposiciones urgentes.',
    icon: PackageCheck,
  },
  {
    number: '02',
    title: 'Asesoría técnica',
    description:
      'Especialistas por industria para armar kits y matrices de riesgo.',
    icon: Headphones,
  },
  {
    number: '03',
    title: 'EPP certificado',
    description:
      'Productos con normas internacionales y trazabilidad por lote.',
    icon: ClipboardCheck,
  },
];

export function HomeFeatures() {
  return (
    <section className="relative z-20 bg-white pb-4 pt-2">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-3 sm:gap-0">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.08 }}
                className="group relative overflow-hidden border border-slate-100 bg-white shadow-[0_12px_40px_rgba(11,45,96,0.08)] sm:border-y sm:border-r sm:border-l-0 sm:first:border-l"
              >
                <div className="bg-[#0b2d60] px-6 py-7 transition-colors group-hover:bg-[#103a7b]">
                  <div className="mb-4 flex items-start justify-between">
                    <span className="flex h-12 w-12 items-center justify-center bg-[#F5C400] text-[#0b2d60]">
                      <Icon className="h-6 w-6" strokeWidth={2} />
                    </span>
                    <span className="text-4xl font-black leading-none text-white/15">
                      {item.number}
                    </span>
                  </div>
                </div>
                <div className="px-6 py-5">
                  <h3 className="mb-2 text-lg font-bold text-[#0c1427]">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-500">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
