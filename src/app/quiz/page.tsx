import type { Metadata } from "next";
import Link from "next/link";
import { quizzes } from "@/lib/content/quizzes";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = {
  title: "Quiz",
  description:
    "Test je financiële kennis als starter met een korte, interactieve quiz over loon, sparen, lenen en verzekeren.",
};

export default function QuizOverviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Quiz"
        title="Test je financiële kennis"
        description="Korte quizzen met meteen uitleg bij elk antwoord, zodat je ook bijleert terwijl je test."
      />
      <Container className="py-14">
        <div className="grid gap-4 sm:grid-cols-2">
          {quizzes.map((quiz) => (
            <Link
              key={quiz.slug}
              href={`/quiz/${quiz.slug}`}
              className="group flex flex-col gap-2 rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold text-foreground group-hover:text-primary-light transition-colors">
                {quiz.title}
              </h3>
              <p className="text-sm text-muted">{quiz.description}</p>
              <p className="mt-2 text-xs font-medium text-primary-light">
                {quiz.questions.length} vragen
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
