'use client';

import { Spinner } from '@/components/ui/spinner';

type SkeletonProps = {
  className?: string;
};

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded-sm bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] zeus-shimmer ${className}`}
      aria-hidden
    />
  );
}

/** Card skeleton alineada al ProductCard del catálogo */
export function ProductCardSkeleton() {
  return (
    <div className="flex h-full flex-col overflow-hidden border border-slate-200 bg-white">
      <div className="relative aspect-[4/3] bg-slate-50">
        <Skeleton className="absolute left-0 top-0 h-6 w-24 rounded-none" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="h-20 w-20 rounded-full opacity-60" />
        </div>
      </div>
      <div className="flex flex-1 flex-col items-center px-3 py-3">
        <Skeleton className="h-4 w-[80%] max-w-[180px]" />
        <Skeleton className="mt-2 h-4 w-[55%] max-w-[140px]" />
        <div className="mt-3 flex gap-1.5">
          <Skeleton className="h-5 w-24 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
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
};

const GRID: Record<2 | 3 | 4 | 5, string> = {
  2: 'grid grid-cols-1 gap-5 sm:grid-cols-2',
  3: 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  5: 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5',
};

/** Skeleton de grilla de productos + spinner Zeus opcional */
export function ProductGridSkeleton({
  count = 8,
  columns = 4,
  showSpinner = true,
}: ProductGridSkeletonProps) {
  return (
    <div className="relative" role="status" aria-busy="true" aria-label="Cargando">
      {showSpinner && (
        <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
          <div className="rounded-full bg-white/90 p-4 shadow-lg shadow-[#0b2d60]/10 ring-1 ring-slate-200/80">
            <Spinner size="lg" />
          </div>
        </div>
      )}
      <div className={GRID[columns]}>
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
      <span className="sr-only">Cargando productos</span>
    </div>
  );
}

/** Skeleton simple para detalle de producto */
export function ProductDetailSkeleton() {
  return (
    <div
      className="relative mx-auto max-w-[1600px] px-6 py-10 lg:px-10 xl:px-12"
      role="status"
      aria-busy="true"
      aria-label="Cargando"
    >
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
        <div className="rounded-full bg-white/90 p-4 shadow-lg shadow-[#0b2d60]/10 ring-1 ring-slate-200/80">
          <Spinner size="lg" />
        </div>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <Skeleton className="aspect-square w-full" />
        <div className="space-y-4 pt-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-8 w-[80%]" />
          <Skeleton className="h-8 w-[55%]" />
          <Skeleton className="mt-6 h-24 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
      <span className="sr-only">Cargando producto</span>
    </div>
  );
}
