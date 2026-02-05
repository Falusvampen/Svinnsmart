import React, { useMemo } from "react";
import HorizontalCard from "./HorizontalCard";
import { RecipeCardProps } from "./RecipeCard.types";
import SquareCard from "./SquareCard";
import VerticalCard from "./VerticalCard";

// --- HUVUDKOMPONENT (WRAPPER) ---
export const RecipeCard: React.FC<RecipeCardProps> = (props) => {
  const {
    variant = "vertical",
    ingredients = [],
    userPantry = [],
    badge,
  } = props;

  // --- LOGIK: Beräkna badge ---
  const displayBadge = useMemo(() => {
    if (ingredients.length === 0 || userPantry.length === 0) return badge;

    const pantryLower = userPantry.map((p) => p.toLowerCase());
    const matchingIngredients = ingredients.filter((ing) =>
      pantryLower.includes(ing.item.toLowerCase()),
    );

    if (
      matchingIngredients.length === ingredients.length &&
      ingredients.length > 0
    ) {
      return "Kan lagas!";
    }
    return badge;
  }, [badge, ingredients, userPantry]);

  // --- LOGIK: Välj komponent ---
  const propsWithBadge = { ...props, displayBadge };

  switch (variant) {
    case "horizontal":
      return <HorizontalCard {...propsWithBadge} />;
    case "square":
      return <SquareCard {...propsWithBadge} />;
    case "vertical":
    default:
      return <VerticalCard {...propsWithBadge} />;
  }
};

export default RecipeCard;
