export interface FoodItem {
  id: string;
  name: string;
  urduName: string;
  image: string;
  description: string;
  prepTime: string;
  cookTime: string;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: string[];
  instructions: string[];
  tips: string[];
}

