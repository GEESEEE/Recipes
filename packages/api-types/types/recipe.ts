import { Instruction } from './instruction'
import { RecipeIngredient } from './recipe-ingredient'

export class Recipe {
    constructor(
        id = -1,
        name = 'recipe_name',
        description = 'recipe_description',
        prepareTime = -1,
        peopleCount = -1,
        recipeIngredients = [],
        instructions = [],
        publishedAt = null,
        createdAt = new Date(),
        copyOf = null
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.prepareTime = prepareTime
        this.peopleCount = peopleCount
        this.recipeIngredients = recipeIngredients
        this.instructions = instructions
        this.publishedAt = publishedAt
        this.createdAt = createdAt
        this.copyOf = copyOf
    }

    public readonly id!: number

    public authorId!: number
    public name!: string
    public description!: string
    public prepareTime!: number
    public peopleCount!: number
    public recipeIngredients!: RecipeIngredient[]
    public instructions!: Instruction[]
    public publishedAt!: Date | null
    public createdAt!: Date
    public copyOf!: number | null
}
