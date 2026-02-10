import { Hero } from "@/components/Hero";
import { InventoryGroup } from "@/components/pantry/InventoryGroup";
import { InventoryHeader } from "@/components/pantry/InventoryHeader";
import { StorageSelector } from "@/components/pantry/StorageSelector";
import { ThemedView } from "@/components/ui/ThemedView";
import { makeStyles } from "@/hooks/makeStyles";
import { MOCK_DATA, StorageType } from "@/models/inventory";
import React, { useState } from "react";
import { ScrollView, View } from "react-native";

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
  },
  contentList: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
}));

export default function InventoryScreen() {
  const styles = useStyles();

  const [activeStorage, setActiveStorage] = useState<StorageType>("fridge");
  const currentData = MOCK_DATA[activeStorage];

  return (
    <ThemedView style={styles.container} variant="background">
      <Hero message="Vad finns i ditt skafferi? Håll koll på varor och bästföredatum." />

      <InventoryHeader
        title="Mitt Kök"
        onAdd={() => {
          /* TODO: add item flow */
        }}
      />

      <StorageSelector current={activeStorage} onChange={setActiveStorage} />

      <ScrollView
        style={styles.contentList}
        showsVerticalScrollIndicator={false}
      >
        {currentData.map((group) => (
          <InventoryGroup key={group.id} group={group} />
        ))}

        <View style={{ height: 100 }} />
      </ScrollView>
    </ThemedView>
  );
}
