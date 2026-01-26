import { Stack } from "expo-router";
import { ThemeProvider } from "../src/components/ThemeProvider";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack />
    </ThemeProvider>
  );
}
