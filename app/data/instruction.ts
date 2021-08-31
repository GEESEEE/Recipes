import Recipe from './recipe'

export default class Instruction {
    public id!: number

    public text!: string

    public position!: number

    public recipeId!: number

    public recipe?: Recipe

    constructor(id: number, text: string, position: number) {
        this.id = id
        this.text = text
        this.position = position
    }
}
