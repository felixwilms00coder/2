"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Check, X } from "lucide-react";
import { Quiz } from "@/lib/content/types";

export function QuizEngine({ quiz }: { quiz: Quiz }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const question = quiz.questions[currentIndex];
  const isLast = currentIndex === quiz.questions.length - 1;
  const finished = answers.length === quiz.questions.length;

  const score = useMemo(
    () => answers.filter(Boolean).length,
    [answers],
  );

  function selectOption(optionIndex: number) {
    if (selectedOption !== null) return;
    setSelectedOption(optionIndex);
    setAnswers((prev) => [...prev, question.options[optionIndex].correct]);
  }

  function next() {
    setSelectedOption(null);
    setCurrentIndex((i) => i + 1);
  }

  function restart() {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers([]);
  }

  if (finished) {
    const percentage = Math.round((score / quiz.questions.length) * 100);
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-light">
          Resultaat
        </p>
        <p className="mt-3 font-display text-4xl font-bold text-foreground">
          {score} / {quiz.questions.length}
        </p>
        <p className="mt-2 text-muted">
          Je scoorde {percentage}%.{" "}
          {percentage >= 80
            ? "Sterk gedaan, je kent je basis financiële zaken goed!"
            : percentage >= 50
              ? "Niet slecht, maar er valt zeker nog wat bij te leren."
              : "Geen zorgen, dit is precies waarom we deze leerstof schreven."}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={restart}
            className="inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
          >
            Opnieuw proberen
          </button>
          <Link
            href="/leerstof"
            className="inline-flex items-center rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground hover:bg-surface-muted transition-colors"
          >
            Bekijk de leerstof
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex items-center justify-between text-sm text-muted">
        <span>
          Vraag {currentIndex + 1} van {quiz.questions.length}
        </span>
        <span>{score} correct tot nu toe</span>
      </div>
      <div className="mt-2 h-1.5 w-full rounded-full bg-surface-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-primary-light transition-all"
          style={{
            width: `${(currentIndex / quiz.questions.length) * 100}%`,
          }}
        />
      </div>

      <h2 className="mt-6 text-lg font-semibold text-foreground">
        {question.question}
      </h2>

      <div className="mt-5 space-y-3">
        {question.options.map((option, i) => {
          const isSelected = selectedOption === i;
          const showResult = selectedOption !== null;
          let stateClasses =
            "border-border bg-surface hover:bg-surface-muted";
          if (showResult && option.correct) {
            stateClasses = "border-2 border-foreground bg-positive-light";
          } else if (showResult && isSelected && !option.correct) {
            stateClasses =
              "border-2 border-dashed border-foreground/60 bg-warning-light";
          }
          return (
            <button
              key={i}
              onClick={() => selectOption(i)}
              disabled={selectedOption !== null}
              className={`flex w-full items-center justify-between gap-3 rounded-xl border p-4 text-left text-sm font-medium text-foreground transition-colors ${stateClasses} ${
                selectedOption === null ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <span>{option.text}</span>
              {showResult && option.correct && (
                <span className="flex shrink-0 items-center gap-1 text-xs font-semibold">
                  <Check className="h-4 w-4" aria-hidden="true" />
                  Correct
                </span>
              )}
              {showResult && isSelected && !option.correct && (
                <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-muted">
                  <X className="h-4 w-4" aria-hidden="true" />
                  Fout
                </span>
              )}
            </button>
          );
        })}
      </div>

      {selectedOption !== null && (
        <div className="mt-5 rounded-xl bg-surface-muted p-4">
          <p className="text-sm text-foreground/90">{question.explanation}</p>
          <button
            onClick={next}
            className="mt-4 inline-flex items-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
          >
            {isLast ? "Bekijk resultaat" : "Volgende vraag"}
          </button>
        </div>
      )}
    </div>
  );
}
