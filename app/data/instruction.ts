import Recipe from './recipe'

export default class Instruction {
    public id!: number

    public text!: string

    public recipeId!: number

    public recipe?: Recipe

    constructor(id: number, text: string) {
        this.id = id
        this.text = text
    }
}
