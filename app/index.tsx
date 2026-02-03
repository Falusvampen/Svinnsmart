import { Redirect } from "expo-router";

export default function Index() {
  // Här kan vi ha en sista säkerhetskoll,
  // men oftast räcker det med att peka mot (tabs)
  // Layouten i _layout.tsx kommer ändå blockera (tabs) om man är utloggad.
  return <Redirect href="/(tabs)" />;
}
