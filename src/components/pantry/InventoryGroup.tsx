import { IngredientItem } from "@/components/pantry/IngredientItem";
import { makeStyles } from "@/hooks/makeStyles";
import { useTheme } from "@/hooks/useTheme";
import { CategoryGroup } from "@/models/";
import React from "react";
import { Text, View } from "react-native";

type Props = {
  group: CategoryGroup;
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  title: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  card: {
    overflow: "hidden",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
}));

// Renderar en grupp med titel + kort som innehåller ingredienser
export const InventoryGroup: React.FC<Props> = ({ group }) => {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.primaryDark }]}>
          {" "}
          {group.title.toUpperCase()}
        </Text>
        <View style={[styles.badge, { backgroundColor: theme.colors.muted }]}>
          <Text style={[styles.badgeText, { color: theme.colors.textMuted }]}>
            {group.items.length}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.card,
          {
            backgroundColor: theme.colors.surface,
            borderRadius: theme.radius.md,
            shadowColor: theme.colors.shadow,
          },
        ]}
      >
        {group.items.map((item) => (
          <IngredientItem key={item.inventoryId} item={item} />
        ))}
      </View>
    </View>
  );
};

export default InventoryGroup;
