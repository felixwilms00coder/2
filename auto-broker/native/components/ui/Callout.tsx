import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/useTheme";
import { radius, space } from "@/constants/theme";
import { Text } from "./Text";

type Tone = "tip" | "warning";

const ICON: Record<Tone, keyof typeof Ionicons.glyphMap> = {
  tip: "bulb-outline",
  warning: "warning-outline",
};

export function Callout({
  tone,
  title,
  children,
}: PropsWithChildren<{ tone: Tone; title: string }>) {
  const { colors } = useTheme();
  const bg = tone === "tip" ? colors.accentSoft : colors.warningLight;
  const fg = tone === "tip" ? colors.accentStrong : colors.warning;

  return (
    <View style={[styles.wrap, { backgroundColor: bg, borderColor: fg + "33" }]}>
      <View style={styles.header}>
        <Ionicons name={ICON[tone]} size={18} color={fg} />
        <Text variant="bodySemiBold" color={fg} style={styles.title}>
          {title}
        </Text>
      </View>
      <Text variant="body" color={fg} style={styles.body}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    borderRadius: radius.md,
    borderWidth: 1,
    padding: space.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.sm,
  },
  title: { flexShrink: 1 },
  body: { marginTop: space.xs, lineHeight: 20 },
});
