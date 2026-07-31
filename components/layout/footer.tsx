'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  ArrowUp,
  Building2,
  ChevronRight,
  Facebook,
  Instagram,
  Linkedin,
  Phone,
} from 'lucide-react';
import { FormEvent, useState } from 'react';

const quickLinks = [
  { href: '/productos', label: 'Catálogo de EPP' },
  { href: '/cotizacion', label: 'Arma tu cotización' },
  { href: '/asesores', label: 'Asesores' },
  { href: '/sobre-nosotros', label: 'Sobre nosotros' },
  { href: '/libro-de-reclamaciones', label: 'Libro de reclamaciones' },
  { href: '/productos', label: 'Productos certificados' },
];

export function Footer() {
  const year = new Date().getFullYear();
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubscribed(true);
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#081b39] text-slate-100">
      <div className="h-1 bg-[#F5C400]" />

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 lg:items-start">
          {/* Brand + contact */}
          <div className="space-y-5 sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block transition-opacity hover:opacity-90">
              <Image
                src="/Logo de Zeus.png"
                alt="Zeus Safety"
                width={160}
                height={48}
                className="h-12 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-slate-400">
              Protección industrial de nivel corporativo. EPP certificado y
              asesoría especializada para operaciones de alto riesgo.
            </p>
            <div className="space-y-4 pt-1">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#F5C400] text-[#F5C400]">
                  <Building2 className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-white">
                    Oficina
                  </p>
                  <p className="text-sm text-slate-400">
                    Av. Industrial 123, Lima — Perú
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#F5C400] text-[#F5C400]">
                  <Phone className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-white">
                    Contáctanos
                  </p>
                  <a
                    href="tel:+5115555555"
                    className="text-sm text-slate-400 transition-colors hover:text-[#F5C400]"
                  >
                    +51 1 555 5555
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Quick links — centered in middle column */}
          <div className="flex justify-center sm:col-span-1">
            <div className="w-full max-w-[240px]">
              <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
                Enlaces rápidos
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-[#F5C400]"
                    >
                      <span className="flex h-4 w-4 items-center justify-center rounded-full border border-slate-600 text-[8px] text-slate-500 transition-colors group-hover:border-[#F5C400] group-hover:text-[#F5C400]">
                        <ChevronRight className="h-2.5 w-2.5" strokeWidth={3} />
                      </span>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Email updates + social */}
          <div className="sm:col-span-2 lg:col-span-1 lg:justify-self-end lg:w-full lg:max-w-sm">
            <h4 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              Novedades por correo
            </h4>
            <p className="mb-4 text-sm leading-relaxed text-slate-400">
              Déjanos tu email y te enviamos novedades del catálogo, stock y
              ofertas.
            </p>
            {subscribed ? (
              <p className="text-sm font-medium text-[#F5C400]">
                ¡Listo! Te mantendremos informado.
              </p>
            ) : (
              <form
                onSubmit={handleNewsletter}
                className="mb-6 flex items-stretch"
              >
                <input
                  type="email"
                  required
                  placeholder="Tu correo electrónico"
                  className="h-11 min-w-0 flex-1 border border-slate-600 bg-[#0b2d60] px-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-[#F5C400]"
                />
                <button
                  type="submit"
                  className="h-11 shrink-0 bg-[#F5C400] px-4 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233]"
                >
                  Enviar
                </button>
              </form>
            )}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wide text-white">
                Síguenos:
              </span>
              <div className="flex items-center gap-3">
                {[
                  { Icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
                  { Icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
                  { Icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                ].map(({ Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="text-white transition-colors hover:text-[#F5C400]"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700/60">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-4 sm:flex-row sm:px-6 lg:px-8">
          <p className="text-xs text-slate-500">
            © {year} Zeus Safety. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-1 gap-y-2 text-xs text-slate-500">
            <Link href="#" className="transition-colors hover:text-[#F5C400]">
              Políticas de privacidad
            </Link>
            <span className="px-1">/</span>
            <Link href="#" className="transition-colors hover:text-[#F5C400]">
              Términos y condiciones
            </Link>
            <span className="px-1">/</span>
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
            className="flex h-9 w-9 items-center justify-center bg-[#0b2d60] text-[#F5C400] transition-colors hover:bg-[#F5C400] hover:text-[#0b2d60]"
          >
            <ArrowUp className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </footer>
  );
}
