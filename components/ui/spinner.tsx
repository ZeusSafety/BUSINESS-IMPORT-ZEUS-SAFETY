'use client';

type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
};

const SIZE = {
  sm: 'h-8 w-8',
  md: 'h-12 w-12',
  lg: 'h-16 w-16',
} as const;

/** Spinner circular Zeus — sin texto, reutilizable */
export function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  return (
    <div
      role="status"
      aria-label="Cargando"
      className={`relative ${SIZE[size]} ${className}`}
    >
      <span className="absolute inset-0 rounded-full border-[3px] border-slate-200" />
      <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-[#0b2d60] border-r-[#0b2d60]" />
      <span className="absolute inset-[5px] animate-[spin_0.85s_linear_infinite_reverse] rounded-full border-[2.5px] border-transparent border-b-[#F5C400] border-l-[#F5C400]" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="h-1.5 w-1.5 rounded-full bg-[#0b2d60]" />
      </span>
      <span className="sr-only">Cargando</span>
    </div>
  );
}

type PageLoaderProps = {
  className?: string;
  minHeight?: string;
};

/** Pantalla de carga centrada (solo spinner) */
export function PageLoader({
  className = '',
  minHeight = 'min-h-[50vh]',
}: PageLoaderProps) {
  return (
    <div
      className={`flex ${minHeight} items-center justify-center ${className}`}
      role="status"
      aria-busy="true"
    >
      <Spinner size="lg" />
    </div>
  );
}
