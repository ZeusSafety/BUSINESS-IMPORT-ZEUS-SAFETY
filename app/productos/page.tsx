'use client';

import { ProductCard } from '@/components/products/product-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Product, certifications } from '@/lib/mockData';
import { Search, Filter, X, Package, Award, DollarSign, SlidersHorizontal, Loader2, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
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
  const productsPerPage = 9;

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1528] via-[#0b2d60] to-[#0c1427] text-white">
        {/* Efectos de fondo mejorados */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(0,181,226,0.25),transparent_50%),radial-gradient(circle_at_85%_15%,rgba(16,58,123,0.3),transparent_45%),radial-gradient(circle_at_50%_80%,rgba(0,181,226,0.15),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(0,181,226,0.08)_0%,transparent_50%,rgba(16,58,123,0.12)_100%)]" />
        
        {/* Patrón de grid sutil */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />
        
        <div className="relative mx-auto max-w-7xl px-2 py-12 sm:px-3 lg:px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-center"
          >
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#00d2ff]">
              Catálogo
            </p>
            <h1 className="text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              EPP y{' '}
              <span className="bg-gradient-to-r from-[#00d2ff] to-[#00b5e2] bg-clip-text text-transparent">
                Seguridad Industrial
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-slate-200 sm:text-xl">
              Explora productos certificados listos para cotizar en volumen. 
              Stock inmediato y asesoría especializada.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-2 py-12 sm:px-3 lg:px-4">
        {/* Search and Mobile Filter Toggle */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full lg:w-[calc(100%-288px)] max-w-full">
            <div className="group relative flex w-full items-center">
              <div className="flex w-full items-center rounded-2xl bg-white border-2 border-slate-200 shadow-md transition-all duration-300 hover:border-[#103a7b]/50 hover:shadow-lg focus-within:border-[#103a7b] focus-within:shadow-xl focus-within:ring-4 focus-within:ring-[#103a7b]/10">
                <div className="flex items-center px-5 py-2.5 flex-1 min-w-0">
                  <Search className="h-5 w-5 shrink-0 text-slate-400 transition-colors duration-200 group-focus-within:text-[#103a7b] mr-4" />
                  <Input
                    placeholder="Buscar por nombre, marca o código..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 bg-transparent px-0 text-base placeholder:text-slate-400/70 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 min-w-0 h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="lg:hidden border-2 border-slate-300 shadow-sm hover:shadow-md"
            onClick={() => setShowMobileFilters(!showMobileFilters)}
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filtros
          </Button>
        </div>

        {/* Results Count and Clear Filters */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl bg-blue-50 border border-blue-200 p-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-[#103a7b]" />
              <span className="text-sm font-medium text-slate-700">
                {filteredProducts.length} producto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-slate-600 hover:text-red-600"
            >
              <X className="mr-2 h-4 w-4" />
              Limpiar filtros
            </Button>
          </div>
        )}

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Filters Sidebar */}
          <aside className={`space-y-6 rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white via-slate-50/30 to-white p-6 shadow-xl lg:sticky lg:top-8 lg:h-fit ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-slate-200">
              <h2 className="text-xl font-black text-slate-900 flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#103a7b] to-[#00b5e2] text-white shadow-md">
                  <Filter className="h-5 w-5" />
                </div>
                Filtros
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileFilters(false)}
                className="lg:hidden hover:bg-slate-100"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Productos Top */}
            <div className="rounded-xl bg-gradient-to-br from-amber-50/50 to-white p-4 border border-amber-200/50">
              <div className="mb-3 flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-sm">
                  <Star className="h-3.5 w-3.5 fill-white" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-wide text-slate-900">Productos Top</h3>
              </div>
              <label className="group flex items-center gap-3 rounded-lg p-3 transition-all hover:bg-white/80 cursor-pointer border-2 border-transparent hover:border-amber-200">
                <input
                  type="checkbox"
                  checked={showTopProducts}
                  onChange={(e) => setShowTopProducts(e.target.checked)}
                  className="h-4 w-4 rounded border-2 border-slate-300 text-[#103a7b] focus:ring-2 focus:ring-[#103a7b]/20 cursor-pointer"
                />
                <span className="text-sm font-bold text-slate-700 group-hover:text-[#103a7b] transition-colors flex items-center gap-2">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  Solo productos estrella
                </span>
              </label>
            </div>

            {/* Categories */}
            <div className="rounded-xl bg-gradient-to-br from-blue-50/30 to-white p-4 border border-blue-200/50">
              <div className="mb-3 flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-[#103a7b] to-[#00b5e2] text-white shadow-sm">
                  <Package className="h-3.5 w-3.5" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-wide text-slate-900">Categorías</h3>
              </div>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="group flex items-center gap-3 rounded-lg p-2.5 transition-all hover:bg-white/80 cursor-pointer border-2 border-transparent hover:border-blue-200"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="h-4 w-4 rounded border-2 border-slate-300 text-[#103a7b] focus:ring-2 focus:ring-[#103a7b]/20 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-[#103a7b] transition-colors">
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="rounded-xl bg-gradient-to-br from-emerald-50/30 to-white p-4 border border-emerald-200/50">
              <div className="mb-3 flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-sm">
                  <Award className="h-3.5 w-3.5" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-wide text-slate-900">Certificación</h3>
              </div>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <label
                    key={cert}
                    className="group flex items-center gap-3 rounded-lg p-2.5 transition-all hover:bg-white/80 cursor-pointer border-2 border-transparent hover:border-emerald-200"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCertifications.includes(cert)}
                      onChange={() => toggleCertification(cert)}
                      className="h-4 w-4 rounded border-2 border-slate-300 text-[#103a7b] focus:ring-2 focus:ring-[#103a7b]/20 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-[#103a7b] transition-colors">
                      {cert}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div className="rounded-xl bg-gradient-to-br from-purple-50/30 to-white p-4 border border-purple-200/50">
              <div className="mb-3 flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-sm">
                  <DollarSign className="h-3.5 w-3.5" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-wide text-slate-900">Rango de precio</h3>
              </div>
              <div className="space-y-2">
                {[
                  { value: 'low', label: 'Menos de $20' },
                  { value: 'medium', label: '$20 - $80' },
                  { value: 'high', label: 'Más de $80' },
                ].map((range) => (
                  <label
                    key={range.value}
                    className="group flex items-center gap-3 rounded-lg p-2.5 transition-all hover:bg-white/80 cursor-pointer border-2 border-transparent hover:border-purple-200"
                  >
                    <input
                      type="radio"
                      name="price"
                      value={range.value}
                      checked={priceRange === range.value}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="h-4 w-4 border-2 border-slate-300 text-[#103a7b] focus:ring-2 focus:ring-[#103a7b]/20 cursor-pointer"
                    />
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-[#103a7b] transition-colors">
                      {range.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="w-full border-slate-300 text-slate-600 hover:text-red-600 hover:border-red-300"
              >
                <X className="mr-2 h-4 w-4" />
                Limpiar todos los filtros
              </Button>
            )}
          </aside>

          {/* Products Grid */}
          <div>
            {loading ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border-2 border-slate-200 bg-gradient-to-br from-white to-slate-50 p-12 text-center"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#00b5e2]/10 to-[#103a7b]/10">
                  <Loader2 className="h-10 w-10 text-[#103a7b] animate-spin" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900">
                  Cargando productos...
                </h3>
                <p className="text-sm text-slate-600">
                  Por favor espera mientras cargamos el catálogo.
                </p>
              </motion.div>
            ) : error ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border-2 border-red-200 bg-gradient-to-br from-red-50 to-white p-12 text-center"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-red-100 to-red-50">
                  <Package className="h-10 w-10 text-red-500" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900">
                  Error al cargar productos
                </h3>
                <p className="mb-6 text-sm text-slate-600">
                  {error}
                </p>
                <Button 
                  onClick={() => window.location.reload()} 
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  Reintentar
                </Button>
              </motion.div>
            ) : filteredProducts.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-3xl border-2 border-dashed border-slate-300 bg-gradient-to-br from-white to-slate-50 p-12 text-center"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#00b5e2]/10 to-[#103a7b]/10">
                  <Package className="h-10 w-10 text-slate-400" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900">
                  No se encontraron productos
                </h3>
                <p className="mb-6 text-sm text-slate-600">
                  Intenta ajustar tus filtros de búsqueda o limpiar los filtros activos.
                </p>
                {hasActiveFilters && (
                  <Button onClick={clearFilters} variant="outline">
                    Limpiar filtros
                  </Button>
                )}
              </motion.div>
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {paginatedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>

                {/* Paginación */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                      disabled={currentPage === 1}
                      className="border-2 border-slate-300 hover:border-[#103a7b] hover:bg-[#103a7b] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="h-4 w-4 mr-1" />
                      Anterior
                    </Button>
                    
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                        // Mostrar solo algunas páginas alrededor de la actual
                        if (
                          page === 1 ||
                          page === totalPages ||
                          (page >= currentPage - 1 && page <= currentPage + 1)
                        ) {
                          return (
                            <Button
                              key={page}
                              variant={currentPage === page ? undefined : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(page)}
                              className={`min-w-[40px] border-2 ${
                                currentPage === page
                                  ? "bg-gradient-to-r from-[#103a7b] to-[#00b5e2] text-white border-[#103a7b] shadow-md"
                                  : "border-slate-300 hover:border-[#103a7b] hover:bg-[#103a7b] hover:text-white"
                              }`}
                            >
                              {page}
                            </Button>
                          );
                        } else if (page === currentPage - 2 || page === currentPage + 2) {
                          return (
                            <span key={page} className="px-2 text-slate-400">
                              ...
                            </span>
                          );
                        }
                        return null;
                      })}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                      disabled={currentPage === totalPages}
                      className="border-2 border-slate-300 hover:border-[#103a7b] hover:bg-[#103a7b] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Siguiente
                      <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </div>
                )}

                {/* Información de paginación */}
                <div className="mt-4 text-center text-sm text-slate-600">
                  Mostrando {startIndex + 1} - {Math.min(endIndex, filteredProducts.length)} de {filteredProducts.length} productos
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

