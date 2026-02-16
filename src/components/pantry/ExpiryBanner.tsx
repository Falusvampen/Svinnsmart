import { makeStyles } from "@/hooks/makeStyles";
import { useTheme } from "@/hooks/useTheme";
import { CategoryGroup } from "@/models/";
import { daysUntil, getItemExpiryDate } from "@/utils/date";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  groups: CategoryGroup[];
  alertDays?: number; // hur många dagar framåt som räknas som "närliggande"
  onPress?: () => void;
};

const useStyles = makeStyles((theme) => ({
  banner: {
    marginHorizontal: theme.spacing.md,
    marginTop: theme.spacing.sm,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  info: {
    flex: 1,
  },
  title: {
    fontSize: theme.typography.fontSizes.md,
    fontWeight: "600",
    marginBottom: 4,
  },
  message: {
    fontSize: theme.typography.fontSizes.sm,
  },
  badge: {
    marginLeft: theme.spacing.md,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  badgeText: {
    fontSize: theme.typography.fontSizes.sm,
    fontWeight: "600",
  },
}));

// Visar en kort summering av kommande/utgångna varor i ett lager (fridge/freezer/pantry)
export const ExpiryBanner: React.FC<Props> = ({
  groups,
  alertDays = 7,
  onPress,
}) => {
  const styles = useStyles();
  const { theme } = useTheme();

  // Platta ut items och derivera expiry via shelfLifeDays + addedAt
  const expiries = groups
    .flatMap((g) => g.items)
    .map((i) => getItemExpiryDate(i))
    .filter((d): d is string => !!d);

  const expired = expiries.filter((d) => daysUntil(d) < 0).length;
  const urgent = expiries.filter((d) => {
    const days = daysUntil(d);
    return days >= 0 && days <= 3;
  }).length;
  const withinAlert = expiries.filter((d) => {
    const days = daysUntil(d);
    return days >= 0 && days <= alertDays;
  }).length;

  // Best message priority: expired > urgent > withinAlert > none
  let text = "Inga varor nära utgång";
  let badgeColor = theme.colors.success;

  if (expired > 0) {
    text = `${expired} varor har gått ut`;
    badgeColor = theme.colors.danger;
  } else if (urgent > 0) {
    text = `${urgent} varor går ut inom 3 dagar`;
    badgeColor = theme.colors.warning;
  } else if (withinAlert > 0) {
    text = `${withinAlert} varor går ut inom ${alertDays} dagar`;
    badgeColor = theme.colors.accent;
  }

  const showBadge = expired > 0 || urgent > 0 || withinAlert > 0;

  return (
    <View
      style={[
        styles.banner,
        {
          backgroundColor: theme.colors.surface,
          borderWidth: 1,
          borderColor: theme.colors.border,
        },
      ]}
    >
      <View style={styles.info}>
        <Text style={[styles.title, { color: theme.colors.text }]}>
          Bäst före
        </Text>
        <Text style={[styles.message, { color: theme.colors.textMuted }]}>
          {text}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.7}
        style={[styles.badge, { backgroundColor: badgeColor }]}
      >
        <Text
          style={[
            styles.badgeText,
            { color: theme.getContrastText(badgeColor) },
          ]}
        >
          {showBadge ? "Granska" : "OK"}
        </Text>
        <Ionicons
          name="chevron-forward"
          size={16}
          color={theme.getContrastText(badgeColor)}
          style={{ marginLeft: 8 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default ExpiryBanner;
