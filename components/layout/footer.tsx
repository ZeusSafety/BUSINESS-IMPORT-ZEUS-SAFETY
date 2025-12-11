import Link from 'next/link';
import { Facebook, Instagram, Linkedin } from 'lucide-react';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-slate-200 bg-[#0b2d60] text-slate-100">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 sm:px-6 lg:px-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#00b5e2]">
            Zeus Safety Next
          </p>
          <p className="text-base text-slate-200">
            Protección industrial de nivel corporativo con asesoría especializada.
          </p>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-[#cbe6ff]">
            Empresa
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            <li><Link href="/sobre-nosotros" className="hover:text-amber-400">Sobre nosotros</Link></li>
            <li><Link href="/productos" className="hover:text-amber-400">Catálogo</Link></li>
            <li><Link href="/cotizacion" className="hover:text-amber-400">Arma tu cotización</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wide text-[#cbe6ff]">
            Legal
          </h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-200">
            <li><Link href="/libro-de-reclamaciones" className="hover:text-amber-400">Libro de reclamaciones</Link></li>
            <li><Link href="#" className="hover:text-amber-400">Políticas de privacidad</Link></li>
            <li><Link href="#" className="hover:text-amber-400">Términos de uso</Link></li>
          </ul>
        </div>
        <div className="space-y-3">
          <h4 className="text-sm font-bold uppercase tracking-wide text-[#cbe6ff]">
            Síguenos
          </h4>
          <div className="flex gap-3">
            {[Facebook, Instagram, Linkedin].map((Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 bg-[#0f3b80] hover:border-[#00b5e2] hover:text-[#00b5e2]"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <div className="text-sm text-slate-200">
            <p>Av. Industrial 123, Lima</p>
            <p>ventas@zeussafety.com</p>
            <p>+51 1 555 5555</p>
          </div>
        </div>
      </div>
      <div className="border-t border-[#0b2347] bg-[#081b39] py-4 text-center text-xs text-slate-300">
        © {year} Zeus Safety. Todos los derechos reservados.
      </div>
    </footer>
  );
}

