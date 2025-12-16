'use client';

import { categories } from '@/lib/mockData';
import { SectionHeading } from '@/components/ui/section-heading';
import type { ElementType } from 'react';
import { motion } from 'framer-motion';
import {
  Hand,
  Glasses,
  Wind,
  HardHat,
  Ear,
  Footprints,
  MapPin,
  Package,
  Sparkles,
} from 'lucide-react';

const iconsMap: Record<string, ElementType> = {
  'Protección Manual': Hand,
  'Protección Visual': Glasses,
  'Protección Respiratoria': Wind,
  'Protección de Cabeza': HardHat,
  'Protección Auditiva': Ear,
  'Calzado de Seguridad': Footprints,
};

const features = [
  { icon: MapPin, text: 'Cobertura nacional' },
  { icon: Package, text: 'Stock inmediato' },
  { icon: Sparkles, text: 'Personalización con branding' },
];

export function CategoriesSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/30 to-white">
      {/* Efectos de fondo sutiles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(0,181,226,0.03),transparent_50%)]" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="flex-1">
            <SectionHeading
              title="Categorías críticas de protección"
              subtitle="Selecciona el frente de riesgo y explora los EPP más robustos"
            />
          </div>
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-md text-sm leading-relaxed text-slate-600 lg:text-base"
          >
            Integramos productos certificados para cada especialidad, listos para ser cotizados por volumen.
          </motion.p>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, index) => {
            const Icon = iconsMap[cat] ?? Hand;
            return (
              <motion.div
                key={cat}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-gradient-to-br from-white via-white to-slate-50/50 p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-[#00b5e2]/10"
              >
                {/* Efectos de fondo animados */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#00b5e2]/0 via-[#00b5e2]/0 to-[#103a7b]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,181,226,0.08),transparent_50%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <div className="relative">
                  {/* Header con icono y título */}
                  <div className="mb-5 flex items-start gap-4">
                    <div className="relative">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#103a7b] via-[#0b2d60] to-[#103a7b] shadow-lg shadow-[#103a7b]/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                        <Icon className="h-7 w-7 text-[#00d2ff]" />
                      </div>
                      <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-[#00b5e2] to-[#103a7b] opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-30" />
                    </div>
                    <div className="flex-1 pt-1">
                      <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-[#00b5e2]">
                        Línea EPP
                      </p>
                      <h3 className="text-lg font-black leading-tight text-slate-900 transition-colors group-hover:text-[#0b2d60]">
                        {cat}
                      </h3>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2.5 border-t border-slate-100 pt-4">
                    {features.map((feature, idx) => {
                      const FeatureIcon = feature.icon;
                      return (
                        <div
                          key={idx}
                          className="flex items-center gap-2.5 text-xs text-slate-600"
                        >
                          <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-slate-100 to-slate-50">
                            <FeatureIcon className="h-3 w-3 text-slate-500" />
                          </div>
                          <span className="font-medium">{feature.text}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

