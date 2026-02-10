import { makeStyles } from "@/hooks/makeStyles";
import { useTheme } from "@/hooks/useTheme";
import { Ingredient } from "@/models/inventory";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  item: Ingredient;
  onPress?: (id: string) => void;
};

const useStyles = makeStyles((theme) => ({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
  },
  amount: {
    fontSize: 14,
  },
}));

// Visa en rad per ingrediens. Enkel, kan utökas med expiry / status senare.
export const IngredientItem: React.FC<Props> = ({ item, onPress }) => {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.row,
        {
          borderBottomColor: theme.colors.border,
          backgroundColor: theme.colors.surface,
        },
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.name, { color: theme.colors.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.amount, { color: theme.colors.textMuted }]}>
          {item.amount}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => onPress?.(item.id)}
        style={{ padding: 4 }}
      >
        <Ionicons
          name="ellipsis-vertical"
          size={20}
          color={theme.colors.textMuted}
        />
      </TouchableOpacity>
    </View>
  );
};

export default IngredientItem;
