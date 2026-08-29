import { HeroSection } from '@/components/sections/hero';
import { HomeCategoryStrip } from '@/components/sections/home-category-strip';
import { HomeWholesaleIntro } from '@/components/sections/home-wholesale-intro';
import { HomeShippingMarquee } from '@/components/sections/home-shipping-marquee';
import { HomeFeaturedProducts } from '@/components/sections/home-featured-products';
import { HomeDistributorBanner } from '@/components/sections/home-distributor-banner';
import { HomeBestsellers } from '@/components/sections/home-bestsellers';
import { HomeCoverageMap } from '@/components/sections/home-coverage-map';
import { TrustSection } from '@/components/sections/trust';
import { ImportanteModal } from '@/components/sections/importante-modal';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-slate-900">
      <HeroSection />
      <HomeCategoryStrip />
      <HomeWholesaleIntro />
      <HomeShippingMarquee />
      <HomeFeaturedProducts />
      <HomeDistributorBanner />
      <HomeBestsellers />
      <HomeCoverageMap />
      <TrustSection />
      <ImportanteModal />
    </main>
  );
}
