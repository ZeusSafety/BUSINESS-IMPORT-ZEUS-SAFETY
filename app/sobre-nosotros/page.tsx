export default function AboutPage() {
  const values = [
    { title: 'Seguridad', description: 'Operamos bajo estándares globales y auditorías constantes.' },
    { title: 'Calidad', description: 'EPP certificados y trazabilidad de lotes para cada entrega.' },
    { title: 'Confianza', description: 'Asesoría consultiva y soporte técnico para tus proyectos.' },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
            Sobre nosotros
          </p>
          <h1 className="text-3xl font-black text-slate-900">
            Ingeniería en seguridad industrial para equipos de alto riesgo
          </h1>
          <p className="text-base text-slate-600">
            Nacimos en el campo, acompañando a cuadrillas mineras y obras de infraestructura.
            Hoy conectamos a las principales marcas de EPP con operaciones que requieren
            continuidad, cumplimiento y soporte inmediato.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-amber-700">
                  {value.title}
                </p>
                <p className="mt-2 text-sm text-slate-700">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="aspect-[4/3] rounded-2xl bg-gradient-to-br from-slate-100 via-white to-amber-50" />
          <div className="space-y-2 text-sm text-slate-700">
            <p className="font-semibold text-slate-900">Ubicación</p>
            <p>Av. Industrial 123, Lima - Perú</p>
            <div className="h-48 rounded-xl border border-slate-200 bg-slate-100 text-center text-slate-500">
              Google Maps embed (placeholder)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

