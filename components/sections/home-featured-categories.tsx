'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

type FeaturedCategory = {
  title: string;
  subtitle: string;
  href: string;
  image: string;
};

const featured: FeaturedCategory[] = [
  {
    title: 'Guantes',
    subtitle: 'Seguridad manual',
    href: '/productos?categoria=Guantes',
    image: '/Guantes-1.jpg',
  },
  {
    title: 'Seguridad Respiratoria',
    subtitle: 'Mascarillas y filtros',
    href: '/productos?categoria=Respiradores',
    image: '/Seguridad Respiradora-1.jpg',
  },
  {
    title: 'Seguridad Vial',
    subtitle: 'Señalización y tránsito',
    href: '/productos?categoria=Vial',
    image: '/Seguridad Vial-1.jpg',
  },
  {
    title: 'Calzado de Seguridad',
    subtitle: 'Buffalo · Guardian · Tokio',
    href: '/productos?categoria=Calzado%20de%20Seguridad',
    image: '/zapatos-1.jpg',
  },
];

export function HomeFeaturedCategories() {
  return (
    <section className="bg-white py-8 sm:py-10 lg:py-12">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-10 xl:px-12">
        <div className="relative overflow-hidden rounded-xl bg-[#0b2d60]">
          <div className="absolute left-0 top-0 h-full w-1.5 bg-[#F5C400]" />

          <div className="relative px-5 py-7 sm:px-7 sm:py-8 lg:px-9 lg:py-10">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-3 sm:mb-7">
              <div>
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.26em] text-[#F5C400]">
                  Catálogo Zeus
                </p>
                <h2 className="text-xl font-black uppercase tracking-[0.04em] text-white sm:text-2xl">
                  Categorías destacadas
                </h2>
              </div>
              <Link
                href="/productos"
                className="group inline-flex items-center gap-2 rounded-lg border border-white/25 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:border-[#F5C400] hover:bg-[#F5C400] hover:text-[#0b2d60]"
              >
                Ver catálogo
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
              {featured.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                >
                  <Link
                    href={item.href}
                    className="group relative flex h-full flex-col overflow-hidden rounded-xl bg-white shadow-[0_14px_40px_rgba(0,0,0,0.28)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_22px_50px_rgba(0,0,0,0.35)]"
                  >
                    <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        className="object-cover object-[center_10%] transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                      />

                      {/* Fondo claro abajo para que el texto negro se lea */}
                      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-white via-white/90 to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 z-10 p-4 sm:p-5">
                        <div className="mb-2 h-0.5 w-8 bg-[#F5C400] transition-all duration-300 group-hover:w-14" />
                        <h3 className="text-sm font-black uppercase leading-tight tracking-wide text-[#0b2d60] sm:text-base">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-600">
                          {item.subtitle}
                        </p>

                        <span className="mt-3 inline-flex items-center gap-2 rounded-md bg-[#F5C400] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#0b2d60] transition-colors group-hover:bg-[#0b2d60] group-hover:text-[#F5C400]">
                          Ver productos
                          <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
