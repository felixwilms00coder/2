import { StyleSheet, View } from "react-native";
import Animated, { useAnimatedStyle, withSpring } from "react-native-reanimated";
import { useEffect, useState } from "react";
import { AnimatedPressable } from "@/components/ui/AnimatedPressable";
import { Text } from "@/components/ui/Text";
import { useTheme } from "@/hooks/useTheme";
import { radius, space } from "@/constants/theme";

export function SegmentedControl<T extends string>({
  options,
  value,
  onChange,
}: {
  options: { value: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
}) {
  const { colors } = useTheme();
  const [segmentWidth, setSegmentWidth] = useState(0);
  const activeIndex = Math.max(0, options.findIndex((o) => o.value === value));

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withSpring(activeIndex * segmentWidth, { damping: 18, stiffness: 220 }) },
    ],
    width: segmentWidth,
  }));

  return (
    <View
      style={[styles.wrap, { backgroundColor: colors.surfaceMuted }]}
      onLayout={(e) => setSegmentWidth(e.nativeEvent.layout.width / options.length)}
    >
      {segmentWidth > 0 && (
        <Animated.View
          style={[
            styles.indicator,
            indicatorStyle,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        />
      )}
      {options.map((o) => (
        <AnimatedPressable
          key={o.value}
          haptic="light"
          onPress={() => onChange(o.value)}
          style={styles.segment}
        >
          <Text
            variant={o.value === value ? "bodySemiBold" : "body"}
            color={o.value === value ? colors.foreground : colors.muted}
            numberOfLines={1}
          >
            {o.label}
          </Text>
        </AnimatedPressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: "row",
    borderRadius: radius.md,
    padding: 4,
    position: "relative",
  },
  indicator: {
    position: "absolute",
    top: 4,
    bottom: 4,
    left: 4,
    borderRadius: radius.md - 4,
    borderWidth: 1,
  },
  segment: {
    flex: 1,
    paddingVertical: space.sm,
    alignItems: "center",
    justifyContent: "center",
  },
});
