"use client";

import { useId, useMemo, useState } from "react";

type Point = { filingDate: string; totalValueUsd: number };

const WIDTH = 640;
const HEIGHT = 240;
const PAD_TOP = 16;
const PAD_BOTTOM = 28;
const PAD_LEFT = 8;
const PAD_RIGHT = 8;

function compactUsd(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function formatQuarter(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" }).format(
    new Date(iso),
  );
}

/**
 * Single-series area chart of reported portfolio value per 13F filing.
 * One series -> no legend (the heading names it); hover crosshair + a table
 * fallback keep every value reachable without pointing at a 2px line.
 */
export function ValueChart({ points }: { points: Point[] }) {
  const gradientId = useId();
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);

  const { linePath, areaPath, coords, min, max } = useMemo(() => {
    const values = points.map((p) => p.totalValueUsd);
    const rawMin = Math.min(...values);
    const rawMax = Math.max(...values);
    const span = rawMax - rawMin || rawMax || 1;
    const min = Math.max(0, rawMin - span * 0.1);
    const max = rawMax + span * 0.1;

    const innerW = WIDTH - PAD_LEFT - PAD_RIGHT;
    const innerH = HEIGHT - PAD_TOP - PAD_BOTTOM;

    const coords = points.map((p, i) => {
      const x =
        points.length === 1
          ? PAD_LEFT + innerW / 2
          : PAD_LEFT + (i / (points.length - 1)) * innerW;
      const y = PAD_TOP + innerH - ((p.totalValueUsd - min) / (max - min)) * innerH;
      return { x, y };
    });

    const linePath = coords
      .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`)
      .join(" ");
    const baseline = PAD_TOP + innerH;
    const areaPath =
      coords.length > 0
        ? `${linePath} L ${coords[coords.length - 1].x.toFixed(1)} ${baseline} L ${coords[0].x.toFixed(1)} ${baseline} Z`
        : "";

    return { linePath, areaPath, coords, min, max };
  }, [points]);

  if (points.length < 2) {
    return (
      <p className="text-sm text-muted">
        Not enough filing history yet to chart a trend.
      </p>
    );
  }

  function nearestIndex(clientX: number, svg: SVGSVGElement): number {
    const rect = svg.getBoundingClientRect();
    const relX = ((clientX - rect.left) / rect.width) * WIDTH;
    let nearest = 0;
    let nearestDist = Infinity;
    coords.forEach((c, i) => {
      const dist = Math.abs(c.x - relX);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = i;
      }
    });
    return nearest;
  }

  const hovered = hoverIndex !== null ? points[hoverIndex] : null;
  const hoveredCoord = hoverIndex !== null ? coords[hoverIndex] : null;
  const latest = points[points.length - 1];
  const latestCoord = coords[coords.length - 1];

  return (
    <div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        role="img"
        aria-label={`Reported portfolio value from ${formatQuarter(points[0].filingDate)} to ${formatQuarter(latest.filingDate)}, latest ${compactUsd(latest.totalValueUsd)}`}
        className="w-full touch-none"
        onPointerMove={(e) => setHoverIndex(nearestIndex(e.clientX, e.currentTarget))}
        onPointerLeave={() => setHoverIndex(null)}
      >
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.12" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.12" />
          </linearGradient>
        </defs>

        {/* Recessive horizontal reference lines */}
        {[0, 0.5, 1].map((t) => {
          const y = PAD_TOP + t * (HEIGHT - PAD_TOP - PAD_BOTTOM);
          const value = max - t * (max - min);
          return (
            <g key={t}>
              <line
                x1={PAD_LEFT}
                x2={WIDTH - PAD_RIGHT}
                y1={y}
                y2={y}
                stroke="var(--color-border)"
                strokeWidth={1}
              />
              <text
                x={PAD_LEFT}
                y={y - 4}
                fontSize={10}
                fill="var(--color-muted)"
              >
                {compactUsd(value)}
              </text>
            </g>
          );
        })}

        <path d={areaPath} fill={`url(#${gradientId})`} stroke="none" />
        <path
          d={linePath}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* End marker: >=8px, with a surface ring so it stays legible on the line */}
        <circle cx={latestCoord.x} cy={latestCoord.y} r={6} fill="var(--color-surface)" />
        <circle cx={latestCoord.x} cy={latestCoord.y} r={4} fill="var(--color-accent)" />
        <text
          x={Math.min(latestCoord.x, WIDTH - 60)}
          y={Math.max(latestCoord.y - 12, 12)}
          fontSize={12}
          fontWeight={700}
          fill="var(--color-foreground)"
        >
          {compactUsd(latest.totalValueUsd)}
        </text>

        {hoveredCoord && (
          <>
            <line
              x1={hoveredCoord.x}
              x2={hoveredCoord.x}
              y1={PAD_TOP}
              y2={HEIGHT - PAD_BOTTOM}
              stroke="var(--color-muted)"
              strokeWidth={1}
            />
            <circle
              cx={hoveredCoord.x}
              cy={hoveredCoord.y}
              r={5}
              fill="var(--color-accent)"
              stroke="var(--color-surface)"
              strokeWidth={2}
            />
          </>
        )}

        {points.map((p, i) => (
          <text
            key={p.filingDate}
            x={coords[i].x}
            y={HEIGHT - 8}
            fontSize={10}
            fill="var(--color-muted)"
            textAnchor={i === 0 ? "start" : i === points.length - 1 ? "end" : "middle"}
          >
            {i === 0 || i === points.length - 1 || i === hoverIndex
              ? formatQuarter(p.filingDate)
              : ""}
          </text>
        ))}
      </svg>

      <p aria-live="polite" className="mt-1 min-h-5 text-sm font-semibold text-foreground">
        {hovered ? `${formatQuarter(hovered.filingDate)}: ${compactUsd(hovered.totalValueUsd)}` : " "}
      </p>

      <details className="mt-2">
        <summary className="cursor-pointer text-xs font-semibold text-accent">
          Show as table
        </summary>
        <table className="mt-2 w-full text-xs">
          <thead className="text-left text-muted">
            <tr>
              <th scope="col" className="py-1 pr-4 font-semibold">
                Filing quarter
              </th>
              <th scope="col" className="py-1 font-semibold">
                Reported value
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {points.map((p) => (
              <tr key={p.filingDate}>
                <td className="py-1 pr-4">{formatQuarter(p.filingDate)}</td>
                <td className="py-1 tabular-nums">{compactUsd(p.totalValueUsd)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}
