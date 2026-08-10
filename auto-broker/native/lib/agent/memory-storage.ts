/**
 * In-process, in-memory key/value store — the native equivalent of the web
 * app's use of `window.sessionStorage` for broker tokens. There is no "tab"
 * on a phone, so the natural analog of "gone when the tab closes" is "gone
 * when the app process ends" (force-quit or device restart), which is what
 * a plain module-level Map gives for free. Never persisted to disk.
 */
const store = new Map<string, string>();

export const memoryStorage = {
  getItem(key: string): string | null {
    return store.get(key) ?? null;
  },
  setItem(key: string, value: string): void {
    store.set(key, value);
  },
  removeItem(key: string): void {
    store.delete(key);
  },
};
