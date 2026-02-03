import Gradient from "@/components/ui/Gradient";
import { ThemedText } from "@/components/ui/ThemedText";
import { makeStyles } from "@/hooks/makeStyles";
import React from "react";
import {
  GestureResponderEvent,
  Image,
  ImageBackground,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  View,
  ViewStyle,
} from "react-native";

type Mode = "vertical" | "horizontal" | "square";

export type RecipeCardProps = {
  title: string;
  subtitle?: string;
  image?: string | ImageSourcePropType;
  duration?: string; // ex. "25 min"
  servings?: number;
  mode?: Mode;
  onPress?: (e: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  badge?: string;
};

/**
 * RecipeCard - en dumb/ren presentational komponent för recept-kort.
 * Stöder tre lägen: vertical, horizontal och square.
 * Kommentarer: Förklara komplex logik på svenska.
 */
const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    overflow: "hidden",
    // En mild elevation för att få kortet att sticka ut
    ...theme.elevation.low,
  },
  horizontal: {
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing.sm,
  },
  vertical: {
    width: 200,
  },
  square: {
    width: 160,
    height: 160,
  },
  imageVertical: {
    width: "100%",
    height: 120,
  },
  imageHorizontal: {
    width: 96,
    height: 96,
    borderRadius: 8,
    marginRight: theme.spacing.sm,
  },
  imageSquare: {
    width: "100%",
    height: "100%",
  },
  content: {
    padding: theme.spacing.sm,
  },
  title: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: theme.typography.fontWeights.medium as any,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.fontSizes.sm,
    color: theme.colors.textMuted,
    marginBottom: theme.spacing.xs,
  },
  metaRow: {
    flexDirection: "row",
    gap: theme.spacing.sm as any,
    alignItems: "center",
  },
  badge: {
    position: "absolute",
    top: theme.spacing.sm,
    left: theme.spacing.sm,
    backgroundColor: theme.colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: theme.radius.sm,
  },
  badgeText: {
    color: theme.getContrastText(theme.colors.primary),
    fontSize: theme.typography.fontSizes.xs,
  },
  overlayText: {
    position: "absolute",
    left: theme.spacing.sm,
    right: theme.spacing.sm,
    bottom: theme.spacing.sm,
  },
}));

const RecipeCard: React.FC<RecipeCardProps> = ({
  title,
  subtitle,
  image,
  duration,
  servings,
  mode = "vertical",
  onPress,
  style,
  badge,
}) => {
  const styles = useStyles();

  const resolveImageSource =
    typeof image === "string"
      ? { uri: image }
      : (image as ImageSourcePropType | undefined);

  if (mode === "square") {
    return (
      <Pressable
        onPress={onPress}
        style={[styles.container, styles.square, style]}
      >
        <ImageBackground
          source={resolveImageSource}
          resizeMode="cover"
          style={styles.imageSquare}
        >
          {/* Gradient för läsbar text ovanpå bilden */}
          <Gradient variant="hero" style={{ flex: 1 }}>
            {badge ? (
              <View style={styles.badge}>
                <ThemedText style={styles.badgeText}>{badge}</ThemedText>
              </View>
            ) : null}
            <View style={styles.overlayText}>
              <ThemedText variant="title" style={{ color: "white" }}>
                {title}
              </ThemedText>
              {subtitle ? (
                <ThemedText
                  variant="muted"
                  style={{ color: "rgba(255,255,255,0.9)" }}
                >
                  {subtitle}
                </ThemedText>
              ) : null}
            </View>
          </Gradient>
        </ImageBackground>
      </Pressable>
    );
  }

  if (mode === "horizontal") {
    return (
      <Pressable
        onPress={onPress}
        style={[styles.container, styles.horizontal, style]}
      >
        {resolveImageSource ? (
          <Image
            source={resolveImageSource}
            style={styles.imageHorizontal}
            resizeMode="cover"
          />
        ) : null}
        <View style={styles.content}>
          <ThemedText style={styles.title} numberOfLines={2}>
            {title}
          </ThemedText>
          {subtitle ? (
            <ThemedText
              variant="muted"
              style={styles.subtitle}
              numberOfLines={1}
            >
              {subtitle}
            </ThemedText>
          ) : null}
          <View style={styles.metaRow}>
            {duration ? (
              <ThemedText variant="muted">{duration}</ThemedText>
            ) : null}
            {servings ? (
              <ThemedText variant="muted">{servings} pers</ThemedText>
            ) : null}
          </View>
        </View>
      </Pressable>
    );
  }

  // Default: vertical
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, styles.vertical, style]}
    >
      {resolveImageSource ? (
        <Image
          source={resolveImageSource}
          style={styles.imageVertical}
          resizeMode="cover"
        />
      ) : null}
      <View style={styles.content}>
        <ThemedText style={styles.title}>{title}</ThemedText>
        {subtitle ? (
          <ThemedText variant="muted" style={styles.subtitle}>
            {subtitle}
          </ThemedText>
        ) : null}
        <View style={styles.metaRow}>
          {duration ? (
            <ThemedText variant="muted">{duration}</ThemedText>
          ) : null}
          {servings ? (
            <ThemedText variant="muted">{servings} pers</ThemedText>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
};

export default RecipeCard;
