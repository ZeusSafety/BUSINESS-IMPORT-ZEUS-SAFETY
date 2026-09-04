'use client';

import { useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { BlogCard } from '@/components/blog/blog-card';
import { BlogRecentSidebar } from '@/components/blog/blog-recent-sidebar';
import {
  BlogLayoutSwitcher,
  blogViewGridClass,
  type BlogViewMode,
} from '@/components/blog/blog-layout-switcher';
import { blogPosts } from '@/lib/blog-data';

const PER_PAGE = 6;

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState<BlogViewMode>('grid-3');
  const totalPages = Math.max(1, Math.ceil(blogPosts.length / PER_PAGE));

  const pagePosts = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return blogPosts.slice(start, start + PER_PAGE);
  }, [page]);

  const recentPosts = useMemo(
    () => blogPosts.slice(0, 8).map(({ slug, title }) => ({ slug, title })),
    [],
  );

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <div className="w-full px-6 py-10 sm:px-8 lg:px-12 lg:py-12 xl:px-16 2xl:px-20">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 bg-gradient-to-r from-[#0b2d60]/[0.03] to-transparent px-6 py-4 sm:px-8 lg:px-10">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
                Recursos
              </p>
              <h1 className="text-lg font-black uppercase tracking-[0.04em] text-[#0b2d60] sm:text-xl">
                Blog Zeus Safety
              </h1>
              <p className="mt-1.5 text-sm text-slate-500">
                <span className="font-semibold text-[#0b2d60]">{blogPosts.length}</span>{' '}
                artículos publicados
              </p>
            </div>

            <BlogLayoutSwitcher value={viewMode} onChange={setViewMode} />
          </div>

          <div className="grid gap-5 px-6 py-5 sm:gap-6 sm:px-8 sm:py-6 lg:grid-cols-[minmax(0,1fr)_260px] lg:gap-8 lg:px-10 xl:grid-cols-[minmax(0,1fr)_280px]">
            <div>
              <div className={blogViewGridClass(viewMode)}>
                {pagePosts.map((post, index) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <BlogCard
                      slug={post.slug}
                      title={post.title}
                      date={post.date}
                      excerpt={post.excerpt}
                      cover={post.cover}
                      layout="vertical"
                      compact={viewMode === 'grid-4'}
                    />
                  </motion.div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:mt-10">
                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="inline-flex h-10 items-center gap-1 rounded-full border border-slate-200 bg-white px-4 text-xs font-bold uppercase text-[#0b2d60] transition-colors hover:border-[#F5C400] disabled:opacity-40"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Anterior
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setPage(n)}
                      className={`inline-flex h-10 min-w-[40px] items-center justify-center rounded-full border text-xs font-bold transition-colors ${
                        page === n
                          ? 'border-[#0b2d60] bg-[#0b2d60] text-white'
                          : 'border-slate-200 bg-white text-[#0b2d60] hover:border-[#F5C400]'
                      }`}
                    >
                      {n}
                    </button>
                  ))}

                  <button
                    type="button"
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="inline-flex h-10 items-center gap-1 rounded-full border border-slate-200 bg-white px-4 text-xs font-bold uppercase text-[#0b2d60] transition-colors hover:border-[#F5C400] disabled:opacity-40"
                  >
                    Siguiente
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="lg:sticky lg:top-28 lg:self-start">
              <BlogRecentSidebar posts={recentPosts} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
