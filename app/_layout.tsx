import { HomeScreen } from "@/screens";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen options={{ title: "Login" }} name="LoginScreen" />
    </Stack>
  );
}
