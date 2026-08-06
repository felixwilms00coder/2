import { randomUUID } from "node:crypto";
import { OrderRequest } from "./types.js";

export type PendingOrder = {
  id: string;
  brokerId: string;
  request: OrderRequest;
  previewPrice: number;
  previewQuantity: number;
  createdAt: number;
  expiresAt: number;
};

// Confirm-before-send means every order goes through preview_order, which
// returns an id, and only confirm_order with that id actually sends
// anything. A preview expires quickly so a stale confirm can never fire on
// a price the human never saw.
const PENDING_TTL_MS = 5 * 60 * 1000;

const pending = new Map<string, PendingOrder>();

export function createPending(
  brokerId: string,
  request: OrderRequest,
  previewPrice: number,
  previewQuantity: number,
): PendingOrder {
  const now = Date.now();
  const order: PendingOrder = {
    id: randomUUID(),
    brokerId,
    request,
    previewPrice,
    previewQuantity,
    createdAt: now,
    expiresAt: now + PENDING_TTL_MS,
  };
  pending.set(order.id, order);
  return order;
}

/** Consumes the preview — a given preview id can only ever be confirmed once. */
export function takePending(id: string): PendingOrder | { expired: true } | null {
  const order = pending.get(id);
  if (!order) return null;
  pending.delete(id);
  if (Date.now() > order.expiresAt) return { expired: true };
  return order;
}
