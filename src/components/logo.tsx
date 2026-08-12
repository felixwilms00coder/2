/**
 * FinEdu logo mark.
 *
 * The silhouette reads two ways on purpose: as a Flemish stepped gable
 * (trapgevel) — the architecture of the region the platform is written for —
 * and as an ascending bar chart, for financial growth and progress.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="FinEdu"
      fill="none"
    >
      <rect
        width="32"
        height="32"
        rx="9"
        fill="currentColor"
        stroke="var(--color-border)"
        strokeWidth="1"
      />
      <path
        d="M6 25.5V20h5.5v-5.5H17V9h5.5v16.5H6Z"
        fill="var(--logo-ink, #1c1a17)"
      />
      <path
        d="M22.5 9V6.5M22.5 6.5h3.5M22.5 6.5 26 3"
        stroke="var(--logo-ink, #1c1a17)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function Logo({
  className = "",
  markClassName = "h-8 w-8 text-primary",
  showMark = true,
  showWordmark = true,
}: {
  className?: string;
  markClassName?: string;
  showMark?: boolean;
  showWordmark?: boolean;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      {showMark && <LogoMark className={markClassName} />}
      {showWordmark && (
        <span className="font-display text-lg font-bold tracking-tight">
          Fin<span className="text-muted">Edu</span>
        </span>
      )}
    </span>
  );
}
