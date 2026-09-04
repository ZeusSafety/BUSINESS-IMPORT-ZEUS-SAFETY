import Link from 'next/link';
import { ClipboardList } from 'lucide-react';

export function BlogCtaBanner() {
  return (
    <div className="relative mt-10 overflow-hidden rounded-2xl border border-[#0b2d60]/20 bg-[#0b2d60] px-6 py-8 text-center sm:px-10 sm:py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,196,0,0.18)_0%,transparent_55%)]"
      />
      <div
        aria-hidden
        className="absolute left-0 top-0 h-full w-1.5 bg-[#F5C400]"
      />

      <div className="relative">
        <p className="text-base font-bold text-white sm:text-lg">
          ¿Necesitas el EPP correcto para tu operación?
        </p>
        <p className="mx-auto mt-1.5 max-w-lg text-sm text-white/70">
          Cotiza con Zeus Safety y recibe asesoría técnica.
        </p>

        <Link
          href="/cotizacion"
          className="group/btn relative mt-5 inline-flex h-11 items-center justify-center gap-2 overflow-hidden rounded-full border border-white/20 bg-white px-6 text-xs font-bold uppercase tracking-wide text-[#0b2d60] shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#F5C400] hover:shadow-[0_6px_18px_rgba(245,196,0,0.35)]"
        >
          <span
            aria-hidden
            className="absolute inset-0 origin-left scale-x-0 bg-[#F5C400] transition-transform duration-300 ease-out group-hover/btn:scale-x-100"
          />
          <ClipboardList
            className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:scale-110"
            strokeWidth={2.4}
          />
          <span className="relative z-10">Arma tu cotización</span>
        </Link>
      </div>
    </div>
  );
}
