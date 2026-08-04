'use client';

import { useEffect, useState } from 'react';

export type CurrencyCode = 'PEN' | 'USD';

const STORAGE_KEY = 'zeus-currency';

const currencies: {
  code: CurrencyCode;
  name: string;
  symbol: string;
}[] = [
  {
    code: 'USD',
    name: 'Dólar de los Estados Unidos',
    symbol: '$',
  },
  {
    code: 'PEN',
    name: 'Sol peruano',
    symbol: 'S/',
  },
];

export function getStoredCurrency(): CurrencyCode {
  if (typeof window === 'undefined') return 'PEN';
  const v = localStorage.getItem(STORAGE_KEY);
  return v === 'USD' || v === 'PEN' ? v : 'PEN';
}

export function SideCurrencyDock() {
  const [open, setOpen] = useState(false);
  const [currency, setCurrency] = useState<CurrencyCode>('PEN');

  useEffect(() => {
    setCurrency(getStoredCurrency());
  }, []);

  const select = (code: CurrencyCode) => {
    setCurrency(code);
    localStorage.setItem(STORAGE_KEY, code);
    window.dispatchEvent(
      new CustomEvent('zeus-currency-change', { detail: code }),
    );
  };

  return (
    <aside
      className="fixed right-0 top-1/2 z-[60] hidden -translate-y-1/2 lg:block"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className={`overflow-hidden shadow-[-6px_0_24px_rgba(11,45,96,0.28)] transition-all duration-300 ease-out ${
          open ? 'w-[230px]' : 'w-[52px]'
        }`}
      >
        {/* Header — solo al abrir */}
        <div
          className={`flex items-center justify-center bg-[#071a3a] transition-all duration-300 ${
            open ? 'h-10 opacity-100' : 'h-0 overflow-hidden opacity-0'
          }`}
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-white">
            Moneda
          </p>
        </div>

        {currencies.map((item) => {
          const active = currency === item.code;
          const isUsd = item.code === 'USD';

          const closedBg = isUsd
            ? 'bg-[#0b2d60] text-white'
            : 'bg-[#F5C400] text-[#0b2d60]';
          const openBg = active
            ? 'bg-[#F5C400] text-[#0b2d60]'
            : 'bg-[#0b2d60] text-white hover:bg-[#123a75]';

          return (
            <button
              key={item.code}
              type="button"
              onClick={() => select(item.code)}
              title={`${item.code} — ${item.name}`}
              className={`flex h-[52px] w-full items-center transition-colors ${
                open ? openBg : closedBg
              }`}
            >
              {/* Columna fija = franja visible cuando está cerrado */}
              <span className="flex h-full w-[52px] shrink-0 items-center justify-center text-lg font-black leading-none">
                {item.symbol}
              </span>

              <span
                className={`min-w-0 flex-1 pr-3 text-left transition-opacity duration-200 ${
                  open ? 'opacity-100' : 'pointer-events-none opacity-0'
                }`}
              >
                <span className="block text-xs font-black tracking-wide">
                  {item.code}
                </span>
                <span
                  className={`block truncate text-[10px] font-semibold ${
                    active ? 'text-[#0b2d60]/75' : 'text-white/80'
                  }`}
                >
                  {item.name}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
