'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Flame, ShieldCheck, Store, Truck } from 'lucide-react';
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
    <section className="bg-[#f4f6f9] py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-12">
        {/* Encabezado */}
        <div className="mb-6 flex items-center gap-3 sm:mb-8">
          <span className="h-9 w-1.5 bg-[#F5C400]" />
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
              Top ventas
            </p>
            <h2 className="text-xl font-black uppercase tracking-[0.04em] text-[#0b2d60] sm:text-2xl">
              Lo más vendido
            </h2>
          </div>
        </div>

        {loading ? (
          <div className="flex min-h-[280px] items-center justify-center border border-slate-200 bg-white">
            <BrandLoader label="Cargando productos" />
          </div>
        ) : (
          <>
            {/* Banner corporativo cuadrado */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="mb-6 overflow-hidden border border-[#0b2d60]/15 bg-[#0b2d60] sm:mb-8"
            >
              <div className="grid lg:grid-cols-[1fr_auto_1fr]">
                {/* Texto */}
                <div className="flex flex-col justify-center border-b border-white/10 p-6 sm:p-8 lg:border-b-0 lg:border-r">
                  <span className="inline-flex w-fit items-center gap-1.5 bg-[#F5C400] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#0b2d60]">
                    <Flame className="h-3 w-3" />
                    Más vendidos
                  </span>
                  <h3 className="mt-4 text-2xl font-black uppercase leading-tight tracking-tight text-white sm:text-3xl">
                    EPP certificado
                    <span className="mt-1 block text-[#F5C400]">de alta calidad</span>
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/75">
                    Stock para obra, mina y planta. Cotiza por volumen con asesoría técnica.
                  </p>

                  <div className="mt-4 flex items-stretch gap-2">
                    <span className="flex flex-1 items-center justify-center gap-1.5 border border-emerald-400/30 bg-emerald-500/10 px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-emerald-300">
                      <Truck className="h-3.5 w-3.5 shrink-0" />
                      Delivery 24h
                    </span>
                    <span className="flex flex-1 items-center justify-center gap-1.5 border border-blue-400/30 bg-blue-500/10 px-3 py-2 text-[10px] font-bold uppercase tracking-wide text-blue-300">
                      <Store className="h-3.5 w-3.5 shrink-0" />
                      Recojo tienda
                    </span>
                  </div>
                </div>

                {/* Imagen producto */}
                <div className="relative flex items-center justify-center border-b border-white/10 bg-[#0a2550] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:px-10">
                  <div className="relative aspect-square w-full max-w-[200px] overflow-hidden border border-white/15 bg-white">
                    <div className="absolute left-0 top-0 z-10 h-1 w-full bg-[#F5C400]" />
                    <Image
                      src={promoProduct?.image || '/Guantes-1.jpg'}
                      alt={promoProduct?.name || 'EPP Zeus'}
                      fill
                      sizes="200px"
                      className="object-contain p-5"
                      unoptimized={Boolean(promoProduct?.image)}
                    />
                  </div>
                </div>

                {/* Stats + CTA */}
                <div className="flex flex-col justify-center p-6 sm:p-8">
                  <div className="grid grid-cols-3 gap-px border border-white/10 bg-white/10">
                    {[
                      { value: '10+', label: 'Años' },
                      { value: '200+', label: 'SKUs' },
                      { value: '24h', label: 'Respuesta' },
                    ].map((stat) => (
                      <div key={stat.label} className="bg-[#0b2d60] px-3 py-4 text-center">
                        <p className="text-xl font-black text-[#F5C400]">{stat.value}</p>
                        <p className="text-[9px] font-bold uppercase tracking-wide text-white/60">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>

                  <ul className="mt-5 space-y-2">
                    {['Normas internacionales', 'Despacho nacional', 'Soporte B2B'].map((item) => (
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
                    className="group mt-5 inline-flex h-11 w-full items-center justify-center gap-2 bg-[#F5C400] text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-all hover:bg-[#ffd233] hover:shadow-[0_6px_20px_rgba(245,196,0,0.35)]"
                  >
                    Compra ahora
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* Grid productos */}
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
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

            <div className="mt-8 flex justify-center">
              <Link
                href="/productos"
                className="group inline-flex h-11 items-center gap-2 border-2 border-[#0b2d60] bg-white px-8 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-all hover:bg-[#0b2d60] hover:text-white"
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
