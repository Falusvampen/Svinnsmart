import { AppTheme } from "@/constants/theme";
import { StyleSheet } from "react-native";
import { createStyles as createBaseStyles } from "./RecipeCard.styles";

export const createSquareStyles = (theme: AppTheme) => {
  const base = createBaseStyles(theme) as any;

  return StyleSheet.create({
    ...base,
    cardContainerSquare: {
      aspectRatio: 0.85,
    },

    // Bilden täcker allt
    imageWrapper: {
      ...base.imageWrapper,
      height: "100%",
    },
    imageSquare: {
      height: "100%",
    },

    // Flytande etikett
    contentSquare: {
      position: "absolute",
      bottom: 8,
      left: 8,
      right: 8,
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.md,
      paddingVertical: 6,
      paddingHorizontal: 8,
      // Skugga
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 3,
      justifyContent: "center",
    },

    // Titel
    title: {
      ...base.title,
      fontSize: theme.typography.fontSizes.sm, // Lite mindre för att få plats
      marginBottom: 2,
    },

    // --- NYA KOMPAKTA STILAR ---
    compactMetaRow: {
      flexDirection: "row",
      alignItems: "center",
      // justifyContent: "space-between", // Alternativt "flex-start" om du vill ha dem till vänster
    },
    compactMetaItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 2, // Litet avstånd mellan ikon och siffra
    },
    compactMetaText: {
      fontSize: theme.typography.fontSizes.xs, // Liten text
      color: theme.colors.textMuted,
      fontWeight: theme.typography.fontWeights.medium,
    },
    compactDot: {
      width: 2,
      height: 2,
      borderRadius: 1,
      backgroundColor: theme.colors.textMuted,
      marginHorizontal: theme.spacing.sm, // Avstånd mellan grupperna
      opacity: 0.5,
    },
  });
};
