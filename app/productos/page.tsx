import { ProductCard } from '@/components/products/product-card';
import { Input } from '@/components/ui/input';
import { products, categories, certifications } from '@/lib/mockData';

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
            Catálogo
          </p>
          <h1 className="text-3xl font-black text-slate-900">EPP y Seguridad Industrial</h1>
          <p className="text-sm text-slate-600">
            Explora productos certificados listos para cotizar en volumen.
          </p>
        </div>
        <div className="w-full max-w-md">
          <Input placeholder="Buscar por nombre, marca o código" />
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Categorías</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-2">
                  <input type="checkbox" className="accent-amber-500" />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">Certificación</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              {certifications.map((cert) => (
                <label key={cert} className="flex items-center gap-2">
                  <input type="checkbox" className="accent-amber-500" />
                  {cert}
                </label>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-bold text-slate-900">Rango de precio</h3>
            <div className="mt-3 space-y-2 text-sm text-slate-700">
              <label className="flex items-center gap-2">
                <input type="radio" name="price" className="accent-amber-500" />
                Menos de $20
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="price" className="accent-amber-500" />
                $20 - $80
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="price" className="accent-amber-500" />
                Más de $80
              </label>
            </div>
          </div>
        </aside>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

