import React from "react";
import { View, ViewProps, ViewStyle } from "react-native";
import { useTheme } from "../../hooks/useTheme"; // Eller din exportväg

type Props = ViewProps & {
  // Välj vilken typ av bakgrund du vill ha
  variant?: "background" | "surface" | "muted" | "transparent";
  // En shortcut för padding (valfritt, men sparar mycket tid)
  padded?: boolean;
};

export const ThemedView: React.FC<Props> = ({
  style,
  variant = "background",
  padded = false,
  children,
  ...rest
}) => {
  const { theme } = useTheme();

  // Mappa variant till faktiska färger
  const backgroundColor =
    variant === "transparent"
      ? "transparent"
      : variant === "surface"
        ? theme.colors.surface
        : variant === "muted"
          ? theme.colors.muted
          : theme.colors.background;

  const baseStyle: ViewStyle = {
    backgroundColor,
    // Om padded är true, använd din standard-spacing
    padding: padded ? theme.spacing.md : 0,
    flex: 1, // Ofta vill man att huvudvyn ska ta upp hela skärmen
  };

  return (
    <View style={[baseStyle, style]} {...rest}>
      {children}
    </View>
  );
};

export default ThemedView;
