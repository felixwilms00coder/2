/**
 * Master switch for this server process. Starts disarmed on every launch —
 * on purpose, it is not persisted to disk — so a forgotten "armed" state
 * from a previous session can never linger into a new one. The human has to
 * call set_armed(true) again after every restart before any order can be
 * confirmed.
 */
let armed = false;

export function isArmed(): boolean {
  return armed;
}

export function setArmed(next: boolean): void {
  armed = next;
}
