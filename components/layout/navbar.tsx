'use client';

import { Button } from '@/components/ui/button';
import { useQuoteStore } from '@/store/quoteStore';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, ShoppingCart, X } from 'lucide-react';
import { useMemo, useState } from 'react';

const navLinks = [
  { href: '/productos', label: 'Catálogo' },
  { href: '/cotizacion', label: 'Arma tu cotización' },
  { href: '/asesores', label: 'Asesores' },
  { href: '/sobre-nosotros', label: 'Sobre nosotros' },
];

export function Navbar() {
  const items = useQuoteStore((state) => state.items);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const total = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm py-2">
      {/* Main navigation container */}
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between gap-4 px-2 sm:px-3 lg:px-4 py-5">
          
          {/* Logo Section - Fixed width for stability */}
          <Link 
            href="/" 
            className="flex items-center shrink-0 transition-opacity duration-200 hover:opacity-85"
          >
            <div className="relative h-12 w-auto">
              <Image
                src="/Logo de Zeus.png"
                alt="Zeus Safety"
                width={180}
                height={48}
                priority
                className="h-full w-auto object-contain"
                style={{ maxHeight: '48px', objectFit: 'contain' }}
              />
            </div>
          </Link>

          {/* Navigation Links - Desktop - Professional design */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:text-[#103a7b] rounded-md hover:bg-slate-50 group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-[#103a7b] transition-all duration-200 group-hover:w-[calc(100%-0.5rem)]"></span>
              </Link>
            ))}
          </nav>

          {/* Right side actions - Professional design */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Shopping Cart */}
            <Link
              href="/cotizacion"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white transition-all duration-200 hover:border-[#103a7b] hover:bg-slate-50 hover:shadow-sm group"
              aria-label="Carrito de compras"
            >
              <ShoppingCart className="h-5 w-5 text-slate-600 transition-colors group-hover:text-[#103a7b]" />
              {total > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#103a7b] px-1 text-[10px] font-bold text-white shadow-md ring-2 ring-white">
                  {total > 99 ? '99+' : total}
                </span>
              )}
            </Link>
            
            {/* CTA Button - Desktop only (completely hidden on mobile/tablet) */}
            <div className="hidden lg:block">
              <Button
                size="sm"
                className="rounded-lg bg-white border border-slate-200 text-slate-700 px-4 font-medium hover:bg-slate-50 hover:border-[#103a7b] hover:text-[#103a7b] transition-all duration-200 hover:shadow-sm whitespace-nowrap"
                asChild
              >
                <Link href="/cotizacion">Hablar con un asesor</Link>
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 lg:hidden"
              aria-label="Menú"
            >
              {isMobileMenuOpen ? (
                <X className="h-5 w-5 text-slate-600" />
              ) : (
                <Menu className="h-5 w-5 text-slate-600" />
              )}
            </button>
          </div>
        </div>
      </div>


      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <div className="mx-auto max-w-7xl px-2 py-4">
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="px-4 py-3 text-sm font-medium text-slate-700 rounded-lg transition-all duration-200 hover:text-[#103a7b] hover:bg-slate-50"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 pt-2 border-t border-slate-200">
                <Button
                  size="sm"
                  className="w-full rounded-lg bg-white border border-slate-200 text-slate-700 px-4 font-medium hover:bg-slate-50 hover:border-[#103a7b] hover:text-[#103a7b] transition-all duration-200"
                  asChild
                >
                  <Link href="/cotizacion" onClick={() => setIsMobileMenuOpen(false)}>
                    Hablar con un asesor
                  </Link>
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

