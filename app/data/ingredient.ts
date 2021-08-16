import ListItem from './list-item'
import RecipeIngredient from './recipe-ingredient'

export default class Ingredient extends ListItem {
    public readonly id!: number

    public name!: string

    public unit?: string | null

    public recipeIngredients?: RecipeIngredient[]
}
