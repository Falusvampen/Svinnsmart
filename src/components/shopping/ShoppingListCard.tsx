import { InputRow } from "@/components/InputRow";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { ThemedText } from "@/components/ui/ThemedText";
import { makeStyles } from "@/hooks/makeStyles";
import { useTheme } from "@/hooks/useTheme";
import { ShoppingList } from "@/models/shopping";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Pressable, View } from "react-native";

type Props = {
  list: ShoppingList;
  onDelete: (id: string) => void;
  onToggleExpand: (id: string) => void;
  expanded?: boolean;
  onToggleItem: (listId: string, itemId: string) => void;
  onAddItem?: (listId: string, name: string) => void;
};

export const ShoppingListCard: React.FC<Props> = ({
  list,
  onDelete,
  onToggleExpand,
  expanded = false,
  onToggleItem,
  onAddItem,
}) => {
  const styles = useStyles();
  const { theme } = useTheme();
  const [newItem, setNewItem] = React.useState("");

  return (
    <View style={styles.card}>
      <Pressable
        onPress={() => onToggleExpand(list.id)}
        style={styles.top}
        accessibilityLabel={`Open ${list.title}`}
      >
        <View style={{ flex: 1 }}>
          <ThemedText variant="title" style={styles.title}>
            {list.title}
          </ThemedText>
          <ThemedText variant="muted" style={styles.meta}>
            {list.items.length} {list.items.length === 1 ? "vara" : "varor"} •
            senast uppdaterad
          </ThemedText>
        </View>

        <View style={styles.actions}>
          <FontAwesome
            name={expanded ? "chevron-up" : "chevron-down"}
            size={18}
            color={theme.colors.textMuted}
            style={{ marginRight: 12 }}
          />

          <Pressable onPress={() => onDelete(list.id)}>
            <FontAwesome name="trash" size={18} color={theme.colors.accent} />
          </Pressable>
        </View>
      </Pressable>

      {expanded && (
        <View style={styles.items}>
          {list.items.length === 0 ? (
            <ThemedText variant="muted">
              Ingen vara än — lägg till nedan
            </ThemedText>
          ) : (
            list.items.map((it) => (
              <Pressable
                key={it.id}
                onPress={() => onToggleItem(list.id, it.id)}
                style={styles.itemRow}
              >
                <View
                  style={[
                    styles.checkbox,
                    it.checked
                      ? { backgroundColor: theme.colors.primary }
                      : undefined,
                  ]}
                >
                  {it.checked && (
                    <FontAwesome
                      name="check"
                      size={12}
                      color={theme.getContrastText(theme.colors.primary)}
                    />
                  )}
                </View>

                <ThemedText
                  style={
                    it.checked
                      ? [styles.itemText, styles.itemChecked]
                      : styles.itemText
                  }
                >
                  {it.name}
                </ThemedText>
              </Pressable>
            ))
          )}

          {/* Add new item row */}
          {onAddItem && (
            <View style={styles.addRow}>
              <InputRow
                icon="plus"
                placeholder="Lägg till vara"
                value={newItem}
                onChangeText={setNewItem}
                style={{ flex: 1 }}
              />
              <ThemedButton
                title="Lägg till"
                onPress={() => {
                  if (newItem.trim()) {
                    onAddItem(list.id, newItem.trim());
                    setNewItem("");
                  }
                }}
                style={styles.addBtn}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: "700",
  },
  meta: {
    marginTop: theme.spacing.xs,
    fontSize: theme.typography.fontSizes.sm,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
  },
  items: {
    marginTop: theme.spacing.sm,
    borderTopWidth: 1,
    borderTopColor: theme.colors.border,
    paddingTop: theme.spacing.sm,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: theme.spacing.xs,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginRight: theme.spacing.sm,
    alignItems: "center",
    justifyContent: "center",
  },
  itemText: {
    fontSize: theme.typography.fontSizes.md,
  },
  itemChecked: {
    textDecorationLine: "line-through",
    color: theme.colors.textMuted,
  },
  addRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacing.sm,
  },
  addBtn: {
    marginLeft: theme.spacing.sm,
    height: 44,
    justifyContent: "center",
  },
}));
