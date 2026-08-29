'use client';

import { Truck } from '@phosphor-icons/react';

const PHRASES = [
  'Envíos a todo el Perú',
  'Despacho nacional',
  'Cobertura en todo el país',
  'Lima y provincias',
];

function MarqueeTrack() {
  return (
    <div className="flex shrink-0 items-center">
      {PHRASES.map((text) => (
        <span
          key={text}
          className="mx-8 flex shrink-0 items-center gap-3 sm:mx-12"
        >
          <Truck
            size={18}
            weight="duotone"
            className="shrink-0 text-[#F5C400]"
            aria-hidden
          />
          <span className="text-[11px] font-black uppercase tracking-[0.22em] text-white sm:text-xs">
            {text}
          </span>
          <span
            aria-hidden
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-white/35"
          />
        </span>
      ))}
    </div>
  );
}

export function HomeShippingMarquee() {
  return (
    <section
      aria-label="Envíos a nivel nacional"
      className="overflow-hidden border-y border-[#0b2d60] bg-[#0b2d60] py-2.5 sm:py-3"
    >
      <div className="zeus-marquee-shipping flex w-max items-center">
        <MarqueeTrack />
        <MarqueeTrack />
      </div>
    </section>
  );
}
