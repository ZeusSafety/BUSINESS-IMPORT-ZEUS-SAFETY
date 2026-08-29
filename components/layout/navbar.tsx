'use client';

import { useQuoteStore } from '@/store/quoteStore';
import Link from 'next/link';
import Image from 'next/image';
import { NavbarTopBar } from '@/components/layout/navbar-top-bar';
import {
  ChevronDown,
  Menu,
  Search,
  ShoppingCart,
  X,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';

type NavChild = { href: string; label: string };

type NavLink = {
  href: string;
  label: string;
  children?: NavChild[];
};

const navLinks: NavLink[] = [
  { href: '/', label: 'Inicio' },
  {
    href: '/sobre-nosotros',
    label: 'Nosotros',
    children: [
      { href: '/sobre-nosotros#nosotros', label: 'La empresa' },
      { href: '/sobre-nosotros#empresa', label: 'Quiénes somos' },
      { href: '/sobre-nosotros#confia', label: 'Confía en Zeus' },
      { href: '/sobre-nosotros#cobertura-envios', label: 'Cobertura y envíos' },
      { href: '/sobre-nosotros#import-asia', label: 'Importación Asia' },
    ],
  },
  { href: '/productos', label: 'Catálogo' },
  { href: '/cotizacion', label: 'Arma tu cotización' },
  { href: '/blog', label: 'Blog' },
  {
    href: '/asesores',
    label: 'Contáctanos',
    children: [
      { href: '/asesores#asesores', label: 'Nuestros asesores' },
      { href: '/asesores#contacto', label: 'Contacto' },
      { href: '/libro-de-reclamaciones', label: 'Libro de reclamaciones' },
      { href: '/cotizacion', label: 'Arma tu cotización' },
    ],
  },
];

const navItemClass =
  'group relative inline-flex h-[72px] shrink-0 items-center gap-1 whitespace-nowrap px-3 text-[13px] font-bold uppercase tracking-wide transition-colors xl:px-4';

function NavDropdown({
  link,
  active,
}: {
  link: NavLink & { children: NavChild[] };
  active: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="relative shrink-0"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Link
        href={link.href}
        className={`${navItemClass} ${
          active ? 'text-[#F5C400]' : 'text-[#0c1427] hover:text-[#F5C400]'
        }`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {link.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          strokeWidth={2.5}
        />
        <span
          aria-hidden
          className={`absolute bottom-0 left-3 right-3 h-[2px] origin-left bg-[#F5C400] transition-transform duration-200 xl:left-4 xl:right-4 ${
            active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
          }`}
        />
      </Link>

      <div
        className={`absolute left-0 top-full z-50 min-w-[220px] transition-all duration-200 ${
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0'
        }`}
      >
        <div className="absolute -top-1 left-0 right-0 h-1" aria-hidden />
        <div className="flex flex-col gap-2 border-t-2 border-[#F5C400] bg-[#0b2d60] p-3 shadow-[0_16px_40px_rgba(11,45,96,0.35)]">
          {link.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="border border-white/90 px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:border-[#F5C400] hover:bg-[#F5C400] hover:text-[#0b2d60]"
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Navbar() {
  const items = useQuoteStore((state) => state.items);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const total = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );

  const isActive = (href: string, children?: NavChild[]) => {
    if (href === '/') return pathname === '/';
    const baseActive = pathname === href || pathname.startsWith(`${href}/`);
    if (baseActive) return true;
    if (children) {
      const base = href.split('#')[0];
      return pathname === base || pathname.startsWith(`${base}/`);
    }
    return false;
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setMobileExpanded(null);
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
      <NavbarTopBar />

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

          <nav className="hidden min-w-0 flex-1 items-center gap-1 lg:flex xl:gap-2">
            {navLinks.map((link) => {
              const active = isActive(link.href, link.children);
              if (link.children?.length) {
                return (
                  <NavDropdown
                    key={link.href}
                    link={link as NavLink & { children: NavChild[] }}
                    active={active}
                  />
                );
              }
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`${navItemClass} ${
                    active
                      ? 'text-[#F5C400]'
                      : 'text-[#0c1427] hover:text-[#F5C400]'
                  }`}
                >
                  {link.label}
                  <span
                    aria-hidden
                    className={`absolute bottom-0 left-3 right-3 h-[2px] origin-left bg-[#F5C400] transition-transform duration-200 xl:left-4 xl:right-4 ${
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
              const active = isActive(link.href, link.children);
              if (link.children?.length) {
                const expanded = mobileExpanded === link.href;
                return (
                  <div key={link.href} className="border-b border-slate-100">
                    <button
                      type="button"
                      onClick={() =>
                        setMobileExpanded(expanded ? null : link.href)
                      }
                      className={`flex w-full items-center justify-between py-3.5 pl-3 text-sm font-bold uppercase tracking-wide transition-colors ${
                        active ? 'text-[#F5C400]' : 'text-[#0c1427]'
                      }`}
                    >
                      {link.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
                      />
                    </button>
                    {expanded && (
                      <div className="mb-3 flex flex-col gap-2 bg-[#0b2d60] p-3">
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="border border-white/80 px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-wide text-white transition-colors hover:border-[#F5C400] hover:bg-[#F5C400] hover:text-[#0b2d60]"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
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
