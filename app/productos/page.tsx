'use client';

import { ProductCard } from '@/components/products/product-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Product, certifications } from '@/lib/mockData';
import { Search, Filter, X, Package, Award, DollarSign, SlidersHorizontal, Loader2 } from 'lucide-react';
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
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
        setProducts(transformedProducts);
        
        // Extraer categorías únicas de los productos
        const uniqueCategories = Array.from(new Set(transformedProducts.map((p: Product) => p.category)));
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
  };

  const hasActiveFilters = selectedCategories.length > 0 || selectedCertifications.length > 0 || priceRange !== '';

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

    return matchesSearch && matchesCategory && matchesCertification && matchesPrice;
  });

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
          <div className="relative flex-1 max-w-2xl">
            <div className="group relative flex w-full items-center">
              <div className="flex w-full items-center rounded-xl bg-white border-2 border-slate-200 shadow-sm transition-all duration-300 hover:border-[#103a7b]/40 hover:shadow-md focus-within:border-[#103a7b] focus-within:shadow-lg focus-within:ring-4 focus-within:ring-[#103a7b]/10">
                <div className="flex items-center px-4 py-3 flex-1 min-w-0">
                  <Search className="h-5 w-5 shrink-0 text-slate-400 transition-colors duration-200 group-focus-within:text-[#103a7b] mr-3" />
                  <Input
                    placeholder="Buscar por nombre, marca o código..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="border-0 bg-transparent px-0 text-sm placeholder:text-slate-400/70 focus-visible:ring-0 focus-visible:ring-offset-0 flex-1 min-w-0"
                  />
                </div>
              </div>
            </div>
          </div>
          <Button
            variant="outline"
            className="lg:hidden border-slate-300"
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

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* Filters Sidebar */}
          <aside className={`space-y-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-lg lg:sticky lg:top-8 lg:h-fit ${showMobileFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Filter className="h-5 w-5 text-[#103a7b]" />
                Filtros
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileFilters(false)}
                className="lg:hidden"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Categories */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Package className="h-4 w-4 text-[#103a7b]" />
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Categorías</h3>
              </div>
              <div className="space-y-2.5">
                {categories.map((cat) => (
                  <label
                    key={cat}
                    className="group flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-slate-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => toggleCategory(cat)}
                      className="h-4 w-4 rounded border-slate-300 text-[#103a7b] focus:ring-2 focus:ring-[#103a7b]/20 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-[#103a7b] transition-colors">
                      {cat}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <Award className="h-4 w-4 text-[#103a7b]" />
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Certificación</h3>
              </div>
              <div className="space-y-2.5">
                {certifications.map((cert) => (
                  <label
                    key={cert}
                    className="group flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-slate-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCertifications.includes(cert)}
                      onChange={() => toggleCertification(cert)}
                      className="h-4 w-4 rounded border-slate-300 text-[#103a7b] focus:ring-2 focus:ring-[#103a7b]/20 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-[#103a7b] transition-colors">
                      {cert}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <div className="mb-4 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-[#103a7b]" />
                <h3 className="text-sm font-bold uppercase tracking-wide text-slate-900">Rango de precio</h3>
              </div>
              <div className="space-y-2.5">
                {[
                  { value: 'low', label: 'Menos de $20' },
                  { value: 'medium', label: '$20 - $80' },
                  { value: 'high', label: 'Más de $80' },
                ].map((range) => (
                  <label
                    key={range.value}
                    className="group flex items-center gap-3 rounded-lg p-2.5 transition-colors hover:bg-slate-50 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="price"
                      value={range.value}
                      checked={priceRange === range.value}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="h-4 w-4 border-slate-300 text-[#103a7b] focus:ring-2 focus:ring-[#103a7b]/20 cursor-pointer"
                    />
                    <span className="text-sm font-medium text-slate-700 group-hover:text-[#103a7b] transition-colors">
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
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product, index) => (
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
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

