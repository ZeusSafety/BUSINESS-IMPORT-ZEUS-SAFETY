import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  blogPosts,
  getBlogBySlug,
  getRecommendedPosts,
} from '@/lib/blog-data';
import { BlogRelatedArticles } from '@/components/blog/blog-related-articles';
import {
  BlogDetailEntrance,
  BlogDetailSection,
} from '@/components/blog/blog-detail-entrance';
import { BlogPostHero } from '@/components/blog/blog-post-hero';
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

  const recommended = getRecommendedPosts(post.slug, 4);

  return (
    <div className="min-h-screen bg-[#f3f5f8]">
      <BlogDetailEntrance>
        <article className="w-full px-3 py-8 sm:px-4 lg:px-6 lg:py-10">
          <div className="mx-auto max-w-[1500px]">
            <BlogDetailSection>
              <Link
                href="/blog"
                className="mb-6 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-[#0b2d60] transition-colors hover:text-[#F5C400]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Volver al blog
              </Link>
            </BlogDetailSection>

            <BlogDetailSection>
              <div className="border border-slate-200 bg-white p-4 shadow-sm sm:p-5 lg:p-6">
                <BlogPostHero
                  title={post.title}
                  date={post.date}
                  excerpt={post.excerpt}
                  cover={post.cover}
                  images={post.images}
                  sections={post.sections}
                />

                <div className="mt-10 border border-slate-200 bg-[#0b2d60] px-5 py-6 text-center sm:px-8">
                  <p className="text-sm font-bold text-white sm:text-base">
                    ¿Necesitas el EPP correcto para tu operación?
                  </p>
                  <p className="mt-1 text-xs text-white/70 sm:text-sm">
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
            </BlogDetailSection>
          </div>
        </article>

        {recommended.length > 0 && <BlogRelatedArticles posts={recommended} />}
      </BlogDetailEntrance>
    </div>
  );
}
