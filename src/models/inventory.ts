// src/models/inventory.ts (eller internt i filen)

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
  fridge: [
    {
      id: "dairy",
      title: "Mejeri & Ägg",
      items: [
        { id: "1", name: "Mellanmjölk", amount: "1 liter" },
        { id: "2", name: "Prästost", amount: "400g" },
        { id: "3", name: "Ägg", amount: "6 st" },
      ],
    },
    {
      id: "veg",
      title: "Frukt & Grönt",
      items: [
        { id: "4", name: "Morötter", amount: "3 st" },
        { id: "5", name: "Spenat", amount: "1/2 påse" },
      ],
    },
  ],
  freezer: [
    {
      id: "meat",
      title: "Kött & Fisk",
      items: [{ id: "6", name: "Laxfilé", amount: "4 bitar" }],
    },
  ],
  pantry: [
    {
      id: "dry",
      title: "Torrvaror",
      items: [{ id: "7", name: "Pasta", amount: "500g" }],
    },
  ],
};
