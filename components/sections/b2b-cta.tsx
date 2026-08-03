'use client';

import { Button } from '@/components/ui/button';
import { Building2, Percent, Truck, ArrowRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const perks = [
  {
    title: 'Descuentos por volumen',
    icon: Percent,
    description:
      'Estructuras especiales para contratos marco y compras recurrentes.',
  },
  {
    title: 'Logística asegurada',
    icon: Truck,
    description:
      'Envíos nacionales y control de stock dedicado para proyectos grandes.',
  },
  {
    title: 'Asesor EHS asignado',
    icon: Building2,
    description:
      'Especialistas por sector para kits y matrices de riesgo a medida.',
  },
];

export function B2BCtaSection() {
  return (
    <section className="relative overflow-hidden bg-[#0b2d60] text-white">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(245,196,0,0.08)_0%,transparent_45%)]" />

      <div className="relative mx-auto max-w-[1600px] px-6 py-16 lg:px-10 lg:py-20 xl:px-12">
        <div className="max-w-3xl text-left sm:text-center sm:mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="space-y-5"
          >
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#F5C400]">
              Zeus Safety
            </p>
            <h2 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
              ¿Compras por{' '}
              <span className="text-[#F5C400]">volumen?</span>
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">
              Activa tu cotización corporativa y asegura stock continuo con
              condiciones preferenciales y soporte dedicado.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 pt-2 sm:flex-row">
              <Button
                size="lg"
                asChild
                className="h-12 rounded-none bg-[#F5C400] px-7 text-sm font-bold uppercase tracking-wide text-[#0b2d60] hover:bg-[#ffd233]"
              >
                <Link href="/cotizacion" className="inline-flex items-center gap-2">
                  Solicitar cotización
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <div className="inline-flex items-center gap-2 text-sm text-white/80">
                <Clock className="h-4 w-4 text-[#F5C400]" />
                Respuesta en menos de 24 horas
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="border border-white/15 bg-white/5 p-6 backdrop-blur-sm"
              >
                <span className="mb-4 inline-flex h-11 w-11 items-center justify-center bg-[#F5C400] text-[#0b2d60]">
                  <Icon className="h-5 w-5" strokeWidth={2} />
                </span>
                <h3 className="mb-2 text-lg font-bold text-white">
                  {perk.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/65">
                  {perk.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
