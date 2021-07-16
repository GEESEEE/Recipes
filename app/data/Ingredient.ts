import RecipeIngredient from './recipe-ingredient'

export default class Ingredient {

    public readonly id!: number

    public name!: string

    public unit?: string | null

    public recipeIngredients?: RecipeIngredient[]
}
