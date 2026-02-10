import { useTheme } from "@/context/ThemeProvider";
import { Ionicons } from "@expo/vector-icons";
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

      {/* INNEHÅLL */}
      <View style={styles.contentSquare}>
        <Text style={styles.title} numberOfLines={1}>
          {props.title}
        </Text>

        {/* --- HÄR ÄR BESKRIVNINGEN (SUBTITLE) --- */}
        {props.subtitle && (
          <Text style={styles.subtitle} numberOfLines={1}>
            {props.subtitle}
          </Text>
        )}

        {/* KOMPAKT META INFO */}
        <View style={styles.compactMetaRow}>
          {/* Tid */}
          <View style={styles.compactMetaItem}>
            <Ionicons
              name="time-outline"
              size={12}
              color={theme.colors.textMuted || "#888"}
            />
            <Text style={styles.compactMetaText}>{props.duration}m</Text>
          </View>

          {/* Punkt */}
          <View style={styles.compactDot} />

          {/* Portioner */}
          <View style={styles.compactMetaItem}>
            <Ionicons
              name="people-outline"
              size={12}
              color={theme.colors.textMuted || "#888"}
            />
            <Text style={styles.compactMetaText}>{props.servings}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SquareCard;
