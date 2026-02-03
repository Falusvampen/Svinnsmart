import React from "react";
import { View } from "react-native";
import { Hero } from "../../src/components/Hero";
import ShoppingListManager from "../../src/components/shopping/ShoppingListManager";
import { ThemedText } from "../../src/components/ui/ThemedText";
import { ThemedView } from "../../src/components/ui/ThemedView";

export default function ShoppingTab() {
  return (
    <ThemedView>
      <Hero message="Handla smart — skapa och hantera dina inköpslistor">
        <View style={{ marginTop: 6 }}>
          <ThemedText variant="muted">
            Snabbsök eller skapa en ny lista nedan
          </ThemedText>
        </View>
      </Hero>

      <ShoppingListManager />
    </ThemedView>
  );
}
