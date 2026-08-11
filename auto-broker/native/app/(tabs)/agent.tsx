import { useState } from "react";
import { router } from "expo-router";
import { ActivityIndicator, Linking, ScrollView, StyleSheet, View } from "react-native";
import Animated, { FadeInDown, Layout } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { AnimatedPressable } from "@/components/ui/AnimatedPressable";
import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { SegmentedControl } from "@/components/agent/SegmentedControl";
import { StatusPill } from "@/components/agent/StatusPill";
import { Text } from "@/components/ui/Text";
import { Toggle } from "@/components/ui/Toggle";
import { brokers, useAgent } from "@/hooks/useAgent";
import { useTheme } from "@/hooks/useTheme";
import { radius, space } from "@/constants/theme";
import { runDueRules, runRule, sendOrder } from "@/lib/agent/engine";
import { formatDate, nextRunDate } from "@/lib/agent/schedule";
import { LogEntry, Rule } from "@/lib/agent/types";

// Short enough to fit a 3-way segmented control on a phone width; the full
// name still shows in the connection summary text below it.
const BROKER_SHORT_LABEL: Record<string, string> = {
  simulation: "Simulation",
  ibkr: "IBKR",
  saxo: "Saxo",
};

const IBKR_MCP_URL = "https://interactivebrokers.com/en/trading/ai-integrations.php";

function money(n: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(n);
}

