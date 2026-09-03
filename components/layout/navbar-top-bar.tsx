'use client';

import { useEffect, useState, useRef } from 'react';
import { Facebook, Instagram, Mail, MapPin, Clock } from 'lucide-react';

const EMAIL = 'zeus.safety2020@gmail.com';
const ADDRESS = 'Av. Guillermo Dansey 401, C.C Plaza Ferretero Las Malvinas, Lima';
const HOURS = 'Lun – Sáb: 9:00 – 17:30';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.37a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.8z" />
    </svg>
  );
}

const infoItems = [
  { icon: Mail, text: EMAIL, href: `mailto:${EMAIL}` },
  { icon: MapPin, text: ADDRESS },
  { icon: Clock, text: HOURS },
];

const socials = [
  { href: 'https://www.facebook.com/ZeusSafetyPeru', label: 'Facebook', icon: Facebook },
  { href: 'https://www.instagram.com/zeussafetyperu/', label: 'Instagram', icon: Instagram },
  { href: 'https://www.tiktok.com/@zeussafetyperu', label: 'TikTok', icon: TikTokIcon },
];

export function NavbarTopBar() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % infoItems.length);
    }, 3500);
    return () => clearInterval(intervalRef.current);
  }, []);

  const item = infoItems[current];
  const Icon = item.icon;

  return (
    <div className="topbar-wrapper hidden border-b border-[#F5C400]/20 bg-[#0b2d60] lg:block">
      <div className="mx-auto flex h-9 max-w-[1600px] items-center justify-between px-6 xl:px-10">
        {/* Carrusel de info */}
        <div className="relative flex h-full flex-1 items-center overflow-hidden">
          <div
            key={current}
            className="flex animate-[fadeSlideIn_0.4s_ease] items-center gap-2 text-[11px] font-medium tracking-wide text-white/90"
          >
            <Icon className="h-3.5 w-3.5 shrink-0 text-[#F5C400]" strokeWidth={2} />
            {item.href ? (
              <a href={item.href} className="transition-colors hover:text-[#F5C400]">
                {item.text}
              </a>
            ) : (
              <span>{item.text}</span>
            )}
          </div>
        </div>

        {/* Redes */}
        <div className="flex items-center gap-1.5">
          {socials.map(({ href, label, icon: SIcon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              className="flex h-6 w-6 items-center justify-center text-white/70 transition-all duration-200 hover:text-[#F5C400]"
            >
              <SIcon className="h-3.5 w-3.5" strokeWidth={2} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
