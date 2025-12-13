'use client';

import { Product } from '@/lib/mockData';
import { useQuoteStore } from '@/store/quoteStore';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Factory, Plus, Eye, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const addItem = useQuoteStore((state) => state.addItem);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#103a7b]/40 hover:shadow-lg">
        {/* Efecto de brillo en hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#103a7b]/0 via-[#103a7b]/0 to-[#00d2ff]/0 opacity-0 transition-opacity duration-300 group-hover:opacity-5" />
        
        <CardHeader className="relative p-4 pb-3">
          <div className="mb-2 flex items-center justify-between gap-2">
            <Badge className="bg-gradient-to-r from-[#103a7b] to-[#0b2d60] text-white border-0 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide">
              {product.category}
            </Badge>
            <div className="flex items-center gap-1 rounded-md bg-slate-50 px-2 py-0.5 border border-slate-200">
              <Factory className="h-3 w-3 text-[#103a7b]" />
              <span className="text-[10px] font-semibold text-slate-700">{product.brand}</span>
            </div>
          </div>
          
          <h3 className="text-base font-bold leading-snug text-slate-900 line-clamp-2 group-hover:text-[#103a7b] transition-colors duration-300 mb-1.5">
            {product.name}
          </h3>
          <p className="text-xs leading-relaxed text-slate-600 line-clamp-2">
            {product.description}
          </p>
        </CardHeader>

        <CardContent className="flex-1 px-4 pb-3">
          {/* Imagen del producto más compacta */}
          <div className="relative mb-3 h-32 overflow-hidden rounded-lg bg-gradient-to-br from-slate-50 via-white to-[#e7f2ff] border border-slate-200/50 group-hover:border-[#103a7b]/20 transition-colors duration-300">
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#103a7b]/10 to-[#00d2ff]/10" />
              </div>
            )}
          </div>
          
          {/* Certificaciones más compactas */}
          <div className="flex flex-wrap gap-1.5">
            {product.certification.map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-700 border border-slate-200/50 group-hover:bg-slate-50 group-hover:border-[#103a7b]/20 transition-colors duration-300"
              >
                <ShieldCheck className="h-2.5 w-2.5" />
                {cert}
              </span>
            ))}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2.5 border-t border-slate-200/50 bg-slate-50/30 p-4">
          <div className="flex w-full items-baseline justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 mb-0.5">
                Desde
              </p>
              <p className="text-2xl font-black text-[#103a7b]">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
          
          <div className="flex w-full items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="flex-1 h-8 border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-[#103a7b] hover:border-[#103a7b]/30 transition-all duration-300 text-xs"
            >
              <Link href={`/productos/${product.slug}`} className="flex items-center justify-center gap-1.5">
                <Eye className="h-3.5 w-3.5" />
                <span className="font-medium">Ver</span>
              </Link>
            </Button>
            <Button
              size="sm"
              className="flex-1 h-8 bg-gradient-to-r from-[#103a7b] to-[#0b2d60] text-white shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold text-xs"
              onClick={() => addItem(product)}
            >
              <Plus className="h-3.5 w-3.5 mr-1" />
              <span>Agregar</span>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

