'use client';

type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const SIZE = {
  sm: 'h-9 w-9',
  md: 'h-14 w-14',
  lg: 'h-[4.5rem] w-[4.5rem]',
} as const;

const RING = {
  sm: 'border-[2.5px]',
  md: 'border-[3px]',
  lg: 'border-[3.5px]',
} as const;

const DOT = {
  sm: 'h-1.5 w-1.5',
  md: 'h-2 w-2',
  lg: 'h-2.5 w-2.5',
} as const;

/** Spinner circular Zeus — azul / amarillo */
export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Cargando"
      className={`relative ${SIZE[size]} ${className}`}
    >
      <span
        aria-hidden
        className={`absolute inset-0 rounded-full border-slate-200/80 ${RING[size]}`}
      />
      <span
        aria-hidden
        className={`absolute inset-0 animate-spin rounded-full border-transparent border-t-[#0b2d60] border-r-[#0b2d60] ${RING[size]}`}
      />
      <span
        aria-hidden
        className={`absolute inset-[5px] animate-[spin_0.9s_linear_infinite_reverse] rounded-full border-transparent border-b-[#F5C400] border-l-[#F5C400] ${RING[size]}`}
      />
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center"
      >
        <span className={`rounded-full bg-[#0b2d60] ${DOT[size]}`} />
      </span>
      <span className="sr-only">Cargando</span>
    </div>
  );
}

type BrandLoaderProps = {
  label?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
};

/** Loader circular corporativo — sin caja ni texto visible */
export function BrandLoader({
  label = 'Cargando',
  className = '',
  size = 'lg',
}: BrandLoaderProps) {
  return (
    <div
      role="status"
      aria-busy="true"
      aria-label={label}
      className={`relative flex items-center justify-center ${className}`}
    >
      <span
        aria-hidden
        className="absolute -inset-3 rounded-full bg-white/90 shadow-[0_12px_40px_rgba(11,45,96,0.12)] ring-1 ring-slate-200/70"
      />
      <Spinner size={size} className="relative z-10" />
      <span className="sr-only">{label}</span>
    </div>
  );
}

type PageLoaderProps = {
  className?: string;
  minHeight?: string;
  label?: string;
};

/** Pantalla de carga centrada — spinner circular */
export function PageLoader({
  className = '',
  minHeight = 'min-h-[50vh]',
  label = 'Cargando',
}: PageLoaderProps) {
  return (
    <div
      className={`flex ${minHeight} items-center justify-center bg-[#f3f5f8] px-4 ${className}`}
      role="status"
      aria-busy="true"
    >
      <BrandLoader label={label} />
    </div>
  );
}
