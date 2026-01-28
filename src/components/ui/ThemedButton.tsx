import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useTheme } from "../../hooks/useTheme";

type Props = {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  style?: any;
};

export const ThemedButton: React.FC<Props> = ({
  title,
  onPress,
  disabled,
  style,
}) => {
  const { theme } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: disabled
            ? theme.colors.border
            : theme.colors.primary,
          borderRadius: theme.radius.md,
        },
        pressed && { opacity: 0.85 },
        style,
      ]}
    >
      <Text
        style={{
          color: theme.getContrastText(theme.colors.primary),
          fontWeight: "600",
        }}
      >
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
  },
});

export default ThemedButton;
