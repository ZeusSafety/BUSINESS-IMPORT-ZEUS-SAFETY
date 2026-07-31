'use client';

import { useQuoteStore } from '@/store/quoteStore';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronDown,
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
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from 'react';
import { usePathname } from 'next/navigation';

const EMAIL = 'ventas@zeussafety.com';
const ADDRESS = 'Av. Industrial 123, Lima';

const mainLinks = [
  { href: '/', label: 'Inicio' },
  { href: '/sobre-nosotros', label: 'Nosotros' },
  { href: '/cotizacion', label: 'Arma tu cotización' },
];

export function Navbar() {
  const items = useQuoteStore((state) => state.items);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [mobileContactOpen, setMobileContactOpen] = useState(false);
  const [isFloating, setIsFloating] = useState(false);
  const pathname = usePathname();
  const contactRef = useRef<HTMLDivElement>(null);
  const floatContactRef = useRef<HTMLDivElement>(null);

  const total = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const contactActive = isActive('/asesores');

  useEffect(() => {
    const onScroll = () => setIsFloating(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setContactOpen(false);
  }, [isFloating]);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      const inStatic = contactRef.current?.contains(target);
      const inFloat = floatContactRef.current?.contains(target);
      if (!inStatic && !inFloat) setContactOpen(false);
    };
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setContactOpen(false);
    setMobileContactOpen(false);
  }, [pathname]);

  const NavLinks = ({
    centered,
    contactRefEl,
  }: {
    centered?: boolean;
    contactRefEl: RefObject<HTMLDivElement | null>;
  }) => (
    <nav
      className={`hidden items-center gap-1 lg:flex xl:gap-2 ${
        centered ? 'justify-center' : ''
      }`}
    >
      {mainLinks.map((link) => {
        const active = isActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 py-2 text-[13px] font-bold uppercase tracking-wide transition-colors xl:px-4 ${
              active
                ? 'text-[#F5C400]'
                : 'text-[#0c1427] hover:text-[#F5C400]'
            }`}
          >
            {link.label}
          </Link>
        );
      })}

      <div className="relative" ref={contactRefEl}>
        <button
          type="button"
          onClick={() => setContactOpen((o) => !o)}
          className={`inline-flex items-center gap-1 px-3 py-2 text-[13px] font-bold uppercase tracking-wide transition-colors xl:px-4 ${
            contactActive || contactOpen
              ? 'text-[#F5C400]'
              : 'text-[#0c1427] hover:text-[#F5C400]'
          }`}
          aria-expanded={contactOpen}
        >
          Contáctanos
          <ChevronDown
            className={`h-4 w-4 transition-transform ${
              contactOpen ? 'rotate-180' : ''
            }`}
          />
        </button>

        {contactOpen && (
          <div className="absolute left-1/2 top-full z-[200] mt-2 min-w-[210px] -translate-x-1/2 border border-slate-200 bg-white py-2 shadow-[0_12px_40px_rgba(11,45,96,0.2)]">
            <Link
              href="/asesores"
              onClick={() => setContactOpen(false)}
              className={`block px-4 py-2.5 text-sm font-semibold transition-colors ${
                isActive('/asesores')
                  ? 'bg-[#fff8db] text-[#F5C400]'
                  : 'text-[#0c1427] hover:bg-slate-50 hover:text-[#F5C400]'
              }`}
            >
              Asesores
            </Link>
            <a
              href={`mailto:${EMAIL}`}
              className="block px-4 py-2.5 text-sm font-semibold text-[#0c1427] transition-colors hover:bg-slate-50 hover:text-[#F5C400]"
            >
              Escribirnos
            </a>
            <a
              href="tel:+5115555555"
              className="block px-4 py-2.5 text-sm font-semibold text-[#0c1427] transition-colors hover:bg-slate-50 hover:text-[#F5C400]"
            >
              Llamar ahora
            </a>
          </div>
        )}
      </div>
    </nav>
  );

  return (
    <>
      {/* Header estático: logo gris + barra + menú (el logo NO flota) */}
      <header className="relative z-40 w-full bg-white shadow-sm">
        <div className="flex w-full items-stretch">
          {/* Logo — fondo amarillo */}
          <Link
            href="/"
            className="flex w-[140px] shrink-0 items-center justify-center border-r border-[#e0b000] bg-[#F5C400] px-3 transition-opacity hover:opacity-90 sm:w-[160px] sm:px-4 lg:w-[180px]"
          >
            <Image
              src="/Logo de Zeus.png"
              alt="Zeus Safety"
              width={150}
              height={44}
              priority
              className="h-10 w-auto object-contain sm:h-11"
            />
          </Link>

          <div className="flex min-w-0 flex-1 flex-col">
            <div className="hidden bg-[#0b2d60] lg:block">
              <div className="flex h-10 items-center justify-between gap-4 px-5 xl:px-7">
                <div className="flex items-center gap-4 text-white">
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

                <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-[12px] text-white/90">
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

            <div className="border-b border-slate-200 bg-white">
              <div className="flex h-[68px] items-center justify-between gap-3 px-3 sm:px-5 lg:h-[72px] xl:px-7">
                {/* Menú solo aquí cuando NO flota */}
                {!isFloating && (
                  <div className="hidden flex-1 lg:flex">
                    <NavLinks contactRefEl={contactRef} />
                  </div>
                )}

                <div className="ml-auto flex items-center gap-1 sm:gap-2">
                  <Link
                    href="/cotizacion"
                    className="relative flex h-11 w-11 items-center justify-center text-[#0c1427] transition-colors hover:text-[#F5C400]"
                    aria-label="Carrito de cotización"
                  >
                    <ShoppingCart className="h-5 w-5" strokeWidth={2} />
                    <span className="absolute right-1 top-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#F5C400] px-1 text-[10px] font-bold text-[#0b2d60]">
                      {total > 99 ? '99+' : total}
                    </span>
                  </Link>

                  <Link
                    href="/productos"
                    className="hidden h-11 w-11 items-center justify-center text-[#0c1427] transition-colors hover:text-[#F5C400] sm:flex"
                    aria-label="Buscar / Catálogo"
                  >
                    <Search className="h-5 w-5" strokeWidth={2} />
                  </Link>

                  <Link
                    href="/cotizacion"
                    className="ml-1 hidden h-11 items-center bg-[#F5C400] px-5 text-[12px] font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233] lg:inline-flex"
                  >
                    Hablar con un asesor
                  </Link>

                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen((o) => !o)}
                    className="flex h-11 w-11 items-center justify-center bg-[#0b2d60] text-white lg:hidden"
                    aria-label={
                      isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'
                    }
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
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="border-t border-slate-200 bg-white lg:hidden">
            <nav className="flex flex-col px-4 py-3">
              {mainLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`border-b border-slate-100 py-3.5 text-sm font-bold uppercase tracking-wide ${
                    isActive(link.href) ? 'text-[#F5C400]' : 'text-[#0c1427]'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <button
                type="button"
                onClick={() => setMobileContactOpen((o) => !o)}
                className={`flex items-center justify-between border-b border-slate-100 py-3.5 text-left text-sm font-bold uppercase tracking-wide ${
                  contactActive ? 'text-[#F5C400]' : 'text-[#0c1427]'
                }`}
              >
                Contáctanos
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    mobileContactOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {mobileContactOpen && (
                <div className="relative z-[200] border-b border-slate-100 bg-slate-50 px-3 py-2">
                  <Link
                    href="/asesores"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-2.5 text-sm font-semibold text-[#0c1427]"
                  >
                    Asesores
                  </Link>
                  <a
                    href={`mailto:${EMAIL}`}
                    className="block py-2.5 text-sm font-semibold text-[#0c1427]"
                  >
                    Escribirnos
                  </a>
                  <a
                    href="tel:+5115555555"
                    className="block py-2.5 text-sm font-semibold text-[#0c1427]"
                  >
                    Llamar ahora
                  </a>
                </div>
              )}

              <Link
                href="/productos"
                onClick={() => setIsMobileMenuOpen(false)}
                className="border-b border-slate-100 py-3.5 text-sm font-bold uppercase tracking-wide text-[#0c1427]"
              >
                Catálogo
              </Link>

              <Link
                href="/cotizacion"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-3 inline-flex h-11 items-center justify-center bg-[#F5C400] text-xs font-bold uppercase tracking-wide text-[#0b2d60]"
              >
                Hablar con un asesor
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Barra flotante: solo opciones centradas, SIN logo */}
      <div
        className={`fixed left-1/2 top-4 z-[100] hidden w-[min(920px,calc(100%-2rem))] -translate-x-1/2 transition-all duration-300 lg:block ${
          isFloating
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-4 opacity-0'
        }`}
      >
        <div className="flex h-14 items-center justify-center gap-2 overflow-visible rounded-full border border-slate-200/90 bg-white/95 px-4 shadow-[0_12px_40px_rgba(11,45,96,0.2)] backdrop-blur-md">
          {isFloating && (
            <NavLinks centered contactRefEl={floatContactRef} />
          )}

          <div className="ml-2 flex items-center gap-1 border-l border-slate-200 pl-3">
            <Link
              href="/cotizacion"
              className="relative flex h-10 w-10 items-center justify-center text-[#0c1427] transition-colors hover:text-[#F5C400]"
              aria-label="Carrito"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute right-0.5 top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-[#F5C400] px-1 text-[9px] font-bold text-[#0b2d60]">
                {total > 99 ? '99+' : total}
              </span>
            </Link>
            <Link
              href="/cotizacion"
              className="hidden h-9 items-center rounded-full bg-[#F5C400] px-4 text-[11px] font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233] xl:inline-flex"
            >
              Asesor
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
