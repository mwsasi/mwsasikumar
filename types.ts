export interface NutritionData {
  isValidFood: boolean;
  foodName: string;
  servingSize: string;
  calories: number;
  macros: {
    protein: number;
    carbs: number;
    fat: number;
  };
  details: {
    fiber: number;
    sugar: number;
    sodium: number; // in mg
    cholesterol: number; // in mg
  };
  summary: string;
  healthTips: string[];
}
