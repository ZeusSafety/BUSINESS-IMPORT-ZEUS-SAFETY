'use client';

import { usePathname } from 'next/navigation';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { WhatsAppButton } from '@/components/layout/whatsapp-button';
import { QuoteCartDrawer } from '@/components/layout/quote-cart-drawer';

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone = pathname.startsWith('/libro-de-reclamaciones');

  if (isStandalone) {
    return <div className="flex min-h-screen flex-col">{children}</div>;
  }

  return (
    <>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
      <QuoteCartDrawer />
      <WhatsAppButton />
    </>
  );
}
