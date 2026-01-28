import React from "react";
import { Pressable, Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

type Props = {
  mode: "login" | "register";
  onToggle: () => void;
  style?: any;
  textStyle?: any;
  linkStyle?: any;
};

// Rad för att byta mellan login/registrera
export const ToggleModeRow: React.FC<Props> = ({
  mode,
  onToggle,
  style,
  textStyle,
  linkStyle,
}) => {
  const { theme } = useTheme();
  return (
    <View
      style={[
        {
          flexDirection: "row",
          justifyContent: "center",
          marginTop: theme.spacing.md,
        },
        style,
      ]}
    >
      <Text style={[{ color: theme.colors.textMuted }, textStyle]}>
        {mode === "login" ? "Inget konto än?" : "Redan medlem?"}
      </Text>
      <Pressable onPress={onToggle} accessibilityRole="button">
        <Text
          style={[
            { color: theme.colors.primary, fontWeight: "600" },
            linkStyle,
          ]}
        >
          {mode === "login" ? " Skapa konto" : " Logga in"}
        </Text>
      </Pressable>
    </View>
  );
};

export default ToggleModeRow;
