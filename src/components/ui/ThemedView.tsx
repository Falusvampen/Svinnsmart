import { useTheme } from "@/hooks/useTheme"; // Eller din exportväg
import React from "react";
import { View, ViewProps, ViewStyle } from "react-native";

type Props = ViewProps & {
  // Välj vilken typ av bakgrund du vill ha
  variant?: "background" | "surface" | "muted" | "transparent";
  // En shortcut för padding (valfritt, men sparar mycket tid)
  padded?: boolean;
  // Om true, komponenten fyller utrymmet (flex:1). Sätt false för inline- eller begränsade vyer.
  fill?: boolean;
};

export const ThemedView: React.FC<Props> = ({
  style,
  variant = "background",
  padded = false,
  fill = true,
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
    ...(fill ? { flex: 1 } : {}),
  };

  return (
    <View style={[baseStyle, style]} {...rest}>
      {children}
    </View>
  );
};

export default ThemedView;
