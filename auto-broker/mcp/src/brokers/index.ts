import { BrokerClient } from "../types.js";
import { createIbkrClient } from "./ibkr.js";

const registry: Record<string, BrokerClient> = {
  ibkr: createIbkrClient(),
};

export function listBrokers(): BrokerClient[] {
  return Object.values(registry);
}

export function getBroker(brokerId: string): BrokerClient {
  const broker = registry[brokerId];
  if (!broker) {
    throw new Error(
      `Unknown brokerId "${brokerId}". Known brokers: ${Object.keys(registry).join(", ")}.`,
    );
  }
  return broker;
}
