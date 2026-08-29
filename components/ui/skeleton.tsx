'use client';

import { BrandLoader } from '@/components/ui/spinner';

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] zeus-shimmer ${className}`}
      aria-hidden
    />
  );
}

function LoadingOverlay({ label }: { label: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-white/75 backdrop-blur-[2px]">
      <BrandLoader label={label} />
    </div>
  );
}

/** Card skeleton alineada al ProductCard del catálogo */
export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden border border-slate-200 bg-white">
      <div className="relative aspect-[4/3] bg-slate-50">
        <Skeleton className="absolute left-0 top-0 h-6 w-24" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="h-16 w-16 opacity-60" />
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center px-3 py-3">
        <Skeleton className="h-4 w-[80%] max-w-[180px]" />
        <Skeleton className="mt-2 h-4 w-[55%] max-w-[140px]" />
        <div className="mt-3 flex gap-1.5">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-20" />
        </div>
        <Skeleton className="mt-4 h-9 w-[140px]" />
        <Skeleton className="mt-2 h-10 w-full" />
      </div>
    </div>
  );
}

type ProductGridSkeletonProps = {
  count?: number;
  columns?: 2 | 3 | 4 | 5;
  showSpinner?: boolean;
  label?: string;
};

const GRID: Record<2 | 3 | 4 | 5, string> = {
  2: 'grid grid-cols-1 gap-5 sm:grid-cols-2',
  3: 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  5: 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
};

/** Skeleton de grilla de productos + loader corporativo Zeus */
export function ProductGridSkeleton({
  count = 8,
  columns = 4,
  showSpinner = true,
  label = 'Cargando catálogo',
}: ProductGridSkeletonProps) {
  return (
    <div className="relative" role="status" aria-busy="true" aria-label="Cargando">
      {showSpinner && <LoadingOverlay label={label} />}
      <div className={GRID[columns]}>
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
      <span className="sr-only">Cargando productos</span>
    </div>
  );
}

/** Skeleton para detalle de producto */
export function ProductDetailSkeleton() {
  return (
    <div
      className="relative mx-auto max-w-[1600px] px-6 py-10 lg:px-10 xl:px-12"
      role="status"
      aria-busy="true"
      aria-label="Cargando"
    >
      <LoadingOverlay label="Cargando producto" />

      <div className="mb-6 flex gap-2">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="h-3 w-3" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-3" />
        <Skeleton className="h-3 w-32" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <Skeleton className="aspect-[4/3] w-full sm:aspect-square lg:min-h-[480px]" />
        <div className="space-y-4 pt-2">
          <Skeleton className="h-3 w-28" />
          <Skeleton className="h-9 w-[90%]" />
          <Skeleton className="h-9 w-[65%]" />
          <div className="flex gap-2 pt-1">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-6 w-24" />
          </div>
          <Skeleton className="mt-4 h-20 w-full" />
          <div className="flex gap-3 pt-2">
            <Skeleton className="h-12 w-[140px]" />
            <Skeleton className="h-12 flex-1" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-12 flex-1" />
            <Skeleton className="h-12 flex-1" />
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2 border-t border-slate-200 pt-6">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
      <span className="sr-only">Cargando producto</span>
    </div>
  );
}
