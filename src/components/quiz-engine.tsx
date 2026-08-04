"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, Flame, RotateCcw, X } from "lucide-react";
import { Quiz } from "@/lib/content/types";
import { ButtonLink } from "@/components/ui";
import { useProgress } from "@/components/progress-provider";

export function QuizEngine({ quiz }: { quiz: Quiz }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);
  const { recordQuiz } = useProgress();

  const total = quiz.questions.length;
  const question = quiz.questions[currentIndex];
  const isLast = currentIndex === total - 1;
  const finished = answers.length === total;
  const score = useMemo(() => answers.filter(Boolean).length, [answers]);

  // Current run of consecutive correct answers.
  const streak = useMemo(() => {
    let n = 0;
    for (let i = answers.length - 1; i >= 0; i--) {
      if (!answers[i]) break;
      n++;
    }
    return n;
  }, [answers]);

  function selectOption(optionIndex: number) {
    if (selectedOption !== null) return;
    setSelectedOption(optionIndex);
    setAnswers((prev) => [...prev, question.options[optionIndex].correct]);
  }

  function next() {
    if (isLast) {
      recordQuiz(quiz.slug, score);
      return;
    }
    setSelectedOption(null);
    setCurrentIndex((i) => i + 1);
  }

  function restart() {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers([]);
  }

  if (finished) {
    const percentage = Math.round((score / total) * 100);
    return (
      <div
        className="rounded-3xl border border-border bg-surface p-8 text-center"
        role="status"
      >
        <p className="text-sm font-bold uppercase tracking-[0.14em] text-accent">
          Resultaat
        </p>

        <div className="mx-auto mt-5 flex h-32 w-32 items-center justify-center rounded-full bg-accent-soft">
          <span className="font-display text-3xl font-extrabold text-accent">
            {score}
            <span className="text-xl text-accent/60">/{total}</span>
          </span>
        </div>

        <p className="mt-5 text-lg font-semibold text-foreground">
          Je scoorde {percentage}%
        </p>
        <p className="mx-auto mt-2 max-w-sm text-muted">
          {percentage >= 80
            ? "Sterk gedaan — je kent de basis goed."
            : percentage >= 50
              ? "Niet slecht, maar er valt zeker nog wat bij te leren."
              : "Geen zorgen: hier is precies waarom we deze leerstof schreven."}
        </p>

        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={restart}
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Opnieuw proberen
          </button>
          <ButtonLink href="/leerstof" variant="outline">
            Bekijk de leerstof
          </ButtonLink>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-3xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-foreground">
          Vraag {currentIndex + 1} van {total}
        </span>
        <span className="flex items-center gap-2 text-muted">
          {streak >= 2 && (
            <span className="inline-flex items-center gap-1 rounded-full bg-accent-soft px-2 py-0.5 text-xs font-bold text-accent">
              <Flame className="h-3.5 w-3.5" aria-hidden="true" />
              {streak} op rij
            </span>
          )}
          {score} correct
        </span>
      </div>

      <div
        className="mt-2.5 h-2 w-full overflow-hidden rounded-full bg-surface-muted"
        role="progressbar"
        aria-valuenow={currentIndex}
        aria-valuemin={0}
        aria-valuemax={total}
        aria-label={`Voortgang: vraag ${currentIndex + 1} van ${total}`}
      >
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${(currentIndex / total) * 100}%` }}
        />
      </div>

      <h2 className="mt-7 font-display text-lg font-bold text-foreground sm:text-xl">
        {question.question}
      </h2>

      <div className="mt-5 space-y-3">
        {question.options.map((option, i) => {
          const isSelected = selectedOption === i;
          const showResult = selectedOption !== null;

          let state = "border-border bg-surface hover:border-accent hover:bg-accent-soft";
          if (showResult && option.correct) {
            state = "border-accent border-2 bg-accent-soft";
          } else if (showResult && isSelected && !option.correct) {
            state = "border-warning border-2 border-dashed bg-warning-light";
          } else if (showResult) {
            state = "border-border bg-surface opacity-60";
          }

          return (
            <button
              key={i}
              onClick={() => selectOption(i)}
              disabled={showResult}
              className={`flex min-h-12 w-full items-center justify-between gap-3 rounded-2xl border p-4 text-left text-sm font-medium text-foreground transition-all ${state} ${
                showResult ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <span>{option.text}</span>
              {showResult && option.correct && (
                <span className="flex shrink-0 items-center gap-1.5 text-xs font-bold text-accent">
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Correct
                </span>
              )}
              {showResult && isSelected && !option.correct && (
                <span className="flex shrink-0 items-center gap-1.5 text-xs font-bold text-warning">
                  <X className="h-4 w-4" aria-hidden="true" />
                  Fout
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div aria-live="polite">
        {selectedOption !== null && (
          <div className="mt-5 rounded-2xl border-l-4 border-l-accent bg-surface-muted p-4">
            <p className="text-sm font-bold text-foreground">
              {question.options[selectedOption].correct
                ? "Juist!"
                : "Niet helemaal."}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">
              {question.explanation}
            </p>
            <button
              onClick={next}
              className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong"
            >
              {isLast ? "Bekijk resultaat" : "Volgende vraag"}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
