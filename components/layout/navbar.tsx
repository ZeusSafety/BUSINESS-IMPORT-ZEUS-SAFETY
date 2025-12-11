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
    <header className="sticky top-0 z-40 border-b border-slate-200/80 backdrop-blur bg-white/95">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo_zeus_azul.svg"
            alt="Zeus Safety Next"
            width={140}
            height={44}
            priority
          />
        </Link>

        <div className="hidden flex-1 items-center gap-3 rounded-full bg-slate-50 px-4 py-2 sm:flex">
          <Search className="h-4 w-4 text-slate-400" />
          <Input
            placeholder="Busca por producto, categoría o marca"
            className="border-0 bg-transparent px-0 text-sm focus:ring-0"
          />
          <Button variant="secondary" size="sm" className="rounded-full px-4">
            Buscar
          </Button>
        </div>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition hover:text-[#103a7b]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/cotizacion"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm transition hover:border-amber-400 hover:text-amber-600"
          >
            <ShoppingCart className="h-5 w-5" />
            {total > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#00b5e2] px-1 text-[10px] font-bold text-slate-900">
                {total}
              </span>
            )}
          </Link>
          <Button
            variant="secondary"
            size="sm"
            className="hidden sm:inline-flex"
            asChild
          >
            <Link href="/cotizacion">Hablar con un asesor</Link>
          </Button>
          <button className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white shadow-sm lg:hidden">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="flex sm:hidden">
        <div className="flex w-full items-center gap-2 border-t border-slate-100 px-4 py-2">
          <Search className="h-4 w-4 text-slate-400" />
          <Input
            placeholder="Busca tu EPP ideal"
            className="border-0 bg-transparent px-0 text-sm focus:ring-0"
          />
        </div>
      </div>
    </header>
  );
}

