import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { makeStyles } from "../hooks/makeStyles"; // Importera din nya helper!
import { useTheme } from "../hooks/useTheme"; // Vi behöver fortfarande denna för placeholder-färgerna i JSX

type Props = {
  icon: React.ComponentProps<typeof FontAwesome>["name"];
  placeholder?: string;
  value: string;
  onChangeText: (t: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: TextInputProps["keyboardType"];
  autoCapitalize?: TextInputProps["autoCapitalize"];
  accessibilityLabel?: string;
  // Bättre typning än 'any':
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<TextStyle>; // Ikoner beter sig ofta som text stilmässigt
  inputStyle?: StyleProp<TextStyle>;
};

// 1. Definiera stilar utanför med makeStyles
const useStyles = makeStyles((theme) => ({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: theme.colors.muted,
    borderRadius: theme.radius.sm,
    paddingHorizontal: 12,
    marginBottom: theme.spacing.sm,
    height: 48,
  },
  icon: {
    marginRight: 8,
    color: theme.colors.textMuted, // Standardfärg definieras här
  },
  input: {
    flex: 1,
    height: "100%",
    padding: 0,
    color: theme.colors.text,
  },
}));

export const InputRow: React.FC<Props> = ({
  icon,
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  accessibilityLabel,
  style,
  iconStyle,
  inputStyle,
}) => {
  // 2. Använd dina hooks
  const styles = useStyles();
  const { theme } = useTheme(); // Behövs för placeholderTextColor

  return (
    <View style={[styles.container, style]}>
      <FontAwesome
        name={icon}
        size={16}
        // Notera: Vi kan sätta färg i style-objektet, men ibland behövs color-proppen explicit för ikoner
        color={theme.colors.textMuted}
        style={[styles.icon, iconStyle]}
      />
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textMuted}
        keyboardType={keyboardType}
        autoCapitalize={
          autoCapitalize ??
          (keyboardType === "email-address" ? "none" : "sentences")
        }
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        accessibilityLabel={accessibilityLabel}
      />
    </View>
  );
};

export default InputRow;
