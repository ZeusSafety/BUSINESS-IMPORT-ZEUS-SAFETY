'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  buildCatalogFromApi,
  type ApiProduct,
  type CatalogProduct,
} from '@/lib/product-catalog';
import { ProductCard } from '@/components/products/product-card';
import { BrandLoader } from '@/components/ui/spinner';

function hasImage(url?: string) {
  return Boolean(url && url.trim());
}

function useVisibleCount() {
  const [count, setCount] = useState(5);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCount(1);
      else if (w < 768) setCount(2);
      else if (w < 1024) setCount(3);
      else if (w < 1280) setCount(4);
      else setCount(5);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return count;
}

const AUTO_PLAY_MS = 5000;
const GAP_PX = 14;

export function HomeFeaturedProducts() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [progress, setProgress] = useState(0);
  const visibleCount = useVisibleCount();
  const containerRef = useRef<HTMLDivElement>(null);
  const [stepPx, setStepPx] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          'https://productoscrud-2946605267.us-central1.run.app?metodo=PRODUCTOS_ESTRELLA',
        );
        if (!res.ok) throw new Error('Error al cargar productos');
        const data = (await res.json()) as ApiProduct[];
        if (cancelled || !Array.isArray(data)) return;

        const grouped = buildCatalogFromApi(data)
          .filter((p) => hasImage(p.image))
          .slice(0, 12);
        setProducts(grouped);
      } catch {
        if (!cancelled) setProducts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  const maxIndex = Math.max(0, products.length - visibleCount);
  const totalPages = maxIndex + 1;

  const goTo = useCallback(
    (index: number) => {
      if (!products.length) return;
      const clamped = Math.max(0, Math.min(index, maxIndex));
      setCurrentIndex(clamped);
      setProgress(0);
    },
    [maxIndex, products.length],
  );

  const next = useCallback(() => {
    setCurrentIndex((i) => (i >= maxIndex ? 0 : i + 1));
    setProgress(0);
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i <= 0 ? maxIndex : i - 1));
    setProgress(0);
  }, [maxIndex]);

  useEffect(() => {
    setCurrentIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const w = el.offsetWidth;
      const cardW = (w - (visibleCount - 1) * GAP_PX) / visibleCount;
      setStepPx(cardW + GAP_PX);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [visibleCount, products.length, loading]);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);

    if (isPaused || products.length <= visibleCount) return;

    const step = 100 / (AUTO_PLAY_MS / 50);
    progressRef.current = setInterval(() => {
      setProgress((p) => (p >= 100 ? 0 : Math.min(p + step, 100)));
    }, 50);

    intervalRef.current = setInterval(next, AUTO_PLAY_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [currentIndex, isPaused, next, products.length, visibleCount]);

  return (
    <section
      id="productos-destacados"
      className="scroll-mt-24 bg-[#f3f5f8] py-10 sm:py-12 lg:py-14"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-10 xl:px-14">
        <div className="overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_12px_40px_rgba(11,45,96,0.08)]">
          {/* Encabezado */}
          <div className="flex flex-col gap-4 border-b border-slate-100 bg-gradient-to-r from-[#0b2d60]/[0.04] via-white to-[#F5C400]/[0.06] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7 lg:px-8">
            <div className="flex items-center gap-3">
              <span className="hidden h-10 w-1.5 rounded-full bg-[#F5C400] sm:block" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
                  Selección Zeus
                </p>
                <h2 className="text-lg font-black uppercase tracking-[0.04em] text-[#0b2d60] sm:text-xl">
                  Productos destacados
                </h2>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2.5">
              {products.length > visibleCount && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Anterior"
                    className="zeus-arrow-btn flex h-10 w-10 items-center justify-center rounded-full bg-[#0b2d60] text-white hover:bg-[#103a7b]"
                    style={{ '--arrow-hover-x': '-3px' } as CSSProperties}
                  >
                    <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Siguiente"
                    className="zeus-arrow-btn flex h-10 w-10 items-center justify-center rounded-full bg-[#F5C400] text-[#0b2d60] hover:bg-[#ffd233]"
                    style={{ '--arrow-hover-x': '3px' } as CSSProperties}
                  >
                    <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
                  </button>
                </>
              )}
              <Link
                href="/productos"
                className="group/btn relative hidden items-center gap-2 overflow-hidden rounded-full bg-[#F5C400] py-2.5 pl-4 pr-2.5 text-[11px] font-bold uppercase tracking-wide text-[#0b2d60] transition-all hover:shadow-[0_4px_16px_rgba(245,196,0,0.35)] sm:inline-flex"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 origin-left scale-x-0 bg-white/35 transition-transform duration-300 ease-out group-hover/btn:scale-x-100"
                />
                <span className="relative z-10">Ver catálogo</span>
                <span className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full bg-[#0b2d60] text-[#F5C400]">
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            </div>
          </div>

          {/* Contenido */}
          <div className="px-4 py-5 sm:px-6 sm:py-6 lg:px-7">
            {loading ? (
              <div className="flex min-h-[320px] items-center justify-center">
                <BrandLoader label="Cargando destacados" />
              </div>
            ) : products.length === 0 ? (
              <p className="py-16 text-center text-slate-400">
                No hay productos destacados disponibles.
              </p>
            ) : (
              <>
                <div ref={containerRef} className="relative overflow-hidden">
                  <motion.div
                    className="flex items-stretch"
                    style={{ gap: GAP_PX }}
                    animate={{ x: -currentIndex * stepPx }}
                    transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                  >
                    {products.map((product) => (
                      <div
                        key={product.groupSlug}
                        className="shrink-0"
                        style={{
                          width: `calc((100% - ${(visibleCount - 1) * GAP_PX}px) / ${visibleCount})`,
                        }}
                      >
                        <ProductCard product={product} />
                      </div>
                    ))}
                  </motion.div>
                </div>

                {totalPages > 1 && (
                  <div className="mt-6 space-y-3 border-t border-slate-100 pt-5">
                    <div className="h-0.5 w-full overflow-hidden bg-slate-100">
                      <div
                        className="h-full bg-[#F5C400] transition-none"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <div className="flex flex-wrap items-center justify-center gap-2">
                      {Array.from({ length: totalPages }).map((_, i) => (
                        <button
                          key={i}
                          type="button"
                          onClick={() => goTo(i)}
                          aria-label={`Página ${i + 1}`}
                          className={`h-2.5 rounded-full transition-all duration-300 ${
                            i === currentIndex
                              ? 'w-8 bg-[#0b2d60]'
                              : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 flex justify-center sm:hidden">
                  <Link
                    href="/productos"
                    className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#0b2d60]"
                  >
                    Ver catálogo
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
