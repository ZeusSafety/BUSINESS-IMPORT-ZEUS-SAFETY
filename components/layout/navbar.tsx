'use client';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useQuoteStore } from '@/store/quoteStore';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, Search, ShoppingCart } from 'lucide-react';
import { useMemo } from 'react';

const navLinks = [
  { href: '/productos', label: 'Catálogo' },
  { href: '/cotizacion', label: 'Arma tu cotización' },
  { href: '/asesores', label: 'Asesores' },
  { href: '/sobre-nosotros', label: 'Sobre nosotros' },
];

export function Navbar() {
  const items = useQuoteStore((state) => state.items);

  const total = useMemo(
    () => items.reduce((acc, item) => acc + item.quantity, 0),
    [items],
  );

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-slate-200/60 shadow-[0_1px_3px_0_rgba(0,0,0,0.05)]">
      {/* Top accent bar */}
      <div className="h-0.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-600"></div>
      
      {/* Main navigation container */}
      <div className="mx-auto max-w-7xl">
        <div className="flex h-[72px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          
          {/* Logo Section - Fixed width for stability */}
          <Link 
            href="/" 
            className="flex items-center shrink-0 transition-opacity duration-200 hover:opacity-85"
          >
            <div className="relative h-12 w-auto">
              <Image
                src="/logo_zeus_azul.jpeg"
                alt="Zeus Safety"
                width={180}
                height={48}
                priority
                className="h-full w-auto object-contain"
                style={{ maxHeight: '48px', objectFit: 'contain' }}
              />
            </div>
          </Link>

          {/* Search Bar - Desktop - Compact and elegant */}
          <div className="hidden lg:flex flex-1 items-center justify-center max-w-md mx-6">
            <div className="group relative flex w-full items-center">
              {/* Elegant search container with seamless integration */}
              <div className="flex w-full items-center rounded-full bg-white border-2 border-slate-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-300 hover:border-[#103a7b]/40 hover:shadow-[0_4px_12px_rgba(16,58,123,0.12)] focus-within:border-[#103a7b] focus-within:shadow-[0_4px_16px_rgba(16,58,123,0.15)] focus-within:ring-4 focus-within:ring-[#103a7b]/10">
                <div className="flex items-center px-3.5 py-1.5 flex-1 min-w-0">
                  <Search className="h-4 w-4 shrink-0 text-slate-400 transition-colors duration-200 group-focus-within:text-[#103a7b] mr-2.5" />
                  <Input
                    placeholder="Busca por producto..."
                    className="border-0 bg-transparent px-0 text-sm placeholder:text-slate-400/70 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 min-w-0"
                  />
                </div>
                <div className="h-6 w-px bg-slate-200 group-focus-within:bg-[#103a7b]/30 transition-colors duration-200"></div>
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="rounded-l-none rounded-r-full h-[36px] px-4 font-semibold text-white shadow-none hover:shadow-[0_2px_8px_rgba(16,58,123,0.3)] transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
                >
                  Buscar
                </Button>
              </div>
            </div>
          </div>

          {/* Navigation Links - Desktop - Organized spacing */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-200 hover:text-[#103a7b] rounded-md hover:bg-slate-50/80 group"
              >
                <span className="relative z-10">{link.label}</span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 h-0.5 w-0 bg-[#103a7b] transition-all duration-200 group-hover:w-[calc(100%-1rem)]"></span>
              </Link>
            ))}
          </nav>

          {/* Right side actions - Clean and organized */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Shopping Cart */}
            <Link
              href="/cotizacion"
              className="relative flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white transition-all duration-200 hover:border-[#103a7b] hover:bg-slate-50/80 hover:shadow-sm group"
              aria-label="Carrito de compras"
            >
              <ShoppingCart className="h-5 w-5 text-slate-600 transition-colors group-hover:text-[#103a7b]" />
              {total > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#00b5e2] px-1 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
                  {total > 99 ? '99+' : total}
                </span>
              )}
            </Link>
            
            {/* CTA Button */}
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex rounded-lg border-slate-200 bg-white px-4 font-medium text-slate-700 transition-all duration-200 hover:border-[#103a7b] hover:bg-white hover:text-[#103a7b] hover:shadow-sm whitespace-nowrap"
              asChild
            >
              <Link href="/cotizacion">Hablar con un asesor</Link>
            </Button>
            
            {/* Mobile Menu Button */}
            <button 
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white transition-all duration-200 hover:border-slate-300 hover:bg-slate-50/80 lg:hidden"
              aria-label="Menú"
            >
              <Menu className="h-5 w-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar - Compact and elegant */}
      <div className="border-t border-slate-100 bg-white/80 backdrop-blur-sm lg:hidden">
        <div className="mx-auto max-w-7xl px-4 py-2.5">
          <div className="group flex w-full items-center rounded-full bg-white border-2 border-slate-200 shadow-sm px-4 py-2.5 transition-all duration-200 focus-within:border-[#103a7b] focus-within:shadow-md">
            <Search className="h-4 w-4 shrink-0 text-slate-400 mr-2.5 transition-colors group-focus-within:text-[#103a7b]" />
            <Input
              placeholder="Busca tu EPP ideal..."
              className="border-0 bg-transparent px-0 text-sm placeholder:text-slate-400/70 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1"
            />
          </div>
        </div>
      </div>

      {/* Bottom accent bar */}
      <div className="h-0.5 bg-[#0b2d60]"></div>
    </header>
  );
}

