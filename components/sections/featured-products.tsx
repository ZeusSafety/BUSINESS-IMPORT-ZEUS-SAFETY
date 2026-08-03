'use client';

import { ProductCard } from '@/components/products/product-card';
import { SectionHeading } from '@/components/ui/section-heading';
import { Product } from '@/lib/mockData';
import {
  Truck,
  Users,
  Package,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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
    Corporal: 'Protección de Cabeza',
    Guantes: 'Protección Manual',
    Visual: 'Protección Visual',
    Respiradores: 'Protección Respiratoria',
    Respiratoria: 'Protección Respiratoria',
    Auditiva: 'Protección Auditiva',
    Calzado: 'Calzado de Seguridad',
    Manual: 'Protección Manual',
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
    price: price,
    certification: [],
    description:
      apiProduct.DESCRIPCION ||
      `Producto de seguridad industrial ${apiProduct.TIPO_PRODUCTO || apiProduct.CATEGORIA}`,
    specs: specs,
    image: apiProduct.IMG_URL,
  };
}

const highlights = [
  { icon: Truck, text: 'Envíos 24–48h' },
  { icon: Users, text: 'Kits por cuadrilla' },
  { icon: Package, text: 'Packs por volumen' },
];

export function FeaturedProducts() {
  const [starProducts, setStarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchStarProducts() {
      try {
        setLoading(true);
        const response = await fetch(
          'https://productoscrud-2946605267.us-central1.run.app?metodo=PRODUCTOS_ESTRELLA',
        );

        if (!response.ok) {
          throw new Error('Error al cargar los productos estrella');
        }

        const data = await response.json();
        const allTransformedProducts = data.map(transformApiProduct);
        const allStarProductIds = allTransformedProducts.map(
          (p: Product) => p.id,
        );
        localStorage.setItem(
          'starProductIds',
          JSON.stringify(allStarProductIds),
        );
        setStarProducts(allTransformedProducts.slice(0, 6));
      } catch (err) {
        console.error('Error fetching star products:', err);
        setStarProducts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchStarProducts();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const next = prev + 3;
      const maxIndex = Math.max(starProducts.length - 3, 0);
      return next > maxIndex ? 0 : next;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const prevIndex = prev - 3;
      const maxIndex = Math.max(starProducts.length - 3, 0);
      return prevIndex < 0 ? maxIndex : prevIndex;
    });
  };

  const getVisibleProducts = () =>
    starProducts.slice(currentIndex, currentIndex + 3);

  useEffect(() => {
    if (starProducts.length <= 3) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = prev + 3;
        const maxIndex = Math.max(starProducts.length - 3, 0);
        return next > maxIndex ? 0 : next;
      });
    }, 5000);
    return () => clearInterval(interval);
  }, [starProducts.length]);

  return (
    <section className="bg-slate-50">
      <div className="mx-auto max-w-[1600px] px-6 py-16 lg:px-10 lg:py-20 xl:px-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            title="Top EPP listos para despachar"
            subtitle="Seleccionados para operaciones de alto riesgo."
          />
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.text}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#0b2d60]"
                >
                  <span className="flex h-8 w-8 items-center justify-center bg-[#F5C400] text-[#0b2d60]">
                    <Icon className="h-4 w-4" />
                  </span>
                  {item.text}
                </div>
              );
            })}
          </div>
        </div>

        {loading ? (
          <div className="mt-14 flex flex-col items-center justify-center gap-3 py-16">
            <Loader2 className="h-10 w-10 animate-spin text-[#0b2d60]" />
            <p className="text-sm font-medium text-slate-500">
              Cargando productos...
            </p>
          </div>
        ) : starProducts.length > 0 ? (
          <div className="mt-12">
            <div className="flex items-center gap-3">
              {starProducts.length > 3 && (
                <button
                  type="button"
                  onClick={prevSlide}
                  className="hidden h-11 w-11 shrink-0 items-center justify-center border border-[#0b2d60] bg-white text-[#0b2d60] transition-colors hover:bg-[#0b2d60] hover:text-white sm:flex"
                  aria-label="Productos anteriores"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
              )}

              <div className="min-w-0 flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.4 }}
                    className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {getVisibleProducts().map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {starProducts.length > 3 && (
                <button
                  type="button"
                  onClick={nextSlide}
                  className="hidden h-11 w-11 shrink-0 items-center justify-center border border-[#0b2d60] bg-white text-[#0b2d60] transition-colors hover:bg-[#0b2d60] hover:text-white sm:flex"
                  aria-label="Siguientes productos"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              )}
            </div>

            {starProducts.length > 3 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {Array.from({
                  length: Math.ceil(starProducts.length / 3),
                }).map((_, pageIndex) => {
                  const isActive = Math.floor(currentIndex / 3) === pageIndex;
                  return (
                    <button
                      key={pageIndex}
                      type="button"
                      onClick={() => setCurrentIndex(pageIndex * 3)}
                      className={`h-2.5 transition-all ${
                        isActive
                          ? 'w-10 bg-[#F5C400]'
                          : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                      }`}
                      aria-label={`Ir a página ${pageIndex + 1}`}
                    />
                  );
                })}
              </div>
            )}

            <div className="mt-10 flex flex-col items-center gap-4">
              <Link
                href="/productos"
                className="group inline-flex h-12 items-center gap-2 bg-[#0b2d60] px-8 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#103a7b]"
              >
                Ver catálogo completo
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </Link>
              <p className="text-sm text-slate-500">
                Productos certificados y listos para cotización inmediata
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-12 border border-dashed border-slate-300 bg-white p-12 text-center">
            <Package className="mx-auto mb-4 h-10 w-10 text-slate-400" />
            <h3 className="mb-1 text-lg font-bold text-[#0c1427]">
              No hay productos estrella disponibles
            </h3>
            <p className="text-sm text-slate-500">Por favor intenta más tarde.</p>
          </div>
        )}
      </div>
    </section>
  );
}
