import { AppTheme } from "@/constants/theme";
import { ImageStyle, StyleSheet, TextStyle, ViewStyle } from "react-native";

// Vi definierar typerna för att matcha de nycklar du använder i komponenten
type HorizontalCardStyles = {
  cardContainer: ViewStyle;
  cardContainerHorizontal: ViewStyle;
  imageWrapper: ViewStyle;
  image: ImageStyle;
  imageHorizontal: ImageStyle;
  content: ViewStyle;
  contentHorizontal: ViewStyle;
  textContainer: ViewStyle;
  title: TextStyle;
  subtitle: TextStyle;
};

export const createHorizontalStyles = (
  theme: AppTheme,
): HorizontalCardStyles => {
  const colors = theme.colors;

  return StyleSheet.create({
    // --- CONTAINER ---
    cardContainer: {
      marginBottom: theme.spacing.md,
      backgroundColor: "transparent", // Genomskinlig bakgrund enligt önskemål
    },
    // Specifik layout för horisontellt läge
    cardContainerHorizontal: {
      flexDirection: "row",
      alignItems: "center",
      width: "100%",
    },

    // --- BILD ---
    imageWrapper: {
      height: 100, // Fast höjd för list-vy
      width: 100,
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
    imageHorizontal: {
      resizeMode: "cover",
    },

    // --- INNEHÅLL (TEXT) ---
    content: {
      flex: 1,
    },
    contentHorizontal: {
      marginLeft: theme.spacing.md,
      justifyContent: "center",
      paddingRight: theme.spacing.sm,
    },
    textContainer: {
      marginBottom: theme.spacing.xs,
    },
    title: {
      fontSize: theme.typography.fontSizes.md,
      fontWeight: theme.typography.fontWeights.bold as any,
      color: colors.text,
      marginBottom: theme.spacing.xs,
      lineHeight: theme.typography.lineHeights.sm,
    },
    subtitle: {
      fontSize: theme.typography.fontSizes.sm,
      color: colors.textMuted,
      fontWeight: theme.typography.fontWeights.regular as any,
      marginBottom: theme.spacing.xs,
    },
  });
};
