import TabBarButton from "@/components/FloatingTabBar/TabBarButton";
import { ThemedView } from "@/components/ui/ThemedView";
import { makeStyles } from "@/hooks/makeStyles"; // ✅ Använd din hook factory
import { useTheme } from "@/hooks/useTheme";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform } from "react-native";

// 1. Definiera stilen utanför komponenten med din helper
const useStyles = makeStyles((theme) => ({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    // Justera padding för iPhone X+ (Home Indicator) vs andra
    paddingBottom: Platform.OS === "ios" ? 34 : 16,
    // Vi vill kunna klicka "igenom" containern på sidorna om tab-baren
    // (Kräver att Viewn är transparent, vilket den är via variant="transparent")
  },
  content: {
    flexDirection: "row",
    backgroundColor: theme.colors.surface,
    width: "90%",
    maxWidth: 400,
    borderRadius: theme.radius.lg * 1.5, // Extra rundad för piller-form
    paddingVertical: theme.spacing.xs, // Lite tajtare padding ser ofta proffsigare ut
    paddingHorizontal: theme.spacing.xs,

    // Skuggor från temat
    shadowColor: theme.elevation.mid.shadowColor,
    shadowOffset: theme.elevation.mid.shadowOffset,
    shadowOpacity: theme.elevation.mid.shadowOpacity,
    shadowRadius: theme.elevation.mid.shadowRadius,
    elevation: theme.elevation.mid.elevation,

    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  // Dessa stilar skickas antagligen ner till TabBarButton?
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    gap: 4,
  },
  iconContainer: {
    padding: 6,
    borderRadius: theme.radius.md,
  },
  activeIconContainer: {
    // backgroundColor: theme.colors.muted, // Exempel: Ljus bakgrund på vald ikon?
  },
  label: {
    fontSize: theme.typography.fontSizes.xs,
    // Hantera font-familj snyggt
    fontFamily: Platform.select({
      ios: "System",
      default: "sans-serif-medium",
    }),
    fontWeight: "500", // Sätt direkt eller använd theme.typography.fontWeights.medium
  },
}));

const FloatingTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const { theme } = useTheme();
  // 2. Hämta stilen med en enkel rad
  const styles = useStyles();

  const activeColor = theme.colors.primary;
  const inactiveColor = theme.colors.textMuted;

  return (
    // Tog bort 'fill={false}' (om du inte lagt till den proppen själv i ThemedView)
    // Container har pointerEvents="box-none" för att man ska kunna klicka bakom den
    <ThemedView
      variant="transparent"
      style={styles.container}
      pointerEvents="box-none"
    >
      <ThemedView variant="surface" style={styles.content}>
        {state.routes.map((route, index) => (
          <TabBarButton
            key={route.key}
            route={route}
            index={index}
            isFocused={state.index === index}
            options={descriptors[route.key].options}
            navigation={navigation}
            activeColor={activeColor}
            inactiveColor={inactiveColor}
            // Om TabBarButton använder dessa styles, skicka med dem:
            styles={styles}
          />
        ))}
      </ThemedView>
    </ThemedView>
  );
};

export default FloatingTabBar;
