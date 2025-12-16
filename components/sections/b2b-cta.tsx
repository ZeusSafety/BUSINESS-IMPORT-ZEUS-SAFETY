'use client';

import { Button } from '@/components/ui/button';
import { Building2, Percent, Truck, ArrowRight, Sparkles, CheckCircle2, Clock } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const perks = [
  {
    title: 'Descuentos por volumen',
    icon: Percent,
    description: 'Estructuras especiales para contratos marco y compras recurrentes con condiciones preferenciales.',
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
  },
  {
    title: 'Logística asegurada',
    icon: Truck,
    description: 'Envíos nacionales garantizados y control de stock dedicado para proyectos de gran escala.',
    color: 'from-[#00b5e2] to-[#00d2ff]',
    bgColor: 'bg-[#00b5e2]/10',
    borderColor: 'border-[#00b5e2]/20',
  },
  {
    title: 'Asesor EHS asignado',
    icon: Building2,
    description: 'Especialistas por sector para definir kits personalizados y matrices de riesgo específicas.',
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
  },
];

export function B2BCtaSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0b2d60] via-[#103a7b] to-[#0a1528] text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,181,226,0.15),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(16,58,123,0.12),transparent_40%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,181,226,0.08)_0%,transparent_50%,rgba(16,58,123,0.12)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px]" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-4xl space-y-6"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#00d2ff]">
              ZEUS SAFETY NEXT
            </p>
            <h2 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              ¿Compras por{' '}
              <span className="bg-gradient-to-r from-[#00d2ff] via-[#00b5e2] to-[#00d2ff] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                volumen?
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
              Activa tu cotización corporativa y asegura stock continuo con condiciones 
              preferenciales y soporte dedicado.
            </p>
            
            {/* CTA Button and Info */}
            <div className="flex flex-col items-center gap-6 pt-6 sm:flex-row sm:justify-center">
              <Button 
                size="lg" 
                asChild 
                className="group relative h-14 px-8 bg-gradient-to-r from-[#00d2ff] to-[#00b5e2] text-white shadow-xl shadow-[#00b5e2]/30 hover:shadow-2xl hover:shadow-[#00b5e2]/40 transition-all duration-300 hover:scale-105 border-0 font-semibold text-base"
              >
                <Link href="/cotizacion" className="flex items-center">
                  Solicitar cotización formal
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <div className="flex items-center gap-2.5 rounded-lg bg-white/5 px-4 py-2.5 backdrop-blur-sm border border-white/10">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20">
                  <Clock className="h-4 w-4 text-emerald-400" />
                </div>
                <div className="text-left">
                  <p className="text-xs font-medium text-slate-400">Respuesta garantizada</p>
                  <p className="text-sm font-semibold text-white">Menos de 24 horas</p>
                </div>
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
                className={`group relative overflow-hidden rounded-2xl border ${perk.borderColor} ${perk.bgColor} p-6 backdrop-blur-sm transition-all duration-300 hover:border-opacity-40 hover:shadow-2xl hover:shadow-black/20 hover:-translate-y-1`}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${perk.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`} />
                
                <div className="relative">
                  {/* Icon */}
                  <div className={`mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${perk.color} text-white shadow-lg shadow-black/20 transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className="h-8 w-8" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="mb-3 text-xl font-bold text-white">
                    {perk.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-300">
                    {perk.description}
                  </p>
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
          className="mt-16 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#00b5e2] to-[#00d2ff]">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <h3 className="text-xl font-bold text-white">Beneficios adicionales</h3>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Contratos marco personalizados',
              'Programación de entregas',
              'Reportes de consumo',
              'Soporte técnico prioritario',
            ].map((benefit, index) => (
              <div key={index} className="flex items-start gap-3 rounded-lg bg-white/5 px-4 py-3 border border-white/5 hover:border-white/10 hover:bg-white/10 transition-all">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400 mt-0.5" />
                <span className="text-sm font-medium text-slate-200 leading-relaxed">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

