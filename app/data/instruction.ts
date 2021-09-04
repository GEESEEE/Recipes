import Recipe from './recipe'
import ListItem from './list-item'

export default class Instruction implements ListItem{
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
