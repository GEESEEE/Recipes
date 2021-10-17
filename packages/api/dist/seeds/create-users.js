"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const entities_1 = require("../entities");
// import { getRandomInt } from '../util/util'
class CreateUsers {
    run(factory, _connection) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const settings = yield factory(entities_1.Settings)().create();
            yield factory(entities_1.User)()
                .map((user) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                user.name = 'GEESE';
                user.password = 'admin';
                user.email = 'geese@gmail.com';
                user.settingsId = settings.id;
                return user;
            }))
                .create();
            // const userCount = 50
            // const recipeCount = 200
            // const ingredientCount = 100
            // for (let i = 1; i < userCount; i++) {
            //     const settings = await factory(Settings)().create()
            //     await factory(User)({ settingsId: settings.id })
            //         .map(async (user) => {
            //             user.settingsId = settings.id
            //             return user
            //         })
            //         .create()
            // }
            // await factory(Ingredient)().createMany(ingredientCount)
            // const userIds = _.range(1, userCount + 1)
            // await factory(Recipe)()
            //     .map(async (recipe) => {
            //         recipe.authorId = _.sample(userIds) as number
            //         return recipe
            //     })
            //     .createMany(recipeCount)
            // const recipeIds = _.range(1, recipeCount + 1)
            // const ingredientIds = _.range(1, ingredientCount + 1)
            // for (const recipeId of recipeIds) {
            //     const iPerRecipe = getRandomInt(3, 6)
            //     await factory(Instruction)()
            //         .map(async (instruction) => {
            //             instruction.recipeId = recipeId
            //             return instruction
            //         })
            //         .createMany(iPerRecipe)
            //     const riPerRecipe = getRandomInt(3, 6)
            //     const ingredients = _.sampleSize(ingredientIds, riPerRecipe)
            //     for (const ingredientId of ingredients) {
            //         await factory(RecipeIngredient)()
            //             .map(async (ri) => {
            //                 ri.recipeId = recipeId
            //                 ri.ingredientId = ingredientId
            //                 return ri
            //             })
            //             .create()
            //     }
            // }
        });
    }
}
exports.default = CreateUsers;
