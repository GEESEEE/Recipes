export default class Instruction {
    constructor(id: number, text: string, position: number) {
        this.id = id
        this.text = text
        this.position = position
    }

    public id!: number
    public text!: string
    public position!: number
    public recipeId!: number
}
