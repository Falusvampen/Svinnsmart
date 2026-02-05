import { AppTheme } from "@/constants/theme";
import { StyleSheet } from "react-native";
import { createStyles as createBaseStyles } from "./RecipeCard.styles";

export const createVerticalStyles = (theme: AppTheme) => {
  const base = createBaseStyles(theme) as any;

  return StyleSheet.create({
    ...base,
    imageVertical: {
      height: 180,
    },
  });
};
