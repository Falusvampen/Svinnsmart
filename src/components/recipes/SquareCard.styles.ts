import { AppTheme } from "@/constants/theme";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

type SquareCardStyles = {
  cardContainer: ViewStyle;
  cardContainerSquare: ViewStyle;
  imageWrapper: ViewStyle;
  image: ImageStyle;
  imageSquare: ImageStyle;
  contentSquare: ViewStyle;
  title: TextStyle;
  compactMetaRow: ViewStyle;
  compactMetaItem: ViewStyle;
  compactMetaText: TextStyle;
  compactDot: ViewStyle;
  subtitle: TextStyle;
};

export const createSquareStyles = (theme: AppTheme): SquareCardStyles => {
  const colors = theme.colors;

  return StyleSheet.create({
    // --- CONTAINER ---
    cardContainer: {
      backgroundColor: "transparent",
    },
    cardContainerSquare: {
      width: "100%",
      marginBottom: theme.spacing.md,
    },

    // --- BILD (Kvadratisk) ---
    imageWrapper: {
      width: "100%",
      aspectRatio: 1,
      borderRadius: theme.radius.md,
      overflow: "hidden",
      position: "relative",
      backgroundColor: colors.muted,
      ...theme.elevation.low,
    },
    image: {
      width: "100%",
      height: "100%",
    },
    imageSquare: {
      resizeMode: "cover",
    },

    // --- INNEHÅLL ---
    contentSquare: {
      marginTop: theme.spacing.sm,
      paddingHorizontal: theme.spacing.xs,
    },
    title: {
      fontSize: theme.typography.fontSizes.sm,
      fontWeight: theme.typography.fontWeights.bold as any,
      color: colors.text,
      marginBottom: theme.spacing.xs,
    },
    subtitle: {
      fontSize: theme.typography.fontSizes.xs,
      color: colors.textMuted,
    },

    // --- KOMPAKT META INFO (Ikoner + Text) ---
    compactMetaRow: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: theme.spacing.xs,
    },
    compactMetaItem: {
      flexDirection: "row",
      alignItems: "center",
      gap: 4,
    },
    compactMetaText: {
      fontSize: theme.typography.fontSizes.xs,
      fontWeight: theme.typography.fontWeights.medium as any,
      color: colors.textMuted,
      marginLeft: 2,
    },
    compactDot: {
      width: 3,
      height: 3,
      borderRadius: 1.5,
      backgroundColor: colors.border,
      marginHorizontal: theme.spacing.sm,
    },
  });
};
