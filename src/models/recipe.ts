export type Variant = "vertical" | "horizontal" | "square";

// En enkel struktur för en ingrediens
export type Ingredient = {
  item: string; // t.ex. "Mjöl"
  amount: number; // t.ex. 5
  unit: string; // t.ex. "dl"
  category?: string; // t.ex. "Torrvaror" (bra för sortering i inköpslistan)
};

export type Recipe = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string; // URL till bilden
  description?: string; // Kort säljande text
  duration: number; // Spara helst som number (minuter) för att kunna sortera!
  servings: number;

  // Det nya:
  ingredients: Ingredient[];
  tags: string[]; // t.ex. ["vegansk", "glutenfri", "vardag", "fest"]

  // UI-specifikt (behöver kanske inte sparas i databasen, men används i appen)
  variant?: Variant;
  badge?: string; // Denna räknar vi ofta ut dynamiskt i koden
};
