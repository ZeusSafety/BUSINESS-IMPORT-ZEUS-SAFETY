'use client';

import { Product } from '@/lib/mockData';
import { notFound, useRouter } from 'next/navigation';
import { AddToQuoteButton } from '@/components/products/add-to-quote-button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, FileText, ExternalLink, Package, Tag, Ruler, Palette, Layers, Info, Shield, Factory } from 'lucide-react';
import { useState, useEffect, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: Promise<{ slug: string }>;
};

// Tipo para los datos de la API
type ApiProduct = {
  ID: number;
  CODIGO?: string;
  NOMBRE: string;
  CATEGORIA: string;
  TIPO_PRODUCTO: string | null;
  COLOR_TIPO: string | null;
  TAMAÑO?: string | null;
  PARES_POR_CAJA: number | null;
  FICHA_TECNICA_ENLACE: string | null;
  IMG_URL: string | null;
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

// Función para normalizar slug para comparación
function normalizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Función para mapear categorías de la API a categorías del sistema
function mapCategory(apiCategory: string): string {
  const categoryMap: Record<string, string> = {
    'Corporal': 'Protección de Cabeza',
    'Guantes': 'Protección Manual',
    'Manual': 'Protección Manual',
    'Visual': 'Protección Visual',
    'Lentes': 'Protección Visual',
    'Respiradores': 'Protección Respiratoria',
    'Respiratoria': 'Protección Respiratoria',
    'Auditiva': 'Protección Auditiva',
    'Auditivo': 'Protección Auditiva',
    'Calzado': 'Calzado de Seguridad',
    'Vial': 'Vial',
    'Laboral': 'Laboral',
    'Electric': 'Electric',
    'SEGURIDAD INDUSTRIAL': 'SEGURIDAD INDUSTRIAL',
    'Delivery': 'Delivery',
  };
  return categoryMap[apiCategory] || apiCategory;
}

// Función para transformar datos de la API al formato Product
function transformApiProduct(apiProduct: ApiProduct): Product & { 
  fichaTecnica?: string;
  codigo?: string;
  tamanio?: string | null;
  apiData?: ApiProduct;
} {
  const price = parseFloat(apiProduct.PRECIO) || 0;
  const specs = [];
  
  if (apiProduct.PARES_POR_CAJA) {
    specs.push({ label: 'Pares por caja', value: apiProduct.PARES_POR_CAJA.toString() });
  }
  if (apiProduct.COLOR_TIPO) {
    specs.push({ label: 'Color/Tipo', value: apiProduct.COLOR_TIPO });
  }
  if (apiProduct.TIPO_PRODUCTO) {
    specs.push({ label: 'Tipo de Producto', value: apiProduct.TIPO_PRODUCTO });
  }
  if (apiProduct.TAMAÑO) {
    specs.push({ label: 'Tamaño', value: apiProduct.TAMAÑO });
  }
  if (apiProduct.CODIGO) {
    specs.push({ label: 'Código', value: apiProduct.CODIGO });
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
    image: apiProduct.IMG_URL || '',
    fichaTecnica: apiProduct.FICHA_TECNICA_ENLACE || undefined,
    codigo: apiProduct.CODIGO,
    tamanio: apiProduct.TAMAÑO,
    apiData: apiProduct, // Guardar todos los datos originales
  };
}

export default function ProductDetailPage({ params }: Props) {
  const { slug } = use(params);
  const [product, setProduct] = useState<(Product & { 
    fichaTecnica?: string;
    codigo?: string;
    tamanio?: string | null;
    apiData?: ApiProduct;
  }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        
        // Decodificar y normalizar el slug de la URL
        const decodedSlug = decodeURIComponent(slug);
        const normalizedSearchSlug = normalizeSlug(decodedSlug);
        
        console.log('Buscando producto con slug:', decodedSlug);
        console.log('Slug normalizado:', normalizedSearchSlug);
        
        const response = await fetch('https://productoscrud-2946605267.us-central1.run.app?metodo=LISTADO_PRODUCTOS_ESTATICA');
        
        if (!response.ok) {
          throw new Error('Error al cargar el producto');
        }
        
        const data = await response.json();
        
        // Transformar los productos de la API
        const transformedProducts = data.map(transformApiProduct);
        
        console.log('🔍 Buscando producto...');
        console.log('📝 Slug recibido:', decodedSlug);
        console.log('📝 Slug normalizado:', normalizedSearchSlug);
        console.log('📦 Total de productos cargados:', transformedProducts.length);
        
        // Buscar el producto por slug (comparación flexible)
        let foundProduct = transformedProducts.find((p: Product) => {
          const productSlugNormalized = normalizeSlug(p.slug);
          const productNameNormalized = normalizeSlug(generateSlug(p.name));
          const productNameLower = normalizeSlug(p.name.toLowerCase());
          
          // Múltiples estrategias de búsqueda
          return productSlugNormalized === normalizedSearchSlug || 
                 p.slug === decodedSlug ||
                 p.slug === normalizedSearchSlug ||
                 productNameNormalized === normalizedSearchSlug ||
                 productNameLower === normalizedSearchSlug ||
                 normalizeSlug(p.name) === normalizedSearchSlug ||
                 // También comparar sin normalizar
                 p.slug.toLowerCase() === decodedSlug.toLowerCase() ||
                 p.name.toLowerCase().replace(/\s+/g, '-') === normalizedSearchSlug ||
                 // Buscar por ID si el slug contiene el ID
                 (decodedSlug.includes(p.id.replace('prd-', '')) && decodedSlug.length < 10);
        });
        
        // Si no se encuentra, intentar buscar por ID o nombre (fallback)
        if (!foundProduct) {
          console.log('⚠️ No se encontró por slug exacto, intentando búsqueda flexible...');
          
          // Intentar buscar por ID si el slug es un número
          const slugAsId = parseInt(decodedSlug);
          if (!isNaN(slugAsId)) {
            foundProduct = transformedProducts.find((p: Product) => p.id === `prd-${slugAsId}`);
            if (foundProduct) {
              console.log('✅ Producto encontrado por ID:', slugAsId);
            }
          }
          
          // Si aún no se encuentra, buscar por nombre parcial (más flexible)
          if (!foundProduct) {
            const searchTerms = normalizedSearchSlug.split('-').filter(t => t.length > 2);
            console.log('🔎 Términos de búsqueda:', searchTerms);
            
            if (searchTerms.length > 0) {
              foundProduct = transformedProducts.find((p: Product) => {
                const productNameLower = normalizeSlug(p.name.toLowerCase());
                const productSlugLower = normalizeSlug(p.slug);
                // Verificar si todos los términos de búsqueda están en el nombre o slug
                const matches = searchTerms.every(term => 
                  productNameLower.includes(term) || 
                  productSlugLower.includes(term) ||
                  p.name.toLowerCase().includes(term)
                );
                if (matches) {
                  console.log('✅ Producto encontrado por búsqueda parcial:', p.name);
                }
                return matches;
              });
            }
          }
        } else {
          console.log('✅ Producto encontrado por slug exacto:', foundProduct.name);
        }
        
        if (!foundProduct) {
          console.error('Producto no encontrado. Slug buscado:', decodedSlug);
          console.error('Slug normalizado buscado:', normalizedSearchSlug);
          console.error('Todos los slugs disponibles:', transformedProducts.map((p: Product) => ({
            slug: p.slug,
            normalized: normalizeSlug(p.slug),
            name: p.name
          })));
          setError('Producto no encontrado');
          return;
        }
        
        console.log('Producto encontrado:', foundProduct.name);
        
        setProduct(foundProduct);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <Loader2 className="h-12 w-12 text-[#103a7b] animate-spin mb-4" />
          <p className="text-lg font-medium text-slate-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Producto no encontrado</h2>
          <p className="text-slate-600 mb-6">
            {error && error !== 'Producto no encontrado' 
              ? error 
              : 'El producto que buscas no existe o no está disponible en este momento.'}
          </p>
          <Button onClick={() => router.push('/productos')} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al catálogo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        {/* Botón de regreso */}
        <Button
          variant="ghost"
          onClick={() => router.push('/productos')}
          className="mb-6 text-slate-600 hover:text-[#103a7b] hover:bg-slate-100"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al catálogo
        </Button>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Imagen del producto - Lado izquierdo */}
          <div className="space-y-5">
            {/* Imagen principal */}
            <Card className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-lg">
              <div className="relative h-[450px] w-full overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
                {product.image && product.image.trim() !== '' ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-contain p-10"
                    priority
                    unoptimized
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-[#103a7b]/10 to-slate-200/50 flex items-center justify-center mb-3">
                      <Package className="h-12 w-12 text-slate-300" />
                    </div>
                    <p className="text-sm font-medium text-slate-400">Imagen no disponible</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Precio y botón - Debajo de la imagen */}
            <Card className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-gradient-to-br from-white via-slate-50 to-white shadow-lg">
              <CardContent className="p-5">
                <div className="space-y-4">
                  <div className="text-center">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                      Precio Referencial
                    </p>
                    <p className="text-3xl font-black bg-gradient-to-r from-[#103a7b] to-[#00b5e2] bg-clip-text text-transparent">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>
                  <AddToQuoteButton product={product} />
                </div>
              </CardContent>
            </Card>

            {/* Ficha técnica */}
            {product.fichaTecnica && (
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full h-12 border-2 border-[#103a7b] text-[#103a7b] hover:bg-[#103a7b] hover:text-white shadow-md hover:shadow-lg transition-all font-semibold"
              >
                <a
                  href={product.fichaTecnica}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <FileText className="h-5 w-5" />
                  <span>Ver ficha técnica</span>
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}

            {/* Certificaciones */}
            {product.certification && product.certification.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.certification.map((cert) => (
                  <Badge key={cert} className="bg-gradient-to-br from-amber-50 to-amber-100 text-amber-800 border border-amber-200 px-3 py-1.5 shadow-sm">
                    <Shield className="h-3.5 w-3.5 mr-1.5 text-amber-600" />
                    <span className="font-bold text-xs">{cert}</span>
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Información del producto - Lado derecho */}
          <div className="space-y-6">
            {/* Header con categoría, marca y código */}
            <Card className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-lg">
              <CardContent className="p-6">
                <div className="mb-4 flex items-start justify-between gap-3 flex-wrap">
                  <Badge className="bg-gradient-to-r from-[#00b5e2] to-[#103a7b] text-white border-0 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg shadow-md">
                    {product.category}
                  </Badge>
                  <div className="flex items-center gap-2 rounded-lg bg-gradient-to-br from-slate-50 to-white px-3 py-1.5 border-2 border-slate-200 shadow-sm">
                    <Factory className="h-4 w-4 text-[#103a7b]" />
                    <span className="text-xs font-bold text-slate-800">{product.brand}</span>
                  </div>
                </div>
                
                {product.codigo && (
                  <div className="mb-4 flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2 border border-slate-200">
                    <Tag className="h-4 w-4 text-[#103a7b]" />
                    <span className="text-sm font-semibold text-slate-700">Código: <span className="text-[#103a7b]">{product.codigo}</span></span>
                  </div>
                )}
                
                {/* Título del producto */}
                <h1 className="text-3xl lg:text-4xl font-black leading-tight text-slate-900 mb-3">
                  {product.name}
                </h1>
              </CardContent>
            </Card>

            {/* Descripción del producto - Siempre se muestra */}
            <Card className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-lg">
              <div className="bg-gradient-to-r from-[#103a7b] to-[#00b5e2] px-6 py-4">
                <h3 className="text-lg font-black text-white flex items-center gap-3">
                  <FileText className="h-5 w-5" />
                  Descripción del Producto
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="prose prose-slate max-w-none">
                  <p className="text-base text-slate-700 leading-relaxed whitespace-pre-line">
                    {product.apiData?.DESCRIPCION && product.apiData.DESCRIPCION.trim() !== '' 
                      ? product.apiData.DESCRIPCION
                      : `Producto de seguridad industrial ${product.apiData?.TIPO_PRODUCTO ? product.apiData.TIPO_PRODUCTO : product.category} de alta calidad.${product.apiData?.COLOR_TIPO ? ` Disponible en ${product.apiData.COLOR_TIPO}.` : ''} Fabricado por ${product.brand}.`}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Especificaciones técnicas */}
            <Card className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-lg">
              <div className="bg-gradient-to-r from-[#103a7b] to-[#00b5e2] px-6 py-4">
                <h3 className="text-lg font-black text-white flex items-center gap-3">
                  <FileText className="h-5 w-5" />
                  Especificaciones Técnicas
                </h3>
              </div>
              <CardContent className="p-6">
                <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {product.apiData?.TIPO_PRODUCTO && (
                    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 via-white to-slate-50 p-5 border-2 border-slate-200 shadow-sm hover:shadow-md hover:border-[#103a7b]/30 transition-all">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-blue-100 to-blue-50 border border-blue-200">
                          <Layers className="h-5 w-5 text-[#103a7b]" />
                        </div>
                        <div className="flex-1">
                          <dt className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                            Tipo de Producto
                          </dt>
                          <dd className="text-base font-bold text-slate-900">{product.apiData.TIPO_PRODUCTO}</dd>
                        </div>
                      </div>
                    </div>
                  )}
                  {product.apiData?.COLOR_TIPO && (
                    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 via-white to-slate-50 p-5 border-2 border-slate-200 shadow-sm hover:shadow-md hover:border-[#103a7b]/30 transition-all">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-purple-100 to-purple-50 border border-purple-200">
                          <Palette className="h-5 w-5 text-purple-700" />
                        </div>
                        <div className="flex-1">
                          <dt className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                            Color/Tipo
                          </dt>
                          <dd className="text-base font-bold text-slate-900">{product.apiData.COLOR_TIPO}</dd>
                        </div>
                      </div>
                    </div>
                  )}
                  {product.apiData?.PARES_POR_CAJA && (
                    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 via-white to-slate-50 p-5 border-2 border-slate-200 shadow-sm hover:shadow-md hover:border-[#103a7b]/30 transition-all">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-amber-100 to-amber-50 border border-amber-200">
                          <Package className="h-5 w-5 text-amber-700" />
                        </div>
                        <div className="flex-1">
                          <dt className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                            Pares por Caja
                          </dt>
                          <dd className="text-base font-bold text-slate-900">{product.apiData.PARES_POR_CAJA}</dd>
                        </div>
                      </div>
                    </div>
                  )}
                  {product.apiData?.TAMAÑO && (
                    <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 via-white to-slate-50 p-5 border-2 border-slate-200 shadow-sm hover:shadow-md hover:border-[#103a7b]/30 transition-all">
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 p-2 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-50 border border-emerald-200">
                          <Ruler className="h-5 w-5 text-emerald-700" />
                        </div>
                        <div className="flex-1">
                          <dt className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                            Tamaño
                          </dt>
                          <dd className="text-base font-bold text-slate-900">{product.apiData.TAMAÑO}</dd>
                        </div>
                      </div>
                    </div>
                  )}
                  {product.specs && product.specs.length > 0 && product.specs.map((spec) => {
                    // Evitar duplicados de campos ya mostrados
                    if (spec.label === 'Código' || spec.label === 'Tipo de Producto' || 
                        spec.label === 'Color/Tipo' || spec.label === 'Tamaño' || 
                        spec.label === 'Pares por caja') {
                      return null;
                    }
                    return (
                      <div key={spec.label} className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 via-white to-slate-50 p-5 border-2 border-slate-200 shadow-sm hover:shadow-md hover:border-[#103a7b]/30 transition-all">
                        <dt className="text-xs font-black uppercase tracking-wide text-slate-500 mb-2">
                          {spec.label}
                        </dt>
                        <dd className="text-base font-bold text-slate-900">{spec.value}</dd>
                      </div>
                    );
                  })}
                </dl>
              </CardContent>
            </Card>

            {/* Información adicional */}
            <Card className="overflow-hidden rounded-2xl border-2 border-slate-200 bg-white shadow-lg">
              <div className="bg-gradient-to-r from-slate-700 to-slate-800 px-6 py-4">
                <h3 className="text-lg font-black text-white flex items-center gap-3">
                  <Info className="h-5 w-5" />
                  Información del Producto
                </h3>
              </div>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 hover:border-[#103a7b]/30 transition-all">
                    <span className="font-bold text-slate-700 flex items-center gap-2">
                      <Tag className="h-4 w-4 text-[#103a7b]" />
                      ID del Producto
                    </span>
                    <span className="text-slate-900 font-black text-base">{product.apiData?.ID || 'N/A'}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 hover:border-[#103a7b]/30 transition-all">
                    <span className="font-bold text-slate-700 flex items-center gap-2">
                      <Factory className="h-4 w-4 text-[#103a7b]" />
                      Marca
                    </span>
                    <span className="text-slate-900 font-bold">{product.brand}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-blue-50 to-white border-2 border-blue-200 hover:border-[#103a7b]/30 transition-all">
                    <span className="font-bold text-slate-700 flex items-center gap-2">
                      <Package className="h-4 w-4 text-[#103a7b]" />
                      Categoría
                    </span>
                    <Badge className="bg-gradient-to-r from-[#00b5e2] to-[#103a7b] text-white border-0 px-3 py-1 font-bold">
                      {product.category}
                    </Badge>
                  </div>
                  {product.apiData?.CATEGORIA && product.apiData.CATEGORIA !== product.category && (
                    <div className="flex items-center justify-between p-4 rounded-xl bg-gradient-to-br from-slate-50 to-white border-2 border-slate-200 hover:border-[#103a7b]/30 transition-all">
                      <span className="font-bold text-slate-700">Categoría Original</span>
                      <span className="text-slate-900 font-medium">{product.apiData.CATEGORIA}</span>
                    </div>
                  )}
                  {product.tags && product.tags.length > 0 && (
                    <div className="pt-2">
                      <p className="font-bold text-slate-700 mb-3">Etiquetas:</p>
                      <div className="flex flex-wrap gap-2">
                        {product.tags.map((tag) => (
                          <Badge key={tag} className="text-xs border-2 border-slate-300 bg-white text-slate-700 font-semibold px-3 py-1">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
