import { getBaseRouteName } from "@/utils/getBaseRouteName";
import { Feather } from "@expo/vector-icons";
import type {
  BottomTabBarProps,
  BottomTabNavigationOptions,
} from "@react-navigation/bottom-tabs";
import type { Route } from "@react-navigation/native";
import React from "react";
import {
  LayoutAnimation,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native";

// Flytta ut ikon-mappningen så den inte skapas om vid varje render
// Detta är en "fallback" om du inte satt ikon i _layout.tsx
const iconMap: Record<string, keyof typeof Feather.glyphMap> = {
  home: "home",
  recipes: "book",
  shopping: "shopping-bag",
  stats: "bar-chart-2",
  profile: "user",
  default: "circle",
};

type TabBarStyles = {
  tabButton: ViewStyle;
  iconContainer: ViewStyle;
  activeIconContainer: ViewStyle;
  label: TextStyle;
};

interface Props {
  route: Route<string>;
  index: number;
  isFocused: boolean;
  options: BottomTabNavigationOptions;
  navigation: BottomTabBarProps["navigation"];
  activeColor: string;
  inactiveColor: string;
  styles: TabBarStyles;
}

const TabBarButton: React.FC<Props> = ({
  route,
  isFocused,
  options,
  navigation,
  activeColor,
  inactiveColor,
  styles,
}) => {
  // Hantera textetiketten
  const label =
    options.tabBarLabel !== undefined
      ? options.tabBarLabel
      : options.title !== undefined
        ? options.title
        : route.name;

  const onPress = () => {
    // 1. Trigger Animation för mjuk expandering
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    const event = navigation.emit({
      type: "tabPress",
      target: route.key,
      canPreventDefault: true,
    });

    if (!isFocused && !event.defaultPrevented) {
      navigation.navigate(route.name);
    }
  };

  const onLongPress = () => {
    navigation.emit({
      type: "tabLongPress",
      target: route.key,
    });
  };

  // Hjälpfunktion för att rendera ikonen
  const renderIcon = (color: string) => {
    // Alternativ A: Använd ikonen som är definierad i _layout.tsx (Best practice!)
    if (options.tabBarIcon) {
      return options.tabBarIcon({ focused: isFocused, color, size: 24 });
    }

    // Alternativ B: Din fallback-logik
    const base = getBaseRouteName
      ? getBaseRouteName(route.name).toLowerCase()
      : route.name.toLowerCase();
    const iconName = iconMap[base] || iconMap.default;

    return <Feather name={iconName} size={24} color={color} />;
  };

  return (
    <TouchableOpacity
      accessibilityRole="button"
      accessibilityState={isFocused ? { selected: true } : {}}
      accessibilityLabel={options.tabBarAccessibilityLabel}
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabButton}
      activeOpacity={0.7}
    >
      <View
        style={[styles.iconContainer, isFocused && styles.activeIconContainer]}
      >
        {renderIcon(isFocused ? activeColor : inactiveColor)}
      </View>

      {/* Texten animeras nu fram tack vare LayoutAnimation i onPress */}
      {isFocused && (
        <Text style={[styles.label, { color: activeColor }]} numberOfLines={1}>
          {label as string}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default TabBarButton;
