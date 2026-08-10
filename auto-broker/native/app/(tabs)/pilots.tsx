import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedPressable } from "@/components/ui/AnimatedPressable";
import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { useTheme } from "@/hooks/useTheme";
import { space } from "@/constants/theme";
import { pilots } from "@/lib/pilots/pilots";

export default function PilotsScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ padding: space.lg, paddingBottom: insets.bottom + space.xxxl, gap: space.lg }}
    >
      <View>
        <Text variant="displayLg" style={{ fontSize: 26 }}>
          Pilots
        </Text>
        <Text variant="muted" style={{ marginTop: space.xs, lineHeight: 19 }}>
          US law requires large fund managers to report their equity
          positions to the SEC every quarter. This shows those filings,
          straight from the source.
        </Text>
      </View>

      <Callout tone="warning" title="This is information, not a recommendation">
        Auto Broker doesn't pick these names because they're "good," and
        doesn't rank them. Form 13F also only shows part of the picture.
      </Callout>

      <View style={{ gap: space.md }}>
        {pilots.map((pilot, i) => (
          <Animated.View key={pilot.slug} entering={FadeInDown.delay(i * 70).duration(350)}>
            <AnimatedPressable onPress={() => router.push(`/pilots/${pilot.slug}`)}>
              <Card style={styles.pilotCard}>
                <View style={{ flex: 1 }}>
                  <Text variant="bodySemiBold" style={{ fontSize: 17 }}>
                    {pilot.name}
                  </Text>
                  <Text variant="muted" style={{ marginTop: 4 }} numberOfLines={2}>
                    {pilot.manager} — {pilot.description}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color={colors.muted} />
              </Card>
            </AnimatedPressable>
          </Animated.View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pilotCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: space.md,
  },
});
