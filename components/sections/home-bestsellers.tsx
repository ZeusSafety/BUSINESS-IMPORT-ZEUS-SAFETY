'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  Plus,
  ShieldCheck,
  Flame,
} from 'lucide-react';
import { useQuoteStore } from '@/store/quoteStore';
import type { Product } from '@/lib/mockData';
import { getDisplayPrice } from '@/lib/display-price';
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
    specs: [],
    image: apiProduct.IMG_URL?.trim() || '',
  };
  return { ...base, price: getDisplayPrice(base) };
}

function hasImage(url?: string) {
  return Boolean(url && url.trim());
}

/** Toma hasta 8 productos con imagen, priorizando variedad de categorías */
function pickBestsellers(products: Product[], limit = 8): Product[] {
  const byCat = new Map<string, Product[]>();
  for (const p of products) {
    if (!hasImage(p.image)) continue;
    const list = byCat.get(p.category) ?? [];
    list.push(p);
    byCat.set(p.category, list);
  }

  const picked: Product[] = [];
  const cats = Array.from(byCat.keys());
  let i = 0;
  while (picked.length < limit && cats.length > 0) {
    const cat = cats[i % cats.length];
    const bucket = byCat.get(cat);
    if (bucket && bucket.length) {
      picked.push(bucket.shift()!);
    }
    if (!bucket?.length) {
      cats.splice(i % cats.length, 1);
      if (!cats.length) break;
      continue;
    }
    i++;
  }
  return picked;
}

