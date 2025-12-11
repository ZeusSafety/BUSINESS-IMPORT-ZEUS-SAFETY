'use client';

import { useQuoteStore } from '@/store/quoteStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react';

export default function QuotePage() {
  const { items, updateQuantity, removeItem, clear } = useQuoteStore();

  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
            Cotización
          </p>
          <h1 className="text-3xl font-black text-slate-900">Arma tu pedido</h1>
          <p className="text-sm text-slate-600">
            Ajusta cantidades y envía tu solicitud. Un asesor responderá en minutos.
          </p>
        </div>
        {items.length > 0 && (
          <Button variant="ghost" onClick={clear}>
            Vaciar selección
          </Button>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {items.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-sm text-slate-600">
              No has agregado productos aún. Explora el catálogo y agrégalos a la cotización.
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-amber-700">
                    {item.category}
                  </p>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.name}
                  </h3>
                  <p className="text-sm text-slate-600">{item.brand}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    ${item.price.toFixed(2)} c/u
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <label className="text-xs font-semibold uppercase text-slate-500">
                    Cantidad
                  </label>
                  <Input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value) || 1)
                    }
                    className="w-20"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-slate-500 transition hover:text-red-500"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Datos para la cotización</h2>
          <div className="space-y-3 text-sm">
            <div>
              <label className="text-xs font-semibold uppercase text-slate-500">
                Nombre y apellido
              </label>
              <Input placeholder="Ej. Ana Pérez" />
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-slate-500">
                Empresa
              </label>
              <Input placeholder="Razón social" />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs font-semibold uppercase text-slate-500">
                  RUC / ID fiscal
                </label>
                <Input placeholder="12345678901" />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase text-slate-500">
                  Teléfono
                </label>
                <Input placeholder="+51 999 999 999" />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase text-slate-500">
                Correo
              </label>
              <Input type="email" placeholder="correo@empresa.com" />
            </div>
          </div>

          <div className="rounded-xl bg-slate-50 p-4 text-sm text-slate-700">
            <div className="flex items-center justify-between">
              <span>Total referencial</span>
              <span className="text-xl font-bold text-slate-900">
                ${total.toFixed(2)}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Los montos finales se ajustan según descuentos por volumen y disponibilidad.
            </p>
          </div>

          <Button size="lg" className="w-full">
            Solicitar cotización formal
          </Button>
        </div>
      </div>
    </div>
  );
}

