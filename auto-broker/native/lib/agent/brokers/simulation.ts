import { BrokerAdapter, OrderRequest, PlacedOrder, Quote } from "../types";

/**
 * A paper broker. Fully functional, costs nothing, and lets the user test
 * their own rules before ever pointing the agent at a real account.
 *
 * Prices are deterministic per symbol and day, so a simulation is
 * reproducible and nobody mistakes it for a market feed.
 */
function pseudoPrice(symbol: string, date: Date): number {
  let hash = 0;
  for (let i = 0; i < symbol.length; i++) {
    hash = (hash * 31 + symbol.charCodeAt(i)) % 100000;
  }
  const base = 40 + (hash % 160); // 40 - 200
  const dayIndex = Math.floor(date.getTime() / 86_400_000);
  // A gentle, repeating wave so the value moves between runs.
  const wave =
    Math.sin((dayIndex + hash) / 9) * 0.06 +
    Math.sin((dayIndex + hash) / 31) * 0.04;
  return Math.round(base * (1 + wave) * 100) / 100;
}

export function createSimulationBroker(): BrokerAdapter {
  return {
    id: "simulation",
    label: "Simulation (paper orders)",
    isLive: false,
    isConnected: () => true,
    connectionSummary: () =>
      "Paper orders. Nothing is sent to a broker and no real money is involved.",
    async getQuote(req: OrderRequest): Promise<Quote> {
      return { price: pseudoPrice(req.symbol, new Date()), currency: "EUR" };
    },
    async placeOrder(req: OrderRequest): Promise<PlacedOrder> {
      const price = req.orderType === "limit" && req.limitPrice ? req.limitPrice : pseudoPrice(req.symbol, new Date());
      const quantity = Math.floor((req.amountEur / price) * 10000) / 10000;
      return {
        brokerRef: `SIM-${Date.now().toString(36).toUpperCase()}`,
        price,
        quantity,
      };
    },
  };
}
