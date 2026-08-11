export type Frequency = "weekly" | "biweekly" | "monthly";

/**
 * A rule the user writes themselves. Auto Broker never creates, suggests or
 * pre-fills an instrument: the user is the one deciding what to buy.
 */
export type Rule = {
  id: string;
  enabled: boolean;
  name: string;
  /** Free-form ticker/ISIN as the user knows it at their own broker. */
  symbol: string;
  /**
   * Broker-specific numeric instrument id (IBKR conid) — the user looks it
   * up. Optional for brokers that can resolve the symbol directly.
   */
  uic?: string;
  assetType: string;
  /** Amount per execution, in the account's own currency. */
  amount: number;
  frequency: Frequency;
  /** 1-28 for monthly rules. */
  dayOfMonth: number;
  /** 1 = Monday ... 5 = Friday, for weekly rules. */
  weekday: number;
  /** When false, every order must be confirmed by hand before it is sent. */
  autoConfirm: boolean;
  maxPerOrder: number;
  maxPerMonth: number;
  lastRunISO?: string;
  createdISO: string;
};

export type ExecutionStatus = "filled" | "simulated" | "pending" | "refused" | "failed";

export type LogEntry = {
  id: string;
  atISO: string;
  ruleId: string;
  ruleName: string;
  symbol: string;
  amount: number;
  status: ExecutionStatus;
  brokerId: string;
  /** Why a run was refused, or what went wrong. */
  detail?: string;
  price?: number;
  quantity?: number;
  brokerRef?: string;
};

export type Quote = {
  price: number;
  currency: string;
};

export type PlacedOrder = {
  brokerRef: string;
  price: number;
  quantity: number;
};

export type OrderRequest = {
  symbol: string;
  uic?: string;
  assetType: string;
  amountEur: number;
};

/**
 * Every broker integration implements this. Implementations run in the
 * user's own browser against the user's own account credentials — Auto
 * Broker has no server in this path and never sees an order.
 */
export interface BrokerAdapter {
  id: string;
  label: string;
  /** True when this adapter can place orders that cost real money. */
  isLive: boolean;
  isConnected(): boolean;
  /** Human-readable description of what is connected right now. */
  connectionSummary(): string;
  getQuote(req: OrderRequest): Promise<Quote>;
  placeOrder(req: OrderRequest): Promise<PlacedOrder>;
}

export type AgentSettings = {
  /** Master switch. When false nothing is ever sent, whatever the rules say. */
  armed: boolean;
  brokerId: string;
};

export type AgentState = {
  settings: AgentSettings;
  rules: Rule[];
  log: LogEntry[];
};

export const EMPTY_AGENT_STATE: AgentState = {
  settings: { armed: false, brokerId: "simulation" },
  rules: [],
  log: [],
};
