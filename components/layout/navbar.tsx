'use client';

import { useQuoteStore } from '@/store/quoteStore';
import Link from 'next/link';
import Image from 'next/image';
import {
  Clock,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Search,
  ShoppingCart,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

const EMAIL = 'ventas@zeussafety.com';
const ADDRESS = 'Av. Industrial 123, Lima';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/sobre-nosotros', label: 'Nosotros' },
  { href: '/productos', label: 'Catálogo' },
  { href: '/cotizacion', label: 'Arma tu cotización' },
  { href: '/blog', label: 'Blog' },
  { href: '/asesores', label: 'Contáctanos' },
];

export function Navbar() {
  const items = useQuoteStore((state) => state.items);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const total = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full bg-white transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_8px_28px_rgba(11,45,96,0.1)]' : 'shadow-none'
      }`}
    >
      <div className="hidden border-b border-[#0b2d60]/10 bg-[#0b2d60] lg:block">
        <div className="mx-auto flex h-9 max-w-[1600px] items-center justify-between gap-4 px-6 xl:px-10">
          <div className="flex items-center gap-4 text-white/90">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="transition-colors hover:text-[#F5C400]"
            >
              <Facebook className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="transition-colors hover:text-[#F5C400]"
            >
              <Instagram className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition-colors hover:text-[#F5C400]"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[12px] text-white/85">
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-[#F5C400]"
            >
              <Mail className="h-3.5 w-3.5 text-[#F5C400]" />
              {EMAIL}
            </a>
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-[#F5C400]" />
              {ADDRESS}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-[#F5C400]" />
              Lun – Sáb: 9:00 – 17:30
            </span>
          </div>
        </div>
      </div>

      <div className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex h-[72px] max-w-[1600px] items-center gap-6 px-6 xl:px-10">
          <Link
            href="/"
            className="flex shrink-0 items-center transition-opacity hover:opacity-80"
          >
            <Image
              src="/Logo de Zeus.png"
              alt="Zeus Safety"
              width={160}
              height={48}
              priority
              className="h-11 w-auto object-contain"
            />
          </Link>

          <nav className="hidden flex-1 items-center gap-1 lg:flex xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`group relative px-3 py-2 text-[13px] font-bold uppercase tracking-wide transition-colors xl:px-4 ${
                    active
                      ? 'text-[#F5C400]'
                      : 'text-[#0c1427] hover:text-[#F5C400]'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={`absolute bottom-0.5 left-3 right-3 h-[2px] origin-left bg-[#F5C400] transition-transform duration-200 xl:left-4 xl:right-4 ${
                      active
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="ml-auto flex items-center gap-1 sm:gap-2">
            <Link
              href="/cotizacion"
              className="relative flex h-11 w-11 items-center justify-center text-[#0c1427] transition-colors hover:bg-[#F5C400]/15 hover:text-[#F5C400]"
              aria-label="Carrito de cotización"
            >
              <ShoppingCart className="h-5 w-5" strokeWidth={2} />
              <span className="absolute right-1 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#F5C400] px-1 text-[10px] font-bold text-[#0b2d60]">
                {total > 99 ? '99+' : total}
              </span>
            </Link>

            <Link
              href="/productos"
              className="hidden h-11 w-11 items-center justify-center text-[#0c1427] transition-colors hover:bg-[#F5C400]/15 hover:text-[#F5C400] sm:flex"
              aria-label="Buscar / Catálogo"
            >
              <Search className="h-5 w-5" strokeWidth={2} />
            </Link>

            <Link
              href="/cotizacion"
              className="ml-1 hidden h-11 items-center bg-[#F5C400] px-5 text-[12px] font-bold uppercase tracking-wide text-[#0b2d60] transition-all duration-200 hover:-translate-y-px hover:bg-[#ffd233] lg:inline-flex"
            >
              Hablar con un asesor
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((o) => !o)}
              className="flex h-11 w-11 items-center justify-center bg-[#0b2d60] text-white lg:hidden"
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5" strokeWidth={2.5} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={2.5} />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-[1600px] flex-col px-6 py-3">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`relative border-b border-slate-100 py-3.5 pl-3 text-sm font-bold uppercase tracking-wide transition-colors ${
                    active ? 'text-[#F5C400]' : 'text-[#0c1427]'
                  }`}
                >
                  <span
                    aria-hidden
                    className={`absolute bottom-2 left-0 top-2 w-[3px] bg-[#F5C400] transition-opacity ${
                      active ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/cotizacion"
              onClick={() => setIsMobileMenuOpen(false)}
              className="mt-3 inline-flex h-11 items-center justify-center bg-[#F5C400] text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233]"
            >
              Hablar con un asesor
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
