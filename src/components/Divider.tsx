import React from "react";
import { Text, View } from "react-native";
import useTheme from "../hooks/useTheme";

type Props = {
  text?: string;
  style?: any;
  lineStyle?: any;
  textStyle?: any;
};

// Enkel delare med text (t.ex. 'eller')
export const Divider: React.FC<Props> = ({
  text = "eller",
  style,
  lineStyle,
  textStyle,
}) => {
  const { theme } = useTheme();
  return (
    <View
      style={[
        {
          flexDirection: "row",
          alignItems: "center",
          marginVertical: theme.spacing.md,
        },
        style,
      ]}
    >
      <View
        style={[
          { flex: 1, height: 1, backgroundColor: theme.colors.border },
          lineStyle,
        ]}
      />
      <Text
        style={[
          {
            marginHorizontal: theme.spacing.sm,
            color: theme.colors.textMuted,
            textTransform: "lowercase",
          },
          textStyle,
        ]}
      >
        {text}
      </Text>
      <View
        style={[
          { flex: 1, height: 1, backgroundColor: theme.colors.border },
          lineStyle,
        ]}
      />
    </View>
  );
};

export default Divider;
