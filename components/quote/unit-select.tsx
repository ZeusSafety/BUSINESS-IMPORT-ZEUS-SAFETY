'use client';

import { Check, ChevronDown } from 'lucide-react';
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from 'react';
import { createPortal } from 'react-dom';
import { QUOTE_UNITS, type QuoteUnit } from '@/lib/quote-units';

type UnitSelectSize = 'sm' | 'md' | 'lg';

type UnitSelectProps = {
  value: QuoteUnit;
  onChange: (unit: QuoteUnit) => void;
  size?: UnitSelectSize;
  className?: string;
};

const TRIGGER_SIZE: Record<UnitSelectSize, string> = {
  sm: 'h-9 px-6 text-[11px] tracking-[0.04em]',
  md: 'h-10 px-7 text-xs tracking-[0.06em]',
  lg: 'h-12 px-8 text-[13px] tracking-[0.06em]',
};

const MENU_GAP = 6;
const MENU_MIN_WIDTH = 132;
const MENU_ESTIMATED_HEIGHT = QUOTE_UNITS.length * 38 + 12;

export function UnitSelect({
  value,
  onChange,
  size = 'md',
  className = '',
}: UnitSelectProps) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [menuStyle, setMenuStyle] = useState<CSSProperties>({});
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const listId = useId();

  const computePosition = useCallback((): CSSProperties => {
    const el = triggerRef.current;
    if (!el) return {};
    const rect = el.getBoundingClientRect();
    const width = Math.max(rect.width, MENU_MIN_WIDTH);
    const left = Math.min(
      Math.max(8, rect.left + rect.width / 2 - width / 2),
      window.innerWidth - width - 8,
    );
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUp = spaceBelow < MENU_ESTIMATED_HEIGHT && rect.top > spaceBelow;
    return {
      position: 'fixed',
      left,
      width,
      zIndex: 9999,
      ...(openUp
        ? { bottom: window.innerHeight - rect.top + MENU_GAP }
        : { top: rect.bottom + MENU_GAP }),
    };
  }, []);

  const openMenu = () => {
    setMenuStyle(computePosition());
    setActiveIndex(Math.max(0, QUOTE_UNITS.indexOf(value)));
    setOpen(true);
  };

  const select = (unit: QuoteUnit) => {
    onChange(unit);
    setOpen(false);
    triggerRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const reposition = () => setMenuStyle(computePosition());
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node;
      if (triggerRef.current?.contains(target) || menuRef.current?.contains(target)) return;
      setOpen(false);
    };
    window.addEventListener('scroll', reposition, true);
    window.addEventListener('resize', reposition);
    document.addEventListener('mousedown', onDoc);
    return () => {
      window.removeEventListener('scroll', reposition, true);
      window.removeEventListener('resize', reposition);
      document.removeEventListener('mousedown', onDoc);
    };
  }, [open, computePosition]);

  const onKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openMenu();
      }
      return;
    }
    if (e.key === 'Escape' || e.key === 'Tab') {
      if (e.key === 'Escape') e.stopPropagation();
      setOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % QUOTE_UNITS.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + QUOTE_UNITS.length) % QUOTE_UNITS.length);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      select(QUOTE_UNITS[activeIndex]);
    }
  };

  const menu = open
    ? createPortal(
        <ul
          ref={menuRef}
          id={listId}
          role="listbox"
          aria-label="Unidad de medida"
          style={menuStyle}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-[0_20px_48px_rgba(11,45,96,0.18)]"
        >
          {QUOTE_UNITS.map((unit, index) => {
            const selected = unit === value;
            const active = index === activeIndex;
            return (
              <li key={unit} role="option" aria-selected={selected}>
                <button
                  type="button"
                  tabIndex={-1}
                  onMouseEnter={() => setActiveIndex(index)}
                  onClick={() => select(unit)}
                  className={`relative flex h-[38px] w-full items-center justify-center rounded-xl px-7 text-[11px] font-bold uppercase tracking-[0.1em] transition-colors ${
                    selected
                      ? 'bg-[#0b2d60] text-white'
                      : active
                        ? 'bg-[#F5C400]/25 text-[#0b2d60]'
                        : 'text-[#0b2d60]'
                  }`}
                >
                  {unit}
                  {selected && (
                    <Check
                      className="absolute right-2.5 h-3.5 w-3.5 text-[#F5C400]"
                      strokeWidth={3}
                    />
                  )}
                </button>
              </li>
            );
          })}
        </ul>,
        document.body,
      )
    : null;

  return (
    <div className={`relative min-w-0 ${className}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-label={`Unidad de medida: ${value}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        onClick={() => (open ? setOpen(false) : openMenu())}
        onKeyDown={onKeyDown}
        className={`relative flex w-full items-center justify-center rounded-full border bg-white font-bold uppercase text-[#0b2d60] transition-all ${TRIGGER_SIZE[size]} ${
          open
            ? 'border-[#0b2d60] shadow-[0_0_0_3px_rgba(11,45,96,0.08)]'
            : 'border-slate-200 hover:border-[#F5C400] hover:shadow-[0_4px_14px_rgba(245,196,0,0.2)]'
        }`}
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          aria-hidden
          className={`absolute h-3.5 w-3.5 text-[#0b2d60]/60 transition-transform duration-200 ${
            size === 'sm' ? 'right-2' : 'right-3'
          } ${
            open ? 'rotate-180' : ''
          }`}
          strokeWidth={2.5}
        />
      </button>
      {menu}
    </div>
  );
}
