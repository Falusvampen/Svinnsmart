import { useTheme } from "@/context/ThemeProvider";
import React, { useMemo } from "react";
import { Image, ImageStyle, Text, TouchableOpacity, View } from "react-native";
import CardBadge from "./CardBadge";
import MetaInfo from "./MetaInfo";
import { SpecificCardProps } from "./RecipeCard.types";
import { createVerticalStyles } from "./VerticalCard.styles";

const VerticalCard: React.FC<SpecificCardProps> = (props) => {
  const { theme } = useTheme();
  const styles = useMemo(() => createVerticalStyles(theme), [theme]);

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={props.onPress}
      style={[styles.cardContainer, props.style]}
    >
      <View style={styles.imageWrapper}>
        <Image
          source={
            typeof props.image === "string" ? { uri: props.image } : props.image
          }
          style={[styles.image, styles.imageVertical] as ImageStyle}
        />
        <CardBadge badge={props.displayBadge} />
      </View>

      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {props.title}
          </Text>
          {props.subtitle && (
            <Text style={styles.subtitle} numberOfLines={1}>
              {props.subtitle}
            </Text>
          )}
        </View>
        <MetaInfo duration={props.duration} servings={props.servings} />
      </View>
    </TouchableOpacity>
  );
};

export default VerticalCard;
