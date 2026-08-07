"use client";

import { useSearchParams } from "next/navigation";
import { AgentDashboard } from "./agent-dashboard";

/**
 * Reads ?ruleName= client-side via useSearchParams() rather than the page's
 * server-side searchParams prop, so this keeps working under static export
 * (Capacitor build) where there is no server left to read a request from.
 */
export function AgentDashboardWithParams() {
  const searchParams = useSearchParams();
  const ruleName = searchParams.get("ruleName") ?? undefined;
  return <AgentDashboard prefillName={ruleName} />;
}
