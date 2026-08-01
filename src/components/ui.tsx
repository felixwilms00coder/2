import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight, Lightbulb, TriangleAlert } from "lucide-react";
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

/* ---- Buttons --------------------------------------------------------- */

type ButtonVariant = "accent" | "solid" | "outline" | "ghost" | "onDark";

const buttonBase =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors";

const buttonVariants: Record<ButtonVariant, string> = {
  accent:
    "bg-accent text-accent-contrast hover:bg-accent-strong",
  solid: "bg-primary text-white hover:bg-primary-light",
  outline:
    "border border-border bg-surface text-foreground hover:border-foreground/30 hover:bg-surface-muted",
  ghost: "text-foreground hover:bg-surface-muted",
  onDark: "border border-white/25 text-white hover:bg-white/10",
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
    <div className="on-dark relative overflow-hidden bg-primary text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[url('/hero-skyline.svg')] bg-cover bg-bottom bg-no-repeat opacity-45"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(14,13,11,0.96)_0%,rgba(14,13,11,0.82)_55%,rgba(14,13,11,0.35)_100%)]"
      />
      <Container className="relative py-14 sm:py-16">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-accent-bright">
          {eyebrow}
        </p>
        <h1 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
          {description}
        </p>
        {children}
      </Container>
    </div>
  );
}

/* ---- Badges ---------------------------------------------------------- */

const kindLabels: Record<string, string> = {
  artikel: "Artikel",
  tips: "Tips",
  checklist: "Checklist",
  tool: "Rekentool",
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
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold uppercase tracking-[0.08em] ${
        inverse
          ? "bg-white/15 text-white"
          : "bg-accent-soft text-accent"
      }`}
    >
      {kindLabels[kind] ?? kind}
    </span>
  );
}

/* ---- Cards ----------------------------------------------------------- */

export function IconTile({
  icon,
  className = "",
}: {
  icon: string;
  className?: string;
}) {
  return (
    <span
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-accent-contrast ${className}`}
    >
      <CategoryIcon name={icon} className="h-6 w-6" />
    </span>
  );
}

export function EntityCard({
  href,
  icon,
  title,
  description,
  meta,
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
  meta?: string;
}) {
  return (
    <Link
      href={href}
      className="group relative flex flex-col gap-3 rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_12px_30px_-12px_rgba(28,26,23,0.28)]"
    >
      <IconTile icon={icon} />
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

export function ContentCard({
  href,
  kind,
  title,
  description,
  readMinutes,
}: {
  href: string;
  kind: string;
  title: string;
  description: string;
  readMinutes?: number;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col gap-2.5 rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_12px_30px_-12px_rgba(28,26,23,0.28)]"
    >
      <div className="flex items-center gap-2">
        <KindBadge kind={kind} />
        {readMinutes !== undefined && (
          <span className="text-xs font-medium text-muted">
            {readMinutes} min lezen
          </span>
        )}
      </div>
      <h3 className="font-display font-bold text-foreground transition-colors group-hover:text-accent">
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-muted">{description}</p>
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
        isTip
          ? "border-l-accent bg-accent-soft"
          : "border-l-warning bg-warning-light"
      }`}
    >
      <Icon
        className={`mt-0.5 h-5 w-5 shrink-0 ${
          isTip ? "text-accent" : "text-warning"
        }`}
        aria-hidden="true"
      />
      <div>
        <p
          className={`text-sm font-bold ${
            isTip ? "text-accent" : "text-warning"
          }`}
        >
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
          <span
            aria-hidden="true"
            className="h-px w-6 bg-accent"
          />
          {kicker}
        </p>
      )}
      <h2 className="mt-2.5 font-display text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-3 text-base leading-relaxed text-muted">
          {description}
        </p>
      )}
    </div>
  );
}
