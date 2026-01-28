import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";
import GoogleLogo from "../../assets/images/google-g.svg";
import { useTheme } from "../hooks/useTheme";

type Props = {
  onPressGoogle?: () => void;
  onPressFacebook?: () => void;
  disabled?: boolean;
  style?: any;
  buttonStyle?: any;
  googleStyle?: any;
  facebookStyle?: any;
};

// Sociala inloggningsknappar (Google/Facebook)
export const SocialButtons: React.FC<Props> = ({
  onPressGoogle,
  onPressFacebook,
  disabled,
  style,
  buttonStyle,
  googleStyle,
  facebookStyle,
}) => {
  const { theme } = useTheme();
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          marginTop: theme.spacing.sm,
        },
        style,
      ]}
    >
      <Pressable
        style={({ pressed }) => [
          {
            width: 56,
            height: 56,
            borderRadius: 28,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 14,
            backgroundColor: "#DB4437",
            shadowColor: theme.elevation.mid.shadowColor,
            shadowOffset: theme.elevation.mid.shadowOffset,
            shadowOpacity: theme.elevation.mid.shadowOpacity,
            shadowRadius: theme.elevation.mid.shadowRadius,
            elevation: theme.elevation.mid.elevation,
            opacity: pressed ? 0.85 : 1,
          },
          buttonStyle,
          googleStyle,
        ]}
        onPress={onPressGoogle}
        disabled={disabled}
        accessibilityLabel="Logga in med Google"
        accessibilityHint="Öppnar Google-inloggning i nytt fönster"
        accessibilityRole="button"
      >
        <GoogleLogo width={26} height={26} />
      </Pressable>

      <Pressable
        style={({ pressed }) => [
          {
            width: 56,
            height: 56,
            borderRadius: 28,
            justifyContent: "center",
            alignItems: "center",
            marginHorizontal: 14,
            backgroundColor: "#1877F2",
            shadowColor: theme.elevation.mid.shadowColor,
            shadowOffset: theme.elevation.mid.shadowOffset,
            shadowOpacity: theme.elevation.mid.shadowOpacity,
            shadowRadius: theme.elevation.mid.shadowRadius,
            elevation: theme.elevation.mid.elevation,
            opacity: pressed ? 0.85 : 1,
          },
          buttonStyle,
          facebookStyle,
        ]}
        onPress={onPressFacebook}
        disabled={disabled}
        accessibilityLabel="Logga in med Facebook"
        accessibilityHint="Öppnar Facebook-inloggning i nytt fönster"
        accessibilityRole="button"
      >
        <FontAwesome name="facebook" size={26} color="#fff" />
      </Pressable>
    </View>
  );
};

export default SocialButtons;
