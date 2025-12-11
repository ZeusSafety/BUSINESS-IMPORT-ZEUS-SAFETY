import { cn } from '@/lib/utils';

type SectionHeadingProps = {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
};

export function SectionHeading({
  title,
  subtitle,
  align = 'left',
}: SectionHeadingProps) {
  return (
    <div
      className={cn('space-y-2', align === 'center' ? 'text-center' : '')}
    >
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-600">
        ZEUS SAFETY NEXT
      </p>
      <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">{title}</h2>
      {subtitle ? (
        <p className="text-base text-slate-600 sm:text-lg">{subtitle}</p>
      ) : null}
    </div>
  );
}

