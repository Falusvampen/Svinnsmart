// src/models/index.ts
// Barrel file for model exports + small MOCK_DATA used by the UI (pantry screen)

// Enkelt mock-up av data grupperade per `StorageType` (används i app/(tabs)/index.tsx)
import { CategoryGroup, InventoryItem, StorageType } from "./inventory";

export * from "./auth";
export * from "./inventory";
export * from "./ldbIngredient";
export * from "./recipe";
export * from "./shopping";

const today = new Date().toISOString().slice(0, 10);

export const MOCK_DATA: Record<StorageType, CategoryGroup[]> = {
  fridge: [
    {
      id: "fridge-dairy",
      title: "Mejeri",
      storage: "fridge",
      items: [
        {
          inventoryId: "inv-milk-1",
          id: "inv-milk-1",
          name: "Mjölk 1L",
          mainCategory: "Dairy & Eggs",
          storage: "fridge",
          uiType: "volume",
          displayUnit: "l",
          packageUnit: "l",
          packageSize: 1,
          unopenedQuantity: 0,
          openedQuantity: 1,
          openedVolume: 0.5,
          status: "half",
          isAvailable: true,
          addedAt: today,
          shelfLifeDays: 10,
        } as InventoryItem,
      ],
    },
  ],
  freezer: [
    {
      id: "freezer-frozen",
      title: "Frysvaror",
      storage: "freezer",
      items: [
        {
          inventoryId: "inv-fish-1",
          id: "inv-fish-1",
          name: "Fryst lax",
          mainCategory: "Meat, Fish & Poultry",
          storage: "freezer",
          uiType: "count",
          displayUnit: "st",
          packageUnit: "kg",
          packageSize: 1,
          unopenedQuantity: 3,
          openedQuantity: 1,
          openedVolume: 0.3,
          status: "full",
          isAvailable: true,
          addedAt: today,
          shelfLifeDays: 365,
        } as InventoryItem,
      ],
    },
  ],
  pantry: [
    {
      id: "pantry-dry",
      title: "Torrvaror",
      storage: "pantry",
      items: [
        {
          inventoryId: "inv-pasta-1",
          id: "inv-pasta-1",
          name: "Pasta 500g",
          mainCategory: "Pantry & Dry Goods",
          storage: "pantry",
          uiType: "count",
          displayUnit: "st",
          packageUnit: "g",
          packageSize: 500,
          unopenedQuantity: 2,
          openedQuantity: 0,
          openedVolume: 0,
          status: "full",
          isAvailable: true,
          addedAt: today,
          shelfLifeDays: 365,
        } as InventoryItem,
      ],
    },
  ],
};
