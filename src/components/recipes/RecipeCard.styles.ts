import { AppTheme } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const createStyles = (theme: AppTheme) =>
  StyleSheet.create({
    // Base Container
    cardContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: theme.radius.lg,
      ...theme.elevation.low,
      shadowColor: theme.colors.shadow,
      overflow: "hidden",
      marginBottom: theme.spacing.md,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    // Image Styles (shared)
    imageWrapper: {
      position: "relative",
      overflow: "hidden",
    },
    image: {
      width: "100%",
      resizeMode: "cover",
    },

    // Badge
    badge: {
      position: "absolute",
      top: theme.spacing.sm,
      left: theme.spacing.sm,
      backgroundColor: theme.colors.surface,
      paddingHorizontal: theme.spacing.sm,
      paddingVertical: 4,
      borderRadius: theme.radius.sm,
      elevation: 2,
      shadowColor: theme.colors.shadow,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
    },
    badgeText: {
      fontSize: 10,
      fontWeight: theme.typography.fontWeights.bold as any,
      color: theme.colors.accent,
      letterSpacing: 0.5,
    },

    // Content Styles
    content: {
      padding: theme.spacing.md,
      flex: 1,
      justifyContent: "space-between",
    },
    contentHorizontal: {
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.md,
    },
    contentSquare: {
      padding: theme.spacing.sm,
    },

    // Typography & Meta
    textContainer: {
      marginBottom: theme.spacing.xs,
    },
    title: {
      fontSize: theme.typography.fontSizes.md,
      fontWeight: theme.typography.fontWeights.medium as any,
      color: theme.colors.text,
      lineHeight: theme.typography.lineHeights.md,
      marginBottom: 2,
    },
    subtitle: {
      fontSize: theme.typography.fontSizes.xs,
      color: theme.colors.textMuted,
    },
    metaContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginTop: "auto",
    },
    metaItem: {
      flexDirection: "row",
      alignItems: "center",
    },
    metaText: {
      marginLeft: 4,
      fontSize: theme.typography.fontSizes.xs,
      color: theme.colors.textMuted,
      fontWeight: theme.typography.fontWeights.medium as any,
    },
    metaDivider: {
      width: 4,
      height: 4,
      borderRadius: 2,
      backgroundColor: theme.colors.border,
      marginHorizontal: theme.spacing.sm,
    },
  });
