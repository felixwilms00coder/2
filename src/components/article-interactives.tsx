"use client";

import { useState } from "react";
import { Check, Eye, X } from "lucide-react";

/** Inline multiple-choice check, placed between paragraphs. */
export function InlineCheck({
  question,
  options,
  explanation,
}: {
  question: string;
  options: { text: string; correct: boolean }[];
  explanation: string;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const answered = picked !== null;

  return (
    <div className="my-8 rounded-2xl border-2 border-accent/25 bg-accent-soft/50 p-5">
      <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-accent">
        <span
          aria-hidden="true"
          className="flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] text-accent-contrast"
        >
          ?
        </span>
        Check je begrip
      </p>
      <p className="mt-3 font-display font-bold text-foreground">{question}</p>

      <div className="mt-4 grid gap-2">
        {options.map((option, i) => {
          const isPicked = picked === i;
          let state =
            "border-border bg-surface hover:border-accent hover:bg-accent-soft";
          if (answered && option.correct) {
            state = "border-accent border-2 bg-surface";
          } else if (answered && isPicked) {
            state = "border-warning border-2 border-dashed bg-warning-light";
          } else if (answered) {
            state = "border-border bg-surface opacity-55";
          }
          return (
            <button
              key={i}
              type="button"
              onClick={() => !answered && setPicked(i)}
              disabled={answered}
              className={`flex min-h-12 items-center justify-between gap-3 rounded-xl border px-4 py-2.5 text-left text-sm font-medium text-foreground transition-all ${state} ${
                answered ? "cursor-default" : "cursor-pointer"
              }`}
            >
              <span>{option.text}</span>
              {answered && option.correct && (
                <Check
                  className="h-4 w-4 shrink-0 text-accent"
                  aria-hidden="true"
                />
              )}
              {answered && isPicked && !option.correct && (
                <X
                  className="h-4 w-4 shrink-0 text-warning"
                  aria-hidden="true"
                />
              )}
            </button>
          );
        })}
      </div>

      <div aria-live="polite">
        {answered && (
          <p className="mt-4 rounded-xl bg-surface p-3.5 text-sm leading-relaxed text-foreground/90">
            <span className="font-bold">
              {options[picked].correct ? "Juist. " : "Bijna. "}
            </span>
            {explanation}
          </p>
        )}
      </div>
    </div>
  );
}

/** Ask the reader to think, then reveal the answer. */
export function RevealCard({
  prompt,
  answer,
}: {
  prompt: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="my-8 rounded-2xl border border-dashed border-accent/40 bg-surface p-5">
      <p className="font-display font-bold text-foreground">{prompt}</p>
      {open ? (
        <p className="mt-3 text-sm leading-relaxed text-foreground/90">
          {answer}
        </p>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-4 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-strong"
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
          Toon het antwoord
        </button>
      )}
    </div>
  );
}

/** A single number worth remembering, pulled out of the prose. */
export function KeyFigure({
  value,
  label,
  source,
}: {
  value: string;
  label: string;
  source?: string;
}) {
  return (
    <div className="my-8 flex items-center gap-5 rounded-2xl bg-primary p-5 text-white">
      <span className="font-display text-4xl font-extrabold text-accent-bright">
        {value}
      </span>
      <span>
        <span className="block text-sm font-semibold">{label}</span>
        {source && (
          <span className="mt-0.5 block text-xs text-white/55">{source}</span>
        )}
      </span>
    </div>
  );
}
