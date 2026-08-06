import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight, Lightbulb, TriangleAlert } from "lucide-react";

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

/* ---- Buttons --------------------------------------------------------- */

type ButtonVariant = "accent" | "solid" | "outline" | "ghost";

const buttonBase =
  "ease-smooth inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-200 active:scale-[0.97]";

const buttonVariants: Record<ButtonVariant, string> = {
  accent: "bg-accent text-accent-contrast hover:bg-accent-strong",
  solid:
    "border border-border bg-primary text-foreground hover:bg-primary-light",
  outline:
    "border border-border bg-surface text-foreground hover:border-foreground/30 hover:bg-surface-muted",
  ghost: "text-foreground hover:bg-surface-muted",
};

export function ButtonLink({
  href,
  variant = "accent",
  className = "",
  children,
}: {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`${buttonBase} ${buttonVariants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}

/* ---- Hero ------------------------------------------------------------ */

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <div className="relative overflow-hidden border-b border-border bg-surface-muted">
      <div
        aria-hidden="true"
        className="bg-dot-grid pointer-events-none absolute inset-0 text-accent/[0.06]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-accent/15 blur-[110px]"
      />
      <Container className="relative py-14 sm:py-16">
        <span className="inline-flex items-center rounded-full border border-accent/25 bg-accent-soft px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-accent">
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-2xl font-display text-4xl font-extrabold tracking-[-0.02em] text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-muted sm:text-lg">
          {description}
        </p>
        {children}
      </Container>
    </div>
  );
}

/* ---- Cards ----------------------------------------------------------- */

export function EntityCard({
  href,
  title,
  description,
  meta,
}: {
  href: string;
  title: string;
  description: string;
  meta?: string;
}) {
  return (
    <Link
      href={href}
      className="ease-smooth group relative flex flex-col gap-3 rounded-[1.75rem] border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-[0_22px_44px_-20px_rgba(13,148,136,0.28)]"
    >
      <div>
        <h3 className="font-display font-bold text-foreground transition-colors group-hover:text-accent">
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {description}
        </p>
      </div>
      <span className="mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-semibold text-accent">
        {meta ?? "Bekijken"}
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          aria-hidden="true"
        />
      </span>
    </Link>
  );
}

/* ---- Callout --------------------------------------------------------- */

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
  const Icon = isTip ? Lightbulb : TriangleAlert;
  return (
    <div
      className={`my-6 flex gap-3.5 rounded-2xl border-l-4 p-4 ${
        isTip ? "border-l-accent bg-accent-soft" : "border-l-warning bg-warning-light"
      }`}
    >
      <Icon
        className={`mt-0.5 h-5 w-5 shrink-0 ${isTip ? "text-accent" : "text-warning"}`}
        aria-hidden="true"
      />
      <div>
        <p className={`text-sm font-bold ${isTip ? "text-accent" : "text-warning"}`}>
          {title}
        </p>
        <div className="mt-1 text-sm leading-relaxed text-foreground/90">
          {children}
        </div>
      </div>
    </div>
  );
}

/* ---- Section heading -------------------------------------------------- */

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
        <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-accent">
          <span aria-hidden="true" className="h-px w-6 bg-accent" />
          {kicker}
        </p>
      )}
      <h2 className="mt-2.5 font-display text-3xl font-extrabold tracking-[-0.02em] text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-muted">{description}</p>
      )}
    </div>
  );
}
