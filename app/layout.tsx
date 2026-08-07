import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SiteChrome } from '@/components/layout/site-chrome';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Zeus Safety',
  description: 'EPP y seguridad industrial para operaciones críticas.',
  icons: {
    icon: [{ url: '/Logo de Zeus.png', type: 'image/png' }],
    apple: [{ url: '/Logo de Zeus.png', type: 'image/png' }],
    shortcut: '/Logo de Zeus.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${inter.variable} min-h-screen bg-white text-slate-900 antialiased`}
      >
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
