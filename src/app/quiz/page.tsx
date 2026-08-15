import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import { quizzes } from "@/lib/content/quizzes";
import { Container, PageHero } from "@/components/ui";

export const metadata: Metadata = pageMetadata({
  title: "Quiz",
  description:
    "Test je financiële kennis als starter met een korte, interactieve quiz over loon, sparen, lenen en verzekeren.",
  path: "/quiz",
});

export default function QuizOverviewPage() {
  return (
    <>
      <PageHero
        eyebrow="Quiz"
        title="Test je financiële kennis"
        description="Korte quizzen met meteen uitleg bij elk antwoord, zodat je ook bijleert terwijl je test."
      />
      <Container className="py-14">
        <h2 className="sr-only">Alle quizzen</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {quizzes.map((quiz) => (
            <Link
              key={quiz.slug}
              href={`/quiz/${quiz.slug}`}
              className="ease-smooth group flex flex-col gap-2 rounded-[1.75rem] border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-[0_22px_44px_-20px_rgba(15,122,95,0.28)]"
            >
              <h3 className="text-lg font-semibold text-foreground transition-colors group-hover:text-accent">
                {quiz.title}
              </h3>
              <p className="text-sm text-muted">{quiz.description}</p>
              <p className="mt-2 text-xs font-medium text-muted">
                {quiz.questions.length} vragen
              </p>
            </Link>
          ))}
        </div>
      </Container>
    </>
  );
}
