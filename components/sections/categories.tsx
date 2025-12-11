import { categories } from '@/lib/mockData';
import { SectionHeading } from '@/components/ui/section-heading';
import type { ElementType } from 'react';
import {
  Hand,
  Glasses,
  Wind,
  HardHat,
  Ear,
  Footprints,
} from 'lucide-react';

const iconsMap: Record<string, ElementType> = {
  'Protección Manual': Hand,
  'Protección Visual': Glasses,
  'Protección Respiratoria': Wind,
  'Protección de Cabeza': HardHat,
  'Protección Auditiva': Ear,
  'Calzado de Seguridad': Footprints,
};

export function CategoriesSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            title="Categorías críticas de protección"
            subtitle="Selecciona el frente de riesgo y explora los EPP más robustos"
          />
          <p className="max-w-md text-sm text-slate-600">
            Integramos productos certificados para cada especialidad, listos para ser cotizados por volumen.
          </p>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat) => {
            const Icon = iconsMap[cat] ?? Hand;
            return (
              <div
                key={cat}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-white to-amber-50 p-5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,193,7,0.2),transparent_35%)] opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="relative flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-amber-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
                      Línea EPP
                    </p>
                    <p className="text-lg font-bold text-slate-900">{cat}</p>
                  </div>
                </div>
                <p className="relative mt-3 text-sm text-slate-600">
                  Cobertura nacional · Stock inmediato · Personalización con branding.
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

