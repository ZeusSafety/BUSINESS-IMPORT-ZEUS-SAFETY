'use client';

import { Product } from '@/lib/mockData';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useQuoteStore } from '@/store/quoteStore';
import { getDisplayPrice, formatSoles } from '@/lib/display-price';
import {
  ArrowLeft,
  ChevronRight,
  FileText,
  ExternalLink,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  Truck,
  Warehouse,
} from 'lucide-react';
import { useState, useEffect, use, useMemo, type ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductDetailSkeleton } from '@/components/ui/skeleton';

const PAYMENT_CARDS = [
  { src: '/tarjetas/visa-removebg-preview.png', alt: 'Visa' },
  { src: '/tarjetas/mastercard-removebg-preview.png', alt: 'Mastercard' },
  { src: '/tarjetas/Dinners-removebg-preview.png', alt: 'Diners Club' },
  { src: '/tarjetas/interbank-removebg-preview.png', alt: 'Interbank' },
];

type Props = {
  params: Promise<{ slug: string }>;
};

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

type DetailProduct = Product & {
  fichaTecnica?: string;
  codigo?: string;
  tamanio?: string | null;
  apiData?: ApiProduct;
};

const WA_URL =
  'https://wa.me/51999999999?text=' +
  encodeURIComponent('Hola, deseo información sobre un producto Zeus Safety.');

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

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

function mapCategory(apiCategory: string): string {
  const categoryMap: Record<string, string> = {
    Corporal: 'Protección Corporal',
    Guantes: 'Protección Manual',
    Manual: 'Protección Manual',
    Visual: 'Protección Visual',
    Lentes: 'Protección Visual',
    Respiradores: 'Protección Respiratoria',
    Respiratoria: 'Protección Respiratoria',
    Auditiva: 'Protección Auditiva',
    Auditivo: 'Protección Auditiva',
    Calzado: 'Calzado de Seguridad',
    Vial: 'Seguridad Vial',
    Laboral: 'Equipo Laboral',
    Electric: 'Electric',
    'SEGURIDAD INDUSTRIAL': 'SEGURIDAD INDUSTRIAL',
    Delivery: 'Delivery',
  };
  return categoryMap[apiCategory] || apiCategory;
}

