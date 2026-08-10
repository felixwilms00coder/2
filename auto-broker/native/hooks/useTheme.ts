import { useColorScheme } from "@/components/useColorScheme";
import { palette, ThemeColors } from "@/constants/theme";

export function useTheme(): { colors: ThemeColors; scheme: "light" | "dark" } {
  const scheme = useColorScheme();
  return { colors: palette[scheme], scheme };
}
