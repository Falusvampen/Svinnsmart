import shoppingData from "@/data/shopping.json";
import { ShoppingList } from "@/models/shopping";

export const ShoppingService = {
  // Currently returns the bundled JSON data — later this can be swapped for Firestore
  fetchInitialLists: async (): Promise<ShoppingList[]> => {
    // Ensure we return a deep copy so consumers can modify state freely
    return JSON.parse(JSON.stringify(shoppingData)) as ShoppingList[];
  },
};

export default ShoppingService;
