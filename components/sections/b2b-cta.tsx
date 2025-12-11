import { Button } from '@/components/ui/button';
import { SectionHeading } from '@/components/ui/section-heading';
import { Building2, Percent, Truck } from 'lucide-react';
import Link from 'next/link';

const perks = [
  {
    title: 'Descuentos por volumen',
    icon: Percent,
    description: 'Estructuras especiales para contratos marco y compras recurrentes.',
  },
  {
    title: 'Logística asegurada',
    icon: Truck,
    description: 'Envíos nacionales y control de stock dedicado para proyectos.',
  },
  {
    title: 'Asesor EHS asignado',
    icon: Building2,
    description: 'Especialistas por sector para definir kits y matrices de riesgo.',
  },
];

export function B2BCtaSection() {
  return (
    <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
          <SectionHeading
            title="¿Compras por volumen?"
            subtitle="Activa tu cotización corporativa y asegura stock continuo."
            align="left"
          />
          <Button variant="primary" size="lg" asChild className="bg-amber-400 text-slate-900 hover:bg-amber-300">
            <Link href="/cotizacion">Solicitar cotización formal</Link>
          </Button>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {perks.map((perk) => {
            const Icon = perk.icon;
            return (
              <div
                key={perk.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-lg backdrop-blur"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/90 text-slate-900">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-lg font-bold">{perk.title}</h3>
                </div>
                <p className="mt-3 text-sm text-slate-200">{perk.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

