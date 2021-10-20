import type { Factory, Seeder } from '@zchapple/typeorm-seeding'
import range from 'lodash/range'
import sampleSize from 'lodash/sampleSize'
import sample from 'lodash/sample'
import type { Connection } from 'typeorm'
import { getRandomInt } from '@recipes/api-types/utils'
import {
    Ingredient,
    Instruction,
    Recipe,
    RecipeIngredient,
    Section,
    Settings,
    User,
} from '@/entities'

export default class CreateUsers implements Seeder {
    private userCount = 30
    private ingredientCount = 200

    private sectionPerUser = 4
    private recipePerSection = 5
    private ingredientsPerRecipe = range(3, 6)
    private instructionsPerRecipe = range(3, 6)

    private ingredientIds = range(this.ingredientCount)

    public async run(factory: Factory, _connection: Connection): Promise<any> {
        const settings = await factory(Settings)().create()
        await factory(User)()
            .map(async (user) => {
                user.name = 'GEESE'
                user.password = 'admin'
                user.email = 'geese@gmail.com'
                user.settingsId = settings.id
                return user
            })
            .create()

        for (let i = 1; i < this.userCount - 1; i++) {
            const settings = await factory(Settings)().create()
            await factory(User)({ settingsId: settings.id })
                .map(async (user) => {
                    user.settingsId = settings.id
                    return user
                })
                .create()
        }

        const userIds = range(1, this.userCount + 1)

        userIds.forEach(async (userId) => {
            await this.createSections(factory, userId)
        })

        const sectionCount = this.userCount * this.sectionPerUser
        const sectionIds = range(sectionCount)

        sectionIds.forEach(async (sectionId) => {
            await this.createRecipes(factory, sectionId)
        })

        const recipeCount = sectionCount * this.recipePerSection
        const recipeIds = range(recipeCount)

        await factory(Ingredient)().createMany(this.ingredientCount)

        recipeIds.forEach(async (recipeId) => {
            await this.fillRecipe(factory, recipeId)
        })
    }

    private async createSections(
        factory: Factory,
        userId: number
    ): Promise<void> {
        await factory(Section)()
            .map(async (section) => {
                section.userId = userId
                return section
            })
            .createMany(this.sectionPerUser)
    }

    private async createRecipes(
        factory: Factory,
        sectionId: number
    ): Promise<void> {
        await factory(Recipe)()
            .map(async (recipe) => {
                recipe.sectionId = sectionId
                return recipe
            })
            .createMany(this.recipePerSection)
    }

    private async fillRecipe(
        factory: Factory,
        recipeId: number
    ): Promise<void> {
        const ingredientCount = sample(this.ingredientsPerRecipe) as number
        const instructionCount = sample(this.instructionsPerRecipe) as number
        await factory(Instruction)()
            .map(async (instruction) => {
                instruction.recipeId = recipeId
                return instruction
            })
            .createMany(instructionCount)

        const ingredientIds = sampleSize(this.ingredientIds, ingredientCount)

        ingredientIds.forEach(async (ingredientId) => {
            await factory(RecipeIngredient)().map(async (recipeIngredient) => {
                recipeIngredient.recipeId = recipeId
                recipeIngredient.ingredientId = ingredientId
                return recipeIngredient
            })
        })
    }
}
