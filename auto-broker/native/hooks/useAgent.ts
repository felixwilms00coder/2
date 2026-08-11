import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import { createIbkrBroker } from "@/lib/agent/brokers/ibkr";
import { createSimulationBroker } from "@/lib/agent/brokers/simulation";
import { ensureHydrated, getSnapshot, newId, subscribe, update } from "@/lib/agent/store";
import { BrokerAdapter, LogEntry, Rule } from "@/lib/agent/types";

const simulation = createSimulationBroker();
const ibkr = createIbkrBroker();

export const brokers: BrokerAdapter[] = [simulation, ibkr];

export function useAgent() {
  const state = useSyncExternalStore(subscribe, getSnapshot);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    ensureHydrated().then(() => {
      if (!cancelled) setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const broker = useMemo(
    () => brokers.find((b) => b.id === state.settings.brokerId) ?? simulation,
    [state.settings.brokerId],
  );

  const addRule = useCallback((rule: Omit<Rule, "id" | "createdISO">) => {
    update((prev) => ({
      ...prev,
      rules: [
        ...prev.rules,
        { ...rule, id: newId(), createdISO: new Date().toISOString() },
      ],
    }));
  }, []);

  const updateRule = useCallback((id: string, patch: Partial<Rule>) => {
    update((prev) => ({
      ...prev,
      rules: prev.rules.map((r) => (r.id === id ? { ...r, ...patch } : r)),
    }));
  }, []);

  const removeRule = useCallback((id: string) => {
    update((prev) => ({
      ...prev,
      rules: prev.rules.filter((r) => r.id !== id),
    }));
  }, []);

  const addLog = useCallback((entries: LogEntry[]) => {
    if (entries.length === 0) return;
    update((prev) => ({ ...prev, log: [...entries, ...prev.log].slice(0, 500) }));
  }, []);

  const markRan = useCallback((ruleIds: string[]) => {
    if (ruleIds.length === 0) return;
    const now = new Date().toISOString();
    update((prev) => ({
      ...prev,
      rules: prev.rules.map((r) =>
        ruleIds.includes(r.id) ? { ...r, lastRunISO: now } : r,
      ),
    }));
  }, []);

  const setArmed = useCallback((armed: boolean) => {
    update((prev) => ({ ...prev, settings: { ...prev.settings, armed } }));
  }, []);

  const setBrokerId = useCallback((brokerId: string) => {
    update((prev) => ({ ...prev, settings: { ...prev.settings, brokerId } }));
  }, []);

  const clearLog = useCallback(() => {
    update((prev) => ({ ...prev, log: [] }));
  }, []);

  const removeLogEntry = useCallback((entryId: string) => {
    update((prev) => ({
      ...prev,
      log: prev.log.filter((e) => e.id !== entryId),
    }));
  }, []);

  return {
    ready,
    state,
    broker,
    addRule,
    updateRule,
    removeRule,
    addLog,
    markRan,
    setArmed,
    setBrokerId,
    clearLog,
    removeLogEntry,
  };
}
