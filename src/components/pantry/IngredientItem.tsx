import { makeStyles } from "@/hooks/makeStyles";
import { useTheme } from "@/hooks/useTheme";
import { Ingredient } from "@/models/inventory";
import { getExpiryInfo } from "@/utils/date";
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
  expiryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  expiryText: {
    fontSize: 12,
  },
  expiryDot: {
    width: 8,
    height: 8,
    borderRadius: 8,
    marginRight: 8,
  },
}));

// Visa en rad per ingrediens. Visar nu "Bäst före" med färgindikator.
export const IngredientItem: React.FC<Props> = ({ item, onPress }) => {
  const styles = useStyles();
  const { theme } = useTheme();

  // Lokala helpers för expiry-status
  const expiry = item.expiryDate;
  let expiryLabel: string | null = null;
  let expiryColor: string | null = null;

  if (expiry) {
    const info = getExpiryInfo(expiry);
    expiryLabel = info.label;
    switch (info.status) {
      case "expired":
        expiryColor = theme.colors.danger;
        break;
      case "urgent":
        expiryColor = theme.colors.warning;
        break;
      case "soon":
        expiryColor = theme.colors.accent;
        break;
      default:
        expiryColor = theme.colors.textMuted;
    }
  }

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
        {expiryLabel ? (
          <View style={styles.expiryRow}>
            <View
              style={[
                styles.expiryDot,
                { backgroundColor: expiryColor ?? theme.colors.textMuted },
              ]}
            />
            <Text
              style={[
                styles.expiryText,
                { color: expiryColor ?? theme.colors.textMuted },
              ]}
            >
              {expiryLabel}
            </Text>
          </View>
        ) : null}
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
