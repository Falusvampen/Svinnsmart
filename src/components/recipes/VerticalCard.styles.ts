import { AppTheme } from "@/constants/theme";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

// Vi definierar en typ för stilen så TypeScript blir nöjd
type VerticalCardStyles = {
  cardContainer: ViewStyle;
  imageWrapper: ViewStyle;
  image: ImageStyle;
  imageVertical: ImageStyle;
  content: ViewStyle;
  textContainer: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
};

export const createVerticalStyles = (theme: AppTheme): VerticalCardStyles => {
  const colors = theme.colors;

  return StyleSheet.create({
    cardContainer: {
      width: "100%",
      marginBottom: theme.spacing.lg,
      backgroundColor: "transparent", // Full-bleed bild, ingen surface-bakgrund
    },
    imageWrapper: {
      position: "relative",
      borderRadius: theme.radius.lg,
      overflow: "hidden",
      backgroundColor: colors.muted, // Placeholder-färg från theme
      ...theme.elevation.mid, // Använd theme-elevation för konsistens
    },
    image: {
      width: "100%",
    },
    imageVertical: {
      height: 220, // Bevarad visuell höjd – kan göras responsiv senare
      resizeMode: "cover",
    },
    content: {
      marginTop: theme.spacing.sm,
      flexDirection: "column",
    },
    textContainer: {
      marginBottom: theme.spacing.xs,
    },
    title: {
      fontSize: theme.typography.fontSizes.lg,
      fontWeight: theme.typography.fontWeights.bold as any,
      color: colors.text,
      marginBottom: theme.spacing.xs,
      letterSpacing: 0.5,
    },
    subtitle: {
      fontSize: theme.typography.fontSizes.md,
      color: colors.textMuted,
      fontWeight: theme.typography.fontWeights.regular as any,
      lineHeight: theme.typography.lineHeights.md,
    },
  });
};
