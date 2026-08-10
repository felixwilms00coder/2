import { Text as RNText, TextProps } from "react-native";
import { useTheme } from "@/hooks/useTheme";
import { fonts } from "@/constants/theme";

type Variant = "body" | "bodyMedium" | "bodySemiBold" | "muted" | "display" | "displayLg";

export function Text({
  variant = "body",
  color,
  style,
  ...props
}: TextProps & { variant?: Variant; color?: string }) {
  const { colors } = useTheme();

  const variantStyle = {
    body: { fontFamily: fonts.body, fontSize: 15, color: colors.foreground },
    bodyMedium: { fontFamily: fonts.bodyMedium, fontSize: 15, color: colors.foreground },
    bodySemiBold: { fontFamily: fonts.bodySemiBold, fontSize: 15, color: colors.foreground },
    muted: { fontFamily: fonts.body, fontSize: 13, color: colors.muted },
    display: { fontFamily: fonts.display, fontSize: 20, color: colors.foreground },
    displayLg: { fontFamily: fonts.displayExtraBold, fontSize: 32, color: colors.foreground },
  }[variant];

  return <RNText {...props} style={[variantStyle, color ? { color } : null, style]} />;
}
