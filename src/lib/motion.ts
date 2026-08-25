/**
 * Shared spring presets, matching the damping/response values Apple ships
 * for menus, panels and sheets (WWDC 2018 "Designing Fluid Interfaces").
 * Pull from here instead of inventing transition values per component.
 */
// Motion's duration-based spring API takes `bounce` (0-1), not the raw
// physical `damping` ratio — passing `damping` without matching
// `stiffness`/`mass` falls through to the physical spring model and
// produces an underdamped, near-endless oscillation instead. `bounce: 0`
// is Motion's actual critically-damped case (see the guide's own example:
// `{ type: 'spring', bounce: 0, duration: 0.4 }`).
export const springDefault = {
  type: "spring",
  bounce: 0,
  duration: 0.4,
} as const; // critically damped, no overshoot — menus/panels/reveals

export const springDrawer = {
  type: "spring",
  bounce: 0.2,
  duration: 0.3,
} as const; // sheet-like panels (mobile menu, cookie banner) — slight settle

/** Fallback for prefers-reduced-motion: opacity-only, no scale/translate. */
export const reducedMotionTransition = {
  duration: 0.15,
  ease: "easeOut",
} as const;
