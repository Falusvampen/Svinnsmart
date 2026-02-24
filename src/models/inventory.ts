// src/models/inventory.ts
import { LdbIngredient } from "./ldbIngredient";

// --- New domain model (matches your spec) ---
export type StorageType = "fridge" | "freezer" | "pantry";
// volume = ml/l and fuzzy logic for status (full/high/half/low/empty)
// count = st/pkg/burk and status based on quantity vs packageSize
// binary = st/pkg/burk and status is just full (quantity > 0) or empty (quantity = 0)
export type UIType = "volume" | "count" | "binary";
export type Category =
  | "Dairy & Eggs"
  | "Meat, Fish & Poultry"
  | "Fruit & Vegetables"
  | "Bread & Bakery"
  | "Pantry & Dry Goods"
  | "Frozen"
  | "Flavoring & Baking"
  | "Drinks & Snacks";

export type BaseIngredient = {
  id?: string;
  name?: string;
  nameEn?: string;
  mainCategory?: Category;
  storage?: StorageType;
  uiType?: UIType;
  shelfLifeDays?: number; // Standard bäst före-tid i dagar (för nya varor utan expiryDate)
  ldb?: LdbIngredient;
};

export type Unit =
  | "g"
  | "kg"
  | "ml"
  | "cl"
  | "dl"
  | "l"
  | "st"
  | "pkg"
  | "burk";

export interface InventoryItem extends BaseIngredient {
  inventoryId: string;

  // Logik för enheter
  displayUnit: Unit; // Den enhet som visas i UI just nu (t.ex. "l" eller "st")
  packageUnit: Unit; // Den enhet som används för beräkning (t.ex. "ml" eller "st")

  unopenedQuantity: number; // Antal hela förpackningar (t.ex. 2 st mjölk eller två paket pasta)
  openedQuantity?: number; // Mängd i den öppnade förpackningen (t.ex. 500 ml mjölk kvar i en literförpackning)
  openedVolume: number; // Innehåll i den öppnade förpackningen (t.ex. 500 ml)
  packageSize: number; // Storlek per förpackning (t.ex. 1 för en liter)

  status: "Ny" | "Mycket" | "Halv" | "Lite" | "Slut";
  isAvailable: boolean;
  addedAt: string;
}

// Grupp-typ som representerar en samling ingredienser i ett lager (t.ex. "Mejeri" i kylskåpet).
// `storage` anger vilket lager (fridge/freezer/pantry) gruppen tillhör och används
// för att visa rätt flik i UI.
export interface CategoryGroup {
  id: string;
  title: string;
  storage?: StorageType;
  items: InventoryItem[];
}
