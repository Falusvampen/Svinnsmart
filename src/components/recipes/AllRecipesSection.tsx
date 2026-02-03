import { Recipe } from "@/models/recipe";
import React from "react";
import { View } from "react-native";
import RecipeCard from "./RecipeCard";
import RecipeSection from "./RecipeSection";

type Props = {
  items: Recipe[];
};

const AllRecipesSection: React.FC<Props> = ({ items }) => {
  return (
    <RecipeSection title="All recipes">
      <View style={{ marginTop: 12, flexDirection: "row", flexWrap: "wrap" }}>
        {items.map((r) => (
          <View key={r.id} style={{ marginRight: 12, marginBottom: 12 }}>
            <RecipeCard
              title={r.title}
              subtitle={r.subtitle}
              image={r.image}
              mode="vertical"
              duration={r.duration}
              servings={r.servings}
            />
          </View>
        ))}
      </View>
    </RecipeSection>
  );
};

export default AllRecipesSection;
