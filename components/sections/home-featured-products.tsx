'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Star,
} from 'lucide-react';
import { useQuoteStore } from '@/store/quoteStore';
import type { Product } from '@/lib/mockData';
import { formatSoles, getDisplayPrice } from '@/lib/display-price';
import { Spinner } from '@/components/ui/spinner';

type ApiProduct = {
  ID: number;
  NOMBRE: string;
  CATEGORIA: string;
  TIPO_PRODUCTO: string;
  COLOR_TIPO: string;
  PARES_POR_CAJA: number;
  FICHA_TECNICA_ENLACE: string;
  IMG_URL: string;
  DESCRIPCION: string | null;
  PRECIO: string;
};

function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function mapCategory(apiCategory: string): string {
  const categoryMap: Record<string, string> = {
    Corporal: 'Protección Corporal',
    Guantes: 'Guantes',
    Lentes: 'Lentes',
    Visual: 'Lentes',
    Respiradores: 'Respiradores',
    Respiratoria: 'Respiradores',
    Auditiva: 'Auditivo',
    Auditivo: 'Auditivo',
    Calzado: 'Calzado',
    Vial: 'Seguridad Vial',
    Laboral: 'Equipo Laboral',
    Manual: 'Guantes',
  };
  return categoryMap[apiCategory] || apiCategory;
}

function transformApiProduct(apiProduct: ApiProduct): Product {
  const apiPrice = parseFloat(apiProduct.PRECIO) || 0;
  const specs: { label: string; value: string }[] = [];

  if (apiProduct.PARES_POR_CAJA) {
    specs.push({
      label: 'Pares por caja',
      value: apiProduct.PARES_POR_CAJA.toString(),
    });
  }
  if (apiProduct.COLOR_TIPO) {
    specs.push({ label: 'Color / Tipo', value: apiProduct.COLOR_TIPO });
  }
  if (apiProduct.TIPO_PRODUCTO) {
    specs.push({ label: 'Tipo', value: apiProduct.TIPO_PRODUCTO });
  }

  const base: Product = {
    id: `prd-${apiProduct.ID}`,
    name: apiProduct.NOMBRE,
    slug: generateSlug(apiProduct.NOMBRE),
    category: mapCategory(apiProduct.CATEGORIA) as Product['category'],
    brand: 'Zeus Safety',
    price: apiPrice,
    certification: [],
    description:
      apiProduct.DESCRIPCION ||
      `EPP certificado — ${apiProduct.TIPO_PRODUCTO || apiProduct.CATEGORIA}`,
    specs,
    image: apiProduct.IMG_URL?.trim() || '',
  };

  return { ...base, price: getDisplayPrice(base) };
}

function hasImage(url?: string) {
  return Boolean(url && url.trim());
}

function useVisibleCount() {
  const [count, setCount] = useState(4);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCount(1);
      else if (w < 1024) setCount(2);
      else if (w < 1280) setCount(3);
      else setCount(4);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return count;
}

const AUTO_PLAY_MS = 5000;
const GAP_PX = 20;

type FeaturedCardProps = {
  product: Product;
  onQuote: (product: Product) => void;
  added: boolean;
};

