'use client';

import {
  GridSquaresIcon,
  ViewSwitcherButton,
  ViewSwitcherShell,
} from '@/components/ui/view-switcher-shell';

export type CatalogGridCols = 2 | 3 | 4;

type GridColumnSwitcherProps = {
  value: CatalogGridCols;
  onChange: (value: CatalogGridCols) => void;
  ariaLabel?: string;
  className?: string;
  size?: 'md' | 'lg';
};

const OPTIONS: CatalogGridCols[] = [2, 3, 4];

export function GridColumnSwitcher({
  value,
  onChange,
  ariaLabel = 'Columnas del catálogo',
  className = '',
  size = 'lg',
}: GridColumnSwitcherProps) {
  return (
    <ViewSwitcherShell ariaLabel={ariaLabel} className={className} size={size}>
      {OPTIONS.map((cols) => {
        const active = value === cols;
        return (
          <ViewSwitcherButton
            key={cols}
            active={active}
            onClick={() => onChange(cols)}
            title={`${cols} columnas`}
            ariaLabel={`Mostrar ${cols} columnas`}
          >
            <GridSquaresIcon cols={cols} active={active} />
          </ViewSwitcherButton>
        );
      })}
    </ViewSwitcherShell>
  );
}

export function gridColsClass(cols: CatalogGridCols): string {
  const map: Record<CatalogGridCols, string> = {
    2: 'grid grid-cols-1 gap-5 sm:grid-cols-2',
    3: 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };
  return map[cols];
}
