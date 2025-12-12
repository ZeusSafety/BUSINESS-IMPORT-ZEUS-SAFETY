import { products } from '@/lib/mockData';
import { notFound } from 'next/navigation';
import { AddToQuoteButton } from '@/components/products/add-to-quote-button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage({ params }: Props) {
  const product = products.find((p) => p.slug === params.slug);

  if (!product) return notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-4">
          <div className="h-96 rounded-3xl bg-gradient-to-br from-slate-100 via-white to-amber-50 shadow-inner" />
          <div className="flex flex-wrap gap-2">
            {product.certification.map((cert) => (
              <Badge key={cert}>{cert}</Badge>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-3">
            <Badge className="bg-slate-900 text-amber-300">{product.category}</Badge>
            <h1 className="text-3xl font-black text-slate-900">{product.name}</h1>
            <p className="text-lg text-slate-600">{product.description}</p>
          </div>
          <div className="flex items-center gap-6">
            <p className="text-4xl font-bold text-slate-900">
              ${product.price.toFixed(2)}
              <span className="ml-2 text-sm font-semibold text-slate-500">precio referencial</span>
            </p>
            <AddToQuoteButton product={product} />
          </div>

          <Card>
            <CardContent className="space-y-4 py-5">
              <h3 className="text-lg font-semibold text-slate-900">Especificaciones técnicas</h3>
              <dl className="grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-2">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="rounded-lg bg-slate-50 p-3">
                    <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {spec.label}
                    </dt>
                    <dd className="text-sm font-medium text-slate-900">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

