'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Loader2,
  Plus,
  ShieldCheck,
  Star,
  Truck,
} from 'lucide-react';
import { useQuoteStore } from '@/store/quoteStore';
import type { Product } from '@/lib/mockData';

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
  const price = parseFloat(apiProduct.PRECIO) || 0;
  const specs = [];
  if (apiProduct.PARES_POR_CAJA) {
    specs.push({
      label: 'Pares por caja',
      value: apiProduct.PARES_POR_CAJA.toString(),
    });
  }
  if (apiProduct.COLOR_TIPO) {
    specs.push({ label: 'Color/Tipo', value: apiProduct.COLOR_TIPO });
  }
  if (apiProduct.TIPO_PRODUCTO) {
    specs.push({ label: 'Tipo', value: apiProduct.TIPO_PRODUCTO });
  }

  return {
    id: `prd-${apiProduct.ID}`,
    name: apiProduct.NOMBRE,
    slug: generateSlug(apiProduct.NOMBRE),
    category: mapCategory(apiProduct.CATEGORIA) as Product['category'],
    brand: 'Zeus Safety',
    price,
    certification: [],
    description:
      apiProduct.DESCRIPCION ||
      `EPP certificado — ${apiProduct.TIPO_PRODUCTO || apiProduct.CATEGORIA}`,
    specs,
    image: apiProduct.IMG_URL?.trim() || '',
  };
}

function hasImage(url?: string) {
  return Boolean(url && url.trim());
}

