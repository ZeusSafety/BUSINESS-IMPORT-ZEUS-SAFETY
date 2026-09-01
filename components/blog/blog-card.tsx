'use client';

import Image from 'next/image';
import Link from 'next/link';
import { blogPosts, formatBlogDate } from '@/lib/blog-data';

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
      className={`group zeus-card flex h-full w-full transition hover:border-[#0b2d60]/30 hover:shadow-[0_12px_32px_rgba(11,45,96,0.1)] ${
        listView
          ? 'flex-col sm:flex-row'
          : isHorizontal
            ? 'flex-col sm:flex-row'
            : 'flex-col'
      }`}
    >
      <Link
        href={`/blog/${slug}`}
        className={`relative block shrink-0 overflow-hidden bg-[#f8fafc] ${
          listView
            ? 'aspect-[4/3] w-full sm:aspect-auto sm:w-[34%] sm:min-h-[200px] lg:w-[30%] lg:min-h-[220px]'
            : isHorizontal
              ? 'aspect-[4/3] w-full sm:aspect-auto sm:w-[42%] sm:min-h-[220px] lg:min-h-[240px]'
              : 'aspect-[4/3] w-full'
        }`}
      >
        <span
          aria-hidden
          className="absolute left-0 top-0 z-10 h-full w-1 bg-[#F5C400] opacity-0 transition-opacity group-hover:opacity-100"
        />
        <Image
          src={cover}
          alt={title}
          fill
          className="object-contain p-2 transition duration-500 group-hover:scale-[1.02] sm:p-3"
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
        className={`flex min-w-0 flex-1 flex-col ${compact ? 'p-3' : 'p-4 sm:p-5'}`}
      >
        <p className="text-[10px] font-bold uppercase tracking-wide text-[#F5C400]">
          {formatBlogDate(date)}
        </p>
        <Link href={`/blog/${slug}`}>
          <h3
            className={`mt-1 line-clamp-2 font-bold leading-snug text-[#0b2d60] transition-colors group-hover:text-[#0a2552] ${
              compact ? 'text-xs sm:text-[13px]' : 'text-sm'
            }`}
          >
            {title}
          </h3>
        </Link>
        <p
          className={`mt-1.5 flex-1 leading-relaxed text-slate-600 ${
            compact
              ? 'line-clamp-2 text-[11px] sm:text-xs'
              : 'line-clamp-3 text-xs sm:text-[13px]'
          }`}
        >
          {excerpt}
        </p>
        <Link
          href={`/blog/${slug}`}
          className={`mt-3 inline-flex w-fit items-center justify-center rounded-lg border border-[#F5C400] bg-white font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#F5C400] ${
            compact ? 'h-8 px-3 text-[10px]' : 'mt-4 h-9 px-4 text-xs'
          }`}
        >
          Leer artículo
        </Link>
      </div>
    </article>
  );
}

export { blogPosts };
