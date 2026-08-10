// Same palette as the web app's src/app/globals.css, ported to RN values.
export type ThemeColors = {
  background: string;
  foreground: string;
  surface: string;
  surfaceMuted: string;
  border: string;
  muted: string;
  accent: string;
  accentStrong: string;
  accentSoft: string;
  accentBright: string;
  accentContrast: string;
  positive: string;
  positiveLight: string;
  warning: string;
  warningLight: string;
  danger: string;
  dangerLight: string;
};

export const palette: Record<"light" | "dark", ThemeColors> = {
  light: {
    background: "#f8fafc",
    foreground: "#0f172a",
    surface: "#ffffff",
    surfaceMuted: "#f1f5f9",
    border: "#e2e8f0",
    muted: "#475569",
    accent: "#0d9488",
    accentStrong: "#0f766e",
    accentSoft: "#ccfbf1",
    accentBright: "#2dd4bf",
    accentContrast: "#ffffff",
    positive: "#0d9488",
    positiveLight: "#ccfbf1",
    warning: "#92400e",
    warningLight: "#fef3e2",
    danger: "#b91c1c",
    dangerLight: "#fee2e2",
  },
  dark: {
    background: "#0b1120",
    foreground: "#f1f5f9",
    surface: "#111827",
    surfaceMuted: "#1a2333",
    border: "#2a3446",
    muted: "#b0b8c6",
    accent: "#2dd4bf",
    accentStrong: "#5eead4",
    accentSoft: "#0f2e2c",
    accentBright: "#2dd4bf",
    accentContrast: "#06282a",
    positive: "#2dd4bf",
    positiveLight: "#0f2e2c",
    warning: "#e8ab63",
    warningLight: "#2b1f12",
    danger: "#f87171",
    dangerLight: "#3a1414",
  },
};

export const fonts = {
  body: "Inter_400Regular",
  bodyMedium: "Inter_500Medium",
  bodySemiBold: "Inter_600SemiBold",
  bodyBold: "Inter_700Bold",
  display: "PlusJakartaSans_700Bold",
  displayExtraBold: "PlusJakartaSans_800ExtraBold",
};

export const space = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
};

export const radius = {
  sm: 10,
  md: 16,
  lg: 24,
  xl: 28,
  full: 999,
};
