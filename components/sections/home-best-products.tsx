'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowRight,
  Eye,
  Footprints,
  Hand,
  HardHat,
  type LucideIcon,
  Cone,
  Wind,
} from 'lucide-react';
import {
  PRODUCTS_API_URL,
  buildCatalogFromApi,
  type ApiProduct,
  type CatalogProduct,
} from '@/lib/product-catalog';
import { ProductCard } from '@/components/products/product-card';
import { BrandLoader } from '@/components/ui/spinner';

const FILTERS: {
  label: string;
  category: string;
  icon: LucideIcon;
}[] = [
  { label: 'Guantes', category: 'Protección Manual', icon: Hand },
  { label: 'Calzado', category: 'Calzado de Seguridad', icon: Footprints },
  { label: 'Corporal', category: 'Protección Corporal', icon: HardHat },
  { label: 'Respiratoria', category: 'Protección Respiratoria', icon: Wind },
  { label: 'Visual', category: 'Protección Visual', icon: Eye },
  { label: 'Vial', category: 'Seguridad Vial', icon: Cone },
];

const VISIBLE = 5;
const AUTO_MS = 5500;

function hasImage(url?: string) {
  return Boolean(url && url.trim());
}

export function HomeBestProducts() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(PRODUCTS_API_URL);
        if (!res.ok) throw new Error('Error al cargar productos');
        const data = (await res.json()) as ApiProduct[];
        if (cancelled || !Array.isArray(data)) return;
        setProducts(buildCatalogFromApi(data).filter((p) => hasImage(p.image)));
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

  const availableFilters = useMemo(() => {
    return FILTERS.filter((f) =>
      products.some(
        (p) => p.category.toLowerCase() === f.category.toLowerCase(),
      ),
    );
  }, [products]);

  useEffect(() => {
    if (activeIndex >= availableFilters.length) {
      setActiveIndex(0);
    }
  }, [availableFilters.length, activeIndex]);

  const activeFilter = availableFilters[activeIndex] ?? FILTERS[0];

  const visibleProducts = useMemo(() => {
    const filtered = products.filter(
      (p) => p.category.toLowerCase() === activeFilter.category.toLowerCase(),
    );
    return filtered.slice(0, VISIBLE);
  }, [products, activeFilter]);

  const goToFilter = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (paused || availableFilters.length <= 1) return;
    const t = window.setInterval(() => {
      setActiveIndex((i) => (i + 1) % availableFilters.length);
    }, AUTO_MS);
    return () => window.clearInterval(t);
  }, [paused, availableFilters.length]);

  return (
    <section
      id="mejores-productos"
      className="scroll-mt-24 bg-[#f4f6f9] py-6 sm:py-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto max-w-[1600px] px-2 sm:px-3 lg:px-5 xl:px-6">
        <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex flex-col gap-4 border-b border-slate-100 bg-gradient-to-r from-[#0b2d60]/[0.03] to-transparent px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <span className="hidden h-9 w-1.5 rounded-full bg-[#F5C400] sm:block" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
                  Selección Zeus
                </p>
                <h2 className="text-lg font-black uppercase tracking-[0.04em] text-[#0b2d60] sm:text-xl">
                  Mejores productos
                </h2>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {availableFilters.map((filter, i) => {
                const active = i === activeIndex;
                const Icon = filter.icon;
                return (
                  <button
                    key={filter.category}
                    type="button"
                    onClick={() => goToFilter(i)}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[11px] font-bold uppercase tracking-wide transition-all duration-200 sm:text-xs ${
                      active
                        ? 'border border-[#F5C400] bg-[#FFF6D6] text-[#0b2d60] shadow-[0_2px_10px_rgba(245,196,0,0.25)]'
                        : 'border border-transparent text-[#0b2d60]/70 hover:border-[#0b2d60]/15 hover:bg-slate-50 hover:text-[#0b2d60]'
                    }`}
                  >
                    <Icon
                      className={`h-3.5 w-3.5 ${active ? 'text-[#F5C400]' : 'text-[#0b2d60]/55'}`}
                      strokeWidth={2.4}
                    />
                    {filter.label}
                  </button>
                );
              })}
            </div>

            <Link
              href={`/productos?categoria=${encodeURIComponent(activeFilter.category)}`}
              className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-[#F5C400] py-2 pl-4 pr-2 text-[11px] font-bold uppercase tracking-wide text-[#0b2d60] transition-all hover:bg-[#ffd233] hover:shadow-[0_4px_16px_rgba(245,196,0,0.35)]"
            >
              Ver catálogo
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F5C400] text-[#0b2d60]">
                <ArrowRight className="h-3.5 w-3.5 animate-[bounceX_1s_ease-in-out_infinite]" />
              </span>
            </Link>
          </div>

          <div className="relative px-3 py-5 sm:px-4 lg:px-6">
            {loading ? (
              <div className="flex min-h-[320px] items-center justify-center">
                <BrandLoader label="Cargando mejores productos" />
              </div>
            ) : visibleProducts.length === 0 ? (
              <div className="p-10 text-center text-sm text-slate-500">
                No hay productos en esta categoría por ahora.
              </div>
            ) : (
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilter.category}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-4"
                >
                  {visibleProducts.map((product) => (
                    <ProductCard key={product.groupSlug} product={product} />
                  ))}
                </motion.div>
              </AnimatePresence>
            )}

            {availableFilters.length > 1 && (
              <div className="mt-6 flex justify-center gap-2 border-t border-slate-100 pt-5">
                {availableFilters.map((filter, i) => (
                  <button
                    key={filter.category}
                    type="button"
                    onClick={() => goToFilter(i)}
                    aria-label={`Ver ${filter.label}`}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === activeIndex
                        ? 'w-8 bg-[#F5C400]'
                        : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
