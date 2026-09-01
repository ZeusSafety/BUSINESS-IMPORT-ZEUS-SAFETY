import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

type IconAccent = 'brand' | 'yellow' | 'sky' | 'emerald' | 'amber' | 'rose';

const accentStyles: Record<IconAccent, string> = {
  brand: 'bg-[#0b2d60]/[0.08] text-[#0b2d60]',
  yellow: 'bg-[#F5C400]/25 text-[#0b2d60]',
  sky: 'bg-sky-50 text-sky-700',
  emerald: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-700',
  rose: 'bg-rose-50 text-rose-600',
};

type IconBoxProps = {
  icon: LucideIcon;
  accent?: IconAccent;
  size?: 'sm' | 'md' | 'lg';
  rounded?: 'lg' | 'xl' | 'full';
  className?: string;
};

const sizeStyles = {
  sm: { box: 'h-9 w-9', icon: 'h-4 w-4' },
  md: { box: 'h-11 w-11', icon: 'h-5 w-5' },
  lg: { box: 'h-12 w-12', icon: 'h-6 w-6' },
};

export function IconBox({
  icon: Icon,
  accent = 'brand',
  size = 'md',
  rounded = 'xl',
  className,
}: IconBoxProps) {
  const roundClass =
    rounded === 'full' ? 'rounded-full' : rounded === 'lg' ? 'rounded-lg' : 'rounded-lg';

  return (
    <span
      className={cn(
        'inline-flex shrink-0 items-center justify-center transition-colors',
        sizeStyles[size].box,
        roundClass,
        accentStyles[accent],
        className,
      )}
    >
      <Icon className={sizeStyles[size].icon} strokeWidth={2.15} />
    </span>
  );
}
