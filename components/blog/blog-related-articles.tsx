'use client';

import { motion } from 'framer-motion';
import { BlogCard } from '@/components/blog/blog-card';
import type { BlogPost } from '@/lib/blog-data';

type BlogRelatedArticlesProps = {
  posts: Pick<BlogPost, 'slug' | 'title' | 'date' | 'excerpt' | 'cover'>[];
};

const headerVariants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const gridVariants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function BlogRelatedArticles({ posts }: BlogRelatedArticlesProps) {
  if (posts.length === 0) return null;

  return (
    <section className="border-t border-slate-200 bg-[#f3f5f8] px-3 py-10 sm:px-4 lg:px-6 lg:py-12">
      <div className="mx-auto max-w-[1500px]">
        <motion.div
          className="mb-6 sm:mb-8"
          variants={headerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
            Sigue leyendo
          </p>
          <h2 className="mt-1 text-xl font-black uppercase tracking-[0.04em] text-[#0b2d60] sm:text-2xl">
            Artículos relacionados
          </h2>
          <div className="mt-2 h-1.5 w-16 bg-[#F5C400]" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5"
          variants={gridVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
        >
          {posts.map((item) => (
            <motion.div key={item.slug} variants={cardVariants} className="h-full">
              <BlogCard
                slug={item.slug}
                title={item.title}
                date={item.date}
                excerpt={item.excerpt}
                cover={item.cover}
                layout="vertical"
                compact
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
