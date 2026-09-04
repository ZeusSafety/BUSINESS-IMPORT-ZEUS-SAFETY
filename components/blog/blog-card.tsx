'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { blogPosts } from '@/lib/blog-data';

type BlogCardProps = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  cover: string;
  layout?: 'vertical' | 'horizontal';
  compact?: boolean;
  listView?: boolean;
};

export function BlogCard({
  slug,
  title,
  date,
  excerpt,
  cover,
  layout = 'horizontal',
  compact = false,
  listView = false,
}: BlogCardProps) {
  const isHorizontal = layout === 'horizontal';

  return (
    <article
      className={`group flex h-full w-full overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_28px_rgba(11,45,96,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#F5C400]/50 hover:shadow-[0_18px_44px_rgba(11,45,96,0.14)] ${
        listView
          ? 'flex-col sm:flex-row'
          : isHorizontal
            ? 'flex-col sm:flex-row'
            : 'flex-col'
      }`}
    >
      <Link
        href={`/blog/${slug}`}
        className={`relative block shrink-0 overflow-hidden bg-slate-50 ${
          listView
            ? 'aspect-[4/3] w-full sm:aspect-auto sm:w-[34%] sm:min-h-[220px] lg:w-[30%] lg:min-h-[240px]'
            : isHorizontal
              ? 'aspect-[4/3] w-full sm:aspect-auto sm:w-[42%] sm:min-h-[240px] lg:min-h-[260px]'
              : 'aspect-[4/3] w-full min-h-[200px] sm:min-h-[220px]'
        }`}
      >
        <Image
          src={cover}
          alt={title}
          fill
          className="object-contain p-2.5 transition duration-500 group-hover:scale-105 sm:p-3"
          sizes={
            isHorizontal
              ? '(max-width: 640px) 100vw, 40vw'
              : compact
                ? '(max-width: 640px) 100vw, 25vw'
                : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
          }
        />
      </Link>

      <div
        className={`flex min-w-0 flex-1 flex-col ${compact ? 'p-3.5 sm:p-4' : 'p-4 sm:p-5'}`}
      >
        <Link href={`/blog/${slug}`} className="group/title">
          <h3
            className={`font-bold leading-[1.5] text-[#0b2d60] transition-colors duration-200 group-hover/title:text-[#F5C400] ${
              compact ? 'text-sm sm:text-[15px]' : 'text-base sm:text-lg'
            }`}
          >
            {title}
          </h3>
        </Link>
        <p className="mt-2 text-[11px] font-medium text-slate-400 sm:text-xs">
          {date} · Sin categoría
        </p>
        <p
          className={`mt-2.5 flex-1 leading-relaxed text-slate-500 ${
            compact
              ? 'line-clamp-3 text-xs sm:text-[13px]'
              : 'line-clamp-3 text-sm'
          }`}
        >
          {excerpt}
        </p>
        <Link
          href={`/blog/${slug}`}
          className={`group/btn relative mt-4 inline-flex w-fit items-center gap-1.5 overflow-hidden rounded-full bg-[#0b2d60] font-bold uppercase tracking-wide text-white transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_6px_18px_rgba(245,196,0,0.35)] ${
            compact ? 'h-9 px-4 text-[10px]' : 'h-10 px-5 text-xs'
          }`}
        >
          <span
            aria-hidden
            className="absolute inset-0 origin-left scale-x-0 bg-[#F5C400] transition-transform duration-300 ease-out group-hover/btn:scale-x-100"
          />
          <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-[#0b2d60]">
            Ver más
          </span>
          <ChevronRight
            className="relative z-10 h-3.5 w-3.5 transition-colors duration-300 group-hover/btn:text-[#0b2d60]"
            strokeWidth={2.5}
          />
        </Link>
      </div>
    </article>
  );
}

export { blogPosts };
