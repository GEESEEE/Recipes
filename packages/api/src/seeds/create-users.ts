import type { Factory, Seeder } from '@zchapple/typeorm-seeding'
import range from 'lodash/range'
import sampleSize from 'lodash/sampleSize'
import sample from 'lodash/sample'
import type { Connection } from 'typeorm'

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
    private userCount = 10
    private ingredientCount = 50

    private sectionPerUser = 5
    private recipePerSection = 5
    private ingredientsPerRecipe = range(5, 8)
    private instructionsPerRecipe = range(5, 8)

    private ingredientIds = range(1, this.ingredientCount + 1)

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

        await factory(Ingredient)().createMany(this.ingredientCount)

        const userIds = range(1, this.userCount)

        for (const userId of userIds) {
            const sections = await factory(Section)()
                .map(async (section) => {
                    section.userId = userId
                    return section
                })
                .createMany(this.sectionPerUser)

            const sectionIds = sections.map((section) => section.id)

            const recipes: Recipe[] = []
            for (const sectionId of sectionIds) {
                recipes.push(
                    ...(await factory(Recipe)()
                        .map(async (recipe) => {
                            recipe.sectionId = sectionId
                            return recipe
                        })
                        .createMany(this.recipePerSection))
                )
            }

            const recipeIds = recipes.map((recipe) => recipe.id)

            for (const recipeId of recipeIds) {
                const instructionCount = sample(
                    this.instructionsPerRecipe
                ) as number
                await factory(Instruction)()
                    .map(async (instruction) => {
                        instruction.recipeId = recipeId
                        return instruction
                    })
                    .createMany(instructionCount)

                const ingredientCount = sample(
                    this.ingredientsPerRecipe
                ) as number
                const ingredientIds = sampleSize(
                    this.ingredientIds,
                    ingredientCount
                )
                ingredientIds.forEach(async (ingredientId) => {
                    await factory(RecipeIngredient)()
                        .map(async (recipeIngredient) => {
                            recipeIngredient.recipeId = recipeId
                            recipeIngredient.ingredientId = ingredientId
                            return recipeIngredient
                        })
                        .create()
                })
            }
        }
    }
}
