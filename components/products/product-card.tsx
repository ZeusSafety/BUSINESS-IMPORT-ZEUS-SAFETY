'use client';

import { Product } from '@/lib/mockData';
import { useQuoteStore } from '@/store/quoteStore';
import Link from 'next/link';
import { Toast } from '@/components/ui/toast';
import { Eye, Factory, Plus, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const addItem = useQuoteStore((state) => state.addItem);
  const [showToast, setShowToast] = useState(false);

  const handleAddItem = () => {
    addItem(product);
    setShowToast(true);
  };

  return (
    <>
      <article className="group flex h-full flex-col overflow-hidden border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#0b2d60]/25 hover:shadow-lg">
        <div className="h-1 bg-[#F5C400] opacity-0 transition-opacity group-hover:opacity-100" />

        <div className="flex items-start justify-between gap-2 px-4 pt-4">
          <span className="bg-[#0b2d60] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
            {product.category}
          </span>
          <span className="inline-flex items-center gap-1 border border-slate-200 px-2 py-1 text-[10px] font-semibold text-slate-600">
            <Factory className="h-3 w-3 text-[#0b2d60]" />
            {product.brand}
          </span>
        </div>

        <div className="space-y-1.5 px-4 pt-3">
          <h3 className="line-clamp-2 text-base font-bold leading-snug text-[#0c1427]">
            {product.name}
          </h3>
          <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">
            {product.description}
          </p>
        </div>

        <div className="relative mx-4 mt-3 h-40 overflow-hidden bg-slate-50">
          {product.image ? (
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-100">
              <div className="h-14 w-14 rounded-full bg-slate-200" />
            </div>
          )}
        </div>

        {product.certification && product.certification.length > 0 && (
          <div className="flex flex-wrap gap-1.5 px-4 pt-3">
            {product.certification.map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-1 border border-[#F5C400]/40 bg-[#fff8db] px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-[#0b2d60]"
              >
                <ShieldCheck className="h-2.5 w-2.5 text-[#F5C400]" />
                {cert}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto space-y-3 border-t border-slate-100 px-4 py-4">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Desde
            </p>
            <p className="text-2xl font-black text-[#0b2d60]">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="flex gap-2">
            <Link
              href={`/productos/${encodeURIComponent(product.slug)}`}
              className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 border border-slate-200 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:border-[#0b2d60] hover:bg-slate-50"
            >
              <Eye className="h-3.5 w-3.5" />
              Ver
            </Link>
            <button
              type="button"
              onClick={handleAddItem}
              className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 bg-[#F5C400] text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233]"
            >
              <Plus className="h-3.5 w-3.5" />
              Agregar
            </button>
          </div>
        </div>
      </article>

      <Toast
        message="Producto agregado correctamente"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </>
  );
}
