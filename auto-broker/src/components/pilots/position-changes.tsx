import {
  CirclePlus,
  CircleMinus,
  TrendingUp,
  TrendingDown,
  Minus,
  type LucideIcon,
} from "lucide-react";
import { PositionChange, PositionChangeCategory } from "@/lib/pilots/types";

/**
 * What changed between two consecutive 13F filings, grouped by category.
 * Status is always icon + label, never color alone (a colorblind or
 * grayscale reader still gets the category from the icon and heading).
 */

const GROUPS: {
  category: PositionChangeCategory;
  heading: string;
  icon: LucideIcon;
  tone: "positive" | "danger" | "muted";
}[] = [
  { category: "new", heading: "New positions", icon: CirclePlus, tone: "positive" },
  { category: "increased", heading: "Increased positions", icon: TrendingUp, tone: "positive" },
  { category: "closed", heading: "Closed positions", icon: CircleMinus, tone: "danger" },
  { category: "decreased", heading: "Decreased positions", icon: TrendingDown, tone: "danger" },
  { category: "unchanged", heading: "Unchanged positions", icon: Minus, tone: "muted" },
];

const toneClasses: Record<string, string> = {
  positive: "text-accent",
  danger: "text-danger",
  muted: "text-muted",
};

function formatPct(n: number): string {
  return `${n.toFixed(1)}%`;
}

export function PositionChanges({ changes }: { changes: PositionChange[] }) {
  if (changes.length === 0) {
    return (
      <p className="text-sm text-muted">
        No prior filing to compare against yet.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {GROUPS.map((group) => {
        const items = changes.filter((c) => c.category === group.category);
        if (items.length === 0) return null;
        const Icon = group.icon;
        return (
          <div key={group.category}>
            <h3 className="flex items-center gap-2 text-sm font-bold text-foreground">
              <Icon
                className={`h-4 w-4 shrink-0 ${toneClasses[group.tone]}`}
                aria-hidden="true"
              />
              {group.heading}
              <span className="font-normal text-muted">({items.length})</span>
            </h3>
            <ul className="mt-2 divide-y divide-border rounded-2xl border border-border">
              {items.map((c) => (
                <li
                  key={c.cusip}
                  className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm"
                >
                  <span className="font-medium text-foreground">{c.issuer}</span>
                  <span className="whitespace-nowrap tabular-nums text-muted">
                    {group.category === "new" && formatPct(c.currentPct)}
                    {group.category === "closed" && formatPct(c.previousPct)}
                    {(group.category === "increased" || group.category === "decreased") && (
                      <>
                        {formatPct(c.previousPct)}
                        <span aria-hidden="true"> → </span>
                        <span className="sr-only"> to </span>
                        <span className="font-semibold text-foreground">
                          {formatPct(c.currentPct)}
                        </span>
                      </>
                    )}
                    {group.category === "unchanged" && (
                      <span className="font-semibold text-foreground">
                        {formatPct(c.currentPct)}
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
