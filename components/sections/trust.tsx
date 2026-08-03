'use client';

import { SectionHeading } from '@/components/ui/section-heading';
import { motion } from 'framer-motion';
import { Award, Shield, CheckCircle2, FileCheck } from 'lucide-react';

const certifications = [
  { name: 'ANSI', icon: Shield },
  { name: 'ISO 9001', icon: Award },
  { name: 'OSHA', icon: CheckCircle2 },
  { name: 'EN 388', icon: FileCheck },
];

const brands = ['3M', 'CAT', 'Zeus', 'MSA', 'UVEX'];

export function TrustSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-[1600px] px-6 py-14 lg:px-10 lg:py-16 xl:px-12">
        <SectionHeading
          title="Certificaciones y marcas que nos respaldan"
          subtitle="Trabajamos solo con fabricantes y estándares internacionales."
        />

        <div className="mt-10">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0b2d60]">
            Certificaciones
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {certifications.map((cert, index) => {
              const Icon = cert.icon;
              return (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: index * 0.05 }}
                  className="flex items-center gap-3 border border-slate-200 bg-white px-4 py-3"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#0b2d60] text-[#F5C400]">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="text-sm font-bold text-[#0c1427]">
                    {cert.name}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-10">
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0b2d60]">
            Marcas
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
            {brands.map((brand, index) => (
              <motion.div
                key={brand}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.15 + index * 0.05 }}
                className="flex h-14 items-center justify-center border border-slate-200 bg-white"
              >
                <span className="text-sm font-black uppercase tracking-wider text-[#0b2d60]">
                  {brand}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
