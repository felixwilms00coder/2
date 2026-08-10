import { Link, Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Text } from "@/components/ui/Text";
import { useTheme } from "@/hooks/useTheme";
import { space } from "@/constants/theme";

export default function NotFoundScreen() {
  const { colors } = useTheme();
  return (
    <>
      <Stack.Screen options={{ title: "Oops!" }} />
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Text variant="display">This screen doesn't exist.</Text>
        <Link href="/" style={styles.link}>
          <Text variant="bodySemiBold" color={colors.accent}>
            Go to home screen
          </Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center", padding: space.xl },
  link: { marginTop: space.lg },
});
