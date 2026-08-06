import { AgentState, EMPTY_AGENT_STATE } from "./types";

/**
 * Rules and the audit log live in the user's own browser only.
 * Nothing here is ever sent anywhere — there is no server in this path.
 */
export const AGENT_KEY = "autobroker:agent:v1";

let cache: AgentState | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function read(): AgentState {
  if (typeof window === "undefined") return EMPTY_AGENT_STATE;
  try {
    const raw = window.localStorage.getItem(AGENT_KEY);
    if (!raw) return EMPTY_AGENT_STATE;
    const parsed = JSON.parse(raw) as Partial<AgentState>;
    return {
      settings: {
        armed: Boolean(parsed.settings?.armed),
        brokerId: parsed.settings?.brokerId ?? "simulation",
      },
      rules: Array.isArray(parsed.rules) ? parsed.rules : [],
      log: Array.isArray(parsed.log) ? parsed.log : [],
    };
  } catch {
    return EMPTY_AGENT_STATE;
  }
}

function write(state: AgentState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(AGENT_KEY, JSON.stringify(state));
  } catch {
    // Storage full or blocked; the in-memory state still works this session.
  }
}

function handleStorage(e: StorageEvent) {
  if (e.key === null || e.key === AGENT_KEY) {
    cache = null;
    emit();
  }
}

export function subscribe(cb: () => void): () => void {
  if (listeners.size === 0 && typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
    if (listeners.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

export function getSnapshot(): AgentState {
  if (cache === null) cache = read();
  return cache;
}

export function getServerSnapshot(): AgentState {
  return EMPTY_AGENT_STATE;
}

export function update(fn: (prev: AgentState) => AgentState): void {
  const next = fn(getSnapshot());
  cache = next;
  write(next);
  emit();
}

export const getReady = () => true;
export const getServerReady = () => false;

export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
