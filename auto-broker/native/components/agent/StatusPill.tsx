import { StyleSheet, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { radius, space } from "@/constants/theme";
import { LogEntry } from "@/lib/agent/types";
import { Text } from "@/components/ui/Text";

const LABEL: Record<LogEntry["status"], string> = {
  filled: "Filled",
  simulated: "Simulated",
  pending: "Awaiting confirmation",
  refused: "Refused",
  failed: "Failed",
};

export function StatusPill({ status }: { status: LogEntry["status"] }) {
  const { colors } = useTheme();
  const tone = {
    filled: { bg: colors.accent, fg: "#ffffff" },
    simulated: { bg: colors.accentSoft, fg: colors.accentStrong },
    pending: { bg: colors.warningLight, fg: colors.warning },
    refused: { bg: colors.surfaceMuted, fg: colors.muted },
    failed: { bg: colors.dangerLight, fg: colors.danger },
  }[status];

  return (
    <View style={[styles.pill, { backgroundColor: tone.bg }]}>
      <Text variant="bodyMedium" color={tone.fg} style={{ fontSize: 12 }}>
        {LABEL[status]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    paddingHorizontal: space.sm,
    paddingVertical: 3,
    borderRadius: radius.full,
    alignSelf: "flex-start",
  },
});
