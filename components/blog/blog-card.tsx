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
};

export function BlogCard({ slug, title, date, excerpt, cover }: BlogCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden border border-slate-200 bg-white transition hover:border-[#0b2d60]/30 hover:shadow-[0_12px_32px_rgba(11,45,96,0.1)]">
      <Link
        href={`/blog/${slug}`}
        className="relative block aspect-[16/10] overflow-hidden bg-slate-100"
      >
        <Image
          src={cover}
          alt={title}
          fill
          className="object-contain p-1.5 transition duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/blog/${slug}`}>
          <h3 className="line-clamp-2 text-sm font-bold leading-snug text-[#0b2d60] transition-colors group-hover:text-[#0a2552] sm:text-[15px]">
            {title}
          </h3>
        </Link>
        <p className="mt-1.5 text-[11px] text-slate-400">
          {formatBlogDate(date)}
        </p>
        <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-slate-600 sm:text-[13px]">
          {excerpt}
        </p>
        <Link
          href={`/blog/${slug}`}
          className="mt-4 inline-flex h-9 items-center justify-center border border-[#F5C400] bg-white px-4 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#F5C400]"
        >
          Ver más
        </Link>
      </div>
    </article>
  );
}

export { blogPosts };
