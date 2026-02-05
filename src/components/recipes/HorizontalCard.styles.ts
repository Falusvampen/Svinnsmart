import { AppTheme } from "@/constants/theme";
import { StyleSheet } from "react-native";
import { createStyles as createBaseStyles } from "./RecipeCard.styles";

export const createHorizontalStyles = (theme: AppTheme) => {
  const base = createBaseStyles(theme) as any;

  return StyleSheet.create({
    ...base,
    cardContainerHorizontal: {
      flexDirection: "row",
      alignItems: "stretch",
      height: 120,
    },
    imageHorizontal: {
      width: 120,
      height: "100%",
    },
    contentHorizontal: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },
  });
};
