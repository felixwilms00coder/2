import { Switch } from "react-native";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/hooks/useTheme";

export function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  const { colors } = useTheme();
  return (
    <Switch
      value={value}
      onValueChange={(v) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        onChange(v);
      }}
      trackColor={{ false: colors.border, true: colors.accent }}
      thumbColor="#ffffff"
    />
  );
}
