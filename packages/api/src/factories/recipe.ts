import Faker from 'faker'
import { define } from '@zchapple/typeorm-seeding'
import { Recipe } from '@/entities'

define(Recipe, (faker: typeof Faker) => {
    const recipe = new Recipe()
    recipe.name = faker.name.title()
    recipe.description = faker.lorem.words(10)
    recipe.peopleCount = faker.datatype.number(5)
    recipe.prepareTime = faker.datatype.number(60)
    recipe.createdAt = faker.date.recent()
    recipe.position = faker.datatype.number(999999)

    return recipe
})
