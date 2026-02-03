export type Mode = "vertical" | "horizontal" | "square";

export type Recipe = {
  id: string;
  title: string;
  subtitle?: string;
  image?: string;
  duration?: string;
  servings?: number;
  mode?: Mode;
  badge?: string;
};
