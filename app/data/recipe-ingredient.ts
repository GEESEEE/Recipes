import Ingredient from './ingredient'
import ListItem from './list-item'
import Recipe from './recipe'

export default class RecipeIngredient extends ListItem {
    public recipeId!: number

    public ingredientId!: number

    public amount!: number

    public recipe?: Recipe

    public ingredient?: Ingredient
}
