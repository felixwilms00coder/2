import { BrokerClient } from "../types.js";
import { createIbkrClient } from "./ibkr.js";
import { createRobinhoodClient } from "./robinhood.js";
import { createSaxoClient } from "./saxo.js";

const registry: Record<string, BrokerClient> = {
  ibkr: createIbkrClient(),
  saxo: createSaxoClient(),
  robinhood: createRobinhoodClient(),
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
