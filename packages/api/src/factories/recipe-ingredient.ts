import Faker from 'faker'
import { define } from '@zchapple/typeorm-seeding'
import { RecipeIngredient } from '../entities'

define(RecipeIngredient, (faker: typeof Faker) => {
    const recipeIngredient = new RecipeIngredient()
    recipeIngredient.amount = faker.datatype.number(500)
    recipeIngredient.position = faker.datatype.number(999999)
    return recipeIngredient
})
