import { AuthProvider, useAuth } from "@/context/AuthContext";
import { ThemeProvider } from "@/context/ThemeProvider";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

// app/_layout.tsx

function NavigationLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) return null;

  return (
    // Genom att sätta en key baserad på user-objektets existens
    // tvingar vi fram en total refresh av navigationen vid in/ut-loggning.
    <Stack
      key={user ? "authenticated" : "unauthenticated"}
      screenOptions={{ headerShown: false }}
    >
      {user ? <Stack.Screen name="(tabs)" /> : <Stack.Screen name="(auth)" />}
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider>
          <NavigationLayout />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
