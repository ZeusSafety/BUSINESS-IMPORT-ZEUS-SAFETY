'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { BlogCard } from '@/components/blog/blog-card';
import { blogPosts } from '@/lib/blog-data';

const PER_PAGE = 8;

export default function BlogPage() {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(blogPosts.length / PER_PAGE));

  const pagePosts = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return blogPosts.slice(start, start + PER_PAGE);
  }, [page]);

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      {/* Hero */}
      <section className="relative flex h-[240px] items-center justify-center overflow-hidden sm:h-[300px] lg:h-[340px]">
        <Image
          src="/blog-hero.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[center_30%]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0b2d60]/72" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.28em] text-[#F5C400]">
            Recursos
          </p>
          <h1 className="text-4xl font-black uppercase tracking-wide text-white sm:text-5xl">
            Blog <span className="text-[#F5C400]">Zeus Safety</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-white/85 sm:text-base">
            Guías prácticas de EPP, cultura de seguridad y criterios técnicos
            para operaciones industriales en Perú.
          </p>
        </div>
      </section>

      <div className="w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-12 xl:px-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2 className="text-2xl font-black text-[#0b2d60] sm:text-3xl">
              Artículos recientes
            </h2>
            <div className="mt-2 h-1.5 w-16 bg-[#F5C400]" />
          </div>
          <p className="text-sm text-slate-500">
            {blogPosts.length} artículos publicados
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:gap-6">
          {pagePosts.map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              title={post.title}
              date={post.date}
              excerpt={post.excerpt}
              cover={post.cover}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="inline-flex h-10 items-center gap-1 border border-slate-200 bg-white px-3 text-xs font-bold uppercase text-[#0b2d60] disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={`inline-flex h-10 min-w-[40px] items-center justify-center border text-xs font-bold ${
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
              className="inline-flex h-10 items-center gap-1 border border-slate-200 bg-white px-3 text-xs font-bold uppercase text-[#0b2d60] disabled:opacity-40"
            >
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
