'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUp,
  Facebook,
  Instagram,
  Linkedin,
  MapPin,
  Phone,
} from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/51999999999?text=' +
  encodeURIComponent('Hola, deseo información sobre EPP Zeus Safety.');
const PHONE_DISPLAY = '+51 1 555 5555';
const PHONE_HREF = 'tel:+5115555555';
const ADDRESS = 'Av. Industrial 123, Lima — Perú';

const menuLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/productos', label: 'Catálogo' },
  { href: '/cotizacion', label: 'Cotizador' },
  { href: '/blog', label: 'Blog' },
  { href: '/sobre-nosotros', label: 'Nosotros' },
  { href: '/asesores', label: 'Contáctanos' },
  { href: '/libro-de-reclamaciones', label: 'Libro de reclamaciones' },
];

const brandLinks = [
  { href: '/productos', label: 'Zeus Safety' },
  { href: '/productos', label: '3M' },
  { href: '/productos', label: 'uvex' },
  { href: '/productos', label: 'MSA' },
  { href: '/productos', label: 'Caterpillar' },
];

const categoryLinks = [
  { href: '/productos', label: 'Guantes' },
  { href: '/productos', label: 'Lentes' },
  { href: '/productos', label: 'Respiradores' },
  { href: '/productos', label: 'Protección corporal' },
  { href: '/productos', label: 'Calzado' },
  { href: '/productos', label: 'Auditivo' },
  { href: '/productos', label: 'Seguridad vial' },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-white pt-16 text-slate-100 sm:pt-20">
      {/* Cinta CTA centrada en el borde blanco / navy */}
      <div className="pointer-events-none absolute inset-x-0 top-16 z-20 flex -translate-y-1/2 justify-center px-4 sm:top-20">
        <div
          className="pointer-events-auto flex w-full max-w-[1100px] items-center justify-between gap-4 rounded-xl bg-[#F5C400] py-5 pl-6 pr-5 shadow-[0_14px_40px_rgba(11,45,96,0.3)] sm:gap-6 sm:py-6 sm:pl-8 sm:pr-6 lg:pl-10 lg:pr-7"
          style={{
            clipPath:
              'polygon(0 0, calc(100% - 52px) 0, 100% 50%, calc(100% - 52px) 100%, 0 100%)',
          }}
        >
          <p className="min-w-0 flex-1 text-[13px] font-semibold leading-snug text-[#0b2d60] sm:text-[15px] lg:text-base">
            ¿Tienes alguna consulta?{' '}
            <span className="font-black">
              Comunícate con un asesor especializado
            </span>
          </p>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="mr-6 inline-flex h-11 shrink-0 items-center gap-2 rounded-lg bg-[#25D366] px-4 text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#20BA5A] sm:mr-8 sm:h-12 sm:gap-2.5 sm:px-5 sm:text-xs"
          >
            <WhatsAppIcon className="h-4 w-4 sm:h-5 sm:w-5" />
            Atención en línea
          </a>
        </div>
      </div>

      {/* Cuerpo — el borde superior es la línea de alineación */}
      <div className="relative overflow-hidden border-t border-[#071a3a] bg-[#071a3a] pt-14 sm:pt-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-1 bg-[#F5C400]"
        />

        <div className="relative mx-auto grid max-w-[1600px] gap-10 px-6 pb-12 pt-2 sm:grid-cols-2 lg:grid-cols-4 lg:gap-12 lg:px-10 lg:pb-14 xl:px-12">
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="inline-block transition-opacity hover:opacity-90"
            >
              <Image
                src="/Logo de Zeus.png"
                alt="Zeus Safety"
                width={168}
                height={52}
                className="h-12 w-auto object-contain brightness-0 invert sm:h-14"
              />
            </Link>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/55">
              Seguridad industrial
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              EPP certificado y asesoría para operaciones de alto riesgo en todo
              el Perú.
            </p>

            <div className="space-y-3 pt-1">
              <a
                href={PHONE_HREF}
                className="flex items-start gap-3 text-sm transition-colors hover:text-[#F5C400]"
              >
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#F5C400]" />
                <span>
                  <span className="block text-[11px] font-bold uppercase tracking-wide text-white/50">
                    Telf.
                  </span>
                  <span className="font-bold text-[#F5C400]">
                    {PHONE_DISPLAY}
                  </span>
                </span>
              </a>
              <div className="flex items-start gap-3 text-sm text-white/70">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#F5C400]" />
                <span>{ADDRESS}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              {[
                { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                {
                  Icon: Instagram,
                  href: 'https://instagram.com',
                  label: 'Instagram',
                },
                { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white transition-colors hover:border-[#F5C400] hover:bg-[#F5C400] hover:text-[#0b2d60]"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-black uppercase tracking-wider text-[#F5C400]">
              Menú
            </h4>
            <ul className="space-y-2.5">
              {menuLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition-colors hover:text-[#F5C400]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-black uppercase tracking-wider text-[#F5C400]">
              Marcas
            </h4>
            <ul className="space-y-2.5">
              {brandLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition-colors hover:text-[#F5C400]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-black uppercase tracking-wider text-[#F5C400]">
              Categorías
            </h4>
            <ul className="space-y-2.5">
              {categoryLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/65 transition-colors hover:text-[#F5C400]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 px-6 py-5 sm:flex-row lg:px-10 xl:px-12">
            <p className="text-xs text-white/45">
              © {year} Zeus Safety. Todos los derechos reservados.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-xs text-white/45">
              <Link href="#" className="transition-colors hover:text-[#F5C400]">
                Políticas de privacidad
              </Link>
              <span className="px-1.5 text-white/25">/</span>
              <Link href="#" className="transition-colors hover:text-[#F5C400]">
                Términos y condiciones
              </Link>
              <span className="px-1.5 text-white/25">/</span>
              <Link
                href="/libro-de-reclamaciones"
                className="transition-colors hover:text-[#F5C400]"
              >
                Libro de reclamaciones
              </Link>
            </div>
            <button
              type="button"
              onClick={scrollTop}
              aria-label="Volver arriba"
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0b2d60] text-[#F5C400] transition-colors hover:bg-[#F5C400] hover:text-[#0b2d60]"
            >
              <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
