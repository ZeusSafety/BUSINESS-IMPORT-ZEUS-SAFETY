'use client';

import {
  getVariantColor,
  getVariantSize,
  sortColors,
  sortSizes,
  type DetailProduct,
} from '@/lib/product-catalog';

function colorSwatch(name: string): { bg: string; fg: string } {
  const n = name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  if (n.includes('naranja') || n.includes('orange')) return { bg: '#ea580c', fg: '#fff' };
  if (n.includes('rojo') || n.includes('red')) return { bg: '#dc2626', fg: '#fff' };
  if (n.includes('amarillo') || n.includes('yellow') || n.includes('dorado'))
    return { bg: '#F5C400', fg: '#0b2d60' };
  if (n.includes('verde') || n.includes('green') || n.includes('lima'))
    return { bg: '#16a34a', fg: '#fff' };
  if (n.includes('azul marino') || n.includes('navy') || n.includes('marino'))
    return { bg: '#0b2d60', fg: '#fff' };
  if (n.includes('celeste') || n.includes('cyan')) return { bg: '#22d3ee', fg: '#0b2d60' };
  if (n.includes('azul') || n.includes('blue')) return { bg: '#2563eb', fg: '#fff' };
  if (n.includes('negro') || n.includes('black')) return { bg: '#111827', fg: '#fff' };
  if (n.includes('blanco') || n.includes('white')) return { bg: '#ffffff', fg: '#0b2d60' };
  if (n.includes('gris') || n.includes('gray') || n.includes('grey'))
    return { bg: '#64748b', fg: '#fff' };
  if (n.includes('rosa') || n.includes('pink') || n.includes('fucsia'))
    return { bg: '#db2777', fg: '#fff' };
  if (n.includes('morado') || n.includes('violeta') || n.includes('purple'))
    return { bg: '#7c3aed', fg: '#fff' };
  if (n.includes('cafe') || n.includes('marron') || n.includes('brown'))
    return { bg: '#7c4a1e', fg: '#fff' };
  if (n.includes('beige') || n.includes('crema')) return { bg: '#e7d3b0', fg: '#0b2d60' };
  if (n.includes('fluor') || n.includes('alta visibilidad') || n.includes('hv'))
    return { bg: '#d9f99d', fg: '#0b2d60' };
  return { bg: '#0b2d60', fg: '#fff' };
}

type ProductVariantSelectorsProps = {
  variants: DetailProduct[];
  selectedColor: string | null;
  selectedSize: string | null;
  onColorChange: (color: string | null) => void;
  onSizeChange: (size: string | null) => void;
};

export function ProductVariantSelectors({
  variants,
  selectedColor,
  selectedSize,
  onColorChange,
  onSizeChange,
}: ProductVariantSelectorsProps) {
  const colors = sortColors(
    Array.from(
      new Set(
        variants
          .map((v) => (v.apiData ? getVariantColor(v.apiData) : null))
          .filter((c): c is string => Boolean(c)),
      ),
    ),
  );

  const sizes = sortSizes(
    Array.from(
      new Set(
        variants
          .filter((v) => {
            if (!v.apiData) return false;
            const color = getVariantColor(v.apiData);
            if (selectedColor && color !== selectedColor) return false;
            return true;
          })
          .map((v) => (v.apiData ? getVariantSize(v.apiData) : null))
          .filter((s): s is string => Boolean(s)),
      ),
    ),
  );

  if (colors.length <= 1 && sizes.length <= 1) return null;

  return (
    <div className="mt-5 space-y-4 border-b border-slate-200 pb-5">
      {colors.length > 1 && (
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
            Color
          </p>
          <div className="flex flex-wrap gap-2">
            {colors.map((color) => {
              const active = selectedColor === color;
              const swatch = colorSwatch(color);
              const isLight = swatch.fg === '#0b2d60';
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => onColorChange(color)}
                  className={`inline-flex h-9 items-center gap-2 border bg-white px-2.5 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-all duration-200 ${
                    active ? 'border-[#F5C400] bg-[#fff8db]' : 'border-slate-200 hover:border-[#F5C400]/70'
                  }`}
                >
                  <span
                    className={`h-4 w-4 shrink-0 ${isLight ? 'border border-slate-200' : ''}`}
                    style={{ backgroundColor: swatch.bg }}
                  />
                  {color}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {sizes.length > 1 && (
        <div>
          <p className="mb-2 text-[11px] font-bold uppercase tracking-wide text-slate-500">
            Talla
          </p>
          <div className="flex flex-wrap gap-2">
            {sizes.map((size) => {
              const active = selectedSize === size;
              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => onSizeChange(size)}
                  className={`h-10 min-w-[48px] border px-3 text-xs font-bold transition-all duration-200 ${
                    active
                      ? 'border-[#0b2d60] bg-[#0b2d60] text-white'
                      : 'border-slate-300 bg-white text-[#0b2d60] hover:border-[#0b2d60]'
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export function resolveActiveVariant(
  variants: DetailProduct[],
  selectedColor: string | null,
  selectedSize: string | null,
): DetailProduct {
  const match = variants.find((variant) => {
    if (!variant.apiData) return false;
    const color = getVariantColor(variant.apiData);
    const size = getVariantSize(variant.apiData);
    const colorOk = !selectedColor || color === selectedColor;
    const sizeOk = !selectedSize || size === selectedSize;
    return colorOk && sizeOk;
  });

  return match ?? variants[0];
}

export function getInitialVariantOptions(variants: DetailProduct[]) {
  const colors = sortColors(
    Array.from(
      new Set(
        variants
          .map((v) => (v.apiData ? getVariantColor(v.apiData) : null))
          .filter((c): c is string => Boolean(c)),
      ),
    ),
  );

  const firstColor = colors[0] ?? null;
  const sizes = sortSizes(
    Array.from(
      new Set(
        variants
          .filter((v) => {
            if (!v.apiData) return false;
            const color = getVariantColor(v.apiData);
            return !firstColor || color === firstColor;
          })
          .map((v) => (v.apiData ? getVariantSize(v.apiData) : null))
          .filter((s): s is string => Boolean(s)),
      ),
    ),
  );

  return {
    color: firstColor,
    size: sizes[0] ?? null,
  };
}
