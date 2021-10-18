import Faker from 'faker'
import { define } from '@zchapple/typeorm-seeding'
import { Ingredient } from '@/entities'

define(Ingredient, (faker: typeof Faker) => {
    const ingredient = new Ingredient()
    ingredient.name = faker.name.lastName()
    ingredient.unit = faker.datatype.string(8)
    return ingredient
})
