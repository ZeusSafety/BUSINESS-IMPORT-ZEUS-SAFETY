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
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#F5C400]">
        Zeus Safety
      </p>
      <h2 className="text-2xl font-black tracking-tight text-[#0c1427] sm:text-3xl lg:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base lg:text-lg">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
