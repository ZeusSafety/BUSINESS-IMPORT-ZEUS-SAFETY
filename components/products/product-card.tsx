'use client';

import { Product } from '@/lib/mockData';
import { useQuoteStore } from '@/store/quoteStore';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Factory, Plus } from 'lucide-react';

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const addItem = useQuoteStore((state) => state.addItem);

  return (
    <Card className="flex flex-col overflow-hidden transition hover:-translate-y-1 hover:shadow-lg">
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-2">
          <Badge>{product.category}</Badge>
          <span className="flex items-center gap-1 text-xs font-semibold text-slate-500">
            <Factory className="h-4 w-4" /> {product.brand}
          </span>
        </div>
        <h3 className="text-lg font-bold text-slate-900">{product.name}</h3>
        <p className="text-sm text-slate-600 line-clamp-2">
          {product.description}
        </p>
      </CardHeader>

      <CardContent className="flex-1 space-y-3">
        <div className="h-40 rounded-lg bg-gradient-to-br from-slate-100 via-slate-50 to-amber-50" />
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
          {product.certification.map((cert) => (
            <span
              key={cert}
              className="rounded-full bg-slate-100 px-2 py-1 text-slate-700"
            >
              {cert}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase text-slate-500">Desde</p>
          <p className="text-2xl font-bold text-slate-900">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-slate-900 hover:text-amber-700"
          >
            <Link href={`/productos/${product.slug}`}>Ver detalles</Link>
          </Button>
          <Button
            size="sm"
            className="shadow-sm"
            onClick={() => addItem(product)}
          >
            <Plus className="h-4 w-4" />
            Agregar a cotización
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

