import { PropsWithChildren } from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { fonts, radius, space } from "@/constants/theme";
import { Text } from "./Text";

export function Field({
  label,
  children,
}: PropsWithChildren<{ label: string }>) {
  return (
    <View style={{ gap: space.xs, flex: 1 }}>
      <Text variant="muted" style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: 0.3 }}>
        {label}
      </Text>
      {children}
    </View>
  );
}

export function Input(props: TextInputProps) {
  const { colors } = useTheme();
  return (
    <TextInput
      placeholderTextColor={colors.muted}
      {...props}
      style={[
        styles.input,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          color: colors.foreground,
          fontFamily: fonts.bodyMedium,
        },
        props.style,
      ]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 44,
    borderRadius: radius.sm,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: space.md,
    fontSize: 15,
  },
});
