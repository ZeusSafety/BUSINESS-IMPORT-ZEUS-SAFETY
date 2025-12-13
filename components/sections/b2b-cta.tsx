'use client';

import { Button } from '@/components/ui/button';
import { Building2, Percent, Truck, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const perks = [
  {
    title: 'Descuentos por volumen',
    icon: Percent,
    description: 'Estructuras especiales para contratos marco y compras recurrentes con condiciones preferenciales.',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    title: 'Logística asegurada',
    icon: Truck,
    description: 'Envíos nacionales garantizados y control de stock dedicado para proyectos de gran escala.',
    color: 'from-[#00b5e2] to-[#00d2ff]',
  },
  {
    title: 'Asesor EHS asignado',
    icon: Building2,
    description: 'Especialistas por sector para definir kits personalizados y matrices de riesgo específicas.',
    color: 'from-amber-500 to-amber-600',
  },
];

export function B2BCtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0b2d60] via-[#103a7b] to-[#0a1528] text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,181,226,0.15),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(16,58,123,0.12),transparent_40%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,181,226,0.08)_0%,transparent_50%,rgba(16,58,123,0.12)_100%)]" />
      
      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#00d2ff]">
              ZEUS SAFETY NEXT
            </p>
            <h2 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              ¿Compras por{' '}
              <span className="bg-gradient-to-r from-[#00d2ff] to-[#00b5e2] bg-clip-text text-transparent">
                volumen?
              </span>
            </h2>
            <p className="max-w-2xl text-lg text-slate-200 sm:text-xl">
              Activa tu cotización corporativa y asegura stock continuo con condiciones 
              preferenciales y soporte dedicado.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button 
                size="lg" 
                asChild 
                className="bg-white text-[#103a7b] hover:bg-slate-100 shadow-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                <Link href="/cotizacion">
                  Solicitar cotización formal
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <div className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Respuesta en menos de 24 horas</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((perk, index) => {
            const Icon = perk.icon;
            return (
              <motion.div
                key={perk.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:shadow-2xl hover:-translate-y-2"
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${perk.color} opacity-0 transition-opacity duration-300 group-hover:opacity-10`} />
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${perk.color} text-white shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon className="h-7 w-7" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="mb-3 text-xl font-bold text-white">
                    {perk.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {perk.description}
                  </p>
                  
                  {/* Decorative element */}
                  <div className="mt-4 h-1 w-12 rounded-full bg-gradient-to-r from-[#00b5e2] to-transparent opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Benefits List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
        >
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-[#00d2ff]" />
            <h3 className="text-lg font-bold text-white">Beneficios adicionales</h3>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Contratos marco personalizados',
              'Programación de entregas',
              'Reportes de consumo',
              'Soporte técnico prioritario',
            ].map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-slate-300">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

