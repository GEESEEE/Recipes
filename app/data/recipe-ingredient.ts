import Ingredient from './ingredient'
import Recipe from './recipe'

export default class RecipeIngredient {

    public recipeId!: number

    public ingredientId!: number

    public amount!: number

    public recipe?: Recipe

    public ingredient?: Ingredient
}
