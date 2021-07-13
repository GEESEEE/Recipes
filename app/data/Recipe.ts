import Ingredient from './Ingredient'

export default class Recipe {
    name = 'Recipe Name'

    image = ''

    description = 'Lorem Ipsum'

    ingredients: Ingredient[]

    instructions: string[]

    constructor() {
        this.ingredients = []
        this.instructions = ['Instruction 1']
    }
}
