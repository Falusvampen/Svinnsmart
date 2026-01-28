import React from "react";
import { StyleSheet, Text } from "react-native";
import { ThemedView } from "../../src/components/ui/ThemedView";

export default function ShoppingTab() {
  return (
    <ThemedView style={styles.container}>
      <Text style={styles.text}>Hello World — Shopping Tab</Text>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18 },
});
