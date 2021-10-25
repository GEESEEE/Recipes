import { Instruction } from './instruction'
import { RecipeIngredient } from './recipe-ingredient'

export class Recipe {
    constructor(
        id = -1,
        name = '',
        description = '',
        prepareTime = -1,
        peopleCount = -1,
        recipeIngredients: RecipeIngredient[] = [],
        instructions: Instruction[] = [],
        createdAt = new Date(),
        position = -1,
        publishedAt: Date | null = null,
        copyOf: number | null = null
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.prepareTime = prepareTime
        this.peopleCount = peopleCount
        this.recipeIngredients = recipeIngredients
        this.instructions = instructions
        this.createdAt = createdAt
        this.position = position
        this.publishedAt = publishedAt
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
    public createdAt!: Date
    public position!: number

    public publishedAt!: Date | null
    public copyOf!: number | null
}
