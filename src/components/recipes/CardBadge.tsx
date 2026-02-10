import { useTheme } from "@/context/ThemeProvider";
import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { createStyles } from "./RecipeCard.styles";

const CardBadge = ({ badge }: { badge?: string }) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  if (!badge) return null;

  const isCookable = badge === "Kan lagas!";
  const badgeStyle = [
    styles.badge,
    {
      backgroundColor: isCookable ? theme.colors.success : theme.colors.surface,
    },
  ];

  const textColor = isCookable
    ? theme.getContrastText(theme.colors.success)
    : theme.colors.accent;

  const textStyle = [styles.badgeText, { color: textColor }];

  return (
    <View style={badgeStyle}>
      <Text style={textStyle}>{badge.toUpperCase()}</Text>
    </View>
  );
};

export default CardBadge;
