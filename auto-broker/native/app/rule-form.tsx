import { useState } from "react";
import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedPressable } from "@/components/ui/AnimatedPressable";
import { Field, Input } from "@/components/ui/Field";
import { SegmentedControl } from "@/components/agent/SegmentedControl";
import { Text } from "@/components/ui/Text";
import { Toggle } from "@/components/ui/Toggle";
import { useAgent } from "@/hooks/useAgent";
import { useTheme } from "@/hooks/useTheme";
import { radius, space } from "@/constants/theme";
import { Frequency, OrderType } from "@/lib/agent/types";

const FREQUENCIES: { value: Frequency; label: string }[] = [
  { value: "weekly", label: "Weekly" },
  { value: "biweekly", label: "Biweekly" },
  { value: "monthly", label: "Monthly" },
];

const ORDER_TYPES: { value: OrderType; label: string }[] = [
  { value: "market", label: "Market" },
  { value: "limit", label: "Limit" },
];

const WEEKDAYS = [
  { value: "1", label: "Mon" },
  { value: "2", label: "Tue" },
  { value: "3", label: "Wed" },
  { value: "4", label: "Thu" },
  { value: "5", label: "Fri" },
];

// A rule always spends the same fixed amount, so a per-order cap that
// differs from that amount is meaningless — it defaults to the amount
// itself. The monthly cap is a flat multiple, generous enough to never
// block a rule's own normal cadence (weekly is ~4.3 fires/month) while
// still bounding runaway repeats if something misfires.
const MONTHLY_GUARDRAIL_MULTIPLIER = 6;

export default function RuleFormModal() {
  const { addRule } = useAgent();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [symbol, setSymbol] = useState("");
  const [amount, setAmount] = useState("100");
  const [orderType, setOrderType] = useState<OrderType>("market");
  const [limitPrice, setLimitPrice] = useState("");
  const [frequency, setFrequency] = useState<Frequency>("monthly");
  const [dayOfMonth, setDayOfMonth] = useState("5");
  const [weekday, setWeekday] = useState(1);
  const [autoConfirm, setAutoConfirm] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const valid =
    symbol.trim().length > 0 &&
    Number(amount) > 0 &&
    (orderType !== "limit" || Number(limitPrice) > 0);

  function submit() {
    if (!valid) {
      setError(
        orderType === "limit"
          ? "Fill in a ticker, an amount greater than 0, and a limit price greater than 0."
          : "Fill in at least a ticker and an amount greater than 0.",
      );
      return;
    }
    const parsedAmount = Number(amount);
    addRule({
      enabled: true,
      name: symbol.trim().toUpperCase(),
      symbol: symbol.trim().toUpperCase(),
      amount: parsedAmount,
      orderType,
      limitPrice: orderType === "limit" ? Number(limitPrice) : undefined,
      frequency,
      dayOfMonth: Math.min(28, Math.max(1, Number(dayOfMonth) || 5)),
      weekday,
      autoConfirm,
      maxPerOrder: parsedAmount,
      maxPerMonth: parsedAmount * MONTHLY_GUARDRAIL_MULTIPLIER,
    });
    router.back();
  }

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ padding: space.lg, paddingBottom: insets.bottom + space.xxxl, gap: space.lg }}
    >
      <View>
        <Text variant="displayLg" style={{ fontSize: 24 }}>
          New rule
        </Text>
        <Text variant="muted" style={{ marginTop: space.xs }}>
          You decide what gets bought and when. Nothing here is suggested.
        </Text>
      </View>

      <View style={{ flexDirection: "row", gap: space.md }}>
        <Field label="Ticker or ISIN *">
          <Input value={symbol} onChangeText={setSymbol} placeholder="IWDA" autoCapitalize="characters" />
        </Field>
        <Field label="Amount per purchase">
          <Input value={amount} onChangeText={setAmount} keyboardType="decimal-pad" />
        </Field>
      </View>

      <View style={{ flexDirection: "row", gap: space.md }}>
        <Field label="Order type">
          <SegmentedControl options={ORDER_TYPES} value={orderType} onChange={setOrderType} />
        </Field>
        {orderType === "limit" && (
          <Field label="Limit price">
            <Input
              value={limitPrice}
              onChangeText={setLimitPrice}
              keyboardType="decimal-pad"
              placeholder="e.g. 18"
            />
          </Field>
        )}
      </View>
      {orderType === "limit" && (
        <Text variant="muted" style={{ marginTop: -space.md }}>
          The amount above is spent at this price to size the order — e.g.
          $1800 at an $18 limit buys 100 units.
        </Text>
      )}

      <Field label="How often">
        <SegmentedControl options={FREQUENCIES} value={frequency} onChange={setFrequency} />
      </Field>

      {frequency === "monthly" ? (
        <Field label="Day of the month (1–28)">
          <Input value={dayOfMonth} onChangeText={setDayOfMonth} keyboardType="number-pad" />
        </Field>
      ) : (
        <Field label="Day of the week">
          <SegmentedControl
            options={WEEKDAYS}
            value={String(weekday)}
            onChange={(v) => setWeekday(Number(v))}
          />
        </Field>
      )}

      <View style={[styles.toggleRow, { borderColor: colors.border }]}>
        <View style={{ flex: 1 }}>
          <Text variant="bodySemiBold">Send without confirmation</Text>
          <Text variant="muted" style={{ marginTop: 2 }}>
            Leave this off if you want to approve every order yourself.
            Recommended while you're still testing.
          </Text>
        </View>
        <Toggle value={autoConfirm} onChange={setAutoConfirm} />
      </View>

      {error && (
        <Text color={colors.danger} variant="bodyMedium">
          {error}
        </Text>
      )}

      <View style={{ flexDirection: "row", gap: space.sm }}>
        <AnimatedPressable
          haptic="medium"
          onPress={submit}
          style={[styles.primaryButton, { backgroundColor: colors.accent, opacity: valid ? 1 : 0.5 }]}
        >
          <Text variant="bodySemiBold" color="#ffffff">
            Save rule
          </Text>
        </AnimatedPressable>
        <AnimatedPressable
          onPress={() => router.back()}
          style={[styles.secondaryButton, { borderColor: colors.border }]}
        >
          <Text variant="bodySemiBold">Cancel</Text>
        </AnimatedPressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  toggleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: space.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: radius.md,
    padding: space.md,
  },
  primaryButton: {
    flex: 1,
    paddingVertical: space.md,
    borderRadius: radius.full,
    alignItems: "center",
  },
  secondaryButton: {
    paddingHorizontal: space.xl,
    paddingVertical: space.md,
    borderRadius: radius.full,
    borderWidth: 1,
    alignItems: "center",
  },
});
