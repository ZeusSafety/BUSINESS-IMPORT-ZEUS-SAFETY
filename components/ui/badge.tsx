import { cn } from '@/lib/utils';

type BadgeProps = React.HTMLAttributes<HTMLSpanElement>;

export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full bg-[#e7f2ff] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#0b2d60]',
        className,
      )}
      {...props}
    />
  );
}

