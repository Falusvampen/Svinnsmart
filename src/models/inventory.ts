// src/models/inventory.ts (eller internt i filen)

import freezerData from "@/data/freezer.json";
import fridgeData from "@/data/fridge.json";
import pantryData from "@/data/pantry.json";

export type StorageType = "fridge" | "freezer" | "pantry";

export interface Ingredient {
  id: string;
  name: string;
  amount: string;
  expiryDate?: string; // För "Svinnsmart"-funktionen senare
}

export interface CategoryGroup {
  id: string;
  title: string;
  items: Ingredient[];
}

export const MOCK_DATA: Record<StorageType, CategoryGroup[]> = {
  fridge: fridgeData as CategoryGroup[],
  freezer: freezerData as CategoryGroup[],
  pantry: pantryData as CategoryGroup[],
};
