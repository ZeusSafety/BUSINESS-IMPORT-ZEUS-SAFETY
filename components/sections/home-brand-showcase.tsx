'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

/**
 * Showcase de marca — 2 banners a altura completa (sin recortar).
 */
export function HomeBrandShowcase() {
  return (
    <section className="bg-[#f3f5f8] pb-10 sm:pb-12 lg:pb-16">
      <div className="mx-auto max-w-[1680px] px-5 sm:px-8 lg:px-10 xl:px-14">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.14 } },
          }}
          className="grid items-stretch gap-4 sm:gap-5 lg:grid-cols-2"
        >
          {/* Zeus — vertical */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -28 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="h-full"
          >
            <Link
              href="/productos?categoria=Protecci%C3%B3n%20Corporal"
              aria-label="Zeus Safety — Diseñados para resistir"
              className="group relative flex h-full min-h-[480px] overflow-hidden rounded-2xl border border-slate-200 bg-[#0b2d60] shadow-[0_12px_32px_rgba(11,45,96,0.1)] sm:min-h-[560px] lg:min-h-[640px]"
            >
              <Image
                src="/zeus-seccion-imagne.png"
                alt="Zeus Safety — Diseñados para resistir"
                width={1094}
                height={1438}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
                quality={95}
                priority
                unoptimized
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[#F5C400]/10 transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </Link>
          </motion.div>

          {/* Guardian dieléctrico — completo, sin recorte */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -28 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
              },
            }}
            className="h-full"
          >
            <Link
              href="/productos?categoria=Calzado%20de%20Seguridad"
              aria-label="Guardian dieléctrico — Zeus Safety"
              className="group relative flex h-full min-h-[480px] overflow-hidden rounded-2xl border border-slate-200 bg-[#0b2d60] shadow-[0_12px_32px_rgba(11,45,96,0.1)] sm:min-h-[560px] lg:min-h-[640px]"
            >
              <Image
                src="/guardian-electrico-imagne.jpg"
                alt="Guardian dieléctrico — Zeus Safety"
                width={1920}
                height={800}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="h-full w-full object-contain object-center transition-transform duration-700 group-hover:scale-[1.02]"
                quality={95}
                priority
              />
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 origin-left scale-x-0 bg-[#F5C400]/10 transition-transform duration-300 ease-out group-hover:scale-x-100"
              />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
