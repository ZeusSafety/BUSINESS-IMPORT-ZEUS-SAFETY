import { HeroSection } from '@/components/sections/hero';
import { TrustSection } from '@/components/sections/trust';
import { CategoriesSection } from '@/components/sections/categories';
import { FeaturedProducts } from '@/components/sections/featured-products';
import { B2BCtaSection } from '@/components/sections/b2b-cta';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <HeroSection />
      <TrustSection />
      <CategoriesSection />
      <FeaturedProducts />
      <B2BCtaSection />
    </main>
  );
}
