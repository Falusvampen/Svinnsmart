import { Hero } from "@/components/Hero";
import { makeStyles } from "@/hooks/makeStyles";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { TextInput, View } from "react-native";

const useStyles = makeStyles((theme) => ({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 12,
  },
}));

const RecipeHero: React.FC = () => {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <Hero message="Mm, jag är sugen på något gott! Vad har vi hemma?">
      <View
        style={[
          styles.searchContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <Ionicons
          name="search"
          size={20}
          color={theme.colors.textMuted}
          style={{ marginRight: 8 }}
        />
        <TextInput
          placeholder="Sök recept eller ingrediens..."
          placeholderTextColor={theme.colors.textMuted}
          style={{ flex: 1, color: theme.colors.text }}
        />
      </View>
    </Hero>
  );
};

export default RecipeHero;
