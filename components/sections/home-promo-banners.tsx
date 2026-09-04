'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Plus } from 'lucide-react';

type PromoBanner = {
  title: string;
  brief: string;
  href: string;
  image: string;
};

const col1: PromoBanner = {
  title: 'Guantes Zeus',
  brief:
    'Para cada trabajo pesado hay un guante marca Zeus Safety. Cotiza la línea completa.',
  href: '/productos?categoria=Protecci%C3%B3n%20Manual',
  image: '/Zeus-seccion-pronto4.jpg',
};

const col2: PromoBanner = {
  title: 'Calzado industrial',
  brief:
    'Listas para cualquier situación. Buffalo, Guardian y más modelos certificados.',
  href: '/productos?categoria=Calzado%20de%20Seguridad',
  image: '/seccion-pronto-3.jpg',
};

const col3: PromoBanner[] = [
  {
    title: 'Delivery Zeus',
    brief:
      'Delivery en la puerta de tu negocio. Entregas a Lima y provincias a tiempo.',
    href: '/productos',
    image: '/delivery-seccion-pronto.jpg',
  },
  {
    title: 'Seguridad dieléctrica',
    brief:
      'Calzado dieléctrico para operaciones eléctricas con protección confiable.',
    href: '/productos?categoria=Calzado%20de%20Seguridad',
    image: '/zeus-electric-seccion-pronto.jpg',
  },
];

function PromoCard({
  banner,
  tall,
}: {
  banner: PromoBanner;
  tall?: boolean;
}) {
  return (
    <Link
      href={banner.href}
      className={`group relative block overflow-hidden rounded-md shadow-[0_10px_32px_rgba(11,45,96,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(11,45,96,0.22)] ${
        tall ? 'h-full min-h-[520px] lg:min-h-[640px]' : 'min-h-[250px] lg:min-h-[310px]'
      }`}
    >
      <Image
        src={banner.image}
        alt={banner.title}
        fill
        sizes="(max-width: 1024px) 100vw, 33vw"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        quality={95}
      />

      {/* Overlay oscuro al hover */}
      <div className="absolute inset-0 bg-[#0b2d60]/0 transition-colors duration-300 group-hover:bg-[#0b2d60]/55" />

      {/* Barra inferior: solo el + en reposo; al hover se alza con texto */}
      <div className="absolute inset-x-0 bottom-0 translate-y-[calc(100%-2.75rem)] bg-gradient-to-t from-black/85 via-black/60 to-transparent px-4 pb-3.5 pt-12 transition-transform duration-300 ease-out group-hover:translate-y-0">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-sm font-black uppercase tracking-wide text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:text-base">
            {banner.title}
          </h3>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-[#F5C400] text-[#0b2d60] transition-transform duration-300 group-hover:rotate-90">
            <Plus className="h-4 w-4" strokeWidth={2.5} />
          </span>
        </div>
        <p className="mt-2 max-h-0 overflow-hidden text-xs leading-relaxed text-white/85 opacity-0 transition-all duration-300 group-hover:max-h-24 group-hover:opacity-100">
          {banner.brief}
        </p>
      </div>
    </Link>
  );
}

export function HomePromoBanners() {
  return (
    <section className="bg-white py-8 sm:py-10">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
              Campañas Zeus
            </p>
            <h2 className="mt-1 text-lg font-black uppercase tracking-wide text-[#0b2d60] sm:text-xl">
              Destacados de la temporada
            </h2>
          </div>

          <Link
            href="/productos"
            className="group relative inline-flex h-11 items-center gap-2 overflow-hidden rounded-md bg-[#F5C400] px-5 text-[11px] font-bold uppercase tracking-wide text-[#0b2d60] shadow-[0_6px_18px_rgba(245,196,0,0.3)] transition-all hover:bg-[#ffd233] hover:shadow-[0_8px_22px_rgba(245,196,0,0.4)]"
          >
            <span
              aria-hidden
              className="absolute inset-0 origin-left scale-x-0 bg-[#ffd233] transition-transform duration-300 group-hover:scale-x-100"
            />
            <span className="relative">Ver todo el catálogo</span>
            <ArrowRight className="relative h-4 w-4 animate-[bounceX_1s_ease-in-out_infinite]" />
          </Link>
        </div>

        {/* 3 columnas: img1 | img2 | img3+img4 apiladas */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5 lg:items-stretch">
          <PromoCard banner={col1} tall />
          <PromoCard banner={col2} tall />
          <div className="grid grid-rows-2 gap-4 lg:gap-5">
            <PromoCard banner={col3[0]} />
            <PromoCard banner={col3[1]} />
          </div>
        </div>
      </div>
    </section>
  );
}
