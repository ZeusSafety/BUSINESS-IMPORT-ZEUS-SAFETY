'use client';

import { ProductCard } from '@/components/products/product-card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { products, categories, certifications } from '@/lib/mockData';
import { Search, Filter, X, Package, Award, DollarSign, SlidersHorizontal } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedCertifications, setSelectedCertifications] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<string>('');
  const [showMobileFilters, setShowMobileFilters] = useState(false);

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
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0b2d60] via-[#103a7b] to-[#0a1528] text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,181,226,0.15),transparent_45%),radial-gradient(circle_at_80%_70%,rgba(16,58,123,0.12),transparent_40%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
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
            <p className="max-w-2xl text-lg text-slate-200 sm:text-xl">
              Explora productos certificados listos para cotizar en volumen. 
              Stock inmediato y asesoría especializada.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
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

        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
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
            {filteredProducts.length === 0 ? (
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
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

