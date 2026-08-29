'use client';

import Image from 'next/image';

type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const SIZE = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
} as const;

/** Spinner cuadrado Zeus — para usos compactos */
export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Cargando"
      className={`relative ${SIZE[size]} ${className}`}
    >
      <span className="absolute inset-0 border-[3px] border-slate-200" />
      <span className="absolute inset-0 animate-spin border-[3px] border-transparent border-t-[#0b2d60] border-r-[#0b2d60]" />
      <span className="absolute inset-[5px] animate-[spin_0.85s_linear_infinite_reverse] border-[2.5px] border-transparent border-b-[#F5C400] border-l-[#F5C400]" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="h-1.5 w-1.5 bg-[#0b2d60]" />
      </span>
      <span className="sr-only">Cargando</span>
    </div>
  );
}

type BrandLoaderProps = {
  label?: string;
  className?: string;
};

/** Loader corporativo Zeus — logo, barra de progreso y texto */
export function BrandLoader({
  label = 'Cargando contenido',
  className = '',
}: BrandLoaderProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label={label}
      className={`relative border border-slate-200 bg-white px-8 py-7 shadow-[0_16px_48px_rgba(11,45,96,0.14)] sm:px-10 sm:py-8 ${className}`}
    >
      <span
        aria-hidden
        className="absolute left-0 top-0 h-1 w-full bg-[#0b2d60]"
      />
      <span
        aria-hidden
        className="absolute left-0 top-0 h-1 w-16 bg-[#F5C400]"
      />

      <div className="flex flex-col items-center">
        <div className="relative h-9 w-36 sm:h-10 sm:w-40">
          <Image
            src="/logo_zeus_azul.svg"
            alt="Zeus Safety"
            fill
            className="object-contain object-center"
            priority
          />
        </div>

        <div className="mt-6 h-1 w-44 overflow-hidden bg-slate-100 sm:w-52">
          <div className="zeus-loader-bar h-full w-1/3 bg-[#F5C400]" />
        </div>

        <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.22em] text-[#0b2d60] sm:text-[11px]">
          {label}
        </p>

        <div className="mt-3 flex items-center gap-1.5" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-1 w-1 bg-[#0b2d60]/30 animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      <span className="sr-only">{label}</span>
    </div>
  );
}

type PageLoaderProps = {
  className?: string;
  minHeight?: string;
  label?: string;
};

/** Pantalla de carga centrada — estilo corporativo */
export function PageLoader({
  className = '',
  minHeight = 'min-h-[50vh]',
  label = 'Cargando catálogo',
}: PageLoaderProps) {
  return (
    <div
      className={`flex ${minHeight} items-center justify-center bg-[#f8f9fb] px-4 ${className}`}
      role="status"
      aria-busy="true"
    >
      <BrandLoader label={label} />
    </div>
  );
}
