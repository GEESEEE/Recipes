import { Ingredient } from './ingredient'

export class RecipeIngredient {
    constructor(
        id = -1,
        amount = -1,
        position = -1,
        ingredient = new Ingredient()
    ) {
        this.id = id
        this.amount = amount
        this.position = position
        this.ingredient = ingredient
    }
    public readonly id!: number

    public amount!: number

    public position!: number

    public ingredient!: Ingredient
}
