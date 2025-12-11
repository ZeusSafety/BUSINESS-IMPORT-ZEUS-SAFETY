import { advisors } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

export default function AdvisorsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
          Asesores
        </p>
        <h1 className="text-3xl font-black text-slate-900">Equipo especializado</h1>
        <p className="text-sm text-slate-600">
          Contacta directamente al especialista según tu industria.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {advisors.map((advisor) => (
          <div
            key={advisor.id}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="h-40 rounded-xl bg-gradient-to-br from-slate-100 via-white to-amber-50" />
            <div className="mt-4 space-y-1">
              <p className="text-lg font-bold text-slate-900">{advisor.name}</p>
              <p className="text-sm text-amber-700">{advisor.specialty}</p>
              <p className="text-xs uppercase tracking-wide text-slate-500">
                Respuesta inmediata
              </p>
            </div>
            <Button
              variant="secondary"
              className="mt-4 w-full"
              asChild
            >
              <a
                href={`https://wa.me/${advisor.phone}`}
                target="_blank"
                rel="noreferrer"
              >
                <MessageCircle className="h-4 w-4" />
                Chatear por WhatsApp
              </a>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}

