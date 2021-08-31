import Ingredient from './ingredient'
import Recipe from './recipe'

export default class RecipeIngredient {
    public readonly id: number

    public recipeId!: number

    public ingredientId!: number

    public amount!: number

    public position!: number

    public recipe?: Recipe

    public ingredient?: Ingredient

    constructor(id: number, amount: number, position: number, ingredient: Ingredient) {
        this.id = id
        this.amount = amount
        this.position = position
        this.ingredient = ingredient
    }
}
