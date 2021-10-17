import RecipeIngredient from './recipe-ingredient';
export default class Ingredient {
    readonly id: number;
    name: string;
    unit: string | null;
    recipeIngredients?: RecipeIngredient[];
}
