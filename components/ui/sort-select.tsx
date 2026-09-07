'use client';

import { Check, ChevronDown } from 'lucide-react';
import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';

export type SortOption =
  | 'default'
  | 'popularity'
  | 'newest'
  | 'price-asc'
  | 'price-desc';

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'default', label: 'Orden predeterminado' },
  { value: 'popularity', label: 'Ordenar por popularidad' },
  { value: 'newest', label: 'Ordenar por los últimos' },
  { value: 'price-asc', label: 'Ordenar por precio: bajo a alto' },
  { value: 'price-desc', label: 'Ordenar por precio: alto a bajo' },
];

type SortSelectProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export function SortSelect({ value, onChange }: SortSelectProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({});
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const current =
    SORT_OPTIONS.find((o) => o.value === value) ?? SORT_OPTIONS[0];

  useEffect(() => {
    setMounted(true);
  }, []);

  const updatePosition = () => {
    const el = rootRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setMenuStyle({
      position: 'fixed',
      top: rect.bottom + 6,
      left: rect.left,
      width: Math.max(rect.width, 260),
      zIndex: 9999,
    });
  };

  useLayoutEffect(() => {
    if (!open) return;
    updatePosition();
    const onScrollOrResize = () => updatePosition();
    window.addEventListener('scroll', onScrollOrResize, true);
    window.addEventListener('resize', onScrollOrResize);
    return () => {
      window.removeEventListener('scroll', onScrollOrResize, true);
      window.removeEventListener('resize', onScrollOrResize);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        rootRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const menu =
    open && mounted
      ? createPortal(
          <ul
            ref={menuRef}
            role="listbox"
            aria-label="Ordenar productos"
            style={menuStyle}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_48px_rgba(11,45,96,0.18)]"
          >
            {SORT_OPTIONS.map((option) => {
              const selected = option.value === value;
              return (
                <li key={option.value} role="option" aria-selected={selected}>
                  <button
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition-colors ${
                      selected
                        ? 'bg-[#0b2d60] font-semibold text-white'
                        : 'text-[#0c1427] hover:bg-[#F5C400]/20 hover:text-[#0b2d60]'
                    }`}
                  >
                    <span>{option.label}</span>
                    {selected && <Check className="h-4 w-4 shrink-0" />}
                  </button>
                </li>
              );
            })}
          </ul>,
          document.body,
        )
      : null;

  return (
    <div
      ref={rootRef}
      className={`relative min-w-[220px] sm:min-w-[260px] ${open ? 'z-[60]' : 'z-10'}`}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        className={`flex h-11 w-full items-center justify-between gap-3 rounded-full border bg-white px-4 text-left text-sm font-medium shadow-sm transition-colors ${
          open
            ? 'border-[#0b2d60] text-[#0b2d60] shadow-[0_0_0_3px_rgba(11,45,96,0.08)]'
            : 'border-slate-200 text-[#0c1427] hover:border-[#0b2d60]/40'
        }`}
      >
        <span className="truncate">{current.label}</span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#0b2d60] transition-transform ${
            open ? 'rotate-180' : ''
          }`}
        />
      </button>
      {menu}
    </div>
  );
}
