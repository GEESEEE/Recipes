import Ingredient from './Ingredient'

export default class Recipe {
    name: string = 'Recipe Name'
    image: any
    description: string = 'Lorem Ipsum'
    ingredients: Ingredient[]
    instructions: string[]

    constructor() {
        this.ingredients = []
        this.instructions = ['Instruction 1']
    }
}
