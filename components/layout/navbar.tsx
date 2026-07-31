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
  Menu,
  Phone,
  Search,
  ShoppingCart,
  X,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/productos', label: 'Catálogo' },
  { href: '/cotizacion', label: 'Arma tu cotización' },
  { href: '/asesores', label: 'Asesores' },
  { href: '/sobre-nosotros', label: 'Sobre nosotros' },
];

const PHONE_DISPLAY = '+51 1 555 5555';
const PHONE_HREF = 'tel:+5115555555';
const EMAIL = 'ventas@zeussafety.com';

export function Navbar() {
  const items = useQuoteStore((state) => state.items);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const total = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white">
      {/* Top utility bar — full width edge to edge */}
      <div className="hidden border-b border-[#eeeeee] bg-white lg:block">
        <div className="flex h-11 w-full items-center justify-between gap-4">
          <div className="flex flex-1 flex-wrap items-center gap-x-7 gap-y-1 pl-6 pr-4 text-[13px] font-medium text-[#0b2d60] xl:pl-8">
            <a
              href={PHONE_HREF}
              className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
            >
              <Phone className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
              {PHONE_DISPLAY}
            </a>
            <a
              href={`mailto:${EMAIL}`}
              className="inline-flex items-center gap-2 transition-opacity hover:opacity-70"
            >
              <Mail className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
              {EMAIL}
            </a>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
              Lun – Sáb 9:00 – 17:30, Dom – CERRADO
            </span>
          </div>
          <div className="flex items-center gap-4 pr-6 text-[#0b2d60] xl:pr-8">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="transition-opacity hover:opacity-70"
            >
              <Facebook className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="transition-opacity hover:opacity-70"
            >
              <Instagram className="h-3.5 w-3.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="transition-opacity hover:opacity-70"
            >
              <Linkedin className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main nav — logo flush left, hamburger flush right */}
      <div className="border-b border-[#eeeeee] bg-white">
        <div className="flex h-[78px] w-full items-stretch">
          {/* Yellow logo block — left edge */}
          <Link
            href="/"
            className="flex shrink-0 items-center justify-center bg-[#F5C400] px-6 transition-opacity hover:opacity-95 sm:px-8 lg:px-10"
          >
            <Image
              src="/Logo de Zeus.png"
              alt="Zeus Safety"
              width={150}
              height={40}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Nav links fill the middle */}
          <nav className="hidden min-w-0 flex-1 items-stretch lg:flex">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex flex-1 items-center justify-center border-r border-[#eeeeee] px-2 text-[14px] font-semibold tracking-wide transition-colors duration-200 ${
                    active
                      ? 'text-[#F5C400]'
                      : 'text-[#0b2d60] hover:text-[#F5C400]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Search */}
          <Link
            href="/productos"
            className="hidden items-center justify-center border-r border-[#eeeeee] px-5 text-[#0b2d60] transition-colors hover:text-[#F5C400] lg:flex xl:px-6"
            aria-label="Buscar productos"
          >
            <Search className="h-5 w-5" strokeWidth={2} />
          </Link>

          {/* Cart */}
          <Link
            href="/cotizacion"
            className="relative flex items-center justify-center border-r border-[#eeeeee] px-5 text-[#0b2d60] transition-colors hover:text-[#F5C400] xl:px-6"
            aria-label="Carrito de cotización"
          >
            <ShoppingCart className="h-5 w-5" strokeWidth={2} />
            <span className="absolute right-2.5 top-4 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#F5C400] px-1 text-[10px] font-bold text-white">
              {total > 99 ? '99+' : total}
            </span>
          </Link>

          {/* Yellow hamburger — right edge */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            className="flex w-[72px] shrink-0 items-center justify-center bg-[#F5C400] text-white transition-opacity hover:opacity-90 xl:w-20"
            aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" strokeWidth={2.5} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={2.5} />
            )}
          </button>
        </div>
      </div>

      {/* Dropdown menu */}
      {isMobileMenuOpen && (
        <div className="border-b border-[#eeeeee] bg-white shadow-lg">
          <div className="w-full px-6 py-4 xl:px-8">
            <nav className="flex flex-col">
              {navLinks.map((link) => {
                const active = isActive(link.href);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`border-b border-[#eeeeee] py-3.5 text-[15px] font-semibold transition-colors ${
                      active
                        ? 'text-[#F5C400]'
                        : 'text-[#0b2d60] hover:text-[#F5C400]'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <Link
                href="/cotizacion"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 inline-flex h-12 items-center justify-center bg-[#0b2d60] text-[13px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#103a7b]"
              >
                Hablar con un asesor
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
