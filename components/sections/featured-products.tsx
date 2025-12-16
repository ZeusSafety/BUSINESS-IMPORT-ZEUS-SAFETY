'use client';

import { ProductCard } from '@/components/products/product-card';
import { SectionHeading } from '@/components/ui/section-heading';
import { products } from '@/lib/mockData';
import { Truck, Users, Package, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export function FeaturedProducts() {
  const featured = products.slice(0, 6);

  const features = [
    {
      icon: Truck,
      text: 'Envíos 24-48h',
      description: 'Entrega rápida',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      icon: Users,
      text: 'Kits por cuadrilla',
      description: 'Soluciones grupales',
      color: 'from-[#00b5e2] to-[#103a7b]',
      bgColor: 'bg-[#e7f8ff]',
      iconColor: 'text-[#103a7b]',
    },
    {
      icon: Package,
      text: 'Packs por volumen',
      description: 'Descuentos escalonados',
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white">
      {/* Efectos de fondo mejorados */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,181,226,0.04),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(11,45,96,0.03),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,181,226,0.02)_0%,transparent_50%)]" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="flex-1 space-y-4">
            <SectionHeading
              title="Top EPP listos para despachar"
              subtitle="Seleccionados por equipos de seguridad para operaciones de alto riesgo"
            />
          </div>
          
          {/* Features Cards */}
          <div className="flex flex-wrap items-center gap-4 lg:flex-nowrap">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative flex items-center gap-3 rounded-xl border border-slate-200/50 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300/50 hover:shadow-lg hover:shadow-slate-200/50"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${feature.color} shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 leading-tight">{feature.text}</p>
                    <p className="text-[10px] font-medium text-slate-500 mt-0.5">{feature.description}</p>
                  </div>
                  <div className="absolute -right-1 -top-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-sm">
                      <CheckCircle2 className="h-2.5 w-2.5 text-white" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex items-center justify-center"
        >
          <div className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#e7f8ff] to-white px-6 py-3 border border-[#00b5e2]/20 shadow-sm">
            <Sparkles className="h-4 w-4 text-[#00b5e2]" />
            <p className="text-sm font-semibold text-slate-700">
              Todos los productos certificados y listos para cotización inmediata
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

