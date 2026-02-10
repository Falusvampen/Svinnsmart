import { makeStyles } from "@/hooks/makeStyles";
import { useTheme } from "@/hooks/useTheme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type Props = {
  title?: string;
  onAdd?: () => void;
};

const useStyles = makeStyles((theme) => ({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    fontFamily: "System",
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
}));

export const InventoryHeader: React.FC<Props> = ({
  title = "Mitt Kök",
  onAdd,
}) => {
  const styles = useStyles();
  const { theme } = useTheme();

  return (
    <View style={[styles.header, { paddingTop: 60 }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      <TouchableOpacity
        onPress={onAdd}
        style={[styles.addButton, { backgroundColor: theme.colors.accent }]}
      >
        <Ionicons name="add" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

export default InventoryHeader;
