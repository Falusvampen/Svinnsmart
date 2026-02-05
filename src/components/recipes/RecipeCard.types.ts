export type Ingredient = {
  item: string;
  amount: number;
  unit: string;
  category?: string;
};

export interface RecipeCardProps {
  id: string;
  variant?: "vertical" | "horizontal" | "square";
  title: string;
  subtitle?: string;
  image: any;
  duration: number;
  servings: number;
  badge?: string;
  ingredients?: Ingredient[];
  tags?: string[];
  userPantry?: string[];
  onPress?: () => void;
  style?: any;
}

export interface SpecificCardProps extends RecipeCardProps {
  displayBadge?: string;
}
