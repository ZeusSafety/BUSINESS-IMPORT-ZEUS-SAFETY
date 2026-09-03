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
    title: 'Guantes',
    href: '/productos?categoria=Guantes',
    image: '/Guantes-1.jpg',
  },
  {
    title: 'Seguridad Respiratoria',
    href: '/productos?categoria=Respiradores',
    image: '/Seguridad Respiradora-1.jpg',
  },
  {
    title: 'Calzado de Seguridad',
    href: '/productos?categoria=Calzado%20de%20Seguridad',
    image: '/zapatos-1.jpg',
  },
  {
    title: 'Seguridad Vial',
    href: '/productos?categoria=Vial',
    image: '/Seguridad Vial-1.jpg',
  },
];

export function HomeFeaturedCategories() {
  return (
    <section className="bg-white py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="overflow-hidden bg-[#0b2d60]">
          <div className="flex items-end justify-between gap-4 border-b border-white/10 px-5 py-6 sm:px-7 lg:px-9">
            <div className="flex items-center gap-3">
              <span className="hidden h-9 w-1.5 bg-[#F5C400] sm:block" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.26em] text-[#F5C400]">
                  Catálogo Zeus
                </p>
                <h2 className="text-xl font-black uppercase tracking-[0.04em] text-white sm:text-2xl">
                  Categorías destacadas
                </h2>
              </div>
            </div>
            <Link
              href="/productos"
              className="hidden items-center gap-2 bg-[#F5C400] px-4 py-2.5 text-[11px] font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233] sm:inline-flex"
            >
              Ver catálogo
              <ArrowRight className="h-3.5 w-3.5 animate-[bounceX_1s_ease-in-out_infinite]" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:gap-5 sm:p-6 lg:grid-cols-4 lg:p-8">
            {featured.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group relative block aspect-[3/4] overflow-hidden"
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  quality={100}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
