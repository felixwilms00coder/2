"use client";

import { useEffect, useState } from "react";
import { Bot, TriangleAlert } from "lucide-react";

type State =
  | { status: "loading"; query: string }
  | { status: "done"; query: string; answer: string }
  | { status: "error"; query: string; message: string };

export function AiAnswer({ query }: { query: string }) {
  const trimmed = query.trim();
  const [state, setState] = useState<State>({ status: "loading", query: trimmed });

  useEffect(() => {
    if (!trimmed) return;
    let cancelled = false;

    fetch("/api/ai-answer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: trimmed }),
    })
      .then(async (res) => {
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (!res.ok || typeof data.answer !== "string") {
          setState({
            status: "error",
            query: trimmed,
            message:
              data.error ?? "Er ging iets mis bij het ophalen van een antwoord.",
          });
          return;
        }
        setState({ status: "done", query: trimmed, answer: data.answer });
      })
      .catch(() => {
        if (!cancelled) {
          setState({
            status: "error",
            query: trimmed,
            message: "Kon geen verbinding maken met het model.",
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, [trimmed]);

  if (!trimmed) return null;

  // Zolang het antwoord in `state` nog bij een oudere zoekvraag hoort
  // (query gewijzigd terwijl de vorige fetch nog liep, of net gemount),
  // tonen we de laadstand in plaats van een verouderd antwoord.
  const isLoading = state.query !== trimmed || state.status === "loading";

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-6">
      <div className="flex items-center gap-2">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent">
          <Bot className="h-4 w-4" aria-hidden="true" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-wide text-accent-strong">
          AI-antwoord (experimenteel)
        </span>
      </div>

      {isLoading && (
        <p className="text-sm text-muted" role="status">
          Het model denkt na…
        </p>
      )}

      {!isLoading && state.status === "error" && (
        <p className="flex items-start gap-2 text-sm text-muted" role="status">
          <TriangleAlert
            className="mt-0.5 h-4 w-4 shrink-0 text-warning"
            aria-hidden="true"
          />
          {state.message}
        </p>
      )}

      {!isLoading && state.status === "done" && (
        <>
          <p className="whitespace-pre-line leading-relaxed text-foreground/90">
            {state.answer}
          </p>
          <p className="text-xs text-muted">
            Gegenereerd door een open-source taalmodel — geen persoonlijk
            financieel of bindend juridisch advies. Verifieer cijfers en
            juridische stappen altijd bij een officiële bron, notaris of
            advocaat.
          </p>
        </>
      )}
    </div>
  );
}
