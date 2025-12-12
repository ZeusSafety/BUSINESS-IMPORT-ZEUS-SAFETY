import { ProductCard } from '@/components/products/product-card';
import { SectionHeading } from '@/components/ui/section-heading';
import { products } from '@/lib/mockData';
import { Truck, Users, Package } from 'lucide-react';

export function FeaturedProducts() {
  const featured = products.slice(0, 6);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f8fafc] to-[#f0f4fa]">
      {/* Efectos de fondo sutiles */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,181,226,0.05),transparent_50%)]" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <SectionHeading
              title="Top EPP listos para despachar"
              subtitle="Seleccionados por equipos de seguridad para operaciones de alto riesgo"
            />
          </div>
          <div className="flex flex-wrap items-center gap-6 rounded-xl bg-white/60 px-5 py-3 backdrop-blur-sm border border-slate-200/50 shadow-sm">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Truck className="h-4 w-4 text-[#103a7b]" />
              <span>Envíos 24-48h</span>
            </div>
            <div className="h-4 w-px bg-slate-300" />
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Users className="h-4 w-4 text-[#103a7b]" />
              <span>Kits por cuadrilla</span>
            </div>
            <div className="h-4 w-px bg-slate-300" />
            <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
              <Package className="h-4 w-4 text-[#103a7b]" />
              <span>Packs por volumen</span>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

