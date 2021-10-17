import Instruction from './instruction'
import RecipeIngredient from './recipe-ingredient'

export default class Recipe {
    public readonly id!: number

    public authorId!: number

    public name!: string

    public description!: string

    public prepareTime!: number

    public peopleCount!: number

    public recipeIngredients?: RecipeIngredient[]

    public instructions?: Instruction[]

    public publishedAt!: Date | null

    public createdAt!: Date

    public copyOf!: number | null
}
