// src/models/inventory.ts

import rawInventory from "@/data/inventory.json";

export type StorageType = "fridge" | "freezer" | "pantry";

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  expiryDate?: string; // För "Svinnsmart"-funktionen senare
  storage: StorageType; // vilket lager (fridge/freezer/pantry) varan tillhör
  groupId?: string; // optional link to a CategoryGroup
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryGroup {
  id: string;
  title: string;
  storage: StorageType; // "fridge" | "freezer" | "pantry"
  order?: number;
  createdAt?: string;
  items: Ingredient[];
}

type RawInventoryShape = {
  groups: {
    id: string;
    title: string;
    storage: StorageType;
    order?: number;
    createdAt?: string;
  }[];
  items: Ingredient[];
};

const inventoryData = rawInventory as unknown as RawInventoryShape;

// All items (flat) — useful for services/testing/migrations
export const ALL_ITEMS: Ingredient[] = inventoryData.items || [];

// Build groups and attach items by groupId — mirrors the structure the UI consumes
export const ALL_GROUPS: CategoryGroup[] = (inventoryData.groups || []).map(
  (g) => ({
    id: g.id,
    title: g.title,
    storage: g.storage,
    order: g.order,
    createdAt: g.createdAt,
    items: ALL_ITEMS.filter((it) => it.groupId === g.id),
  }),
);

// Any items without a group get an "Övrigt" group per storage so UI keeps working
const orphanedByStorage: Record<StorageType, Ingredient[]> = {
  fridge: ALL_ITEMS.filter((it) => !it.groupId && it.storage === "fridge"),
  freezer: ALL_ITEMS.filter((it) => !it.groupId && it.storage === "freezer"),
  pantry: ALL_ITEMS.filter((it) => !it.groupId && it.storage === "pantry"),
};

const groupsWithOrphans = [...ALL_GROUPS];
Object.entries(orphanedByStorage).forEach(([storageKey, items]) => {
  if (items.length === 0) return;
  const storage = storageKey as StorageType;
  groupsWithOrphans.push({
    id: `ungrouped-${storage}`,
    title: "Övrigt",
    storage,
    items,
  });
});

export const MOCK_DATA: Record<StorageType, CategoryGroup[]> = (() => {
  const map: Record<StorageType, CategoryGroup[]> = {
    fridge: [],
    freezer: [],
    pantry: [],
  };

  groupsWithOrphans.forEach((group) => {
    if (!map[group.storage]) return;
    map[group.storage].push(group);
  });

  return map;
})();
