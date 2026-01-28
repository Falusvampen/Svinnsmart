import { Feather } from "@expo/vector-icons"; // Exempel-ikoner
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Tabs } from "expo-router";
import React, { useMemo } from "react";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import type { AppTheme } from "../../src/constants/theme";
import { useTheme } from "../../src/hooks/useTheme";

// Hjälp: Gör route.name mer läsbar och användbar för ikoner/etiketter
const getBaseRouteName = (raw: string) => {
  // route.name kan vara något som "(tabs)/recipes" eller "index" - ta sista segmentet
  const parts = raw.split("/");
  const last = parts[parts.length - 1] || raw;
  if (last === "index") return "Home";
  return last.charAt(0).toUpperCase() + last.slice(1);
};

const FloatingTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { theme } = useTheme();
  const styles = useMemo(() => makeStyles(theme), [theme]);

  // UX: Vi använder 'surface' för att skapa en ren bas
  const activeColor = theme.colors.primary;
  const inactiveColor = theme.colors.textMuted;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];

          // Etikett: Använd tabBarLabel om det finns, annars title, annars route.name
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // UX: En liten animation här skulle göra det "smooth", men vi börjar enkelt
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          // Ikon-väljare baserat på slutsegmentet av route.name eller prettified label
          const renderIcon = (color: string) => {
            const base = getBaseRouteName(String(route.name)).toLowerCase();
            switch (base) {
              case "home":
                return <Feather name="home" size={24} color={color} />;
              case "recipes":
                return <Feather name="book" size={24} color={color} />;
              case "shopping":
                return <Feather name="shopping-bag" size={24} color={color} />;
              case "stats":
                return <Feather name="bar-chart-2" size={24} color={color} />;
              case "profile":
                return <Feather name="user" size={24} color={color} />;
              default:
                return <Feather name="circle" size={20} color={color} />;
            }
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={styles.tabButton}
              activeOpacity={0.7}
            >
              {/* Ikon */}
              <View
                style={[
                  styles.iconContainer,
                  isFocused && styles.activeIconContainer, // Valfritt: Bakgrund på aktiv ikon
                ]}
              >
                {renderIcon(isFocused ? activeColor : inactiveColor)}
              </View>

              {/* Etikett - Visas endast om aktiv för en renare look (valfritt) */}
              {isFocused && (
                <Text style={[styles.label, { color: activeColor }]}>
                  {label as string}
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    container: {
      // Placera hela baren flytande ovanför botten
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      alignItems: "center",
      paddingBottom: Platform.OS === "ios" ? 34 : 16, // Hantera iPhone X+ "home indicator"
      backgroundColor: "transparent", // Låt innehållet bakom synas lite på sidorna om vi vill
      pointerEvents: "box-none", // Låter klick gå igenom det tomma utrymmet runt baren
    },
    content: {
      flexDirection: "row",
      backgroundColor: theme.colors.surface,
      width: "90%", // Inte fullbredd för att få "floating"-effekten
      maxWidth: 400, // UX: Bli inte för bred på tablets
      borderRadius: theme.radius.lg * 1.5, // Extra runda hörn (ca 27px)
      paddingVertical: theme.spacing.sm,
      paddingHorizontal: theme.spacing.sm,

      // SKUGGOR (Hämtade från din Elevation High/Mid)
      shadowColor: theme.elevation.mid.shadowColor,
      shadowOffset: theme.elevation.mid.shadowOffset,
      shadowOpacity: theme.elevation.mid.shadowOpacity,
      shadowRadius: theme.elevation.mid.shadowRadius,
      elevation: theme.elevation.mid.elevation,

      // Kantlinje för extra definition i Japandi-stilen
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
    tabButton: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      paddingVertical: 10,
      gap: 4, // Lite mellanrum mellan ikon och text
    },
    iconContainer: {
      padding: 6,
      borderRadius: theme.radius.md,
    },
    activeIconContainer: {
      // Alternativ design: Lägg till en svag bakgrundsfärg på den aktiva ikonen
      // backgroundColor: theme.colors.muted,
    },
    label: {
      fontSize: theme.typography.fontSizes.xs,
      fontFamily: Platform.select({
        ios: "System",
        android: "sans-serif-medium",
      }), // Använd din font här
      fontWeight: theme.typography.fontWeights.medium as any,
    },
  });

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <FloatingTabBar {...props} />}
    />
  );
}
