'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

type ApiProduct = {
  ID: number;
  NOMBRE: string;
  CATEGORIA: string;
  IMG_URL: string;
};

type CategoryItem = {
  apiCategory: string;
  label: string;
  hrefCategory: string;
  image: string;
  productName: string;
  count: number;
};

const CATEGORY_CONFIG: {
  apiCategory: string;
  label: string;
  hrefCategory: string;
  preferName?: RegExp;
}[] = [
  {
    apiCategory: 'Guantes',
    label: 'Guantes',
    hrefCategory: 'Guantes',
    preferName: /anti.?impacto|nitrilo|anticorte/i,
  },
  {
    apiCategory: 'Lentes',
    label: 'Lentes',
    hrefCategory: 'Lentes',
    preferName: /intensity|lentes/i,
  },
  {
    apiCategory: 'Respiradores',
    label: 'Respiradores',
    hrefCategory: 'Respiradores',
    preferName: /^respirador/i,
  },
  {
    apiCategory: 'Corporal',
    label: 'Protección Corporal',
    hrefCategory: 'Protección de Cabeza',
    preferName: /^casco de seguridad/i,
  },
  {
    apiCategory: 'Calzado',
    label: 'Calzado',
    hrefCategory: 'Calzado de Seguridad',
    preferName: /dielectrico|dieléctrico|bota|zapato/i,
  },
  {
    apiCategory: 'Auditivo',
    label: 'Protección Auditiva',
    hrefCategory: 'Auditivo',
    preferName: /tap[oó]n|orejera/i,
  },
  {
    apiCategory: 'Vial',
    label: 'Señalización Vial',
    hrefCategory: 'Vial',
    preferName: /cono|chaleco|barra/i,
  },
  {
    apiCategory: 'Laboral',
    label: 'Equipo Laboral',
    hrefCategory: 'Laboral',
    preferName: /camilla|linterna/i,
  },
];

function hasImage(url?: string | null) {
  return Boolean(url && String(url).trim());
}

function safeImageUrl(url: string) {
  const trimmed = url.trim();
  try {
    return encodeURI(decodeURI(trimmed));
  } catch {
    return encodeURI(trimmed);
  }
}

function pickProduct(
  products: ApiProduct[],
  preferName?: RegExp,
): ApiProduct | null {
  const withImg = products.filter((p) => hasImage(p.IMG_URL));
  if (!withImg.length) return null;
  if (preferName) {
    const preferred = withImg.find((p) => preferName.test(p.NOMBRE));
    if (preferred) return preferred;
  }
  return withImg[0];
}

function buildCategories(products: ApiProduct[]): CategoryItem[] {
  const items: CategoryItem[] = [];

  for (const cfg of CATEGORY_CONFIG) {
    const inCat = products.filter((p) => p.CATEGORIA === cfg.apiCategory);
    const pick = pickProduct(inCat, cfg.preferName);
    if (!pick) continue;

    items.push({
      apiCategory: cfg.apiCategory,
      label: cfg.label,
      hrefCategory: cfg.hrefCategory,
      image: safeImageUrl(pick.IMG_URL),
      productName: pick.NOMBRE,
      count: inCat.length,
    });
  }

  return items;
}

