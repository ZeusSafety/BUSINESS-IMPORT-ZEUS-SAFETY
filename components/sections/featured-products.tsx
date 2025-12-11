import { ProductCard } from '@/components/products/product-card';
import { SectionHeading } from '@/components/ui/section-heading';
import { products } from '@/lib/mockData';

export function FeaturedProducts() {
  const featured = products.slice(0, 6);

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            title="Top EPP listos para despachar"
            subtitle="Seleccionados por equipos de seguridad para operaciones de alto riesgo"
          />
          <div className="text-sm text-slate-600">
            Envíos 24-48h · Kits por cuadrilla · Packs por volumen
          </div>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

