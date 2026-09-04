'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type FeaturedItem = {
  title: string;
  href: string;
  image: string;
};

const featured: FeaturedItem[] = [
  {
    title: 'Seguridad Manual',
    href: '/productos?categoria=Protecci%C3%B3n%20Manual',
    image: '/Guantes-1.jpg',
  },
  {
    title: 'Seguridad Respiratoria',
    href: '/productos?categoria=Protecci%C3%B3n%20Respiratoria',
    image: '/Seguridad Respiradora-1.jpg',
  },
  {
    title: 'Calzado de Seguridad',
    href: '/productos?categoria=Calzado%20de%20Seguridad',
    image: '/zapatos-1.jpg',
  },
  {
    title: 'Seguridad Vial',
    href: '/productos?categoria=Seguridad%20Vial',
    image: '/Seguridad Vial-1.jpg',
  },
];

export function HomeFeaturedCategories() {
  return (
    <section className="bg-white py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="overflow-hidden rounded-3xl bg-[#0b2d60]">
          <div className="relative flex flex-col gap-5 border-b border-white/10 px-5 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-10 lg:py-8">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(245,196,0,0.16),transparent_55%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#F5C400]/50 to-transparent"
            />
            <div className="relative flex items-start gap-3 sm:items-center">
              <span className="mt-1 hidden h-14 w-1.5 shrink-0 rounded-full bg-[#F5C400] sm:mt-0 sm:block" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#F5C400]">
                  Catálogo Zeus · líneas top
                </p>
                <h2 className="mt-1 text-xl font-black uppercase tracking-[0.04em] text-white sm:text-2xl lg:text-3xl">
                  Categorías destacadas
                </h2>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
                  Guantes, respiración, calzado y vial — las líneas más pedidas
                  con stock listo para cotizar.
                </p>
              </div>
            </div>

            <Link
              href="/productos"
              className="group relative z-10 inline-flex shrink-0 items-center gap-2 overflow-hidden rounded-full bg-[#F5C400] px-5 py-3 text-[11px] font-bold uppercase tracking-wide text-[#0b2d60] transition-shadow hover:shadow-[0_8px_24px_rgba(245,196,0,0.4)]"
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-[#ffd233] transition-transform duration-300 group-hover:scale-x-100"
              />
              <span className="relative">Ver catálogo</span>
              <ArrowRight className="relative h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:gap-5 sm:p-6 lg:grid-cols-4 lg:gap-6 lg:p-8">
            {featured.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative block aspect-[3/4] overflow-hidden rounded-2xl shadow-[0_8px_28px_rgba(0,0,0,0.2)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_18px_44px_rgba(0,0,0,0.32)]"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
                  quality={95}
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="absolute bottom-3 left-3 right-3 flex translate-y-2 items-center justify-center gap-1.5 rounded-full bg-[#F5C400] py-2 text-[10px] font-bold uppercase tracking-wide text-[#0b2d60] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  Ver {item.title}
                  <ArrowRight className="h-3 w-3" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
