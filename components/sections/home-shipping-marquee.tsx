'use client';

import type { ComponentType } from 'react';
import {
  HardHat,
  Headphones,
  SealCheck,
  Tag,
  Truck,
} from '@phosphor-icons/react';

type MarqueeItem = {
  id: string;
  label: string;
  Icon: ComponentType<{
    size?: number | string;
    weight?: 'duotone' | 'bold' | 'fill' | 'regular';
    className?: string;
    'aria-hidden'?: boolean;
  }>;
  highlight?: boolean;
};

const ITEMS: MarqueeItem[] = [
  {
    id: 'asesoria',
    label: 'Asesoría técnica especializada',
    Icon: Headphones,
  },
  {
    id: 'envios',
    label: 'Envíos a todo el Perú',
    Icon: Truck,
  },
  {
    id: 'homologados',
    label: 'Productos homologados',
    Icon: SealCheck,
  },
  {
    id: 'ofertas',
    label: 'Ofertas exclusivas',
    Icon: Tag,
    highlight: true,
  },
  {
    id: 'epp',
    label: 'Equipos de protección certificados',
    Icon: HardHat,
  },
  {
    id: 'despacho',
    label: 'Despacho nacional 24–48 h',
    Icon: Truck,
  },
];

function MarqueeTrack({ compact }: { compact?: boolean }) {
  return (
    <div className="flex shrink-0 items-center">
      {ITEMS.map((item) => {
        const Icon = item.Icon;
        return (
          <span
            key={item.id}
            className={`group/item flex shrink-0 cursor-default items-center gap-2.5 ${
              compact ? 'mx-4 sm:mx-6' : 'mx-5 sm:mx-7'
            }`}
          >
            <Icon
              size={compact ? 15 : 18}
              weight="duotone"
              aria-hidden
              className={`shrink-0 transition-colors duration-300 ${
                item.highlight
                  ? 'text-[#F5C400]'
                  : 'text-white/55 group-hover/item:text-[#F5C400]'
              }`}
            />
            <span
              className={`transition-colors duration-300 ${
                compact ? 'text-[10px] sm:text-[11px]' : 'text-[11px] sm:text-xs'
              } ${
                item.highlight
                  ? 'font-black uppercase tracking-[0.14em] text-[#F5C400]'
                  : 'font-semibold tracking-[0.04em] text-white/75 group-hover/item:text-[#F5C400]'
              }`}
            >
              {item.label}
            </span>
            <span
              aria-hidden
              className="mx-0.5 text-white/25 transition-colors duration-300 group-hover/item:text-[#F5C400]/50"
            >
              —
            </span>
          </span>
        );
      })}
    </div>
  );
}

type Props = {
  /** Compacto para la barra superior del header */
  variant?: 'default' | 'topbar';
};

export function HomeShippingMarquee({ variant = 'default' }: Props) {
  const isTopbar = variant === 'topbar';

  return (
    <div
      role="region"
      aria-label="Beneficios Zeus Safety"
      className={`group/marquee topbar-wrapper overflow-hidden bg-[#0b2d60] ${
        isTopbar
          ? 'border-b border-[#F5C400]/20 py-2'
          : 'border-y border-[#071a3a] py-3 sm:py-3.5'
      }`}
    >
      <div className="zeus-marquee-shipping flex w-max items-center group-hover/marquee:[animation-play-state:paused]">
        <MarqueeTrack compact={isTopbar} />
        <MarqueeTrack compact={isTopbar} />
        <MarqueeTrack compact={isTopbar} />
      </div>
    </div>
  );
}
