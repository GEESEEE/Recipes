export default class Ingredient {
    constructor(id: number, name: string, unit: string | null) {
        this.id = id
        this.name = name
        this.unit = unit
    }

    public readonly id!: number
    public name!: string
    public unit!: string | null
}
