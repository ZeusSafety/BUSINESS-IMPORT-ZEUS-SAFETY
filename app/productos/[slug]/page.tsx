'use client';

import { Product } from '@/lib/mockData';
import {
  PRODUCTS_API_URL,
  buildCatalogFromApi,
  findVariantsBySlug,
  getGroupDisplayName,
  getProductGroupKey,
  getVariantColor,
  getVariantSize,
  sortSizes,
  transformDetailProduct,
  type ApiProduct,
  type CatalogProduct,
  type DetailProduct,
} from '@/lib/product-catalog';
import {
  getInitialVariantOptions,
  ProductVariantSelectors,
  resolveActiveVariant,
} from '@/components/products/product-variant-selectors';
import {
  ProductImageZoom,
  ProductTrustBadges,
} from '@/components/products/product-image-zoom';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useQuoteStore } from '@/store/quoteStore';
import {
  ArrowLeft,
  ChevronRight,
  ClipboardList,
  FileText,
  ExternalLink,
  Minus,
  Package,
  Plus,
  ShoppingCart,
} from 'lucide-react';
import { useState, useEffect, use, useMemo, useCallback, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductDetailSkeleton } from '@/components/ui/skeleton';
import { Toast } from '@/components/ui/toast';

type Props = {
  params: Promise<{ slug: string }>;
};

