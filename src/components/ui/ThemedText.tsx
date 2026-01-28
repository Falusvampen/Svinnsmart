import React from "react";
import { Text, TextProps, TextStyle } from "react-native";
import { useTheme } from "../../hooks/useTheme";

type Props = TextProps & {
  variant?: "default" | "muted" | "accent" | "title";
  style?: TextStyle | TextStyle[];
};

export const ThemedText: React.FC<Props> = ({
  variant = "default",
  style,
  children,
  ...rest
}) => {
  const { theme } = useTheme();
  const color =
    variant === "muted"
      ? theme.colors.textMuted
      : variant === "accent"
        ? theme.colors.accent
        : theme.colors.text;
  const fontSize =
    variant === "title"
      ? theme.typography.fontSizes.lg
      : theme.typography.fontSizes.md;

  return (
    <Text style={[{ color, fontSize }, style]} {...rest}>
      {children}
    </Text>
  );
};

export default ThemedText;
