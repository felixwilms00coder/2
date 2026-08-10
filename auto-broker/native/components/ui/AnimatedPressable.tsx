import * as Haptics from "expo-haptics";
import { PropsWithChildren } from "react";
import { GestureResponderEvent, Pressable, StyleProp, ViewStyle } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(Pressable);

/**
 * The base of every tappable surface in this app: a spring-scale press
 * animation plus a light haptic tick, so interactions feel physical rather
 * than instant/flat the way a plain web button does. This one component is
 * most of what separates "wrapped website" motion from "native app" motion.
 */
export function AnimatedPressable({
  children,
  onPress,
  style,
  haptic = "light",
  disabled,
  accessibilityLabel,
  accessibilityRole = "button",
}: PropsWithChildren<{
  onPress?: (e: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  haptic?: "light" | "medium" | "none";
  disabled?: boolean;
  accessibilityLabel?: string;
  accessibilityRole?: "button" | "none";
}>) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedView
      disabled={disabled}
      accessibilityRole={accessibilityRole}
      accessibilityLabel={accessibilityLabel}
      onPressIn={() => {
        scale.value = withSpring(0.96, { damping: 16, stiffness: 300 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 12, stiffness: 220 });
      }}
      onPress={(e) => {
        if (haptic !== "none") {
          Haptics.impactAsync(
            haptic === "medium"
              ? Haptics.ImpactFeedbackStyle.Medium
              : Haptics.ImpactFeedbackStyle.Light,
          );
        }
        onPress?.(e);
      }}
      style={[animatedStyle, style]}
    >
      {children}
    </AnimatedView>
  );
}
