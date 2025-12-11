import { SectionHeading } from '@/components/ui/section-heading';

const certifications = ['ANSI', 'ISO 9001', 'OSHA', 'EN 388'];
const brands = ['3M', 'CAT', 'Zeus', 'MSA', 'UVEX'];

export function TrustSection() {
  return (
    <section className="border-y border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <SectionHeading
          title="Certificaciones y marcas que nos respaldan"
          subtitle="Trabajamos solo con fabricantes y estándares internacionales"
          align="center"
        />
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4 text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-700">
              Certificaciones
            </p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-sm font-semibold text-slate-800">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="rounded-full bg-white px-3 py-1 shadow-sm"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
          <div className="sm:col-span-2 lg:col-span-3">
            <div className="grid grid-cols-2 gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:grid-cols-3 md:grid-cols-5">
              {brands.map((brand) => (
                <div
                  key={brand}
                  className="flex h-16 items-center justify-center rounded-lg bg-white text-sm font-bold uppercase tracking-wide text-slate-700 shadow-sm"
                >
                  {brand}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

