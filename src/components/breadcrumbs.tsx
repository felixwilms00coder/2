import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { name: string; href?: string };

export function Breadcrumbs({
  items,
  onDark = false,
}: {
  items: Crumb[];
  onDark?: boolean;
}) {
  return (
    <nav aria-label="Kruimelpad">
      <ol
        className={`flex flex-wrap items-center gap-x-1.5 gap-y-1 text-sm ${
          onDark ? "text-white/65" : "text-muted"
        }`}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.name}-${i}`} className="flex items-center gap-1.5">
              {i > 0 && (
                <ChevronRight
                  className="h-3.5 w-3.5 shrink-0 opacity-60"
                  aria-hidden="true"
                />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className={
                    onDark
                      ? "hover:text-white hover:underline"
                      : "hover:text-accent hover:underline"
                  }
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={onDark ? "text-white/90" : "text-foreground"}
                >
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
