import React from "react";
import { Text, View } from "react-native";
import { useTheme } from "../hooks/useTheme";

type Props = {
  title?: string;
  subtitle?: string;
  style?: any;
  titleStyle?: any;
  subtitleStyle?: any;
};

// Enkel, dumb header för autentiseringskortet
export const AuthHeader: React.FC<Props> = ({
  title = "Hasse",
  subtitle = "Minska matsvinn — planera smartare",
  style,
  titleStyle,
  subtitleStyle,
}) => {
  const { theme } = useTheme();
  return (
    <View style={style}>
      <Text
        style={[
          {
            fontSize: theme.typography.fontSizes.xl - 2,
            fontWeight: "800",
            color: theme.colors.text,
            textAlign: "center",
          },
          titleStyle,
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          {
            fontSize: theme.typography.fontSizes.sm,
            color: theme.colors.textMuted,
            marginTop: theme.spacing.xs,
            textAlign: "center",
          },
          subtitleStyle,
        ]}
      >
        {subtitle}
      </Text>
    </View>
  );
};

export default AuthHeader;
