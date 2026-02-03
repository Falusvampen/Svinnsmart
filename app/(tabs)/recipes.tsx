import {
  AllRecipesSection,
  FeaturedSection,
  QuickPicksSection,
  RecipeHero,
} from "@/components/recipes";
import { ThemedView } from "@/components/ui/ThemedView";
import recipes from "@/data/recipes.json";
import type { Recipe } from "@/models/recipe";
import React from "react";
import { ScrollView } from "react-native";

export default function RecipesScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <RecipeHero />

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <FeaturedSection
          items={recipes.filter((r) => r.mode === "square") as Recipe[]}
        />
        <QuickPicksSection
          items={recipes.filter((r) => r.mode === "horizontal") as Recipe[]}
        />
        <AllRecipesSection
          items={
            recipes.filter(
              (r) => (r.mode ?? "vertical") === "vertical",
            ) as Recipe[]
          }
        />
      </ScrollView>
    </ThemedView>
  );
}
