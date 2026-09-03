'use client';

import { useQuoteStore } from '@/store/quoteStore';
import Link from 'next/link';
import Image from 'next/image';
import { NavbarTopBar } from '@/components/layout/navbar-top-bar';
import {
  ArrowRight,
  BookOpen,
  Building2,
  ChevronDown,
  CircleHelp,
  ClipboardList,
  Clock,
  Globe,
  Headphones,
  Mail,
  Menu,
  Phone,
  Plane,
  Search,
  ShieldCheck,
  ShoppingCart,
  Users,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { products } from '@/lib/mockData';

type NavChild = { href: string; label: string; icon: LucideIcon };

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
      { href: '/sobre-nosotros#empresa', label: 'Quiénes somos', icon: Users },
      { href: '/sobre-nosotros#nosotros', label: 'La empresa', icon: Building2 },
      { href: '/sobre-nosotros#confia', label: 'Confía en Zeus', icon: ShieldCheck },
      { href: '/sobre-nosotros#cobertura-envios', label: 'Cobertura y envíos', icon: Plane },
      { href: '/sobre-nosotros#import-asia', label: 'Importación Asia', icon: Globe },
    ],
  },
  { href: '/productos', label: 'Catálogo' },
  { href: '/cotizacion', label: 'Arma tu cotización' },
  { href: '/blog', label: 'Blog' },
  {
    href: '/asesores',
    label: 'Contáctanos',
    children: [
      { href: '/asesores#contacto', label: 'Escríbenos', icon: Mail },
      { href: '/asesores#faq', label: 'Preguntas frecuentes', icon: CircleHelp },
      { href: '/libro-de-reclamaciones', label: 'Libro de reclamaciones', icon: BookOpen },
      { href: '/cotizacion', label: 'Arma tu cotización', icon: ClipboardList },
    ],
  },
];