export function HomeParaTi() {
  const addItem = useQuoteStore((state) => state.addItem);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('Todos');
  const [addedId, setAddedId] = useState<string | null>(null);

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
          .filter((p) => hasImage(p.image));
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

  const filters = useMemo(() => {
    const cats = Array.from(new Set(products.map((p) => p.category)));
    return ['Todos', ...cats.slice(0, 5)];
  }, [products]);

  const visible = useMemo(() => {
    const list =
      filter === 'Todos'
        ? products
        : products.filter((p) => p.category === filter);
    return list.slice(0, 6);
  }, [products, filter]);

  const handleAdd = (product: Product) => {
    addItem(product);
    setAddedId(product.id);
    window.setTimeout(() => setAddedId(null), 1600);
  };

  return (
    <section className="bg-[#f4f6f9] py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:mb-10 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <span className="h-3.5 w-1 bg-[#F5C400]" />
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#F5C400]">
                Selección Zeus
              </p>
            </div>
            <h2 className="text-2xl font-black uppercase tracking-[0.04em] text-[#0b2d60] sm:text-3xl">
              Para ti
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-500 sm:text-base">
              Productos estrella listos para cotizar: stock, despacho nacional y
              asesoría técnica.
            </p>
          </div>

          {!loading && filters.length > 1 && (
            <div className="flex max-w-full flex-wrap gap-2">
              {filters.map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide transition-colors ${
                    filter === f
                      ? 'bg-[#0b2d60] text-white'
                      : 'bg-white text-[#0b2d60] ring-1 ring-slate-200 hover:ring-[#F5C400]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex min-h-[320px] items-center justify-center gap-2 text-[#0b2d60]">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm font-semibold">Cargando selección…</span>
          </div>
        ) : (
          <>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
              {/* Promo grande — panel rico */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="relative flex min-h-[420px] flex-col overflow-hidden bg-[#0b2d60] sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:min-h-0"
              >
                {/* Foto industrial de fondo */}
                <Image
                  src="/zeus2.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 25vw"
                  className="object-cover object-center opacity-35"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0b2d60]/95 via-[#0b2d60]/88 to-[#071a3a]" />
                <div
                  aria-hidden
                  className="absolute -right-8 top-16 h-40 w-40 rotate-12 bg-[#F5C400]/15"
                />
                <div className="absolute left-0 top-0 h-full w-1.5 bg-[#F5C400]" />

                <div className="relative z-10 flex h-full flex-col p-5 sm:p-6 lg:p-7">
                  <div>
                    <span className="inline-flex items-center gap-1.5 bg-[#F5C400] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#0b2d60]">
                      <Star className="h-3 w-3" fill="currentColor" />
                      Oferta corporativa
                    </span>

                    <h3 className="mt-4 text-[1.65rem] font-black uppercase leading-[1.05] tracking-tight text-white sm:text-3xl">
                      Protege tu
                      <span className="mt-1 block text-[#F5C400]">
                        operación
                      </span>
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-white/80">
                      Kits EPP por cuadrilla, precios por volumen y despacho a
                      todo el Perú.
                    </p>
                  </div>

                  {/* Producto destacado integrado */}
                  <div className="relative my-5 flex flex-1 items-center justify-center">
                    <div className="absolute inset-x-4 bottom-2 h-8 rounded-[100%] bg-black/30 blur-xl" />
                    <div className="relative aspect-square w-[78%] max-w-[220px] overflow-hidden border border-white/15 bg-white/95 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
                      <div className="absolute left-0 top-0 h-1 w-full bg-[#F5C400]" />
                      {visible[0]?.image ? (
                        <Image
                          src={visible[0].image}
                          alt={visible[0].name}
                          fill
                          sizes="220px"
                          className="object-contain p-4"
                          unoptimized
                        />
                      ) : (
                        <Image
                          src="/Guantes-1.jpg"
                          alt="EPP Zeus Safety"
                          fill
                          sizes="220px"
                          className="object-cover object-center"
                        />
                      )}
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="mb-4 grid grid-cols-3 gap-2 border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm">
                    {[
                      { value: '10+', label: 'Años' },
                      { value: '200+', label: 'SKUs' },
                      { value: '24h', label: 'Respuesta' },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="text-base font-black text-[#F5C400] sm:text-lg">
                          {stat.value}
                        </p>
                        <p className="text-[9px] font-bold uppercase tracking-wide text-white/65">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <ul className="mb-4 space-y-1.5">
                    {[
                      'Stock inmediato',
                      'Asesoría por industria',
                      'Envíos a todo el Perú',
                    ].map((t) => (
                      <li
                        key={t}
                        className="flex items-center gap-2 text-[11px] font-semibold text-white/90"
                      >
                        <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#F5C400]" />
                        {t}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/cotizacion"
                    className="group inline-flex h-11 w-full items-center justify-center gap-2 bg-[#F5C400] text-sm font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233]"
                  >
                    Cotizar ahora
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                  <p className="mt-2 flex items-center justify-center gap-1.5 text-[10px] text-white/55">
                    <Truck className="h-3 w-3 text-[#F5C400]" />
                    Atención B2B y distribuidores
                  </p>
                </div>
              </motion.div>

              {/* Productos */}
              {visible.map((product, index) => (
                <motion.article
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.05 + index * 0.04 }}
                  className="group flex flex-col overflow-hidden bg-white shadow-[0_8px_24px_rgba(11,45,96,0.08)] ring-1 ring-slate-200/80 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(11,45,96,0.14)] hover:ring-[#0b2d60]/20"
                >
                  <div className="relative aspect-square overflow-hidden bg-[#f0f3f7]">
                    {index < 2 && (
                      <span className="absolute left-3 top-3 z-10 bg-[#F5C400] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-[#0b2d60]">
                        Destacado
                      </span>
                    )}
                    {hasImage(product.image) ? (
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 25vw"
                        className="object-contain p-4 transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                    ) : (
                      <div className="absolute inset-0 bg-slate-100" />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col px-3.5 py-3.5 sm:px-4 sm:py-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                      {product.brand} · {product.category}
                    </p>
                    <Link
                      href={`/productos/${encodeURIComponent(product.slug)}`}
                      className="mt-1 line-clamp-2 text-sm font-bold uppercase leading-snug text-[#0b2d60] transition-colors hover:text-[#F5C400]"
                    >
                      {product.name}
                    </Link>

                    <div className="mt-auto flex items-end justify-between gap-2 pt-3">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                          Desde
                        </p>
                        <p className="text-lg font-black text-[#0c1427]">
                          {product.price > 0
                            ? `S/ ${product.price.toFixed(2)}`
                            : 'Cotizar'}
                        </p>
                      </div>

                      <div className="flex gap-1.5">
                        <Link
                          href={`/productos/${encodeURIComponent(product.slug)}`}
                          className="inline-flex h-9 items-center justify-center border border-slate-200 px-2.5 text-[10px] font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:border-[#0b2d60]"
                        >
                          Ver
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleAdd(product)}
                          aria-label={`Agregar ${product.name} a cotización`}
                          className="inline-flex h-9 w-9 items-center justify-center bg-[#F5C400] text-[#0b2d60] transition-colors hover:bg-[#0b2d60] hover:text-[#F5C400]"
                        >
                          <Plus className="h-4 w-4" strokeWidth={2.5} />
                        </button>
                      </div>
                    </div>

                    {addedId === product.id && (
                      <p className="mt-2 text-[10px] font-bold uppercase tracking-wide text-emerald-600">
                        Agregado a cotización
                      </p>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="mt-8 flex justify-center sm:mt-10">
              <Link
                href="/productos"
                className="group inline-flex h-12 items-center gap-2 bg-[#0b2d60] px-8 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#F5C400] hover:text-[#0b2d60]"
              >
                Ver más productos
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
