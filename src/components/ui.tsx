import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight, Lightbulb, TriangleAlert } from "lucide-react";
import { CategoryIcon } from "./icon";
import type { CategoryColor } from "@/lib/content/types";

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
  "ease-smooth inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-semibold transition-all duration-200 active:scale-[0.97]";

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
        <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.1em] text-accent-bright backdrop-blur-sm">
          {eyebrow}
        </span>
        <h1 className="mt-4 max-w-2xl font-serif text-4xl font-semibold tracking-[-0.02em] sm:text-5xl lg:text-6xl">
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

/** Klasse-bundels per thema-kleur. Bewust als statische literals (niet
 * samengesteld via template strings), zodat Tailwind ze bij build kan
 * herkennen — dynamisch opgebouwde klassenamen worden niet meegecompileerd. */
const tileColorStyles: Record<CategoryColor, string> = {
  blue: "bg-cat-blue-soft text-cat-blue group-hover:bg-cat-blue group-hover:text-white",
  rose: "bg-cat-rose-soft text-cat-rose group-hover:bg-cat-rose group-hover:text-white",
  green:
    "bg-accent-soft text-accent group-hover:bg-accent group-hover:text-accent-contrast",
  amber:
    "bg-cat-amber-soft text-cat-amber group-hover:bg-cat-amber group-hover:text-white",
  violet:
    "bg-cat-violet-soft text-cat-violet group-hover:bg-cat-violet group-hover:text-white",
  orange:
    "bg-cat-orange-soft text-cat-orange group-hover:bg-cat-orange group-hover:text-white",
  cyan: "bg-cat-cyan-soft text-cat-cyan group-hover:bg-cat-cyan group-hover:text-white",
};

const cardColorStyles: Record<CategoryColor, string> = {
  blue: "hover:border-cat-blue/30 hover:shadow-[0_22px_44px_-20px_rgba(29,78,216,0.32)]",
  rose: "hover:border-cat-rose/30 hover:shadow-[0_22px_44px_-20px_rgba(190,18,60,0.28)]",
  green:
    "hover:border-accent/30 hover:shadow-[0_22px_44px_-20px_rgba(15,122,95,0.28)]",
  amber:
    "hover:border-cat-amber/30 hover:shadow-[0_22px_44px_-20px_rgba(146,64,14,0.28)]",
  violet:
    "hover:border-cat-violet/30 hover:shadow-[0_22px_44px_-20px_rgba(109,40,217,0.28)]",
  orange:
    "hover:border-cat-orange/30 hover:shadow-[0_22px_44px_-20px_rgba(154,52,18,0.28)]",
  cyan: "hover:border-cat-cyan/30 hover:shadow-[0_22px_44px_-20px_rgba(14,116,144,0.28)]",
};

const titleColorStyles: Record<CategoryColor, string> = {
  blue: "group-hover:text-cat-blue",
  rose: "group-hover:text-cat-rose",
  green: "group-hover:text-accent",
  amber: "group-hover:text-cat-amber",
  violet: "group-hover:text-cat-violet",
  orange: "group-hover:text-cat-orange",
  cyan: "group-hover:text-cat-cyan",
};

const metaColorStyles: Record<CategoryColor, string> = {
  blue: "text-cat-blue",
  rose: "text-cat-rose",
  green: "text-accent",
  amber: "text-cat-amber",
  violet: "text-cat-violet",
  orange: "text-cat-orange",
  cyan: "text-cat-cyan",
};

export function IconTile({
  icon,
  color = "green",
  className = "",
}: {
  icon: string;
  color?: CategoryColor;
  className?: string;
}) {
  return (
    <span
      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-colors ${tileColorStyles[color]} ${className}`}
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
  color = "green",
}: {
  href: string;
  icon: string;
  title: string;
  description: string;
  meta?: string;
  color?: CategoryColor;
}) {
  return (
    <Link
      href={href}
      className={`ease-smooth group relative flex flex-col gap-3 rounded-[1.75rem] border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1.5 ${cardColorStyles[color]}`}
    >
      <IconTile icon={icon} color={color} />
      <div>
        <h3
          className={`font-display font-bold text-foreground transition-colors ${titleColorStyles[color]}`}
        >
          {title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {description}
        </p>
      </div>
      <span
        className={`mt-auto inline-flex items-center gap-1.5 pt-1 text-sm font-semibold ${metaColorStyles[color]}`}
      >
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
  color = "green",
}: {
  href: string;
  kind: string;
  title: string;
  description: string;
  readMinutes?: number;
  color?: CategoryColor;
}) {
  return (
    <Link
      href={href}
      className={`ease-smooth group flex flex-col gap-2.5 rounded-[1.75rem] border border-border bg-surface p-5 transition-all duration-300 hover:-translate-y-1.5 ${cardColorStyles[color]}`}
    >
      <div className="flex items-center gap-2">
        <KindBadge kind={kind} />
        {readMinutes !== undefined && (
          <span className="text-xs font-medium text-muted">
            {readMinutes} min lezen
          </span>
        )}
      </div>
      <h3
        className={`font-display font-bold text-foreground transition-colors ${titleColorStyles[color]}`}
      >
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
      <h2 className="mt-2.5 font-serif text-3xl font-semibold tracking-[-0.02em] text-foreground sm:text-4xl">
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
