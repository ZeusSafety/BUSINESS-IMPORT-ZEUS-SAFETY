import { HeroSection } from '@/components/sections/hero';
import { HomeCategoryStrip } from '@/components/sections/home-category-strip';
import { HomeFeaturedCategories } from '@/components/sections/home-featured-categories';
import { HomePromoBanners } from '@/components/sections/home-promo-banners';
import { HomeBestProducts } from '@/components/sections/home-best-products';
import { HomeDistributorBanner } from '@/components/sections/home-distributor-banner';
import { HomeCoverageMap } from '@/components/sections/home-coverage-map';
import { TrustSection } from '@/components/sections/trust';
import { ImportanteModal } from '@/components/sections/importante-modal';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <HeroSection />
      <HomeCategoryStrip />
      <HomeFeaturedCategories />
      <HomePromoBanners />
      <HomeBestProducts />
      <HomeDistributorBanner />
      <HomeCoverageMap />
      <TrustSection />
      <ImportanteModal />
    </main>
  );
}