function Accordion({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="border-b border-slate-200">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between py-4 text-left text-sm font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:text-[#F5C400]"
      >
        {title}
        <Plus
          className={`h-4 w-4 shrink-0 transition-transform ${open ? 'rotate-45' : ''}`}
        />
      </button>
      {open && <div className="pb-5 text-sm leading-relaxed text-slate-600">{children}</div>}
    </div>
  );
}

function FeatureList({ product }: { product: DetailProduct }) {
  const features: string[] = [];
  if (product.apiData?.TIPO_PRODUCTO) {
    features.push(`Tipo: ${product.apiData.TIPO_PRODUCTO}`);
  }
  if (product.apiData?.COLOR_TIPO) {
    features.push(`Color / acabado: ${product.apiData.COLOR_TIPO}`);
  }
  if (product.apiData?.TAMAÑO) {
    features.push(`Tamaño: ${product.apiData.TAMAÑO}`);
  }
  if (product.apiData?.PARES_POR_CAJA) {
    features.push(`${product.apiData.PARES_POR_CAJA} unidades por caja`);
  }
  if (product.codigo) {
    features.push(`Código: ${product.codigo}`);
  }
  if (features.length === 0) {
    features.push(
      'EPP certificado para operaciones industriales',
      'Asesoría técnica Zeus Safety',
      'Despacho a nivel nacional',
    );
  }
  return (
    <ul className="mt-3 space-y-1.5">
      {features.map((f) => (
        <li key={f} className="flex gap-2 text-xs text-slate-600 sm:text-[13px]">
          <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-[#F5C400]" />
          {f}
        </li>
      ))}
    </ul>
  );
}

function RelatedCard({
  product,
}: {
  product: CatalogProduct;
}) {
  const addItem = useQuoteStore((s) => s.addItem);
  const [qty, setQty] = useState(1);

  return (
    <article className="group flex flex-col overflow-hidden border border-slate-200 bg-white transition hover:border-[#0b2d60]/25 hover:shadow-[0_12px_32px_rgba(11,45,96,0.1)]">
      <div className="relative aspect-[4/3] bg-slate-50">
        <span
          aria-hidden
          className="absolute right-0 top-0 z-10 h-8 w-10 bg-[#0b2d60]"
          style={{ clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 0 100%)' }}
        />
        <span
          aria-hidden
          className="absolute right-0 top-0 z-10 h-5 w-7 bg-[#F5C400]"
          style={{ clipPath: 'polygon(35% 0, 100% 0, 100% 100%, 0 100%)' }}
        />
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-contain p-4 transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Package className="h-10 w-10 text-slate-300" />
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col px-3 py-3 text-center">
        <p className="text-[11px] text-slate-500">{product.category}</p>
        <Link
          href={`/productos/${encodeURIComponent(product.slug)}`}
          className="mt-1 line-clamp-2 text-sm font-bold text-[#0c1427] transition-colors hover:text-[#0b2d60]"
        >
          {product.name}
        </Link>

        <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5">
          <span className="inline-flex items-center rounded-full border border-emerald-300/80 bg-emerald-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-emerald-800 sm:text-[10px]">
            Delivery en 24 horas
          </span>
          <span className="inline-flex items-center rounded-full border border-slate-300 bg-slate-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-slate-700 sm:text-[10px]">
            Recojo en tienda
          </span>
        </div>

        <div className="mt-auto space-y-2 pt-3">
          <div className="mx-auto flex h-9 w-full max-w-[140px] items-center border border-slate-200">
            <button
              type="button"
              aria-label="Menos"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="flex h-full w-9 items-center justify-center text-[#0b2d60] hover:bg-slate-50"
            >
              <Minus className="h-3.5 w-3.5" />
            </button>
            <span className="flex-1 text-sm font-bold text-[#0b2d60]">{qty}</span>
            <button
              type="button"
              aria-label="Más"
              onClick={() => setQty((q) => q + 1)}
              className="flex h-full w-9 items-center justify-center text-[#0b2d60] hover:bg-slate-50"
            >
              <Plus className="h-3.5 w-3.5" />
            </button>
          </div>
          <button
            type="button"
            onClick={() => addItem(product, qty)}
            className="h-10 w-full bg-slate-100 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#F5C400]"
          >
            Cotizar
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ProductDetailPage({ params }: Props) {
  const { slug } = use(params);
  const [variants, setVariants] = useState<DetailProduct[]>([]);
  const [displayName, setDisplayName] = useState('');
  const [related, setRelated] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [openSection, setOpenSection] = useState<'info' | 'ship' | null>(null);
  const [showToast, setShowToast] = useState(false);
  const addItem = useQuoteStore((s) => s.addItem);
  const router = useRouter();

  const product = useMemo(
    () =>
      variants.length > 0
        ? resolveActiveVariant(variants, selectedColor, selectedSize)
        : null,
    [variants, selectedColor, selectedSize],
  );

  const handleCloseToast = useCallback(() => setShowToast(false), []);

  const handleAddToCart = useCallback(() => {
    if (!product) return;
    addItem(product, quantity);
    setShowToast(true);
  }, [addItem, product, quantity]);

  const handleQuoteNow = useCallback(() => {
    if (!product) return;
    addItem(product, quantity);
    router.push('/cotizacion');
  }, [addItem, product, quantity, router]);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        setQuantity(1);
        setOpenSection(null);
        setSelectedColor(null);
        setSelectedSize(null);

        const response = await fetch(PRODUCTS_API_URL);
        if (!response.ok) throw new Error('Error al cargar el producto');

        const data = (await response.json()) as ApiProduct[];
        const matched = findVariantsBySlug(slug, data);

        if (!matched || matched.length === 0) {
          setError('Producto no encontrado');
          return;
        }

        const detailVariants = matched.map(transformDetailProduct);
        const initial = getInitialVariantOptions(detailVariants);

        setVariants(detailVariants);
        setDisplayName(getGroupDisplayName(matched[0]));
        setSelectedColor(initial.color);
        setSelectedSize(initial.size);

        const catalog = buildCatalogFromApi(data);
        const currentGroup = getProductGroupKey(matched[0]);
        const relatedList = catalog
          .filter(
            (item) =>
              item.groupSlug !== currentGroup &&
              item.category === detailVariants[0].category &&
              Boolean(item.image?.trim()),
          )
          .slice(0, 4);

        setRelated(relatedList);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  const description = useMemo(() => {
    if (!product) return '';
    const raw = product.apiData?.DESCRIPCION?.trim() || '';
    const isPlaceholder =
      !raw ||
      raw.length < 20 ||
      /descripci[oó]n\s+de\s+prueba|texto\s+de\s+prueba|^prueba$|^test$|lorem\s+ipsum/i.test(
        raw,
      );

    if (!isPlaceholder) return raw;

    const tipo =
      product.apiData?.TIPO_PRODUCTO || product.category || 'protección industrial';
    const color = product.apiData?.COLOR_TIPO;
    const caja = product.apiData?.PARES_POR_CAJA;

    return `El ${displayName || product.name} es un EPP de ${tipo.toLowerCase()} pensado para proteger a tu cuadrilla en operaciones exigentes.${
      color ? ` Disponible en ${color.toLowerCase()}.` : ''
    }${
      caja ? ` Presentación de ${caja} unidades por caja.` : ''
    } Ideal para obra, planta y mantenimiento: combina desempeño, cumplimiento y facilidad de cotización.`;
  }, [product, displayName]);

  const handleColorChange = (color: string | null) => {
    setSelectedColor(color);
    const sizes = sortSizes(
      Array.from(
        new Set(
          variants
            .filter(
              (variant) =>
                !color ||
                (variant.apiData && getVariantColor(variant.apiData) === color),
            )
            .map((variant) =>
              variant.apiData ? getVariantSize(variant.apiData) : null,
            )
            .filter((size): size is string => Boolean(size)),
        ),
      ),
    );
    setSelectedSize(sizes[0] ?? null);
  };

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (error || !product) {
    return (
      <div className="mx-auto max-w-[1600px] px-6 py-20 lg:px-10 xl:px-12">
        <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
          <h2 className="mb-3 text-2xl font-black text-[#0b2d60]">
            Producto no encontrado
          </h2>
          <p className="mb-6 max-w-md text-sm text-slate-600">
            {error && error !== 'Producto no encontrado'
              ? error
              : 'El producto que buscas no existe o no está disponible.'}
          </p>
          <Button
            onClick={() => router.push('/productos')}
            className="rounded-none bg-[#0b2d60] text-white hover:bg-[#F5C400] hover:text-[#0b2d60]"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al catálogo
          </Button>
        </div>
      </div>
    );
  }

  const productImage = product.image?.trim() || '';

  const toggleSection = (section: 'info' | 'ship') => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <>
      <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1500px] px-3 py-6 sm:px-4 lg:px-6 lg:py-10">
        <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          <Link href="/productos" className="transition-colors hover:text-[#0b2d60]">
            Catálogo
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#0b2d60]">Detalle</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 xl:gap-16">
          <ProductImageZoom
            key={productImage}
            src={productImage}
            alt={displayName || product.name}
          />

          {/* Panel de compra */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span className="bg-emerald-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                En stock
              </span>
            </div>

            <p className="mt-4 text-sm font-semibold text-[#0b2d60]/70">{product.brand}</p>

            <h1 className="mt-1 text-2xl font-black uppercase leading-tight tracking-tight text-[#0b2d60] sm:text-3xl">
              {displayName || product.name}
            </h1>

            <ProductVariantSelectors
              variants={variants}
              selectedColor={selectedColor}
              selectedSize={selectedSize}
              onColorChange={handleColorChange}
              onSizeChange={setSelectedSize}
            />

            <div className="mt-5 border-b border-slate-200 pb-5">
              <h2 className="text-xs font-bold uppercase tracking-wide text-[#0b2d60]">
                Descripción
              </h2>
              <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-slate-600">
                {description}
              </p>
              <FeatureList product={product} />
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <div className="flex h-12 w-full max-w-[140px] shrink-0 items-center border border-slate-300">
                <button
                  type="button"
                  aria-label="Disminuir cantidad"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="flex h-full w-11 items-center justify-center text-[#0b2d60] hover:bg-slate-50"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="flex-1 text-center text-base font-bold text-[#0b2d60]">
                  {quantity}
                </span>
                <button
                  type="button"
                  aria-label="Aumentar cantidad"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="flex h-full w-11 items-center justify-center text-[#0b2d60] hover:bg-slate-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 bg-[#0b2d60] px-6 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#F5C400] hover:text-[#0b2d60]"
              >
                <ShoppingCart className="h-4 w-4 shrink-0" />
                Agregar a carrito
              </button>
            </div>

            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleQuoteNow}
                className="inline-flex h-12 flex-1 items-center justify-center gap-2 border border-slate-300 bg-slate-100 text-sm font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:border-[#0b2d60] hover:bg-white"
              >
                <ClipboardList className="h-4 w-4 shrink-0" />
                Cotizar ahora
              </button>

              {product.fichaTecnica ? (
                <a
                  href={product.fichaTecnica}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 border border-[#0b2d60] bg-white px-4 text-sm font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#0b2d60] hover:text-white"
                >
                  <FileText className="h-4 w-4 shrink-0" />
                  <span className="truncate">Ver ficha técnica</span>
                  <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" />
                </a>
              ) : null}
            </div>

            <div className="mt-5">
              <Accordion
                title="Especificaciones"
                open={openSection === 'info'}
                onToggle={() => toggleSection('info')}
              >
                <div className="divide-y divide-slate-100 border border-slate-100">
                  {(
                    [
                      { label: 'Marca', value: product.brand },
                      { label: 'Categoría', value: product.category },
                      product.apiData?.TIPO_PRODUCTO
                        ? { label: 'Tipo', value: product.apiData.TIPO_PRODUCTO }
                        : null,
                      product.apiData?.COLOR_TIPO
                        ? { label: 'Color / tipo', value: product.apiData.COLOR_TIPO }
                        : null,
                      product.apiData?.PARES_POR_CAJA
                        ? {
                            label: 'Pares por caja',
                            value: String(product.apiData.PARES_POR_CAJA),
                          }
                        : null,
                      product.codigo?.trim()
                        ? { label: 'Código', value: product.codigo }
                        : null,
                    ] as ({ label: string; value: string } | null)[]
                  )
                    .filter(Boolean)
                    .map((row) => (
                      <div
                        key={row!.label}
                        className="grid grid-cols-[minmax(120px,160px)_1fr] gap-4 px-4 py-2.5 text-xs sm:text-sm"
                      >
                        <span className="font-semibold text-slate-500">{row!.label}</span>
                        <span className="font-bold text-[#0b2d60]">{row!.value}</span>
                      </div>
                    ))}
                </div>
              </Accordion>

              <Accordion
                title="Despachos y devoluciones"
                open={openSection === 'ship'}
                onToggle={() => toggleSection('ship')}
              >
                <p>
                  Despachamos a nivel nacional con entregas programadas según volumen y
                  destino. Consulta tiempos y condiciones con un asesor Zeus Safety.
                </p>
                <p className="mt-3">
                  Somos distribuidores mayoristas: los precios finales varían según cantidad,
                  frecuencia de compra y modalidad de pago.
                </p>
              </Accordion>
            </div>

            <ProductTrustBadges />
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-slate-200 bg-[#f3f5f8] px-3 py-10 sm:px-4 lg:px-6 lg:py-12">
          <div className="mx-auto max-w-[1500px]">
            <div className="mb-6 sm:mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
                También te puede interesar
              </p>
              <h2 className="mt-1 text-xl font-black uppercase tracking-[0.04em] text-[#0b2d60] sm:text-2xl">
                Productos relacionados
              </h2>
              <div className="mt-2 h-1.5 w-16 bg-[#F5C400]" />
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {related.map((item) => (
                <RelatedCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        </section>
      )}
      </div>

      <Toast
        title="¡Agregado al carrito!"
        message="Producto agregado correctamente a tu cotización."
        imageSrc={productImage}
        imageAlt={displayName || product.name}
        isVisible={showToast}
        onClose={handleCloseToast}
      />
    </>
  );
}
