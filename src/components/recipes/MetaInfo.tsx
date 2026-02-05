import { useTheme } from "@/context/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { createStyles } from "./RecipeCard.styles";

const MetaInfo = ({
  duration,
  servings,
}: {
  duration: number;
  servings: number;
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  return (
    <View style={styles.metaContainer}>
      <View style={styles.metaItem}>
        <Ionicons
          name="time-outline"
          size={14}
          color={theme.colors.textMuted}
        />
        <Text style={styles.metaText}>{duration} min</Text>
      </View>
      <View style={styles.metaDivider} />
      <View style={styles.metaItem}>
        <Ionicons
          name="people-outline"
          size={14}
          color={theme.colors.textMuted}
        />
        <Text style={styles.metaText}>{servings} pers</Text>
      </View>
    </View>
  );
};

export default MetaInfo;
