import { Recipe } from "@/models/recipe";
import React from "react";
import { View } from "react-native";
import RecipeCard from "./RecipeCard";
import RecipeSection from "./RecipeSection";

type Props = {
  items: Recipe[];
};

const QuickPicksSection: React.FC<Props> = ({ items }) => {
  return (
    <RecipeSection title="Quick picks" horizontal>
      {items.map((r) => (
        <View key={r.id} style={{ marginRight: 12 }}>
          <RecipeCard
            title={r.title}
            subtitle={r.subtitle}
            image={r.image}
            mode="horizontal"
            duration={r.duration}
            servings={r.servings}
          />
        </View>
      ))}
    </RecipeSection>
  );
};

export default QuickPicksSection;
