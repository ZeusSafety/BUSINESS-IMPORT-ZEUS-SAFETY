'use client';

import { ProductCard } from '@/components/products/product-card';
import { SectionHeading } from '@/components/ui/section-heading';
import { Product } from '@/lib/mockData';
import { Truck, Users, Package, Sparkles, CheckCircle2, ChevronLeft, ChevronRight, ArrowRight, Loader2, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

// Tipo para los datos de la API
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

// Función para generar slug a partir del nombre
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Función para mapear categorías de la API a categorías del sistema
function mapCategory(apiCategory: string): string {
  const categoryMap: Record<string, string> = {
    'Corporal': 'Protección de Cabeza',
    'Guantes': 'Protección Manual',
    'Visual': 'Protección Visual',
    'Respiradores': 'Protección Respiratoria',
    'Respiratoria': 'Protección Respiratoria',
    'Auditiva': 'Protección Auditiva',
    'Calzado': 'Calzado de Seguridad',
    'Manual': 'Protección Manual',
  };
  return categoryMap[apiCategory] || apiCategory;
}

// Función para transformar datos de la API al formato Product
function transformApiProduct(apiProduct: ApiProduct): Product {
  const price = parseFloat(apiProduct.PRECIO) || 0;
  const specs = [];
  
  if (apiProduct.PARES_POR_CAJA) {
    specs.push({ label: 'Pares por caja', value: apiProduct.PARES_POR_CAJA.toString() });
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
    category: mapCategory(apiProduct.CATEGORIA) as any,
    brand: 'Zeus Safety',
    price: price,
    certification: [],
    description: apiProduct.DESCRIPCION || `Producto de seguridad industrial ${apiProduct.TIPO_PRODUCTO || apiProduct.CATEGORIA}`,
    specs: specs,
    image: apiProduct.IMG_URL,
  };
}

export function FeaturedProducts() {
  const [starProducts, setStarProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Cargar productos estrella de la API
  useEffect(() => {
    async function fetchStarProducts() {
      try {
        setLoading(true);
        const response = await fetch('https://productoscrud-2946605267.us-central1.run.app?metodo=PRODUCTOS_ESTRELLA');
        
        if (!response.ok) {
          throw new Error('Error al cargar los productos estrella');
        }
        
        const data = await response.json();
        
        // Transformar TODOS los productos de la API
        const allTransformedProducts = data.map(transformApiProduct);
        
        // Guardar TODOS los IDs de productos estrella en localStorage para el filtro
        const allStarProductIds = allTransformedProducts.map((p: Product) => p.id);
        localStorage.setItem('starProductIds', JSON.stringify(allStarProductIds));
        
        // Tomar solo los primeros 6 productos para el carrusel
        const limitedProducts = allTransformedProducts.slice(0, 6);
        
        setStarProducts(limitedProducts);
      } catch (err) {
        console.error('Error fetching star products:', err);
        setStarProducts([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchStarProducts();
  }, []);

  const features = [
    {
      icon: Truck,
      text: 'Envíos 24-48h',
      description: 'Entrega rápida',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      iconColor: 'text-emerald-600',
    },
    {
      icon: Users,
      text: 'Kits por cuadrilla',
      description: 'Soluciones grupales',
      color: 'from-[#00b5e2] to-[#103a7b]',
      bgColor: 'bg-[#e7f8ff]',
      iconColor: 'text-[#103a7b]',
    },
    {
      icon: Package,
      text: 'Packs por volumen',
      description: 'Descuentos escalonados',
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      iconColor: 'text-amber-600',
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const next = prev + 3;
      const maxIndex = starProducts.length - 3;
      return next > maxIndex ? 0 : next;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      const prevIndex = prev - 3;
      const maxIndex = starProducts.length - 3;
      return prevIndex < 0 ? maxIndex : prevIndex;
    });
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Obtener los productos visibles (3 a la vez)
  const getVisibleProducts = () => {
    return starProducts.slice(currentIndex, currentIndex + 3);
  };

  // Auto-play del carrusel
  useEffect(() => {
    if (starProducts.length > 3) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => {
          const next = prev + 3;
          const maxIndex = starProducts.length - 3;
          return next > maxIndex ? 0 : next;
        });
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [starProducts.length]);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-slate-50/50 to-white">
      {/* Efectos de fondo mejorados */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,181,226,0.04),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(11,45,96,0.03),transparent_50%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,181,226,0.02)_0%,transparent_50%)]" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="flex-1 space-y-4">
            <SectionHeading
              title="Top EPP listos para despachar"
              subtitle="Seleccionados por equipos de seguridad para operaciones de alto riesgo"
            />
          </div>
          
          {/* Features Cards */}
          <div className="flex flex-wrap items-center gap-4 lg:flex-nowrap">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group relative flex items-center gap-3 rounded-xl border border-slate-200/50 bg-white/80 px-4 py-3 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300/50 hover:shadow-lg hover:shadow-slate-200/50"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br ${feature.color} shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-slate-900 leading-tight">{feature.text}</p>
                    <p className="text-[10px] font-medium text-slate-500 mt-0.5">{feature.description}</p>
                  </div>
                  <div className="absolute -right-1 -top-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-sm">
                      <CheckCircle2 className="h-2.5 w-2.5 text-white" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Carrusel de Productos */}
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 flex items-center justify-center py-20"
          >
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-12 w-12 text-[#103a7b] animate-spin" />
              <p className="text-sm font-medium text-slate-600">Cargando productos estrella...</p>
            </div>
          </motion.div>
        ) : starProducts.length > 0 ? (
          <div className="mt-16">
            {/* Carrusel Container */}
            <div className="flex items-center gap-4">
              {/* Flecha izquierda */}
              {starProducts.length > 3 && (
                <button
                  onClick={prevSlide}
                  className="flex-shrink-0 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white border-2 border-[#103a7b]/30 shadow-lg transition-all hover:bg-white hover:border-[#103a7b] hover:scale-110 hover:shadow-xl group z-10"
                  aria-label="Productos anteriores"
                >
                  <ChevronLeft className="h-6 w-6 sm:h-7 sm:w-7 text-[#103a7b] group-hover:text-[#0b2d60] transition-colors" />
                </button>
              )}

              {/* Contenedor de productos con ancho limitado */}
              <div className="flex-1 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                    className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                  >
                    {getVisibleProducts().map((product, idx) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Flecha derecha */}
              {starProducts.length > 3 && (
                <button
                  onClick={nextSlide}
                  className="flex-shrink-0 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-white border-2 border-[#103a7b]/30 shadow-lg transition-all hover:bg-white hover:border-[#103a7b] hover:scale-110 hover:shadow-xl group z-10"
                  aria-label="Siguientes productos"
                >
                  <ChevronRight className="h-6 w-6 sm:h-7 sm:w-7 text-[#103a7b] group-hover:text-[#0b2d60] transition-colors" />
                </button>
              )}
            </div>

            {/* Indicadores de página */}
            {starProducts.length > 3 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                {Array.from({ length: Math.ceil(starProducts.length / 3) }).map((_, pageIndex) => {
                  const startIndex = pageIndex * 3;
                  const isActive = Math.floor(currentIndex / 3) === pageIndex;
                  return (
                    <button
                      key={pageIndex}
                      onClick={() => goToSlide(startIndex)}
                      className={`h-3 rounded-full transition-all duration-300 ${
                        isActive
                          ? 'w-12 bg-gradient-to-r from-[#103a7b] to-[#00b5e2] shadow-md'
                          : 'w-3 bg-slate-300 hover:bg-slate-400 hover:w-4'
                      }`}
                      aria-label={`Ir a página ${pageIndex + 1}`}
                    />
                  );
                })}
              </div>
            )}

            {/* Botón Ver Catálogo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 flex justify-center"
            >
              <Button
                asChild
                size="lg"
                className="group relative overflow-hidden bg-gradient-to-r from-[#103a7b] to-[#00b5e2] text-white shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 px-8 py-6 text-base font-bold"
              >
                <Link href="/productos" className="flex items-center gap-3">
                  <span>Ver Catálogo Completo</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-16 rounded-2xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-white to-slate-50 p-12 text-center"
          >
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#00b5e2]/10 to-[#103a7b]/10">
              <Package className="h-10 w-10 text-slate-400" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-slate-900">
              No hay productos estrella disponibles
            </h3>
            <p className="text-sm text-slate-600">
              Por favor intenta más tarde.
            </p>
          </motion.div>
        )}

        {/* Decorative Element */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 flex items-center justify-center"
        >
          <div className="flex items-center gap-3 rounded-full bg-gradient-to-r from-[#e7f8ff] to-white px-6 py-3 border border-[#00b5e2]/20 shadow-sm">
            <Sparkles className="h-4 w-4 text-[#00b5e2]" />
            <p className="text-sm font-semibold text-slate-700">
              Todos los productos certificados y listos para cotización inmediata
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