function FeaturedCard({ product, onQuote, added }: FeaturedCardProps) {
  return (
    <article className="group relative flex h-full min-w-0 flex-col overflow-hidden bg-white shadow-[0_10px_32px_rgba(11,45,96,0.12)] ring-1 ring-[#0b2d60]/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_22px_48px_rgba(11,45,96,0.18)] hover:ring-[#0b2d60]/25">
      {/* Barra superior Zeus */}
      <div className="h-1 w-full bg-[#F5C400]" />

      {/* Zona imagen — pedestal */}
      <div className="relative mx-3 mt-3 overflow-hidden bg-gradient-to-b from-[#eef2f7] via-[#f6f8fb] to-white ring-1 ring-inset ring-slate-200/80 sm:mx-4 sm:mt-4">
        {/* Esquinas decorativas */}
        <span
          aria-hidden
          className="absolute right-0 top-0 z-10 h-7 w-9 bg-[#0b2d60]"
          style={{ clipPath: 'polygon(28% 0, 100% 0, 100% 100%, 0 100%)' }}
        />
        <span
          aria-hidden
          className="absolute right-0 top-0 z-10 h-4 w-6 bg-[#F5C400]"
          style={{ clipPath: 'polygon(32% 0, 100% 0, 100% 100%, 0 100%)' }}
        />

        <span className="absolute left-3 top-3 z-20 inline-flex items-center gap-1 bg-[#0b2d60] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-white shadow-md">
          <Star className="h-2.5 w-2.5 text-[#F5C400]" fill="currentColor" />
          Destacado
        </span>

        <div className="relative aspect-[4/3]">
          {/* Sombra pedestal */}
          <div className="pointer-events-none absolute inset-x-8 bottom-3 h-4 rounded-[100%] bg-[#0b2d60]/15 blur-md transition-all duration-300 group-hover:bg-[#0b2d60]/25 group-hover:blur-lg" />

          <Link
            href={`/productos/${encodeURIComponent(product.slug)}`}
            className="absolute inset-0 z-10 block"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 22vw"
              className="object-contain p-6 pb-8 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.06]"
              unoptimized
            />
          </Link>
        </div>
      </div>

      {/* Contenido */}
      <div className="flex flex-1 flex-col px-4 pb-0 pt-4 sm:px-5 sm:pt-5">
        <span className="inline-flex w-fit bg-[#0b2d60]/[0.07] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.12em] text-[#0b2d60]">
          {product.category}
        </span>

        <Link
          href={`/productos/${encodeURIComponent(product.slug)}`}
          className="mt-2 line-clamp-2 min-h-[2.5rem] text-[13px] font-black uppercase leading-snug text-[#0b2d60] transition-colors hover:text-[#F5C400] sm:text-sm"
        >
          {product.name}
        </Link>

        <p className="mt-2 line-clamp-2 flex-1 text-[11px] leading-relaxed text-slate-500 sm:text-xs">
          {product.description}
        </p>
      </div>

      {/* Pie con precio — ancla visual */}
      <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 bg-gradient-to-r from-[#f8fafc] to-white px-4 py-3.5 sm:px-5">
        <div>
          <p className="text-[9px] font-semibold uppercase tracking-wide text-slate-400">
            Desde
          </p>
          <p className="text-lg font-black leading-none text-[#0b2d60] sm:text-xl">
            {formatSoles(product.price)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => onQuote(product)}
          className="inline-flex h-10 shrink-0 items-center gap-1.5 bg-[#F5C400] px-4 text-[10px] font-bold uppercase tracking-wide text-[#0b2d60] shadow-[0_4px_14px_rgba(245,196,0,0.45)] transition-all hover:bg-[#0b2d60] hover:text-[#F5C400] hover:shadow-[0_4px_14px_rgba(11,45,96,0.25)]"
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          Cotizar
        </button>
      </div>

      {added && (
        <div className="bg-emerald-50 px-4 py-2 text-center text-[10px] font-bold uppercase tracking-wide text-emerald-700">
          ✓ Agregado a cotización
        </div>
      )}
    </article>
  );
}

export function HomeFeaturedProducts() {
  const addItem = useQuoteStore((state) => state.addItem);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [addedId, setAddedId] = useState<string | null>(null);
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

        const withImg = data
          .map(transformApiProduct)
          .filter((p) => hasImage(p.image))
          .slice(0, 12);
        setProducts(withImg);
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

  const handleQuote = (product: Product) => {
    addItem(product);
    setAddedId(product.id);
    window.setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section
      id="productos-destacados"
      className="scroll-mt-24 bg-[#f4f6f9] py-6 sm:py-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-12">
        {loading ? (
          <div className="bg-white shadow-[0_24px_65px_rgba(11,45,96,0.2)] ring-1 ring-[#0b2d60]/12">
            <div className="flex min-h-[360px] items-center justify-center px-5 py-10">
              <Spinner size="lg" />
            </div>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white p-12 text-center text-slate-400 shadow-[0_24px_65px_rgba(11,45,96,0.2)] ring-1 ring-[#0b2d60]/12">
            No hay productos destacados disponibles.
          </div>
        ) : (
          <div className="relative overflow-hidden bg-white shadow-[0_24px_65px_rgba(11,45,96,0.2)] ring-1 ring-[#0b2d60]/12">
            {/* Encabezado — mismo estilo que categorías */}
            <div className="flex items-center justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-[#0b2d60]/[0.03] to-transparent px-5 py-4 sm:px-8 lg:px-10">
              <div className="flex items-center gap-3">
                <span className="hidden h-9 w-1.5 bg-[#F5C400] sm:block" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
                    Selección Zeus
                  </p>
                  <h2 className="text-lg font-black uppercase tracking-[0.04em] text-[#0b2d60] sm:text-xl">
                    Productos destacados
                  </h2>
                  <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
                    Los EPP más pedidos — cotiza directo desde cada tarjeta
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {products.length > visibleCount && (
                  <>
                    <button
                      type="button"
                      onClick={prev}
                      aria-label="Anterior"
                      className="flex h-9 w-9 items-center justify-center bg-[#0b2d60] text-white shadow-lg transition-colors hover:bg-[#F5C400] hover:text-[#0b2d60]"
                    >
                      <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
                    </button>
                    <button
                      type="button"
                      onClick={next}
                      aria-label="Siguiente"
                      className="flex h-9 w-9 items-center justify-center bg-[#0b2d60] text-white shadow-lg transition-colors hover:bg-[#F5C400] hover:text-[#0b2d60]"
                    >
                      <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
                    </button>
                  </>
                )}
                <Link
                  href="/productos"
                  className="group hidden items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:text-[#F5C400] sm:inline-flex"
                >
                  Ver catálogo
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            {/* Carrusel */}
            <div className="relative px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(11,45,96,0.03)_0%,transparent_55%)]"
              />

              <div className="relative">
                {products.length > visibleCount && (
                  <>
                    <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-5 bg-gradient-to-r from-white to-transparent sm:w-8" />
                    <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-5 bg-gradient-to-l from-white to-transparent sm:w-8" />
                  </>
                )}

                <div ref={containerRef} className="relative overflow-hidden">
                  <motion.div
                    className="flex items-stretch"
                    style={{ gap: GAP_PX }}
                    animate={{ x: -currentIndex * stepPx }}
                    transition={{ duration: 0.55, ease: [0.32, 0.72, 0, 1] }}
                  >
                    {products.map((product) => (
                      <div
                        key={product.id}
                        className="shrink-0 py-0.5"
                        style={{
                          width: `calc((100% - ${(visibleCount - 1) * GAP_PX}px) / ${visibleCount})`,
                        }}
                      >
                        <FeaturedCard
                          product={product}
                          onQuote={handleQuote}
                          added={addedId === product.id}
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {totalPages > 1 && (
                <div className="relative mt-6 space-y-3 border-t border-slate-100 pt-5">
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
                        className={`h-1.5 transition-all duration-300 ${
                          i === currentIndex
                            ? 'w-8 bg-[#0b2d60]'
                            : 'w-1.5 bg-slate-300 hover:bg-slate-400'
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
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
