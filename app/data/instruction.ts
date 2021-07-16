import Recipe from './recipe'

export default class Instruction {

    public readonly id!: number

    public text!: string

    public recipeId!: number

    public recipe?: Recipe
}