export default function AgentScreen() {
  const {
    ready,
    state,
    broker,
    updateRule,
    removeRule,
    addLog,
    markRan,
    setArmed,
    setBrokerId,
    removeLogEntry,
  } = useAgent();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const [busy, setBusy] = useState(false);

  if (!ready) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator color={colors.accent} />
      </View>
    );
  }

  const pending = state.log.filter((e) => e.status === "pending");
  const recent = state.log.filter((e) => e.status !== "pending").slice(0, 20);

  async function runNow() {
    setBusy(true);
    try {
      const outcome = await runDueRules(state, broker);
      if (outcome.entries.length === 0) {
        addLog([
          {
            id: `${Date.now()}`,
            atISO: new Date().toISOString(),
            ruleId: "-",
            ruleName: "Check",
            symbol: "-",
            amount: 0,
            status: "refused",
            brokerId: broker.id,
            detail: "No rule was scheduled for today.",
          },
        ]);
      } else {
        addLog(outcome.entries);
        markRan(outcome.ranRuleIds);
      }
    } finally {
      setBusy(false);
    }
  }

  async function runOne(rule: Rule) {
    setBusy(true);
    try {
      const entry = await runRule(rule, state, broker, { force: true });
      addLog([entry]);
      if (entry.status === "filled" || entry.status === "simulated") markRan([rule.id]);
    } finally {
      setBusy(false);
    }
  }

  async function confirmPending(entry: LogEntry) {
    const rule = state.rules.find((r) => r.id === entry.ruleId);
    if (!rule) return;
    setBusy(true);
    try {
      const result = await sendOrder(rule, broker);
      addLog([result]);
      if (result.status === "filled" || result.status === "simulated") markRan([rule.id]);
      removeLogEntry(entry.id);
    } finally {
      setBusy(false);
    }
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ padding: space.lg, paddingBottom: insets.bottom + space.xxxl, gap: space.xl }}
    >
      <Callout tone="tip" title="You are the one giving the instructions">
        Auto Broker picks no instrument and does not manage your portfolio.
        Orders go straight from your device to your broker.
      </Callout>

      {/* Armed status */}
      <Card>
        <View style={styles.statusRow}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: space.sm, flex: 1 }}>
            <Ionicons
              name={state.settings.armed ? "flash" : "pause-circle-outline"}
              size={22}
              color={state.settings.armed ? colors.accent : colors.muted}
            />
            <View style={{ flex: 1 }}>
              <Text variant="bodySemiBold">{state.settings.armed ? "Active" : "Paused"}</Text>
              <Text variant="muted" style={{ marginTop: 2 }}>
                {state.settings.armed
                  ? "Rules with auto-confirm on will send orders when due."
                  : "Nothing will be sent until you activate the agent."}
              </Text>
            </View>
          </View>
          <Toggle value={state.settings.armed} onChange={setArmed} />
        </View>
      </Card>

      {/* Broker picker */}
      <View>
        <Text variant="bodySemiBold" style={{ marginBottom: space.sm }}>
          Where should your orders be sent?
        </Text>
        <SegmentedControl
          options={brokers.map((b) => ({ value: b.id, label: BROKER_SHORT_LABEL[b.id] ?? b.label }))}
          value={state.settings.brokerId}
          onChange={setBrokerId}
        />
        <Text variant="muted" style={{ marginTop: space.sm }}>
          {broker.connectionSummary()}
        </Text>
        {state.settings.brokerId === "ibkr" && (
          <AnimatedPressable onPress={() => Linking.openURL(IBKR_MCP_URL)} style={{ marginTop: space.sm }}>
            <Text variant="bodyMedium" color={colors.accent} style={{ fontSize: 13 }}>
              IBKR also has its own official Trading MCP — no local gateway
              needed, and it can only draft instructions, not place orders
              directly. Tap for details →
            </Text>
          </AnimatedPressable>
        )}
      </View>

      {/* Rules */}
      <View>
        <View style={styles.sectionHeader}>
          <Text variant="display" style={{ fontSize: 18 }}>
            Your rules
          </Text>
          <AnimatedPressable
            haptic="medium"
            onPress={runNow}
            disabled={busy}
            style={[styles.smallButton, { borderColor: colors.border }]}
          >
            {busy ? (
              <ActivityIndicator size="small" color={colors.accent} />
            ) : (
              <Text variant="bodySemiBold" color={colors.accent}>
                Check now
              </Text>
            )}
          </AnimatedPressable>
        </View>

        {state.rules.length === 0 ? (
          <Card muted>
            <Text variant="muted">
              You have no rules yet. Create one: you choose the instrument, the amount and the cadence.
            </Text>
          </Card>
        ) : (
          <View style={{ gap: space.sm }}>
            {state.rules.map((rule) => (
              <Animated.View key={rule.id} layout={Layout.springify()} entering={FadeInDown.duration(300)}>
                <Card>
                  <View style={styles.ruleRow}>
                    <View style={{ flex: 1 }}>
                      <Text variant="bodySemiBold" numberOfLines={1}>
                        {rule.name}
                      </Text>
                      <Text variant="muted" style={{ marginTop: 2 }}>
                        {money(rule.amount)} · {rule.frequency} · next {formatDate(nextRunDate(rule))}
                      </Text>
                    </View>
                    <Toggle value={rule.enabled} onChange={(v) => updateRule(rule.id, { enabled: v })} />
                  </View>
                  <View style={styles.ruleActions}>
                    <AnimatedPressable onPress={() => runOne(rule)} disabled={busy}>
                      <Text variant="bodySemiBold" color={colors.accent}>
                        Run now
                      </Text>
                    </AnimatedPressable>
                    <AnimatedPressable onPress={() => removeRule(rule.id)} haptic="medium">
                      <Text variant="bodySemiBold" color={colors.danger}>
                        Delete
                      </Text>
                    </AnimatedPressable>
                  </View>
                </Card>
              </Animated.View>
            ))}
          </View>
        )}

        <AnimatedPressable
          haptic="medium"
          onPress={() => router.push("/rule-form")}
          style={[styles.newRuleButton, { backgroundColor: colors.accent }]}
        >
          <Ionicons name="add" size={18} color="#ffffff" />
          <Text variant="bodySemiBold" color="#ffffff">
            New rule
          </Text>
        </AnimatedPressable>
      </View>

      {/* Pending confirmations */}
      {pending.length > 0 && (
        <View>
          <Text variant="display" style={{ fontSize: 18, marginBottom: space.sm }}>
            Waiting for your confirmation
          </Text>
          <View style={{ gap: space.sm }}>
            {pending.map((entry) => (
              <Card key={entry.id} style={{ borderColor: colors.warning + "55" }}>
                <Text variant="bodySemiBold">{entry.ruleName}</Text>
                <Text variant="muted" style={{ marginTop: 2 }}>
                  {entry.symbol} · {money(entry.amount)}
                </Text>
                <View style={styles.ruleActions}>
                  <AnimatedPressable haptic="medium" onPress={() => confirmPending(entry)} disabled={busy}>
                    <Text variant="bodySemiBold" color={colors.accent}>
                      Send
                    </Text>
                  </AnimatedPressable>
                  <AnimatedPressable onPress={() => removeLogEntry(entry.id)}>
                    <Text variant="bodySemiBold" color={colors.muted}>
                      Dismiss
                    </Text>
                  </AnimatedPressable>
                </View>
              </Card>
            ))}
          </View>
        </View>
      )}

      {/* Log */}
      <View>
        <Text variant="display" style={{ fontSize: 18, marginBottom: space.sm }}>
          Log
        </Text>
        {recent.length === 0 ? (
          <Text variant="muted">Nothing has happened yet. Every attempt, including a refused one, lands here.</Text>
        ) : (
          <View style={[styles.logList, { borderColor: colors.border }]}>
            {recent.map((entry, i) => (
              <View
                key={entry.id}
                style={[
                  styles.logRow,
                  i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
                ]}
              >
                <View style={{ flex: 1 }}>
                  <Text variant="bodyMedium" numberOfLines={1}>
                    {entry.ruleName}
                  </Text>
                  {entry.detail && (
                    <Text variant="muted" numberOfLines={2} style={{ marginTop: 2 }}>
                      {entry.detail}
                    </Text>
                  )}
                </View>
                <StatusPill status={entry.status} />
              </View>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
  statusRow: { flexDirection: "row", alignItems: "center", gap: space.md },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: space.sm,
  },
  smallButton: {
    paddingHorizontal: space.md,
    paddingVertical: space.xs,
    borderRadius: radius.full,
    borderWidth: 1,
    minWidth: 88,
    alignItems: "center",
  },
  ruleRow: { flexDirection: "row", alignItems: "center", gap: space.md },
  ruleActions: {
    flexDirection: "row",
    gap: space.lg,
    marginTop: space.md,
    paddingTop: space.md,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#00000014",
  },
  newRuleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: space.xs,
    paddingVertical: space.md,
    borderRadius: radius.full,
    marginTop: space.sm,
  },
  logList: { borderWidth: StyleSheet.hairlineWidth, borderRadius: radius.md, overflow: "hidden" },
  logRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space.md,
    padding: space.md,
  },
});
