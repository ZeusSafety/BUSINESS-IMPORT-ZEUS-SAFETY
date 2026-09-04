'use client';

import {
  GridSquaresIcon,
  ViewSwitcherButton,
  ViewSwitcherShell,
} from '@/components/ui/view-switcher-shell';

export type BlogViewMode = 'grid-2' | 'grid-3' | 'grid-4';

type BlogLayoutSwitcherProps = {
  value: BlogViewMode;
  onChange: (value: BlogViewMode) => void;
  className?: string;
};

const OPTIONS: { value: BlogViewMode; label: string; title: string }[] = [
  { value: 'grid-2', label: '2 columnas', title: '2 columnas' },
  { value: 'grid-3', label: '3 columnas', title: '3 columnas' },
  { value: 'grid-4', label: '4 columnas', title: '4 columnas' },
];

export function BlogLayoutSwitcher({
  value,
  onChange,
  className = '',
}: BlogLayoutSwitcherProps) {
  return (
    <ViewSwitcherShell ariaLabel="Vista del blog" className={className} size="md">
      {OPTIONS.map((option) => {
        const active = value === option.value;
        const cols = option.value === 'grid-2' ? 2 : option.value === 'grid-3' ? 3 : 4;
        return (
          <ViewSwitcherButton
            key={option.value}
            active={active}
            onClick={() => onChange(option.value)}
            title={option.title}
            ariaLabel={option.label}
          >
            <GridSquaresIcon cols={cols} active={active} />
          </ViewSwitcherButton>
        );
      })}
    </ViewSwitcherShell>
  );
}

export function blogViewGridClass(mode: BlogViewMode): string {
  switch (mode) {
    case 'grid-2':
      return 'grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4';
    case 'grid-3':
      return 'grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3';
    case 'grid-4':
      return 'grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4';
  }
}
