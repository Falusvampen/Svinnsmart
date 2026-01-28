import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function ShoppingTab() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello World — Shopping Tab</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { fontSize: 18 },
});