export function HomeBestsellers() {
  const addItem = useQuoteStore((state) => state.addItem);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(
          'https://productoscrud-2946605267.us-central1.run.app?metodo=LISTADO_PRODUCTOS_ESTATICA',
        );
        if (!res.ok) throw new Error('Error al cargar productos');
        const data = (await res.json()) as ApiProduct[];
        if (cancelled || !Array.isArray(data)) return;
        setProducts(pickBestsellers(data.map(transformApiProduct), 8));
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

  const handleAdd = (product: Product) => {
    addItem(product);
    setAddedId(product.id);
    window.setTimeout(() => setAddedId(null), 1600);
  };

  const promoProduct = useMemo(() => products[0], [products]);

  return (
    <section className="bg-white py-12 sm:py-14 lg:py-16">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="mb-8 text-center sm:mb-10">
          <div className="mb-2 flex items-center justify-center gap-2">
            <span className="h-px w-8 bg-[#F5C400]" />
            <Flame className="h-4 w-4 text-[#F5C400]" />
            <span className="h-px w-8 bg-[#F5C400]" />
          </div>
          <h2 className="text-2xl font-black uppercase tracking-[0.06em] text-[#0b2d60] sm:text-3xl">
            Lo más vendido
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-slate-500">
            Los EPP que más piden nuestras operaciones en minería, construcción
            y energía.
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-[280px] items-center justify-center">
            <Spinner size="md" />
          </div>
        ) : (
          <>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(240px,280px)] lg:gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(260px,300px)]">
              {/* Grid de productos */}
              <div className="order-2 grid gap-4 sm:grid-cols-2 lg:order-1 lg:grid-cols-4 lg:gap-4">
                {products.map((product, index) => (
                  <motion.article
                    key={product.id}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                    className="group flex flex-col overflow-hidden border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#0b2d60]/25 hover:shadow-[0_14px_32px_rgba(11,45,96,0.12)]"
                  >
                    <div className="relative aspect-square overflow-hidden bg-[#f3f5f8]">
                      {index < 3 && (
                        <span className="absolute left-3 top-3 z-10 bg-[#F5C400] px-2 py-1 text-[9px] font-bold uppercase tracking-wide text-[#0b2d60]">
                          Destacado
                        </span>
                      )}
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, 20vw"
                        className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                        unoptimized
                      />
                    </div>

                    <div className="flex flex-1 flex-col px-3 py-3 sm:px-3.5 sm:py-3.5">
                      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                        {product.brand} · {product.category}
                      </p>
                      <Link
                        href={`/productos/${encodeURIComponent(product.slug)}`}
                        className="mt-1 line-clamp-2 text-[13px] font-bold uppercase leading-snug text-[#0b2d60] transition-colors hover:text-[#F5C400]"
                      >
                        {product.name}
                      </Link>

                      <div className="mt-auto flex items-end justify-between gap-2 pt-3">
                        <div>
                          <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                            Desde
                          </p>
                          <p className="text-base font-black text-[#0b2d60]">
                            {product.price > 0
                              ? `S/ ${product.price.toFixed(2)}`
                              : 'Cotizar'}
                          </p>
                        </div>
                        <div className="flex gap-1.5">
                          <Link
                            href={`/productos/${encodeURIComponent(product.slug)}`}
                            className="inline-flex h-8 items-center justify-center border border-slate-200 px-2.5 text-[10px] font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:border-[#0b2d60]"
                          >
                            Ver
                          </Link>
                          <button
                            type="button"
                            onClick={() => handleAdd(product)}
                            aria-label={`Agregar ${product.name}`}
                            className="inline-flex h-8 w-8 items-center justify-center bg-[#F5C400] text-[#0b2d60] transition-colors hover:bg-[#0b2d60] hover:text-[#F5C400]"
                          >
                            <Plus className="h-4 w-4" strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                      {addedId === product.id && (
                        <p className="mt-1.5 text-[10px] font-bold uppercase text-emerald-600">
                          Agregado
                        </p>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Banner vertical — derecha, enriquecido */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="relative order-1 flex min-h-[420px] flex-col overflow-hidden bg-[#0b2d60] lg:order-2 lg:min-h-full"
              >
                <Image
                  src="/zeus2.jpg"
                  alt=""
                  fill
                  sizes="300px"
                  className="object-cover object-center opacity-35"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#0b2d60]/95 via-[#0b2d60]/88 to-[#071a3a]" />
                <div
                  aria-hidden
                  className="absolute -left-8 top-20 h-40 w-40 -rotate-12 bg-[#F5C400]/15"
                />
                <div className="absolute right-0 top-0 h-full w-1.5 bg-[#F5C400]" />

                <div className="relative z-10 flex h-full flex-col p-5 sm:p-6 lg:p-7">
                  <span className="inline-flex w-fit items-center gap-1.5 bg-[#F5C400] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#0b2d60]">
                    <Flame className="h-3 w-3" />
                    Más vendidos
                  </span>

                  <h3 className="mt-4 text-[1.45rem] font-black uppercase leading-[1.05] tracking-tight text-white sm:text-2xl">
                    EPP certificado
                    <span className="mt-1 block text-[#F5C400]">
                      de alta calidad
                    </span>
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/80">
                    Stock para obra, mina y planta. Cotiza por volumen con
                    asesoría técnica.
                  </p>

                  <div className="relative my-5 flex flex-1 items-center justify-center">
                    <div className="absolute inset-x-4 bottom-2 h-8 rounded-[100%] bg-black/30 blur-xl" />
                    <div className="relative aspect-square w-[78%] max-w-[200px] overflow-hidden border border-white/15 bg-white/95 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
                      <div className="absolute left-0 top-0 h-1 w-full bg-[#F5C400]" />
                      <Image
                        src={promoProduct?.image || '/Guantes-1.jpg'}
                        alt={promoProduct?.name || 'EPP Zeus'}
                        fill
                        sizes="200px"
                        className="object-contain p-4"
                        unoptimized={Boolean(promoProduct?.image)}
                      />
                    </div>
                  </div>

                  <div className="mb-4 grid grid-cols-3 gap-2 border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm">
                    {[
                      { value: '10+', label: 'Años' },
                      { value: '200+', label: 'SKUs' },
                      { value: '24h', label: 'Respuesta' },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="text-base font-black text-[#F5C400]">
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
                      'Normas internacionales',
                      'Despacho nacional',
                      'Soporte B2B',
                    ].map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-[11px] font-semibold text-white/90"
                      >
                        <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-[#F5C400]" />
                        {item}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/productos"
                    className="group inline-flex h-11 w-full items-center justify-center gap-2 bg-[#F5C400] text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233]"
                  >
                    Compra ahora
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </motion.div>
            </div>

            <div className="mt-8 flex justify-center sm:mt-10">
              <Link
                href="/productos"
                className="group inline-flex h-12 items-center gap-2 border-2 border-[#0b2d60] bg-white px-8 text-sm font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#0b2d60] hover:text-white"
              >
                Ver catálogo completo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
