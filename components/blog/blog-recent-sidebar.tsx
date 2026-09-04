'use client';

import Link from 'next/link';
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
              className={`block px-5 py-3.5 text-sm leading-snug text-slate-600 transition-colors hover:bg-[#F5C400]/10 hover:text-[#0b2d60] ${
                index < posts.length - 1 ? 'border-b border-slate-100' : ''
              }`}
            >
              {post.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
