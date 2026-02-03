export interface ShoppingItem {
  id: string;
  name: string;
  checked?: boolean;
}

export interface ShoppingList {
  id: string;
  title: string;
  items: ShoppingItem[];
  updatedAt: number;
}
