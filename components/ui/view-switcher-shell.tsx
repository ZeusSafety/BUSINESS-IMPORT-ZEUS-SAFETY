'use client';

import type { ReactNode } from 'react';

export function ViewSwitcherShell({
  children,
  ariaLabel,
  className = '',
  size = 'md',
}: {
  children: ReactNode;
  ariaLabel: string;
  className?: string;
  size?: 'md' | 'lg';
}) {
  return (
    <div
      className={`inline-flex items-center gap-0 rounded-lg border border-slate-200 bg-white p-1 ${
        size === 'lg' ? 'h-12' : ''
      } ${className}`}
      role="group"
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}

export function ViewSwitcherButton({
  active,
  onClick,
  title,
  ariaLabel,
  children,
}: {
  active: boolean;
  onClick: () => void;
  title: string;
  ariaLabel: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={ariaLabel}
      aria-pressed={active}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors duration-150 sm:h-10 sm:w-10 ${
        active
          ? 'bg-[#0b2d60] text-white'
          : 'text-slate-400 hover:bg-slate-50 hover:text-[#0b2d60]'
      }`}
    >
      {children}
    </button>
  );
}

export function GridSquaresIcon({
  cols,
  active,
}: {
  cols: 2 | 3 | 4;
  active: boolean;
}) {
  return (
    <span
      className={`inline-grid gap-[1.5px] ${
        cols === 2 ? 'grid-cols-2' : cols === 3 ? 'grid-cols-3' : 'grid-cols-4'
      } h-[14px] w-[14px]`}
      aria-hidden
    >
      {Array.from({ length: cols * cols }).map((_, i) => (
        <span key={i} className={active ? 'bg-white' : 'bg-current'} />
      ))}
    </span>
  );
}
