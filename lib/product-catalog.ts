import type { Product } from '@/lib/mockData';

export const PRODUCTS_API_URL =
  'https://productoscrud-2946605267.us-central1.run.app?metodo=LISTADO_PRODUCTOS_ESTATICA';

export type ApiProduct = {
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

export type CatalogProduct = Product & {
  groupSlug: string;
  variantIds: string[];
  variantNames: string[];
  minPrice: number;
  maxPrice: number;
  variantCount: number;
};

export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function normalizeSlug(slug: string): string {
  return slug
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9-]+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function mapCategory(apiCategory: string): string {
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

export function normalizeColor(color: string | null | undefined): string | null {
  const value = color?.trim();
  if (!value || value === '---' || value.toLowerCase() === 'mull') return null;
  return value
    .split(/\s+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function extractVariantSize(nombre: string): string | null {
  const tallaMatch = nombre.match(/\s+talla\s+(\d{2})\s*$/i);
  if (tallaMatch) return tallaMatch[1];

  const gloveMatch = nombre.match(/\s+((?:[6-9]|10|11|12))\s*$/i);
  if (gloveMatch) return gloveMatch[1];

  const apiSize = nombre.match(/\s+(\d{1,2})\s*$/);
  return apiSize ? apiSize[1] : null;
}

function stripColorFromName(name: string, color: string): string {
  const escaped = color.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return name
    .replace(new RegExp(`\\s+${escaped}(?=\\s|$)`, 'i'), '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function getGroupDisplayName(variant: ApiProduct): string {
  let name = variant.NOMBRE.trim();
  name = name.replace(/\s+talla\s+\d+\s*$/i, '');
  name = name.replace(/\s+(?:[6-9]|10|11|12)\s*$/i, '');

  const color = normalizeColor(variant.COLOR_TIPO);
  if (color) {
    name = stripColorFromName(name, color);
  }

  return name.replace(/\s+/g, ' ').trim() || variant.NOMBRE;
}

export function getProductGroupKey(variant: ApiProduct): string {
  return generateSlug(getGroupDisplayName(variant));
}

export function getVariantColor(variant: ApiProduct): string | null {
  return normalizeColor(variant.COLOR_TIPO);
}

export function getVariantSize(variant: ApiProduct): string | null {
  return (
    variant.TAMAÑO?.trim() ||
    extractVariantSize(variant.NOMBRE) ||
    null
  );
}

export function transformApiProduct(apiProduct: ApiProduct): Product {
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

  return {
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
    image: (apiProduct.IMG_URL || '').trim(),
  };
}

export type DetailProduct = Product & {
  fichaTecnica?: string;
  codigo?: string;
  tamanio?: string | null;
  apiData?: ApiProduct;
};

export function transformDetailProduct(apiProduct: ApiProduct): DetailProduct {
  return {
    ...transformApiProduct(apiProduct),
    fichaTecnica: apiProduct.FICHA_TECNICA_ENLACE || undefined,
    codigo: apiProduct.CODIGO,
    tamanio: apiProduct.TAMAÑO,
    apiData: apiProduct,
  };
}

export function buildCatalogFromApi(data: ApiProduct[]): CatalogProduct[] {
  const groups = new Map<string, ApiProduct[]>();

  for (const item of data) {
    const key = getProductGroupKey(item);
    const list = groups.get(key) ?? [];
    list.push(item);
    groups.set(key, list);
  }

  return Array.from(groups.values()).map((variants) => {
    const sorted = [...variants].sort((a, b) => a.ID - b.ID);
    const transformed = sorted.map(transformApiProduct);
    const displayName = getGroupDisplayName(sorted[0]);
    const groupSlug = generateSlug(displayName);
    const prices = transformed.map((p) => p.price);

    return {
      ...transformed[0],
      name: displayName,
      slug: groupSlug,
      groupSlug,
      variantIds: transformed.map((p) => p.id),
      variantNames: sorted.map((p) => p.NOMBRE),
      minPrice: Math.min(...prices),
      maxPrice: Math.max(...prices),
      variantCount: sorted.length,
    };
  });
}

export function groupVariants(data: ApiProduct[]): Map<string, ApiProduct[]> {
  const groups = new Map<string, ApiProduct[]>();
  for (const item of data) {
    const key = getProductGroupKey(item);
    const list = groups.get(key) ?? [];
    list.push(item);
    groups.set(key, list);
  }
  for (const [key, list] of groups) {
    groups.set(
      key,
      [...list].sort((a, b) => a.ID - b.ID),
    );
  }
  return groups;
}

export function findVariantsBySlug(
  slug: string,
  data: ApiProduct[],
): ApiProduct[] | null {
  const normalized = normalizeSlug(decodeURIComponent(slug));
  const groups = groupVariants(data);

  for (const [key, variants] of groups) {
    if (key === normalized) return variants;
  }

  const direct = data.find((item) => {
    const itemSlug = generateSlug(item.NOMBRE);
    return (
      itemSlug === normalized ||
      normalizeSlug(itemSlug) === normalized ||
      `prd-${item.ID}` === slug
    );
  });

  if (direct) {
    return groups.get(getProductGroupKey(direct)) ?? [direct];
  }

  const searchTerms = normalized.split('-').filter((t) => t.length > 2);
  if (searchTerms.length > 0) {
    for (const [, variants] of groups) {
      const displaySlug = generateSlug(getGroupDisplayName(variants[0]));
      if (searchTerms.every((term) => displaySlug.includes(term))) {
        return variants;
      }
    }
  }

  return null;
}

export function sortSizes(sizes: string[]): string[] {
  return [...sizes].sort((a, b) => {
    const na = parseInt(a, 10);
    const nb = parseInt(b, 10);
    if (!Number.isNaN(na) && !Number.isNaN(nb)) return na - nb;
    return a.localeCompare(b, 'es');
  });
}

export function sortColors(colors: string[]): string[] {
  return [...colors].sort((a, b) => a.localeCompare(b, 'es'));
}
