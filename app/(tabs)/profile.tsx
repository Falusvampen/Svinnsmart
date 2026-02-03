import { ThemedButton } from "@/components/ui/ThemedButton";
import { ThemedView } from "@/components/ui/ThemedView";
import React from "react";
import { StyleSheet, Text } from "react-native";

import { useAuth } from "@/context/AuthContext";

export default function ProfileTab() {
  const { logout } = useAuth();
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.text}>Hello World — Profile Tab</Text>
      <ThemedButton title="Logga ut" onPress={logout} />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18 },
});
