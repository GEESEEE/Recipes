import Ingredient from './ingredient';
import Recipe from './recipe';
export default class RecipeIngredient {
    readonly id: number;
    recipeId: number;
    ingredientId: number;
    amount: number;
    position: number;
    recipe?: Recipe;
    ingredient?: Ingredient;
}
