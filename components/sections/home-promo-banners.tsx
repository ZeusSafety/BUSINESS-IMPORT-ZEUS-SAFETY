'use client';

import Link from 'next/link';

type PromoTile = {
  title: string;
  subtitle: string;
  href: string;
  bg: string;
};

const largeTiles: PromoTile[] = [
  {
    title: 'Guantes industriales',
    subtitle: 'Línea de protección manual',
    href: '/productos?categoria=Guantes',
    bg: 'bg-[#F5C400]',
  },
  {
    title: 'Calzado de seguridad',
    subtitle: 'Buffalo · Guardian · Tokio',
    href: '/productos?categoria=Calzado%20de%20Seguridad',
    bg: 'bg-[#0b2d60]',
  },
];

const smallTiles: PromoTile[] = [
  {
    title: 'Seguridad vial',
    subtitle: 'Señalización y tránsito',
    href: '/productos?categoria=Vial',
    bg: 'bg-[#1a2744]',
  },
  {
    title: 'Protección respiratoria',
    subtitle: 'Mascarillas y filtros',
    href: '/productos?categoria=Respiradores',
    bg: 'bg-[#0e3d2a]',
  },
];

function PlaceholderMark() {
  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
      <span className="border border-white/35 bg-black/25 px-4 py-2 text-[11px] font-black uppercase tracking-[0.22em] text-white">
        Próximamente
      </span>
    </div>
  );
}

function PromoCard({
  tile,
  tall,
  light,
}: {
  tile: PromoTile;
  tall?: boolean;
  light?: boolean;
}) {
  const text = light ? 'text-[#0b2d60]' : 'text-white';
  const sub = light ? 'text-[#0b2d60]/70' : 'text-white/70';

  return (
    <Link
      href={tile.href}
      className={`group relative block h-full overflow-hidden ${tile.bg} ${
        tall ? 'min-h-[280px] lg:min-h-[320px]' : 'min-h-[134px] lg:h-full lg:min-h-[154px]'
      }`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08)_0%,transparent_45%)]" />
      <div className="relative z-10 flex h-full flex-col justify-between p-5 sm:p-6">
        <div>
          <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${sub}`}>
            Catálogo Zeus
          </p>
          <h3
            className={`mt-2 max-w-[70%] text-xl font-black uppercase leading-tight tracking-wide ${text} sm:text-2xl`}
          >
            {tile.title}
          </h3>
          <p className={`mt-1 max-w-[70%] text-sm ${sub}`}>{tile.subtitle}</p>
        </div>
        <span
          className={`inline-flex w-fit items-center bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-[#0b2d60] transition-colors group-hover:bg-[#F5C400]`}
        >
          Ver catálogo →
        </span>
      </div>
      <PlaceholderMark />
    </Link>
  );
}

export function HomePromoBanners() {
  return (
    <section className="bg-white py-6 sm:py-8">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          <PromoCard tile={largeTiles[0]} tall light />
          <PromoCard tile={largeTiles[1]} tall />
          <div className="grid h-full gap-3 lg:min-h-[320px]">
            <PromoCard tile={smallTiles[0]} />
            <PromoCard tile={smallTiles[1]} />
          </div>
        </div>
      </div>
    </section>
  );
}
