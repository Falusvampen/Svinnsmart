import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";
import useTheme from "../hooks/useTheme";

type Props = {
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  placeholder?: string;
  value: string;
  onChangeText: (t: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: any;
  accessibilityLabel?: string;
  style?: any;
  iconStyle?: any;
  inputStyle?: any;
};

// Återanvändbar inmatningsrad med ikon
export const InputRow: React.FC<Props> = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  accessibilityLabel,
  style,
  iconStyle,
  inputStyle,
}) => {
  const { theme } = useTheme();
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: theme.colors.muted,
          borderRadius: theme.radius.sm,
          paddingHorizontal: 12,
          marginBottom: theme.spacing.sm,
          height: 48,
        },
        style,
      ]}
    >
      <FontAwesome
        name={icon}
        size={16}
        color={theme.colors.textMuted}
        style={[{ marginRight: 8 }, iconStyle]}
      />
      <TextInput
        style={[
          { flex: 1, height: "100%", padding: 0, color: theme.colors.text },
          inputStyle,
        ]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        keyboardType={keyboardType}
        autoCapitalize={keyboardType === "email-address" ? "none" : "sentences"}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        accessibilityLabel={accessibilityLabel}
      />
    </View>
  );
};

export default InputRow;
