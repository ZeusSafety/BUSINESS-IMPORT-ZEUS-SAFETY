import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  blogPosts,
  formatBlogDate,
  getBlogBySlug,
  getRecommendedPosts,
} from '@/lib/blog-data';
import { BlogCard } from '@/components/blog/blog-card';
import { ArrowLeft } from 'lucide-react';

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) return { title: 'Blog | Zeus Safety' };
  return {
    title: `${post.title} | Zeus Safety`,
    description: post.excerpt,
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);
  if (!post) notFound();

  const recommended = getRecommendedPosts(post.slug, 3);

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <article className="w-full px-4 py-10 sm:px-6 lg:px-8 lg:py-12 xl:px-10">
        <div className="mx-auto max-w-[1100px]">
          <Link
            href="/blog"
            className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:text-[#F5C400]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver al blog
          </Link>

          <div className="border border-slate-200 bg-white p-5 shadow-sm sm:p-8 lg:p-10">
            <p className="text-sm text-slate-400">{formatBlogDate(post.date)}</p>
            <h2 className="mt-2 text-2xl font-black leading-tight text-[#0c1427] sm:text-3xl lg:text-4xl">
              {post.title}
            </h2>

            {/* Portada */}
            <div className="relative mt-6 flex min-h-[240px] items-center justify-center overflow-hidden border border-slate-200 bg-slate-100 sm:min-h-[340px] lg:min-h-[400px]">
              <Image
                src={post.cover}
                alt={post.title}
                fill
                priority
                className="object-contain p-2 sm:p-3"
                sizes="(max-width: 1100px) 100vw, 1100px"
              />
            </div>

            {/* Galería adicional — junta, no apilada suelta */}
            {post.images.length > 1 && (
              <div
                className={`mt-3 grid gap-2 ${
                  post.images.length === 2
                    ? 'grid-cols-1 sm:grid-cols-2'
                    : 'grid-cols-2 lg:grid-cols-3'
                }`}
              >
                {post.images.slice(1).map((src, index) => (
                  <div
                    key={src}
                    className="relative aspect-[4/3] overflow-hidden border border-slate-200 bg-slate-100"
                  >
                    <Image
                      src={src}
                      alt={`${post.title} — imagen ${index + 2}`}
                      fill
                      className="object-contain p-1.5"
                      sizes="(max-width: 640px) 50vw, 33vw"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="mt-8 space-y-8 text-[15px] leading-relaxed text-slate-700 sm:text-base">
              {post.sections.map((section, i) => (
                <section key={i}>
                  {section.heading && (
                    <h3 className="mb-3 text-xl font-bold text-[#0c1427] sm:text-2xl">
                      {section.heading}
                    </h3>
                  )}
                  {section.paragraphs?.map((p, j) => (
                    <p key={j} className="mb-3 last:mb-0">
                      {p}
                    </p>
                  ))}
                  {section.bullets && (
                    <div className="space-y-3">
                      {section.bullets.map((b) => (
                        <p key={b.title}>
                          <strong className="text-[#0b2d60]">{b.title}</strong>{' '}
                          {b.text}
                        </p>
                      ))}
                    </div>
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

            <div className="mt-10 border border-slate-200 bg-[#0b2d60] px-5 py-6 text-center sm:px-8">
              <p className="text-base font-bold text-white sm:text-lg">
                ¿Necesitas el EPP correcto para tu operación?
              </p>
              <p className="mt-1 text-sm text-white/70">
                Cotiza con Zeus Safety y recibe asesoría técnica.
              </p>
              <Link
                href="/cotizacion"
                className="mt-4 inline-flex h-11 items-center bg-[#F5C400] px-6 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:bg-[#ffd233]"
              >
                Arma tu cotización
              </Link>
            </div>
          </div>
        </div>
      </article>

      {recommended.length > 0 && (
        <section className="border-t border-slate-200 bg-white px-4 py-12 sm:px-6 lg:px-8 xl:px-10">
          <div className="mx-auto max-w-[1400px]">
            <h2 className="mb-6 text-xl font-black text-[#0c1427] sm:text-2xl">
              Blogs recomendados
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recommended.map((item) => (
                <BlogCard
                  key={item.slug}
                  slug={item.slug}
                  title={item.title}
                  date={item.date}
                  excerpt={item.excerpt}
                  cover={item.cover}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
