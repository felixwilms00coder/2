import {
  EMPTY_PROGRESS,
  ProgressState,
  readState,
  writeState,
} from "./progress";

/**
 * A tiny external store over localStorage, so components can read progress
 * with useSyncExternalStore. The snapshot is cached because that hook
 * requires a referentially stable value between renders.
 */
let cache: ProgressState | null = null;
const listeners = new Set<() => void>();

function emit() {
  for (const listener of listeners) listener();
}

function handleStorage(e: StorageEvent) {
  // Another tab changed the progress: drop the cache and re-read.
  if (e.key === null || e.key.startsWith("finedu:progress")) {
    cache = null;
    emit();
  }
}

export function subscribe(callback: () => void): () => void {
  if (listeners.size === 0 && typeof window !== "undefined") {
    window.addEventListener("storage", handleStorage);
  }
  listeners.add(callback);
  return () => {
    listeners.delete(callback);
    if (listeners.size === 0 && typeof window !== "undefined") {
      window.removeEventListener("storage", handleStorage);
    }
  };
}

export function getSnapshot(): ProgressState {
  if (cache === null) cache = readState();
  return cache;
}

export function getServerSnapshot(): ProgressState {
  return EMPTY_PROGRESS;
}

export function updateProgress(
  updater: (prev: ProgressState) => ProgressState,
): void {
  const next = updater(getSnapshot());
  cache = next;
  writeState(next);
  emit();
}

/** Always false on the server, true once hydrated on the client. */
export const getReady = () => true;
export const getServerReady = () => false;