/* ── Nav dropdown (fila 3) ────────────────────────────── */
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
      <button
        type="button"
        className={`inline-flex h-11 items-center gap-1 whitespace-nowrap px-4 text-[12px] font-bold uppercase tracking-wide transition-all duration-200 xl:px-5 ${
          active
            ? 'bg-[#F5C400] text-[#0b2d60]'
            : 'text-white/90 hover:bg-[#F5C400] hover:text-[#0b2d60]'
        }`}
        aria-expanded={open}
        aria-haspopup="true"
      >
        {link.label}
        <ChevronDown
          className={`h-3 w-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          strokeWidth={2.5}
        />
      </button>

      <div
        className={`absolute left-0 top-full z-50 min-w-[220px] transition-all duration-200 ${
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-1 opacity-0'
        }`}
      >
        <div className="flex flex-col border border-slate-200 bg-white shadow-[0_16px_40px_rgba(11,45,96,0.12)]">
          {link.children.map((child) => {
            const Icon = child.icon;
            return (
              <Link
                key={child.href}
                href={child.href}
                className="group flex items-center gap-2.5 border-b border-slate-100 px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-[#0b2d60] transition-all duration-200 last:border-b-0 hover:bg-[#F5C400] hover:text-[#0b2d60]"
              >
                <Icon
                  className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                  strokeWidth={2.5}
                />
                {child.label}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ── Live search con botón SEARCH ─────────────────────── */
function LiveSearch() {
  const [query, setQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q),
      )
      .slice(0, 6);
  }, [query]);

  const showResults = focused && query.trim().length >= 2;

  const handleBlur = useCallback((e: React.FocusEvent) => {
    if (wrapperRef.current?.contains(e.relatedTarget as Node)) return;
    setFocused(false);
  }, []);

  return (
    <div ref={wrapperRef} className="relative hidden w-full max-w-lg md:block" onBlur={handleBlur}>
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder="Buscar productos, categorías..."
          className="h-10 min-w-0 flex-1 border border-r-0 border-slate-300 bg-white px-4 text-sm text-[#0c1427] outline-none placeholder:text-slate-400 transition-colors focus:border-[#F5C400]"
        />
        <button
          type="button"
          className="flex h-10 items-center gap-1.5 bg-[#F5C400] px-5 text-[11px] font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233]"
        >
          <Search className="h-4 w-4" strokeWidth={2.5} />
          Buscar
        </button>
      </div>

      {showResults && (
        <div className="absolute left-0 right-0 top-full z-50 mt-0.5 max-h-[420px] overflow-y-auto border border-slate-200 bg-white shadow-[0_16px_40px_rgba(11,45,96,0.12)]">
          {results.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-slate-400">
              No se encontraron productos para &quot;{query}&quot;
            </div>
          ) : (
            results.map((product) => (
              <Link
                key={product.id}
                href={`/productos/${product.slug}`}
                onClick={() => {
                  setQuery('');
                  setFocused(false);
                }}
                className="flex items-center gap-3 border-b border-slate-100 px-4 py-3 transition-colors last:border-b-0 hover:bg-[#F5C400]/10"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-slate-100 bg-white">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-1"
                    sizes="56px"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold text-[#0b2d60]">
                    {product.name}
                  </p>
                  <p className="text-xs text-slate-500">{product.category}</p>
                </div>
                <span className="shrink-0 text-sm font-bold text-[#0b2d60]">
                  S/ {product.price.toFixed(2)}
                </span>
              </Link>
            ))
          )}
          {results.length > 0 && (
            <Link
              href={`/productos?q=${encodeURIComponent(query)}`}
              onClick={() => {
                setQuery('');
                setFocused(false);
              }}
              className="flex items-center justify-center gap-2 bg-slate-50 px-4 py-3 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#F5C400] hover:text-[#0b2d60]"
            >
              Ver todos los resultados
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Main Navbar ──────────────────────────────────────── */
export function Navbar() {
  const items = useQuoteStore((state) => state.items);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [hideTopBar, setHideTopBar] = useState(false);
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
    let lastY = 0;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);
      setHideTopBar(y > 60);
      lastY = y;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-shadow duration-300 ${
        scrolled ? 'shadow-[0_8px_28px_rgba(11,45,96,0.1)]' : 'shadow-none'
      }`}
    >
      {/* ─── FILA 1: Top bar — se esconde al hacer scroll ─── */}
      <div
        className={`transition-all duration-300 ${
          hideTopBar ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-12 opacity-100'
        }`}
      >
        <NavbarTopBar />
      </div>

      {/* ─── FILA 2: Logo + Buscador centrado + Teléfono/Horario + Carrito + CTA ─── */}
      <div className="border-b border-slate-200/80 bg-white">
        <div className="mx-auto flex h-[68px] max-w-[1600px] items-center gap-4 px-6 xl:px-10">
          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center transition-opacity hover:opacity-80"
          >
            <Image
              src="/Logo de Zeus.png"
              alt="Zeus Safety"
              width={140}
              height={44}
              priority
              className="h-10 w-auto object-contain"
            />
          </Link>

          {/* Buscador centrado */}
          <div className="flex flex-1 justify-center">
            <LiveSearch />
          </div>

          {/* Info contacto + Carrito + CTA */}
          <div className="flex items-center gap-4">
            {/* Teléfono y horario */}
            <div className="hidden items-center gap-4 xl:flex">
              <a
                href="tel:+51916532849"
                className="flex items-center gap-2 text-[12px] font-semibold text-[#0b2d60] transition-colors hover:text-[#F5C400]"
              >
                <Phone className="h-4 w-4 text-[#F5C400]" strokeWidth={2} />
                +51 916 532 849
              </a>
              <span className="flex items-center gap-2 text-[12px] font-semibold text-[#0b2d60]/70">
                <Clock className="h-4 w-4 text-[#F5C400]" strokeWidth={2} />
                Lun–Sáb: 9:00–17:30
              </span>
            </div>

            <Link
              href="/cotizacion"
              className="relative flex h-10 w-10 items-center justify-center text-[#0c1427] transition-colors hover:text-[#F5C400]"
              aria-label="Carrito de cotización"
            >
              <ShoppingCart className="h-5 w-5" strokeWidth={2} />
              <span className="absolute -right-0.5 -top-0.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-[#F5C400] px-1 text-[10px] font-bold text-[#0b2d60]">
                {total > 99 ? '99+' : total}
              </span>
            </Link>

            <Link
              href="/cotizacion"
              className="group ml-1 hidden h-10 items-center gap-2 bg-[#F5C400] px-5 text-[11px] font-bold uppercase tracking-wide text-[#0b2d60] transition-all duration-300 hover:gap-3 hover:bg-[#ffd233] hover:shadow-[0_6px_20px_rgba(245,196,0,0.35)] lg:inline-flex"
            >
              <Headphones className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" strokeWidth={2.5} />
              Hablar con un asesor
              <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" strokeWidth={2.5} />
            </Link>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((o) => !o)}
              className="flex h-10 w-10 items-center justify-center bg-[#0b2d60] text-white lg:hidden"
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

      {/* ─── FILA 3: Nav bar centrada (fondo oscuro, hover fill) ─── */}
      <div className="hidden bg-[#0b2d60] lg:block">
        <div className="mx-auto flex max-w-[1600px] items-center justify-center px-6 xl:px-10">
          <nav className="flex items-center">
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
                  className={`inline-flex h-11 items-center whitespace-nowrap px-4 text-[12px] font-bold uppercase tracking-wide transition-all duration-200 xl:px-5 ${
                    active
                      ? 'bg-[#F5C400] text-[#0b2d60]'
                      : 'text-white/90 hover:bg-[#F5C400] hover:text-[#0b2d60]'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* ─── Mobile menu ─── */}
      {isMobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white lg:hidden">
          <nav className="mx-auto flex max-w-[1600px] flex-col px-6 py-3">
            <div className="relative mb-3 md:hidden">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" strokeWidth={2} />
              <input
                type="text"
                placeholder="Buscar productos..."
                className="h-10 w-full border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-[#0c1427] outline-none placeholder:text-slate-400 focus:border-[#F5C400] focus:bg-white"
              />
            </div>

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
                      <div className="mb-3 flex flex-col border border-slate-200 bg-white">
                        {link.children.map((child) => {
                          const Icon = child.icon;
                          return (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="group flex items-center justify-center gap-2 border-b border-slate-100 px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide text-[#0b2d60] transition-colors last:border-b-0 hover:bg-[#F5C400] hover:text-[#0b2d60]"
                            >
                              <Icon
                                className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                                strokeWidth={2.5}
                              />
                              {child.label}
                            </Link>
                          );
                        })}
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
                  className={`border-b border-slate-100 py-3.5 pl-3 text-sm font-bold uppercase tracking-wide transition-colors ${
                    active ? 'bg-[#F5C400]/10 text-[#F5C400]' : 'text-[#0c1427]'
                  }`}
                >
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
