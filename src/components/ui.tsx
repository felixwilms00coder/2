import Link from "next/link";
import { ReactNode } from "react";
import { CategoryIcon } from "./icon";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="relative overflow-hidden bg-primary text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/hero-skyline.svg')] bg-cover bg-bottom bg-no-repeat opacity-45"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(10,10,10,0.95)_0%,rgba(10,10,10,0.8)_55%,rgba(10,10,10,0.35)_100%)]"
      />
      <Container className="relative py-14 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-accent">
          {eyebrow}
        </p>
        <h1 className="mt-3 font-display text-3xl sm:text-4xl font-bold max-w-2xl">
          {title}
        </h1>
        <p className="mt-4 text-base sm:text-lg text-white/80 max-w-2xl">
          {description}
        </p>
      </Container>
    </div>
  );
}

export function IconTile({ icon }: { icon: string }) {
  return (
    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-light/10 text-primary">
      <CategoryIcon name={icon} className="h-5 w-5" />
    </span>
  );
}

export function EntityCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <IconTile icon={icon} />
      <div>
        <h3 className="font-semibold text-foreground group-hover:text-primary-light transition-colors">
          {title}
        </h3>
        <p className="mt-1 text-sm text-muted">{description}</p>
      </div>
    </Link>
  );
}

const kindLabels: Record<string, string> = {
  artikel: "Artikel",
  tips: "Tips",
  checklist: "Checklist",
  tool: "Tool",
  quiz: "Quiz",
};

export function KindBadge({
  kind,
  inverse = false,
}: {
  kind: string;
  inverse?: boolean;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide ${
        inverse
          ? "border-white/30 text-white/80"
          : "border-border text-muted"
      }`}
    >
      {kindLabels[kind] ?? kind}
    </span>
  );
}

export function ContentCard({
  href,
  kind,
  title,
  description,
}: {
  href: string;
  kind: string;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-2 rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-0.5 hover:shadow-md"
    >
      <KindBadge kind={kind} />
      <h3 className="font-semibold text-foreground group-hover:text-primary-light transition-colors">
        {title}
      </h3>
      <p className="text-sm text-muted">{description}</p>
    </Link>
  );
}

export function Callout({
  tone,
  title,
  children,
}: {
  tone: "tip" | "warning";
  title: string;
  children: ReactNode;
}) {
  const isTip = tone === "tip";
  return (
    <div
      className={`rounded-xl border p-4 my-5 ${
        isTip
          ? "border-foreground/20 bg-positive-light"
          : "border-dashed border-foreground/40 bg-warning-light"
      }`}
    >
      <p
        className={`text-sm font-semibold ${
          isTip ? "text-positive" : "text-warning"
        }`}
      >
        {isTip ? "💡 " : "⚠️ "}
        {title}
      </p>
      <div className="mt-1 text-sm text-foreground/90">{children}</div>
    </div>
  );
}

export function SectionHeading({
  kicker,
  title,
  description,
}: {
  kicker?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      {kicker && (
        <p className="text-sm font-semibold uppercase tracking-wide text-primary-light">
          {kicker}
        </p>
      )}
      <h2 className="mt-2 font-display text-2xl sm:text-3xl font-bold text-foreground">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-muted text-base">{description}</p>
      )}
    </div>
  );
}
