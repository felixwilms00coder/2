import { SymbolView } from "expo-symbols";
import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { useColorScheme } from "@/components/useColorScheme";
import { palette } from "@/constants/theme";

function TabIcon({
  focused,
  ios,
  android,
}: {
  focused: boolean;
  ios: string;
  android: string;
}) {
  const scheme = useColorScheme();
  const colors = palette[scheme];
  return (
    <SymbolView
      name={{ ios, android, web: android } as never}
      tintColor={focused ? colors.accent : colors.muted}
      size={24}
    />
  );
}

export default function TabLayout() {
  const scheme = useColorScheme();
  const colors = palette[scheme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        headerStyle: { backgroundColor: colors.surface },
        headerTintColor: colors.foreground,
        headerShadowVisible: false,
        headerShown: Platform.OS !== "web",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Auto Broker",
          tabBarLabel: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} ios="house" android="home" />
          ),
        }}
      />
      <Tabs.Screen
        name="agent"
        options={{
          title: "Agent",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} ios="bolt.fill" android="flash" />
          ),
        }}
      />
      <Tabs.Screen
        name="pilots"
        options={{
          title: "Pilots",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} ios="airplane" android="airplanemode-active" />
          ),
        }}
      />
    </Tabs>
  );
}
