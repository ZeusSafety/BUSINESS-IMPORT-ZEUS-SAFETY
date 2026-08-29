'use client';

import { ProductCard } from '@/components/products/product-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  GridColumnSwitcher,
  gridColsClass,
  type CatalogGridCols,
} from '@/components/ui/grid-column-switcher';
import { SortSelect, type SortOption } from '@/components/ui/sort-select';
import { PageLoader } from '@/components/ui/spinner';
import { ProductGridSkeleton } from '@/components/ui/skeleton';
import { Product, certifications } from '@/lib/mockData';
import { Search, Filter, X, Package, Award, DollarSign, SlidersHorizontal, Star, ChevronLeft, ChevronRight, Minus, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

import {
  PRODUCTS_API_URL,
  buildCatalogFromApi,
  transformApiProduct,
  type ApiProduct,
  type CatalogProduct,
} from '@/lib/product-catalog';

export default function ProductsPage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <ProductsPageContent />
    </Suspense>
  );
}

function ProductsPageContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [allProducts, setAllProducts] = useState<CatalogProduct[]>([]);
  const [starProducts, setStarProducts] = useState<Product[]>([]); // Productos estrella cargados directamente
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(500);
  const [priceFilterOpen, setPriceFilterOpen] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showTopProducts, setShowTopProducts] = useState(false);
  const [starProductIds, setStarProductIds] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [gridCols, setGridCols] = useState<CatalogGridCols>(4);
  const productsPerPage = 12;

  const priceBounds = useMemo(() => {
    const prices = allProducts
      .map((p) => p.price)
      .filter((p) => Number.isFinite(p) && p >= 0);
    if (prices.length === 0) return { min: 0, max: 500 };
    const min = Math.floor(Math.min(...prices));
    const max = Math.ceil(Math.max(...prices));
    return { min, max: max <= min ? min + 1 : max };
  }, [allProducts]);

  useEffect(() => {
    setPriceMin(priceBounds.min);
    setPriceMax(priceBounds.max);
  }, [priceBounds.min, priceBounds.max]);

  // Filtro desde URL (?categoria=...)
  useEffect(() => {
    const cat = searchParams.get('categoria');
    if (!cat?.trim()) return;
    const decoded = cat.trim();
    const match =
      categories.find(
        (c) => c.toLowerCase() === decoded.toLowerCase(),
      ) || decoded;
    setSelectedCategories([match]);
    setShowTopProducts(false);
    setCurrentPage(1);
  }, [searchParams, categories]);

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
        const response = await fetch(PRODUCTS_API_URL);
        
        if (!response.ok) {
          throw new Error('Error al cargar los productos');
        }
        
        const data = (await response.json()) as ApiProduct[];
        const catalogProducts = buildCatalogFromApi(data);
        setAllProducts(catalogProducts);
        setProducts(catalogProducts);
        
        // Extraer categorías únicas de los productos
        const uniqueCategories = Array.from(
          new Set(catalogProducts.map((p) => p.category)),
        ) as string[];
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
    setPriceMin(priceBounds.min);
    setPriceMax(priceBounds.max);
    setSearchQuery('');
    setShowTopProducts(false);
    setSortBy('default');
    setCurrentPage(1);
  };

  const priceFilterActive =
    priceMin > priceBounds.min || priceMax < priceBounds.max;

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedCertifications.length > 0 ||
    priceFilterActive ||
    showTopProducts;

  // Debug: Log cuando cambia el filtro de productos top
  useEffect(() => {
    if (showTopProducts && starProductIds.length > 0) {
      console.log('🔍 Filtro Productos Top activado');
      console.log('📊 IDs de productos estrella disponibles:', starProductIds.length);
      console.log('📦 Productos totales en catálogo:', products.length);
      const topProductsFound = products.filter((p) =>
        p.variantIds.some((id) => starProductIds.includes(id)),
      );
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
    if (showTopProducts && starProductIds.length > 0) {
      setProducts(
        allProducts.filter((p) =>
          p.variantIds.some((id) => starProductIds.includes(id)),
        ),
      );
    } else if (!showTopProducts) {
      // Si el filtro está desactivado, mostrar todos los productos del catálogo
      setProducts(allProducts);
    }
  }, [showTopProducts, starProductIds, allProducts]);

  const filteredProducts = products.filter((product) => {
    const catalogProduct = product as CatalogProduct;
    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      catalogProduct.variantNames?.some((name) =>
        name.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ||
      (product.description &&
        product.description.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(product.category);
    const matchesCertification =
      selectedCertifications.length === 0 ||
      product.certification.some((cert) =>
        selectedCertifications.includes(cert),
      );

    const matchesPrice =
      catalogProduct.maxPrice >= priceMin && catalogProduct.minPrice <= priceMax;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesCertification &&
      matchesPrice
    );
  });

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortBy) {
      case 'popularity':
        return list.sort((a, b) => {
          const aStar = a.variantIds.some((id) => starProductIds.includes(id)) ? 1 : 0;
          const bStar = b.variantIds.some((id) => starProductIds.includes(id)) ? 1 : 0;
          if (bStar !== aStar) return bStar - aStar;
          return a.name.localeCompare(b.name, 'es');
        });
      case 'newest':
        return list.sort((a, b) => {
          const aId = parseInt(a.id.replace(/\D/g, ''), 10) || 0;
          const bId = parseInt(b.id.replace(/\D/g, ''), 10) || 0;
          return bId - aId;
        });
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      default:
        return list;
    }
  }, [filteredProducts, sortBy, starProductIds]);

  // Paginación
  const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedProducts = sortedProducts.slice(startIndex, endIndex);

  // Resetear a la primera página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedCategories,
    selectedCertifications,
    priceMin,
    priceMax,
    showTopProducts,
    sortBy,
  ]);

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      {/* Hero */}
      <section className="relative flex h-[240px] items-center justify-center overflow-hidden sm:h-[280px]">
        <Image
          src="/inventario.jpg"
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
        {/* Search + columnas */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative min-w-0 flex-1">
            <div className="flex h-12 items-center border border-slate-200 bg-white px-4 transition-colors focus-within:border-[#0b2d60] focus-within:shadow-[0_0_0_3px_rgba(11,45,96,0.08)]">
              <Search className="mr-3 h-4 w-4 shrink-0 text-[#0b2d60]" />
              <Input
                placeholder="Buscar por nombre, marca o código..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-full border-0 bg-transparent px-0 text-sm text-[#0c1427] shadow-none placeholder:text-slate-400 focus-visible:ring-0"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Limpiar búsqueda"
                  className="ml-2 flex h-7 w-7 items-center justify-center text-slate-400 transition-colors hover:text-[#0b2d60]"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <GridColumnSwitcher
              value={gridCols}
              onChange={setGridCols}
              ariaLabel="Columnas del catálogo"
            />

            <Button
              variant="outline"
              className="h-12 rounded-none border-slate-200 lg:hidden"
              onClick={() => setShowMobileFilters(!showMobileFilters)}
            >
              <SlidersHorizontal className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </div>
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

            {/* Precio — slider S/ */}
            <div className="mb-5 border border-slate-100 p-3">
              <button
                type="button"
                onClick={() => setPriceFilterOpen((v) => !v)}
                className="mb-1 flex w-full items-center justify-between gap-2"
              >
                <div className="flex items-center gap-2">
                  <DollarSign className="h-3.5 w-3.5 text-[#0b2d60]" />
                  <h3 className="text-xs font-bold uppercase tracking-wide text-[#0c1427]">
                    Precio
                  </h3>
                </div>
                {priceFilterOpen ? (
                  <Minus className="h-3.5 w-3.5 text-slate-400" />
                ) : (
                  <Plus className="h-3.5 w-3.5 text-slate-400" />
                )}
              </button>

              {priceFilterOpen && (
                <div className="pt-3">
                  <div className="relative h-6">
                    <div className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-slate-200" />
                    <div
                      className="absolute top-1/2 h-1 -translate-y-1/2 rounded-full bg-[#0b2d60]"
                      style={{
                        left: `${
                          ((priceMin - priceBounds.min) /
                            (priceBounds.max - priceBounds.min || 1)) *
                          100
                        }%`,
                        right: `${
                          100 -
                          ((priceMax - priceBounds.min) /
                            (priceBounds.max - priceBounds.min || 1)) *
                            100
                        }%`,
                      }}
                    />
                    <input
                      type="range"
                      min={priceBounds.min}
                      max={priceBounds.max}
                      step={1}
                      value={priceMin}
                      onChange={(e) => {
                        const next = Number(e.target.value);
                        setPriceMin(Math.min(next, priceMax));
                      }}
                      className="price-range-thumb absolute inset-0 z-20 w-full appearance-none bg-transparent"
                      aria-label="Precio mínimo"
                    />
                    <input
                      type="range"
                      min={priceBounds.min}
                      max={priceBounds.max}
                      step={1}
                      value={priceMax}
                      onChange={(e) => {
                        const next = Number(e.target.value);
                        setPriceMax(Math.max(next, priceMin));
                      }}
                      className="price-range-thumb absolute inset-0 z-30 w-full appearance-none bg-transparent"
                      aria-label="Precio máximo"
                    />
                  </div>
                  <p className="mt-2 text-center text-sm text-slate-500">
                    S/ {priceMin.toFixed(2)} – S/ {priceMax.toFixed(2)}
                  </p>
                </div>
              )}
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
              <ProductGridSkeleton count={8} columns={4} />
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
                <div className="relative z-40 mb-4 flex flex-wrap items-center justify-between gap-3">
                  <p className="text-sm text-slate-500">
                    Mostrando{' '}
                    <span className="font-semibold text-[#0b2d60]">
                      {sortedProducts.length}
                    </span>{' '}
                    productos
                  </p>

                  <SortSelect value={sortBy} onChange={setSortBy} />
                </div>

                <div className={`relative z-0 ${gridColsClass(gridCols)}`}>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

