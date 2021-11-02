import { Ingredient, IngredientCreate } from './ingredient'

export class RecipeIngredient {
    constructor(
        id = 0,
        amount = 0,
        position = 0,
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

export type RecipeIngredientCreate = Omit<
    RecipeIngredient,
    'id' | 'ingredient'
> &
    IngredientCreate

export type RecipeIngredientUpdate = Pick<RecipeIngredient, 'id'> &
    Partial<RecipeIngredientCreate>
