import Instruction from './instruction'
import ListItem from './list-item'
import RecipeIngredient from './recipe-ingredient'

export default class Recipe extends ListItem {
    public readonly id!: number

    public name!: string

    public description!: string

    public prepareTime!: number

    public peopleCount!: number

    public recipeIngredients?: RecipeIngredient[]

    public instructions?: Instruction[]
}
