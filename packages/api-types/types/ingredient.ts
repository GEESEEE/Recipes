export class Ingredient {
    constructor(id = 0, name = '', unit: string | null = null) {
        this.id = id
        this.name = name
        this.unit = unit
    }

    public readonly id!: number
    public name!: string
    public unit!: string | null
}

export type IngredientCreate = Omit<Ingredient, 'id'>

export type IngredientUpdate = Pick<Ingredient, 'id'> &
    Partial<IngredientCreate>
