import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { quizzes, getQuiz } from "@/lib/content/quizzes";
import { Container, PageHero } from "@/components/ui";
import { QuizEngine } from "@/components/quiz-engine";
import { pageMetadata } from "@/lib/metadata";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BreadcrumbJsonLd } from "@/components/json-ld";

export function generateStaticParams() {
  return quizzes.map((q) => ({ slug: q.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const quiz = getQuiz(slug);
  if (!quiz) return {};
  return pageMetadata({
    title: quiz.title,
    description: quiz.description,
    path: `/quiz/${quiz.slug}`,
  });
}

export default async function QuizPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const quiz = getQuiz(slug);
  if (!quiz) notFound();

  const href = `/quiz/${quiz.slug}`;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Quiz", href: "/quiz" },
          { name: quiz.title, href },
        ]}
      />
      <PageHero eyebrow="Quiz" title={quiz.title} description={quiz.description}>
        <div className="mt-6">
          <Breadcrumbs
            items={[
              { name: "Quiz", href: "/quiz" },
              { name: quiz.title },
            ]}
          />
        </div>
      </PageHero>
      <Container className="py-14">
        <div className="mx-auto max-w-xl">
          <QuizEngine quiz={quiz} />
        </div>
      </Container>
    </>
  );
}
