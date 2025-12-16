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
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      {/* Main navigation container */}
      <div className="mx-auto max-w-7xl">
        <div className="flex h-16 items-center justify-between gap-4 px-2 sm:px-3 lg:px-4">
          
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

          {/* Search Bar - Desktop - Professional design */}
          <div className="hidden lg:flex flex-1 items-center justify-center max-w-lg mx-4">
            <div className="group relative flex w-full items-center">
              <div className="flex w-full items-center rounded-lg bg-transparent transition-all duration-300">
                <div className="flex items-center px-4 py-2.5 flex-1 min-w-0">
                  <Search className="h-4 w-4 shrink-0 text-slate-400 transition-colors duration-200 group-focus-within:text-[#103a7b] mr-3" />
                  <Input
                    placeholder="Busca por producto..."
                    className="border-0 bg-transparent px-0 text-sm placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 min-w-0"
                  />
                </div>
                <Button 
                  size="sm" 
                  className="rounded-l-none rounded-r-lg h-[42px] px-5 font-semibold bg-[#103a7b] text-white hover:bg-[#0b2d60] shadow-none transition-all duration-200"
                >
                  Buscar
                </Button>
              </div>
            </div>
          </div>

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
            
            {/* CTA Button */}
            <Button
              size="sm"
              className="hidden sm:inline-flex rounded-lg bg-[#103a7b] text-white px-4 font-medium hover:bg-[#0b2d60] transition-all duration-200 hover:shadow-md whitespace-nowrap"
              asChild
            >
              <Link href="/cotizacion">Hablar con un asesor</Link>
            </Button>
            
            {/* Mobile Menu Button */}
            <button 
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white transition-all duration-200 hover:border-slate-300 hover:bg-slate-50 lg:hidden"
              aria-label="Menú"
            >
              <Menu className="h-5 w-5 text-slate-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar - Professional design */}
      <div className="border-t border-slate-100 bg-white lg:hidden">
        <div className="mx-auto max-w-7xl px-2 py-3">
          <div className="group flex w-full items-center rounded-lg bg-slate-50 border border-slate-200 shadow-sm px-4 py-2.5 transition-all duration-200 focus-within:border-[#103a7b] focus-within:shadow-md">
            <Search className="h-4 w-4 shrink-0 text-slate-400 mr-3 transition-colors group-focus-within:text-[#103a7b]" />
            <Input
              placeholder="Busca por producto..."
              className="border-0 bg-transparent px-0 text-sm placeholder:text-slate-500 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

