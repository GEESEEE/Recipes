import Ingredient from './ingredient'

export default class RecipeIngredient {
    constructor(
        id: number,
        amount: number,
        position: number,
        ingredient: Ingredient
    ) {
        this.id = id
        this.amount = amount
        this.position = position
        this.ingredient = ingredient
    }

    public readonly id: number
    public recipeId!: number
    public ingredientId!: number
    public amount!: number
    public position!: number
    public ingredient!: Ingredient
}
