import { router } from "expo-router";
import { ScrollView, StyleSheet, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedPressable } from "@/components/ui/AnimatedPressable";
import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { Text } from "@/components/ui/Text";
import { useTheme } from "@/hooks/useTheme";
import { radius, space } from "@/constants/theme";

const STEPS = [
  {
    n: "1",
    title: "You write the rule",
    body: "Instrument, amount, cadence, per-order and per-month caps — all typed in by you. Nothing is pre-filled or suggested.",
  },
  {
    n: "2",
    title: "It waits for confirmation",
    body: "A preview shows the live price and quantity before anything is sent — you confirm, or you don't.",
  },
  {
    n: "3",
    title: "It goes straight to your broker",
    body: "From this app or your own MCP client straight to IBKR. Every attempt lands in a local log you can read.",
  },
];

export default function HomeScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ padding: space.lg, paddingBottom: insets.bottom + space.xxxl, gap: space.xl }}
    >
      <Animated.View entering={FadeInUp.duration(500)}>
        <LinearGradient
          colors={[colors.accentStrong, colors.accent, colors.accentBright]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <Text
            variant="displayLg"
            color="#ffffff"
            style={{ fontSize: 30, lineHeight: 36 }}
          >
            Your own buy rules. Your own broker. Your own confirmation.
          </Text>
          <Text style={{ color: "#ffffffcc", marginTop: space.md, lineHeight: 21 }}>
            Auto Broker is software you run yourself: write a rule, connect
            your own IBKR account, and every order still waits for you to
            confirm it. No server in the order path.
          </Text>
          <View style={styles.heroButtons}>
            <AnimatedPressable
              haptic="medium"
              onPress={() => router.push("/(tabs)/agent")}
              style={[styles.heroButtonPrimary, { backgroundColor: "#ffffff" }]}
            >
              <Text variant="bodySemiBold" color={colors.accentStrong}>
                Open the agent
              </Text>
            </AnimatedPressable>
          </View>
        </LinearGradient>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(150).duration(400)}>
        <Callout tone="warning" title="Not a broker, adviser, or portfolio manager">
          Auto Broker never picks an instrument, never decides for you, and
          never holds your money or your broker token. You give the
          instructions to your own, licensed broker — the same legal
          position as running your own script against their API.
        </Callout>
      </Animated.View>

      <View>
        <Text variant="display" style={{ marginBottom: space.md }}>
          Three things happen, in this order
        </Text>
        <View style={{ gap: space.md }}>
          {STEPS.map((step, i) => (
            <Animated.View key={step.n} entering={FadeInDown.delay(250 + i * 90).duration(400)}>
              <Card>
                <Text variant="bodySemiBold" color={colors.accent} style={styles.stepEyebrow}>
                  {step.n}. {step.title}
                </Text>
                <Text variant="muted" style={{ marginTop: space.xs, lineHeight: 19 }}>
                  {step.body}
                </Text>
              </Card>
            </Animated.View>
          ))}
        </View>
      </View>

      <Animated.View entering={FadeInDown.delay(560).duration(400)}>
        <Card muted>
          <Text variant="bodySemiBold" color={colors.accent} style={styles.stepEyebrow}>
            Also available as an MCP server
          </Text>
          <Text variant="muted" style={{ marginTop: space.xs, lineHeight: 19 }}>
            The same IBKR connection, reachable from an MCP client (Claude
            Desktop, Claude Code) instead of this app — runs locally, uses
            only your own credentials, and still requires an explicit
            confirm step before anything is sent.
          </Text>
        </Card>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: radius.xl,
    padding: space.xl,
  },
  heroButtons: {
    flexDirection: "row",
    gap: space.sm,
    marginTop: space.xl,
  },
  heroButtonPrimary: {
    paddingHorizontal: space.lg,
    paddingVertical: space.md,
    borderRadius: radius.full,
  },
  stepEyebrow: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },
});
