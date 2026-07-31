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
    <div className="bg-primary text-white">
      <Container className="py-14 sm:py-16">
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
