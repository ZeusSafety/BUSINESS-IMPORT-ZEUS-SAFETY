'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { formatBlogDate, type BlogPost } from '@/lib/blog-data';

type BlogPostHeroProps = {
  title: string;
  date: string;
  excerpt: string;
  cover: string;
  images: string[];
  sections: BlogPost['sections'];
};

function BlogSections({ sections }: { sections: BlogPost['sections'] }) {
  return (
    <div className="space-y-5 text-xs leading-relaxed text-slate-600 sm:text-[13px]">
      {sections.map((section, i) => (
        <section key={i}>
          {section.heading && (
            <h2 className="mb-2 text-sm font-bold text-[#0c1427] sm:text-[15px]">
              {section.heading}
            </h2>
          )}
          {section.paragraphs?.map((p, j) => (
            <p key={j} className="mb-2.5 last:mb-0">
              {p}
            </p>
          ))}
          {section.bullets && (
            <ul className="space-y-2">
              {section.bullets.map((b) => (
                <li key={b.title} className="flex items-start gap-2">
                  <span
                    aria-hidden
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#F5C400]"
                  />
                  <span>
                    <strong className="text-[#0b2d60]">{b.title}</strong> {b.text}
                  </span>
                </li>
              ))}
            </ul>
          )}
          {section.list && (
            <ul className="list-disc space-y-2 pl-5">
              {section.list.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
        </section>
      ))}
    </div>
  );
}

export function BlogPostHero({
  title,
  date,
  excerpt,
  cover,
  images,
  sections,
}: BlogPostHeroProps) {
  const gallery = images.length > 0 ? images : [cover];
  const [active, setActive] = useState(0);

  return (
    <div className="grid gap-6 lg:grid-cols-[auto_minmax(0,1fr)] lg:items-start lg:gap-8">
      <div className="w-full lg:w-auto">
        <div className="flex items-start gap-2.5 sm:gap-3">
          {gallery.length > 1 && (
            <div className="hidden w-[84px] shrink-0 flex-col gap-2.5 sm:flex lg:w-[92px]">
              {gallery.map((src, index) => {
                const selected = index === active;
                return (
                  <button
                    key={`${src}-${index}`}
                    type="button"
                    onClick={() => setActive(index)}
                    aria-label={`Ver imagen ${index + 1}`}
                    aria-pressed={selected}
                    className={`relative aspect-[3/4] w-full overflow-hidden border-2 bg-[#f8fafc] transition-all duration-200 ${
                      selected
                        ? 'border-[#0b2d60] ring-2 ring-[#F5C400]/40 scale-[1.02]'
                        : 'border-slate-200 hover:border-[#0b2d60]/40'
                    }`}
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="92px"
                    />
                  </button>
                );
              })}
            </div>
          )}

          <div className="relative mx-auto aspect-[3/4] w-full max-w-[360px] overflow-hidden border border-slate-200 bg-[#f8fafc] sm:max-w-[400px] lg:mx-0 lg:w-[440px] lg:max-w-none xl:w-[480px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={gallery[active]}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.28, ease: 'easeOut' }}
                className="absolute inset-0"
              >
                <Image
                  src={gallery[active]}
                  alt={title}
                  fill
                  priority={active === 0}
                  className="object-cover"
                  sizes="(max-width: 640px) 90vw, 480px"
                />
              </motion.div>
            </AnimatePresence>

            {gallery.length > 1 && (
              <>
                <div className="absolute bottom-3 right-3 z-10 rounded-sm bg-[#0b2d60]/85 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
                  {active + 1} / {gallery.length}
                </div>
                <div className="absolute bottom-3 left-3 z-10 hidden gap-1 sm:flex">
                  {gallery.map((_, index) => (
                    <span
                      key={index}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === active
                          ? 'w-5 bg-[#F5C400]'
                          : 'w-1.5 bg-white/60'
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {gallery.length > 1 && (
          <div className="mt-3 flex gap-2.5 overflow-x-auto pb-1 sm:hidden [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {gallery.map((src, index) => {
              const selected = index === active;
              return (
                <button
                  key={`mobile-${src}-${index}`}
                  type="button"
                  onClick={() => setActive(index)}
                  className={`relative h-[88px] w-[66px] shrink-0 overflow-hidden border-2 bg-[#f8fafc] transition-all duration-200 ${
                    selected
                      ? 'border-[#0b2d60] scale-105'
                      : 'border-slate-200'
                  }`}
                >
                  <Image
                    src={src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="66px"
                  />
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="flex min-h-0 flex-col lg:max-h-[calc(480px*4/3)] lg:border-l lg:border-slate-100 lg:pl-6 xl:pl-8">
        <div className="shrink-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#F5C400]">
            Blog Zeus Safety
          </p>
          <p className="mt-1 text-xs text-slate-400">{formatBlogDate(date)}</p>
          <h1 className="mt-2 text-lg font-black uppercase leading-tight tracking-[0.02em] text-[#0c1427] sm:text-xl">
            {title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            {excerpt}
          </p>
        </div>

        <div className="mt-5 min-h-0 flex-1 overflow-y-auto border-t border-slate-100 pt-5 pr-1 [scrollbar-width:thin] [scrollbar-color:#F5C400_#f1f5f9]">
          <BlogSections sections={sections} />
        </div>
      </div>
    </div>
  );
}
