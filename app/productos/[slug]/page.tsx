'use client';

import { Product } from '@/lib/mockData';
import { notFound, useRouter } from 'next/navigation';
import { AddToQuoteButton } from '@/components/products/add-to-quote-button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ArrowLeft, FileText, ExternalLink } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  params: { slug: string };
};

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
    // Agregar campo adicional para la ficha técnica
    fichaTecnica: apiProduct.FICHA_TECNICA_ENLACE,
  } as Product & { fichaTecnica?: string };
}

export default function ProductDetailPage({ params }: Props) {
  const [product, setProduct] = useState<(Product & { fichaTecnica?: string }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        
        // Decodificar y normalizar el slug de la URL
        const decodedSlug = decodeURIComponent(params.slug);
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
        
        console.log('Total de productos cargados:', transformedProducts.length);
        console.log('Primeros 3 slugs:', transformedProducts.slice(0, 3).map((p: Product) => p.slug));
        
        // Buscar el producto por slug (comparación flexible)
        let foundProduct = transformedProducts.find((p: Product) => {
          const productSlugNormalized = normalizeSlug(p.slug);
          return productSlugNormalized === normalizedSearchSlug || p.slug === decodedSlug;
        });
        
        // Si no se encuentra, intentar buscar por ID o nombre (fallback)
        if (!foundProduct) {
          // Intentar buscar por ID si el slug es un número
          const slugAsId = parseInt(decodedSlug);
          if (!isNaN(slugAsId)) {
            foundProduct = transformedProducts.find((p: Product) => p.id === `prd-${slugAsId}`);
          }
          
          // Si aún no se encuentra, buscar por nombre normalizado
          if (!foundProduct) {
            foundProduct = transformedProducts.find((p: Product) => {
              const productSlug = normalizeSlug(p.slug);
              const productNameSlug = normalizeSlug(generateSlug(p.name));
              return productSlug === normalizedSearchSlug || productNameSlug === normalizedSearchSlug;
            });
          }
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
  }, [params.slug]);

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Botón de regreso */}
        <Button
          variant="ghost"
          onClick={() => router.push('/productos')}
          className="mb-6 text-slate-600 hover:text-[#103a7b]"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al catálogo
        </Button>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Imagen del producto */}
          <div className="space-y-4">
            <div className="relative h-[500px] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-slate-100 via-white to-amber-50 border border-slate-200 shadow-lg">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain p-6"
                  priority
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-32 w-32 rounded-full bg-gradient-to-br from-[#103a7b]/10 to-slate-200/50" />
                </div>
              )}
            </div>
            
            {/* Certificaciones */}
            {product.certification && product.certification.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {product.certification.map((cert) => (
                  <Badge key={cert} className="bg-[#103a7b] text-white">
                    {cert}
                  </Badge>
                ))}
              </div>
            )}

            {/* Ficha técnica */}
            {product.fichaTecnica && (
              <Card className="border-[#103a7b]/20">
                <CardContent className="p-4">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full border-[#103a7b] text-[#103a7b] hover:bg-[#103a7b] hover:text-white"
                  >
                    <a
                      href={product.fichaTecnica}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Ver ficha técnica</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Información del producto */}
          <div className="space-y-6">
            <div className="space-y-3">
              <Badge className="bg-[#103a7b] text-white">{product.category}</Badge>
              <h1 className="text-4xl font-black text-slate-900 leading-tight">{product.name}</h1>
              <p className="text-lg text-slate-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Precio y botón de agregar */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-[#103a7b]/5 to-white border border-[#103a7b]/10">
              <div className="flex-1">
                <p className="text-sm font-semibold uppercase tracking-wider text-slate-500 mb-1">
                  Precio referencial
                </p>
                <p className="text-5xl font-black text-[#103a7b]">
                  ${product.price.toFixed(2)}
                </p>
              </div>
              <AddToQuoteButton product={product} />
            </div>

            {/* Especificaciones técnicas */}
            {product.specs && product.specs.length > 0 && (
              <Card className="border-slate-200 shadow-sm">
                <CardContent className="space-y-4 py-6">
                  <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                    <FileText className="h-5 w-5 text-[#103a7b]" />
                    Especificaciones técnicas
                  </h3>
                  <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {product.specs.map((spec) => (
                      <div key={spec.label} className="rounded-lg bg-slate-50 p-4 border border-slate-200">
                        <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                          {spec.label}
                        </dt>
                        <dd className="text-base font-semibold text-slate-900">{spec.value}</dd>
                      </div>
                    ))}
                  </dl>
                </CardContent>
              </Card>
            )}

            {/* Información adicional */}
            <Card className="border-slate-200 bg-gradient-to-br from-blue-50/50 to-white">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-3">Información del producto</h3>
                <div className="space-y-2 text-sm text-slate-600">
                  <p>
                    <span className="font-semibold text-slate-900">Marca:</span> {product.brand}
                  </p>
                  <p>
                    <span className="font-semibold text-slate-900">Categoría:</span> {product.category}
                  </p>
                  {product.tags && product.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {product.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
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
