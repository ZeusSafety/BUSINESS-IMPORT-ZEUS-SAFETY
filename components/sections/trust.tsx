'use client';

import { useState } from 'react';
import { SectionHeading } from '@/components/ui/section-heading';
import { motion } from 'framer-motion';
import { Award, Shield, CheckCircle2, FileCheck } from 'lucide-react';

const allCertifications = [
  { name: 'ANSI', icon: Shield },
  { name: 'ISO 9001', icon: Award },
  { name: 'OSHA', icon: CheckCircle2 },
  { name: 'EN 388', icon: FileCheck },
];

const brandCertifications: Record<string, typeof allCertifications> = {
  '3M': [
    { name: 'ANSI', icon: Shield },
    { name: 'ISO 9001', icon: Award },
    { name: 'OSHA', icon: CheckCircle2 },
    { name: 'EN 388', icon: FileCheck },
  ],
  'CAT': [
    { name: 'ANSI', icon: Shield },
    { name: 'ISO 9001', icon: Award },
    { name: 'OSHA', icon: CheckCircle2 },
  ],
  'Zeus': [
    { name: 'ISO 9001', icon: Award },
    { name: 'OSHA', icon: CheckCircle2 },
    { name: 'EN 388', icon: FileCheck },
  ],
  'MSA': [
    { name: 'ANSI', icon: Shield },
    { name: 'ISO 9001', icon: Award },
    { name: 'OSHA', icon: CheckCircle2 },
    { name: 'EN 388', icon: FileCheck },
  ],
  'UVEX': [
    { name: 'ANSI', icon: Shield },
    { name: 'ISO 9001', icon: Award },
    { name: 'EN 388', icon: FileCheck },
  ],
};

const brands = ['3M', 'CAT', 'Zeus', 'MSA', 'UVEX'];

export function TrustSection() {
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

  const certifications = selectedBrand 
    ? brandCertifications[selectedBrand] || allCertifications
    : allCertifications;
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Efectos de fondo sutiles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(0,181,226,0.02),transparent_50%)]" />
      
      <div className="relative mx-auto max-w-7xl px-2 py-8 sm:py-12 sm:px-3 lg:px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <SectionHeading
            title="Certificaciones y marcas que nos respaldan"
            subtitle="Trabajamos solo con fabricantes y estándares internacionales"
            align="center"
          />
        </motion.div>

        <div className="mt-6 sm:mt-10 grid gap-3 sm:gap-5 lg:grid-cols-5">
          {/* Certificaciones */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="group relative overflow-hidden rounded-lg sm:rounded-xl border border-[#00b5e2]/20 bg-gradient-to-br from-[#e7f8ff] to-white p-3 sm:p-5 shadow-md"
          >
            <div className="relative">
              <div className="mb-3 sm:mb-4 flex items-center gap-2 sm:gap-2.5">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-gradient-to-br from-[#00b5e2] to-[#103a7b] shadow-md">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
                </div>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] text-[#0b2d60]">
                  Certificaciones
                </p>
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                {certifications.map((cert, index) => {
                  const Icon = cert.icon;
                  return (
                    <motion.div
                      key={cert.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                      className="group/item flex items-center gap-2 sm:gap-2.5 rounded-lg bg-white px-2.5 py-1.5 sm:px-3 sm:py-2 border border-slate-200 transition-all hover:border-[#00b5e2]/30 hover:shadow-sm"
                    >
                      <div className="flex h-5 w-5 sm:h-6 sm:w-6 shrink-0 items-center justify-center rounded-md bg-gradient-to-br from-[#00b5e2]/10 to-[#103a7b]/10">
                        <Icon className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-[#0b2d60]" />
                      </div>
                      <span className="text-[10px] sm:text-xs font-bold text-slate-800">{cert.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Marcas */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4"
          >
            <div className="grid grid-cols-2 gap-2 sm:gap-3 rounded-lg sm:rounded-xl border border-slate-200 bg-white p-3 sm:p-5 shadow-md sm:grid-cols-3 md:grid-cols-5">
              {brands.map((brand, index) => (
                <motion.button
                  key={brand}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  onClick={() => setSelectedBrand(selectedBrand === brand ? null : brand)}
                  className={`group relative flex h-12 sm:h-16 items-center justify-center overflow-hidden rounded-lg border transition-all cursor-pointer ${
                    selectedBrand === brand
                      ? 'bg-[#103a7b] border-[#103a7b] shadow-md'
                      : 'bg-slate-50 border-slate-200 hover:border-[#103a7b]/30 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <span className={`text-xs sm:text-sm font-black uppercase tracking-wider transition-colors ${
                    selectedBrand === brand
                      ? 'text-white'
                      : 'text-[#103a7b] group-hover:text-[#0b2d60]'
                  }`}>
                    {brand}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