export function HomeCategoryStrip() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [items, setItems] = useState<CategoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 8);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  };

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          'https://productoscrud-2946605267.us-central1.run.app?metodo=LISTADO_PRODUCTOS_ESTATICA',
        );
        if (!res.ok) throw new Error('Error al cargar categorías');
        const data = (await res.json()) as ApiProduct[];
        if (cancelled || !Array.isArray(data)) return;
        setItems(buildCategories(data));
      } catch {
        if (!cancelled) setItems([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', updateArrows, { passive: true });
    window.addEventListener('resize', updateArrows);
    return () => {
      el.removeEventListener('scroll', updateArrows);
      window.removeEventListener('resize', updateArrows);
    };
  }, [items, loading]);

  const scrollBy = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({
      left: dir * Math.min(el.clientWidth * 0.65, 380),
      behavior: 'smooth',
    });
  };

  return (
    <section
      id="categorias-inicio"
      className="relative z-20 -mt-16 scroll-mt-24 bg-transparent sm:-mt-24 lg:-mt-28"
    >
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="bg-white shadow-[0_20px_55px_rgba(11,45,96,0.16)] ring-1 ring-[#0b2d60]/10">
          <div className="flex items-center justify-between gap-4 border-b border-slate-100 px-5 py-4 sm:px-8 lg:px-10">
            <div className="flex items-center gap-3">
              <span className="hidden h-8 w-1.5 bg-[#F5C400] sm:block" />
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
                  Catálogo Zeus
                </p>
                <h2 className="text-base font-black uppercase tracking-[0.04em] text-[#0b2d60] sm:text-lg">
                  Categorías de productos
                </h2>
              </div>
            </div>

            <Link
              href="/productos"
              className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:text-[#F5C400]"
            >
              Ver todo
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          <div className="relative px-3 py-5 sm:px-6 sm:py-6 lg:px-8">
            {canPrev && (
              <button
                type="button"
                onClick={() => scrollBy(-1)}
                aria-label="Categorías anteriores"
                className="absolute left-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-[#0b2d60] text-white shadow-lg transition-colors hover:bg-[#F5C400] hover:text-[#0b2d60] sm:left-3"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2.5} />
              </button>
            )}
            {canNext && (
              <button
                type="button"
                onClick={() => scrollBy(1)}
                aria-label="Siguientes categorías"
                className="absolute right-2 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center bg-[#0b2d60] text-white shadow-lg transition-colors hover:bg-[#F5C400] hover:text-[#0b2d60] sm:right-3"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2.5} />
              </button>
            )}

            {loading ? (
              <div className="flex gap-4 overflow-hidden px-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex w-[130px] shrink-0 flex-col items-center sm:w-[150px]"
                  >
                    <div className="h-28 w-full animate-pulse bg-slate-100" />
                    <div className="mt-3 h-3 w-16 animate-pulse bg-slate-100" />
                  </div>
                ))}
              </div>
            ) : (
              <div
                ref={scrollerRef}
                className="flex gap-2 overflow-x-auto scroll-smooth px-1 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-3 lg:gap-2 xl:justify-between xl:overflow-visible [&::-webkit-scrollbar]:hidden"
              >
                {items.map((item, index) => (
                  <motion.div
                    key={item.apiCategory}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className="w-[132px] shrink-0 sm:w-[148px] xl:w-auto xl:min-w-0 xl:flex-1"
                  >
                    <Link
                      href={`/productos?categoria=${encodeURIComponent(item.hrefCategory)}`}
                      className="group flex h-full flex-col items-center px-2 py-2 text-center transition-colors hover:bg-[#0b2d60]/[0.03]"
                    >
                      {/* Fondo blanco = mismo fondo de las fotos → desaparece el cuadrado */}
                      <span className="relative mb-3 flex h-[112px] w-full items-center justify-center sm:h-[124px]">
                        <span className="pointer-events-none absolute inset-x-4 bottom-1 h-3 rounded-[100%] bg-[#0b2d60]/10 blur-[6px] transition-opacity group-hover:bg-[#0b2d60]/20" />
                        <span className="relative z-10 h-full w-full">
                          <Image
                            src={item.image}
                            alt={item.productName}
                            fill
                            sizes="148px"
                            className="object-contain mix-blend-multiply transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-[1.04]"
                            unoptimized
                          />
                        </span>
                      </span>

                      <span className="max-w-[9.5rem] text-[11px] font-bold uppercase leading-snug tracking-[0.04em] text-[#0b2d60] transition-colors group-hover:text-[#0b2d60] sm:text-xs">
                        {item.label}
                      </span>

                      <span className="mt-1.5 h-0.5 w-6 bg-[#F5C400] transition-all duration-300 group-hover:w-12" />

                      <span className="mt-1.5 text-[10px] font-medium text-slate-400">
                        {item.count} productos
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
