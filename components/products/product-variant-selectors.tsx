'use client';

import {
  getVariantColor,
  getVariantSize,
  sortColors,
  sortSizes,
  type DetailProduct,
} from '@/lib/product-catalog';

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
              return (
                <button
                  key={color}
                  type="button"
                  onClick={() => onColorChange(color)}
                  className={`h-10 min-w-[72px] border px-3 text-xs font-bold uppercase tracking-wide transition-colors ${
                    active
                      ? 'border-[#0b2d60] bg-[#0b2d60] text-white'
                      : 'border-slate-300 bg-white text-[#0b2d60] hover:border-[#0b2d60]'
                  }`}
                >
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
                  className={`h-10 min-w-[48px] border px-3 text-xs font-bold transition-colors ${
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
