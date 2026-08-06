/**
 * Auto Broker mark: two nodes — your side (dark) and your broker (teal) —
 * joined by a single line. Reads as "your own direct connection", which is
 * the whole point of this tool: no server in between the two dots.
 */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="Auto Broker"
      fill="none"
    >
      <rect
        width="32"
        height="32"
        rx="8"
        fill="currentColor"
        stroke="var(--color-border)"
        strokeWidth="1"
      />
      <path
        d="M12.2 19.8 19.8 12.2"
        stroke="var(--logo-ink, #0f172a)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="10" cy="22" r="3.2" fill="var(--logo-ink, #0f172a)" />
      <circle cx="22" cy="10" r="3.2" fill="var(--color-accent, #0d9488)" />
    </svg>
  );
}

export function Logo({
  className = "",
  markClassName = "h-8 w-8 text-primary",
  showWordmark = true,
}: {
  className?: string;
  markClassName?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={`flex items-center gap-2.5 ${className}`}>
      <LogoMark className={markClassName} />
      {showWordmark && (
        <span className="font-display text-lg font-bold tracking-tight">
          Auto<span className="text-accent">Broker</span>
        </span>
      )}
    </span>
  );
}
