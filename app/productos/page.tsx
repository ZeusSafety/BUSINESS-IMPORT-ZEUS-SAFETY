'use client';

import { ProductCard } from '@/components/products/product-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Product, certifications } from '@/lib/mockData';
import { Search, Filter, X, Package, Award, DollarSign, SlidersHorizontal, Loader2, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

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
    'Manual': 'Protección Manual',
    'Visual': 'Protección Visual',
    'Respiratoria': 'Protección Respiratoria',
    'Auditiva': 'Protección Auditiva',
    'Calzado': 'Calzado de Seguridad',
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]); // Todos los productos del catálogo completo
  const [starProducts, setStarProducts] = useState<Product[]>([]); // Productos estrella cargados directamente
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showTopProducts, setShowTopProducts] = useState(false);
  const [starProductIds, setStarProductIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const productsPerPage = 12;

  // Cargar IDs de productos estrella (TODOS los productos estrella, no solo uno por categoría)
  useEffect(() => {
    async function fetchAllStarProductIds() {
      try {
        const response = await fetch('https://productoscrud-2946605267.us-central1.run.app?metodo=PRODUCTOS_ESTRELLA');
        if (response.ok) {
          const data = await response.json();
          // Transformar TODOS los productos estrella (no agrupar por categoría)
          const transformedProducts = data.map(transformApiProduct);
          const ids = transformedProducts.map((p: Product) => p.id);
          setStarProductIds(ids);
          setStarProducts(transformedProducts); // Guardar también los productos completos
          localStorage.setItem('starProductIds', JSON.stringify(ids));
          console.log('Productos estrella cargados:', ids.length, 'IDs:', ids);
        }
      } catch (err) {
        console.error('Error fetching star product IDs:', err);
      }
    }

    // Intentar cargar desde localStorage primero
    const storedIds = localStorage.getItem('starProductIds');
    if (storedIds) {
      try {
        const parsedIds = JSON.parse(storedIds);
        setStarProductIds(parsedIds);
        console.log('Productos estrella cargados desde localStorage:', parsedIds.length, 'IDs:', parsedIds);
        // También actualizar desde la API en segundo plano para asegurar que estén actualizados
        fetchAllStarProductIds();
      } catch (err) {
        console.error('Error parsing star product IDs:', err);
        // Si hay error, cargar desde la API
        fetchAllStarProductIds();
      }
    } else {
      // Si no hay en localStorage, cargar desde la API
      fetchAllStarProductIds();
    }
  }, []);

  // Cargar productos de la API
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch('https://productoscrud-2946605267.us-central1.run.app?metodo=LISTADO_PRODUCTOS_ESTATICA');
        
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        
        const data = await response.json();
        
        // Transformar los productos de la API
        const transformedProducts = data.map(transformApiProduct);
        setAllProducts(transformedProducts);
        setProducts(transformedProducts);
        
        // Extraer categorías únicas de los productos
        const uniqueCategories = Array.from(new Set(transformedProducts.map((p: Product) => p.category))) as string[];
        setCategories(uniqueCategories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProducts();
  }, []);

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const toggleCertification = (cert: string) => {
    setSelectedCertifications(prev =>
      prev.includes(cert) ? prev.filter(c => c !== cert) : [...prev, cert]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedCertifications([]);
    setPriceRange('');
    setSearchQuery('');
    setShowTopProducts(false);
    setCurrentPage(1); // Resetear a la primera página al limpiar filtros
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedCertifications.length > 0 || priceRange !== '' || showTopProducts;

  // Debug: Log cuando cambia el filtro de productos top
  useEffect(() => {
    if (showTopProducts && starProductIds.length > 0) {
      console.log('🔍 Filtro Productos Top activado');
      console.log('📊 IDs de productos estrella disponibles:', starProductIds.length);
      console.log('📦 Productos totales en catálogo:', products.length);
      const topProductsFound = products.filter(p => starProductIds.includes(p.id));
      console.log('⭐ Productos estrella encontrados en catálogo:', topProductsFound.length);
      if (topProductsFound.length < starProductIds.length) {
        console.warn('⚠️ Algunos productos estrella no están en el catálogo completo');
        const missingIds = starProductIds.filter(id => !products.some(p => p.id === id));
        console.log('❌ IDs faltantes:', missingIds);
      }
    }
  }, [showTopProducts, starProductIds, products]);

  // Cuando se activa el filtro de productos top, usar los productos estrella directamente
  useEffect(() => {
    if (showTopProducts && starProducts.length > 0) {
      // Combinar productos estrella con productos del catálogo que coincidan
      const combinedProducts = [...starProducts];
      // Agregar productos del catálogo que sean estrella pero no estén en starProducts
      allProducts.forEach(product => {
        if (starProductIds.includes(product.id) && !combinedProducts.some(p => p.id === product.id)) {
          combinedProducts.push(product);
        }
      });
      setProducts(combinedProducts);
    } else if (!showTopProducts) {
      // Si el filtro está desactivado, mostrar todos los productos del catálogo
      setProducts(allProducts);
    }
  }, [showTopProducts, starProducts, starProductIds, allProducts]);

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === '' || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const matchesCertification = selectedCertifications.length === 0 || 
      product.certification.some(cert => selectedCertifications.includes(cert));
    
    const matchesPrice = priceRange === '' || (
      priceRange === 'low' && product.price < 20 ||
      priceRange === 'medium' && product.price >= 20 && product.price <= 80 ||
      priceRange === 'high' && product.price > 80
    );

    // El filtro de productos top ya se maneja cambiando el array de productos,
    // así que aquí no necesitamos filtrar por matchesTopProducts
    const matchesTopProducts = true;

    return matchesSearch && matchesCategory && matchesCertification && matchesPrice && matchesTopProducts;
  });

  // Paginación
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  // Resetear a la primera página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, selectedCertifications, priceRange, showTopProducts]);

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      {/* Hero */}
      <section className="relative flex h-[240px] items-center justify-center overflow-hidden sm:h-[280px]">
        <Image
          src="/zeus2.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0b2d60]/78" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.28em] text-[#F5C400]">
            Catálogo
          </p>
          <h1 className="text-4xl font-black uppercase tracking-wide text-white sm:text-5xl">
            EPP industrial
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm text-white/80 sm:text-base">
            Productos certificados listos para cotizar. Stock inmediato y
            asesoría especializada.
          </p>
        </div>
      </section>

      <div className="w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-12 xl:px-10">
        {/* Search */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-2xl">
            <div className="flex items-center border border-slate-200 bg-white px-4 transition-colors focus-within:border-[#F5C400]">
              <Search className="mr-3 h-4 w-4 shrink-0 text-slate-400" />
              <Input
                placeholder="Buscar por nombre, marca o código..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-12 border-0 bg-transparent px-0 text-sm shadow-none placeholder:text-slate-400 focus-visible:ring-0"
              />
            </div>
          </div>
          <Button
            variant="outline"
            className="h-12 rounded-none border-slate-200 lg:hidden"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </div>

        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border border-[#F5C400]/40 bg-[#fff8db] px-4 py-3">
            <div className="flex items-center gap-2 text-sm font-medium text-[#0b2d60]">
              <Filter className="h-4 w-4 text-[#F5C400]" />
              {filteredProducts.length} producto
              {filteredProducts.length !== 1 ? 's' : ''} encontrado
              {filteredProducts.length !== 1 ? 's' : ''}
            </div>
            <button
              type="button"
              onClick={clearFilters}
              className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#0b2d60] hover:text-red-600"
            >
              <X className="h-3.5 w-3.5" />
              Limpiar filtros
            </button>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[240px_1fr] xl:grid-cols-[260px_1fr]">
          {/* Sidebar */}
          <aside
            className={`h-fit border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-24 ${
              showMobileFilters ? 'block' : 'hidden lg:block'
            }`}
          >
            <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="flex items-center gap-2 text-base font-bold text-[#0c1427]">
                <span className="flex h-8 w-8 items-center justify-center bg-[#0b2d60] text-white">
                  <Filter className="h-4 w-4" />
                </span>
                Filtros
              </h2>
              <button
                type="button"
                onClick={() => setShowMobileFilters(false)}
                className="lg:hidden"
                aria-label="Cerrar filtros"
              >
                <X className="h-4 w-4 text-slate-500" />
              </button>
            </div>

            {/* Top products */}
            <div className="mb-5 border border-slate-100 p-3">
              <div className="mb-3 flex items-center gap-2">
                <Star className="h-3.5 w-3.5 fill-[#F5C400] text-[#F5C400]" />
                <h3 className="text-xs font-bold uppercase tracking-wide text-[#0c1427]">
                  Productos top
                </h3>
              </div>
              <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={showTopProducts}
                  onChange={(e) => setShowTopProducts(e.target.checked)}
                  className="h-4 w-4 accent-[#F5C400]"
                />
                Solo productos estrella
              </label>
            </div>

            {/* Categories — sin scroll feo: mostrar todas o Ver más */}
            <div className="mb-5 border border-slate-100 p-3">
              <div className="mb-3 flex items-center gap-2">
                <Package className="h-3.5 w-3.5 text-[#0b2d60]" />
                <h3 className="text-xs font-bold uppercase tracking-wide text-[#0c1427]">
                  Categorías
                </h3>
              </div>
              <div className="space-y-2">
                {(showAllCategories
                  ? categories
                  : categories.slice(0, 6)
                ).map((cat) => (
                  <label
                    key={cat}
                    className="flex cursor-pointer items-center gap-3 text-sm text-slate-700 hover:text-[#0b2d60]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="h-4 w-4 shrink-0 accent-[#F5C400]"
                    />
                    <span className="leading-snug">{cat}</span>
                  </label>
                ))}
              </div>
              {categories.length > 6 && (
                <button
                  type="button"
                  onClick={() => setShowAllCategories((v) => !v)}
                  className="mt-3 text-xs font-bold uppercase tracking-wide text-[#F5C400] transition-colors hover:text-[#0b2d60]"
                >
                  {showAllCategories
                    ? 'Ver menos'
                    : `Ver más (${categories.length - 6})`}
                </button>
              )}
            </div>

            {/* Certifications */}
            <div className="mb-5 border border-slate-100 p-3">
              <div className="mb-3 flex items-center gap-2">
                <Award className="h-3.5 w-3.5 text-[#0b2d60]" />
                <h3 className="text-xs font-bold uppercase tracking-wide text-[#0c1427]">
                  Certificación
                </h3>
              </div>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <label
                    key={cert}
                    className="flex cursor-pointer items-center gap-3 text-sm text-slate-700 hover:text-[#0b2d60]"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCertifications.includes(cert)}
                      onChange={() => toggleCertification(cert)}
                      className="h-4 w-4 accent-[#F5C400]"
                    />
                    {cert}
                  </label>
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-5 border border-slate-100 p-3">
              <div className="mb-3 flex items-center gap-2">
                <DollarSign className="h-3.5 w-3.5 text-[#0b2d60]" />
                <h3 className="text-xs font-bold uppercase tracking-wide text-[#0c1427]">
                  Rango de precio
                </h3>
              </div>
              <div className="space-y-2">
                {[
                  { value: 'low', label: 'Menos de $20' },
                  { value: 'medium', label: '$20 - $80' },
                  { value: 'high', label: 'Más de $80' },
                ].map((range) => (
                  <label
                    key={range.value}
                    className="flex cursor-pointer items-center gap-3 text-sm text-slate-700 hover:text-[#0b2d60]"
                  >
                    <input
                      type="radio"
                      name="price"
                      value={range.value}
                      checked={priceRange === range.value}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="h-4 w-4 accent-[#F5C400]"
                    />
                    {range.label}
                  </label>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex h-10 w-full items-center justify-center gap-2 border border-slate-200 text-xs font-bold uppercase tracking-wide text-slate-600 transition-colors hover:border-red-300 hover:text-red-600"
              >
                <X className="h-3.5 w-3.5" />
                Limpiar filtros
              </button>
            )}
          </aside>

          {/* Grid */}
          <div>
            {loading ? (
              <div className="border border-slate-200 bg-white p-12 text-center">
                <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-[#0b2d60]" />
                <h3 className="text-lg font-bold text-[#0c1427]">
                  Cargando productos...
                </h3>
              </div>
            ) : error ? (
              <div className="border border-red-200 bg-white p-12 text-center">
                <Package className="mx-auto mb-4 h-10 w-10 text-red-500" />
                <h3 className="mb-2 text-lg font-bold text-[#0c1427]">
                  Error al cargar productos
                </h3>
                <p className="mb-4 text-sm text-slate-600">{error}</p>
                <button
                  type="button"
                  onClick={() => window.location.reload()}
                  className="inline-flex h-10 items-center border border-red-300 px-4 text-xs font-bold uppercase text-red-600"
                >
                  Reintentar
                </button>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="border border-dashed border-slate-300 bg-white p-12 text-center">
                <Package className="mx-auto mb-4 h-10 w-10 text-slate-400" />
                <h3 className="mb-2 text-lg font-bold text-[#0c1427]">
                  No se encontraron productos
                </h3>
                <p className="mb-4 text-sm text-slate-500">
                  Ajusta o limpia los filtros de búsqueda.
                </p>
                {hasActiveFilters && (
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="inline-flex h-10 items-center bg-[#0b2d60] px-5 text-xs font-bold uppercase text-white"
                  >
                    Limpiar filtros
                  </button>
                )}
              </div>
            ) : (
              <>
                <div className="mb-4 text-sm text-slate-500">
                  Mostrando{' '}
                  <span className="font-semibold text-[#0b2d60]">
                    {filteredProducts.length}
                  </span>{' '}
                  productos
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                  {paginatedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: index * 0.04 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((prev) => Math.max(1, prev - 1))
                      }
                      disabled={currentPage === 1}
                      className="inline-flex h-10 items-center gap-1 border border-slate-200 bg-white px-3 text-xs font-bold uppercase text-[#0b2d60] disabled:opacity-40"
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Anterior
                    </button>

                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => {
                          if (
                            page === 1 ||
                            page === totalPages ||
                            (page >= currentPage - 1 && page <= currentPage + 1)
                          ) {
                            return (
                              <button
                                key={page}
                                type="button"
                                onClick={() => setCurrentPage(page)}
                                className={`inline-flex h-10 min-w-[40px] items-center justify-center border text-xs font-bold ${
                                  currentPage === page
                                    ? 'border-[#0b2d60] bg-[#0b2d60] text-white'
                                    : 'border-slate-200 bg-white text-[#0b2d60] hover:border-[#F5C400]'
                                }`}
                              >
                                {page}
                              </button>
                            );
                          }
                          if (
                            page === currentPage - 2 ||
                            page === currentPage + 2
                          ) {
                            return (
                              <span key={page} className="px-1 text-slate-400">
                                ...
                              </span>
                            );
                          }
                          return null;
                        },
                      )}
                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setCurrentPage((prev) =>
                          Math.min(totalPages, prev + 1),
                        )
                      }
                      disabled={currentPage === totalPages}
                      className="inline-flex h-10 items-center gap-1 border border-slate-200 bg-white px-3 text-xs font-bold uppercase text-[#0b2d60] disabled:opacity-40"
                    >
                      Siguiente
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                )}

                <p className="mt-4 text-center text-sm text-slate-500">
                  Mostrando {startIndex + 1} –{' '}
                  {Math.min(endIndex, filteredProducts.length)} de{' '}
                  {filteredProducts.length} productos
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

