export type Quote = {
  price: number;
  currency: string;
};

export type Position = {
  symbol: string;
  quantity: number;
  averagePrice?: number;
  currency: string;
};

export type AccountSummary = {
  accountId: string;
  currency: string;
  cash?: number;
  totalValue?: number;
};

export type OrderSide = "buy" | "sell";

export type OrderRequest = {
  symbol: string;
  /** Broker-specific instrument identifier (IBKR conid). */
  instrumentId?: string;
  assetType?: string;
  amountEur: number;
  side: OrderSide;
};

export type PlacedOrder = {
  brokerOrderId: string;
  price: number;
  quantity: number;
};

/**
 * Every broker integration implements this. Every implementation talks
 * directly from this local process to the broker using credentials that live
 * only in this process's environment / local config — there is no Auto Broker
 * server anywhere in the path, and no other user's credentials ever pass
 * through this code.
 */
export interface BrokerClient {
  id: string;
  label: string;
  /** True once orders placed through this client cost real money. */
  isLive(): boolean;
  /** Shown to the human before any live (real-money) use. */
  riskNotice?: string;
  isConfigured(): boolean;
  connectionSummary(): Promise<string> | string;
  getAccount(): Promise<AccountSummary>;
  getPositions(): Promise<Position[]>;
  getQuote(req: Pick<OrderRequest, "symbol" | "instrumentId" | "assetType">): Promise<Quote>;
  placeOrder(req: OrderRequest): Promise<PlacedOrder>;
  cancelOrder?(brokerOrderId: string): Promise<void>;
}
