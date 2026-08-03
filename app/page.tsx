import { HeroSection } from '@/components/sections/hero';
import { HomeAbout } from '@/components/sections/home-about';
import { TrustSection } from '@/components/sections/trust';
import { CategoriesSection } from '@/components/sections/categories';
import { FeaturedProducts } from '@/components/sections/featured-products';
import { B2BCtaSection } from '@/components/sections/b2b-cta';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <HeroSection />
      <HomeAbout />
      <CategoriesSection />
      <FeaturedProducts />
      <TrustSection />
      <B2BCtaSection />
    </main>
  );
}
