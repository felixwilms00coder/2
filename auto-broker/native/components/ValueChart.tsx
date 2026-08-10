import { Fragment, useMemo, useRef, useState } from "react";
import { LayoutChangeEvent, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Svg, {
  Circle,
  Defs,
  Line,
  LinearGradient,
  Path,
  Stop,
  Text as SvgText,
} from "react-native-svg";
import * as Haptics from "expo-haptics";
import { useTheme } from "@/hooks/useTheme";
import { space } from "@/constants/theme";
import { Text } from "./ui/Text";

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

type Point = { filingDate: string; totalValueUsd: number };

const HEIGHT = 220;
const PAD_TOP = 18;
const PAD_BOTTOM = 26;
const PAD_X = 6;

function compactUsd(n: number): string {
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
  return `$${n.toFixed(0)}`;
}

function formatQuarter(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", { month: "short", year: "numeric" }).format(
    new Date(iso),
  );
}

export function ValueChart({ points }: { points: Point[] }) {
  const { colors } = useTheme();
  const [width, setWidth] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const reveal = useSharedValue(0);

  const onLayout = (e: LayoutChangeEvent) => {
    const w = e.nativeEvent.layout.width;
    if (w > 0 && w !== width) {
      setWidth(w);
      reveal.value = 0;
      reveal.value = withTiming(1, { duration: 650 });
    }
  };

  const { linePath, areaPath, coords, min, max } = useMemo(() => {
    if (width === 0 || points.length < 2) {
      return { linePath: "", areaPath: "", coords: [] as { x: number; y: number }[], min: 0, max: 0 };
    }
    const values = points.map((p) => p.totalValueUsd);
    const rawMin = Math.min(...values);
    const rawMax = Math.max(...values);
    const span = rawMax - rawMin || rawMax || 1;
    const min = Math.max(0, rawMin - span * 0.1);
    const max = rawMax + span * 0.1;

    const innerW = width - PAD_X * 2;
    const innerH = HEIGHT - PAD_TOP - PAD_BOTTOM;

    const coords = points.map((p, i) => {
      const x = points.length === 1 ? PAD_X + innerW / 2 : PAD_X + (i / (points.length - 1)) * innerW;
      const y = PAD_TOP + innerH - ((p.totalValueUsd - min) / (max - min)) * innerH;
      return { x, y };
    });

    const linePath = coords.map((c, i) => `${i === 0 ? "M" : "L"} ${c.x.toFixed(1)} ${c.y.toFixed(1)}`).join(" ");
    const baseline = PAD_TOP + innerH;
    const areaPath = `${linePath} L ${coords[coords.length - 1].x.toFixed(1)} ${baseline} L ${coords[0].x.toFixed(1)} ${baseline} Z`;

    return { linePath, areaPath, coords, min, max };
  }, [points, width]);

  const lastHoverRef = useRef(-1);

  // Runs on the JS thread (via runOnJS below), not a worklet: the nearest-
  // point lookup and the haptic call both need JS-thread APIs, and at touch
  // event frequency there is no perceptible cost to doing it here rather
  // than on the UI thread.
  function updateHoverOnJs(x: number) {
    if (coords.length === 0) return;
    let nearest = 0;
    let nearestDist = Infinity;
    for (let i = 0; i < coords.length; i++) {
      const dist = Math.abs(coords[i].x - x);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = i;
      }
    }
    if (nearest !== lastHoverRef.current) {
      lastHoverRef.current = nearest;
      Haptics.selectionAsync();
    }
    setHoverIndex(nearest);
  }

  const pan = Gesture.Pan()
    .onBegin((e) => runOnJS(updateHoverOnJs)(e.x))
    .onUpdate((e) => runOnJS(updateHoverOnJs)(e.x))
    .onFinalize(() => runOnJS(setHoverIndex)(null));

  const lineAnimatedProps = useAnimatedProps(() => ({
    opacity: reveal.value,
  }));
  const areaAnimatedProps = useAnimatedProps(() => ({
    opacity: reveal.value * 0.9,
  }));
  const endMarkerStyle = useAnimatedStyle(() => ({
    opacity: reveal.value,
    transform: [{ scale: withSpring(reveal.value, { damping: 10, stiffness: 180 }) }],
  }));

  if (points.length < 2) {
    return (
      <Text variant="muted">Not enough filing history yet to chart a trend.</Text>
    );
  }

  const hovered = hoverIndex !== null ? points[hoverIndex] : null;
  const hoveredCoord = hoverIndex !== null ? coords[hoverIndex] : null;
  const latest = points[points.length - 1];
  const latestCoord = coords[coords.length - 1];

  return (
    <View onLayout={onLayout}>
      {width > 0 && (
        <GestureDetector gesture={pan}>
          <View>
            <Svg width={width} height={HEIGHT}>
              <Defs>
                <LinearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
                  <Stop offset="0%" stopColor={colors.accent} stopOpacity={0.16} />
                  <Stop offset="100%" stopColor={colors.accent} stopOpacity={0.02} />
                </LinearGradient>
              </Defs>

              {[0, 0.5, 1].map((t) => {
                const y = PAD_TOP + t * (HEIGHT - PAD_TOP - PAD_BOTTOM);
                const value = max - t * (max - min);
                return (
                  <Fragment key={t}>
                    <Line x1={PAD_X} x2={width - PAD_X} y1={y} y2={y} stroke={colors.border} strokeWidth={1} />
                    <SvgText x={PAD_X} y={y - 4} fontSize={10} fill={colors.muted}>
                      {compactUsd(value)}
                    </SvgText>
                  </Fragment>
                );
              })}

              <AnimatedPath d={areaPath} fill="url(#fade)" stroke="none" animatedProps={areaAnimatedProps} />
              <AnimatedPath
                d={linePath}
                fill="none"
                stroke={colors.accent}
                strokeWidth={2.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                animatedProps={lineAnimatedProps}
              />

              {hoveredCoord && (
                <>
                  <Line
                    x1={hoveredCoord.x}
                    x2={hoveredCoord.x}
                    y1={PAD_TOP}
                    y2={HEIGHT - PAD_BOTTOM}
                    stroke={colors.muted}
                    strokeWidth={1}
                    strokeDasharray="3,4"
                  />
                  <AnimatedCircle
                    cx={hoveredCoord.x}
                    cy={hoveredCoord.y}
                    r={5.5}
                    fill={colors.accent}
                    stroke={colors.surface}
                    strokeWidth={2}
                  />
                </>
              )}

              {points.map((p, i) =>
                i === 0 || i === points.length - 1 || i === hoverIndex ? (
                  <SvgText
                    key={p.filingDate}
                    x={coords[i].x}
                    y={HEIGHT - 8}
                    fontSize={10}
                    fill={colors.muted}
                    textAnchor={i === 0 ? "start" : i === points.length - 1 ? "end" : "middle"}
                  >
                    {formatQuarter(p.filingDate)}
                  </SvgText>
                ) : null,
              )}
            </Svg>

            <Animated.View
              style={[
                { position: "absolute", left: Math.min(latestCoord.x + 8, width - 70), top: Math.max(latestCoord.y - 26, 0) },
                endMarkerStyle,
              ]}
              pointerEvents="none"
            >
              <Text variant="bodySemiBold">{compactUsd(latest.totalValueUsd)}</Text>
            </Animated.View>
          </View>
        </GestureDetector>
      )}

      <Text variant="bodySemiBold" style={{ marginTop: space.sm, minHeight: 20 }}>
        {hovered ? `${formatQuarter(hovered.filingDate)}: ${compactUsd(hovered.totalValueUsd)}` : " "}
      </Text>
    </View>
  );
}
