import { useTheme } from "@/context/ThemeProvider";
import { Ionicons } from "@expo/vector-icons"; // <--- Importera ikoner
import React, { useMemo } from "react";
import { Image, ImageStyle, Text, TouchableOpacity, View } from "react-native";
import CardBadge from "./CardBadge";
import { SpecificCardProps } from "./RecipeCard.types";
import { createSquareStyles } from "./SquareCard.styles";

const SquareCard: React.FC<SpecificCardProps> = (props) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createSquareStyles(theme), [theme]);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={props.onPress}
      style={[styles.cardContainer, styles.cardContainerSquare, props.style]}
    >
      {/* BILD */}
      <View style={styles.imageWrapper}>
        <Image
          source={
            typeof props.image === "string" ? { uri: props.image } : props.image
          }
          style={[styles.image, styles.imageSquare] as ImageStyle}
        />
        <CardBadge badge={props.displayBadge} />
      </View>

      {/* FLYTANDE ETIKETT */}
      <View style={styles.contentSquare}>
        <Text style={styles.title} numberOfLines={1}>
          {props.title}
        </Text>

        {/* KOMPAKT META INFO (Endast för Square) */}
        <View style={styles.compactMetaRow}>
          {/* Tid: "20m" istället för "20 min" */}
          <View style={styles.compactMetaItem}>
            <Ionicons
              name="time-outline"
              size={12}
              color={theme.colors.textMuted}
            />
            <Text style={styles.compactMetaText}>{props.duration}m</Text>
          </View>

          {/* Punkt i mitten */}
          <View style={styles.compactDot} />

          {/* Portioner: "4" istället för "4 pers" (Ikonen räcker) */}
          <View style={styles.compactMetaItem}>
            <Ionicons
              name="people-outline"
              size={12}
              color={theme.colors.textMuted}
            />
            <Text style={styles.compactMetaText}>{props.servings}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SquareCard;
