'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Package, Plus, ShoppingCart } from 'lucide-react';

type QuoteEmptyStateProps = {
  variant?: 'page' | 'drawer';
  onCatalogClick?: () => void;
};

const CARD = {
  page: 'h-[176px] w-[176px] sm:h-[200px] sm:w-[200px]',
  drawer: 'h-[128px] w-[128px]',
} as const;

const ICON_WRAP = {
  page: 'h-16 w-16 sm:h-[72px] sm:w-[72px]',
  drawer: 'h-14 w-14',
} as const;

const ICON = {
  page: 'h-8 w-8 sm:h-9 sm:w-9',
  drawer: 'h-7 w-7',
} as const;

function ConnectingArrow({ compact }: { compact?: boolean }) {
  return (
    <motion.div
      className={`pointer-events-none absolute left-1/2 top-[58%] z-10 -translate-x-1/2 -translate-y-1/2 ${
        compact ? 'w-[168px]' : 'w-[200px] sm:w-[220px]'
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, y: [0, -6, 0] }}
      transition={{
        opacity: { duration: 0.4, delay: 0.3 },
        y: {
          duration: 2.8,
          ease: 'easeInOut',
          repeat: Infinity,
        },
      }}
      aria-hidden
    >
      <Image
        src="/quote-flow-arrow.svg"
        alt=""
        width={200}
        height={64}
        className="h-auto w-full"
        priority={false}
      />
    </motion.div>
  );
}

export function QuoteEmptyState({
  variant = 'page',
  onCatalogClick,
}: QuoteEmptyStateProps) {
  const compact = variant === 'drawer';
  const size = compact ? 'drawer' : 'page';

  return (
    <div
      className={
        compact
          ? 'flex flex-col items-center px-2 py-6 text-center'
          : 'rounded-xl border border-dashed border-[#0b2d60]/20 bg-white px-6 py-14 text-center sm:px-10 sm:py-16'
      }
    >
      <div className="mx-auto mb-9 flex w-full justify-center">
        <div
          className={`relative inline-flex items-start justify-center ${
            compact ? 'gap-12' : 'gap-14 sm:gap-20'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.05 }}
            className={`flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white shadow-[0_12px_36px_rgba(11,45,96,0.1)] ${CARD[size]}`}
          >
            <span
              className={`flex items-center justify-center rounded-full bg-[#eef2f8] text-[#0b2d60] ${ICON_WRAP[size]}`}
            >
              <ShoppingCart className={ICON[size]} strokeWidth={2.1} />
            </span>
            <p
              className={`mt-3 font-bold uppercase tracking-[0.16em] text-[#0b2d60] ${
                compact ? 'text-xs' : 'text-sm'
              }`}
            >
              Compra
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, delay: 0.15 }}
            className={`group flex flex-col items-center justify-center rounded-xl border border-slate-200 bg-white shadow-[0_12px_36px_rgba(11,45,96,0.1)] transition-shadow hover:border-[#F5C400]/50 hover:shadow-[0_16px_40px_rgba(245,196,0,0.22)] ${CARD[size]}`}
          >
            <motion.span
              className={`flex items-center justify-center rounded-full bg-[#eef2f8] text-[#0b2d60] transition-colors duration-300 group-hover:bg-[#F5C400] ${ICON_WRAP[size]}`}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 2.4,
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 0.8,
              }}
              whileHover={{ scale: 1.1, rotate: 90 }}
            >
              <Plus className={ICON[size]} strokeWidth={2.5} />
            </motion.span>
            <p
              className={`mt-3 font-bold uppercase tracking-[0.16em] text-slate-400 transition-colors group-hover:text-[#0b2d60] ${
                compact ? 'text-xs' : 'text-sm'
              }`}
            >
              Agregar
            </p>
          </motion.div>

          <ConnectingArrow compact={compact} />
        </div>
      </div>

      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className={`font-black text-[#0b2d60] ${
          compact ? 'text-base' : 'text-xl sm:text-2xl'
        }`}
      >
        Tu cotización está vacía
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.32 }}
        className={`mx-auto mt-2 text-slate-500 ${
          compact ? 'text-[11px]' : 'text-sm'
        }`}
      >
        Agrega productos desde el catálogo para cotizar.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        className={compact ? 'mt-5' : 'mt-8'}
      >
        <Link
          href="/productos"
          onClick={onCatalogClick}
          className={`group inline-flex items-center gap-2 rounded-md bg-[#F5C400] font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233] ${
            compact ? 'h-10 px-5 text-[10px]' : 'h-12 px-7 text-sm'
          }`}
        >
          <Package className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
          Explorar catálogo
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </motion.div>
    </div>
  );
}
