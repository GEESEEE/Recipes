import ListItem from './list-item'
import Recipe from './recipe'

export default class Instruction extends ListItem {
    public readonly id!: number

    public text!: string

    public recipeId!: number

    public recipe?: Recipe
}
