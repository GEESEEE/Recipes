export class Ingredient {
    constructor(id = -1, name = 'ingredient_name', unit: string | null = null) {
        this.id = id
        this.name = name
        this.unit = unit
    }

    public readonly id!: number
    public name!: string
    public unit!: string | null
}
