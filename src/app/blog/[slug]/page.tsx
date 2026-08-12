import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Bot } from "lucide-react";
import { notFound } from "next/navigation";
import { blogPosts, getBlogPost } from "@/lib/content/blog";
import { getCategory } from "@/lib/content/categories";
import { Container } from "@/components/ui";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ArticleBody } from "@/components/article-body";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const href = `/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: href },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url: href,
    },
  };
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("nl-BE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const category = getCategory(post.categorySlug);
  const href = `/blog/${post.slug}`;

  return (
    <div className="bg-surface">
      <BreadcrumbJsonLd
        items={[
          { name: "Blog", href: "/blog" },
          { name: post.title, href },
        ]}
      />
      <div className="relative overflow-hidden border-b border-border bg-surface-muted">
        <div
          aria-hidden="true"
          className="bg-dot-grid pointer-events-none absolute inset-0 text-accent/[0.06]"
        />
        <Container className="relative py-12">
          <Breadcrumbs
            items={[
              { name: "Blog", href: "/blog" },
              ...(category
                ? [{ name: category.title, href: `/leerstof/${category.slug}` }]
                : []),
              { name: post.title },
            ]}
          />
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em] text-accent">
              <Bot className="h-3.5 w-3.5" aria-hidden="true" />
              AI-gegenereerd
            </span>
            <span className="text-sm font-medium text-muted">
              {formatDate(post.publishedAt)} · {post.readMinutes} minuten lezen
            </span>
          </div>
          <h1 className="mt-3 max-w-2xl font-serif text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-5xl">
            {post.title}
          </h1>
          <p className="mt-3 max-w-2xl text-muted">{post.summary}</p>
        </Container>
      </div>
      <Container className="py-12">
        <div className="mx-auto max-w-2xl">
          <ArticleBody blocks={post.blocks} />
        </div>
        <div className="mx-auto mt-10 flex max-w-2xl flex-wrap items-center gap-4 border-t border-border pt-6">
          <Link
            href="/blog"
            className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Alle blogartikels
          </Link>
        </div>
      </Container>
    </div>
  );
}
