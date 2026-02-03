import { Hero } from "@/components/Hero"; // Justera importväg
import { ThemedView } from "@/components/ui/ThemedView";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

export default function RecipesScreen() {
  const { theme } = useTheme();

  return (
    <ThemedView style={{ flex: 1 }}>
      {/* Vår nya Hero */}
      <Hero message="Mm, jag är sugen på något gott! Vad har vi hemma?">
        {/* Exempel på innehåll: Ett sökfält */}
        <View
          style={[
            styles.searchContainer,
            { backgroundColor: theme.colors.surface },
          ]}
        >
          <Ionicons
            name="search"
            size={20}
            color={theme.colors.textMuted}
            style={{ marginRight: 8 }}
          />
          <TextInput
            placeholder="Sök recept eller ingrediens..."
            placeholderTextColor={theme.colors.textMuted}
            style={{ flex: 1, color: theme.colors.text }}
          />
        </View>
      </Hero>

      {/* Resten av sidans innehåll */}
      <View style={{ padding: 20 }}>{/* ... Receptlistor osv ... */}</View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
    // Lägg till skugga om man vill
  },
});
