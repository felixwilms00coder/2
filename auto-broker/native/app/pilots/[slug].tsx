import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Linking, ScrollView, StyleSheet, View } from "react-native";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedPressable } from "@/components/ui/AnimatedPressable";
import { Callout } from "@/components/ui/Callout";
import { Card } from "@/components/ui/Card";
import { PositionChanges } from "@/components/PositionChanges";
import { Text } from "@/components/ui/Text";
import { ValueChart } from "@/components/ValueChart";
import { useTheme } from "@/hooks/useTheme";
import { radius, space } from "@/constants/theme";
import { diffFilings } from "@/lib/pilots/diff";
import { getPilot } from "@/lib/pilots/pilots";
import { fetchPilotHistory, filingIndexUrl } from "@/lib/pilots/sec-edgar";
import { FilingSnapshot } from "@/lib/pilots/types";

function usd(n: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(iso),
  );
}

export default function PilotDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const pilot = getPilot(slug);
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const [history, setHistory] = useState<FilingSnapshot[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pilot) return;
    let cancelled = false;
    fetchPilotHistory(pilot.cik, 6)
      .then((h) => !cancelled && setHistory(h))
      .catch((err) => !cancelled && setError(err instanceof Error ? err.message : "Unknown error."));
    return () => {
      cancelled = true;
    };
  }, [pilot?.cik]);

  if (!pilot) {
    return (
      <View style={[styles.center, { backgroundColor: colors.background }]}>
        <Text>Pilot not found.</Text>
      </View>
    );
  }

  const latest = history?.[0] ?? null;
  const previous = history?.[1];
  const changes = latest ? diffFilings(latest, previous) : [];
  const chartPoints = history
    ? [...history].reverse().map((h) => ({ filingDate: h.filingDate, totalValueUsd: h.totalValueUsd }))
    : [];

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ padding: space.lg, paddingBottom: insets.bottom + space.xxxl, gap: space.xl }}
    >
      <Animated.View entering={FadeInUp.duration(450)}>
        <LinearGradient
          colors={[colors.accentStrong, colors.accent, colors.accentBright]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}
        >
          <View style={styles.badge}>
            <Text variant="bodyMedium" color="#ffffff" style={{ fontSize: 11, letterSpacing: 0.4 }}>
              PILOT
            </Text>
          </View>
          <Text variant="displayLg" color="#ffffff" style={{ fontSize: 28, marginTop: space.md }}>
            {pilot.name}
          </Text>
          <Text color="#ffffffcc" style={{ marginTop: 2 }}>
            {pilot.manager}
          </Text>

          {latest && (
            <View style={{ marginTop: space.lg }}>
              <Text color="#ffffffaa" style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: 0.4 }}>
                Latest reported portfolio value
              </Text>
              <Text variant="displayLg" color="#ffffff" style={{ fontSize: 34, marginTop: 2 }}>
                {usd(latest.totalValueUsd)}
              </Text>
              <Text color="#ffffffaa" style={{ marginTop: 2, fontSize: 13 }}>
                13F-HR filed {formatDate(latest.filingDate)}
              </Text>
            </View>
          )}
        </LinearGradient>
      </Animated.View>

      <Animated.View entering={FadeInDown.delay(120).duration(350)}>
        <Callout tone="warning" title="This is information, not a recommendation">
          "Reported portfolio value" is the sum of what this filer told the
          SEC it held — it is not a performance or return figure. Form 13F
          only shows US long positions, reported up to 45 days after
          quarter-end.
        </Callout>
      </Animated.View>

      {!history && !error && (
        <View style={styles.center}>
          <ActivityIndicator color={colors.accent} />
          <Text variant="muted" style={{ marginTop: space.sm }}>
            Fetching filings from SEC EDGAR…
          </Text>
        </View>
      )}

      {error && (
        <Callout tone="warning" title="Couldn't fetch the data">
          {`SEC EDGAR returned an error: ${error}`}
        </Callout>
      )}

      {latest && (
        <>
          <Animated.View entering={FadeInDown.delay(180).duration(350)}>
            <Card>
              <Text variant="display" style={{ fontSize: 16 }}>
                Value over time
              </Text>
              <Text variant="muted" style={{ marginTop: 2, marginBottom: space.md }}>
                Reported total across the last {history?.length ?? 0} 13F-HR filings.
              </Text>
              <ValueChart points={chartPoints} />
            </Card>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(240).duration(350)}>
            <Card>
              <Text variant="display" style={{ fontSize: 16 }}>
                What changed since the last filing
              </Text>
              <Text variant="muted" style={{ marginTop: 2, marginBottom: space.md }}>
                Grouped by share count, not price.
              </Text>
              <PositionChanges changes={changes} />
            </Card>
          </Animated.View>

          <Animated.View entering={FadeInDown.delay(300).duration(350)}>
            <View style={styles.holdingsHeader}>
              <Text variant="display" style={{ fontSize: 18 }}>
                All reported positions
              </Text>
              <AnimatedPressable
                onPress={() => Linking.openURL(filingIndexUrl(pilot.cik, latest.accessionNumber))}
              >
                <Text variant="bodySemiBold" color={colors.accent}>
                  View on SEC EDGAR
                </Text>
              </AnimatedPressable>
            </View>
            <View style={[styles.holdingsList, { borderColor: colors.border }]}>
              {latest.holdings.slice(0, 25).map((h, i) => (
                <View
                  key={`${h.cusip}-${i}`}
                  style={[
                    styles.holdingRow,
                    i > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
                  ]}
                >
                  <View style={{ flex: 1 }}>
                    <Text variant="bodyMedium" numberOfLines={1}>
                      {h.issuer}
                    </Text>
                    <Text variant="muted" style={{ fontSize: 11, marginTop: 1 }}>
                      {new Intl.NumberFormat("en-GB").format(h.shares)} shares
                    </Text>
                  </View>
                  <Text variant="bodySemiBold">{usd(h.valueUsd)}</Text>
                </View>
              ))}
            </View>
          </Animated.View>
        </>
      )}

      <Animated.View entering={FadeInDown.delay(360).duration(350)}>
        <Card muted>
          <Text variant="bodySemiBold" style={{ fontSize: 12, textTransform: "uppercase", color: colors.accent }}>
            Where do we get these positions?
          </Text>
          <Text variant="muted" style={{ marginTop: space.sm, lineHeight: 19 }}>
            Every figure here comes from {pilot.name}'s own Form 13F-HR
            filings with the SEC, fetched directly from SEC EDGAR. Nothing
            is entered by hand.
          </Text>
        </Card>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: space.xxxl },
  hero: { borderRadius: radius.xl, padding: space.xl },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "#ffffff26",
    borderRadius: radius.full,
    paddingHorizontal: space.sm,
    paddingVertical: 4,
  },
  holdingsHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: space.sm,
  },
  holdingsList: { borderWidth: StyleSheet.hairlineWidth, borderRadius: radius.md, overflow: "hidden" },
  holdingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: space.md,
    padding: space.md,
  },
});
