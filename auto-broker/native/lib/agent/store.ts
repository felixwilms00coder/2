import AsyncStorage from "@react-native-async-storage/async-storage";
import { AgentState, EMPTY_AGENT_STATE } from "./types";

/**
 * Rules and the audit log live in AsyncStorage, on-device only — same
 * "nothing leaves your device" guarantee as the web app's localStorage
 * version, just ported for React Native (AsyncStorage is async, so this
 * store hydrates once and then works from an in-memory cache).
 */
export const AGENT_KEY = "autobroker:agent:v1";

let cache: AgentState | null = null;
let hydration: Promise<AgentState> | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function normalize(parsed: Partial<AgentState> | null): AgentState {
  if (!parsed) return EMPTY_AGENT_STATE;
  return {
    settings: {
      armed: Boolean(parsed.settings?.armed),
      brokerId: parsed.settings?.brokerId ?? "simulation",
    },
    rules: Array.isArray(parsed.rules) ? parsed.rules : [],
    log: Array.isArray(parsed.log) ? parsed.log : [],
  };
}

async function hydrate(): Promise<AgentState> {
  try {
    const raw = await AsyncStorage.getItem(AGENT_KEY);
    const parsed = raw ? (JSON.parse(raw) as Partial<AgentState>) : null;
    cache = normalize(parsed);
  } catch {
    cache = EMPTY_AGENT_STATE;
  }
  emit();
  return cache;
}

/** Call once (the agent screen does this on mount) before reading the store. */
export function ensureHydrated(): Promise<AgentState> {
  if (cache !== null) return Promise.resolve(cache);
  if (!hydration) hydration = hydrate();
  return hydration;
}

function write(state: AgentState) {
  AsyncStorage.setItem(AGENT_KEY, JSON.stringify(state)).catch(() => {
    // Storage full or blocked; the in-memory state still works this session.
  });
}

export function subscribe(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function getSnapshot(): AgentState {
  return cache ?? EMPTY_AGENT_STATE;
}

export function update(fn: (prev: AgentState) => AgentState): void {
  const next = fn(getSnapshot());
  cache = next;
  write(next);
  emit();
}

export function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}
