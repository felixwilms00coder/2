import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { useTheme } from "@/hooks/useTheme";
import { radius, space } from "@/constants/theme";
import { PositionChange, PositionChangeCategory } from "@/lib/pilots/types";
import { Text } from "./ui/Text";

const GROUPS: {
  category: PositionChangeCategory;
  heading: string;
  icon: keyof typeof Ionicons.glyphMap;
  tone: "positive" | "danger" | "muted";
}[] = [
  { category: "new", heading: "New positions", icon: "add-circle-outline", tone: "positive" },
  { category: "increased", heading: "Increased positions", icon: "trending-up-outline", tone: "positive" },
  { category: "closed", heading: "Closed positions", icon: "remove-circle-outline", tone: "danger" },
  { category: "decreased", heading: "Decreased positions", icon: "trending-down-outline", tone: "danger" },
  { category: "unchanged", heading: "Unchanged positions", icon: "remove-outline", tone: "muted" },
];

function formatPct(n: number): string {
  return `${n.toFixed(1)}%`;
}

export function PositionChanges({ changes }: { changes: PositionChange[] }) {
  const { colors } = useTheme();
  const toneColor = { positive: colors.accent, danger: colors.danger, muted: colors.muted };

  if (changes.length === 0) {
    return <Text variant="muted">No prior filing to compare against yet.</Text>;
  }

  let rowIndex = 0;

  return (
    <View style={{ gap: space.xl }}>
      {GROUPS.map((group) => {
        const items = changes.filter((c) => c.category === group.category);
        if (items.length === 0) return null;
        return (
          <View key={group.category}>
            <View style={styles.heading}>
              <Ionicons name={group.icon} size={16} color={toneColor[group.tone]} />
              <Text variant="bodySemiBold">{group.heading}</Text>
              <Text variant="muted">({items.length})</Text>
            </View>
            <View style={[styles.list, { borderColor: colors.border }]}>
              {items.map((c, i) => {
                rowIndex++;
                return (
                  <Animated.View
                    key={c.cusip}
                    entering={FadeInDown.delay(Math.min(rowIndex, 12) * 30).duration(260)}
                    style={[
                      styles.row,
                      i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
                    ]}
                  >
                    <Text variant="bodyMedium" style={{ flexShrink: 1 }} numberOfLines={1}>
                      {c.issuer}
                    </Text>
                    {group.category === "new" && (
                      <Text variant="muted">{formatPct(c.currentPct)}</Text>
                    )}
                    {group.category === "closed" && (
                      <Text variant="muted">{formatPct(c.previousPct)}</Text>
                    )}
                    {(group.category === "increased" || group.category === "decreased") && (
                      <Text variant="muted">
                        {formatPct(c.previousPct)}
                        {"  →  "}
                        <Text variant="bodySemiBold">{formatPct(c.currentPct)}</Text>
                      </Text>
                    )}
                    {group.category === "unchanged" && (
                      <Text variant="bodySemiBold">{formatPct(c.currentPct)}</Text>
                    )}
                  </Animated.View>
                );
              })}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  heading: { flexDirection: "row", alignItems: "center", gap: space.sm, marginBottom: space.sm },
  list: { borderRadius: radius.md, borderWidth: StyleSheet.hairlineWidth, overflow: "hidden" },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space.md,
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
  },
});
