import { interfaces } from 'inversify-express-utils';
import { Ingredient } from '../../entities';
export default class IngredientController implements interfaces.Controller {
    private readonly recipeService;
    createIngredient(body: {
        name: string;
        unit?: string;
    }): Promise<Ingredient>;
    getIngredient(ingredientId: number): Promise<Ingredient>;
    deleteIngredient(ingredientId: number): Promise<void>;
    private static validate;
}
