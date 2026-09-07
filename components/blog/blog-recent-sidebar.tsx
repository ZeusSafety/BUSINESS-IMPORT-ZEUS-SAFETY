'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { BlogPost } from '@/lib/blog-data';

type BlogRecentSidebarProps = {
  posts: Pick<BlogPost, 'slug' | 'title'>[];
};

export function BlogRecentSidebar({ posts }: BlogRecentSidebarProps) {
  return (
    <aside className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_28px_rgba(11,45,96,0.06)]">
      <div className="border-b border-slate-100 px-5 py-4">
        <h2 className="text-base font-bold text-[#0b2d60]">Entradas recientes</h2>
      </div>
      <ul>
        {posts.map((post, index) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className={`group/item relative flex items-center gap-2 overflow-hidden px-5 py-3.5 text-sm leading-snug text-slate-600 transition-colors hover:text-[#0b2d60] ${
                index < posts.length - 1 ? 'border-b border-slate-100' : ''
              }`}
            >
              <span
                aria-hidden
                className="absolute inset-0 origin-left scale-x-0 bg-[#F5C400]/15 transition-transform duration-300 ease-out group-hover/item:scale-x-100"
              />
              <span className="relative z-10 min-w-0 flex-1">{post.title}</span>
              <ArrowRight
                className="relative z-10 h-3.5 w-3.5 shrink-0 -translate-x-1 text-[#0b2d60] opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100"
                strokeWidth={2.5}
              />
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
