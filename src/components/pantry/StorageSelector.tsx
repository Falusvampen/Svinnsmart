import { makeStyles } from "@/hooks/makeStyles";
import { useTheme } from "@/hooks/useTheme";
import { StorageType } from "@/models/";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

type Props = {
  current: StorageType;
  onChange: (t: StorageType) => void;
};

const useStyles = makeStyles((theme) => ({
  container: {
    marginBottom: 10,
  },
  scroll: {
    paddingHorizontal: theme.spacing.md,
    gap: 12,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
  },
  text: {
    fontSize: 14,
  },
}));

// En enkel, återanvändbar komponent för att välja lagringsplats (kyl/frys/skafferi)
export const StorageSelector: React.FC<Props> = ({ current, onChange }) => {
  const styles = useStyles();
  const { theme } = useTheme();

  const tabs: { key: StorageType; label: string; icon: string }[] = [
    { key: "fridge", label: "Kylskåp", icon: "snow-outline" },
    { key: "freezer", label: "Frys", icon: "ice-cream-outline" },
    { key: "pantry", label: "Skafferi", icon: "nutrition-outline" },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {tabs.map((tab) => {
          const isActive = current === tab.key;
          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => onChange(tab.key)}
              style={[
                styles.pill,
                {
                  backgroundColor: isActive
                    ? theme.colors.primary
                    : theme.colors.surface,
                  borderColor: isActive
                    ? theme.colors.primary
                    : theme.colors.border,
                  borderRadius: theme.radius.lg,
                },
              ]}
            >
              <Ionicons
                name={tab.icon as any}
                size={18}
                color={isActive ? "#FFF" : theme.colors.textMuted}
                style={{ marginRight: 6 }}
              />
              <Text
                style={[
                  styles.text,
                  {
                    color: isActive ? "#FFF" : theme.colors.text,
                    fontWeight: isActive ? "600" : "400",
                  },
                ]}
              >
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default StorageSelector;
