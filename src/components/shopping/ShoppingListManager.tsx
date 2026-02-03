import { InputRow } from "@/components/InputRow";
import { ThemedButton } from "@/components/ui/ThemedButton";
import { ThemedText } from "@/components/ui/ThemedText";
import { makeStyles } from "@/hooks/makeStyles";
import { useShopping } from "@/hooks/useShopping";
import React, { useState } from "react";
import { Alert, FlatList, View } from "react-native";
import { ShoppingListCard } from "./ShoppingListCard";

export const ShoppingListManager: React.FC = () => {
  const styles = useStyles();
  const { lists, createList, deleteList, toggleItem, addItemToList } =
    useShopping();

  const [title, setTitle] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const addList = () => {
    const trimmed = title.trim();
    if (!trimmed) return;
    createList(trimmed);
    setTitle("");
  };

  const confirmDelete = (id: string) => {
    Alert.alert("Ta bort", "Är du säker på att du vill ta bort listan?", [
      { text: "Avbryt", style: "cancel" },
      {
        text: "Ta bort",
        style: "destructive",
        onPress: () => deleteList(id),
      },
    ]);
  };

  const toggleExpand = (id: string) => {
    setExpandedId((cur) => (cur === id ? null : id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.createRow}>
        <InputRow
          icon="shopping-basket"
          placeholder="Ny inköpslista"
          value={title}
          onChangeText={setTitle}
        />
        <ThemedButton
          title="Skapa"
          onPress={addList}
          style={styles.createBtn}
        />
      </View>

      {lists.length === 0 ? (
        <ThemedText variant="muted">Du har inga inköpslistor än.</ThemedText>
      ) : (
        <FlatList
          data={lists}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <ShoppingListCard
              list={item}
              onDelete={confirmDelete}
              onToggleExpand={toggleExpand}
              expanded={expandedId === item.id}
              onToggleItem={toggleItem}
              onAddItem={addItemToList}
            />
          )}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const useStyles = makeStyles((theme) => ({
  container: { padding: theme.spacing.md, flex: 1 },
  createRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: theme.spacing.md,
  },
  createBtn: { marginLeft: theme.spacing.sm, height: 48 },
  list: { paddingBottom: theme.spacing.lg },
}));

export default ShoppingListManager;