function transformApiProduct(apiProduct: ApiProduct): DetailProduct {
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
    specs.push({ label: 'Tipo de Producto', value: apiProduct.TIPO_PRODUCTO });
  }
  if (apiProduct.TAMAÑO) {
    specs.push({ label: 'Tamaño', value: apiProduct.TAMAÑO });
  }
  if (apiProduct.CODIGO) {
    specs.push({ label: 'Código', value: apiProduct.CODIGO });
  }

  const base = {
    id: `prd-${apiProduct.ID}`,
    name: apiProduct.NOMBRE,
    slug: generateSlug(apiProduct.NOMBRE),
    category: mapCategory(apiProduct.CATEGORIA) as Product['category'],
    brand: 'Zeus Safety',
    price,
    certification: [],
    description:
      apiProduct.DESCRIPCION ||
      `Producto de seguridad industrial ${apiProduct.TIPO_PRODUCTO || apiProduct.CATEGORIA}`,
    specs,
    image: apiProduct.IMG_URL || '',
    fichaTecnica: apiProduct.FICHA_TECNICA_ENLACE || undefined,
    codigo: apiProduct.CODIGO,
    tamanio: apiProduct.TAMAÑO,
    apiData: apiProduct,
  };
  return { ...base, price: getDisplayPrice(base) };
}

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
  product: DetailProduct;
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
  const [product, setProduct] = useState<DetailProduct | null>(null);
  const [related, setRelated] = useState<DetailProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [openSection, setOpenSection] = useState<'desc' | 'info' | 'ship' | null>('desc');
  const addItem = useQuoteStore((s) => s.addItem);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError(null);
        setQuantity(1);
        setActiveImage(0);
        setOpenSection('desc');

        const decodedSlug = decodeURIComponent(slug);
        const normalizedSearchSlug = normalizeSlug(decodedSlug);

        const response = await fetch(
          'https://productoscrud-2946605267.us-central1.run.app?metodo=LISTADO_PRODUCTOS_ESTATICA',
        );
        if (!response.ok) throw new Error('Error al cargar el producto');

        const data = await response.json();
        const transformedProducts: DetailProduct[] = data.map(transformApiProduct);

        let foundProduct = transformedProducts.find((p) => {
          const productSlugNormalized = normalizeSlug(p.slug);
          return (
            productSlugNormalized === normalizedSearchSlug ||
            p.slug === decodedSlug ||
            normalizeSlug(generateSlug(p.name)) === normalizedSearchSlug
          );
        });

        if (!foundProduct) {
          const slugAsId = parseInt(decodedSlug, 10);
          if (!isNaN(slugAsId)) {
            foundProduct = transformedProducts.find(
              (p) => p.id === `prd-${slugAsId}`,
            );
          }
        }

        if (!foundProduct) {
          const searchTerms = normalizedSearchSlug
            .split('-')
            .filter((t) => t.length > 2);
          if (searchTerms.length > 0) {
            foundProduct = transformedProducts.find((p) => {
              const name = normalizeSlug(p.name);
              return searchTerms.every(
                (term) => name.includes(term) || p.slug.includes(term),
              );
            });
          }
        }

        if (!foundProduct) {
          setError('Producto no encontrado');
          return;
        }

        setProduct(foundProduct);

        const relatedList = transformedProducts
          .filter(
            (p) =>
              p.id !== foundProduct!.id &&
              (p.apiData?.CATEGORIA === foundProduct!.apiData?.CATEGORIA ||
                p.category === foundProduct!.category) &&
              Boolean(p.image?.trim()),
          )
          .slice(0, 4);

        const fallback =
          relatedList.length >= 4
            ? relatedList
            : [
                ...relatedList,
                ...transformedProducts
                  .filter(
                    (p) =>
                      p.id !== foundProduct!.id &&
                      !relatedList.some((r) => r.id === p.id) &&
                      Boolean(p.image?.trim()),
                  )
                  .slice(0, 4 - relatedList.length),
              ];

        setRelated(fallback.slice(0, 4));
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

    return `El ${product.name} es un EPP de ${tipo.toLowerCase()} pensado para proteger a tu cuadrilla en operaciones exigentes.${
      color ? ` Disponible en ${color.toLowerCase()}.` : ''
    }${
      caja ? ` Presentación de ${caja} unidades por caja.` : ''
    } Ideal para obra, planta y mantenimiento: combina desempeño, cumplimiento y facilidad de cotización.`;
  }, [product]);

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

  const consultUrl = `${WA_URL.slice(0, WA_URL.indexOf('?'))}?text=${encodeURIComponent(
    `Hola, quiero consultar sobre: ${product.name}`,
  )}`;

  const galleryImages: string[] = [];
  if (product.image?.trim()) galleryImages.push(product.image.trim());
  related.forEach((r) => {
    const url = r.image?.trim();
    if (url && !galleryImages.includes(url)) galleryImages.push(url);
  });

  const displayPrice = product.price;
  const referencePrice = Math.round(displayPrice * 1.35 * 2) / 2;
  const savingsPct = Math.round((1 - displayPrice / referencePrice) * 100);
  const savingsAmount = referencePrice - displayPrice;

  const toggleSection = (section: 'desc' | 'info' | 'ship') => {
    setOpenSection((prev) => (prev === section ? null : section));
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[1400px] px-5 py-6 sm:px-8 lg:px-10 lg:py-10">
        <nav className="mb-6 flex flex-wrap items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">
          <Link href="/productos" className="transition-colors hover:text-[#0b2d60]">
            Catálogo
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-[#0b2d60]">Detalle</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 xl:gap-16">
          {/* Galería */}
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-5">
            {galleryImages.length > 1 && (
              <div className="order-2 flex gap-2 overflow-x-auto sm:order-1 sm:flex-col sm:overflow-visible">
                {galleryImages.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setActiveImage(i)}
                    className={`relative h-16 w-16 shrink-0 overflow-hidden border bg-[#f4f5f7] transition sm:h-[72px] sm:w-[72px] ${
                      activeImage === i
                        ? 'border-[#0b2d60] ring-1 ring-[#0b2d60]'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      unoptimized
                      className="object-contain p-1.5"
                      sizes="72px"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="relative order-1 min-h-[320px] flex-1 overflow-hidden bg-[#f4f5f7] sm:order-2 sm:min-h-[480px] lg:min-h-[560px]">
              {galleryImages.length > 0 ? (
                <Image
                  src={galleryImages[activeImage] ?? galleryImages[0]}
                  alt={product.name}
                  fill
                  priority
                  unoptimized
                  className="object-contain p-6 sm:p-10"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              ) : (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <Package className="mb-2 h-12 w-12 text-slate-300" />
                  <p className="text-sm text-slate-400">Imagen no disponible</p>
                </div>
              )}
            </div>
          </div>

          {/* Panel de compra */}
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-emerald-600 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                En stock
              </span>
              {savingsPct > 0 && (
                <span className="rounded-full bg-[#F5C400] px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-[#0b2d60]">
                  -{savingsPct}% off
                </span>
              )}
            </div>

            <p className="mt-4 text-sm font-semibold text-[#0b2d60]/70">{product.brand}</p>

            <h1 className="mt-1 text-2xl font-black uppercase leading-tight tracking-tight text-[#0b2d60] sm:text-3xl">
              {product.name}
            </h1>

            <div className="mt-5">
              <p className="text-2xl font-black text-[#0b2d60] sm:text-[1.65rem]">
                {formatSoles(displayPrice)}
              </p>
              {savingsPct > 0 && (
                <div className="mt-1 flex flex-wrap items-baseline gap-2">
                  <span className="text-sm text-slate-400 line-through">
                    {formatSoles(referencePrice)}
                  </span>
                  <span className="text-sm font-semibold text-[#0b2d60]">
                    Ahorras {savingsPct}% ({formatSoles(savingsAmount)})
                  </span>
                </div>
              )}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {product.apiData?.COLOR_TIPO && (
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-slate-500">
                    Color
                  </span>
                  <select
                    defaultValue={product.apiData.COLOR_TIPO}
                    className="h-11 w-full border border-slate-300 bg-white px-3 text-sm font-medium text-[#0b2d60] outline-none focus:border-[#0b2d60]"
                  >
                    <option>{product.apiData.COLOR_TIPO}</option>
                  </select>
                </label>
              )}
              {product.tamanio && (
                <label className="block">
                  <span className="mb-1.5 block text-[11px] font-bold uppercase tracking-wide text-slate-500">
                    Tamaño
                  </span>
                  <select
                    defaultValue={product.tamanio}
                    className="h-11 w-full border border-slate-300 bg-white px-3 text-sm font-medium text-[#0b2d60] outline-none focus:border-[#0b2d60]"
                  >
                    <option>{product.tamanio}</option>
                  </select>
                </label>
              )}
            </div>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-stretch">
              <div className="flex h-12 w-full max-w-[140px] items-center border border-slate-300">
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
                onClick={() => addItem(product, quantity)}
                className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-[#0b2d60] px-8 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-[#F5C400] hover:text-[#0b2d60]"
              >
                Añadir a cotización
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                addItem(product, quantity);
                router.push('/cotizacion');
              }}
              className="mt-3 inline-flex h-12 w-full items-center justify-center border border-slate-300 bg-slate-100 text-sm font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:border-[#0b2d60] hover:bg-white"
            >
              Cotizar ahora
            </button>

            <div className="mt-6 grid grid-cols-3 gap-3 border-y border-slate-200 py-5">
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50">
                  <ShieldCheck className="h-5 w-5 text-[#0b2d60]" />
                </span>
                <p className="text-[10px] font-semibold uppercase leading-tight text-slate-600">
                  EPP certificado
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50">
                  <Truck className="h-5 w-5 text-[#0b2d60]" />
                </span>
                <p className="text-[10px] font-semibold uppercase leading-tight text-slate-600">
                  Envío nacional
                </p>
              </div>
              <div className="flex flex-col items-center gap-2 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-slate-50">
                  <Warehouse className="h-5 w-5 text-[#0b2d60]" />
                </span>
                <p className="text-[10px] font-semibold uppercase leading-tight text-slate-600">
                  Stock mayorista
                </p>
              </div>
            </div>

            <div className="mt-5">
              <Accordion
                title="Descripción"
                open={openSection === 'desc'}
                onToggle={() => toggleSection('desc')}
              >
                <p className="whitespace-pre-line">{description}</p>
                <FeatureList product={product} />
              </Accordion>

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
                {product.fichaTecnica && (
                  <a
                    href={product.fichaTecnica}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-[#0b2d60] underline-offset-2 hover:underline"
                  >
                    <FileText className="h-4 w-4" />
                    Ver ficha técnica
                    <ExternalLink className="h-3.5 w-3.5 opacity-60" />
                  </a>
                )}
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

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {PAYMENT_CARDS.map((card) => (
                <div
                  key={card.alt}
                  className="relative h-8 w-12 overflow-hidden rounded border border-slate-100 bg-white sm:h-9 sm:w-14"
                >
                  <Image
                    src={card.src}
                    alt={card.alt}
                    fill
                    className="object-contain p-0.5"
                    sizes="56px"
                  />
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <a
                href={consultUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-[#25D366] bg-[#25D366]/10 text-sm font-bold text-[#0b2d60] transition-colors hover:bg-[#25D366]/20"
              >
                <WhatsAppIcon className="h-5 w-5 text-[#25D366]" />
                Habla con un asesor
              </a>
              <button
                type="button"
                onClick={() => router.push('/productos')}
                className="inline-flex h-11 items-center justify-center gap-2 text-sm font-semibold text-[#0b2d60]/70 transition-colors hover:text-[#0b2d60]"
              >
                <ArrowLeft className="h-4 w-4" />
                Volver al catálogo
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-14 border-t border-slate-200 pt-12 sm:mt-16">
            <h2 className="text-xl font-black text-[#0c1427] sm:text-2xl">
              Productos relacionados
            </h2>
            <div className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
              {related.map((item) => (
                <RelatedCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
