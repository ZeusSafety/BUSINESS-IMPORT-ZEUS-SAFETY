'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, ShieldCheck } from 'lucide-react';
import {
  PRODUCTS_API_URL,
  buildCatalogFromApi,
  type CatalogProduct,
  type ApiProduct,
} from '@/lib/product-catalog';
import { ProductCard } from '@/components/products/product-card';
import { BrandLoader } from '@/components/ui/spinner';

function hasImage(url?: string) {
  return Boolean(url && url.trim());
}

/** Toma hasta 8 modelos con imagen, priorizando variedad de categorías */
function pickBestsellers(products: CatalogProduct[], limit = 8): CatalogProduct[] {
  const byCat = new Map<string, CatalogProduct[]>();
  for (const p of products) {
    if (!hasImage(p.image)) continue;
    const list = byCat.get(p.category) ?? [];
    list.push(p);
    byCat.set(p.category, list);
  }

  const picked: CatalogProduct[] = [];
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
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(PRODUCTS_API_URL);
        if (!res.ok) throw new Error('Error al cargar productos');
        const data = (await res.json()) as ApiProduct[];
        if (cancelled || !Array.isArray(data)) return;
        setProducts(pickBestsellers(buildCatalogFromApi(data), 8));
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
            <BrandLoader label="Cargando productos" />
          </div>
        ) : (
          <>
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(240px,280px)] lg:gap-5 xl:grid-cols-[minmax(0,1fr)_minmax(260px,300px)]">
              <div className="order-2 grid gap-4 sm:grid-cols-2 lg:order-1 lg:grid-cols-4 lg:gap-4">
                {products.map((product, index) => (
                  <motion.div
                    key={product.groupSlug}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: index * 0.04 }}
                  >
                    <ProductCard product={product} />
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="relative order-1 flex min-h-[420px] flex-col overflow-hidden rounded-xl bg-[#0b2d60] lg:order-2 lg:min-h-full"
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
                  <span className="inline-flex w-fit items-center gap-1.5 rounded-md bg-[#F5C400] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#0b2d60]">
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
                    <div className="relative aspect-square w-[78%] max-w-[200px] overflow-hidden rounded-xl border border-white/15 bg-white/95 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
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

                  <div className="mb-4 grid grid-cols-3 gap-2 rounded-lg border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm">
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
                    className="group zeus-btn-primary inline-flex h-11 w-full items-center justify-center gap-2 text-xs"
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
                className="group zeus-btn-secondary inline-flex h-12 items-center gap-2 px-8 text-sm"
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
